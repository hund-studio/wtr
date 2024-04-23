<?php

class WP_Utils
{
    public static function append_as_json(string $id, $payload)
    {
        add_action('wp_footer', function () use ($id, $payload) {
            $json = json_encode($payload);
            $script_html = '<script type="application/json" id="' . esc_attr($id) . '">' . $json . '</script>';
            echo $script_html;
        });
    }

    public static function get_front_page_type_options()
    {
        $options = [];
        $show_on_front_option = get_option('show_on_front');

        switch ($show_on_front_option) {
            case 'posts':
                $options[] = 'posts';
                break;
            case 'page':
                $page_on_front_option = get_option('page_on_front');
                $page_for_posts_option = get_option('page_for_posts');

                if ($page_on_front_option) {
                    $options['page']  = $page_on_front_option;
                }

                if ($page_for_posts_option) {
                    $options['posts'] = $page_for_posts_option;
                }
                break;
        }

        return $options;
    }

    public static function get_site_info()
    {
        return [
            'rest_url' => get_rest_url()
        ];
    }
}
