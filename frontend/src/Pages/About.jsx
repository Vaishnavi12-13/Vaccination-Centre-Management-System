import { useNavigate, Link } from "react-router-dom";
import "./About.css";

function About() {
  const navigate = useNavigate();

  return (
    <div className="about-page">
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
          <Link to="/about" className="active">About</Link>
          <Link to="/centres">Centres</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </nav>

      {/* Page Banner */}
      <section className="about-banner">
        <span className="about-label">ABOUT OUR SYSTEM</span>
        <h1>About Vaccination Centre Management System</h1>
        <p>
          Making vaccination services easier to access,
          manage, and organize.
        </p>
      </section>

      {/* Introduction */}
      <section className="about-introduction">
        <div className="about-intro-icon">✚</div>

        <div className="about-intro-content">
          <h2>Welcome to Our Platform</h2>

          <p>
            The Vaccination Centre Management System is designed
            to help patients access vaccination services and
            manage their appointments conveniently.
          </p>

          <p>
            Patients can register, log in, request vaccination
            centres, and manage their appointment information.
            Administrators can manage patients, vaccination
            centres, requests, and appointments through a
            centralized dashboard.
          </p>

          <button
            className="about-primary-button"
            onClick={() => navigate("/register")}
          >
            Get Started →
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="about-features-section">
        <div className="about-section-heading">
          <span>OUR FEATURES</span>
          <h2>What Our System Offers</h2>
          <p>
            Tools designed to make vaccination management
            simple and organized.
          </p>
        </div>

        <div className="about-features-grid">
          <article className="about-feature-card">
            <div className="about-feature-icon">♟</div>
            <h3>Patient Management</h3>
            <p>
              Patients can register, access their profiles,
              and manage their information.
            </p>
          </article>

          <article className="about-feature-card">
            <div className="about-feature-icon">🏥</div>
            <h3>Centre Management</h3>
            <p>
              View and manage vaccination centre information
              through the system.
            </p>
          </article>

          <article className="about-feature-card">
            <div className="about-feature-icon">▦</div>
            <h3>Appointment Management</h3>
            <p>
              Organize vaccination appointments and review
              appointment information.
            </p>
          </article>

          <article className="about-feature-card">
            <div className="about-feature-icon">✓</div>
            <h3>Request Management</h3>
            <p>
              Patients can request a vaccination centre,
              and administrators can review requests.
            </p>
          </article>
        </div>
      </section>

      {/* How It Works */}
      <section className="about-how-section">
        <div className="about-section-heading">
          <span>HOW IT WORKS</span>
          <h2>Simple Steps to Get Started</h2>
        </div>

        <div className="about-steps-grid">
          <div className="about-step">
            <div className="about-step-number">01</div>
            <h3>Create an Account</h3>
            <p>Register as a patient to access the platform.</p>
          </div>

          <div className="about-step">
            <div className="about-step-number">02</div>
            <h3>Request a Centre</h3>
            <p>Submit a request for your preferred vaccination centre.</p>
          </div>

          <div className="about-step">
            <div className="about-step-number">03</div>
            <h3>Manage Appointments</h3>
            <p>View your appointment information through your dashboard.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="about-cta">
        <h2>Your Health Matters</h2>
        <p>
          Get started with our vaccination management platform.
        </p>

        <button
          onClick={() => navigate("/register")}
          className="about-cta-button"
        >
          Register Now →
        </button>
      </section>

      {/* Footer */}
      <footer className="about-footer">
        <div className="about-footer-logo">
          <span>✚</span>
          <strong>Vaccination Centre Management System</strong>
        </div>

        <p>
          Helping organize vaccination services for a healthier community.
        </p>

        <div className="about-footer-links">
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

export default About;