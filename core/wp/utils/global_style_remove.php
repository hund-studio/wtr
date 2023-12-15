<?php

function remove_global_styles_inline_css()
{
    wp_dequeue_style('global-styles');
}

add_action('wp_print_styles', 'remove_global_styles_inline_css');
