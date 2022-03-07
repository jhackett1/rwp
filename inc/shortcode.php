<?php

add_action('init', 'rwp_register_shortcode');

function rwp_register_shortcode()
{
    add_shortcode('rwp-postcode-lookup-form', 'rwp_display_postcode_lookup_form');
}

function rwp_display_postcode_lookup_form()
{
    wp_enqueue_style("main", "/wp-content/plugins/rwp/index.css");
    wp_enqueue_script("main", "/wp-content/plugins/rwp/dist/index.js", array(), false, true);

    ob_start();
    include 'template.php';
    return ob_get_clean();
}
