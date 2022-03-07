<?php


function rwp_text_field(string $label, string $name, string $section, bool $textarea = false)
{
    add_settings_field("rwp_setting_{$name}", $label, function () use ($name, $textarea) {
        $options = get_option('rwp_options');

        if ($textarea) {
            echo "<textarea id='rwp_setting_{$name}' name='rwp_options[{$name}]'>" . esc_attr($options[(string) $name] ?? "") . "</textarea>";
        } else {
            echo "<input id='rwp_setting_{$name}' name='rwp_options[{$name}]' type='text' value='" . esc_attr($options[(string) $name] ?? "") . "' />";
        }
    }, 'rwp', $section);
}


function rwp_add_settings_page()
{
    add_options_page('Pledge form settings', 'Pledge Form', 'manage_options', 'rwp', 'rwp_render_plugin_settings_page');
}
add_action('admin_menu', 'rwp_add_settings_page');

function rwp_render_plugin_settings_page()
{
?>
    <div class="wrap">
        <h2>Pledge Form Settings</h2>

        <form action="options.php" method="post">
            <?php
            settings_fields('rwp_options');
            do_settings_sections('rwp');
            ?>
            <input name="submit" class="button button-primary" type="submit" value="<?php esc_attr_e('Save'); ?>" />
        </form>
    </div>
<?php
}

function rwp_register_settings()
{
    register_setting('rwp_options', 'rwp_options');

    add_settings_section('form_content', 'Form content', function () {
    }, 'rwp');

    rwp_text_field("Intro message", "intro_message", "form_content");

    rwp_text_field("Name label", "name_label", "form_content");
    rwp_text_field("Email label", "email_label", "form_content");
    rwp_text_field("Subject label", "Subject_label", "form_content");
    rwp_text_field("Body label", "body_label", "form_content");
    rwp_text_field("Postcode label", "postcode_label", "form_content");

    rwp_text_field("Default subject ", "default_subject", "form_content");
    rwp_text_field("Default body ", "default_message", "form_content", true);

    rwp_text_field("Sending failed error", "sending_failed_error", "form_content");
    rwp_text_field("Invalid postcode error", "invalid_postcode_error", "form_content");

    add_settings_section('share_messages', 'Share messages', function () {
    }, 'rwp');

    rwp_text_field("Twitter", "twitter_share_message", "share_messages", true);
    rwp_text_field("Facebook", "facebook_share_message", "share_messages", true);
    rwp_text_field("Whatsapp", "whatsapp_share_message", "share_messages", true);
}
add_action('admin_init', 'rwp_register_settings');
