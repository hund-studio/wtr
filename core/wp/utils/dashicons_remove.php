<?php

function remove_dashicons()
{
    wp_dequeue_style('dashicons');
}
add_action('wp_enqueue_scripts', 'remove_dashicons');
