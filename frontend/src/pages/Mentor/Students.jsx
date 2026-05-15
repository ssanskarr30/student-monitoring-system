import "../../styles/dashboard.css";

import {
  useState,
  useEffect,
  useContext,
} from "react";

import { AuthContext }
from "../../context/AuthContext";

import { Link }
from "react-router-dom";

import MentorLayout
from "../../layouts/MentorLayout";

export default function MentorStudents() {

  const { user } =
    useContext(AuthContext);

  const [students, setStudents] =
    useState([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {

    if (!user?.email) return;

    fetch(
      `http://localhost:5000/api/mentor/students/${user.email}`
    )
      .then((res) => res.json())
      .then((data) =>
        setStudents(data)
      )
      .catch(() =>
        setStudents([])
      );

  }, [user?.email]);

  const filtered =
    students.filter(
      (s) =>
        s.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        s.rollNo
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (
    <MentorLayout>

      <div className="top-navbar">

        <div>
          <h2 className="welcome-title">
            Assigned Students
          </h2>

          <p className="welcome-sub">
            View and manage students assigned under your mentorship
          </p>
        </div>

      </div>

      <div
        className="form-card"
        style={{
          marginTop: "28px",
          padding: "28px",
        }}
      >

        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            marginBottom: "24px",
            gap: "18px",
          }}
        >

          <input
            className="search-input"
            placeholder="🔍 Search by student name or roll number"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            style={{
              flex: 1,
            }}
          />

          <div
            className="badge badge-blue"
            style={{
              padding:
                "10px 16px",
            }}
          >
            {filtered.length}
            {" "}
            Students
          </div>

        </div>

        <div
          style={{
            overflowX: "auto",
          }}
        >

          <table className="erp-table">

            <thead>

              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Roll No</th>
                <th>Branch</th>
                <th>Semester</th>
                <th>Profile</th>
              </tr>

            </thead>

            <tbody>

              {filtered.length === 0 ? (

                <tr>
                  <td colSpan="6">
                    No students assigned
                  </td>
                </tr>

              ) : (

                filtered.map((s) => (

                  <tr key={s._id}>

                    <td>{s.name}</td>

                    <td>{s.email}</td>

                    <td>{s.rollNo}</td>

                    <td>{s.branch}</td>

                    <td>
                      Semester
                      {" "}
                      {s.semester}
                    </td>

                    <td>

                      <Link
                        className="table-btn"
                        to={`/mentor/student/${s._id}`}
                      >
                        View Profile
                      </Link>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </MentorLayout>
  );
}