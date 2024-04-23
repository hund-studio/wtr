<?php

/* Autoload WTR Classes */

spl_autoload_register(function ($class_name) {
    $file = __DIR__ . '/includes/' . $class_name . '.php';
    if (file_exists($file)) {
        require_once $file;
    }
});

/* Autoload WTR Functions */

$dir = opendir(__DIR__ . '/functions/');
while (($file = readdir($dir)) !== false) {
    if ($file != '.' && $file != '..') {
        if (is_file($folder . '/' . $file) && pathinfo($file, PATHINFO_EXTENSION) == 'php') {
            require_once $folder . '/' . $file;
        }
    }
}
closedir($dir);

/* Init */

new WP_Theme_Setup();
new WTR_Theme_Setup();
