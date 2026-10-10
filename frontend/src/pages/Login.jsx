import "./Login.css";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const loginData = {
      email: formData.get("email"),
      password: formData.get("password")
    };

    try {
      const response = await api.post("/users/login", loginData);

      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));

        alert("Login successful!");
        navigate("/patient-dashboard");
      } else {
        alert("Invalid email or password!");
      }

    } catch (error) {
      console.error(error);
      alert("Login failed!");
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-header">
          <div className="login-icon">💙</div>

          <h1>Welcome Back</h1>

          <p>Login to manage your vaccination journey</p>
        </div>

        <form className="login-form" onSubmit={handleLogin}>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>

        </form>

        <p className="register-text">
          Don't have an account?
          <span> Register</span>
        </p>

      </div>

    </div>
  );
}

export default Login;