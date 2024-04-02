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

require get_template_directory() . '/includes/utils/array.php';
require get_template_directory() . '/includes/utils/url.php';
require get_template_directory() . '/includes/utils/wp.php';
require get_template_directory() . '/includes/utils/validation.php';

require get_template_directory() . '/includes/config.php';
require get_template_directory() . '/includes/locale/static.php'; // TODO move from here

require get_template_directory() . '/includes/WP_Post_Type/WP_Post_Type_Archive.php';
require get_template_directory() . '/includes/WP_Post_Type/WP_Post_Type_Post.php';
require get_template_directory() . '/includes/WP_Post_Type/WP_Post_Type_Reader.php';

require get_template_directory() . '/includes/WP_Taxonomy/WP_Taxonomy_Term.php';
require get_template_directory() . '/includes/WP_Taxonomy/WP_Taxonomy_Reader.php';

require get_template_directory() . '/includes/WTR_Custom_Rewrite/WTR_Custom_Rewrite.php';
require get_template_directory() . '/includes/WTR_Custom_Rewrite/WTR_Custom_Rewrite_Collection.php';
require get_template_directory() . '/includes/WTR_Custom_Rewrite/wtr_custom_rewrite_functions.php';

require get_template_directory() . '/includes/WP_Homepage/WP_Front_Page.php';
require get_template_directory() . '/includes/WP_Homepage/WP_Home.php';

require get_template_directory() . '/includes/api-endpoint/entity.php';
require get_template_directory() . '/includes/route/entity.php';
require get_template_directory() . '/includes/api-endpoint/collection.php';
require get_template_directory() . '/includes/route/collection.php';
require get_template_directory() . '/includes/endpoint.php';

include get_template_directory() . '/includes/user/index.php';
