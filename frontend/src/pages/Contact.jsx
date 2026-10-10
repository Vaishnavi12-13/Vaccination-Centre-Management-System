import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Contact.css";

function Contact() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Frontend demonstration only.
    // This does not send or save messages to a backend.
    setSuccessMessage(
      "Your message has been validated successfully. Message submission is currently a demonstration."
    );

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="contact-page">

      {/* Navigation Bar */}
      <nav className="home-navbar">
        <div
          className="home-logo"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <div className="logo-shield">✚</div>

          <div className="logo-text">
            <h2>Vaccination Centre</h2>
            <h2>Management System</h2>
          </div>
        </div>

        <div className="home-nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/centres">Centres</Link>
          <Link to="/contact" className="active">
            Contact
          </Link>
        </div>
      </nav>

      {/* Page Header */}
      <section className="contact-hero">
        <span className="contact-eyebrow">GET IN TOUCH</span>

        <h1>Contact Us</h1>

        <p>
          Have questions about our vaccination management
          system? We'd be happy to hear from you.
        </p>
      </section>

      {/* Contact Content */}
      <main className="contact-content">

        {/* Contact Information */}
        <section className="contact-information">
          <span className="contact-section-label">
            CONTACT INFORMATION
          </span>

          <h2>We're Here to Help</h2>

          <p className="contact-description">
            If you have questions about registration,
            vaccination centres, appointments, or using
            the system, you can use the contact form.
          </p>

          <div className="contact-info-card">
            <div className="contact-info-icon">✉</div>

            <div>
              <h3>Email Support</h3>
              <p>
                Contact details can be configured by your
                system administrator.
              </p>
            </div>
          </div>

          <div className="contact-info-card">
            <div className="contact-info-icon">🏥</div>

            <div>
              <h3>Vaccination Centres</h3>
              <p>
                Visit the Centres page to learn about
                vaccination centre services.
              </p>

              <Link to="/centres">
                Explore Centres →
              </Link>
            </div>
          </div>

          <div className="contact-info-card">
            <div className="contact-info-icon">👤</div>

            <div>
              <h3>Patient Support</h3>
              <p>
                Log in to access your patient account
                and manage your vaccination information.
              </p>

              <Link to="/login">
                Patient Login →
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="contact-form-card">
          <h2>Send Us a Message</h2>

          <p className="contact-form-description">
            Fill out the form below with your question.
          </p>

          {successMessage && (
            <div className="contact-success-message" role="status">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="contact-form-group">
              <label htmlFor="contact-name">
                Full Name
              </label>

              <input
                id="contact-name"
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact-form-group">
              <label htmlFor="contact-email">
                Email Address
              </label>

              <input
                id="contact-email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact-form-group">
              <label htmlFor="contact-subject">
                Subject
              </label>

              <input
                id="contact-subject"
                type="text"
                name="subject"
                placeholder="Enter message subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact-form-group">
              <label htmlFor="contact-message">
                Your Message
              </label>

              <textarea
                id="contact-message"
                name="message"
                rows="5"
                placeholder="Write your message here..."
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="contact-submit-button"
            >
              Submit Message →
            </button>

          </form>

          <p className="contact-form-note">
            Note: This demonstration form does not send
            messages to an administrator.
          </p>
        </section>

      </main>

      {/* Call to Action */}
      <section className="contact-cta">
        <h2>Your Health Matters</h2>

        <p>
          Explore our vaccination services and manage
          your appointments through your patient account.
        </p>

        <button onClick={() => navigate("/register")}>
          Register Now →
        </button>
      </section>

      {/* Footer */}
      <footer className="contact-footer">

        <div className="contact-footer-brand">
          <span>✚</span>
          <strong>Vaccination Centre Management System</strong>
        </div>

        <p>
          Helping organize vaccination services for a
          healthier community.
        </p>

        <div className="contact-footer-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/centres">Centres</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <small>
          © {new Date().getFullYear()} Vaccination Centre Management System
        </small>

      </footer>

    </div>
  );
}

export default Contact;