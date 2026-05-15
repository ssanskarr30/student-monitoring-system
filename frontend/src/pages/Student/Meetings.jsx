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

export default function StudentMeetings() {

  const { user } =
    useContext(AuthContext);

  const [meetings, setMeetings] =
    useState([]);

  useEffect(() => {

    if (!user?.email) return;

    fetch(
      `http://localhost:5000/api/meetings/student/${user.email}`
    )
      .then((res) => res.json())
      .then(setMeetings)
      .catch(() => setMeetings([]));

  }, [user?.email]);

  const pending = meetings.filter(
    (m) => m.status === "pending"
  );

  const approved = meetings.filter(
    (m) => m.status === "approved"
  );

  const rejected = meetings.filter(
    (m) => m.status === "rejected"
  );

  const renderCard = (
    m,
    badgeClass,
    label
  ) => (

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
          className={`badge ${badgeClass}`}
        >
          {label}
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

      {m.status === "rejected" && (
        <p>
          <b>Reason:</b>
          {" "}
          {m.rejectionReason}
        </p>
      )}

    </div>
  );

  return (
    <StudentLayout>

      <div className="top-navbar">

        <div>
          <h2 className="welcome-title">
            Meeting Requests
          </h2>

          <p className="welcome-sub">
            Track mentor meeting approvals and status
          </p>
        </div>

      </div>

      <div style={{ marginTop: "24px" }}>

        <h2 className="page-title">
          Pending Meetings
        </h2>

        {pending.length === 0
          ? (
            <div className="empty-row">
              No pending meetings
            </div>
          )
          : pending.map((m) =>
              renderCard(
                m,
                "badge-yellow",
                "PENDING"
              )
            )}

        <h2
          className="page-title"
          style={{
            marginTop: "28px",
          }}
        >
          Approved Meetings
        </h2>

        {approved.length === 0
          ? (
            <div className="empty-row">
              No approved meetings
            </div>
          )
          : approved.map((m) =>
              renderCard(
                m,
                "badge-green",
                "APPROVED"
              )
            )}

        <h2
          className="page-title"
          style={{
            marginTop: "28px",
          }}
        >
          Rejected Meetings
        </h2>

        {rejected.length === 0
          ? (
            <div className="empty-row">
              No rejected meetings
            </div>
          )
          : rejected.map((m) =>
              renderCard(
                m,
                "badge-red",
                "REJECTED"
              )
            )}

      </div>

    </StudentLayout>
  );
}