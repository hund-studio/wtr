<?php

function wtr_register_custom_rewrite(string $pattern, array $templates)
{
    WTR_Custom_Rewrite_Collection::self()->push([
        'pattern' => $pattern,
        'templates' => $templates
    ]);
}
