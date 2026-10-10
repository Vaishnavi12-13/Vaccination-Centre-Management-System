import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [centres, setCentres] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [requests, setRequests] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch actual data from the backend
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const [
          patientsResponse,
          centresResponse,
          appointmentsResponse,
          requestsResponse,
        ] = await Promise.all([
          api.get("/users"),
          api.get("/centres"),
          api.get("/appointments"),
          api.get("/centre-requests"),
        ]);

        const allUsers = Array.isArray(patientsResponse.data)
          ? patientsResponse.data
          : [];

        setPatients(
          allUsers.filter(
            (user) =>
              String(user.role || "").toUpperCase() !== "ADMIN"
          )
        );

        setCentres(
          Array.isArray(centresResponse.data)
            ? centresResponse.data
            : []
        );

        setAppointments(
          Array.isArray(appointmentsResponse.data)
            ? appointmentsResponse.data
            : []
        );

        setRequests(
          Array.isArray(requestsResponse.data)
            ? requestsResponse.data
            : []
        );
      } catch (err) {
        console.error("Dashboard data error:", err);

        setError(
          "Unable to load dashboard data. Please check whether the backend is running."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Count pending centre requests
  const pendingRequests = requests.filter(
    (request) =>
      String(request.status || "").toUpperCase() === "PENDING"
  ).length;

  // Statistics
  const stats = [
    {
      title: "Total Patients",
      value: patients.length,
      icon: "♟",
      className: "patients-stat",
    },
    {
      title: "Total Centres",
      value: centres.length,
      icon: "🏥",
      className: "centres-stat",
    },
    {
      title: "Total Appointments",
      value: appointments.length,
      icon: "▣",
      className: "appointments-stat",
    },
    {
      title: "Pending Requests",
      value: pendingRequests,
      icon: "◷",
      className: "requests-stat",
    },
  ];

  // Current year
  const currentYear = new Date().getFullYear();

  // Months for the appointment chart
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Monthly appointment counts from actual database data
  const monthlyAppointments = months.map((month, index) => {
    const count = appointments.filter((appointment) => {
      if (!appointment.appointmentDate) {
        return false;
      }

      const date = new Date(appointment.appointmentDate);

      return (
        !Number.isNaN(date.getTime()) &&
        date.getFullYear() === currentYear &&
        date.getMonth() === index
      );
    }).length;

    return {
      month,
      value: count,
    };
  });

  // Maximum appointment count for chart scaling
  const maxMonthlyAppointments = Math.max(
    ...monthlyAppointments.map((item) => item.value),
    0
  );

  // Sort appointments by date, newest first
  const recentAppointments = [...appointments]
    .sort((a, b) => {
      const dateA = new Date(a.appointmentDate || 0).getTime();
      const dateB = new Date(b.appointmentDate || 0).getTime();

      if (dateA !== dateB) {
        return dateB - dateA;
      }

      return Number(b.id || 0) - Number(a.id || 0);
    })
    .slice(0, 5);

  // Format dates
  const formatDate = (dateValue) => {
    if (!dateValue) {
      return "Date not set";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return dateValue;
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Format appointment statuses
  const formatStatus = (status) => {
    if (!status) {
      return "Unknown";
    }

    const normalized = String(status).toUpperCase();

    if (normalized === "SCHEDULED") {
      return "Scheduled";
    }

    if (
      normalized === "VACCINATED" ||
      normalized === "COMPLETED"
    ) {
      return "Completed";
    }

    if (
      normalized === "CANCELLED" ||
      normalized === "CANCELED"
    ) {
      return "Cancelled";
    }

    return (
      normalized.charAt(0) +
      normalized.slice(1).toLowerCase()
    );
  };

  // Sidebar items
  const menuItems = [
    { icon: "▦", label: "Dashboard" },
    { icon: "♟", label: "Patients" },
    { icon: "🏥", label: "Vaccination Centres" },
    { icon: "▣", label: "Appointments" },
  ];

  const handleMenuClick = (label) => {
    if (label === "Vaccination Centres") {
      navigate("/admin-centres");
    } else if (label === "Patients") {
      navigate("/admin-patients");
    } else if (label === "Appointments") {
      navigate("/admin-appointments");
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <div className="admin-brand-icon">✚</div>

          <div>
            <h2>Vaccination</h2>
            <span>CARE</span>
          </div>
        </div>

        <p className="admin-sidebar-label">ADMIN PORTAL</p>

        <nav className="admin-sidebar-menu">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className={`admin-menu-item ${
                item.label === "Dashboard" ? "active" : ""
              }`}
              onClick={() => handleMenuClick(item.label)}
            >
              <span className="admin-menu-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <button
          className="admin-menu-item admin-logout"
          onClick={() => navigate("/admin-login")}
        >
          <span className="admin-menu-icon">↪</span>
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {/* Header */}
        <header className="admin-header">
          <div>
            <p className="admin-eyebrow">ADMIN PORTAL</p>
            <h1>Admin Dashboard</h1>
            <p className="admin-subtitle">
              Overview of your vaccination system
            </p>
          </div>

          <div className="admin-header-right">
            <button
              className="admin-notification"
              aria-label="Notifications"
            >
              ♧
              <span className="notification-dot"></span>
            </button>

            <div className="admin-profile">
              <div className="admin-avatar">A</div>

              <div>
                <strong>Administrator</strong>
                <small>Admin</small>
              </div>
            </div>
          </div>
        </header>

        {/* Error Message */}
        {error && (
          <div
            role="alert"
            style={{
              background: "#fff0f0",
              color: "#b42318",
              padding: "14px 18px",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
          >
            {error}
          </div>
        )}

        {/* Statistics Cards */}
        <section className="admin-stats-grid">
          {stats.map((stat) => (
            <article
              key={stat.title}
              className={`admin-stat-card ${stat.className}`}
            >
              <div className="admin-stat-top">
                <div className="admin-stat-icon">
                  {stat.icon}
                </div>
              </div>

              <p>{stat.title}</p>

              <h2>{loading ? "..." : stat.value}</h2>
            </article>
          ))}
        </section>

        {/* Quick Actions */}
        <section className="admin-quick-actions">
          <div>
            <h2>Quick Actions</h2>
            <p>Manage your vaccination system efficiently.</p>
          </div>

          <div className="admin-action-buttons">
            <button
              className="admin-add-centre-btn"
              onClick={() => navigate("/admin-centres")}
            >
              + Add Vaccination Centre
            </button>

            <button
              className="admin-review-btn"
              onClick={() => navigate("/admin-requests")}
            >
              Review Patient Requests
            </button>
          </div>
        </section>

        {/* Dashboard Analysis */}
        <section className="admin-content-grid">
          {/* Appointments Overview */}
          <article className="admin-panel chart-panel">
            <div className="admin-panel-header">
              <div>
                <h2>Appointments Overview</h2>
                <p>
                  Monthly appointment activity in {currentYear}
                </p>
              </div>

              <span className="admin-period-badge">
                {currentYear}
              </span>
            </div>

            {/* Single Chart */}
            <div className="chart-area">
              <div className="chart-y-axis">
                {[
                  maxMonthlyAppointments,
                  Math.ceil(maxMonthlyAppointments * 0.75),
                  Math.ceil(maxMonthlyAppointments * 0.5),
                  Math.ceil(maxMonthlyAppointments * 0.25),
                  0,
                ].map((value, index) => (
                  <span key={index}>{value}</span>
                ))}
              </div>

              <div className="chart-bars">
                {monthlyAppointments.map((item) => {
                  const barHeight =
                    maxMonthlyAppointments > 0
                      ? (item.value / maxMonthlyAppointments) * 100
                      : 0;

                  return (
                    <div
                      className="chart-column"
                      key={item.month}
                      title={`${item.month}: ${item.value} appointments`}
                    >
                      <div className="chart-bar-track">
                        <div
                          className="chart-bar"
                          style={{
                            height: `${barHeight}%`,
                          }}
                        />
                      </div>

                      <span>{item.month}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </article>

          {/* Recent Appointments */}
          <article className="admin-panel recent-appointments-panel">
            <div className="admin-panel-header">
              <div>
                <h2>Recent Appointments</h2>
                <p>Latest appointment activity</p>
              </div>

              <button
                className="admin-view-all"
                onClick={() => navigate("/admin-appointments")}
              >
                View All →
              </button>
            </div>

            <div className="recent-appointments-list">
              {loading ? (
                <p style={{ padding: "20px", color: "#718096" }}>
                  Loading appointments...
                </p>
              ) : recentAppointments.length === 0 ? (
                <p style={{ padding: "20px", color: "#718096" }}>
                  No appointments have been recorded yet.
                </p>
              ) : (
                recentAppointments.map((appointment, index) => {
                  const patientName =
                    appointment.user?.name ||
                    appointment.patient?.name ||
                    "Patient";

                  const centreName =
                    appointment.centre?.name ||
                    appointment.centre?.centreName ||
                    "Vaccination Centre";

                  const status = formatStatus(appointment.status);

                  const isCompleted = [
                    "VACCINATED",
                    "COMPLETED",
                  ].includes(
                    String(appointment.status || "").toUpperCase()
                  );

                  return (
                    <div
                      className="recent-appointment"
                      key={appointment.id ?? index}
                    >
                      <div className="appointment-person">
                        <div className="appointment-avatar">
                          {patientName.charAt(0).toUpperCase()}
                        </div>

                        <div className="appointment-person-details">
                          <strong>{patientName}</strong>
                          <span>{centreName}</span>
                        </div>
                      </div>

                      <div className="appointment-date">
                        <span>▣</span>
                        {formatDate(appointment.appointmentDate)}
                      </div>

                      <span
                        className={`appointment-status ${
                          isCompleted
                            ? "completed-status"
                            : "scheduled-status"
                        }`}
                      >
                        {status}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;