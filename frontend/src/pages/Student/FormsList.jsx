import "../../styles/forms.css";
import "../../styles/dashboard.css";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import StudentLayout from "../../layouts/StudentLayout";

export default function FormsList() {

  const [forms, setForms] = useState([]);

  useEffect(() => {

    const existing = JSON.parse(
      localStorage.getItem("forms") || "null"
    );

    if (existing) {
      setForms(existing);
    } else {

      const sample = [
        {
          id: "g1",

          title:
            "Semester Grade Sheet Request",

          description:
            "Upload your semester grade sheet for verification.",

          fields: [
            {
              name: "semester",
              label: "Semester",
              type: "select",
              options: [
                "1","2","3","4",
                "5","6","7","8"
              ],
              required: true,
            },

            {
              name: "reason",
              label: "Reason",
              type: "textarea",
              required: true,
            },

            {
              name: "file",
              label: "Upload File",
              type: "file",
              required: true,
            },
          ],
        },
      ];

      localStorage.setItem(
        "forms",
        JSON.stringify(sample)
      );

      setForms(sample);
    }

  }, []);

  return (
    <StudentLayout>

      <div className="top-navbar">

        <div>
          <h2 className="welcome-title">
            Available Forms
          </h2>

          <p className="welcome-sub">
            Fill academic and administrative requests
          </p>
        </div>

      </div>

      <div
        className="forms-container"
        style={{
          padding: "30px 10px",
        }}
      >

        {forms.length === 0 ? (

          <div className="empty-list">
            No forms published yet.
          </div>

        ) : (

          forms.map((f) => (

            <div
              className="form-card"
              key={f.id}
              style={{
                padding: "28px",
                borderRadius: "18px",
                marginBottom: "24px",
              }}
            >

              <div className="form-meta">

                <div>

                  <div className="form-title">
                    {f.title}
                  </div>

                  <div className="form-desc">
                    {f.description}
                  </div>

                </div>

              </div>

              <div
                className="form-actions"
                style={{
                  marginTop: "22px",
                }}
              >

                <Link to={`/student/form/${f.id}`}>
                  <button className="btn-primary">
                    Fill Form
                  </button>
                </Link>

                <button
                  className="btn-secondary"
                  onClick={() =>
                    alert(
                      "Preview feature coming soon"
                    )
                  }
                >
                  Preview
                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </StudentLayout>
  );
}