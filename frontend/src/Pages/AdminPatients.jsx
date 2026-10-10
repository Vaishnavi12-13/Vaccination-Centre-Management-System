import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./AdminPatients.css";

function AdminPatients() {
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await api.get("/users");

        const registeredPatients = response.data.filter(
          (user) => user.role !== "ADMIN"
        );

        setPatients(registeredPatients);
      } catch (err) {
        console.error("Error fetching patients:", err);
        setError("Could not load patients. Please check the backend.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const filteredPatients = patients.filter((patient) =>
    [
      patient.name,
      patient.email,
      patient.mobileNumber,
      patient.city,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="patients-page">
      <aside className="patients-sidebar">
        <div className="patients-brand">
          <div className="patients-brand-icon">✚</div>
          <div>
            <h2>Vaccination</h2>
            <span>CARE</span>
          </div>
        </div>

        <p className="patients-sidebar-label">ADMIN PORTAL</p>

        <nav className="patients-menu">
          <button onClick={() => navigate("/admin-dashboard")}>
            ▦ Dashboard
          </button>

          <button className="active">
            ♟ Patients
          </button>

          <button onClick={() => navigate("/admin-centres")}>
            🏥 Vaccination Centres
          </button>

          <button onClick={() => navigate("/admin-appointments")}>
            ▣ Appointments
          </button>
        </nav>

        <button
          className="patients-logout"
          onClick={() => navigate("/admin-login")}
        >
          ↪ Logout
        </button>
      </aside>

      <main className="patients-main">
        <header className="patients-header">
          <div>
            <p className="patients-eyebrow">ADMIN PORTAL</p>
            <h1>Patient Management</h1>
            <p className="patients-subtitle">
              View and manage registered patients.
            </p>
          </div>

          <div className="patients-admin-profile">
            <div className="patients-avatar">A</div>
            <div>
              <strong>Administrator</strong>
              <small>Admin</small>
            </div>
          </div>
        </header>

        <section className="patients-summary">
          <div className="patients-summary-card">
            <div className="patients-summary-icon">♟</div>
            <div>
              <p>Total Patients</p>
              <h2>{patients.length}</h2>
            </div>
          </div>
        </section>

        <section className="patients-list-panel">
          <div className="patients-list-header">
            <div>
              <h2>Registered Patients</h2>
              <p>Patient information retrieved from the database.</p>
            </div>
          </div>

          <div className="patients-search-row">
            <input
              type="text"
              placeholder="Search by name, email or mobile number..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <span>{filteredPatients.length} patient(s)</span>
          </div>

          {loading && (
            <p className="patients-message">Loading patients...</p>
          )}

          {error && (
            <p className="patients-error">{error}</p>
          )}

          {!loading && !error && (
            <div className="patients-table-wrapper">
              <table className="patients-table">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Email Address</th>
                    <th>Mobile Number</th>
                    <th>Age</th>
                    <th>Gender</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredPatients.map((patient) => (
                    <tr key={patient.id}>
                      <td>
                        <div className="patient-name-cell">
                          <div className="patient-table-avatar">
                            {(patient.name || "P")
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <strong>{patient.name || "N/A"}</strong>
                        </div>
                      </td>

                      <td>{patient.email || "N/A"}</td>
                      <td>{patient.mobileNumber || "N/A"}</td>
                      <td>{patient.age ?? "N/A"}</td>
                      <td>{patient.gender || "N/A"}</td>
                    </tr>
                  ))}

                  {filteredPatients.length === 0 && (
                    <tr>
                      <td colSpan="5" className="patients-empty">
                        No registered patients found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default AdminPatients;