<?php

class WTR_Route
{
    private array $pathnames;
    private ?WTR_API_Endpoint $endpoint;
    private array $templates;

    public function __construct($args)
    {
        $args['pathnames'] = $args['pathnames'] ?? [];
        $args['endpoint'] = $args['endpoint'] ?? null;
        $args['templates'] = $args['templates'] ?? [];

        $this->validate_args($args);

        $this->pathnames = $args['pathnames'];
        $this->endpoint = $args['endpoint'];
        $this->templates = $args['templates'];
    }

    private function validate_args($args): void
    {
        WTR_Validation_Utils::is_array($args);
        WTR_Validation_Utils::is_string_map($args['pathnames']);
        if (!is_null($args['endpoint'])) {
            WTR_Validation_Utils::is_wtr_api_endpoint($args['endpoint']);
        }
        WTR_Validation_Utils::is_string_array($args['templates']);
    }

    public function validate(): bool
    {
        try {
            WTR_Validation_Utils::is_string_map($this->pathnames);
            if (!is_null($this->endpoint)) {
                WTR_Validation_Utils::is_wtr_api_endpoint($this->endpoint);
            }
            WTR_Validation_Utils::is_string_array($this->templates);
            return true;
        } catch (Exception $exception) {
            return false;
        }
    }

    public function get_pathnames()
    {
        return $this->pathnames;
    }

    public function get_endpoint()
    {
        return $this->endpoint;
    }

    public function get_templates()
    {
        return $this->templates;
    }
}
