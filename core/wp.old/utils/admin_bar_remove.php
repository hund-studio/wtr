<?php

function remove_admin_bar()
{
    show_admin_bar(false);
}

add_action('after_setup_theme', 'remove_admin_bar');
