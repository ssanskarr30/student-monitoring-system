import "../styles/dashboard.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";

export default function MentorLayout({ children }) {
  const { logout } = useContext(AuthContext);

  const location = useLocation();

  return (
    <div className="dashboard-container">

      <div className="sidebar">

        <div className="sidebar-header">
          <div className="sidebar-title">
            👨‍🏫 Mentor Panel
          </div>
        </div>

        <Link
          className={`sidebar-link ${
            location.pathname === "/mentor"
              ? "active"
              : ""
          }`}
          to="/mentor"
        >
          📊 Dashboard
        </Link>

        <Link
          className={`sidebar-link ${
            location.pathname === "/mentor/students"
              ? "active"
              : ""
          }`}
          to="/mentor/students"
        >
          👥 Assigned Students
        </Link>

        <Link
          className={`sidebar-link ${
            location.pathname === "/mentor/requests"
              ? "active"
              : ""
          }`}
          to="/mentor/requests"
        >
          📥 Meeting Requests
        </Link>

        <Link
          className={`sidebar-link ${
            location.pathname === "/mentor/messages"
              ? "active"
              : ""
          }`}
          to="/mentor/messages"
        >
          💬 Messages
        </Link>

        <Link
          className={`sidebar-link ${
            location.pathname === "/mentor/meeting-history"
              ? "active"
              : ""
          }`}
          to="/mentor/meeting-history"
        >
          📝 Meeting History
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