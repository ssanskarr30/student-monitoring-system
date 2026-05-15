import "../../styles/dashboard.css";

import {
  useContext,
  useEffect,
  useState,
} from "react";

import { AuthContext }
from "../../context/AuthContext";

import MentorLayout
from "../../layouts/MentorLayout";

export default function MentorMeetingRequests() {

  const { user } =
    useContext(AuthContext);

  const [meetings, setMeetings] =
    useState([]);

  const [rejectReason,
    setRejectReason] =
      useState("");

  /* =========================================
     LOAD MEETINGS
  ========================================= */
  const loadMeetings =
    async () => {

      if (!user?.email)
        return;

      const res =
        await fetch(
          `http://localhost:5000/api/meetings/mentor/${user.email}?status=pending`
        );

      const data =
        await res.json();

      setMeetings(data);

    };

  useEffect(() => {

    loadMeetings();

  }, [user?.email]);

  /* =========================================
     APPROVE
  ========================================= */
  const approveMeeting =
    async (id) => {

      await fetch(
        `http://localhost:5000/api/meetings/${id}/approve`,
        {
          method: "PUT",
        }
      );

      loadMeetings();

    };

  /* =========================================
     REJECT
  ========================================= */
  const rejectMeeting =
    async (id) => {

      if (
        !rejectReason.trim()
      ) {

        alert(
          "Please enter rejection reason"
        );

        return;
      }

      await fetch(
        `http://localhost:5000/api/meetings/${id}/reject`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            reason:
              rejectReason,
          }),
        }
      );

      setRejectReason("");

      loadMeetings();

    };

  return (
    <MentorLayout>

      <div className="top-navbar">

        <div>

          <h2 className="welcome-title">
            Meeting Approval Requests
          </h2>

          <p className="welcome-sub">
            Approve or reject mentor meeting requests
          </p>

        </div>

      </div>

      <div style={{ marginTop: "24px" }}>

        {meetings.length === 0 && (

          <div className="empty-row">
            No pending meeting requests.
          </div>

        )}

        {meetings.map((m) => (

          <div
            key={m._id}
            className="form-card"
            style={{
              marginBottom: "20px",
              padding: "26px",
            }}
          >

            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
              }}
            >

              <h3>{m.topic}</h3>

              <span className="badge badge-yellow">
                Pending
              </span>

            </div>

            <p>
              <b>Student:</b>
              {" "}
              {m.studentName}
            </p>

            <p>
              <b>Date:</b>
              {" "}
              {new Date(
                m.date
              ).toLocaleDateString()}
            </p>

            {m.notes && (
              <p>
                <b>Notes:</b>
                {" "}
                {m.notes}
              </p>
            )}

            <div
              style={{
                marginTop: "20px",
              }}
            >

              <button
                className="submit-btn"
                onClick={() =>
                  approveMeeting(
                    m._id
                  )
                }
                style={{
                  marginRight: "12px",
                }}
              >
                Approve
              </button>

              <input
                className="form-input"
                placeholder="Rejection reason"
                value={rejectReason}
                onChange={(e) =>
                  setRejectReason(
                    e.target.value
                  )
                }
                style={{
                  marginTop: "12px",
                }}
              />

              <button
                className="btn-delete"
                onClick={() =>
                  rejectMeeting(
                    m._id
                  )
                }
                style={{
                  marginTop: "10px",
                }}
              >
                Reject
              </button>

            </div>

          </div>

        ))}

      </div>

    </MentorLayout>
  );
}