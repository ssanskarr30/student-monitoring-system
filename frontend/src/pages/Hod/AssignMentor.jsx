import "../../styles/dashboard.css";

import {
  useState,
  useEffect,
  useContext,
} from "react";

import { AuthContext }
from "../../context/AuthContext";

import HodLayout
from "../../layouts/HodLayout";

export default function AssignMentor() {

  const { user } =
    useContext(AuthContext);

  const [students,
    setStudents] =
      useState([]);

  const [mentors,
    setMentors] =
      useState([]);

  const [search,
    setSearch] =
      useState("");

  const [selectedMentors,
    setSelectedMentors] =
      useState({});

  /* =========================================
     LOAD USERS
  ========================================= */
  useEffect(() => {

    fetch(
      "http://localhost:5000/api/admin/users"
    )
      .then((res) =>
        res.json()
      )
      .then((data) => {

        setStudents(
          data.filter(
            (u) =>
              u.role ===
              "student"
          )
        );

        setMentors(
          data.filter(
            (u) =>
              u.role ===
              "mentor"
          )
        );

      })
      .catch((err) =>
        console.error(err)
      );

  }, []);

  /* =========================================
     ASSIGN MENTOR
  ========================================= */
  const assignMentor =
    async (studentId) => {

      const mentorEmail =
        selectedMentors[
          studentId
        ];

      if (!mentorEmail) {

        alert(
          "Please select a mentor"
        );

        return;
      }

      const mentor =
        mentors.find(
          (m) =>
            m.email ===
            mentorEmail
        );

      try {

        const res =
          await fetch(
            `http://localhost:5000/api/admin/assign-mentor/${studentId}`,
            {
              method: "PUT",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                mentorEmail,

                mentorName:
                  mentor?.name,
              }),
            }
          );

        if (!res.ok)
          throw new Error();

        setStudents((prev) =>
          prev.map((s) =>
            s._id === studentId
              ? {
                  ...s,
                  mentorEmail,
                  mentorName:
                    mentor?.name,
                }
              : s
          )
        );

        alert(
          "Mentor assigned successfully ✅"
        );

      } catch {

        alert(
          "Failed to assign mentor ❌"
        );

      }

    };

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
    <HodLayout>

      <div className="top-navbar">

        <div>

          <h2 className="welcome-title">
            Assign Mentors
          </h2>

          <p className="welcome-sub">
            Allocate faculty mentors to students
          </p>

        </div>

      </div>

      <div
        className="form-card"
        style={{
          marginTop: "24px",
          padding: "28px",
        }}
      >

        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            marginBottom: "22px",
            gap: "18px",
          }}
        >

          <input
            className="search-input"
            placeholder="🔍 Search student..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            style={{
              maxWidth: "380px",
            }}
          />

          <div className="badge badge-blue">
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

          <table className="erp-table full-width-table">

            <thead>

              <tr>
                <th>Student</th>
                <th>Email</th>
                <th>Roll No</th>
                <th>Current Mentor</th>
                <th>Select Mentor</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {filtered.length === 0 ? (

                <tr>
                  <td
                    colSpan="6"
                    className="empty-row"
                  >
                    No students found
                  </td>
                </tr>

              ) : (

                filtered.map((s) => (

                  <tr key={s._id}>

                    <td>{s.name}</td>

                    <td>{s.email}</td>

                    <td>
                      {s.rollNo || "—"}
                    </td>

                    <td>

                      {s.mentorName ? (

                        <span className="badge badge-green">
                          {s.mentorName}
                        </span>

                      ) : (

                        <span className="badge badge-red">
                          Not Assigned
                        </span>

                      )}

                    </td>

                    <td>

                      <select
                        className="form-input"
                        value={
                          selectedMentors[
                            s._id
                          ] || ""
                        }
                        onChange={(e) =>
                          setSelectedMentors({
                            ...selectedMentors,

                            [s._id]:
                              e.target.value,
                          })
                        }
                      >

                        <option value="">
                          Select Mentor
                        </option>

                        {mentors.map(
                          (m) => (

                            <option
                              key={m._id}
                              value={
                                m.email
                              }
                            >

                              {m.name}
                              {" "}
                              (
                              {m.email}
                              )

                            </option>

                          )
                        )}

                      </select>

                    </td>

                    <td>

                      <button
                        className="table-btn"
                        onClick={() =>
                          assignMentor(
                            s._id
                          )
                        }
                      >
                        Assign
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </HodLayout>
  );
}