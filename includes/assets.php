
<?php

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Enqueue React application assets.
 */
function rbp_enqueue_react_app() {



    $build_dir = RBP_PLUGIN_DIR . 'assets/build/';
    $build_url = RBP_PLUGIN_URL . 'assets/build/';

    $manifest_path = $build_dir . '.vite/manifest.json';

    if ( ! file_exists( $manifest_path ) ) {
        return;
    }

    $manifest = json_decode(
        file_get_contents( $manifest_path ),
        true
    );

   $entry = $manifest['src/main.tsx'] ?? null;
// $entry = $manifest['index.html'] ?? null;

    if ( ! $entry ) {
        return;
    }

    error_log( 'RBP: Enqueueing React application' );

error_log( 'RBP: React JS URL: ' . $build_url . $entry['file'] );

    // Enqueue CSS.
    if ( ! empty( $entry['css'] ) ) {

        foreach ( $entry['css'] as $index => $css_file ) {

            wp_enqueue_style(
                'rbp-react-style-' . $index,
                $build_url . $css_file,
                array(),
                RBP_VERSION
            );
        }
    }

    // Enqueue JavaScript.
    wp_enqueue_script(
        'rbp-react-app',
        $build_url . $entry['file'],
        array(),
        RBP_VERSION,
        true
    );

    // Load JavaScript as an ES module.
    add_filter(
        'script_loader_tag',
        'rbp_add_module_type',
        10,
        3
    );
}

/**
 * Add type="module" to the React script.
 */
function rbp_add_module_type( $tag, $handle, $src ) {

    if ( 'rbp-react-app' !== $handle ) {
        return $tag;
    }

    return '<script type="module" src="' .
        esc_url( $src ) .
        '"></script>';
}

add_action(
    'wp_enqueue_scripts',
    'rbp_enqueue_react_app'
);
