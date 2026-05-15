import "../../styles/dashboard.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function MentorMeetingRequests() {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:5000/api/meetings/mentor/${user.email}`)
      .then((res) => res.json())
      .then(setRequests);
  }, [user]);

  const approve = async (id) => {
    await fetch(`http://localhost:5000/api/meetings/approve/${id}`, {
      method: "PUT",
    });

    setRequests((prev) => prev.filter((r) => r._id !== id));
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-title">👨‍🏫 Mentor Panel</div>
      </div>

      <div className="main-section">
        <h1 className="page-title">Meeting Requests</h1>

        {requests.length === 0 && <p>No pending requests.</p>}

        {requests.map((r) => (
          <div key={r._id} className="form-card">
            <p><b>Student:</b> {r.studentName}</p>
            <p><b>Date:</b> {new Date(r.date).toDateString()}</p>
            <p>{r.note}</p>

            <button className="submit-btn" onClick={() => approve(r._id)}>
              Approve
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}