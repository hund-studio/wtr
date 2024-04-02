<?php

class WTR_Locale_Utils
{
    public static function get_localized_url(string $url, string | null $locale)
    {
        if ($locale) {
            if (function_exists('qtranxf_convertURL')) {
                return qtranxf_convertURL($url, $locale);
            }
        }

        return $url;
    }

    public static function get_current_locale()
    {
        if (function_exists('qtranxf_getLanguage')) {
            return qtranxf_getLanguage();
        }

        return null;
    }

    public static function get_default_locale()
    {
        global $q_config;

        if (!is_null($q_config)) {
            return $q_config['default_language'];
        }

        return null;
    }

    public static function get_locales()
    {
        if (function_exists('qtranxf_getSortedLanguages')) {
            return qtranxf_getSortedLanguages();
        }

        return [];
    }

    public static function get_locale_output()
    {
        $output = [
            'current' => self::get_current_locale(),
            'available' => self::get_locales(),
        ];

        return $output;
    }
}
