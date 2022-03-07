import { ErrorMessage as FormikErrorMessage, Field, Form, Formik } from "formik"
import { useState } from "react"
import config from "./config"
import { page1Schema, page2Schema, schema } from "./schema"
import { isPostcodeElecting } from "./utils"

const ErrorMessage = props => (
  <FormikErrorMessage {...props}>
    {msg => (
      <small role="alert" className="rwp-error">
        {msg}
      </small>
    )}
  </FormikErrorMessage>
)

const App = () => {
  const [page, setPage] = useState<1 | 2 | 3>(1)

  const handleSubmit = async (values, { setStatus }) => {
    try {
      if (page === 1) {
        setPage(2)
      } else {
        const res1 = await fetch(
          `https://api.postcodes.io/postcodes/${values.postcode}`
        )
        const data = await res1.json()
        if (isPostcodeElecting(data)) {
          // TODO: change email
        }
        const res2 = await fetch("/wp-json/rwp/submit", {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        })
        if (res2.status !== 201) throw "Failed to submit"
        setPage(3)
      }
    } catch (e) {
      setStatus(config.sending_failed_error)
    }
  }

  return (
    <div className="rwp-outer">
      <p className="rwp-intro">{config.intro_message}</p>

      {page === 3 ? (
        <div className="rwp-success" role="alert">
          <p>Your message has been sent</p>

          <ul className="rwp-share-buttons">
            <li>
              <a
                href={`https://twitter.com/intent/tweet?text=${config.twitter_share_message}`}
              >
                Share on Twitter
              </a>
            </li>
            <li>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=www.creativeworkforcepledge.uk?utm_source=facebook&utm_medium=social&utm_campaign=_fb`}
              >
                Share on Facebook
              </a>
            </li>
            <li>
              <a
                href={`https://api.whatsapp.com/send?text=${config.whatsapp_share_message}`}
              >
                Share on Whatsapp
              </a>
            </li>
          </ul>

          <button onClick={() => setPage(1)}>Start again</button>
        </div>
      ) : (
        <Formik
          onSubmit={handleSubmit}
          validationSchema={page === 2 ? page2Schema : page1Schema}
          initialValues={{
            name: "Foo Bar",
            email: "foo@bar.com",
            subject: config.default_subject,
            body: config.default_message,
            postcode: "",
          }}
        >
          {({ status }) => (
            <Form>
              {status && <p>{status}</p>}

              {page === 1 && (
                <section className="rwp-page">
                  <div className="rwp-field">
                    <label htmlFor="name">{config.name_label}</label>
                    <ErrorMessage name="name" />
                    <Field name="name" id="name" />
                  </div>

                  <div className="rwp-field">
                    <label htmlFor="email">{config.email_label}</label>
                    <ErrorMessage name="email" />
                    <Field name="email" id="email" />
                  </div>

                  <div className="rwp-field">
                    <label htmlFor="subject">{config.subject_label}</label>
                    <ErrorMessage name="subject" />
                    <Field name="subject" id="subject" />
                  </div>

                  <div className="rwp-field">
                    <label htmlFor="body">{config.body_label}</label>
                    <ErrorMessage name="body" />
                    <Field name="body" id="body" as="textarea" />
                  </div>
                </section>
              )}

              {page === 2 && (
                <section className="rwp-page">
                  <div className="rwp-field">
                    <label htmlFor="postcode">{config.postcode_label}</label>
                    <ErrorMessage name="postcode" />
                    <Field name="postcode" id="postcode" />
                  </div>
                </section>
              )}

              <button type="submit">{page === 2 ? "Send" : "Continue"}</button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  )
}

export default App
