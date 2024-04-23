<?php

class WTR_Validation_Utils
{
    public static function is_array($args): void
    {
        if (!is_array($args)) {
            throw new InvalidArgumentException('Entry must be an array.');
        }
    }

    public static function is_string_map($args): void
    {
        if (empty($args)) {
            throw new InvalidArgumentException('Entry must be provided as a non-empty array.');
        }

        foreach ($args as $key => $value) {
            if (!is_string($key) || !is_string($value)) {
                throw new InvalidArgumentException('Each key and value in array must be a string.');
            }
        }
    }

    public static function is_string_array($args): void
    {
        if (empty($args)) {
            throw new InvalidArgumentException('Entry must be provided as a non-empty array.');
        }

        foreach ($args as $key => $value) {
            if (!is_string($value)) {
                throw new InvalidArgumentException('Each value in array must be a string.');
            }
        }
    }

    public static function is_wtr_api_endpoint(?WTR_API_Endpoint $args): void
    {
        if (!($args instanceof WTR_API_Endpoint)) {
            throw new InvalidArgumentException('Entry must be an instance of WTR_API_Endpoint.');
        }
    }
}
