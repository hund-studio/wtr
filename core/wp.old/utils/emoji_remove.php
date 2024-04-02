<?php

function remove_wpemoji_settings()
{
    // Remove the wpemojiSettings script
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('admin_print_scripts', 'print_emoji_detection_script');
    remove_action('wp_print_styles', 'print_emoji_styles');
    remove_action('admin_print_styles', 'print_emoji_styles');

    // Remove the inline styles generated by the wpemojiSettings script
    remove_filter('the_content', 'print_emoji');
    remove_filter('the_excerpt', 'print_emoji');
    remove_filter('widget_text_content', 'print_emoji');

    // Remove the emoji CDN DNS prefetch
    add_filter('emoji_svg_url', '__return_false');

    // Disable the emoji functionality in TinyMCE (the WordPress visual editor)
    add_filter('tiny_mce_plugins', 'disable_emojicons_tinymce');
}
add_action('init', 'remove_wpemoji_settings');

function disable_emojicons_tinymce($plugins)
{
    if (is_array($plugins)) {
        return array_diff($plugins, array('wpemoji'));
    } else {
        return array();
    }
}
