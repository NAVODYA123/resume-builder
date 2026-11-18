
<?php

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Register Resume REST API routes.
 */
function rbp_register_rest_routes() {

    // Create and retrieve all resumes.
    register_rest_route(
        'navos-resume/v1',
        '/resumes',
        array(
            array(
                'methods'             => WP_REST_Server::CREATABLE,
                'callback'            => 'rbp_create_resume_callback',
                'permission_callback' => 'rbp_rest_user_permission',
            ),
            array(
                'methods'             => WP_REST_Server::READABLE,
                'callback'            => 'rbp_get_resumes_callback',
                'permission_callback' => 'rbp_rest_user_permission',
            ),
        )
    );

    // Retrieve, update and delete an individual resume.
    register_rest_route(
        'navos-resume/v1',
        '/resumes/(?P<id>\d+)',
        array(
            array(
                'methods'             => WP_REST_Server::READABLE,
                'callback'            => 'rbp_get_resume_callback',
                'permission_callback' => 'rbp_rest_resume_permission',
            ),
            array(
                'methods'             => WP_REST_Server::EDITABLE,
                'callback'            => 'rbp_update_resume_callback',
                'permission_callback' => 'rbp_rest_resume_permission',
            ),
            array(
                'methods'             => WP_REST_Server::DELETABLE,
                'callback'            => 'rbp_delete_resume_callback',
                'permission_callback' => 'rbp_rest_resume_permission',
            ),
        )
    );

}

add_action( 'rest_api_init', 'rbp_register_rest_routes' );


/**
 * Check whether the user is logged in.
 */
function rbp_rest_user_permission() {

    return is_user_logged_in();
}


/**
 * Check whether the current user owns the resume.
 */
function rbp_rest_resume_permission( $request ) {

    if ( ! is_user_logged_in() ) {
        return false;
    }

    $resume_id = (int) $request['id'];

    if ( ! rbp_user_can_manage_resume( $resume_id ) ) {
        return new WP_Error(
            'rbp_forbidden',
            'You are not allowed to access this resume.',
            array( 'status' => 403 )
        );
    }

    return true;
}


/**
 * Create a new resume.
 */
function rbp_create_resume_callback( $request ) {

    $resume_data = $request->get_param( 'resumeData' );
    $title       = $request->get_param( 'title' );

    if ( ! is_array( $resume_data ) || empty( $resume_data ) ) {
        return new WP_Error(
            'rbp_invalid_data',
            'Invalid resume data.',
            array( 'status' => 400 )
        );
    }

    $resume_id = wp_insert_post(
        array(
            'post_type'   => 'rbp_resume',
            'post_title'  => sanitize_text_field(
                $title ?: 'Untitled Resume'
            ),
            'post_status' => 'private',
            'post_author' => get_current_user_id(),
        ),
        true
    );

    if ( is_wp_error( $resume_id ) ) {
        return $resume_id;
    }

    rbp_save_resume_data( $resume_id, $resume_data );

    return new WP_REST_Response(
        array(
            'success'   => true,
            'resumeId'  => $resume_id,
            'message'   => 'Resume saved successfully.',
        ),
        201
    );
}


/**
 * Get all resumes belonging to the current user.
 */
function rbp_get_resumes_callback() {

    $query = new WP_Query(
        array(
            'post_type'      => 'rbp_resume',
            'post_status'    => 'private',
            'author'         => get_current_user_id(),
            'posts_per_page' => -1,
            'orderby'        => 'date',
            'order'          => 'DESC',
        )
    );

    $resumes = array();

    foreach ( $query->posts as $resume ) {

        $resumes[] = array(
            'id'       => $resume->ID,
            'title'    => $resume->post_title,
            'modified' => $resume->post_modified,
        );
    }

    return rest_ensure_response( $resumes );
}


/**
 * Get an individual resume.
 */
function rbp_get_resume_callback( $request ) {

    $resume_id = (int) $request['id'];

    return rest_ensure_response(
        array(
            'id'          => $resume_id,
            'title'       => get_the_title( $resume_id ),
            'resumeData'  => rbp_get_resume_data( $resume_id ),
        )
    );
}


/**
 * Update an existing resume.
 */
function rbp_update_resume_callback( $request ) {

    $resume_id   = (int) $request['id'];
    $resume_data = $request->get_param( 'resumeData' );

    if ( ! is_array( $resume_data ) || empty( $resume_data ) ) {
        return new WP_Error(
            'rbp_invalid_data',
            'Invalid resume data.',
            array( 'status' => 400 )
        );
    }

    $title = $request->get_param( 'title' );

    if ( $title !== null ) {

        wp_update_post(
            array(
                'ID'         => $resume_id,
                'post_title' => sanitize_text_field( $title ),
            )
        );
    }

    rbp_save_resume_data( $resume_id, $resume_data );

    return rest_ensure_response(
        array(
            'success'  => true,
            'resumeId' => $resume_id,
            'message'  => 'Resume updated successfully.',
        )
    );
}


/**
 * Delete a resume.
 */
function rbp_delete_resume_callback( $request ) {

    $resume_id = (int) $request['id'];

    $deleted = wp_delete_post( $resume_id, true );

    if ( ! $deleted ) {
        return new WP_Error(
            'rbp_delete_failed',
            'Could not delete the resume.',
            array( 'status' => 500 )
        );
    }

    return rest_ensure_response(
        array(
            'success' => true,
            'message' => 'Resume deleted successfully.',
        )
    );
}
