import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PatientProfile.css";

function PatientProfile() {
  const navigate = useNavigate();

  const [user] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  if (!user) {
    return (
      <div className="profile-page">
        <h2>Please log in to view your profile.</h2>
        <button onClick={() => navigate("/login")}>
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {user.name?.charAt(0).toUpperCase() || "P"}
          </div>

          <h1>My Profile</h1>
          <p>View your registered personal information.</p>
        </div>

        <div className="profile-details">
          <div className="profile-field">
            <label>Full Name</label>
            <p>{user.name || "Not available"}</p>
          </div>

          <div className="profile-field">
            <label>Email Address</label>
            <p>{user.email || "Not available"}</p>
          </div>

          <div className="profile-field">
            <label>Mobile Number</label>
            <p>{user.mobileNumber || "Not available"}</p>
          </div>

          <div className="profile-field">
            <label>Age</label>
            <p>{user.age ?? "Not available"}</p>
          </div>

          <div className="profile-field">
            <label>Gender</label>
            <p>{user.gender || "Not available"}</p>
          </div>

          <div className="profile-field">
            <label>Address</label>
            <p>{user.address || "Not available"}</p>
          </div>
        </div>

        <button
          className="profile-back-btn"
          onClick={() => navigate("/patient-dashboard")}
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default PatientProfile;