<?php

add_action('wp_footer', function () {
    $json = json_encode([
        'rest_url' => get_rest_url()
    ]);
    $existing_json_data = '<script type="application/json" id="website-data"></script>';
    $output = str_replace('</script>', $json . '</script>', $existing_json_data);
    echo $output;
});
