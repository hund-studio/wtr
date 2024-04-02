<?php

class WPREACT_Api
{
    public string $rest_namespace = 'wpreact/v1';
    public string $post_type_name;
    public ?string $post_name;
    public string $layout;
    private string $endpoint;
    private string $ref;

    public function __construct(string $layout,  \WP_Post_Type | \WP_Taxonomy  $post_object, string $post_name = null)
    {
        $api_base_url = get_rest_url();

        $this->post_type_name = $post_object->name;
        $this->post_name = $post_name;
        $this->layout = $layout;

        $this->endpoint = "{$api_base_url}{$this->rest_namespace}/{$this->post_type_name}";

        $api_base_url = get_rest_url();
        $rest_namespace = $post_object->rest_namespace ?: 'wp/v2';
        $rest_base = $post_object->rest_base ?: $post_object->name;
        $this->ref = "{$api_base_url}{$rest_namespace}/{$rest_base}";

        switch ($layout) {
            case 'single':
                $slug = $this->post_name ?: ':slug';
                $this->endpoint .= "/" . $slug;
                break;
            case 'taxonomy':
                $slug = $this->post_name ?: ':slug';
                $this->endpoint .= "/" . $slug;
                break;
        }
    }

    public function register()
    {
        switch ($this->layout) {
            case 'taxonomy':
                register_rest_route($this->rest_namespace, "/{$this->post_type_name}/(?P<slug>[\w-]+)", array(
                    'methods' => 'GET',
                    'callback' => function ($request) {
                        $slug = $request['slug'];
                        $term = get_term_by('slug', $slug, $this->post_type_name);
                        if ($term) {
                            $url = "{$this->ref}/{$term->ID}";
                            $response =  wp_remote_get($url);
                            if (is_array($response) && !is_wp_error($response) && $response['response']['code'] == 200) {
                                $body = wp_remote_retrieve_body($response);
                                return rest_ensure_response(json_decode($body));
                            } else {
                                return new WP_Error(
                                    'rest_request_failed',
                                    'Request to external API failed',
                                    array(
                                        'status' => 500,
                                        "ref" => $url,
                                    )
                                );
                            }
                        } else {
                            return new WP_Error('post_not_found', 'Post not found', array('status' => 404));
                        }
                    },
                    'args' => array(
                        'slug' => array(
                            'validate_callback' => function ($value, $request, $param) {
                                if (is_string($value) && preg_match('/^[\w-]+$/', $value)) {
                                    return true;
                                }
                                return new WP_Error('rest_invalid_param', 'Invalid slug parameter.', array('status' => 400));
                            },
                        ),
                    ),
                ));
                break;
            case 'single':
                register_rest_route($this->rest_namespace, "/{$this->post_type_name}/(?P<slug>[\w-]+)", array(
                    'methods' => 'GET',
                    'callback' => function ($request) {
                        $slug = $request['slug'];
                        $post = get_page_by_path($slug, OBJECT, $this->post_type_name);
                        if ($post) {
                            $url = "{$this->ref}/{$post->ID}";
                            $url = add_query_arg(['_acf' => 'acf', 'acf_format' => 'standard'], $url);
                            $response =  wp_remote_get($url);
                            if (is_array($response) && !is_wp_error($response) && $response['response']['code'] == 200) {
                                $body = wp_remote_retrieve_body($response);
                                return rest_ensure_response(json_decode($body));
                            } else {
                                return new WP_Error(
                                    'rest_request_failed',
                                    'Request to external API failed',
                                    array(
                                        'status' => 500,
                                        "ref" => $url,
                                    )
                                );
                            }
                        } else {
                            return new WP_Error('post_not_found', 'Post not found', array('status' => 404));
                        }
                    },
                    'args' => array(
                        'slug' => array(
                            'validate_callback' => function ($value, $request, $param) {
                                if (is_string($value) && preg_match('/^[\w-]+$/', $value)) {
                                    return true;
                                }
                                return new WP_Error('rest_invalid_param', 'Invalid slug parameter.', array('status' => 400));
                            },
                        ),
                    ),
                ));
                break;
            case 'archive':
                register_rest_route($this->rest_namespace, "/{$this->post_type_name}/", array(
                    'methods' => 'GET',
                    'callback' => function ($request) {
                        $url = "{$this->ref}";
                        $url = add_query_arg(['_acf' => 'acf', 'acf_format' => 'standard'], $url);
                        $response =  wp_remote_get($url);
                        if (is_array($response) && !is_wp_error($response) && $response['response']['code'] == 200) {
                            $body = wp_remote_retrieve_body($response);
                            return rest_ensure_response(json_decode($body));
                        } else {
                            return new WP_Error(
                                'rest_request_failed',
                                'Request to external API failed',
                                array(
                                    'status' => 500,
                                    "ref" => $url,
                                )
                            );
                        }
                    },

                ));
                break;
        }
    }

