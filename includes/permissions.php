
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

    return current_user_can( 'edit_post', $resume_id );
}
