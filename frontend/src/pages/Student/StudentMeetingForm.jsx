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

export default function StudentMeetingForm() {

  const { user } =
    useContext(AuthContext);

  const [mentor, setMentor] =
    useState(null);

  const [date, setDate] =
    useState("");

  const [topic, setTopic] =
    useState("");

  const [notes, setNotes] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  /* ================= LOAD MENTOR ================= */
  useEffect(() => {

    if (!user?.mentorEmail)
      return;

    fetch(
      `http://localhost:5000/api/admin/user-by-email/${user.mentorEmail}`
    )
      .then((res) => res.json())
      .then(setMentor)
      .catch(() => setMentor(null));

  }, [user?.mentorEmail]);

  /* ================= SUBMIT ================= */
  const submitMeeting =
    async () => {

      if (!date || !topic) {
        alert(
          "Please fill date and topic"
        );
        return;
      }

      setLoading(true);

      try {

        const res = await fetch(
          "http://localhost:5000/api/meetings",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              studentEmail:
                user.email,

              studentName:
                user.name,

              mentorEmail:
                user.mentorEmail,

              mentorName:
                mentor?.name,

              date,

              topic,

              notes,
            }),
          }
        );

        const data =
          await res.json();

        if (!res.ok) {
          alert(
            data.message ||
              "Failed to submit"
          );

          return;
        }

        alert(
          "Meeting request submitted ✅"
        );

        setDate("");
        setTopic("");
        setNotes("");

      } catch {

        alert("Server error");

      } finally {

        setLoading(false);

      }

    };

  return (
    <StudentLayout>

      <div className="top-navbar">

        <div>
          <h2 className="welcome-title">
            Request Mentor Meeting
          </h2>

          <p className="welcome-sub">
            Schedule academic or personal guidance sessions
          </p>
        </div>

      </div>

      {!mentor ? (

        <div
          className="empty-row"
          style={{
            marginTop: "30px",
          }}
        >
          No mentor assigned yet.
        </div>

      ) : (

        <div
          className="form-card"
          style={{
            maxWidth: "850px",
            margin: "30px auto",
            padding: "34px",
          }}
        >

          <label className="form-label">
            Assigned Mentor
          </label>

          <input
            className="form-input"
            value={mentor.name}
            disabled
          />

          <label className="form-label">
            Meeting Date *
          </label>

          <input
            type="date"
            className="form-input"
            value={date}
            onChange={(e) =>
              setDate(
                e.target.value
              )
            }
          />

          <label className="form-label">
            Topic *
          </label>

          <input
            className="form-input"
            value={topic}
            onChange={(e) =>
              setTopic(
                e.target.value
              )
            }
            placeholder="Enter meeting topic"
          />

          <label className="form-label">
            Notes (Optional)
          </label>

          <textarea
            className="form-input"
            rows={5}
            value={notes}
            onChange={(e) =>
              setNotes(
                e.target.value
              )
            }
            placeholder="Describe the purpose or discussion details"
          />

          <button
            className="submit-btn"
            onClick={submitMeeting}
            disabled={loading}
            style={{
              marginTop: "24px",
              width: "100%",
            }}
          >
            {loading
              ? "Submitting..."
              : "Submit Request"}
          </button>

        </div>

      )}

    </StudentLayout>
  );
}