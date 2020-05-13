import React from "react"

class ContactFormspree extends React.Component {
  constructor(props) {
    super(props)
    this.submitForm = this.submitForm.bind(this)
    this.state = {
      status: "",
    }
  }

  render() {
    const { status } = this.state
    return (
      <form
        onSubmit={this.submitForm}
        action="https://formspree.io/mrggvzzo"
        method="POST"
        className="contact-form"
      >
        <div className="form-group">
          <label htmlFor="email-input">Email:</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="email@example.com"
            id="email-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="message-input">Message:</label>
          <textarea
            name="message"
            className="form-control"
            rows="10"
            placeholder="Tell me about your project"
            id="message-input"
          />
        </div>
        <div>
          {status === "SUCCESS" ? (
            <p className="success">Thanks!</p>
          ) : (
            <button className="btn btn-lg btn-primary btn-block text-center">
              Submit
            </button>
          )}
          {status === "ERROR" && (
            <p className="error">Ooops! There was an error.</p>
          )}
        </div>
      </form>
    )
  }

  submitForm(ev) {
    ev.preventDefault()
    const form = ev.target
    const data = new FormData(form)
    const xhr = new XMLHttpRequest()
    xhr.open(form.method, form.action)
    xhr.setRequestHeader("Accept", "application/json")
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return
      if (xhr.status === 200) {
        form.reset()
        this.setState({ status: "SUCCESS" })
      } else {
        this.setState({ status: "ERROR" })
      }
    }
    xhr.send(data)
  }
}

export default ContactFormspree
