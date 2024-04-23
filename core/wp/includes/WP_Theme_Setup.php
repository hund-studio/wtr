<?php

class WP_Theme_Setup
{
    public function __construct()
    {
        $this->add_menus_support();
        $this->remove_admin_bar();
        $this->remove_block_library_style();
        $this->remove_classic_theme_inline_css();
        $this->remove_dashicons();
        $this->remove_emoji();
        $this->remove_global_styles_inline_css();
    }

    private function remove_admin_bar()
    {
        add_action('after_setup_theme', function () {
            show_admin_bar(false);
        });
    }

    private function remove_block_library_style()
    {
        add_action('wp_enqueue_scripts', function () {
            wp_dequeue_style('wp-block-library');
        });
    }

    private function remove_classic_theme_inline_css()
    {
        add_action('wp_print_styles', function () {
            wp_dequeue_style('classic-theme-styles');
        });
    }

    private function remove_dashicons()
    {
        add_action('wp_enqueue_scripts', function () {
            wp_dequeue_style('dashicons');
        });
    }

    private function remove_emoji()
    {
        add_action('init', function () {
            remove_action('wp_head', 'print_emoji_detection_script', 7);
            remove_action('admin_print_scripts', 'print_emoji_detection_script');
            remove_action('wp_print_styles', 'print_emoji_styles');
            remove_action('admin_print_styles', 'print_emoji_styles');
            remove_filter('the_content', 'print_emoji');
            remove_filter('the_excerpt', 'print_emoji');
            remove_filter('widget_text_content', 'print_emoji');
            add_filter('emoji_svg_url', '__return_false');
            add_filter('tiny_mce_plugins', function ($plugins) {
                if (is_array($plugins)) {
                    return array_diff($plugins, array('wpemoji'));
                } else {
                    return array();
                }
            });
        });
    }

    private function remove_global_styles_inline_css()
    {
        add_action('wp_print_styles', function () {
            wp_dequeue_style('global-styles');
        });
    }

    private function add_menus_support()
    {
        add_theme_support('menus');
    }
}
