<?php

class WTR_API_Endpoint
{
    private string $pathname;
    private string $method;
    private ?array $args;
    private $callback;
    private string $pattern; // TODO re-evaluate name at some point

    public function __construct($args)
    {
        $args['method'] = $args['method'] ?? 'GET';
        $args['pattern'] = $args['pattern'] ?? $args['pathname'];
        $args['args'] = $args['args'] ?? [];

        // TODO complete validation
        $this->pattern = $args['pattern'];
        $this->pathname = $args['pathname'];
        $this->method = $args['method'];
        $this->callback = $args['callback'];
        $this->args = $args['args'];

        $this->register_wpreact_custom_rest_route();
    }

    private function register_wpreact_custom_rest_route()
    {
        // spawn Wordpress functions
        add_action('rest_api_init', function () {
            register_rest_route(
                WTR_Config::$wtr_api_namespace,
                $this->pathname,
                [
                    'method' => $this->method,
                    'callback' => $this->callback,
                    'args' => $this->args
                ]
            );
        });
    }

    public function get_pattern()
    {
        return $this->pattern;
    }
}
