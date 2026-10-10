import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PatientDashboard from "./pages/PatientDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminCentres from "./pages/AdminCentres";
import AdminPatients from "./pages/AdminPatients";
import AdminRequests from "./pages/AdminRequests";
import AdminAppointments from "./pages/AdminAppointments";
import PatientProfile from "./pages/PatientProfile";
import PatientSettings from "./pages/PatientSettings";

// New pages
import About from "./pages/About";
import Centres from "./pages/Centres";
import Contact from "./pages/Contact";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/centres" element={<Centres />} />
        <Route path="/contact" element={<Contact />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Patient Pages */}
        <Route
          path="/patient-dashboard"
          element={<PatientDashboard />}
        />
        <Route
          path="/patient-profile"
          element={<PatientProfile />}
        />
        <Route
          path="/patient-settings"
          element={<PatientSettings />}
        />

        {/* Admin Pages */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/admin-dashboard"
          element={<AdminDashboard />}
        />
        <Route
          path="/admin-centres"
          element={<AdminCentres />}
        />
        <Route
          path="/admin-patients"
          element={<AdminPatients />}
        />
        <Route
          path="/admin-requests"
          element={<AdminRequests />}
        />
        <Route
          path="/admin-appointments"
          element={<AdminAppointments />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;