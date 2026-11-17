
<?php

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function rbp_register_rest_routes() {

    register_rest_route(
        'navos-resume/v1',
        '/test',
        array(
            'methods'  => 'GET',
            'callback' => 'rbp_rest_test_callback',
            'permission_callback' => '__return_true',
        )
    );
}

add_action( 'rest_api_init', 'rbp_register_rest_routes' );

/**
 * Test endpoint callback.
 */
function rbp_rest_test_callback() {

    return array(
        'success' => true,
        'message' => 'Navos Resume Builder API is working!',
    );
}
