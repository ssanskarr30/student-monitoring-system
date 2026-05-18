import React, {
  useState,
  useContext,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { AuthContext }
from "../../context/AuthContext";

import "../../styles/login.css";

export default function Login() {

  const { login } =
    useContext(AuthContext);

  const navigate =
    useNavigate();

  const [email,
    setEmail] =
      useState("");

  const [password,
    setPassword] =
      useState("");

  const [role,
    setRole] =
      useState("student");

  const [error,
    setError] =
      useState("");

  const [loading,
    setLoading] =
      useState(false);

  /* =====================================
     LOGIN
  ===================================== */
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      setError("");

      setLoading(true);

      try {

        const user =
          await login(
            email,
            password
          );

        const expectedRole =
          role === "faculty"
            ? "mentor"
            : role === "phd"
            ? "student"
            : role;

        if (
          user.role !==
          expectedRole
        ) {

          throw new Error(
            `This account is registered as ${user.role}`
          );

        }

        /* =========================
           PHD CHECK
        ========================= */

        if (
          role === "phd" &&
          user.studentType !==
            "phd"
        ) {

          throw new Error(
            "This is not a PhD account"
          );

        }

        /* =========================
           PASSWORD RESET
        ========================= */

        if (
          user.mustChangePassword ||
          user.firstLogin
        ) {

          navigate(
            "/change-password"
          );

          return;

        }

        /* =========================
           REDIRECTS
        ========================= */

        if (
          user.role ===
            "student" &&
          user.studentType ===
            "phd"
        ) {

          navigate("/phd");

        }

        else if (
          user.role ===
            "student"
        ) {

          navigate(
            "/student"
          );

        }

        else if (
          user.role ===
            "mentor"
        ) {

          navigate(
            "/mentor"
          );

        }

        else if (
          user.role ===
            "hod"
        ) {

          navigate("/hod");

        }

        else {

          navigate(
            "/admin"
          );

        }

      } catch (err) {

        setError(
          err.message
        );

      } finally {

        setLoading(false);

      }

    };

  return (
    <div className="login-page">

      {/* GLOW */}
      <div className="login-glow-1" />

      <div className="login-glow-2" />

      {/* CARD */}
      <div className="login-card">

        {/* HEADER */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "28px",
          }}
        >

          <div
            style={{
              fontSize: "64px",
              marginBottom: "10px",
            }}
          >
            🎓
          </div>

          <h1 className="login-heading">
            Student Monitoring System
          </h1>

          <p className="login-subtitle">
            Academic Management Portal
          </p>

        </div>

        {/* ERROR */}
        {error && (

          <div className="login-error">
            {error}
          </div>

        )}

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="login-form"
        >

          {/* EMAIL */}
          <div className="input-group">

            <label>
              Institutional Email
            </label>

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              required
            />

          </div>

          {/* PASSWORD */}
          <div className="input-group">

            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              required
            />

          </div>

          {/* ROLE */}
          <div className="input-group">

            <label>
              Login As
            </label>

            <select
              value={role}
              onChange={(e) =>
                setRole(
                  e.target.value
                )
              }
            >

              <option value="student">
                BTech Student
              </option>

              <option value="phd">
                PhD Scholar
              </option>

              <option value="faculty">
                Mentor / Faculty
              </option>

              <option value="hod">
                HOD
              </option>

              <option value="admin">
                Admin
              </option>

            </select>

          </div>

          {/* BUTTON */}
          <button
            className="login-btn"
            disabled={loading}
          >

            {loading
              ? "Signing In..."
              : "Login"}

          </button>

        </form>

        {/* FOOTER */}
        <div className="login-footer">

          Don’t have an account?
          {" "}

          <Link to="/signup">
            Learn More
          </Link>

        </div>

      </div>

    </div>
  );

}