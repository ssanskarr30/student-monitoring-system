import "../../styles/dashboard.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const { user, logout } = useContext(AuthContext);

  const [stats, setStats] = useState({
    students: 0,
    mentors: 0,
    hods: 0,
    meetings: 0,
    results: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/stats");
      const data = await res.json();

      setStats({
        students: data.students || 0,
        mentors: data.mentors || 0,
        hods: data.hods || 0,
        meetings: data.meetings || 0,
        results: data.results || 0,
      });
    } catch (err) {
      console.error("Failed to load admin stats", err);
    }
  };

  return (
    <div className="dashboard-container">
      {/* ================= ADMIN SIDEBAR ================= */}
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-title">🛠 Admin Panel</div>
        </div>

        <Link className="sidebar-link active" to="/admin">
          📊 Dashboard
        </Link>

        <Link className="sidebar-link" to="/admin/users">
          👥 Manage Users
        </Link>

        {/* ✅ ONLY HOD CREATION */}
        <Link className="sidebar-link" to="/admin/create-user">
          ➕ Create HOD
        </Link>

        {/* ❌ Form Builder REMOVED */}

        <Link className="sidebar-link" to="/admin/courses">
          📚 Manage Courses
        </Link>

        <button className="logout-btn" onClick={logout}>
          🚪 Logout
        </button>
      </div>

      {/* ================= MAIN ================= */}
      <div className="main-section">
        <div className="top-navbar">
          <div className="top-navbar-left">
            <h2>Welcome, {user?.name}</h2>
          </div>
          <div className="top-navbar-right">
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </div>
        </div>

        <h1 className="page-title">Admin Dashboard</h1>

        {/* ================= STATS ================= */}
        <div className="card-grid">
          <div className="dashboard-card">
            <h2>🎓 Students</h2>
            <strong>{stats.students}</strong>
          </div>

          <div className="dashboard-card">
            <h2>👨‍🏫 Mentors</h2>
            <strong>{stats.mentors}</strong>
          </div>

          <div className="dashboard-card">
            <h2>🏛 HODs</h2>
            <strong>{stats.hods}</strong>
          </div>

          <div className="dashboard-card">
            <h2>📊 Semester Results</h2>
            <strong>{stats.results}</strong>
          </div>
        </div>

        {/* ================= QUICK ACTIONS ================= */}
        <div className="card-grid" style={{ marginTop: "24px" }}>
          <div className="dashboard-card">
            <h2>➕ Create HOD</h2>
            <Link className="card-btn" to="/admin/create-user">
              Create
            </Link>
          </div>

          <div className="dashboard-card">
            <h2>👥 Manage Users</h2>
            <Link className="card-btn" to="/admin/users">
              Open
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}