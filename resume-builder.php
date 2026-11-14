
<?php
/**
 * Plugin Name: Navos Resume Builder
 * Description: A WordPress plugin for creating and managing resumes.
 * Version: 1.0.0
 * Author: Lihini Galagedara
 * Text Domain: navos-resume-builder
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Plugin constants.
define( 'RBP_VERSION', '1.0.0' );
define( 'RBP_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'RBP_PLUGIN_URL', plugin_dir_url( __FILE__ ) );


/**
 * Register Resume Custom Post Type.
 */
function rbp_register_resume_post_type() {

    $labels = array(
        'name'               => __( 'Resumes', 'navos-resume-builder' ),
        'singular_name'      => __( 'Resume', 'navos-resume-builder' ),
        'add_new'            => __( 'Add New', 'navos-resume-builder' ),
        'add_new_item'       => __( 'Add New Resume', 'navos-resume-builder' ),
        'edit_item'          => __( 'Edit Resume', 'navos-resume-builder' ),
        'new_item'           => __( 'New Resume', 'navos-resume-builder' ),
        'view_item'          => __( 'View Resume', 'navos-resume-builder' ),
        'search_items'       => __( 'Search Resumes', 'navos-resume-builder' ),
        'not_found'          => __( 'No resumes found', 'navos-resume-builder' ),
        'menu_name'          => __( 'Resume Builder', 'navos-resume-builder' ),
    );

    $args = array(
        'labels'              => $labels,
        'public'              => false,
        'publicly_queryable'  => false,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'show_in_rest'        => false,
        'exclude_from_search' => true,
        'menu_icon'           => 'dashicons-id',
        'supports'            => array( 'title', 'author' ),
        'capability_type'     => 'post',
        'map_meta_cap'        => true,
    );

    register_post_type( 'rbp_resume', $args );
}

add_action( 'init', 'rbp_register_resume_post_type' );


/**
 * Plugin activation.
 */
function rbp_activate_plugin() {

    rbp_register_resume_post_type();

    flush_rewrite_rules();
}

register_activation_hook( __FILE__, 'rbp_activate_plugin' );


/**
 * Plugin deactivation.
 */
function rbp_deactivate_plugin() {

    flush_rewrite_rules();
}

register_deactivation_hook( __FILE__, 'rbp_deactivate_plugin' );


/**
 * Resume Builder shortcode.
 *
 * Usage: [resume_builder]
 */
function rbp_resume_builder_shortcode() {

    if ( ! is_user_logged_in() ) {
        return '<p>' .
            esc_html__( 'Please log in to use the Resume Builder.', 'navos-resume-builder' ) .
            '</p>';
    }

    ob_start();
    ?>

    <div
        id="rbp-resume-builder"
        class="rbp-resume-builder"
    >
        <h2>
            <?php esc_html_e( 'Resume Builder', 'navos-resume-builder' ); ?>
        </h2>

        <p>
            <?php esc_html_e( 'Your resume builder application will appear here.', 'navos-resume-builder' ); ?>
        </p>
    </div>

    <?php

    return ob_get_clean();
}

add_shortcode( 'resume_builder', 'rbp_resume_builder_shortcode' );

/**
 * Save resume data as post metadata.
 */
function rbp_save_resume_data( $resume_id ) {

    if ( get_post_type( $resume_id ) !== 'rbp_resume' ) {
        return;
    }

    if ( ! current_user_can( 'edit_post', $resume_id ) ) {
        return;
    }

    $resume_data = array(

        'personal_info' => array(
            'name'  => 'John Doe',
            'email' => 'john@example.com',
            'phone' => '0771234567',
        ),

        'education'  => array(),
        'experience' => array(),
        'skills'     => array(),

    );

    update_post_meta(
        $resume_id,
        '_rbp_resume_data',
        $resume_data
    );
}

add_action( 'save_post', 'rbp_save_resume_data' );