import "../../styles/dashboard.css";

import PhdLayout
from "../../layouts/PhdLayout";

export default function ResearchProgress() {

  return (
    <PhdLayout>

      <h1 className="page-title">
        🔬 Research Progress
      </h1>

      <div className="dashboard-card">

        <h2>
          Research Updates
        </h2>

        <p>
          Here PhD scholars will upload:
        </p>

        <ul
          style={{
            marginTop: "10px",
            lineHeight: "2",
          }}
        >

          <li>
            Literature Review
          </li>

          <li>
            Research Papers
          </li>

          <li>
            Monthly Progress
          </li>

          <li>
            Supervisor Comments
          </li>

          <li>
            Experimental Results
          </li>

        </ul>

      </div>

    </PhdLayout>
  );

}