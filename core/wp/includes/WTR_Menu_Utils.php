<?php

class WTR_Menu_Utils
{
    private static function get_menu_items_by_registered_slug($menu_slug)
    {
        $menu_items = array();

        if (($locations = get_nav_menu_locations()) && isset($locations[$menu_slug])) {
            $menu = get_term($locations[$menu_slug]);
            $menu_items = wp_get_nav_menu_items($menu->term_id);
        }

        return $menu_items;
    }

    private static function format_menu_item($item, $menu_items)
    {
        $url = $item->url;

        if (strpos($url, home_url()) === 0) {
            $url = str_replace(home_url(), '', $url);
        }

        $formatted_item = array(
            'label' => $item->title,
            'to' => $url,
        );

        $children = array_filter($menu_items, function ($menu_item) use ($item) {
            return $menu_item->menu_item_parent == $item->ID;
        });

        if (!empty($children)) {
            $formatted_item['children'] = array_values(array_map(function ($child) use ($menu_items) {
                return self::format_menu_item($child, $menu_items);
            }, $children));
        }

        return $formatted_item;
    }

    public static function get_menus()
    {
        $menus = get_registered_nav_menus();
        $output = array();

        foreach ($menus as $menu_location => $menu_description) {
            $menu_items = self::get_menu_items_by_registered_slug($menu_location);
            $formatted_items = array();

            $root_items = array_filter($menu_items, function ($item) {
                return $item->menu_item_parent == 0;
            });

            foreach ($root_items as $item) {
                $formatted_items[] = self::format_menu_item($item, $menu_items);
            }

            $output[$menu_location] = $formatted_items;
        }

        return $output;
    }
}
