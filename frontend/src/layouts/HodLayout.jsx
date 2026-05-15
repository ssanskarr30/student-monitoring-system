import "../styles/dashboard.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";

export default function HodLayout({ children }) {
  const { logout } = useContext(AuthContext);

  const location = useLocation();

  return (
    <div className="dashboard-container">

      <div className="sidebar">

        <div className="sidebar-header">
          <div className="sidebar-title">
            🏛 HOD Panel
          </div>
        </div>

        <Link
          className={`sidebar-link ${
            location.pathname === "/hod"
              ? "active"
              : ""
          }`}
          to="/hod"
        >
          📊 Dashboard
        </Link>

        <Link
          className={`sidebar-link ${
            location.pathname === "/hod/assign-mentor"
              ? "active"
              : ""
          }`}
          to="/hod/assign-mentor"
        >
          👨‍🏫 Assign Mentors
        </Link>

        <Link
          className={`sidebar-link ${
            location.pathname === "/hod/upload-students"
              ? "active"
              : ""
          }`}
          to="/hod/upload-students"
        >
          📤 Upload Students
        </Link>

        <Link
          className={`sidebar-link ${
            location.pathname === "/hod/upload-mentors"
              ? "active"
              : ""
          }`}
          to="/hod/upload-mentors"
        >
          👨‍🏫 Upload Mentors
        </Link>

        <button
          className="logout-btn"
          onClick={logout}
        >
          🚪 Logout
        </button>

      </div>

      <div className="main-section">
        {children}
      </div>

    </div>
  );
}