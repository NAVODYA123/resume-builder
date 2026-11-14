
<?php

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function rbp_enqueue_assets() {

    // Only load assets on pages containing our shortcode.
    if ( ! is_singular() ) {
        return;
    }

    global $post;

    if ( ! $post || ! has_shortcode( $post->post_content, 'resume_builder' ) ) {
        return;
    }

    $asset_file = RBP_PLUGIN_DIR . 'build/index.asset.php';

    if ( ! file_exists( $asset_file ) ) {
        return;
    }

    $asset = require $asset_file;

    wp_enqueue_script(
        'rbp-resume-builder',
        RBP_PLUGIN_URL . 'build/index.js',
        $asset['dependencies'],
        $asset['version'],
        true
    );

    wp_enqueue_style(
        'rbp-resume-builder',
        RBP_PLUGIN_URL . 'build/index.css',
        array(),
        $asset['version']
    );

    wp_localize_script(
        'rbp-resume-builder',
        'rbpApi',
        array(
            'root'  => esc_url_raw( rest_url() ),
            'nonce' => wp_create_nonce( 'wp_rest' ),
        )
    );
}

add_action( 'wp_enqueue_scripts', 'rbp_enqueue_assets' );
