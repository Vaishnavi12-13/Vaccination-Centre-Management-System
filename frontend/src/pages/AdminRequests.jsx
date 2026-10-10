import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./AdminRequests.css";

function AdminRequests() {
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [centres, setCentres] = useState([]);
  const [selectedCentres, setSelectedCentres] = useState({});
  const [allocatingId, setAllocatingId] = useState(null);
  const [success, setSuccess] = useState("");

  // Fetch centre requests and available centres
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [requestsResponse, centresResponse] = await Promise.all([
          api.get("/centre-requests"),
          api.get("/centres"),
        ]);

        setRequests(requestsResponse.data);
        setCentres(centresResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(
          "Could not load centre requests or vaccination centres."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Allocate a centre to a patient request
  const handleAllocateCentre = async (requestId) => {
    const centreId = selectedCentres[requestId];

    if (!centreId) {
      setError("Please select a vaccination centre first.");
      return;
    }

    setError("");
    setSuccess("");
    setAllocatingId(requestId);

    try {
      await api.put("/centre-requests", {
        id: requestId,
        centre: {
          id: Number(centreId),
        },
        status: "ALLOCATED",
      });

      // Fetch updated requests
      const response = await api.get("/centre-requests");
      setRequests(response.data);

      setSelectedCentres((previous) => ({
        ...previous,
        [requestId]: "",
      }));

      setSuccess("Vaccination centre allocated successfully!");
    } catch (err) {
      console.error("Error allocating centre:", err);

      setError(
        "Could not allocate the centre. Please check the backend."
      );
    } finally {
      setAllocatingId(null);
    }
  };

  // Search requests
  const filteredRequests = requests.filter((request) =>
    JSON.stringify(request)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="requests-page">

      {/* Sidebar */}
      <aside className="requests-sidebar">
        <div className="requests-brand">
          <div className="requests-brand-icon">✚</div>

          <div>
            <h2>Vaccination</h2>
            <span>CARE</span>
          </div>
        </div>

        <p className="requests-sidebar-label">ADMIN PORTAL</p>

        <nav className="requests-menu">
          <button onClick={() => navigate("/admin-dashboard")}>
            ▦ Dashboard
          </button>

          <button onClick={() => navigate("/admin-patients")}>
            ♟ Patients
          </button>

          <button onClick={() => navigate("/admin-centres")}>
            🏥 Vaccination Centres
          </button>

          <button className="active">
            ▣ Centre Requests
          </button>
        </nav>

        <button
          className="requests-logout"
          onClick={() => navigate("/admin-login")}
        >
          ↪ Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="requests-main">

        {/* Success and error messages */}
        {success && (
          <p className="requests-success-message">
            {success}
          </p>
        )}

        {error && (
          <p className="requests-error-message">
            {error}
          </p>
        )}

        {/* Page Header */}
        <header className="requests-header">
          <div>
            <p className="requests-eyebrow">ADMIN PORTAL</p>

            <h1>Centre Requests</h1>

            <p className="requests-subtitle">
              Review patient requests and manage centre allocation.
            </p>
          </div>

          <div className="requests-admin-profile">
            <div className="requests-avatar">A</div>

            <div>
              <strong>Administrator</strong>
              <small>Admin</small>
            </div>
          </div>
        </header>

        {/* Summary Card */}
        <section className="requests-summary">
          <div className="requests-summary-card">
            <div className="requests-summary-icon">▣</div>

            <div>
              <p>Total Requests</p>
              <h2>{requests.length}</h2>
            </div>
          </div>
        </section>

        {/* Requests Table */}
        <section className="requests-list-panel">

          <div className="requests-list-header">
            <div>
              <h2>Patient Centre Requests</h2>

              <p>
                Requests received from registered patients.
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="requests-search-row">
            <input
              type="text"
              placeholder="Search requests..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <span>
              {filteredRequests.length} request(s)
            </span>
          </div>

          {/* Loading */}
          {loading && (
            <p className="requests-message">
              Loading requests...
            </p>
          )}

          {/* Table */}
          {!loading && !error && (
            <div className="requests-table-wrapper">
              <table className="requests-table">

                <thead>
                  <tr>
                    <th>Request ID</th>
                    <th>Patient</th>
                    <th>Allocated Centre</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredRequests.map((request) => (
                    <tr key={request.id}>

                      {/* Request ID */}
                      <td>#{request.id}</td>

                      {/* Patient Name */}
                      <td>
                        {request.user?.name ||
                          request.patient?.name ||
                          request.patientName ||
                          "Patient"}
                      </td>

                      {/* Allocated Centre */}
                      <td>
                        {request.centre?.centreName ||
                          request.centreName ||
                          "Not allocated"}
                      </td>

                      {/* Request Status */}
                      <td>
                        <span className="request-status">
                          {request.status || "PENDING"}
                        </span>
                      </td>

                      {/* Allocation Action */}
                      <td>
                        {request.status === "ALLOCATED" ? (
                          <span className="request-allocated-label">
                            Centre Allocated
                          </span>
                        ) : (
                          <div className="request-allocation-actions">

                            <select
                              value={selectedCentres[request.id] || ""}
                              disabled={allocatingId === request.id}
                              onChange={(event) => {
                                setSelectedCentres((previous) => ({
                                  ...previous,
                                  [request.id]: event.target.value,
                                }));

                                setError("");
                                setSuccess("");
                              }}
                            >
                              <option value="">
                                Select Centre
                              </option>

                              {centres.map((centre) => (
                                <option
                                  key={centre.id}
                                  value={centre.id}
                                >
                                  {centre.centreName} — {centre.city}
                                </option>
                              ))}
                            </select>

                            <button
                              type="button"
                              className="allocate-centre-button"
                              disabled={allocatingId === request.id}
                              onClick={() =>
                                handleAllocateCentre(request.id)
                              }
                            >
                              {allocatingId === request.id
                                ? "Allocating..."
                                : "Allocate"}
                            </button>

                          </div>
                        )}
                      </td>

                    </tr>
                  ))}

                  {/* No Requests */}
                  {filteredRequests.length === 0 && (
                    <tr>
                      <td
                        colSpan="5"
                        className="requests-empty"
                      >
                        No centre requests found.
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

export default AdminRequests;