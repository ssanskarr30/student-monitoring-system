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

export default function StudentMeetingStatus() {

  const { user } =
    useContext(AuthContext);

  const [meetings, setMeetings] =
    useState([]);

  /* ================= LOAD MEETINGS ================= */
  useEffect(() => {

    if (!user?.email) return;

    fetch(
      `http://localhost:5000/api/meetings/student/${user.email}`
    )
      .then((res) => res.json())
      .then(setMeetings)
      .catch(() => setMeetings([]));

  }, [user?.email]);

  return (
    <StudentLayout>

      <div className="top-navbar">

        <div>
          <h2 className="welcome-title">
            Meeting Status
          </h2>

          <p className="welcome-sub">
            View approval status of mentor meeting requests
          </p>
        </div>

      </div>

      <div style={{ marginTop: "24px" }}>

        {meetings.length === 0 && (

          <div className="empty-row">
            No meeting requests yet.
          </div>

        )}

        {meetings.map((m) => (

          <div
            key={m._id}
            className="form-card"
            style={{
              marginBottom: "18px",
              padding: "24px",
              borderRadius: "18px",
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

              <h3>{m.topic}</h3>

              <span
                className={`badge ${
                  m.status ===
                  "approved"
                    ? "badge-green"
                    : m.status ===
                      "rejected"
                    ? "badge-red"
                    : "badge-yellow"
                }`}
              >
                {m.status.toUpperCase()}
              </span>

            </div>

            <p>
              <b>Mentor:</b>
              {" "}
              {m.mentorName}
            </p>

            <p>
              <b>Date:</b>
              {" "}
              {new Date(
                m.date
              ).toLocaleDateString()}
            </p>

            {m.notes && (
              <p>
                <b>Notes:</b>
                {" "}
                {m.notes}
              </p>
            )}

            {m.status ===
              "rejected" && (
              <p>
                <b>
                  Rejection Reason:
                </b>
                {" "}
                {m.rejectionReason ||
                  "Not specified"}
              </p>
            )}

          </div>

        ))}

      </div>

    </StudentLayout>
  );
}