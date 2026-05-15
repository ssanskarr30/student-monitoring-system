import "../styles/dashboard.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";

export default function StudentLayout({ children }) {
  const { logout } = useContext(AuthContext);

  const location = useLocation();

  return (
    <div className="dashboard-container">

      {/* ================= SIDEBAR ================= */}
      <div className="sidebar">

        <div className="sidebar-header">
          <div className="sidebar-title">
            🎓 Student Panel
          </div>
        </div>

        <Link
          className={`sidebar-link ${
            location.pathname === "/student"
              ? "active"
              : ""
          }`}
          to="/student"
        >
          📊 Dashboard
        </Link>

        <Link
          className={`sidebar-link ${
            location.pathname === "/student/forms"
              ? "active"
              : ""
          }`}
          to="/student/forms"
        >
          📝 Available Forms
        </Link>

        <Link
          className={`sidebar-link ${
            location.pathname === "/student/submissions"
              ? "active"
              : ""
          }`}
          to="/student/submissions"
        >
          📁 My Submissions
        </Link>

        <Link
          className={`sidebar-link ${
            location.pathname === "/student/upload-marks"
              ? "active"
              : ""
          }`}
          to="/student/upload-marks"
        >
          📚 Semester Marks
        </Link>

        <Link
          className={`sidebar-link ${
            location.pathname === "/student/messages"
              ? "active"
              : ""
          }`}
          to="/student/messages"
        >
          💬 Messages
        </Link>

        <Link
          className={`sidebar-link ${
            location.pathname === "/student/meeting-request"
              ? "active"
              : ""
          }`}
          to="/student/meeting-request"
        >
          📅 Meeting Form
        </Link>

        <Link
          className={`sidebar-link ${
            location.pathname === "/student/meetings"
              ? "active"
              : ""
          }`}
          to="/student/meetings"
        >
          📋 Meeting Status
        </Link>

        <Link
          className={`sidebar-link ${
            location.pathname === "/student/profile"
              ? "active"
              : ""
          }`}
          to="/student/profile"
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

      {/* ================= PAGE ================= */}
      <div className="main-section">
        {children}
      </div>

    </div>
  );
}