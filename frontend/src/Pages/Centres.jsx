import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Centres.css";

// Publicly listed examples for a project demo.
// Vaccine availability must be confirmed directly with each provider.
const centreData = [
  {
    name: "Lifeshield Hospital",
    area: "Chikkadpally / New Nallakunta",
    address: "404, RTC X Road, beside Sandhya Theatre, Chikkadpally, Hyderabad, Telangana 500020",
    phone: "040 2589 7546",
    type: "Private hospital",
    vaccines: [
      "BCG", "Hepatitis A", "Hepatitis B", "HPV",
      "Influenza", "Rabies", "Tetanus", "Typhoid",
      "Chickenpox", "Pneumococcal", "MMR", "DTP",
      "Oral Polio", "Rotavirus", "Meningitis"
    ],
    source: "https://www.lifeshieldhospital.com/vaccination-clinic.html",
    note: "These vaccines are listed on the hospital's vaccination page; confirm current stock, eligibility, and price before visiting."
  },
  {
    name: "Apollo Clinic – Chanda Nagar",
    area: "Chanda Nagar",
    address: "Suresh Square, Plot No. 9, H. No. 1-58/91, Chanda Nagar, Hyderabad, Telangana 500050",
    phone: "084484 40978",
    type: "Private clinic",
    vaccines: ["Vaccination services listed; ask the clinic for current vaccine names"],
    source: "https://www.apollohospitals.com/corporate/covid19-vaccination/",
    note: "Provider directory lists this clinic. Current vaccines and stock need direct confirmation."
  },
  {
    name: "Apollo Clinic – A. S. Rao Nagar",
    area: "A. S. Rao Nagar / Secunderabad",
    address: "Rishab Heights, above Vodafone Store, beside KFC, Trimulgherry–ECIL Road, A. S. Rao Nagar, Telangana 500062",
    phone: "Confirm with provider",
    type: "Private clinic",
    vaccines: ["Vaccination services listed; ask the clinic for current vaccine names"],
    source: "https://www.apollohospitals.com/corporate/covid19-vaccination/",
    note: "Provider directory lists this clinic. Current vaccines and stock need direct confirmation."
  },
  {
    name: "Apollo Clinic – Uppal",
    area: "Uppal / Boduppal",
    address: "Plot 977, Survey 45–50, H. No. 6-48/3, near Ramraj Cotton showroom, Boduppal, Hyderabad, Telangana 500039",
    phone: "Confirm with provider",
    type: "Private clinic",
    vaccines: ["Vaccination services listed; ask the clinic for current vaccine names"],
    source: "https://www.apollohospitals.com/corporate/covid19-vaccination/",
    note: "Provider directory lists this clinic. Current vaccines and stock need direct confirmation."
  },
  {
    name: "Apollo Clinic – Nizampet",
    area: "Nizampet",
    address: "Ground floor, Bhavya's Anandam, 239, Nizampet Road, Hyderabad, Telangana 500090",
    phone: "Confirm with provider",
    type: "Private clinic",
    vaccines: ["Vaccination services listed; ask the clinic for current vaccine names"],
    source: "https://www.apollohospitals.com/corporate/covid19-vaccination/",
    note: "Provider directory lists this clinic. Current vaccines and stock need direct confirmation."
  },
  {
    name: "Apollo Clinic – KPHB Colony",
    area: "KPHB / Kukatpally",
    address: "Indu Fortune, Phase XIII, KPHB Colony, Hyderabad, Telangana 500072",
    phone: "Confirm with provider",
    type: "Private clinic",
    vaccines: ["Vaccination services listed; ask the clinic for current vaccine names"],
    source: "https://www.apollohospitals.com/corporate/covid19-vaccination/",
    note: "Provider directory lists this clinic. Current vaccines and stock need direct confirmation."
  },
  {
    name: "Vishal Children's Clinic & Vaccination Center",
    area: "Beeramguda",
    address: "2Shop, 73/A, Beeramguda Main Road, Shirdi Sai Colony, Beeramguda, Hyderabad, Telangana 502032",
    phone: "Confirm with clinic",
    type: "Children's clinic",
    vaccines: ["Contact clinic for current childhood vaccine list"],
    source: "",
    note: "Listed as a children's clinic and vaccination centre; vaccine-specific details were not independently verified."
  },
  {
    name: "Samatha Children's Clinic & Vaccination Centre",
    area: "Nizampet",
    address: "Plot 43, above Vijetha Supermarket, Rajiv Gandhi Nagar, Satyam Valley, Nizampet, Hyderabad, Telangana 500118",
    phone: "+91 73864 46001",
    type: "Children's clinic",
    vaccines: ["Contact clinic for current childhood vaccine list"],
    source: "",
    note: "Listed as a children's clinic and vaccination centre; vaccine-specific details were not independently verified."
  }
];

