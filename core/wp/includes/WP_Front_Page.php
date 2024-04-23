<?php

class WTR_Front_Page
{
    public bool $is_active = false;
    private ?int $page_id = null;

    public function __construct()
    {
        $front_page_type_options = WP_Utils::get_front_page_type_options();

        if (array_key_exists('page', $front_page_type_options)) {
            $this->page_id = $front_page_type_options['page'];
            $this->is_active = true;
        }
    }

    public function get_pathnames()
    {
        $pathnames['default'] = WTR_URL_Utils::get_pathname_from_url(
            WTR_Config_Utils::get_front_page_url()
        );

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
        $templates[] = 'front-page';
        $templates[] = 'page-{slug}';
        $templates[] = 'page';

        return $templates;
    }

    public function get_wtr_endpoint()
    {
        $post = get_post($this->page_id);
        $wp_post_type = WTR_WP_Post_Type_Reader::get_wp_object($post->post_type);
        $wp_rest_namespace = $wp_post_type->rest_namespace ?? WTR_Config_Utils::$wp_api_namespace;
        $wp_rest_base = $wp_post_type->rest_base ?? $wp_post_type->name;

        if ($post) {
            return new WTR_API_Endpoint([
                'pattern' => WTR_Config_Utils::get_api_url() . WTR_URL_Utils::join(WTR_Config_Utils::$wtr_api_namespace, $wp_rest_base, $post->post_name),
                'pathname' =>  WTR_URL_Utils::join($wp_rest_base, $post->post_name),
                'callback' => function (WP_REST_Request $request) use ($post, $wp_rest_namespace, $wp_rest_base, $wp_post_type) {
                    // TODO clean this callback
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

        return null;
    }
}
