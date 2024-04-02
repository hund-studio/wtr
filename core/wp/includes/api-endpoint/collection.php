<?php

class WTR_API_Endpoint_Collection
{
    private static ?WTR_API_Endpoint_Collection $instance = null;
    private static array $collection = [];

    public static function getInstance()
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
        $route = $this->create_entity($entry);
        // TODO validation
        self::$collection[] = $route;

        return $this->get();
    }

    protected function create_entity($entry): WTR_API_Endpoint
    {
        return new WTR_API_Endpoint($entry);
    }
}
