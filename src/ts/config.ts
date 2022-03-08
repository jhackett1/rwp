interface Config {
  intro_message: string
  //   labels
  name_label: string
  email_label: string
  subject_label: string
  body_label: string
  postcode_label: string
  //   defaults
  default_subject: string
  default_message: string
  //   errors
  sending_failed_error: string
  invalid_postcode_error: string
  //   sharing messages
  twitter_share_message: string
  facebook_share_message: string
  whatsapp_share_message: string
}

declare global {
  interface Window {
    ___RWP_CONFIG___: Config
  }
}

// set initial config
const config: Config = {
  intro_message: "",
  sending_failed_error:
    "There was a problem sending your message. Please refresh the page or try again later.",
  default_message: "",
  default_subject: "",
  name_label: "Your name",
  email_label: "Your email",
  subject_label: "Subject",
  body_label: "Message",
  postcode_label: "Your postcode",
  invalid_postcode_error:
    "We need your postcode to send your message to the right place",
  twitter_share_message: "Example twitter share message",
  facebook_share_message: "Example facebook share message",
  whatsapp_share_message: "Example whatsapp share message",
  ...window?.___RWP_CONFIG___,
}

console.log(window.___RWP_CONFIG___)

export default config
