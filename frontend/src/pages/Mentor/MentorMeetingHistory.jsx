import "../../styles/dashboard.css";

import {
  useContext,
  useEffect,
  useState,
} from "react";

import { AuthContext }
from "../../context/AuthContext";

import MentorLayout
from "../../layouts/MentorLayout";

export default function MentorMeetingHistory() {

  const { user } =
    useContext(AuthContext);

  const [meetings, setMeetings] =
    useState([]);

  useEffect(() => {

    if (!user?.email) return;

    fetch(
      `http://localhost:5000/api/meetings/mentor/${user.email}`
    )
      .then((res) => res.json())
      .then((data) =>
        setMeetings(data)
      )
      .catch(() =>
        setMeetings([])
      );

  }, [user?.email]);

  return (
    <MentorLayout>

      <div className="top-navbar">

        <div>
          <h2 className="welcome-title">
            Meeting History
          </h2>

          <p className="welcome-sub">
            Review previous mentor-student interactions
          </p>
        </div>

      </div>

      <div style={{ marginTop: "24px" }}>

        {meetings.length === 0 ? (

          <div className="empty-row">
            No meetings found.
          </div>

        ) : (

          meetings.map((m) => (

            <div
              key={m._id}
              className="form-card"
              style={{
                marginBottom: "18px",
                padding: "24px",
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
                <b>Student:</b>
                {" "}
                {m.studentName}
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

            </div>

          ))

        )}

      </div>

    </MentorLayout>
  );
}