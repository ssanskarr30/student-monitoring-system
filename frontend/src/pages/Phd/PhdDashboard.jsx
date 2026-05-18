import "../../styles/dashboard.css";

import {
  useContext,
} from "react";

import { AuthContext }
from "../../context/AuthContext";

import PhdLayout
from "../../layouts/PhdLayout";

export default function PhdDashboard() {

  const { user } =
    useContext(AuthContext);

  return (
    <PhdLayout>

      <div className="top-navbar">

        <div>

          <h2 className="welcome-title">
            Welcome,
            {" "}
            {user?.name}
          </h2>

          <p className="welcome-sub">
            PhD Research Monitoring Dashboard
          </p>

        </div>

      </div>

      <h1
        className="page-title"
        style={{
          marginTop: "20px",
        }}
      >
        PhD Scholar Dashboard
      </h1>

      <div className="card-grid">

        {/* RESEARCH AREA */}
        <div
          className="dashboard-card phd-card"
        >

          <h2>
            🔬 Research Area
          </h2>

          <p>
            {
              user?.researchArea ||
              "Not Updated"
            }
          </p>

        </div>

        {/* RESEARCH TOPIC */}
        <div
          className="dashboard-card phd-card"
        >

          <h2>
            📘 Research Topic
          </h2>

          <p>
            {
              user?.researchTopic ||
              "Not Updated"
            }
          </p>

        </div>

        {/* SUPERVISOR */}
        <div
          className="dashboard-card phd-card"
        >

          <h2>
            👨‍🏫 Supervisor
          </h2>

          <p>
            {
              user?.supervisorName ||
              "Not Assigned"
            }
          </p>

          <p>
            {
              user?.supervisorEmail
            }
          </p>

        </div>

        {/* PUBLICATIONS */}
        <div
          className="dashboard-card phd-card"
        >

          <h2>
            📚 Publications
          </h2>

          <strong>
            {
              user?.publications || 0
            }
          </strong>

        </div>

        {/* SYNOPSIS */}
        <div
          className="dashboard-card phd-card"
        >

          <h2>
            📝 Synopsis Status
          </h2>

          <span
            className={`badge ${
              user?.synopsisApproved
                ? "badge-green"
                : "badge-red"
            }`}
          >
            {
              user?.synopsisApproved
                ? "APPROVED"
                : "PENDING"
            }
          </span>

        </div>

        {/* THESIS */}
        <div
          className="dashboard-card phd-card"
        >

          <h2>
            📄 Thesis Submission
          </h2>

          <span
            className={`badge ${
              user?.thesisSubmitted
                ? "badge-green"
                : "badge-yellow"
            }`}
          >
            {
              user?.thesisSubmitted
                ? "SUBMITTED"
                : "IN PROGRESS"
            }
          </span>

        </div>

      </div>

    </PhdLayout>
  );

}