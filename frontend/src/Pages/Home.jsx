import { useNavigate, Link, useLocation } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  return (
    <div className="home-page">

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

        {/* Navigation Links */}
        <div className="home-nav-links">

          <Link
            to="/"
            className={isHomePage ? "active" : ""}
          >
            Home
          </Link>

          <Link
            to="/about"
            className={location.pathname === "/about" ? "active" : ""}
          >
            About
          </Link>

          <Link
            to="/centres"
            className={location.pathname === "/centres" ? "active" : ""}
          >
            Centres
          </Link>

          <Link
            to="/contact"
            className={location.pathname === "/contact" ? "active" : ""}
          >
            Contact
          </Link>

        </div>

      </nav>

      {/* Hero Section */}
      <section className="home-hero" id="home">

        <div className="hero-content">

          <h1>
            <span className="title-blue">
              Vaccination Centre
            </span>
            <br />
            <span className="title-dark">
              Management System
            </span>
          </h1>

          <h2>Stay Safe, Stay Healthy</h2>

          <p>
            Book your vaccination, manage appointments
            <br className="desktop-break" />
            and help build a healthier community.
          </p>

          {/* Patient Login and Registration */}
          <div className="hero-button-row">

            <button
              className="patient-login-btn"
              onClick={() => navigate("/login")}
            >
              <span className="button-icon">♟</span>
              Patient Login
            </button>

            <button
              className="patient-register-btn"
              onClick={() => navigate("/register")}
            >
              <span className="button-icon">♟</span>
              Patient Register
            </button>

          </div>

          {/* Admin Login */}
          <button
            className="admin-login-btn"
            onClick={() => navigate("/admin-login")}
          >
            <span className="admin-shield">✚</span>
            Admin Login
          </button>

        </div>

      </section>

      {/* Bottom Features */}
      <section className="home-features">

        <div className="feature-item">
          <div className="feature-icon shield-icon">✚</div>
          <h3>Safe &amp; Secure</h3>
        </div>

        <div className="feature-item">
          <div className="feature-icon calendar-icon">▦</div>
          <h3>Easy Booking</h3>
        </div>

        <div className="feature-item">
          <div className="feature-icon people-icon">♟</div>
          <h3>Multiple Centres</h3>
        </div>

        <div className="feature-item">
          <div className="feature-icon heart-icon">♥</div>
          <h3>Healthier Community</h3>
        </div>

      </section>

    </div>
  );
}

export default Home;