<?php

class WTR_Config_Utils
{
    public static string $wtr_api_namespace = 'wtr/v1';
    public static string $wp_api_namespace = 'wp/v2';

    public static function get_api_url()
    {
        $api_url = get_rest_url();
        $api_url = rtrim($api_url, '/');
        return $api_url;
    }

    public static function get_front_page_url()
    {
        return get_home_url();
    }

    public static function get_front_page_pathname()
    {
        return WTR_URL_Utils::get_pathname_from_url(self::get_front_page_url());
    }
}
