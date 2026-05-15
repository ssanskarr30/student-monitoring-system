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

export default function Profile() {

  const {
    user,
    refreshUser,
  } = useContext(AuthContext);

  const [form, setForm] =
    useState(null);

  const [saving, setSaving] =
    useState(false);

  const [otp, setOtp] =
    useState("");

  const [otpSent, setOtpSent] =
    useState(false);

  const [verified, setVerified] =
    useState(false);

  useEffect(() => {

    if (!user) return;

    setVerified(
      user.phoneVerified || false
    );

    setForm({
      name: user.name || "",

      email: user.email || "",

      role: user.role || "",

      rollNo: user.rollNo || "",

      branch: user.branch || "",

      semester: user.semester || "",

      mentorName:
        user.mentorName || "",

      fatherName:
        user.fatherName || "",

      motherName:
        user.motherName || "",

      personalPhone:
        user.personalPhone || "",

      parentPhone:
        user.parentPhone || "",

      address:
        user.address || "",
    });

  }, [user]);

  /* =====================================
     HANDLE CHANGE
  ===================================== */
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });

  };

  /* =====================================
     SEND OTP
  ===================================== */
  const sendOtp = async () => {

    if (
      !form.personalPhone ||
      form.personalPhone.length < 10
    ) {

      return alert(
        "Enter valid personal phone number first"
      );

    }

    try {

      const res = await fetch(
        "http://localhost:5000/api/auth/send-phone-otp",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            userId: user._id,
            phone:
              form.personalPhone,
          }),
        }
      );

      const data =
        await res.json();

      if (!res.ok)
        throw new Error(
          data.message
        );

      setOtpSent(true);

      alert(
        "OTP sent successfully"
      );

    } catch (err) {

      alert(
        err.message ||
        "Failed to send OTP"
      );

    }

  };

  /* =====================================
     VERIFY OTP
  ===================================== */
  const verifyOtp = async () => {

    if (!otp) {

      return alert(
        "Enter OTP first"
      );

    }

    try {

      const res = await fetch(
        "http://localhost:5000/api/auth/verify-phone-otp",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            userId: user._id,
            otp,
          }),
        }
      );

      const data =
        await res.json();

      if (!res.ok)
        throw new Error(
          data.message
        );

      setVerified(true);

      await refreshUser();

      alert(
        "✅ Phone verified successfully"
      );

    } catch (err) {

      alert(
        err.message ||
        "OTP verification failed"
      );

    }

  };

  /* =====================================
     SAVE PROFILE
  ===================================== */
  const handleSave = async (e) => {

    e.preventDefault();

    if (!form) return;

    try {

      setSaving(true);

      const res = await fetch(
        `http://localhost:5000/api/auth/user-by-email/${user.email}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            ...form,
            phoneVerified:
              verified,
          }),
        }
      );

      const data =
        await res.json();

      if (!res.ok)
        throw new Error(
          data.message
        );

      await refreshUser();

      alert(
        "✅ Profile updated successfully"
      );

    } catch (err) {

      alert(
        err.message ||
        "❌ Failed to update profile"
      );

    } finally {

      setSaving(false);

    }

  };

  if (!form) return null;

  return (
    <StudentLayout>

      {/* ================= TOP ================= */}

      <div className="top-navbar">

        <div>

          <h2 className="welcome-title">
            My Profile
          </h2>

          <p className="welcome-sub">
            Manage your personal and academic details
          </p>

        </div>

      </div>

      {/* ================= PROFILE CARD ================= */}

      <form onSubmit={handleSave}>

        <div
          className="form-card"
          style={{
            maxWidth: "950px",
            margin: "30px auto",
            padding: "35px",
          }}
        >

          {/* ================= HEADER ================= */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginBottom: "35px",
            }}
          >

            <div
              style={{
                width: "85px",
                height: "85px",
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg,#4f46e5,#9333ea)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "34px",
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              {form.name?.charAt(0)}
            </div>

            <div>

              <h1
                style={{
                  margin: 0,
                  fontSize: "30px",
                }}
              >
                {form.name}
              </h1>

              <p
                style={{
                  opacity: 0.7,
                  marginTop: "6px",
                }}
              >
                Student Account
              </p>

            </div>

          </div>

          {/* ================= FORM GRID ================= */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "1fr 1fr",
              gap: "22px",
            }}
          >

            <div>

              <label className="form-label">
                Full Name
              </label>

              <input
                className="form-input"
                name="name"
                value={form.name}
                onChange={handleChange}
              />

            </div>

            <div>

              <label className="form-label">
                Email
              </label>

              <input
                className="form-input"
                value={form.email}
                disabled
              />

            </div>

            <div>

              <label className="form-label">
                Roll No
              </label>

              <input
                className="form-input"
                value={form.rollNo}
                disabled
              />

            </div>

            <div>

              <label className="form-label">
                Branch
              </label>

              <input
                className="form-input"
                value={form.branch}
                disabled
              />

            </div>

            <div>

              <label className="form-label">
                Semester
              </label>

              <input
                className="form-input"
                value={form.semester}
                disabled
              />

            </div>

            <div>

              <label className="form-label">
                Assigned Mentor
              </label>

              <input
                className="form-input"
                value={
                  form.mentorName ||
                  "Not Assigned"
                }
                disabled
              />

            </div>

            {/* ================= FAMILY ================= */}

            <div>

              <label className="form-label">
                Father Name
              </label>

              <input
                className="form-input"
                name="fatherName"
                value={form.fatherName}
                onChange={handleChange}
              />

            </div>

            <div>

              <label className="form-label">
                Mother Name
              </label>

              <input
                className="form-input"
                name="motherName"
                value={form.motherName}
                onChange={handleChange}
              />

            </div>

            <div>

              <label className="form-label">
                Personal Phone
              </label>

              <input
                className="form-input"
                name="personalPhone"
                value={form.personalPhone}
                onChange={handleChange}
              />

            </div>

            <div>

              <label className="form-label">
                Parent Phone
              </label>

              <input
                className="form-input"
                name="parentPhone"
                value={form.parentPhone}
                onChange={handleChange}
              />

            </div>

            <div
              style={{
                gridColumn:
                  "1 / span 2",
              }}
            >

              <label className="form-label">
                Address
              </label>

              <textarea
                className="form-input"
                rows="3"
                name="address"
                value={form.address}
                onChange={handleChange}
              />

            </div>

          </div>

          {/* ================= PHONE VERIFY ================= */}

          <div
            style={{
              marginTop: "30px",
              padding: "22px",
              borderRadius: "18px",
              background:
                "rgba(255,255,255,0.04)",
              border:
                "1px solid rgba(255,255,255,0.08)",
            }}
          >

            <h3>
              📱 Phone Verification
            </h3>

            <p
              style={{
                marginTop: "12px",
              }}
            >

              Status:
              {" "}

              {verified ? (

                <span
                  className="badge badge-green"
                >
                  VERIFIED
                </span>

              ) : (

                <span
                  className="badge badge-red"
                >
                  NOT VERIFIED
                </span>

              )}

            </p>

            {!verified && (

              <div
                style={{
                  marginTop: "18px",
                }}
              >

                <button
                  className="submit-btn"
                  type="button"
                  onClick={sendOtp}
                >
                  Send OTP
                </button>

                {otpSent && (

                  <div
                    style={{
                      marginTop: "18px",
                    }}
                  >

                    <input
                      className="form-input"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) =>
                        setOtp(
                          e.target.value
                        )
                      }
                    />

                    <button
                      type="button"
                      className="submit-btn"
                      style={{
                        marginTop: "12px",
                      }}
                      onClick={verifyOtp}
                    >
                      Verify OTP
                    </button>

                  </div>

                )}

              </div>

            )}

          </div>

          {/* ================= SAVE BUTTON ================= */}

          <button
            type="submit"
            className="submit-btn"
            disabled={saving}
            style={{
              marginTop: "32px",
              width: "100%",
              height: "54px",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >

            {saving
              ? "Saving..."
              : "Save Changes"}

          </button>

        </div>

      </form>

    </StudentLayout>
  );
}