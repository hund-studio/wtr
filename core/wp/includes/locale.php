<?php

add_action('rest_api_init', function () {
    register_rest_route('wpreact/v1', '/locale', [
        'methods' => 'GET',
        'callback' => function () {
            wp_send_json(WTR_Locale_Utils::get_locale_output());
        },
    ]);
});

add_action('wp_footer', function () {
    $locales = WTR_Locale_Utils::get_locale_output();

    $json = json_encode($locales);
    $existing_json_data = '<script type="application/json" id="locale-data"></script>';
    $output = str_replace('</script>', $json . '</script>', $existing_json_data);

    echo $output;
});
