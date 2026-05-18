import "../../styles/dashboard.css";

import PhdLayout
from "../../layouts/PhdLayout";

export default function PhdMeetings() {

  return (
    <PhdLayout>

      <h1 className="page-title">
        📅 Supervisor Meetings
      </h1>

      <div className="dashboard-card">

        <h2>
          Meeting Records
        </h2>

        <p>
          Upcoming supervisor meetings
          and research discussions will appear here.
        </p>

      </div>

    </PhdLayout>
  );

}