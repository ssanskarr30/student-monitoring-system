import "../../styles/dashboard.css";

import {
  useContext,
} from "react";

import { AuthContext }
from "../../context/AuthContext";

export default function PhdDashboard() {

  const { user } =
    useContext(AuthContext);

  return (

    <div className="dashboard-container">

      <div className="main-section">

        <div className="top-navbar">

          <div>

            <h2 className="welcome-title">
              🎓 PhD Research Portal
            </h2>

            <p className="welcome-sub">
              Welcome,
              {" "}
              {user?.name}
            </p>

          </div>

        </div>

        <h1
          className="page-title"
          style={{
            marginTop: "20px",
          }}
        >
          PhD Dashboard
        </h1>

        <div
          className="card-grid"
          style={{
            marginTop: "30px",
          }}
        >

          <div className="dashboard-card">

            <h2>
              📚 Research Area
            </h2>

            <p>
              {user?.researchArea ||
                "Not Added"}
            </p>

          </div>

          <div className="dashboard-card">

            <h2>
              🧪 Research Topic
            </h2>

            <p>
              {user?.researchTopic ||
                "Not Added"}
            </p>

          </div>

          <div className="dashboard-card">

            <h2>
              👨‍🏫 Supervisor
            </h2>

            <p>
              {user?.supervisorName ||
                "Not Assigned"}
            </p>

          </div>

          <div className="dashboard-card">

            <h2>
              📄 Publications
            </h2>

            <strong>
              {user?.publications || 0}
            </strong>

          </div>

          <div className="dashboard-card">

            <h2>
              ✅ Synopsis
            </h2>

            <p>

              {user?.synopsisApproved
                ? "Approved"
                : "Pending"}

            </p>

          </div>

          <div className="dashboard-card">

            <h2>
              📘 Thesis
            </h2>

            <p>

              {user?.thesisSubmitted
                ? "Submitted"
                : "Not Submitted"}

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}