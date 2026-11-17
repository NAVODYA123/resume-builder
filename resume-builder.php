
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

// Plugin version.
define( 'RBP_VERSION', '1.0.0' );

// Plugin directory path.
define( 'RBP_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );

// Plugin URL.
define( 'RBP_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

// Load plugin files.
require_once RBP_PLUGIN_DIR . 'includes/post-types.php';
require_once RBP_PLUGIN_DIR . 'includes/permissions.php';
require_once RBP_PLUGIN_DIR . 'includes/resume-service.php';
require_once RBP_PLUGIN_DIR . 'includes/rest-api.php';
require_once RBP_PLUGIN_DIR . 'includes/shortcode.php';
require_once RBP_PLUGIN_DIR . 'includes/assets.php';

// Activation hook.
function rbp_activate_plugin() {

    rbp_register_resume_post_type();

    flush_rewrite_rules();
}

register_activation_hook( __FILE__, 'rbp_activate_plugin' );

// Deactivation hook.
function rbp_deactivate_plugin() {

    flush_rewrite_rules();
}

register_deactivation_hook( __FILE__, 'rbp_deactivate_plugin' );
