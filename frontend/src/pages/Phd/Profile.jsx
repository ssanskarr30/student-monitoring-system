import "../../styles/dashboard.css";

import {
  useContext,
  useState,
  useEffect,
} from "react";

import { AuthContext }
from "../../context/AuthContext";

import PhdLayout
from "../../layouts/PhdLayout";

export default function Profile() {

  const {
    user,
    refreshUser,
  } = useContext(AuthContext);

  const [form, setForm] =
    useState(null);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {

    if (!user) return;

    setForm({

      name:
        user.name || "",

      researchArea:
        user.researchArea || "",

      researchTopic:
        user.researchTopic || "",

      publications:
        user.publications || 0,

      personalPhone:
        user.personalPhone || "",

      address:
        user.address || "",

    });

  }, [user]);

  const handleChange = (e) => {

    setForm({
      ...form,

      [e.target.name]:
        e.target.value,
    });

  };

  const handleSave =
    async (e) => {

      e.preventDefault();

      try {

        setSaving(true);

        const res =
          await fetch(
            `http://localhost:5000/api/auth/user-by-email/${user.email}`,
            {
              method: "PUT",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify(
                form
              ),
            }
          );

        if (!res.ok)
          throw new Error();

        await refreshUser();

        alert(
          "Profile updated successfully"
        );

      } catch {

        alert(
          "Failed to update profile"
        );

      } finally {

        setSaving(false);

      }

    };

  if (!form) return null;

  return (
    <PhdLayout>

      <h1 className="page-title">
        👤 PhD Profile
      </h1>

      <form
        className="dashboard-card"
        onSubmit={handleSave}
      >

        <div className="input-group">

          <label>
            Full Name
          </label>

          <input
            className="form-input"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

        </div>

        <div className="input-group">

          <label>
            Research Area
          </label>

          <input
            className="form-input"
            name="researchArea"
            value={
              form.researchArea
            }
            onChange={handleChange}
          />

        </div>

        <div className="input-group">

          <label>
            Research Topic
          </label>

          <input
            className="form-input"
            name="researchTopic"
            value={
              form.researchTopic
            }
            onChange={handleChange}
          />

        </div>

        <div className="input-group">

          <label>
            Publications
          </label>

          <input
            type="number"
            className="form-input"
            name="publications"
            value={
              form.publications
            }
            onChange={handleChange}
          />

        </div>

        <div className="input-group">

          <label>
            Personal Phone
          </label>

          <input
            className="form-input"
            name="personalPhone"
            value={
              form.personalPhone
            }
            onChange={handleChange}
          />

        </div>

        <div className="input-group">

          <label>
            Address
          </label>

          <textarea
            className="form-input"
            rows="4"
            name="address"
            value={
              form.address
            }
            onChange={handleChange}
          />

        </div>

        <button
          className="submit-btn"
          disabled={saving}
        >

          {saving
            ? "Saving..."
            : "Save Changes"}

        </button>

      </form>

    </PhdLayout>
  );

}