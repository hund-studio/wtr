<?php


function wpreact_get_locale_url(string $url, string | null $locale)
{
    if ($locale) {
        if (function_exists('qtranxf_convertURL')) {
            return qtranxf_convertURL($url, $locale);
        }
    }

    return $url;
}

function wpreact_get_current_locale()
{
    if (function_exists('qtranxf_getLanguage')) {
        return qtranxf_getLanguage();
    }

    return null;
}

function wpreact_get_default_locale()
{
    global $q_config;

    if (!is_null($q_config)) {
        return $q_config['default_language'];
    }

    return null;
}

function wpreact_get_locales()
{
    if (function_exists('qtranxf_getSortedLanguages')) {
        return qtranxf_getSortedLanguages();
    }

    return [];
}

function wpreact_get_locale_output()
{
    $output = [
        'current' => wpreact_get_current_locale(),
        'available' => wpreact_get_locales(),
    ];

    return $output;
}

add_action('rest_api_init', function () {
    register_rest_route('wpreact/v1', '/locale', [
        'methods' => 'GET',
        'callback' => function () {
            wp_send_json(wpreact_get_locale_output());
        },
    ]);
});

add_action('wp_footer', function () {
    $locales = wpreact_get_locale_output();

    $json = json_encode($locales);
    $existing_json_data = '<script type="application/json" id="locale-data"></script>';
    $output = str_replace('</script>', $json . '</script>', $existing_json_data);

    echo $output;
});
