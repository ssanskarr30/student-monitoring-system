import "../styles/dashboard.css";

import { useContext } from "react";

import { AuthContext }
from "../context/AuthContext";

import {
  Link,
  useLocation,
} from "react-router-dom";

export default function PhdLayout({
  children,
}) {

  const { logout } =
    useContext(AuthContext);

  const location =
    useLocation();

  return (
    <div className="dashboard-container">

      {/* SIDEBAR */}
      <div
        className="sidebar phd-sidebar"
      >

        <div className="sidebar-header">

          <div className="sidebar-title">
            🎓 PhD Research Portal
          </div>

        </div>

        <Link
          to="/phd"
          className={`sidebar-link ${
            location.pathname === "/phd"
              ? "active"
              : ""
          }`}
        >
          📊 Dashboard
        </Link>

        <Link
          to="/phd/research"
          className={`sidebar-link ${
            location.pathname ===
            "/phd/research"
              ? "active"
              : ""
          }`}
        >
          🔬 Research Progress
        </Link>

        <Link
          to="/phd/publications"
          className={`sidebar-link ${
            location.pathname ===
            "/phd/publications"
              ? "active"
              : ""
          }`}
        >
          📚 Publications
        </Link>

        <Link
          to="/phd/thesis"
          className={`sidebar-link ${
            location.pathname ===
            "/phd/thesis"
              ? "active"
              : ""
          }`}
        >
          📄 Thesis Tracking
        </Link>

        <Link
          to="/phd/meetings"
          className={`sidebar-link ${
            location.pathname ===
            "/phd/meetings"
              ? "active"
              : ""
          }`}
        >
          📅 Supervisor Meetings
        </Link>

        <Link
          to="/phd/profile"
          className={`sidebar-link ${
            location.pathname ===
            "/phd/profile"
              ? "active"
              : ""
          }`}
        >
          👤 Profile
        </Link>

        <button
          className="logout-btn"
          onClick={logout}
        >
          🚪 Logout
        </button>

      </div>

      {/* PAGE */}
      <div className="main-section">
        {children}
      </div>

    </div>
  );

}