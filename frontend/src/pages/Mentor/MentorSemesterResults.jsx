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

export default function MentorSemesterResults() {

  const { user } =
    useContext(AuthContext);

  const [students,
    setStudents] =
      useState([]);

  const [results,
    setResults] =
      useState([]);

  const [selected,
    setSelected] =
      useState(null);

  /* =========================================
     LOAD STUDENTS
  ========================================= */
  useEffect(() => {

    if (!user?.email)
      return;

    fetch(
      `http://localhost:5000/api/mentor/students/${user.email}`
    )
      .then((res) =>
        res.json()
      )
      .then((data) =>
        setStudents(data)
      )
      .catch(() =>
        setStudents([])
      );

  }, [user?.email]);

  /* =========================================
     LOAD RESULTS
  ========================================= */
  useEffect(() => {

    if (!user?.email)
      return;

    fetch(
      `http://localhost:5000/api/semester/mentor/${user.email}`
    )
      .then((res) =>
        res.json()
      )
      .then((data) =>
        setResults(data)
      )
      .catch(() =>
        setResults([])
      );

  }, [user?.email]);

  /* =========================================
     FILTER RESULTS
  ========================================= */
  const studentResults =
    selected
      ? results.filter(
          (r) =>
            r.studentEmail ===
            selected.email
        )
      : [];

  return (
    <MentorLayout>

      <div className="top-navbar">

        <div>

          <h2 className="welcome-title">
            Semester Results
          </h2>

          <p className="welcome-sub">
            Review academic performance of assigned students
          </p>

        </div>

      </div>

      <div
        className="chat-layout"
        style={{
          marginTop: "24px",
        }}
      >

        {/* ================= LEFT ================= */}
        <div className="chat-sidebar">

          <h3
            style={{
              marginBottom: "18px",
            }}
          >
            Assigned Students
          </h3>

          {students.length === 0 && (

            <div className="empty-row">
              No students assigned.
            </div>

          )}

          {students.map((s) => (

            <div
              key={s._id}
              className={`chat-user ${
                selected?.email ===
                s.email
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setSelected(s)
              }
            >

              <div className="chat-user-name">
                {s.name}
              </div>

              <div className="chat-user-roll">
                {s.rollNo}
              </div>

            </div>

          ))}

        </div>

        {/* ================= RIGHT ================= */}
        <div className="chat-window">

          {!selected ? (

            <div className="empty-row">
              Select a student to view semester results.
            </div>

          ) : studentResults.length === 0 ? (

            <div className="empty-row">
              No semester results uploaded yet.
            </div>

          ) : (

            studentResults.map((res) => (

              <div
                key={res._id}
                className="semester-card"
                style={{
                  marginBottom: "24px",
                }}
              >

                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems:
                      "center",
                    marginBottom:
                      "18px",
                  }}
                >

                  <h2>
                    Semester {res.semester}
                  </h2>

                  <span className="badge badge-blue">

                    Credits:
                    {" "}
                    {res.totalCredits}

                  </span>

                </div>

                <table className="data-table">

                  <thead>

                    <tr>
                      <th>Course Code</th>
                      <th>Course Name</th>
                      <th>Credits</th>
                      <th>Grade</th>
                    </tr>

                  </thead>

                  <tbody>

                    {res.subjects.map(
                      (s, i) => (

                        <tr key={i}>

                          <td>
                            {s.courseCode}
                          </td>

                          <td>
                            {s.courseName}
                          </td>

                          <td>
                            {s.credits}
                          </td>

                          <td>

                            <span
                              className={`badge ${
                                s.grade === "F"
                                  ? "badge-red"
                                  : "badge-green"
                              }`}
                            >
                              {s.grade}
                            </span>

                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

                <div
                  className="gpa-row"
                  style={{
                    marginTop: "20px",
                  }}
                >

                  <p>
                    <b>SGPA:</b>
                    {" "}
                    {res.sgpa}
                  </p>

                  <p>
                    <b>CGPA:</b>
                    {" "}
                    {res.cgpa}
                  </p>

                  <p>
                    <b>Backlogs:</b>
                    {" "}
                    {res.backlogCount}
                  </p>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

    </MentorLayout>
  );
}