<?php

class WTR_Home
{
    public bool $is_active = false;
    private ?int $page_id = null;

    public function __construct()
    {
        $front_page_type_options = WTR_WP_Utils::get_front_page_type_options();

        if (array_key_exists('posts', $front_page_type_options)) {
            $this->page_id = $front_page_type_options['posts'];
            $this->is_active = true;
        } else if (in_array('posts', $front_page_type_options)) {
            $this->is_active = true;
        }
    }

    public function get_pathnames()
    {
        if (!is_null($this->page_id)) {
            $pathnames['default'] = WTR_URL_Utils::get_pathname_from_url(
                WTR_Locale_Utils::get_localized_url(
                    get_permalink($this->page_id),
                    WTR_Locale_Utils::get_default_locale()
                )
            );
        } else {
            $pathnames['default'] = WTR_URL_Utils::get_pathname_from_url(WTR_Config::get_front_page_url());
        }

        foreach (WTR_Locale_Utils::get_locales() as $locale) {
            $pathnames[$locale] = WTR_Locale_Utils::get_localized_url(
                $pathnames['default'],
                $locale
            );
        }

        return $pathnames;
    }

    public function get_templates()
    {
        $templates[] = 'home';
        return $templates;
    }

    public function get_wtr_endpoint()
    {
        $wp_post_type = WTR_WP_Post_Type_Reader::get_wp_object('post');
        $wp_rest_namespace = $wp_post_type->rest_namespace ?? WTR_Config::$wp_api_namespace;
        $wp_rest_base = $wp_post_type->rest_base ?? $wp_post_type->name;

        return new WTR_API_Endpoint([
            'pattern' => WTR_Config::get_api_url() . WTR_URL_Utils::join(WTR_Config::$wtr_api_namespace, $wp_rest_base),
            'pathname' => $wp_rest_base,
            'callback' => function (WP_REST_Request $request) use ($wp_rest_namespace, $wp_rest_base) {
                // TODO clean this callback which is same as archive
                $wp_default_endpoint = WTR_Config::get_api_url() . WTR_URL_Utils::join($wp_rest_namespace, $wp_rest_base);
                $wp_default_endpoint = add_query_arg(['_acf' => 'acf', 'acf_format' => 'standard'], $wp_default_endpoint);
                $response =  wp_remote_get($wp_default_endpoint);
                if (is_array($response) && !is_wp_error($response) && $response['response']['code'] == 200) {
                    $body = wp_remote_retrieve_body($response);
                    return rest_ensure_response(json_decode($body));
                } else {
                    return new WP_Error(
                        'rest_request_failed',
                        'Request to external API failed',
                        array(
                            'status' => 500,
                            "ref" => $wp_default_endpoint,
                        )
                    );
                }
            }
        ]);
    }
}
