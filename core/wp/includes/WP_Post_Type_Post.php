<?php

class WP_Post_Type_Post
{
    public string $url;
    private ?\WP_Post $sample_post;

    public function __construct(private \WP_Post_Type $wp_object)
    {
        $posts = get_posts(['post_type' => $wp_object->name, 'numberposts' => -1]);

        if (empty($posts)) {
            throw new RuntimeException("Resource not found.");
        }

        $this->sample_post = $posts[0];
        $url = get_permalink($this->sample_post->ID);

        if (empty($url)) {
            throw new RuntimeException("Resource not found.");
        }

        $this->url = WTR_Locale_Utils::get_localized_url(
            $url,
            WTR_Locale_Utils::get_default_locale()
        );
    }

    // TODO this is the same as archive
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
            $new_url = str_replace($this->sample_post->post_name, ':slug', $url);
            $pathnames[$lang] = $new_url;
        }

        return $pathnames;
    }

    public function get_templates()
    {
        switch ($this->wp_object->name) {
            case 'page':
                $templates[] = "page-{slug}";
                $templates[] = "page";
                break;
            default:
                $templates[] = sprintf("single-%s-{slug}", $this->wp_object->name);
                $templates[] = sprintf("single-%s", $this->wp_object->name);
                $templates[] = "single";
        }

        return $templates;
    }

    public function get_wtr_endpoint()
    {
        $wp_rest_namespace = $this->wp_object->rest_namespace ?? WTR_Config_Utils::$wp_api_namespace;
        $wp_rest_base = $this->wp_object->rest_base ?? $this->wp_object->name;

        return new WTR_API_Endpoint([
            'pattern' => WTR_Config_Utils::get_api_url() . WTR_URL_Utils::join(WTR_Config_Utils::$wtr_api_namespace, $wp_rest_base, ':slug'),
            'pathname' =>  WTR_URL_Utils::join($wp_rest_base, '(?P<slug>[\w-]+)'),
            'callback' => function (WP_REST_Request $request) use ($wp_rest_namespace, $wp_rest_base) {
                // TODO clean this callback
                $slug = $request['slug'];
                $post = get_page_by_path($slug, OBJECT, $this->wp_object->name);
                $wp_default_endpoint = WTR_Config_Utils::get_api_url() . WTR_URL_Utils::join($wp_rest_namespace, $wp_rest_base, $post->ID);
                $wp_default_endpoint = add_query_arg(['_acf' => 'acf', 'acf_format' => 'standard'], $wp_default_endpoint);

                if (!empty($post)) {
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
