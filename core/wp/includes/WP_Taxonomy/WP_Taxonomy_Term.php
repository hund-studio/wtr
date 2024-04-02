<?php

/** TODO:
    List here todo for this file
 */

class WTR_WP_Taxonomy_Term
{
    public string $url;
    private ?\WP_Term $sample_term;

    public function __construct(private \WP_Taxonomy $wp_object)
    {
        $terms = get_terms(['taxonomy' => $wp_object->name, 'hide_empty' => false]);

        if (empty($terms)) {
            throw new RuntimeException("Resource not found.");
        }

        $this->sample_term = $terms[0];
        $url = get_term_link($this->sample_term);

        if (empty($url)) {
            throw new RuntimeException("Resource not found.");
        }

        $this->url = WTR_Locale_Utils::get_localized_url(
            $url,
            WTR_Locale_Utils::get_default_locale()
        );
    }

    public function get_pathnames()
    {
        $pathnames['default'] = WTR_URL_Utils::get_pathname_from_url($this->url);

        foreach (WTR_Locale_Utils::get_locales() as $locale) {
            $pathnames[$locale] = WTR_Locale_Utils::get_localized_url(
                $pathnames['default'],
                $locale
            );
        }

        foreach ($pathnames as $lang => $url) {
            $new_url = str_replace($this->sample_term->slug, ':slug', $url);
            $pathnames[$lang] = $new_url;
        }

        return $pathnames;
    }

    public function get_templates()
    {
        switch ($this->wp_object->name) {
            case 'category':
                $templates[] = "category-{slug}";
                $templates[] = "category";
                break;
            case 'tag':
                $templates[] = "tag-{slug}";
                $templates[] = "tag";
                break;
            default:
                $templates[] = sprintf("taxonomy-%s-{slug}", $this->wp_object->name);
                $templates[] = sprintf("taxonomy-%s", $this->wp_object->name);
                $templates[] = "single";
        }

        $templates[] = "archive";

        return $templates;
    }

    public function get_wtr_endpoint()
    {
        $wp_rest_namespace = $this->wp_object->rest_namespace ?? WTR_Config::$wp_api_namespace;
        $wp_rest_base = $this->wp_object->rest_base ?? $this->wp_object->name;

        return new WTR_API_Endpoint([
            'pattern' => WTR_Config::get_api_url() . WTR_URL_Utils::join(WTR_Config::$wtr_api_namespace, $wp_rest_base, ':slug'),
            'pathname' =>  WTR_URL_Utils::join($wp_rest_base, '(?P<slug>[\w-]+)'),
            'callback' => function (WP_REST_Request $request) use ($wp_rest_namespace, $wp_rest_base) {
                // TODO clean this callback
                $slug = $request['slug'];
                $term = get_term_by('slug', $slug, $this->wp_object->name);
                $wp_default_endpoint = WTR_Config::get_api_url() . WTR_URL_Utils::join($wp_rest_namespace, $wp_rest_base, $term->ID);
                $wp_default_endpoint = add_query_arg(['_acf' => 'acf', 'acf_format' => 'standard'], $wp_default_endpoint);

                if (!empty($term)) {
                    $response =  wp_remote_get($wp_default_endpoint);
                    if (is_array($response) && !is_wp_error($response) && $response['response']['code'] == 200) {
                        $body = wp_remote_retrieve_body($response);
                        return rest_ensure_response(json_decode($body));
                    }

                    return new WP_Error(
                        'rest_request_failed',
                        'Request to external API failed',
                        array(
                            'status' => 500,
                            "ref" => $wp_default_endpoint,
                        )
                    );
                }

                return new WP_Error('post_not_found', 'Post not found', array('status' => 404));
            },
            'args' => array(
                'slug' => array(
                    'validate_callback' => function ($value, $request, $param) {
                        if (is_string($value) && preg_match('/^[\w-]+$/', $value)) {
                            return true;
                        }
                        return new WP_Error('rest_invalid_param', 'Invalid slug parameter.', array('status' => 400));
                    },
                ),
            ), // TODO this validation may be common to other endpoints
        ]);
    }
}
