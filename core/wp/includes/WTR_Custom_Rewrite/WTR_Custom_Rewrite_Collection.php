<?php

class WTR_Custom_Rewrite_Collection
{
    private static $instance;
    private static array $collection = [];

    public static function self()
    {
        if (!isset(self::$instance)) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function get()
    {
        return self::$collection;
    }

    public function push($entry)
    {
        $entity = $this->create_entity($entry);
        // TODO missing validation
        self::$collection[] = $entity;
        return $this->get();
    }

    protected function create_entity(array $entry): WTR_Custom_Rewrite
    {
        return new WTR_Custom_Rewrite($entry);
    }
}
