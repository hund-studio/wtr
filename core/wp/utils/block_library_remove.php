<?php

function remove_block_library_style()
{
    wp_dequeue_style('wp-block-library');
}

add_action('wp_enqueue_scripts', 'remove_block_library_style');
