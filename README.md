# rwp

A tiny WP plugin.

It gives you a shortcode `[rwp-postcode-lookup-form]`, which spits out the HTML of a form and enqueues the JavaScript.

## Developing

    Run npm i and npm run build
    Delete the node_modules, src and .cache directories, which aren't needed once built.
    Compress the whole directory, upload it to a WP site and activate it.
