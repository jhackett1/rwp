<?php

add_action("rest_api_init", function () {
    register_rest_route('rwp', '/submit', array(
        'methods' => 'POST',
        'callback' => 'rwp_handler',
    ));
});

function rwp_handler($req)
{
    $endpoint = get_option('rwp_options')["form_submit_endpoint"];
    $recipient_emails = explode("\n", get_option('rwp_options')["candidate_emails"]);

    // 1. get form values
    $data = $req->get_json_params();
    // 2. save submission
    $remote_res = wp_remote_post($endpoint, array(
        'body' => json_encode($data),
        'headers' => [
            'Content-Type' => 'application/json',
        ]
    ));
    if (is_wp_error($remote_res)) return  new WP_Error('failed_submit', 'Failed to submit', array('status' => 500));;
    // 3. send email
    $success = false;

    for ($i = 0; $i < count($recipient_emails); $i++) {
        $success = wp_mail(str_replace("\r", "", $recipient_emails[$i]), $data["subject"], $data["body"]);
    }
    if (!$success) return new WP_Error('failed_email', 'Failed to send email', array('status' => 500));
    $res = new WP_REST_Response();
    $res->set_status(201);
    return $res;
}
