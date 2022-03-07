import * as Yup from "yup"
import config from "./config"

export const schema = Yup.object().shape({
  body: Yup.string().required("You must write a message"),
  subject: Yup.string().required("You must write a subject"),
  name: Yup.string()
    .required("You need to give your name")
    .min(2, "That name is a bit too short"),
  email: Yup.string()
    .email("That doesn't look like a valid email")
    .required("You must give your email"),
  postcode: Yup.string()
    .matches(
      /^[a-zA-Z]{1,2}([0-9]{1,2}|[0-9][a-zA-Z])\s*[0-9][a-zA-Z]{2}$/,
      "That doesn't look like a valid postcode"
    )
    .required(config.invalid_postcode_error),
})

export const page1Schema = schema.pick(["body", "subject", "name", "email"])

export const page2Schema = schema.pick(["postcode"])
