<?php

function get_menu_items_by_registered_slug($menu_slug)
{

    $menu_items = array();

    if (($locations = get_nav_menu_locations()) && isset($locations[$menu_slug])) {
        $menu = get_term($locations[$menu_slug]);
        $menu_items = wp_get_nav_menu_items($menu->term_id);
    }

    return $menu_items;
}

function wpreact_get_menu_output()
{
    $menus = get_registered_nav_menus();
    $output = array();

    foreach ($menus as $menu_location => $menu_description) {
        $menu_items = get_menu_items_by_registered_slug($menu_location);
        $formatted_items = array();

        foreach ($menu_items as $item) {
            $url = $item->url;

            if (strpos($url, home_url()) === 0) {
                $url = str_replace(home_url(), '', $url);
            }

            $formatted_items[] = array(
                'label' => $item->title,
                'to' => $url,
            );
        }

        $output[$menu_location] = $formatted_items;
    }

    return $output;
}

add_action('rest_api_init', function () {
    register_rest_route('wpreact/v1', '/menu', [
        'methods' => 'GET',
        'callback' => function () {
            wp_send_json(wpreact_get_menu_output());
        },
    ]);
});

add_action('wp_footer', function () {
    $menu = wpreact_get_menu_output();

    $json = json_encode($menu);
    $existing_json_data = '<script type="application/json" id="menu-data"></script>';
    $output = str_replace('</script>', $json . '</script>', $existing_json_data);

    echo $output;
});
