
<?php

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Check whether the current user can manage a resume.
 */
function rbp_user_can_manage_resume( $resume_id ) {

    $resume = get_post( $resume_id );

    if ( ! $resume || 'rbp_resume' !== $resume->post_type ) {
        return false;
    }

    // Allow the resume owner.
    if ( (int) $resume->post_author === get_current_user_id() ) {
        return true;
    }

    // Allow WordPress administrators.
    return current_user_can( 'manage_options' );
}