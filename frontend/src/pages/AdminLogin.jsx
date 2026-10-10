import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleAdminLogin = async (event) => {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.target);

    const loginData = {
      email: formData.get("email"),
      password: formData.get("password")
    };

    try {
      const response = await api.post("/users/login", loginData);
      const user = response.data;

      if (!user) {
        setError("Invalid email or password.");
        return;
      }

      if (user.role !== "ADMIN") {
        setError("Access denied. Admin account required.");
        return;
      }

      localStorage.setItem("admin", JSON.stringify(user));

      navigate("/admin-dashboard");
    } catch (error) {
      console.error(error);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-icon">✚</div>

        <h1>Admin Portal</h1>
        <p>Sign in to manage vaccination services.</p>

        <form onSubmit={handleAdminLogin}>
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter admin email"
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            required
          />

          {error && <div className="admin-error">{error}</div>}

          <button type="submit">Admin Login</button>
        </form>

        <button
          className="admin-back-button"
          onClick={() => navigate("/")}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;