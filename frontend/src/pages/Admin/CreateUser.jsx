import "../../styles/dashboard.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function CreateUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "hod", // 🔒 ONLY HOD
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/admin/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Failed to create HOD");
      } else {
        setMessage("✅ HOD created successfully");
        setForm({ name: "", email: "", role: "hod" });
      }
    } catch (err) {
      setMessage("❌ Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      {/* ================= ADMIN SIDEBAR ================= */}
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-title">🛡 Admin Panel</div>
        </div>

        <Link className="sidebar-link" to="/admin">
          📊 Dashboard
        </Link>

        <Link className="sidebar-link" to="/admin/manage-users">
          👥 Manage Users
        </Link>

        <Link className="sidebar-link active" to="/admin/create-user">
          ➕ Create HOD
        </Link>

        <Link className="sidebar-link" to="/admin/profile">
          👤 Profile
        </Link>

        <button
          className="logout-btn"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          🚪 Logout
        </button>
      </div>

      {/* ================= MAIN ================= */}
      <div className="main-section">
        <div className="top-navbar">
          <h2>Create HOD Account</h2>
        </div>

        <h1 className="page-title">Create Head of Department (HOD)</h1>

        <div className="form-card clean-form" style={{ maxWidth: 420 }}>
          <label className="form-label">Full Name</label>
          <input
            className="form-input"
            name="name"
            placeholder="Enter full name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label className="form-label">Email Address</label>
          <input
            className="form-input"
            name="email"
            type="email"
            placeholder="Enter official email"
            value={form.email}
            onChange={handleChange}
            required
          />

          {/* 🔒 Role locked */}
          <label className="form-label">Role</label>
          <input
            className="form-input"
            value="HOD"
            disabled
          />

          <button
            className="submit-btn"
            disabled={loading}
            onClick={handleSubmit}
            style={{ marginTop: 16 }}
          >
            {loading ? "Creating..." : "Create HOD"}
          </button>

          {message && (
            <p
              style={{
                marginTop: 12,
                fontWeight: 500,
                color: message.startsWith("✅") ? "green" : "red",
              }}
            >
              {message}
            </p>
          )}

          <p style={{ marginTop: 16, fontSize: 13, color: "#666" }}>
            🔐 Password will be auto-generated from email and user will be
            forced to change it on first login.
          </p>
        </div>
      </div>
    </div>
  );
}