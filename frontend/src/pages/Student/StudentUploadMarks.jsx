import "../../styles/dashboard.css";

import {
  useContext,
  useEffect,
  useState,
} from "react";

import { AuthContext }
from "../../context/AuthContext";

import CourseSearch
from "../../components/CourseSearch";

import StudentLayout
from "../../layouts/StudentLayout";

export default function StudentUploadMarks() {

  const { user } =
    useContext(AuthContext);

  const [semester, setSemester] =
    useState("");

  const [subjectCount, setSubjectCount] =
    useState("");

  const [subjects, setSubjects] =
    useState([]);

  const [sgpa, setSgpa] =
    useState("");

  const [cgpa, setCgpa] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [results, setResults] =
    useState([]);

  const [editingId, setEditingId] =
    useState(null);

  /* =====================================
     LOAD RESULTS
  ===================================== */
  const loadResults = async () => {

    if (!user?.email) return;

    try {

      const res = await fetch(
        `http://localhost:5000/api/semester/student/${user.email}`
      );

      const data = await res.json();

      setResults(data);

    } catch {

      setResults([]);

    }

  };

  useEffect(() => {

    loadResults();

  }, [user?.email]);

  /* =====================================
     SUBJECT COUNT
  ===================================== */
  const handleSubjectCount = (
    count
  ) => {

    const n = Number(count);

    setSubjectCount(n);

    setSubjects(
      Array.from(
        { length: n },
        () => ({
          courseCode: "",
          courseName: "",
          credits: "",
          grade: "",
        })
      )
    );

  };

  /* =====================================
     COURSE SELECT
  ===================================== */
  const selectCourse = (
    index,
    course
  ) => {

    const copy = [...subjects];

    copy[index].courseCode =
      course.courseCode;

    copy[index].courseName =
      course.courseName;

    setSubjects(copy);

  };

  /* =====================================
     FIELD CHANGE
  ===================================== */
  const handleSubjectChange = (
    index,
    field,
    value
  ) => {

    const copy = [...subjects];

    copy[index][field] =
      value;

    setSubjects(copy);

  };

  /* =====================================
     EDIT RESULT
  ===================================== */
  const editResult = (
    result
  ) => {

    setEditingId(result._id);

    setSemester(
      result.semester
    );

    setSubjects(
      result.subjects
    );

    setSubjectCount(
      result.subjects.length
    );

    setSgpa(
      result.sgpa
    );

    setCgpa(
      result.cgpa
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };

  /* =====================================
     DELETE RESULT
  ===================================== */
  const deleteResult = async (
    id
  ) => {

    const ok = window.confirm(
      "Delete this semester result?"
    );

    if (!ok) return;

    try {

      await fetch(
        `http://localhost:5000/api/semester/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      loadResults();

    } catch {

      alert(
        "Failed to delete result"
      );

    }

  };

  /* =====================================
     RESET FORM
  ===================================== */
  const resetForm = () => {

    setEditingId(null);

    setSemester("");

    setSubjectCount("");

    setSubjects([]);

    setSgpa("");

    setCgpa("");

  };

  /* =====================================
     SUBMIT
  ===================================== */
  const handleSubmit = async () => {

    if (!user) return;

    if (
      !semester ||
      !subjects.length ||
      !sgpa ||
      !cgpa
    ) {

      setMessage(
        "❌ All fields are required"
      );

      return;

    }

    for (const s of subjects) {

      if (
        !s.courseCode ||
        !s.courseName ||
        !s.credits ||
        !s.grade
      ) {

        setMessage(
          "❌ Complete all subject details"
        );

        return;

      }

    }

    try {

      const res = await fetch(
        "http://localhost:5000/api/semester/submit",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({

            studentId:
              user._id,

            studentEmail:
              user.email,

            studentName:
              user.name,

            mentorEmail:
              user.mentorEmail,

            mentorName:
              user.mentorName,

            semester,

            subjects,

            sgpa,

            cgpa,

          }),
        }
      );

      const data =
        await res.json();

      if (!res.ok)
        throw new Error();

      setMessage(
        data.message
      );

      resetForm();

      loadResults();

    } catch {

      setMessage(
        "❌ Failed to submit result"
      );

    }

  };

  return (
    <StudentLayout>

      <div className="top-navbar">

        <div>
          <h2 className="welcome-title">
            Semester Results
          </h2>

          <p className="welcome-sub">
            Submit and manage semester academic records
          </p>
        </div>

      </div>

      {/* ================= FORM ================= */}
      <div
        className="form-card"
        style={{
          maxWidth: "950px",
          margin: "30px auto",
          padding: "32px",
        }}
      >

        <h2
          style={{
            marginBottom: "20px",
          }}
        >
          {editingId
            ? "✏ Update Semester"
            : "📚 Add Semester"}
        </h2>

        <label className="form-label">
          Semester
        </label>

        <input
          className="form-input"
          type="number"
          value={semester}
          onChange={(e) =>
            setSemester(
              e.target.value
            )
          }
        />

        <label className="form-label">
          Total Subjects
        </label>

        <input
          className="form-input"
          type="number"
          value={subjectCount}
          onChange={(e) =>
            handleSubjectCount(
              e.target.value
            )
          }
        />

        {subjects.map((subj, i) => (

          <div
            key={i}
            className="subject-block"
            style={{
              marginTop: "25px",
              padding: "24px",
              borderRadius: "18px",
              background:
                "rgba(255,255,255,0.04)",
            }}
          >

            <h3>
              📘 Subject {i + 1}
            </h3>

            <CourseSearch
              onSelect={(c) =>
                selectCourse(i, c)
              }
            />

            {subj.courseCode && (
              <p
                style={{
                  marginTop: "10px",
                }}
              >
                ✅ {subj.courseCode}
                {" — "}
                {subj.courseName}
              </p>
            )}

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "1fr 1fr",
                gap: "16px",
                marginTop: "16px",
              }}
            >

              <input
                className="form-input"
                type="number"
                placeholder="Credits"
                value={subj.credits}
                onChange={(e) =>
                  handleSubjectChange(
                    i,
                    "credits",
                    e.target.value
                  )
                }
              />

              <input
                className="form-input"
                placeholder="Grade"
                value={subj.grade}
                onChange={(e) =>
                  handleSubjectChange(
                    i,
                    "grade",
                    e.target.value.toUpperCase()
                  )
                }
              />

            </div>

            {subj.grade === "F" && (
              <div
                style={{
                  marginTop: "12px",
                  color: "#ef4444",
                  fontWeight: "600",
                }}
              >
                ⚠ This subject will count as backlog
              </div>
            )}

          </div>

        ))}

        {subjects.length > 0 && (
          <>

            <label
              className="form-label"
              style={{
                marginTop: "24px",
              }}
            >
              SGPA
            </label>

            <input
              className="form-input"
              value={sgpa}
              onChange={(e) =>
                setSgpa(
                  e.target.value
                )
              }
            />

            <label className="form-label">
              CGPA
            </label>

            <input
              className="form-input"
              value={cgpa}
              onChange={(e) =>
                setCgpa(
                  e.target.value
                )
              }
            />

          </>
        )}

        <div
          style={{
            display: "flex",
            gap: "14px",
            marginTop: "30px",
          }}
        >

          <button
            className="submit-btn"
            onClick={handleSubmit}
            style={{
              flex: 1,
            }}
          >
            {editingId
              ? "Update Result"
              : "Submit Result"}
          </button>

          {editingId && (
            <button
              className="btn-delete"
              onClick={resetForm}
            >
              Cancel
            </button>
          )}

        </div>

        {message && (
          <p
            style={{
              marginTop: "16px",
            }}
          >
            {message}
          </p>
        )}

      </div>

      {/* ================= SUBMITTED RESULTS ================= */}
      <div
        className="card-container"
        style={{
          marginTop: "30px",
        }}
      >

        <div className="table-header">
          <h2>
            📑 Submitted Semesters
          </h2>
        </div>

        {results.length === 0 ? (

          <div className="empty-row">
            No semester results submitted
          </div>

        ) : (

          results.map((r) => (

            <div
              key={r._id}
              className="form-card"
              style={{
                marginBottom: "20px",
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

                <div>

                  <h3>
                    Semester {r.semester}
                  </h3>

                  <p>
                    SGPA:
                    {" "}
                    {r.sgpa}
                    {" | "}
                    CGPA:
                    {" "}
                    {r.cgpa}
                  </p>

                  <p>
                    Credits:
                    {" "}
                    {r.totalCredits}
                  </p>

                  <p>
                    Backlogs:
                    {" "}
                    {r.backlogCount}
                  </p>

                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                  }}
                >

                  <button
                    className="table-btn"
                    onClick={() =>
                      editResult(r)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="btn-delete"
                    onClick={() =>
                      deleteResult(
                        r._id
                      )
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))

        )}

      </div>

    </StudentLayout>
  );
}