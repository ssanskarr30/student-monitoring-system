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

        if (
          role === "phd" &&
          user.studentType !== "phd"
        ) {

          throw new Error(
            "This is not a PhD account"
          );

        }

        if (
          user.mustChangePassword ||
          user.firstLogin
        ) {

          navigate(
            "/change-password"
          );

          return;

        }

        if (
          user.role === "student" &&
          user.studentType === "btech"
        ) {

          navigate("/student");

        }

        else if (
          user.role === "student" &&
          user.studentType === "phd"
        ) {

          navigate("/phd");

        }

        else if (
          user.role === "mentor"
        ) {

          navigate("/mentor");

        }

        else if (
          user.role === "hod"
        ) {

          navigate("/hod");

        }

        else {

          navigate("/admin");

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

      <div className="login-card">

        <div
          style={{
            textAlign: "center",
            marginBottom: "25px",
          }}
        >

          <div
            style={{
              fontSize: "60px",
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

        {error && (

          <div className="login-error">
            {error}
          </div>

        )}

        <form
          onSubmit={handleSubmit}
          className="login-form"
        >

          <div className="input-group">

            <label>
              Email
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

          <button
            className="login-btn"
            disabled={loading}
          >

            {loading
              ? "Signing In..."
              : "Login"}

          </button>

        </form>

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