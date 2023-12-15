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

add_action('wp_footer', function () {
    $menus = get_registered_nav_menus();
    $formatted_menus = array();

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

        $formatted_menus[$menu_location] = $formatted_items;
    }

    $menus_json = json_encode($formatted_menus);
    $existing_json_data = '<script type="application/json" id="menu-data"></script>';
    $output = str_replace('</script>', $menus_json . '</script>', $existing_json_data);

    echo $output;
});