    public function get_endpoint()
    {
        return $this->endpoint;
    }
}

$wpreact_api_collection = [];

function wpreact_get_path_from_url(string $url)
{
    $path = parse_url($url, PHP_URL_PATH);
    $trimmed = !empty($path) ? ltrim($path, '/') : '';

    return '/' . $trimmed;
}

function wpreact_get_url_from_path(string $pathname)
{
    $url = get_site_url();
    return "{$url}{$pathname}";
}

function wpreact_check_homepage_rules()
{
    $front_page_setting = get_option('show_on_front');

    $templates = [];

    if ($front_page_setting == 'posts') {
        array_push($templates, 'posts');
    } elseif ($front_page_setting == 'page') {
        $front_page_id = get_option('page_on_front');
        $posts_page_id = get_option('page_for_posts');

        if ($front_page_id) {
            array_push($templates, 'page');
        }

        if ($posts_page_id) {
            array_push($templates, 'posts');
        }
    }

    return $templates;
}

function  wpreact_replace_permalink_placeholder(string $input, string $placeholder, string $replacement)
{
    $pattern = "/$placeholder/";
    return preg_replace($pattern, $replacement, $input);
}

function wpreact_format_route_info(
    string $type = null,
    string $url = null,
    string $endpoint = null,
    array $templates = [],
) {
    $locales = wpreact_get_locales();

    return [
        "type" => $type,
        "pathnames" => array_merge([
            'default' => wpreact_get_path_from_url($url)
        ], ...array_map(function ($locale) use ($url) {
            return [
                $locale => wpreact_get_path_from_url(wpreact_get_locale_url(
                    $url,
                    $locale
                ))
            ];
        }, $locales)),
        'endpoint' => $endpoint,
        'templates' => $templates,
    ];
}


function wpreact_get_templates(string $layout, \WP_Post_Type  | \WP_Taxonomy $post_object, array $args = [])
{
    $templates = [];

    switch ($layout) {
        case 'archive':
            $templates = ["archive-$post_object->name", "archive"];
            if (array_key_exists('is_homepage', $args) && $args['is_homepage'] === true) {
                array_splice($templates, 0, 0, "home");
            }
            break;
        case 'single':
            if ($post_object->name !== "page") {
                $templates = ["single-$post_object->name", "single"];

                if (array_key_exists('post_name', $args)) {
                    array_splice($templates, 0, 0, "single-{$post_object->name}-{$args['post_name']}");
                }
                break;
            }

            $templates = ["page"];

            if (array_key_exists('post_name', $args)) {
                array_splice($templates, 0, 0, "page-{$args['post_name']}");
            }
            if (array_key_exists('is_homepage', $args) && $args['is_homepage'] === true) {
                array_splice($templates, 0, 0, "front-page");
            }
            break;
        case 'taxonomy':
            if ($post_object->name === "category") {
                $templates = ["category", "archive"];

                if (array_key_exists('post_name', $args)) {
                    array_splice($templates, 0, 0, "category-{$args['post_name']}");
                }
                break;
            }

            if ($post_object->name !== "tag") {
                $templates = ["tag", "archive"];

                if (array_key_exists('post_name', $args)) {
                    array_splice($templates, 0, 0, "tag-{$args['post_name']}");
                }
                break;
            }

            $templates = ["taxonomy-$post_object->name", "taxonomy", "archive"];

            if (array_key_exists('post_name', $args)) {
                array_splice($templates, 0, 0, "taxonomy-{$post_object->name}-{$args['post_name']}");
            }
            break;
    }

    return $templates;
}

function wpreact_register_endpoint(string $layout, \WP_Post_Type | \WP_Taxonomy $post_object, array $args = [])
{
    global $wpreact_api_collection;

    $arg_post_name = $args['post_name'] ?: null;
    $wpreact_api =  new WPREACT_Api($layout, $post_object, $arg_post_name);
    array_push($wpreact_api_collection, $wpreact_api);

    return $wpreact_api->get_endpoint();
}

function wpreact_get_registered_post_types()
{
    return get_post_types([], 'names');
}

function wpreact_get_registered_taxonomies()
{
    return get_taxonomies(array(), 'names');
}

function wpreact_is_viewable_post_type(string $post_type)
{
    return is_post_type_viewable($post_type) && $post_type !== 'attachment';
}

