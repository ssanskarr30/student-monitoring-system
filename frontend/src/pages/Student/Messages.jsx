// ================= STUDENTMESSAGES.JSX =================

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

export default function StudentMessages() {

  const { user } =
    useContext(AuthContext);

  const [mentor, setMentor] =
    useState(null);

  const [messages, setMessages] =
    useState([]);

  const [text, setText] =
    useState("");

  /* ================= LOAD MENTOR ================= */
  useEffect(() => {

    if (!user?.mentorEmail)
      return;

    fetch(
      `http://localhost:5000/api/admin/user-by-email/${user.mentorEmail}`
    )
      .then((res) =>
        res.json()
      )
      .then(setMentor)
      .catch(() =>
        setMentor(null)
      );

  }, [user?.mentorEmail]);

  /* ================= LIVE CHAT ================= */
  useEffect(() => {

    if (
      !user?.mentorEmail ||
      !user?.email
    )
      return;

    const loadMessages = () => {

      fetch(
        `http://localhost:5000/api/messages/${user.email}/${user.mentorEmail}`
      )
        .then((res) =>
          res.json()
        )
        .then(setMessages)
        .catch(() =>
          setMessages([])
        );

    };

    loadMessages();

    const interval =
      setInterval(
        loadMessages,
        2000
      );

    return () =>
      clearInterval(interval);

  }, [
    user?.email,
    user?.mentorEmail,
  ]);

  /* ================= SEND ================= */
  const send = async () => {

    if (!text.trim() || !mentor)
      return;

    const tempMsg = {

      senderRole:
        "student",

      senderEmail:
        user.email,

      receiverEmail:
        mentor.email,

      text: text.trim(),

      createdAt:
        new Date().toISOString(),

    };

    setMessages((prev) => [
      ...prev,
      tempMsg,
    ]);

    setText("");

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
              "student",

            senderEmail:
              user.email,

            receiverEmail:
              mentor.email,

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
    <StudentLayout>

      <div className="top-navbar">

        <div>

          <h2 className="welcome-title">
            Messages
          </h2>

          <p className="welcome-sub">
            Communicate directly with your mentor
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
          className="chat-layout"
          style={{
            marginTop: "24px",
          }}
        >

          <div className="chat-window full">

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
                Chat with {mentor.name}
              </h3>

              <p
                style={{
                  opacity: 0.7,
                  marginTop: "6px",
                }}
              >
                {mentor.email}
              </p>

            </div>

            <div className="chat-box">

              {messages.length === 0 && (

                <div className="empty-row">
                  No messages yet.
                </div>

              )}

              {messages.map((m, i) => (

                <div
                  key={i}
                  className={`chat-bubble ${
                    m.senderRole ===
                    "student"
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
                value={text}
                onChange={(e) =>
                  setText(
                    e.target.value
                  )
                }
                placeholder="Type your message..."
              />

              <button
                className="send-btn"
                onClick={send}
              >
                ➤
              </button>

            </div>

          </div>

        </div>

      )}

    </StudentLayout>
  );
}