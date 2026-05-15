import "../../styles/dashboard.css";

import {
  useContext,
  useEffect,
  useState,
} from "react";

import { AuthContext }
from "../../context/AuthContext";

import { Link }
from "react-router-dom";

import MentorLayout
from "../../layouts/MentorLayout";

export default function MentorDashboard() {

  const {
    user,
    refreshUser,
  } = useContext(AuthContext);

  const [assignedCount,
    setAssignedCount] =
      useState(0);

  const [pendingApprovals,
    setPendingApprovals] =
      useState(0);

  const [unread,
    setUnread] =
      useState(0);

  /* =========================================
     LOAD DASHBOARD DATA
  ========================================= */
  useEffect(() => {

    if (!user?.email) return;

    refreshUser();

    /* ================= STUDENTS ================= */
    fetch(
      `http://localhost:5000/api/mentor/students/${user.email}`
    )
      .then((res) => res.json())
      .then((data) => {

        setAssignedCount(
          Array.isArray(data)
            ? data.length
            : 0
        );

      })
      .catch(() =>
        setAssignedCount(0)
      );

    /* ================= PENDING ================= */
    fetch(
      `http://localhost:5000/api/meetings/mentor/${user.email}`
    )
      .then((res) => res.json())
      .then((data) => {

        const pending =
          Array.isArray(data)
            ? data.filter(
                (m) =>
                  m.status ===
                  "pending"
              )
            : [];

        setPendingApprovals(
          pending.length
        );

      })
      .catch(() =>
        setPendingApprovals(0)
      );

    /* ================= UNREAD ================= */
    const unreadMap =
      JSON.parse(
        localStorage.getItem(
          `mentorUnread_${user.email}`
        ) || "{}"
      );

    const totalUnread =
      Object.values(
        unreadMap
      ).reduce(
        (sum, val) =>
          sum + Number(val || 0),
        0
      );

    setUnread(totalUnread);

  }, [user?.email]);

  return (
    <MentorLayout>

      <div className="top-navbar">

        <div>

          <h2 className="welcome-title">
            Welcome,
            {" "}
            {user?.name}
          </h2>

          <p className="welcome-sub">
            Academic mentoring and student monitoring dashboard
          </p>

        </div>

      </div>

      <h1
        className="page-title"
        style={{
          marginTop: "24px",
        }}
      >
        Mentor Dashboard
      </h1>

      <div className="card-grid">

        {/* ================= STUDENTS ================= */}
        <div className="dashboard-card">

          <h2>
            👥 Assigned Students
          </h2>

          <p>
            You are mentoring
            {" "}
            {assignedCount}
            {" "}
            student(s).
          </p>

          <Link
            className="card-btn"
            to="/mentor/students"
          >
            Open
          </Link>

        </div>

        {/* ================= APPROVALS ================= */}
        <div className="dashboard-card">

          <h2>
            📥 Pending Approvals
          </h2>

          <p>

            {pendingApprovals > 0
              ? `${pendingApprovals} meeting(s) awaiting approval`
              : "No pending meetings"}

          </p>

          <Link
            className="card-btn"
            to="/mentor/requests"
          >
            Open
          </Link>

        </div>

        {/* ================= MESSAGES ================= */}
        <div className="dashboard-card">

          <h2>
            💬 Messages
          </h2>

          <p>

            {unread > 0
              ? `${unread} unread message(s)`
              : "No unread messages"}

          </p>

          <Link
            className="card-btn"
            to="/mentor/messages"
          >
            Open
          </Link>

        </div>

        {/* ================= HISTORY ================= */}
        <div className="dashboard-card">

          <h2>
            📝 Meeting History
          </h2>

          <p>
            View all mentor meeting records and interactions.
          </p>

          <Link
            className="card-btn"
            to="/mentor/meeting-history"
          >
            Open
          </Link>

        </div>

        {/* ================= RESULTS ================= */}
        <div className="dashboard-card">

          <h2>
            📑 Semester Results
          </h2>

          <p>
            Monitor semester-wise academic performance.
          </p>

          <Link
            className="card-btn"
            to="/mentor/semester-results"
          >
            Open
          </Link>

        </div>

      </div>

    </MentorLayout>
  );
}