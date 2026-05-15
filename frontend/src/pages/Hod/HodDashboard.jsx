import "../../styles/dashboard.css";

import {
  useContext,
  useEffect,
  useState,
} from "react";

import { AuthContext }
from "../../context/AuthContext";

import HodLayout
from "../../layouts/HodLayout";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

export default function HodDashboard() {

  const { user } =
    useContext(AuthContext);

  const [analytics,
    setAnalytics] =
      useState({
        totalStudents: 0,
        totalMentors: 0,
        warningStudents: 0,
        criticalStudents: 0,
        lowCgpaStudents: [],
        mentorLoads: [],
      });

  useEffect(() => {

    fetch(
      "http://localhost:5000/api/hod-analytics/overview"
    )
      .then((res) =>
        res.json()
      )
      .then(setAnalytics)
      .catch(() => {

        setAnalytics({
          totalStudents: 0,
          totalMentors: 0,
          warningStudents: 0,
          criticalStudents: 0,
          lowCgpaStudents: [],
          mentorLoads: [],
        });

      });

  }, []);

  const pieData = [
    {
      name: "Normal",

      value:
        analytics.totalStudents -
        analytics.warningStudents -
        analytics.criticalStudents,
    },

    {
      name: "Warning",

      value:
        analytics.warningStudents,
    },

    {
      name: "Critical",

      value:
        analytics.criticalStudents,
    },
  ];

  const COLORS = [
    "#22c55e",
    "#f59e0b",
    "#ef4444",
  ];

  const mentorLoadData =
    analytics.mentorLoads.map(
      (m) => ({
        mentor:
          m._id?.split("@")[0] ||
          "Mentor",

        students:
          m.totalStudents,
      })
    );

  return (
    <HodLayout>

      <div className="top-navbar">

        <div>

          <h2 className="welcome-title">
            Welcome,
            {" "}
            {user?.name}
          </h2>

          <p className="welcome-sub">
            Academic analytics and department overview
          </p>

        </div>

      </div>

      <h1 className="page-title">
        HOD Analytics Dashboard
      </h1>

      {/* STATS */}
      <div className="card-grid">

        <div className="dashboard-card">
          <h2>🎓 Students</h2>

          <strong>
            {analytics.totalStudents}
          </strong>
        </div>

        <div className="dashboard-card">
          <h2>👨‍🏫 Mentors</h2>

          <strong>
            {analytics.totalMentors}
          </strong>
        </div>

        <div className="dashboard-card warning-card">
          <h2>⚠ Warning</h2>

          <strong>
            {analytics.warningStudents}
          </strong>
        </div>

        <div className="dashboard-card danger-card">
          <h2>🚨 Critical</h2>

          <strong>
            {analytics.criticalStudents}
          </strong>
        </div>

      </div>

      {/* CHARTS */}
      <div
        className="chart-grid"
        style={{
          marginTop: "30px",
        }}
      >

        <div className="chart-card">

          <h2>
            📊 Academic Status
          </h2>

          <ResponsiveContainer
            width="100%"
            height={320}
          >

            <PieChart>

              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >

                {pieData.map(
                  (
                    entry,
                    index
                  ) => (

                    <Cell
                      key={index}
                      fill={
                        COLORS[index]
                      }
                    />

                  )
                )}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

        <div className="chart-card">

          <h2>
            👨‍🏫 Mentor Load
          </h2>

          <ResponsiveContainer
            width="100%"
            height={320}
          >

            <BarChart
              data={
                mentorLoadData
              }
            >

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis dataKey="mentor" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="students"
                fill="#2563eb"
                radius={[
                  8,
                  8,
                  0,
                  0,
                ]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* LOW CGPA */}
      <div
        className="card-container"
        style={{
          marginTop: "30px",
        }}
      >

        <div className="table-header">

          <h2>
            ⚠ Low CGPA Students
          </h2>

        </div>

        <table className="erp-table full-width-table">

          <thead>

            <tr>
              <th>Name</th>
              <th>Roll No</th>
              <th>CGPA</th>
              <th>Backlogs</th>
              <th>Status</th>
            </tr>

          </thead>

          <tbody>

            {analytics
              .lowCgpaStudents
              .length === 0 ? (

              <tr>

                <td
                  colSpan="5"
                  className="empty-row"
                >
                  No low CGPA students
                </td>

              </tr>

            ) : (

              analytics
                .lowCgpaStudents
                .map((s) => (

                  <tr key={s._id}>

                    <td>{s.name}</td>

                    <td>{s.rollNo}</td>

                    <td>{s.cgpa}</td>

                    <td>
                      {s.backlogCount}
                    </td>

                    <td>

                      <span
                        className={`badge ${
                          s.academicStatus ===
                          "critical"
                            ? "badge-red"
                            : "badge-yellow"
                        }`}
                      >
                        {
                          s.academicStatus
                        }
                      </span>

                    </td>

                  </tr>

                ))

            )}

          </tbody>

        </table>

      </div>

    </HodLayout>
  );
}