import "../../styles/dashboard.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user permanently?")) return;

    try {
      await fetch(`http://localhost:5000/api/admin/users/${id}`, {
        method: "DELETE",
      });
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      console.error("Failed to delete user", err);
    }
  };

  const filtered = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.role?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      {/* ================= SIDEBAR ================= */}
<div className="sidebar">
  <div className="sidebar-header">
    <div className="sidebar-title">🛡 Admin Panel</div>
  </div>

  <Link className="sidebar-link" to="/admin">
    📊 Dashboard
  </Link>

  <Link className="sidebar-link active" to="/admin/manage-users">
    👥 Manage Users
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
        <h1 className="page-title">Manage Users</h1>

        <div className="card-container manage-users-card">
          {/* HEADER */}
          <div className="table-top-bar">
            <div>
              <h3 className="table-title">All Registered Users</h3>
              <p className="table-subtitle">
                View and manage system users
              </p>
            </div>

            <input
              className="search-input"
              placeholder="🔍 Search by name, email or role"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* TABLE */}
          {loading ? (
            <div className="loader">Loading users...</div>
          ) : (
            <div className="table-wrapper">
              <table className="erp-table modern-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th style={{ textAlign: "center" }}>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="empty-row">
                        No users found
                      </td>
                    </tr>
                  ) : (
                    filtered.map((u, index) => (
                      <tr key={u._id}>
                        <td>{index + 1}</td>
                        <td className="user-name">{u.name}</td>
                        <td>{u.email}</td>
                        <td>
                          <span className={`badge role-${u.role}`}>
                            {u.role.toUpperCase()}
                          </span>
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <button
                            className="btn-delete"
                            onClick={() => deleteUser(u._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}