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

export default function HodUploadStudents() {

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

  const uploadToBackend =
    async (rows) => {

      try {

        const res =
          await fetch(
            "http://localhost:5000/api/admin/upload-students",
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
          `✅ ${data.created} students added, ${data.skipped} skipped`
        );

      } catch {

        setStatus("error");

        setMessage(
          "❌ Upload failed"
        );

      }

    };

  const handleFileUpload =
    async (e) => {

      const file =
        e.target.files[0];

      if (!file) return;

      const ext =
        file.name
          .split(".")
          .pop()
          .toLowerCase();

      let rows = [];

      if (ext === "csv") {

        const text =
          await file.text();

        const lines =
          text
            .split("\n")
            .filter(Boolean);

        const headers =
          lines[0]
            .split(",")
            .map((h) =>
              h.trim()
            );

        rows = lines
          .slice(1)
          .map((line) => {

            const values =
              line
                .split(",")
                .map((v) =>
                  v.trim()
                );

            const obj = {};

            headers.forEach(
              (h, i) =>
                (obj[h] =
                  values[i])
            );

            return obj;

          });

        await uploadToBackend(
          rows
        );

      }

      else if (
        ext === "xlsx"
      ) {

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

            rows =
              XLSX.utils.sheet_to_json(
                sheet
              );

            await uploadToBackend(
              rows
            );

          };

        reader.readAsBinaryString(
          file
        );

      }

    };

  return (
    <HodLayout>

      <div className="top-navbar">

        <div>

          <h2 className="welcome-title">
            Student Master Upload
          </h2>

          <p className="welcome-sub">
            Upload student records through CSV or Excel
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
            name, email, rollNo, branch, semester
          </code>

        </div>

        <label className="upload-dropzone">

          <input
            type="file"
            accept=".csv,.xlsx"
            onChange={
              handleFileUpload
            }
          />

          📤 Upload CSV / Excel File

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