
<?php

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function rbp_register_resume_post_type() {

    $labels = array(
        'name'          => 'Resumes',
        'singular_name' => 'Resume',
        'add_new'       => 'Add New',
        'add_new_item'  => 'Add New Resume',
        'edit_item'     => 'Edit Resume',
        'all_items'     => 'All Resumes',
    );

    $args = array(
        'labels'          => $labels,
        'public'          => false,
        'show_ui'         => true,
        'show_in_menu'    => true,
        'show_in_rest'    => false,
        'supports'        => array( 'title', 'author' ),
        'capability_type' => 'post',
        'map_meta_cap'    => true,
        'menu_icon'       => 'dashicons-id',
    );

    register_post_type( 'rbp_resume', $args );
}

add_action( 'init', 'rbp_register_resume_post_type' );
