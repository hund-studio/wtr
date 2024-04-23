<?php

class WTR_Array_Utils
{
    public static function rebase(array $array)
    {
        return array_values($array);
    }

    public static function clean(array $array)
    {
        return self::rebase(array_filter($array));
    }
}
