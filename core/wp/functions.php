<?php

require get_template_directory() . '/utils/emoji_remove.php';
require get_template_directory() . '/utils/dashicons_remove.php';
require get_template_directory() . '/utils/admin_bar_remove.php';
require get_template_directory() . '/utils/block_library_remove.php';
require get_template_directory() . '/utils/classic_theme_remove.php';
require get_template_directory() . '/utils/global_style_remove.php';

add_theme_support('menus');

add_action('wp_enqueue_scripts', function () {
    $version = time();
    wp_enqueue_script('custom-script', get_template_directory_uri() . '/dist/main.js', array(), $version, true);
});

add_action('wp_enqueue_scripts', function () {
    $version = time();
    wp_enqueue_style('my-custom-style', get_template_directory_uri() . '/dist/main.css', array(), $version, 'all');
});

// require get_template_directory() . '/includes/wpr.php';
require get_template_directory() . '/includes/locale.php';
require get_template_directory() . '/includes/bloginfo.php';
require get_template_directory() . '/includes/menu.php';
require get_template_directory() . '/includes/endpoint.php';
include get_template_directory() . '/includes/user/index.php';
