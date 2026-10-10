import "./Register.css";
import api from "../services/api";

function Register() {

  const handleRegister = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const userData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      mobileNumber: formData.get("mobileNumber"),
      age: Number(formData.get("age")),
      gender: formData.get("gender"),
      address: formData.get("address")
    };

    try {
      const response = await api.post("/users/register", userData);

      alert("Registration successful!");
      window.location.href = "/login";

    } catch (error) {
      console.error(error);
      alert("Registration failed!");
    }
  };

  return (
    <div className="register-page">

      <div className="register-card">

        <div className="register-header">
          <div className="register-icon">💉</div>

          <h1>Create Your Account</h1>

          <p>
            Register to manage your vaccination journey
          </p>
        </div>

        <form className="register-form" onSubmit={handleRegister}>

          <div className="form-group">
            <label>Full Name</label>
            <input
               type="text"
               name="name"
               placeholder="Enter your full name"
             />
          </div>

          <div className="form-row">

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label>Mobile Number</label>
              <input
                type="tel"
                name="mobileNumber"
                placeholder="Enter mobile number"
              />
            </div>

          </div>

          <div className="form-row">

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Create a password"
              />
            </div>

            <div className="form-group">
              <input
                type="number"
                name="age"
                placeholder="Enter your age"
              />
            </div>

          </div>

          <div className="form-group">
            <label>Gender</label>

            <select name="gender">
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Address</label>

            <textarea
              name="address"
              placeholder="Enter your address"
              rows="3"
            ></textarea>
          </div>

          <button type="submit" className="register-btn">
            Create Account
          </button>

        </form>

        <p className="login-text">
          Already have an account?{" "}
          <span
            className="login-link"
            onClick={() => (window.location.href = "/login")}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                window.location.href = "/login";
              }
            }}
          >
            Login
          </span>
        </p>

      </div>

    </div>
  );
}

export default Register;