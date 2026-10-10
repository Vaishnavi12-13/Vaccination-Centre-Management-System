import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PatientSettings.css";

function PatientSettings() {
  const navigate = useNavigate();

  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    return localStorage.getItem("notificationsEnabled") !== "false";
  });

  const [user] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleNotificationChange = (event) => {
    const enabled = event.target.checked;

    setNotificationsEnabled(enabled);
    localStorage.setItem("notificationsEnabled", enabled);
  };

  if (!user) {
    return (
      <div className="settings-page">
        <h2>Please log in to access Settings.</h2>
        <button onClick={() => navigate("/login")}>
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="settings-page">
      <div className="settings-card">
        <div className="settings-header">
          <div className="settings-icon">⚙️</div>
          <h1>Settings</h1>
          <p>Manage your account preferences.</p>
        </div>

        <div className="settings-section">
          <h3>Notification Preferences</h3>

          <div className="settings-option">
            <div>
              <h4>Enable Notifications</h4>
              <p>Receive updates about your centre request and appointments.</p>
            </div>

            <label className="settings-toggle">
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={handleNotificationChange}
              />
              <span className="settings-slider"></span>
            </label>
          </div>
        </div>

        <div className="settings-section">
          <h3>Account Information</h3>

          <div className="settings-account">
            <p>
              <strong>Name:</strong> {user.name || "Not available"}
            </p>

            <p>
              <strong>Email:</strong> {user.email || "Not available"}
            </p>
          </div>
        </div>

        <button
          className="settings-back-btn"
          onClick={() => navigate("/patient-dashboard")}
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default PatientSettings;