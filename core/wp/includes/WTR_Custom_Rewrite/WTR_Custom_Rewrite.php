<?php

class WTR_Custom_Rewrite
{
    private array $templates;
    private string $prefix;
    private string $pattern;
    private string $pathname;
    private array $taxonomies = [];

    public function __construct(array $args)
    {
        $args['pattern'] = $args['pattern'] ?? null;
        $args['templates'] = $args['templates'] ?? [];
        $args['prefix'] = $args['prefix'] ?? 'custom_';

        // TODO validate args

        $this->templates = $args['templates'];
        $this->prefix = $args['prefix'];
        $this->pattern = $args['pattern'];
        $this->pathname = trim($this->pattern, '/');
        $this->taxonomies = $this->extract_placeholders($this->pathname);
        $this->pathname = $this->replace_placeholders($this->pathname);

        add_action('init', [$this, 'custom_rewrite_rule'], 10, 0);
        add_filter('query_vars', [$this, 'custom_query_vars']);
        add_action('pre_get_posts', [$this, 'custom_main_query']);
        add_action('parse_query', [$this, 'parse_query']);
    }

    private function extract_placeholders($string)
    {
        $pattern = '/:(\w+)/';
        preg_match_all($pattern, $string, $matches);
        return $matches[1];
    }

    private function replace_placeholders($path)
    {
        $path = preg_replace('/:([^\/]+)/', '([^/]+)', $path);

        if ($path[0] != '^') {
            $path = '^' . $path;
        }

        // TODO Pattern should always end like this /?$
        return $path;
    }

    private function generate_taxonomy_query_string($taxonomies)
    {
        $query_string = 'index.php?';
        foreach ($taxonomies as $index => $taxonomy) {
            $query_string .= $this->prefix . $taxonomy . '=$matches[' . ($index + 1) . ']&';
        }
        $query_string = rtrim($query_string, '&');
        return $query_string;
    }

    function custom_rewrite_rule()
    {
        $path = $this->replace_placeholders($this->pathname);
        $query = $this->generate_taxonomy_query_string($this->taxonomies);

        add_rewrite_rule(
            $path,
            $query,
            'top'
        );
    }

    function custom_query_vars($vars)
    {
        foreach ($this->taxonomies as $taxonomy) {
            $vars[] = $this->prefix  . $taxonomy;
        }
        return $vars;
    }

    function every($array, $callback)
    {
        foreach ($array as $item) {
            if (!$callback($item)) {
                return false;
            }
        }
        return true;
    }

    function custom_main_query($query)
    {
        if (
            !is_admin() &&
            $query->is_main_query() &&
            $this->every(
                $this->taxonomies,
                function ($taxonomy) use ($query) {
                    $val = $query->get($this->prefix . $taxonomy);
                    return !empty($val);
                }
            )
        ) {
            $terms = array();
            foreach ($this->taxonomies as $taxonomy) {
                $taxonomy_var = $this->prefix . $taxonomy;
                if ($query->get($taxonomy_var)) {
                    $term = get_term_by('slug', $query->get($taxonomy_var), $taxonomy);

                    if ($term) {
                        $terms[] = array(
                            'taxonomy' => $taxonomy,
                            'slug' => $term->slug,
                        );
                    }
                }
            }
            $query->set('post_type', array('product'));
            $query->set('tax_query', array(
                'relation' => 'AND',
                array_map(function ($term) {
                    return array(
                        'taxonomy' => $term['taxonomy'],
                        'field'    => 'slug',
                        'terms'    => $term['slug'],
                    );
                }, $terms)
            ));
            add_filter('template_include', [$this, 'template_include'], 99);
        }
    }

    function parse_query($query)
    {
        if ($this->every(
            $this->taxonomies,
            function ($taxonomy) use ($query) {
                $val = $query->get($this->prefix . $taxonomy);
                return !empty($val);
            }
        )) {
            foreach ($this->taxonomies as $taxonomy) {
                $taxonomy_var = $this->prefix . $taxonomy;
                if ($query->get($taxonomy_var)) {
                    $term = get_term_by('slug', $query->get($taxonomy_var), $taxonomy);
                    if (empty($term)) {
                        $query->set_404();
                        status_header(404);
                        return;
                    }
                }
            }
        }
    }

    function template_include($template)
    {
        remove_filter('template_include', [$this, 'template_include'], 99);

        foreach ($this->templates as $template) {
            $new_template = locate_template(array($template . '.php'));
        }

        if (is_404()) {
            $new_template = locate_template(array('404.php'));

            if (!empty($new_template)) {
                return $new_template;
            }
        }

        if (!empty($new_template)) {
            $template = $new_template;
        }

        return $template;
    }

    public function get_pathnames()
    {
        $pathnames['default'] = WTR_URL_Utils::get_pathname_from_url($this->pattern);

        foreach (WTR_Locale_Utils::get_locales() as $locale) {
            $pathnames[$locale] = WTR_Locale_Utils::get_localized_url(
                $pathnames['default'],
                $locale
            );
        }

        return $pathnames;
    }

    public function get_templates()
    {
        return $this->templates;
    }
}
