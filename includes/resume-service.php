
<?php

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Get resume data.
 */
function rbp_get_resume_data( $resume_id ) {

    return get_post_meta(
        $resume_id,
        '_rbp_resume_data',
        true
    );
}

/**
 * Save resume data.
 */
function rbp_save_resume_data( $resume_id, $resume_data ) {

    if ( ! rbp_user_can_manage_resume( $resume_id ) ) {
        return false;
    }

    return update_post_meta(
        $resume_id,
        '_rbp_resume_data',
        $resume_data
    );
}
