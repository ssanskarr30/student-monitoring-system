import "../../styles/dashboard.css";

import {
  useContext,
  useEffect,
  useState,
} from "react";

import { AuthContext }
from "../../context/AuthContext";

import StudentLayout
from "../../layouts/StudentLayout";

export default function Notifications() {

  const { user } =
    useContext(AuthContext);

  const [notifications,
    setNotifications] =
      useState([]);

  useEffect(() => {

    if (!user?.email) return;

    fetch(
      `http://localhost:5000/api/notifications/${user.email}`
    )
      .then((res) => res.json())
      .then(setNotifications);

  }, [user?.email]);

  const markAsRead = async (id) => {

    await fetch(
      `http://localhost:5000/api/notifications/read/${id}`,
      {
        method: "PUT",
      }
    );

    setNotifications((prev) =>
      prev.map((n) =>
        n._id === id
          ? {
              ...n,
              isRead: true,
            }
          : n
      )
    );

  };

  return (
    <StudentLayout>

      <div className="top-navbar">

        <div>
          <h2 className="welcome-title">
            Notifications
          </h2>

          <p className="welcome-sub">
            Academic alerts and system updates
          </p>
        </div>

      </div>

      <div style={{ marginTop: "24px" }}>

        {notifications.length === 0 ? (

          <div className="empty-row">
            No notifications available
          </div>

        ) : (

          notifications.map((n) => (

            <div
              key={n._id}
              className="form-card"
              style={{
                marginBottom: "18px",
                borderLeft:
                  n.type === "warning"
                    ? "5px solid #f59e0b"
                    : "5px solid #2563eb",
              }}
            >

              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: "center",
                }}
              >

                <h3>{n.title}</h3>

                {!n.isRead && (
                  <span className="badge badge-blue">
                    New
                  </span>
                )}

              </div>

              <p
                style={{
                  marginTop: "10px",
                }}
              >
                {n.message}
              </p>

              <p
                style={{
                  marginTop: "12px",
                  fontSize: "13px",
                  opacity: 0.7,
                }}
              >
                {new Date(
                  n.createdAt
                ).toLocaleString()}
              </p>

              {!n.isRead && (

                <button
                  className="card-btn"
                  style={{
                    marginTop: "14px",
                  }}
                  onClick={() =>
                    markAsRead(n._id)
                  }
                >
                  Mark as Read
                </button>

              )}

            </div>

          ))

        )}

      </div>

    </StudentLayout>
  );
}