function wpreact_is_viewable_taxonomy(string $taxonomy)
{
    return is_taxonomy_viewable($taxonomy);
}

function wpreact_get_viewable_post_types()
{
    $post_types = wpreact_get_registered_post_types();
    return array_values(array_filter($post_types, 'wpreact_is_viewable_post_type'));
}

function wpreact_get_viewable_taxonomies()
{
    $taxonomies = wpreact_get_registered_taxonomies();
    return array_values(array_filter($taxonomies, 'wpreact_is_viewable_taxonomy'));
}

function wpreact_get_post_type_archive_info(\WP_Post_Type $post_type_object)
{
    $post_type_archive_link = get_post_type_archive_link($post_type_object->name);
    $has_homepage_url = wpreact_get_path_from_url(
        wpreact_get_locale_url(
            $post_type_archive_link,
            wpreact_get_default_locale()
        )
    ) === "/";
    $is_invalid_page = !in_array('posts', wpreact_check_homepage_rules()) && $has_homepage_url;

    if (!$is_invalid_page) {
        if (!empty($post_type_archive_link)) {
            return wpreact_format_route_info(
                $post_type_object->name,
                $post_type_archive_link,
                wpreact_register_endpoint('archive', $post_type_object),
                wpreact_get_templates('archive', $post_type_object, [
                    'is_homepage' => in_array('posts', wpreact_check_homepage_rules()) && $has_homepage_url
                ])
            );
        }
    }

    return null;
}

function wpreact_get_post_type_single_info(\WP_Post_Type $post_type_object)
{
    $post_type_info = [];

    $post_type_posts = get_posts(['post_type' => $post_type_object->name, 'numberposts' => -1]);

    foreach ($post_type_posts as $post) {
        $has_homepage_url = wpreact_get_path_from_url(
            wpreact_get_locale_url(
                get_permalink($post),
                wpreact_get_default_locale()
            )
        ) === '/';

        array_push($post_type_info, wpreact_format_route_info(
            $post_type_object->name,
            get_permalink($post),
            wpreact_register_endpoint('single', $post_type_object, [
                'post_name' => $post->post_name
            ]),
            wpreact_get_templates('single', $post_type_object, [
                'is_homepage' => in_array('page', wpreact_check_homepage_rules()) && $has_homepage_url,
                'post_name' => $post->post_name
            ])
        ));
    }

    return $post_type_info;
}

function wpreact_get_post_type_info(string $post_type)
{
    $post_type_object = get_post_type_object($post_type);

    if (!is_null($post_type_object)) {
        return array_values(array_filter([
            wpreact_get_post_type_archive_info($post_type_object),
            ...wpreact_get_post_type_single_info($post_type_object)
        ]));
    }

    return null;
}

function wpreact_get_taxonomy_info(string $taxonomy)
{
    $taxonomy_object = get_taxonomy($taxonomy);
    $taxonomy_info = [];

    if (!is_null($taxonomy_object)) {
        $taxonomy_terms = get_terms($taxonomy);

        foreach ($taxonomy_terms as $term) {
            array_push($taxonomy_info, wpreact_format_route_info(
                $taxonomy_object->name,
                get_term_link($term, $taxonomy),
                wpreact_register_endpoint('taxonomy', $taxonomy_object, [
                    'post_name' => $term->slug
                ]),
                wpreact_get_templates('taxonomy', $taxonomy_object, [
                    'post_name' => $term->slug
                ])
            ));
        }
    }

    return $taxonomy_info;
}

function wpreact_get_posts_types_info()
{
    return array_merge(...array_map('wpreact_get_post_type_info', wpreact_get_viewable_post_types()));
}

function wpreact_get_taxonomies_info()
{
    return array_merge(...array_map('wpreact_get_taxonomy_info', wpreact_get_viewable_taxonomies()));
}

function wpreact_get_info()
{
    return array_merge(
        wpreact_get_posts_types_info(),
        wpreact_get_taxonomies_info()
    );
}

add_action('rest_api_init', function () {
    global $wpreact_api_collection;

    wpreact_get_info();

    foreach ($wpreact_api_collection as $wpreact_api) {
        $wpreact_api->register();
    }

    register_rest_route('wpreact/v1', '/registered-paths', [
        'methods' => 'GET',
        'callback' => function () {
            wp_send_json(wpreact_get_info());
        },
    ]);
});

add_action('wp_footer', function () {
    $json = json_encode(wpreact_get_info());
    $existing_json_data = '<script type="application/json" id="json-data"></script>';
    $output = str_replace('</script>', $json . '</script>', $existing_json_data);
    echo $output;
});
