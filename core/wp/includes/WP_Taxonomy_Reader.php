<?php

class WTR_WP_Taxonomy_Reader
{
    public static function get_registered()
    {
        return get_taxonomies([], 'names');
    }

    public static function get_viewable()
    {
        $registered_taxonomies = self::get_registered();
        return WTR_Array_Utils::rebase(array_filter($registered_taxonomies, function (string $taxonomy) {
            return is_taxonomy_viewable($taxonomy);
        }));
    }

    public static function get_wp_object(string $taxonomy): ?\WP_Taxonomy
    {
        return get_taxonomy($taxonomy);
    }

    public static function get_wtr_term(string $taxonomy): ?WTR_WP_Taxonomy_Term
    {
        try {
            $wp_object = self::get_wp_object($taxonomy);

            if (empty($wp_object)) {
                throw new RuntimeException("Resource not found.");
            }

            return new WTR_WP_Taxonomy_Term($wp_object);

            // return WTR_Array_Utils::clean($list); // TODO check if other occurrencies before delete
        } catch (Exception $exception) {
            return null;
        }
    }
}
