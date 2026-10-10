import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./AdminAppointments.css";

function AdminAppointments() {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);

      const response = await api.get("/appointments");

      setAppointments(response.data);
      setError("");
    } catch (err) {
      console.error("Failed to fetch appointments:", err);
      setError("Unable to load appointments. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (appointment, newStatus) => {
    try {
      await api.put("/appointments", {
        id: appointment.id,
        status: newStatus
      });

      await fetchAppointments();

      alert("Appointment status updated successfully!");
    } catch (err) {
      console.error("Failed to update appointment:", err);
      alert("Failed to update appointment status.");
    }
  };

  const totalAppointments = appointments.length;

  const scheduledAppointments = appointments.filter(
    (appointment) => appointment.status === "SCHEDULED"
  ).length;

  const completedAppointments = appointments.filter(
    (appointment) => appointment.status === "VACCINATED"
  ).length;

  return (
    <div className="admin-appointments-page">

      <aside className="appointments-sidebar">
        <div className="appointments-brand">
          <span>✚</span>
          <div>
            <h2>Vaccination</h2>
            <small>ADMIN PANEL</small>
          </div>
        </div>

        <nav>
          <button onClick={() => navigate("/admin-dashboard")}>
            🏠 Dashboard
          </button>

          <button onClick={() => navigate("/admin-centres")}>
            🏥 Vaccination Centres
          </button>

          <button onClick={() => navigate("/admin-patients")}>
            👥 Patients
          </button>

          <button onClick={() => navigate("/admin-requests")}>
            📋 Centre Requests
          </button>

          <button className="active">
            📅 Appointments
          </button>
        </nav>

        <button
          className="appointments-logout"
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/admin-login");
          }}
        >
          ↪ Logout
        </button>
      </aside>

      <main className="appointments-main">

        <header className="appointments-header">
          <div>
            <p>ADMINISTRATION</p>
            <h1>Appointments</h1>
            <span>Manage patient vaccination appointments.</span>
          </div>

          <button
            className="appointments-refresh"
            onClick={fetchAppointments}
          >
            ↻ Refresh
          </button>
        </header>

        <section className="appointment-stat-grid">

          <div className="appointment-stat-card">
            <span>Total Appointments</span>
            <h2>{totalAppointments}</h2>
          </div>

          <div className="appointment-stat-card">
            <span>Scheduled</span>
            <h2>{scheduledAppointments}</h2>
          </div>

          <div className="appointment-stat-card">
            <span>Vaccinated</span>
            <h2>{completedAppointments}</h2>
          </div>

        </section>

        <section className="appointments-table-section">

          <div className="appointments-table-heading">
            <div>
              <h2>Patient Appointments</h2>
              <p>Review and update appointment status.</p>
            </div>
          </div>

          {loading ? (
            <p className="appointments-message">
              Loading appointments...
            </p>
          ) : error ? (
            <p className="appointments-error">{error}</p>
          ) : appointments.length === 0 ? (
            <p className="appointments-message">
              No appointments found.
            </p>
          ) : (

            <div className="appointments-table-wrapper">
              <table className="appointments-table">

                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Patient</th>
                    <th>Mobile</th>
                    <th>Vaccination Centre</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {appointments.map((appointment) => (

                    <tr key={appointment.id}>

                      <td>#{appointment.id}</td>

                      <td>
                        {appointment.user?.name || "N/A"}
                      </td>

                      <td>
                        {appointment.user?.mobileNumber || "N/A"}
                      </td>

                      <td>
                        {appointment.centre?.centreName || "N/A"}
                      </td>

                      <td>
                        {appointment.appointmentDate || "N/A"}
                      </td>

                      <td>
                        {appointment.appointmentTime || "N/A"}
                      </td>

                      <td>
                        <span className="appointment-status">
                          {appointment.status || "Pending"}
                        </span>
                      </td>

                      <td>
                        <select
                          value={appointment.status || "SCHEDULED"}
                          onChange={(e) =>
                            handleStatusChange(
                              appointment,
                              e.target.value
                            )
                          }
                        >
                          <option value="SCHEDULED">Scheduled</option>
                          <option value="VACCINATED">Vaccinated</option>
                          <option value="CANCELLED">Cancelled</option>
                        </select>
                      </td>

                    </tr>

                  ))}
                </tbody>

              </table>
            </div>

          )}

        </section>

      </main>
    </div>
  );
}

export default AdminAppointments;