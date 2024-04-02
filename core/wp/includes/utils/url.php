<?php

class WTR_URL_Utils
{
    public static function get_pathname_from_url(string $url)
    {
        $path = parse_url($url, PHP_URL_PATH);
        $trimmed = !empty($path) ? ltrim($path, '/') : '';
        return '/' . $trimmed;
    }

    public static function join(...$parts)
    {
        $parts = array_map(function ($part) {
            return trim($part, '/');
        }, $parts);

        $path = implode('/', $parts);

        if (!empty($path) && $parts[0] !== '') {
            $path = '/' . $path;
        }

        return $path;
    }
}
