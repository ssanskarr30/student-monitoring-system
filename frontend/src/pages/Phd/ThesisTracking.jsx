import "../../styles/dashboard.css";

import {
  useContext,
} from "react";

import { AuthContext }
from "../../context/AuthContext";

import PhdLayout
from "../../layouts/PhdLayout";

export default function ThesisTracking() {

  const { user } =
    useContext(AuthContext);

  return (
    <PhdLayout>

      <h1 className="page-title">
        📄 Thesis Tracking
      </h1>

      <div className="card-grid">

        <div className="dashboard-card">

          <h2>
            Synopsis
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
                ? "Approved"
                : "Pending"
            }
          </span>

        </div>

        <div className="dashboard-card">

          <h2>
            Thesis
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
                ? "Submitted"
                : "In Progress"
            }
          </span>

        </div>

      </div>

    </PhdLayout>
  );

}