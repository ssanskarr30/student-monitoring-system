// ================= MENTORMESSAGES.JSX =================

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

export default function MentorMessages() {

  const { user } =
    useContext(AuthContext);

  const [students,
    setStudents] =
      useState([]);

  const [selected,
    setSelected] =
      useState(null);

  const [chat,
    setChat] =
      useState([]);

  const [msg,
    setMsg] =
      useState("");

  /* =========================================
     LOAD STUDENTS
  ========================================= */
  useEffect(() => {

    if (!user?.email)
      return;

    fetch(
      `http://localhost:5000/api/mentor/students/${user.email}`
    )
      .then((res) =>
        res.json()
      )
      .then(setStudents)
      .catch(() =>
        setStudents([])
      );

  }, [user?.email]);

  /* =========================================
     OPEN CHAT
  ========================================= */
  const openChat =
    (student) => {

      setSelected(student);

      setChat([]);

    };

  /* =========================================
     LIVE CHAT REFRESH
  ========================================= */
  useEffect(() => {

    if (
      !selected ||
      !user?.email
    )
      return;

    const loadChat = () => {

      fetch(
        `http://localhost:5000/api/messages/${selected.email}/${user.email}`
      )
        .then((res) =>
          res.json()
        )
        .then(setChat)
        .catch(() =>
          setChat([])
        );

    };

    loadChat();

    const interval =
      setInterval(
        loadChat,
        2000
      );

    return () =>
      clearInterval(interval);

  }, [
    selected,
    user?.email,
  ]);

  /* =========================================
     SEND MESSAGE
  ========================================= */
  const sendMessage =
    async () => {

      if (
        !msg.trim() ||
        !selected
      )
        return;

      const tempMsg = {

        senderRole:
          "mentor",

        senderEmail:
          user.email,

        receiverEmail:
          selected.email,

        text:
          msg.trim(),

        createdAt:
          new Date().toISOString(),

      };

      setChat((prev) => [
        ...prev,
        tempMsg,
      ]);

      setMsg("");

      try {

        await fetch(
          "http://localhost:5000/api/messages",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({

              senderRole:
                "mentor",

              senderEmail:
                user.email,

              receiverEmail:
                selected.email,

              text:
                tempMsg.text,

            }),
          }
        );

      } catch (err) {

        console.error(err);

      }

    };

  return (
    <MentorLayout>

      <div className="top-navbar">

        <div>

          <h2 className="welcome-title">
            Mentor Messages
          </h2>

          <p className="welcome-sub">
            Communicate with assigned students
          </p>

        </div>

      </div>

      <div
        className="chat-layout"
        style={{
          marginTop: "24px",
        }}
      >

        {/* LEFT */}
        <div className="chat-sidebar">

          <h3
            style={{
              marginBottom: "18px",
            }}
          >
            Assigned Students
          </h3>

          {students.length === 0 && (

            <div className="empty-row">
              No students assigned.
            </div>

          )}

          {students.map((s) => (

            <div
              key={s._id}
              className={`chat-user ${
                selected?.email ===
                s.email
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                openChat(s)
              }
            >

              <div className="chat-user-name">
                {s.name}
              </div>

              <div className="chat-user-roll">
                {s.rollNo}
              </div>

            </div>

          ))}

        </div>

        {/* RIGHT */}
        <div className="chat-window">

          {!selected ? (

            <div className="empty-row">
              Select a student to start chatting.
            </div>

          ) : (

            <>

              <div
                style={{
                  borderBottom:
                    "1px solid rgba(255,255,255,0.08)",

                  paddingBottom:
                    "16px",

                  marginBottom:
                    "18px",
                }}
              >

                <h3>
                  Chat with
                  {" "}
                  {selected.name}
                </h3>

                <p
                  style={{
                    opacity: 0.7,
                    marginTop: "6px",
                  }}
                >
                  {selected.email}
                </p>

              </div>

              <div className="chat-box">

                {chat.length === 0 && (

                  <div className="empty-row">
                    No messages yet.
                  </div>

                )}

                {chat.map((m, i) => (

                  <div
                    key={i}
                    className={`chat-bubble ${
                      m.senderRole ===
                      "mentor"
                        ? "right"
                        : "left"
                    }`}
                  >

                    <div className="chat-text">
                      {m.text}
                    </div>

                    <div className="chat-time">
                      {new Date(
                        m.createdAt
                      ).toLocaleString()}
                    </div>

                  </div>

                ))}

              </div>

              <div className="chat-input-row">

                <textarea
                  value={msg}
                  onChange={(e) =>
                    setMsg(
                      e.target.value
                    )
                  }
                  placeholder="Type your message..."
                />

                <button
                  className="send-btn"
                  onClick={
                    sendMessage
                  }
                >
                  ➤
                </button>

              </div>

            </>

          )}

        </div>

      </div>

    </MentorLayout>
  );
}