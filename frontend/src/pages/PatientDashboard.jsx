import "./PatientDashboard.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function PatientDashboard() {
    const navigate = useNavigate();
    const handleLogout = () => {
      const confirmed = window.confirm("Are you sure you want to logout?");

      if (!confirmed) {
        return;
      }

      localStorage.removeItem("user");
      navigate("/");
    };
const handleCentreRequest = async () => {
  if (!user?.id) {
    alert("Please login first.");
    return;
  }

  try {
    const response = await api.post("/centre-requests", {
      user: {
        id: user.id,
      },
      status: "Pending",
    });

    setCentreRequest(response.data);

    alert("Vaccination centre request submitted successfully!");
  } catch (error) {
    console.error("Failed to request vaccination centre:", error);
    alert("Failed to submit centre request. Please try again.");
  }
};

    const [user] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [centreRequest, setCentreRequest] = useState(null);
  const [loadingCentre, setLoadingCentre] = useState(true);
  const [appointment, setAppointment] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [bookingAppointment, setBookingAppointment] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const appointmentStatus = appointment?.status?.toUpperCase();

  const isVaccinated = appointmentStatus === "VACCINATED";

  const isAppointmentScheduled = appointmentStatus === "SCHEDULED";
  const isCentreRequested = !!centreRequest;

  const isCentreAllocated = !!centreRequest?.centre;

  const isCentreAccepted = centreRequest?.status === "ACCEPTED";

  const isAppointmentCompleted = !!appointment;

  const isVaccinationCompleted = isVaccinated;
  useEffect(() => {
    const fetchCentreRequest = async () => {
      if (!user?.id) {
        setLoadingCentre(false);
        return;
      }

      try {
        const response = await api.get("/centre-requests");

        const patientRequest = response.data.find(
          (request) => Number(request.user?.id) === Number(user.id)
        );

        setCentreRequest(patientRequest || null);
      } catch (error) {
        console.error("Failed to fetch centre request:", error);
      } finally {
        setLoadingCentre(false);
      }
    };


    fetchCentreRequest();
  }, [user]);

  useEffect(() => {
    const fetchAppointment = async () => {
      if (!user?.id) {
        return;
      }

      try {
        const response = await api.get("/appointments");

        const patientAppointments = response.data.filter(
          (item) => Number(item.user?.id) === Number(user.id)
        );

        const latestAppointment = patientAppointments.sort(
          (a, b) => Number(b.id) - Number(a.id)
        )[0];

        setAppointment(latestAppointment || null);
      } catch (error) {
        console.error("Failed to fetch appointment:", error);
      }
    };

    fetchAppointment();

    const refreshInterval = setInterval(fetchAppointment, 10000);

    return () => clearInterval(refreshInterval);
  }, [user]);

  const handleBookAppointment = async () => {
    if (!user?.id) {
      alert("Please login first.");
      return;
    }

    if (!centreRequest?.centre?.id) {
      alert("No vaccination centre has been allocated.");
      return;
    }

    if (centreRequest.status !== "ACCEPTED") {
      alert("Please accept your allocated centre first.");
      return;
    }

    if (!appointmentDate || !appointmentTime) {
      alert("Please select an appointment date and time.");
      return;
    }

    if (appointmentDate < new Date().toLocaleDateString("en-CA")) {
      alert("Please select today or a future date.");
      return;
    }

    setBookingAppointment(true);

    try {
      const response = await api.post("/appointments", {
        user: {
          id: user.id
        },
        centre: {
          id: centreRequest.centre.id
        },
        appointmentDate: appointmentDate,
        appointmentTime: appointmentTime,
        status: "SCHEDULED"
      });

      setAppointment(response.data);

      alert("Appointment booked successfully!");
    } catch (error) {
      console.error("Failed to book appointment:", error);
      alert("Failed to book appointment. Please try again.");
    } finally {
      setBookingAppointment(false);
    }
  };


  const handleCentreResponse = async (newStatus) => {
    if (!centreRequest?.id) {
      alert("Centre request not found.");
      return;
    }

    const action = newStatus === "ACCEPTED" ? "accept" : "reject";

    const confirmed = window.confirm(
      `Are you sure you want to ${action} this vaccination centre?`
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await api.put("/centre-requests", {
        id: centreRequest.id,
        status: newStatus
      });

      setCentreRequest(response.data);

      alert(
        newStatus === "ACCEPTED"
          ? "Vaccination centre accepted successfully!"
          : "Vaccination centre rejected successfully!"
      );
    } catch (error) {
      console.error("Failed to update centre request:", error);
      alert("Failed to update centre response. Please try again.");
    }
  };

  return (
    <div className="patient-dashboard">

      {/* Sidebar */}
      <aside className="sidebar">

        <div className="sidebar-brand">
          <div className="brand-icon">✚</div>
          <div>
            <h2>Vaccination</h2>
            <span>CARE</span>
          </div>
        </div>

        <div className="sidebar-title">
          PATIENT PORTAL
        </div>

        <nav className="sidebar-nav">

          <button className="nav-item active">
            <span>⌂</span>
            Dashboard
          </button>

          <button
            className="nav-item"
            onClick={() =>
              document.getElementById("my-centre")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              })
            }
          >
            <span>♧</span>
            My Centre
          </button>

          <button
            className="nav-item"
            onClick={() =>
              document.getElementById("my-appointment")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              })
            }
          >
            <span>▣</span>
            Appointment
          </button>

         <button
           className="nav-item"
           onClick={() => navigate("/patient-profile")}
         >
           <span>◉</span>
           My Profile
         </button>

        </nav>

        <div className="sidebar-bottom">

          <button
            className="nav-item"
            onClick={() => navigate("/patient-settings")}
          >
            <span>⚙</span>
            Settings
          </button>

          <button className="logout-item" onClick={handleLogout}>
            <span>↪</span>
            Logout
          </button>

        </div>

      </aside>


      {/* Main Content */}
      <main className="dashboard-main">

        {/* Header */}
        <header className="dashboard-header">

          <div className="welcome-area">
            <p className="welcome-label">PATIENT DASHBOARD</p>

            <h1>
              Hello, {user?.name || "Patient"} <span>👋</span>
            </h1>

            <p>
              Here's an overview of your vaccination journey.
            </p>
          </div>

          <div className="header-actions">

            <button
              className="notification-btn"
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Toggle notifications"
            >
              🔔
              <span></span>
            </button>
            {showNotifications && (
              <div className="notification-dropdown">
                <div className="notification-dropdown-header">
                  <h3>Notifications</h3>

                  <button
                    onClick={() => setShowNotifications(false)}
                    aria-label="Close notifications"
                  >
                    ✕
                  </button>
                </div>

                <div className="notification-list">
                  {!centreRequest && !appointment ? (
                    <p className="notification-empty">
                      No notifications yet.
                    </p>
                  ) : (
                    <>
                      {centreRequest && (
                        <div className="notification-item">
                          <span className="notification-icon">🏥</span>

                          <div>
                            <strong>Centre Request</strong>
                            <p>
                              {centreRequest.status === "ALLOCATED"
                                ? "A vaccination centre has been allocated to you."
                                : centreRequest.status === "ACCEPTED"
                                ? "You accepted your vaccination centre."
                                : centreRequest.status === "REJECTED"
                                ? "You rejected your allocated centre."
                                : "Your vaccination centre request has been submitted."}
                            </p>
                          </div>
                        </div>
                      )}

                      {appointment && (
                        <div className="notification-item">
                          <span className="notification-icon">📅</span>

                          <div>
                            <strong>Appointment Update</strong>
                            <p>
                              {appointment.status === "VACCINATED"
                                ? "Your vaccination has been marked as completed."
                                : appointment.status === "CANCELLED"
                                ? "Your appointment has been cancelled."
                                : `Your appointment is scheduled for ${appointment.appointmentDate} at ${appointment.appointmentTime}.`}
                            </p>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}

            <div className="user-profile">

              <div className="user-avatar">
                C
              </div>

              <div className="user-details">
                <strong>{user?.name || "Patient"}</strong>
                <small>Patient</small>
              </div>

              <span className="dropdown-arrow">⌄</span>

            </div>

          </div>

        </header>


        {/* Statistics */}
        <section className="stats-grid">

          <div className="stat-card request-stat">

            <div className="stat-card-top">
              <div className="stat-icon">
                🏥
              </div>

              <span className={`status-badge ${
                centreRequest?.status === "ACCEPTED"
                  ? "completed"
                  : centreRequest?.status === "ALLOCATED"
                  ? "pending"
                  : "neutral"
              }`}>
                {centreRequest?.status || "NOT REQUESTED"}
              </span>
            </div>

            <p>Centre Request</p>

            <h3>
              {!centreRequest
                ? "Not Requested"
                : centreRequest.status === "PENDING"
                ? "Awaiting Allocation"
                : centreRequest.status === "ALLOCATED"
                ? "Centre Allocated"
                : centreRequest.status === "ACCEPTED"
                ? "Centre Accepted"
                : centreRequest.status === "REJECTED"
                ? "Centre Rejected"
                : centreRequest.status}
            </h3>

            <small>
              Admin will review your request
            </small>

          </div>


          <div className="stat-card">

            <div className="stat-card-top">
              <div className="stat-icon">
                📍
              </div>

              <span className={`status-badge ${
                centreRequest?.centre ? "completed" : "neutral"
              }`}>
                {centreRequest?.centre ? "Allocated" : "Not Ready"}
              </span>
            </div>

            <p>My Centre</p>

            <h3>
              {centreRequest?.centre?.centreName || "Not Allocated"}
            </h3>

           <small>
             {centreRequest?.centre
               ? centreRequest.centre.city || "Centre allocated successfully"
               : "Centre will appear after allocation"}
           </small>

          </div>


          <div className="stat-card">

            <div className="stat-card-top">
              <div className="stat-icon">
                📅
              </div>

              <span className={`status-badge ${
                isAppointmentScheduled
                  ? "completed"
                  : isVaccinated
                  ? "completed"
                  : "neutral"
              }`}>
                {isVaccinated
                  ? "Completed"
                  : isAppointmentScheduled
                  ? "Scheduled"
                  : appointment?.status || "Not Booked"}
              </span>
            </div>

            <p>Appointment</p>

            <h3>
              {appointment
                ? appointment.status === "VACCINATED"
                  ? "Vaccination Completed"
                  : appointment.status === "CANCELLED"
                  ? "Appointment Cancelled"
                  : "Appointment Booked"
                : "No Appointment"}
            </h3>

            <small>
              {appointment
                ? `${appointment.appointmentDate} at ${appointment.appointmentTime}`
                : "Accept a centre to continue"}
            </small>

          </div>


          <div className="stat-card">

            <div className="stat-card-top">
              <div className="stat-icon">
                💉
              </div>

              <span className={`status-badge ${
                isVaccinated ? "completed" : "pending"
              }`}>
                {isVaccinated ? "Vaccinated" : "Pending"}
              </span>
            </div>

            <p>Vaccination</p>

            <h3>
              {isVaccinated ? "Vaccination Completed" : "Not Completed"}
            </h3>

           <small>
             {isVaccinated
               ? "You have been vaccinated successfully!"
               : "Your vaccination is awaiting completion."}
           </small>

          </div>

        </section>


        {/* Journey */}
        <section className="journey-section">

          <div className="section-header">

            <div>
              <h2>Your Vaccination Journey</h2>
              <p>Track your progress step by step.</p>
            </div>

            <span className="journey-status">
              IN PROGRESS
            </span>

          </div>


          <div className="journey-card">

            <div className={`journey-step ${isCentreRequested ? "completed" : "current"}`}>
              <div className="journey-circle">
                {isCentreRequested ? "✓" : "1"}
              </div>

              <div>
                <strong>Request</strong>
                <span>{isCentreRequested ? "Submitted" : "Not Started"}</span>
              </div>
            </div>


            <div className="journey-line active-line"></div>


            <div
              className={`journey-step ${
                isCentreAllocated
                  ? "completed"
                  : isCentreRequested
                  ? "current"
                  : ""
              }`}
            >
              <div className="journey-circle">
                {isCentreAllocated ? "✓" : "2"}
              </div>

              <div>
                <strong>Allocation</strong>
                <span>
                  {isCentreAllocated
                    ? "Centre Allocated"
                    : isCentreRequested
                    ? "Waiting"
                    : "Not Started"}
                </span>
              </div>
            </div>


            <div className="journey-line"></div>


            <div
              className={`journey-step ${
                isCentreAccepted
                  ? "completed"
                  : isCentreAllocated
                  ? "current"
                  : ""
              }`}
            >
              <div className="journey-circle">
                {isCentreAccepted ? "✓" : "3"}
              </div>

              <div>
                <strong>Accept</strong>
                <span>
                  {isCentreAccepted
                    ? "Centre Accepted"
                    : centreRequest?.status === "REJECTED"
                    ? "Centre Rejected"
                    : isCentreAllocated
                    ? "Waiting for Response"
                    : "Pending"}
                </span>
              </div>
            </div>


            <div className="journey-line"></div>


            <div
              className={`journey-step ${
                isAppointmentCompleted
                  ? "completed"
                  : isCentreAccepted
                  ? "current"
                  : ""
              }`}
            >
              <div className="journey-circle">
                {isAppointmentCompleted ? "✓" : "4"}
              </div>

              <div>
                <strong>Appointment</strong>
                <span>
                  {!appointment
                    ? isCentreAccepted
                      ? "Ready to Book"
                      : "Pending"
                    : appointment.status === "CANCELLED"
                    ? "Cancelled"
                    : isVaccinated
                    ? "Vaccination Completed"
                    : "Scheduled"}
                </span>
              </div>
            </div>


            <div className="journey-line"></div>


            <div
              className={`journey-step ${
                isVaccinationCompleted ? "completed" : ""
              }`}
            >
              <div className="journey-circle">
                {isVaccinationCompleted ? "✓" : "5"}
              </div>

              <div>
                <strong>Vaccinated</strong>
                <span>
                  {isVaccinationCompleted
                    ? "Vaccination Completed"
                    : appointmentStatus === "CANCELLED"
                    ? "Appointment Cancelled"
                    : appointment
                    ? "Awaiting Vaccination"
                    : "Pending"}
                </span>
              </div>
            </div>

          </div>

        </section>


        {/* Main Grid */}
        <div className="content-grid">


          {/* Centre */}
          <section className="centre-section" id="my-centre">

            <div className="section-header">

              <div>
                <h2>Vaccination Centre</h2>
                <p>Your allocated centre will appear here.</p>
              </div>

            </div>


            <div className="centre-card">

              <div className="centre-placeholder">

                {loadingCentre ? (
                  <p>Loading your vaccination centre...</p>
                ) : centreRequest?.centre ? (

                  <>
                    <div className="large-medical-icon">🏥</div>

                    <h3>
                      {centreRequest.centre.centreName || "Vaccination Centre"}
                    </h3>

                    <p>
                      <strong>Address:</strong>{" "}
                      {centreRequest.centre.address || "Not available"}
                    </p>

                    <p>
                      <strong>City:</strong>{" "}
                      {centreRequest.centre.city || "Not available"}
                    </p>

                    <p>
                      <strong>Contact:</strong>{" "}
                      {centreRequest.centre.contactNumber || "Not available"}
                    </p>

                    <p>
                      <strong>Vaccine:</strong>{" "}
                      {centreRequest.centre.vaccineName || "Not available"}
                    </p>

                    <p>
                      <strong>Request Status:</strong>{" "}
                      {centreRequest.status || "Pending"}
                    </p>
                    {centreRequest.status === "ALLOCATED" && (
                      <div className="centre-action-buttons">
                        <button
                          className="primary-btn"
                          onClick={() => handleCentreResponse("ACCEPTED")}
                        >
                          Accept Centre
                        </button>

                        <button
                          className="outline-btn"
                          onClick={() => handleCentreResponse("REJECTED")}
                        >
                          Reject Centre
                        </button>
                      </div>
                    )}

                    {centreRequest.status === "ACCEPTED" && (
                      <p className="success-message">
                        ✓ You have accepted this vaccination centre.
                      </p>
                    )}

                    {centreRequest.status === "REJECTED" && (
                      <p className="error-message">
                        You rejected this centre. Please wait for another allocation.
                      </p>
                    )}
                  </>

                ) : (

                  <>
                    <div className="large-medical-icon">🏥</div>

                    <h3>No Centre Allocated Yet</h3>

                    <p>
                      You have not received a vaccination centre.
                      Submit your request and the admin will allocate
                      a suitable centre for you.
                    </p>

                    <button
                      className="primary-btn"
                      onClick={handleCentreRequest}
                    >
                      Request Vaccination Centre
                    </button>
                  </>

                )}

              </div>

            </div>

          </section>


          {/* Appointment */}
          <section className="appointment-section" id="my-appointment">

            <div className="section-header">

              <div>
                <h2>Next Appointment</h2>
                <p>Your upcoming vaccination appointment.</p>
              </div>

            </div>


            <div className="appointment-card">

              <div className="appointment-icon">
                📅
              </div>

              {appointment ? (
                <>
                  <h3>Appointment Booked Successfully!</h3>

                  <p>
                    <strong>Date:</strong>{" "}
                    {appointment.appointmentDate}
                  </p>

                  <p>
                    <strong>Time:</strong>{" "}
                    {appointment.appointmentTime}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    {appointment.status}
                  </p>

                  <p>
                    <strong>Centre:</strong>{" "}
                    {appointment.centre?.centreName || "Vaccination Centre"}
                  </p>
                </>
              ) : (
                <>
                  <h3>Book Your Appointment</h3>

                  <p>
                    Select a convenient date and time for your vaccination.
                  </p>

                  <label htmlFor="appointmentDate">
                    Appointment Date
                  </label>

                  <input
                    id="appointmentDate"
                    type="date"
                    value={appointmentDate}
                    min={new Date().toLocaleDateString("en-CA")}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    disabled={centreRequest?.status !== "ACCEPTED"}
                  />

                  <label htmlFor="appointmentTime">
                    Appointment Time
                  </label>

                  <input
                    id="appointmentTime"
                    type="time"
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    disabled={centreRequest?.status !== "ACCEPTED"}
                  />

                  <button
                    className="primary-btn"
                    onClick={handleBookAppointment}
                    disabled={
                      centreRequest?.status !== "ACCEPTED" ||
                      bookingAppointment
                    }
                  >
                    {bookingAppointment
                      ? "Booking..."
                      : "Book Appointment"}
                  </button>

                  {centreRequest?.status !== "ACCEPTED" && (
                    <p>
                      Please accept your allocated centre before booking.
                    </p>
                  )}
                </>
              )}

            </div>

          </section>

        </div>

        {/* Information */}
        <section className="info-banner">

          <div className="info-icon">
            💡
          </div>

          <div>
            <h3>What happens next?</h3>

            <p>
              Once you request a centre, our administrator will
              review your request and allocate a suitable
              vaccination centre. You can then review and
              accept or reject the allocated centre.
            </p>
          </div>

        </section>

      </main>

    </div>
  );
}

export default PatientDashboard;
