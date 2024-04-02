<?php

function remove_classic_theme_inline_css()
{
    wp_dequeue_style('classic-theme-styles');
}

add_action('wp_print_styles', 'remove_classic_theme_inline_css');
