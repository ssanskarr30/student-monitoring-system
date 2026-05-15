import "../../styles/dashboard.css";

import {
  useParams,
} from "react-router-dom";

import {
  useEffect,
  useState,
  useContext,
} from "react";

import { AuthContext }
from "../../context/AuthContext";

import MentorLayout
from "../../layouts/MentorLayout";

export default function MentorStudentProfile() {

  const { id } =
    useParams();

  const { user } =
    useContext(AuthContext);

  const [student,
    setStudent] =
      useState(null);

  const [results,
    setResults] =
      useState([]);

  const [notes,
    setNotes] =
      useState([]);

  const [noteForm,
    setNoteForm] =
      useState({
        noteType:
          "academic",

        title: "",

        description: "",

        followUpDate: "",
      });

  /* =========================================
     LOAD DATA
  ========================================= */
  useEffect(() => {

    fetch(
      `http://localhost:5000/api/admin/users`
    )
      .then((res) =>
        res.json()
      )
      .then((data) => {

        const found =
          data.find(
            (u) =>
              u._id === id
          );

        setStudent(found);

        if (found?.email) {

          fetch(
            `http://localhost:5000/api/semester/student/${found.email}`
          )
            .then((res) =>
              res.json()
            )
            .then(setResults);

        }

      });

    fetch(
      `http://localhost:5000/api/mentor-notes/${id}`
    )
      .then((res) =>
        res.json()
      )
      .then(setNotes);

  }, [id]);

  /* =========================================
     HANDLE CHANGE
  ========================================= */
  const handleChange =
    (e) => {

      setNoteForm({
        ...noteForm,
        [e.target.name]:
          e.target.value,
      });

    };

  /* =========================================
     ADD NOTE
  ========================================= */
  const addNote =
    async () => {

      if (
        !noteForm.title ||
        !noteForm.description
      ) {

        return alert(
          "Please fill all fields"
        );

      }

      const res =
        await fetch(
          "http://localhost:5000/api/mentor-notes",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              studentId: id,

              mentorEmail:
                user.email,

              mentorName:
                user.name,

              ...noteForm,
            }),
          }
        );

      const data =
        await res.json();

      setNotes([
        data,
        ...notes,
      ]);

      setNoteForm({
        noteType:
          "academic",

        title: "",

        description: "",

        followUpDate: "",
      });

    };

  if (!student) {

    return (
      <MentorLayout>
        Loading...
      </MentorLayout>
    );

  }

  return (
    <MentorLayout>

      <div className="top-navbar">

        <div>

          <h2 className="welcome-title">
            Student Academic Profile
          </h2>

          <p className="welcome-sub">
            Detailed student academic and mentoring records
          </p>

        </div>

      </div>

      {/* ================= STUDENT INFO ================= */}
      <div
        className="card-grid"
        style={{
          marginTop: "24px",
        }}
      >

        {/* ================= BASIC DETAILS ================= */}
        <div className="dashboard-card">

          <h2>
            👤 Student Details
          </h2>

          <p>
            <b>Name:</b>
            {" "}
            {student.name}
          </p>

          <p>
            <b>Email:</b>
            {" "}
            {student.email}
          </p>

          <p>
            <b>Roll No:</b>
            {" "}
            {student.rollNo}
          </p>

          <p>
            <b>Branch:</b>
            {" "}
            {student.branch}
          </p>

          <p>
            <b>Semester:</b>
            {" "}
            {student.semester}
          </p>

          <p>
            <b>Personal Phone:</b>
            {" "}
            {student.personalPhone || "N/A"}
          </p>

          <p>
            <b>Parent Phone:</b>
            {" "}
            {student.parentPhone || "N/A"}
          </p>

          <p>
            <b>Phone Verified:</b>
            {" "}

            {student.phoneVerified ? (
              <span className="badge badge-green">
                VERIFIED
              </span>
            ) : (
              <span className="badge badge-red">
                NOT VERIFIED
              </span>
            )}

          </p>

        </div>

        {/* ================= ACADEMIC ================= */}
        <div className="dashboard-card">

          <h2>
            📊 Academic Overview
          </h2>

          <p>
            <b>CGPA:</b>
            {" "}
            {student.cgpa || "N/A"}
          </p>

          <p>
            <b>Credits:</b>
            {" "}
            {student.completedCredits || 0}
            /
            {student.totalCreditsRequired || 163}
          </p>

          <p>
            <b>Backlogs:</b>
            {" "}
            {student.backlogCount || 0}
          </p>

          <p>
            <b>Status:</b>
            {" "}

            <span
              className={`badge ${
                student.academicStatus ===
                "critical"
                  ? "badge-red"
                  : student.academicStatus ===
                    "warning"
                  ? "badge-yellow"
                  : "badge-green"
              }`}
            >
              {student.academicStatus ||
                "normal"}
            </span>

          </p>

        </div>

        {/* ================= PARENT DETAILS ================= */}
        <div className="dashboard-card">

          <h2>
            👨‍👩‍👧 Parent Details
          </h2>

          <p>
            <b>Father:</b>
            {" "}
            {student.fatherName ||
              "N/A"}
          </p>

          <p>
            <b>Mother:</b>
            {" "}
            {student.motherName ||
              "N/A"}
          </p>

          <p>
            <b>Parent Phone:</b>
            {" "}
            {student.parentPhone ||
              "N/A"}
          </p>

          <p>
            <b>Address:</b>
            {" "}
            {student.address ||
              "N/A"}
          </p>

        </div>

      </div>

      {/* ================= RESULTS ================= */}
      <div
        className="card-container"
        style={{
          marginTop: "28px",
        }}
      >

        <div className="table-header">

          <h2>
            📚 Semester Performance
          </h2>

        </div>

        <table className="erp-table full-width-table">

          <thead>

            <tr>
              <th>Semester</th>
              <th>SGPA</th>
              <th>CGPA</th>
              <th>Credits</th>
              <th>Backlogs</th>
            </tr>

          </thead>

          <tbody>

            {results.length === 0 ? (

              <tr>
                <td
                  colSpan="5"
                  className="empty-row"
                >
                  No semester data available
                </td>
              </tr>

            ) : (

              results.map((r) => (

                <tr key={r._id}>

                  <td>
                    {r.semester}
                  </td>

                  <td>
                    {r.sgpa}
                  </td>

                  <td>
                    {r.cgpa}
                  </td>

                  <td>
                    {r.totalCredits || 0}
                  </td>

                  <td>
                    {r.backlogCount || 0}
                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      {/* ================= SUBJECT DETAILS ================= */}
      {results.map((r) => (

        <div
          key={`subjects-${r._id}`}
          className="card-container"
          style={{
            marginTop: "22px",
          }}
        >

          <div className="table-header">

            <h2>
              📘 Semester {r.semester} Subjects
            </h2>

          </div>

          <table className="erp-table full-width-table">

            <thead>

              <tr>
                <th>Course Code</th>
                <th>Course Name</th>
                <th>Credits</th>
                <th>Grade</th>
              </tr>

            </thead>

            <tbody>

              {r.subjects?.map((s, i) => (

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

              ))}

            </tbody>

          </table>

        </div>

      ))}

      {/* ================= ADD NOTE ================= */}
      <div
        className="form-card"
        style={{
          marginTop: "28px",
        }}
      >

        <h2
          style={{
            marginBottom: "20px",
          }}
        >
          📝 Add Mentor Note
        </h2>

        <select
          className="form-input"
          name="noteType"
          value={noteForm.noteType}
          onChange={handleChange}
        >

          <option value="academic">
            Academic
          </option>

          <option value="personal">
            Personal
          </option>

          <option value="career">
            Career
          </option>

          <option value="warning">
            Warning
          </option>

        </select>

        <input
          className="form-input"
          name="title"
          placeholder="Note title"
          value={noteForm.title}
          onChange={handleChange}
        />

        <textarea
          className="form-input"
          rows="4"
          name="description"
          placeholder="Detailed discussion notes"
          value={noteForm.description}
          onChange={handleChange}
        />

        <input
          type="date"
          className="form-input"
          name="followUpDate"
          value={noteForm.followUpDate}
          onChange={handleChange}
        />

        <button
          className="submit-btn"
          onClick={addNote}
        >
          Save Mentor Note
        </button>

      </div>

      {/* ================= NOTES ================= */}
      <div
        className="card-container"
        style={{
          marginTop: "28px",
        }}
      >

        <div className="table-header">

          <h2>
            📒 Mentor Notes History
          </h2>

        </div>

        {notes.length === 0 ? (

          <div className="empty-row">
            No mentor notes added yet
          </div>

        ) : (

          notes.map((n) => (

            <div
              key={n._id}
              className="form-card"
              style={{
                marginBottom: "18px",
              }}
            >

              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems:
                    "center",
                }}
              >

                <h3>
                  {n.title}
                </h3>

                <span
                  className={`badge ${
                    n.noteType ===
                    "warning"
                      ? "badge-red"
                      : "badge-blue"
                  }`}
                >
                  {n.noteType}
                </span>

              </div>

              <p
                style={{
                  marginTop: "10px",
                }}
              >
                {n.description}
              </p>

              {n.followUpDate && (

                <p
                  style={{
                    marginTop: "10px",
                  }}
                >

                  <b>
                    Follow-up:
                  </b>
                  {" "}

                  {new Date(
                    n.followUpDate
                  ).toLocaleDateString()}

                </p>

              )}

            </div>

          ))

        )}

      </div>

    </MentorLayout>
  );
}