<?php

/* Autoload WTR Classes */

spl_autoload_register(function ($class_name) {
    $file = __DIR__ . '/includes/' . $class_name . '.php';
    if (file_exists($file)) {
        require_once $file;
    }
});

/* Autoload WTR Functions */
$path = __DIR__ . '/includes/functions/';
$dir = opendir($path);
while (($file = readdir($dir)) !== false) {
    if ($file != '.' && $file != '..') {
        if (is_file($path . '/' . $file) && pathinfo($file, PATHINFO_EXTENSION) == 'php') {
            require_once $path . '/' . $file;
        }
    }
}
closedir($dir);

/* Init */

new WP_Theme_Setup();
new WTR_Theme_Setup();
