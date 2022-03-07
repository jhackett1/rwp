interface Config {
  introMessage: string
  //   labels
  nameLabel: string
  emailLabel: string
  subjectLabel: string
  bodyLabel: string
  postcodeLabel: string
  //   defaults
  defaultSubject: string
  defaultMessage: string
  //   errors
  sendingFailedError: string
  invalidPostcodeError: string
  //   sharing messages
  twitterShareMessage: string
  facebookShareMessage: string
  whatsappShareMessage: string
}

declare global {
  interface Window {
    ___RWP_CONFIG___: Config
  }
}

const config: Config = {
  introMessage:
    "ask your next metro mayor to sign the creative workforce pledge! Get started here👇",
  sendingFailedError:
    "There was a problem sending your message. Please refresh the page or try again later.",
  defaultMessage: "Default body here",
  defaultSubject: "Default subject here",
  nameLabel: "Your name",
  emailLabel: "Your email",
  subjectLabel: "Subject",
  bodyLabel: "Message",
  postcodeLabel: "Your postcode",
  invalidPostcodeError:
    "We need your postcode to send your message to the right place",
  twitterShareMessage: "Example twitter share message",
  facebookShareMessage: "Example facebook share message",
  whatsappShareMessage: "Example whatsapp share message",
  ...window?.___RWP_CONFIG___,
}

export default config