function Centres() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [vaccineFilter, setVaccineFilter] = useState("All vaccines");

  const vaccineOptions = useMemo(() => {
    const all = centreData.flatMap((centre) => centre.vaccines);
    return ["All vaccines", ...new Set(all.filter((v) => !v.startsWith("Vaccination services") && !v.startsWith("Contact clinic")))].sort((a, b) => {
      if (a === "All vaccines") return -1;
      if (b === "All vaccines") return 1;
      return a.localeCompare(b);
    });
  }, []);

  const filteredCentres = centreData.filter((centre) => {
    const term = search.trim().toLowerCase();
    const matchesSearch =
      !term ||
      [centre.name, centre.area, centre.address, centre.type].some((value) =>
        value.toLowerCase().includes(term)
      );
    const matchesVaccine =
      vaccineFilter === "All vaccines" ||
      centre.vaccines.includes(vaccineFilter);
    return matchesSearch && matchesVaccine;
  });

  return (
    <div className="centres-page">
      <nav className="home-navbar centres-navbar">
        <Link to="/" className="home-logo centres-logo">
          <div className="logo-shield">✚</div>
          <div className="logo-text">
            <h2>Vaccination Centre</h2>
            <h2>Management System</h2>
          </div>
        </Link>
        <div className="home-nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/centres" className="active">Centres</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </nav>

      <header className="centres-hero">
        <span className="centres-eyebrow">VACCINATION DIRECTORY</span>
        <h1>Find a Vaccination Centre</h1>
        <p>Explore selected hospitals and clinics in Hyderabad, with vaccine information where publicly listed.</p>
        <div className="centres-hero-badge">Demo directory · Confirm availability before visiting</div>
      </header>

      <main className="centres-main">
        <section className="centres-search-panel" aria-label="Search centres">
          <div className="centres-search-field">
            <label htmlFor="centre-search">Search by hospital, area, or address</label>
            <input
              id="centre-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="e.g. Nizampet, Apollo, Chikkadpally"
            />
          </div>
          <div className="centres-search-field">
            <label htmlFor="vaccine-filter">Filter by listed vaccine</label>
            <select
              id="vaccine-filter"
              value={vaccineFilter}
              onChange={(event) => setVaccineFilter(event.target.value)}
            >
              {vaccineOptions.map((vaccine) => (
                <option key={vaccine} value={vaccine}>{vaccine}</option>
              ))}
            </select>
          </div>
        </section>

        <div className="centres-results-heading">
          <div>
            <h2>Hospitals & Clinics</h2>
            <p>Showing {filteredCentres.length} of {centreData.length} listed providers</p>
          </div>
          <button className="centres-request-button" onClick={() => navigate("/login")}>
            Request a Centre
          </button>
        </div>

        <section className="centres-directory-grid">
          {filteredCentres.map((centre) => (
            <article className="centre-directory-card" key={centre.name}>
              <div className="centre-card-top">
                <div className="centre-hospital-icon" aria-hidden="true">✚</div>
                <span className="centre-type-badge">{centre.type}</span>
              </div>
              <h3>{centre.name}</h3>
              <p className="centre-area">{centre.area}</p>
              <div className="centre-detail-row">
                <span aria-hidden="true">📍</span>
                <p>{centre.address}</p>
              </div>
              <div className="centre-detail-row">
                <span aria-hidden="true">☎</span>
                <p>{centre.phone}</p>
              </div>
              <div className="centre-vaccines">
                <h4>Vaccines / services</h4>
                <div className="vaccine-tags">
                  {centre.vaccines.map((vaccine) => (
                    <span key={vaccine}>{vaccine}</span>
                  ))}
                </div>
              </div>
              <p className="centre-availability-note">{centre.note}</p>
              {centre.source && (
                <a className="centre-source-link" href={centre.source} target="_blank" rel="noreferrer">
                  View provider information ↗
                </a>
              )}
              <button
                className="centre-card-action"
                onClick={() => navigate("/login")}
              >
                Login to Request This Centre →
              </button>
            </article>
          ))}
        </section>

        {filteredCentres.length === 0 && (
          <div className="centres-empty-state">
            <h3>No matching centres found</h3>
            <p>Try another hospital name, area, or vaccine filter.</p>
            <button onClick={() => { setSearch(""); setVaccineFilter("All vaccines"); }}>
              Clear Filters
            </button>
          </div>
        )}

        <aside className="centres-medical-notice">
          <strong>Important:</strong> This is an informational project directory, not a live stock system.
          Vaccine availability, age eligibility, dose schedule, price, and appointment requirements can change.
          Call the provider and consult a qualified healthcare professional before choosing a vaccine.
        </aside>
      </main>

      <footer className="centres-footer">
        <strong>✚ Vaccination Centre Management System</strong>
        <p>Helping people find vaccination service information.</p>
        <div className="centres-footer-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/centres">Centres</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <small>© {new Date().getFullYear()} Vaccination Centre Management System</small>
      </footer>
    </div>
  );
}

export default Centres;
