import "../../styles/dashboard.css";

import {
  useContext,
} from "react";

import { AuthContext }
from "../../context/AuthContext";

import PhdLayout
from "../../layouts/PhdLayout";

export default function Publications() {

  const { user } =
    useContext(AuthContext);

  return (
    <PhdLayout>

      <h1 className="page-title">
        📚 Publications
      </h1>

      <div className="dashboard-card">

        <h2>
          Total Publications
        </h2>

        <strong
          style={{
            fontSize: "38px",
          }}
        >
          {
            user?.publications || 0
          }
        </strong>

      </div>

    </PhdLayout>
  );

}