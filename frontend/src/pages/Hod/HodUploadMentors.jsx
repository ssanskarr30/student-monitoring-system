import "../../styles/dashboard.css";

import {
  useContext,
  useState,
} from "react";

import { AuthContext }
from "../../context/AuthContext";

import * as XLSX
from "xlsx";

import HodLayout
from "../../layouts/HodLayout";

export default function HodUploadMentors() {

  const { user } =
    useContext(AuthContext);

  const [message,
    setMessage] =
      useState("");

  const [status,
    setStatus] =
      useState("");

  if (user?.role !== "hod") {

    return (
      <div className="empty-row">
        Access denied.
      </div>
    );

  }

  const handleFileUpload =
    async (e) => {

      const file =
        e.target.files[0];

      if (!file) return;

      const reader =
        new FileReader();

      reader.onload =
        async (evt) => {

          const workbook =
            XLSX.read(
              evt.target.result,
              {
                type: "binary",
              }
            );

          const sheet =
            workbook.Sheets[
              workbook
                .SheetNames[0]
            ];

          const rows =
            XLSX.utils.sheet_to_json(
              sheet
            );

          if (
            !Array.isArray(rows) ||
            rows.length === 0
          ) {

            setStatus("error");

            setMessage(
              "❌ Invalid or empty Excel file"
            );

            return;
          }

          try {

            const res =
              await fetch(
                "http://localhost:5000/api/admin/upload-mentor-assignments",
                {
                  method: "POST",

                  headers: {
                    "Content-Type":
                      "application/json",
                  },

                  body: JSON.stringify(
                    rows
                  ),
                }
              );

            const data =
              await res.json();

            setStatus(
              "success"
            );

            setMessage(
              `✅ Mentors Created: ${data.mentorsCreated}, Students Assigned: ${data.studentsUpdated}`
            );

          } catch {

            setStatus("error");

            setMessage(
              "❌ Mentor upload failed"
            );

          }

        };

      reader.readAsBinaryString(
        file
      );

    };

  return (
    <HodLayout>

      <div className="top-navbar">

        <div>

          <h2 className="welcome-title">
            Upload Mentor Assignments
          </h2>

          <p className="welcome-sub">
            Upload mentors and assign students in bulk
          </p>

        </div>

      </div>

      <div
        className="upload-container"
        style={{
          marginTop: "28px",
        }}
      >

        <div className="upload-format">

          <h4>
            Required Columns
          </h4>

          <code>
            Mentor Name | Mentor Email | Student Roll No
          </code>

        </div>

        <label className="upload-dropzone">

          <input
            type="file"
            accept=".xlsx"
            onChange={
              handleFileUpload
            }
          />

          📤 Upload Mentor Assignment Excel

        </label>

        {message && (

          <div
            className={`upload-alert ${status}`}
          >
            {message}
          </div>

        )}

      </div>

    </HodLayout>
  );
}