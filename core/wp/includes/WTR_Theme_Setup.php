<?php

class WTR_Theme_Setup
{
    public function __construct()
    {
        $this->include_wtr_dist();
        $this->register_locale();
        $this->register_bloginfo();
        $this->register_menu();
        $this->register_routes();
        require get_template_directory() . '/includes/endpoint.php';
        include get_template_directory() . '/includes/user/index.php';
    }

    private function include_wtr_dist()
    {
        add_action('wp_enqueue_scripts', function () {
            $version = time();
            wp_enqueue_script('wtr-script', get_template_directory_uri() . '/dist/main.js', array(), $version, true);
        });

        add_action('wp_enqueue_scripts', function () {
            $version = time();
            wp_enqueue_style('wtr-style', get_template_directory_uri() . '/dist/main.css', array(), $version, 'all');
        });
    }

    private function register_bloginfo()
    {
        WTR_API_Endpoint_Collection::getInstance()->push([
            'pathname' => 'site-info',
            'callback' => function (WP_REST_Request $request) {
                wp_send_json(WTR_Locale_Utils::get_locale_output());
            }
        ]);

        WP_Utils::append_as_json('site-info', WP_Utils::get_site_info());
    }

    private function register_locale()
    {
        WTR_API_Endpoint_Collection::getInstance()->push([
            'pathname' => 'locale',
            'callback' => function (WP_REST_Request $request) {
                wp_send_json(WTR_Locale_Utils::get_locale_output());
            }
        ]);

        WP_Utils::append_as_json('locale', WTR_Locale_Utils::get_locale_output());
    }

    private function register_menu()
    {
        WTR_API_Endpoint_Collection::getInstance()->push([
            'pathname' => 'menu',
            'callback' => function (WP_REST_Request $request) {
                wp_send_json(WTR_Menu_Utils::get_menus());
            }
        ]);

        WP_Utils::append_as_json('menu', WTR_Menu_Utils::get_menus());
    }

    private function register_routes()
    {
        add_action('init', function () {
            /**
            Check HP
             */

            $wtr_front_page = new WTR_Front_Page();

            if ($wtr_front_page->is_active) {
                WTR_Route_Collection::self()->push([
                    'pathnames' => $wtr_front_page->get_pathnames(),
                    'templates' => $wtr_front_page->get_templates(),
                    'endpoint' => $wtr_front_page->get_wtr_endpoint(),
                ]);
            }

            $wtr_home = new WTR_Home();

            if ($wtr_home->is_active) {
                WTR_Route_Collection::self()->push([
                    'pathnames' => $wtr_home->get_pathnames(),
                    'templates' => $wtr_home->get_templates(),
                    'endpoint' => $wtr_home->get_wtr_endpoint(),
                ]);
            }

            /**
            Check registered PT
             */

            $registered_post_types = WTR_WP_Post_Type_Reader::get_viewable();

            foreach ($registered_post_types as $registered_post_type) {
                $wtr_archive = WTR_WP_Post_Type_Reader::get_wtr_archive($registered_post_type);
                $wtr_post = WTR_WP_Post_Type_Reader::get_wtr_post($registered_post_type);

                if (!empty($wtr_archive)) {
                    WTR_Route_Collection::self()->push([
                        'pathnames' => $wtr_archive->get_pathnames(),
                        'templates' => $wtr_archive->get_templates(),
                        'endpoint' => $wtr_archive->get_wtr_endpoint()
                    ]);
                }

                if (!empty($wtr_post)) {
                    WTR_Route_Collection::self()->push([
                        'pathnames' => $wtr_post->get_pathnames(),
                        'templates' => $wtr_post->get_templates(),
                        'endpoint' => $wtr_post->get_wtr_endpoint()
                    ]);
                }
            }

            /**
            Check registered TAX
             */

            $registered_taxonomies = WTR_WP_Taxonomy_Reader::get_viewable();

            foreach ($registered_taxonomies as $registered_taxonomy) {
                $wtr_term = WTR_WP_Taxonomy_Reader::get_wtr_term($registered_taxonomy);

                if (!empty($wtr_term)) {
                    WTR_Route_Collection::self()->push([
                        'pathnames' => $wtr_term->get_pathnames(),
                        'templates' => $wtr_term->get_templates(),
                        'endpoint' => $wtr_term->get_wtr_endpoint()
                    ]);
                }
            }

            /**
            Check custom Rewrites
             */

            // TODO needs to be done with custom rewrites too
            $registered_rewrites = WTR_Custom_Rewrite_Collection::self()->get();

            foreach ($registered_rewrites as $registered_rewrite) {
                WTR_Route_Collection::self()->push([
                    'pathnames' => $registered_rewrite->get_pathnames(),
                    'templates' => $registered_rewrite->get_templates(),
                    'endpoint' => null // TODO maybe it needs to be passed to register_custom_rewrite as callback
                ]);
            }

            /**
            Handle routes and print to footer
             */

            $routes = WTR_Route_Collection::self()->get();

            $routes_response = array_map(function ($route) {
                return [
                    'pathnames' => $route->get_pathnames(),
                    'endpoint' => $route->get_endpoint() ? $route->get_endpoint()->get_pattern() : null,
                    'templates' => $route->get_templates()
                ];
            }, $routes); // TODO this could be a ´format´ method

            WTR_API_Endpoint_Collection::getInstance()->push([
                'pathname' => 'routes',
                'callback' => function (WP_REST_Request $request) use ($routes_response) {
                    wp_send_json($routes_response);
                }
            ]);

            WP_Utils::append_as_json('routes', $routes_response);
        }, 100); // TODO evaluate priority
    }
}
