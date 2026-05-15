import "../../styles/dashboard.css";

import {
  useState,
  useContext,
} from "react";

import { AuthContext }
from "../../context/AuthContext";

import { useNavigate }
from "react-router-dom";

export default function ChangePassword() {

  const {
    user,
    token,
    logout,
  } = useContext(AuthContext);

  const navigate =
    useNavigate();

  const [password,
    setPassword] =
      useState("");

  const [confirm,
    setConfirm] =
      useState("");

  const [error,
    setError] =
      useState("");

  const [loading,
    setLoading] =
      useState(false);

  /* =========================================
     HANDLE PASSWORD UPDATE
  ========================================= */
  const handleChange =
    async (e) => {

      e.preventDefault();

      setError("");

      if (password.length < 6) {

        setError(
          "Password must be at least 6 characters"
        );

        return;
      }

      if (password !== confirm) {

        setError(
          "Passwords do not match"
        );

        return;
      }

      setLoading(true);

      try {

        const res =
          await fetch(
            "http://localhost:5000/api/auth/change-password",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${token}`,
              },

              body: JSON.stringify({
                userId:
                  user._id,

                newPassword:
                  password,
              }),
            }
          );

        const data =
          await res.json();

        if (!res.ok)
          throw new Error(
            data.message
          );

        alert(
          "Password updated successfully ✅"
        );

        logout();

        navigate("/login");

      } catch (err) {

        setError(
          err.message
        );

      } finally {

        setLoading(false);

      }

    };

  return (
    <div
      className="dashboard-container"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #2563eb 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
      }}
    >

      <div
        className="form-card"
        style={{
          width: "100%",
          maxWidth: "520px",
          padding: "42px",
          borderRadius: "28px",
          background:
            "rgba(255,255,255,0.96)",
          backdropFilter:
            "blur(18px)",
          boxShadow:
            "0 20px 60px rgba(0,0,0,0.25)",
        }}
      >

        {/* HEADER */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "32px",
          }}
        >

          <div
            style={{
              fontSize: "58px",
              marginBottom: "12px",
            }}
          >
            🔐
          </div>

          <h1
            style={{
              fontSize: "34px",
              fontWeight: "800",
              color: "#0f172a",
              marginBottom: "10px",
              letterSpacing: "-0.5px",
            }}
          >
            Change Password
          </h1>

          <p
            style={{
              color: "#64748b",
              fontSize: "15px",
              lineHeight: "1.7",
            }}
          >
            Create a strong new password to secure
            your student monitoring system account.
          </p>

        </div>

        {/* ERROR */}
        {error && (

          <div
            style={{
              background:
                "#fee2e2",
              color: "#b91c1c",
              padding: "14px 18px",
              borderRadius: "14px",
              marginBottom: "24px",
              fontWeight: "600",
              border:
                "1px solid #fecaca",
            }}
          >
            {error}
          </div>

        )}

        {/* FORM */}
        <form onSubmit={handleChange}>

          {/* PASSWORD */}
          <div
            style={{
              marginBottom: "22px",
            }}
          >

            <label
              className="form-label"
              style={{
                marginBottom: "10px",
                display: "block",
                fontWeight: "700",
                color: "#1e293b",
              }}
            >
              New Password
            </label>

            <input
              type="password"
              className="form-input"
              placeholder="Enter new password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              required
              style={{
                height: "56px",
                borderRadius: "16px",
                fontSize: "15px",
                border:
                  "1.5px solid #cbd5e1",
              }}
            />

          </div>

          {/* CONFIRM PASSWORD */}
          <div
            style={{
              marginBottom: "30px",
            }}
          >

            <label
              className="form-label"
              style={{
                marginBottom: "10px",
                display: "block",
                fontWeight: "700",
                color: "#1e293b",
              }}
            >
              Confirm Password
            </label>

            <input
              type="password"
              className="form-input"
              placeholder="Confirm password"
              value={confirm}
              onChange={(e) =>
                setConfirm(
                  e.target.value
                )
              }
              required
              style={{
                height: "56px",
                borderRadius: "16px",
                fontSize: "15px",
                border:
                  "1.5px solid #cbd5e1",
              }}
            />

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              height: "58px",
              border: "none",
              borderRadius: "18px",
              background:
                loading
                  ? "#94a3b8"
                  : "linear-gradient(135deg, #2563eb, #1d4ed8)",

              color: "white",
              fontSize: "16px",
              fontWeight: "700",
              cursor: "pointer",
              transition: "0.3s",
              boxShadow:
                "0 10px 30px rgba(37,99,235,0.35)",
            }}
          >

            {loading
              ? "Updating Password..."
              : "Update Password"}

          </button>

        </form>

        {/* FOOTER */}
        <div
          style={{
            marginTop: "26px",
            textAlign: "center",
            color: "#64748b",
            fontSize: "13px",
            lineHeight: "1.7",
          }}
        >
          Your account security is important.
          Use a strong password with letters,
          numbers and symbols.
        </div>

      </div>

    </div>
  );
}