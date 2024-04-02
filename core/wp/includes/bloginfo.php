<?php

function wpreact_get_site_info_output()
{
    $output = [
        'rest_url' => get_rest_url()
    ];

    return $output;
}

add_action('rest_api_init', function () {
    register_rest_route('wpreact/v1', '/site-info', [
        'methods' => 'GET',
        'callback' => function () {
            wp_send_json(WTR_Locale_Utils::get_locale_output());
        },
    ]);
});

add_action('wp_footer', function () {
    $site_info = wpreact_get_menu_output(wpreact_get_site_info_output());

    $json = json_encode($site_info);
    $existing_json_data = '<script type="application/json" id="website-data"></script>';
    $output = str_replace('</script>', $json . '</script>', $existing_json_data);
    echo $output;
});
