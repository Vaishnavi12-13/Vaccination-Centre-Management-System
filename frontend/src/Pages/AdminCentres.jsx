import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "./AdminCentres.css";

function AdminCentres() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [centres, setCentres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    centreName: "",
    address: "",
    city: "",
    contactNumber: "",
    vaccineName: "",
    availableSlots: "",
  });

  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchCentres = async () => {
      try {
        const response = await api.get("/centres");
        setCentres(response.data);
      } catch (err) {
        console.error("Error fetching centres:", err);
        setError("Could not load vaccination centres.");
      } finally {
        setLoading(false);
      }
    };

    fetchCentres();
  }, []);
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleAddCentre = async (event) => {
    event.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const centreData = {
        ...formData,
        availableSlots: Number(formData.availableSlots),
      };

      if (editingId !== null) {
        await api.put("/centres", {
          id: editingId,
          ...centreData,
        });

        setSuccess("Vaccination centre updated successfully!");
      } else {
        await api.post("/centres", centreData);

        setSuccess("Vaccination centre added successfully!");
      }

      const response = await api.get("/centres");
      setCentres(response.data);

      setFormData({
        centreName: "",
        address: "",
        city: "",
        contactNumber: "",
        vaccineName: "",
        availableSlots: "",
      });

      setEditingId(null);
      setShowForm(false);
    } catch (err) {
      console.error("Error saving centre:", err);
      setError("Could not save centre. Please check the details and try again.");
    } finally {
      setSaving(false);
    }
  };
  const handleEditCentre = (centre) => {
    setEditingId(centre.id);

    setFormData({
      centreName: centre.centreName || "",
      address: centre.address || "",
      city: centre.city || "",
      contactNumber: centre.contactNumber || "",
      vaccineName: centre.vaccineName || "",
      availableSlots: String(centre.availableSlots ?? ""),
    });

    setError("");
    setSuccess("");
    setShowForm(true);
  };
  const handleDeleteCentre = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this vaccination centre?"
    );

    if (!confirmDelete) {
      return;
    }

    setError("");
    setSuccess("");

    try {
      await api.delete(`/centres/${id}`);

      const response = await api.get("/centres");
      setCentres(response.data);

      setSuccess("Vaccination centre deleted successfully!");
    } catch (err) {
      console.error("Error deleting centre:", err);
      setError("Could not delete vaccination centre. Please try again.");
    }
  };

  const filteredCentres = centres.filter((centre) =>
    [
      centre.centreName,
      centre.city,
      centre.vaccineName,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="centres-page">

      {/* Sidebar */}
      <aside className="centres-sidebar">

        <div className="centres-brand">
          <div className="centres-brand-icon">✚</div>

          <div>
            <h2>Vaccination</h2>
            <span>CARE</span>
          </div>
        </div>

        <p className="centres-sidebar-label">ADMIN PORTAL</p>

        <nav className="centres-menu">

          <button onClick={() => navigate("/admin-dashboard")}>
            <span>▦</span>
            Dashboard
          </button>

          <button>
            <span>♟</span>
            Patients
          </button>

          <button className="active">
            <span>🏥</span>
            Vaccination Centres
          </button>

          <button>
            <span>▣</span>
            Appointments
          </button>

          <button>
            <span>💉</span>
            Manage Vaccines
          </button>

          <button>
            <span>▥</span>
            Reports
          </button>

        </nav>

        <button
          className="centres-logout"
          onClick={() => navigate("/admin-login")}
        >
          <span>↪</span>
          Logout
        </button>

      </aside>


      {/* Main Content */}
      <main className="centres-main">
          {success && <div className="centre-success-message">{success}</div>}

          {error && <div className="centre-error-message">{error}</div>}

        {/* Header */}
        <header className="centres-header">

          <div>
            <p className="centres-eyebrow">ADMIN PORTAL</p>

            <h1>Vaccination Centres</h1>

            <p className="centres-subtitle">
              Manage your vaccination centres and available slots.
            </p>
          </div>

          <div className="centres-admin-profile">
            <div className="centres-avatar">A</div>

            <div>
              <strong>Administrator</strong>
              <small>Admin</small>
            </div>
          </div>

        </header>


        {/* Summary Cards */}
        <section className="centres-summary">

          <div className="centres-summary-card">
            <div className="summary-icon blue-icon">🏥</div>
            <div>
              <p>Total Centres</p>
              <h2>{centres.length}</h2>
            </div>
          </div>

          <div className="centres-summary-card">
            <div className="summary-icon green-icon">💉</div>
            <div>
              <p>Vaccine Types</p>
              <h2>
                {new Set(centres.map((centre) => centre.vaccineName)).size}
              </h2>
            </div>
          </div>

          <div className="centres-summary-card">
            <div className="summary-icon purple-icon">▦</div>
            <div>
              <p>Available Slots</p>
              <h2>
                {centres.reduce(
                  (total, centre) => total + centre.availableSlots,
                  0
                )}
              </h2>
            </div>
          </div>

        </section>


        {/* Centre List */}
        {showForm && (
          <div className="centre-form-overlay">
            <div className="centre-form-card">
              <div className="centre-form-header">
                <div>
                  <h2>
                    {editingId !== null
                      ? "Edit Vaccination Centre"
                      : "Add Vaccination Centre"}
                  </h2>
                  <p>Enter the new centre details below.</p>
                </div>

                <button
                  type="button"
                  className="close-form-button"
                  onClick={() => setShowForm(false)}
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddCentre}>
                <div className="centre-form-grid">
                  <div className="centre-form-group">
                    <label>Centre Name</label>
                    <input
                      type="text"
                      name="centreName"
                      value={formData.centreName}
                      onChange={handleInputChange}
                      placeholder="Enter centre name"
                      required
                    />
                  </div>

                  <div className="centre-form-group">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Enter city"
                      required
                    />
                  </div>

                  <div className="centre-form-group">
                    <label>Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Enter full address"
                      required
                    />
                  </div>

                  <div className="centre-form-group">
                    <label>Contact Number</label>
                    <input
                      type="tel"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      placeholder="Enter contact number"
                      required
                    />
                  </div>

                  <div className="centre-form-group">
                    <label>Vaccine Name</label>
                    <input
                      type="text"
                      name="vaccineName"
                      value={formData.vaccineName}
                      onChange={handleInputChange}
                      placeholder="Enter vaccine name"
                      required
                    />
                  </div>

                  <div className="centre-form-group">
                    <label>Available Slots</label>
                    <input
                      type="number"
                      name="availableSlots"
                      value={formData.availableSlots}
                      onChange={handleInputChange}
                      placeholder="Enter available slots"
                      min="0"
                      required
                    />
                  </div>
                </div>

                <div className="centre-form-actions">
                  <button
                    type="button"
                    className="cancel-form-button"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="save-centre-button"
                    disabled={saving}
                  >
                    {saving
                      ? "Saving..."
                      : editingId !== null
                        ? "Update Centre"
                        : "Save Centre"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        <section className="centres-list-panel">

          <div className="centres-list-header">

            <div>
              <h2>All Vaccination Centres</h2>
              <p>View and manage registered centres.</p>
            </div>

            <button
              className="add-centre-button"
              onClick={() => {
                setEditingId(null);

                setFormData({
                  centreName: "",
                  address: "",
                  city: "",
                  contactNumber: "",
                  vaccineName: "",
                  availableSlots: "",
                });

                setError("");
                setSuccess("");
                setShowForm(true);
              }}
            >
              + Add New Centre
            </button>
          </div>


          {/* Search */}
          <div className="centres-search-row">

            <input
              type="text"
              placeholder="Search by centre name, city or vaccine..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <span>
              {filteredCentres.length} centre(s)
            </span>

          </div>


          {/* Table */}
          <div className="centres-table-wrapper">

            <table className="centres-table">

              <thead>
                <tr>
                  <th>Centre Details</th>
                  <th>City</th>
                  <th>Vaccine</th>
                  <th>Available Slots</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {filteredCentres.map((centre) => (

                  <tr key={centre.id}>

                    <td>
                      <div className="centre-name-cell">
                        <div className="centre-table-icon">🏥</div>

                        <div>
                          <strong>{centre.centreName}</strong>
                          <small>{centre.address}</small>
                        </div>
                      </div>
                    </td>

                    <td>{centre.city}</td>

                    <td>
                      <span className="vaccine-badge">
                        {centre.vaccineName}
                      </span>
                    </td>

                    <td>
                      <span className="slots-badge">
                        {centre.availableSlots} slots
                      </span>
                    </td>

                    <td>
                      <div className="centre-actions">

                        <button
                          className="edit-centre-button"
                          title="Edit centre"
                          onClick={() => handleEditCentre(centre)}
                        >
                          ✎
                        </button>

                        <button
                          className="delete-centre-button"
                          title="Delete centre"
                          onClick={() => handleDeleteCentre(centre.id)}
                        >
                          🗑
                        </button>

                      </div>
                    </td>

                  </tr>

                ))}

                {filteredCentres.length === 0 && (
                  <tr>
                    <td colSpan="5" className="no-centres">
                      No vaccination centres found.
                    </td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>

        </section>

      </main>

    </div>
  );
}

export default AdminCentres;