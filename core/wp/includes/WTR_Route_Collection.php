<?php

class WTR_Route_Collection
{
    private static ?WTR_Route_Collection $instance = null;
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

    public function push(array $entry)
    {
        $route = $this->create_entity($entry);
        if ($route->validate()) {
            self::$collection[] = $route;
        }

        return $this->get();
    }

    protected function create_entity(array $entry): WTR_Route
    {
        return new WTR_Route($entry);
    }
}
