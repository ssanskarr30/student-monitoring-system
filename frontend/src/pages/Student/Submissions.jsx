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

export default function Submissions() {

  const { user } =
    useContext(AuthContext);

  const [results, setResults] =
    useState([]);

  useEffect(() => {

    if (!user?.email) return;

    fetch(
      `http://localhost:5000/api/semester/student/${user.email}`
    )
      .then((res) =>
        res.json()
      )
      .then(setResults)
      .catch(() =>
        setResults([])
      );

  }, [user?.email]);

  return (
    <StudentLayout>

      <div className="top-navbar">

        <div>
          <h2 className="welcome-title">
            Semester Submissions
          </h2>

          <p className="welcome-sub">
            All uploaded semester results
          </p>
        </div>

      </div>

      <div
        style={{
          marginTop: "30px",
        }}
      >

        {results.length === 0 ? (

          <div className="empty-row">
            No semester submissions
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
                    Credits Earned:
                    {" "}
                    {r.totalCredits}
                  </p>

                  <p>
                    Backlogs:
                    {" "}
                    {r.backlogCount}
                  </p>

                  <p>
                    Subjects:
                    {" "}
                    {r.subjects.length}
                  </p>

                </div>

                <span className="badge badge-green">
                  Submitted
                </span>

              </div>

            </div>

          ))

        )}

      </div>

    </StudentLayout>
  );
}