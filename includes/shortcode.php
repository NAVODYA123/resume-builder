
<?php

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function rbp_register_resume_shortcode() {

    add_shortcode( 'resume_builder', 'rbp_render_resume_builder' );
}

add_action( 'init', 'rbp_register_resume_shortcode' );

/**
 * Render the Resume Builder application.
 */
function rbp_render_resume_builder() {

    if ( ! is_user_logged_in() ) {
        return '<p>Please log in to create and manage your resumes.</p>';
    }

    // Load the React application.
    rbp_enqueue_react_app();

    return '<div id="rbp-resume-builder"></div>';
}


// function rbp_render_resume_builder() {

//     if ( ! is_user_logged_in() ) {
//         return '<p>Please log in to create and manage your resumes.</p>';
//     }

//     return '<h2>SHORTCODE IS WORKING!</h2>
//             <div id="rbp-resume-builder">
//                 REACT ROOT FOUND
//             </div>';
// }

