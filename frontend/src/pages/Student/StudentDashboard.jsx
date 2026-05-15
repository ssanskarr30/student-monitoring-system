import "../../styles/dashboard.css";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function StudentDashboard() {

  const { user, logout } =
    useContext(AuthContext);

  const [mentor, setMentor] =
    useState(null);

  const [meetingStatus,
    setMeetingStatus] =
      useState("not_submitted");

  const [messageCount,
    setMessageCount] =
      useState(0);

  const [resultsCount,
    setResultsCount] =
      useState(0);

  const [academic,
    setAcademic] =
      useState({
        cgpa: 0,
        completedCredits: 0,
        totalCreditsRequired: 163,
        backlogCount: 0,
        academicStatus: "normal",
      });

  useEffect(() => {

    if (!user?.email) return;

    /* ================= REFRESH USER ================= */
    fetch(
      `http://localhost:5000/api/admin/user-by-email/${user.email}`
    )
      .then((res) => res.json())
      .then((freshUser) => {

        localStorage.setItem(
          "user",
          JSON.stringify(freshUser)
        );

        setAcademic({
          cgpa:
            freshUser.cgpa || 0,

          completedCredits:
            freshUser.completedCredits || 0,

          totalCreditsRequired:
            freshUser.totalCreditsRequired || 163,

          backlogCount:
            freshUser.backlogCount || 0,

          academicStatus:
            freshUser.academicStatus || "normal",
        });

        /* ================= MENTOR ================= */
        if (freshUser.mentorEmail) {

          fetch(
            `http://localhost:5000/api/student/mentor/${freshUser.mentorEmail}`
          )
            .then((res) =>
              res.json()
            )
            .then((data) =>
              setMentor(data)
            )
            .catch(() =>
              setMentor(null)
            );

        }

        /* ================= MESSAGE COUNT ================= */
        if (freshUser.mentorEmail) {

          fetch(
            `http://localhost:5000/api/messages/${user.email}/${freshUser.mentorEmail}`
          )
            .then((res) => res.json())
            .then((msgs) => {

              const unread =
                msgs.filter(
                  (m) =>
                    m.senderRole === "mentor"
                ).length;

              setMessageCount(unread);

            })
            .catch(() =>
              setMessageCount(0)
            );

        }

      });

    /* ================= MEETING STATUS ================= */
    fetch(
      `http://localhost:5000/api/meetings/student/${user.email}`
    )
      .then((res) => res.json())
      .then((data) => {

        if (
          !Array.isArray(data) ||
          !data.length
        ) {

          setMeetingStatus(
            "not_submitted"
          );

        } else {

          setMeetingStatus(
            data[0].status
          );

        }

      });

    /* ================= RESULTS COUNT ================= */
    fetch(
      `http://localhost:5000/api/semester/student/${user.email}`
    )
      .then((res) => res.json())
      .then((data) => {

        setResultsCount(
          Array.isArray(data)
            ? data.length
            : 0
        );

      })
      .catch(() =>
        setResultsCount(0)
      );

  }, [user?.email]);

  const progress =
    academic.totalCreditsRequired > 0
      ? (
          academic.completedCredits /
          academic.totalCreditsRequired
        ) * 100
      : 0;

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
          className="sidebar-link"
          to="/student/notifications"
        >
          🔔 Notifications
        </Link>

        <Link
          className="sidebar-link active"
          to="/student"
        >
          📊 Dashboard
        </Link>

        <Link
          className="sidebar-link"
          to="/student/forms"
        >
          📝 Available Forms
        </Link>

        <Link
          className="sidebar-link"
          to="/student/submissions"
        >
          📁 My Submissions
        </Link>

        <Link
          className="sidebar-link"
          to="/student/upload-marks"
        >
          📚 Semester Marks
        </Link>

        <Link
          className="sidebar-link"
          to="/student/messages"
        >
          💬 Messages

          {messageCount > 0 && (

            <span className="notif-badge">
              {messageCount}
            </span>

          )}

        </Link>

        <Link
          className="sidebar-link"
          to="/student/meeting-request"
        >
          📅 Meeting Form
        </Link>

        <Link
          className="sidebar-link"
          to="/student/meetings"
        >
          📋 Meeting Status
        </Link>

        <Link
          className="sidebar-link"
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

      {/* ================= MAIN ================= */}
      <div className="main-section">

        <div className="top-navbar">

          <div className="welcome-box">

            <h2 className="welcome-title">
              Welcome back,
              <span>
                {" "}
                {user?.name}
              </span>
            </h2>

            <p className="welcome-sub">
              Roll No:
              <b>
                {" "}
                {user?.rollNo || "—"}
              </b>
            </p>

          </div>

          <button
            className="logout-btn"
            onClick={logout}
          >
            Logout
          </button>

        </div>

        <h1 className="page-title">
          Student Dashboard
        </h1>

        {/* ================= ACADEMIC OVERVIEW ================= */}
        <div className="card-grid">

          <div className="dashboard-card">

            <h2>🎯 CGPA</h2>

            <strong>
              {academic.cgpa}
            </strong>

          </div>

          <div className="dashboard-card">

            <h2>📚 Credits</h2>

            <strong>

              {academic.completedCredits}
              /
              {academic.totalCreditsRequired}

            </strong>

            <div className="progress-bar">

              <div
                className="progress-fill"
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

          </div>

          <div className="dashboard-card">

            <h2>⚠ Backlogs</h2>

            <strong>
              {academic.backlogCount}
            </strong>

          </div>

          <div className="dashboard-card">

            <h2>📈 Academic Status</h2>

            <span
              className={`badge ${
                academic.academicStatus ===
                "warning"
                  ? "badge-yellow"
                  : academic.academicStatus ===
                    "critical"
                  ? "badge-red"
                  : "badge-green"
              }`}
            >
              {academic.academicStatus.toUpperCase()}
            </span>

          </div>

        </div>

        {/* ================= SECOND GRID ================= */}
        <div
          className="card-grid"
          style={{
            marginTop: "24px",
          }}
        >

          {/* MENTOR */}
          <div className="dashboard-card">

            <h2>👨‍🏫 Assigned Mentor</h2>

            {mentor ? (
              <>

                <p>
                  <b>{mentor.name}</b>
                </p>

                <p>{mentor.email}</p>

              </>
            ) : (
              <p>
                No mentor assigned yet
              </p>
            )}

          </div>

          {/* MEETING */}
          <div className="dashboard-card">

            <h2>📅 Mentor Meeting</h2>

            <p>
              Status:
              {" "}
              {meetingStatus}
            </p>

            <Link
              to="/student/meetings"
              className="card-btn"
            >
              View
            </Link>

          </div>

          {/* SEMESTER RESULTS */}
          <div className="dashboard-card">

            <h2>📚 Semester Results</h2>

            <Link
              to="/student/upload-marks"
              className="card-btn"
            >
              Manage
            </Link>

          </div>

          {/* MESSAGES */}
          <div className="dashboard-card">

            <h2>💬 Messages</h2>

            <Link
              to="/student/messages"
              className="card-btn"
            >
              Open
            </Link>

          </div>

          {/* SUBMISSIONS */}
          <div className="dashboard-card">

            <h2>📑 Submissions</h2>

            <strong>
              {resultsCount}
            </strong>

            <p
              style={{
                marginTop: "10px",
              }}
            >
              Semester results uploaded
            </p>

            <Link
              to="/student/submissions"
              className="card-btn"
            >
              View
            </Link>

          </div>

        </div>

      </div>
    </div>
  );
}