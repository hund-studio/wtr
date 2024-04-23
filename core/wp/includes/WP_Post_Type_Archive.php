<?php

class WTR_WP_Post_Type_Archive
{
    public string $url; // TODO do i really need this?

    public function __construct(private \WP_Post_Type $wp_object)
    {
        if ($wp_object->name === 'post') {
            throw new RuntimeException("Invalid resource.");
        }

        $url = get_post_type_archive_link($wp_object->name);

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

        return $pathnames;
    }

    public function get_templates()
    {
        $templates[] = sprintf("archive-%s", $this->wp_object->name);
        $templates[] = "archive";

        return $templates;
    }

    public function get_wtr_endpoint()
    {
        $wp_rest_namespace = $this->wp_object->rest_namespace ?? WTR_Config_Utils::$wp_api_namespace;
        $wp_rest_base = $this->wp_object->rest_base ?? $this->wp_object->name;

        return new WTR_API_Endpoint([
            'pattern' => WTR_Config_Utils::get_api_url() . WTR_URL_Utils::join(WTR_Config_Utils::$wtr_api_namespace, $wp_rest_base),
            'pathname' => $wp_rest_base,
            'callback' => function (WP_REST_Request $request) use ($wp_rest_namespace, $wp_rest_base) {
                // TODO clean this callback
                $wp_default_endpoint = WTR_Config_Utils::get_api_url() . WTR_URL_Utils::join($wp_rest_namespace, $wp_rest_base);
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
