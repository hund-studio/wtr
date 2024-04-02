<?php

class WTR_WP_Post_Type_Reader
{
    public static function get_registered()
    {
        return get_post_types([], 'names');
    }

    public static function get_viewable()
    {
        $registered_post_types = self::get_registered();
        return WTR_Array_Utils::rebase(array_filter($registered_post_types, function (string $post_type) {
            return is_post_type_viewable($post_type) && $post_type !== 'attachment';
        }));
    }

    public static function get_wp_object(string $post_type): ?\WP_Post_Type
    {
        return get_post_type_object($post_type);
    }

    public static function get_wtr_archive(string $post_type): ?WTR_WP_Post_Type_Archive
    {
        try {
            $wp_object = self::get_wp_object($post_type);

            if (empty($wp_object)) {
                throw new RuntimeException("Resource not found.");
            }

            return new WTR_WP_Post_Type_Archive($wp_object);
        } catch (Exception $exception) {
            return null;
        }
    }

    public static function get_wtr_post(string $post_type): ?WTR_WP_Post_Type_Post
    {
        try {
            $wp_object = self::get_wp_object($post_type);

            if (empty($wp_object)) {
                throw new RuntimeException("Resource not found.");
            }

            return new WTR_WP_Post_Type_Post($wp_object);
            // return WTR_Array_Utils::clean($list); // TODO check if other occurrencies before delete
        } catch (Exception $exception) {
            return null;
        }
    }
}
