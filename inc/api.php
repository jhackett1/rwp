<?php

add_action("rest_api_init", function () {
    register_rest_route('rwp', '/submit', array(
        'methods' => 'POST',
        'callback' => 'rwp_handler',
    ));
});

function rwp_handler($data)
{
    // 1. save details
    wp_remote_post();
    // 2. send emails
    wp_mail();
}
