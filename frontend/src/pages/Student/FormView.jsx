import "../../styles/formview.css";
import "../../styles/dashboard.css";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import StudentLayout from "../../layouts/StudentLayout";

export default function FormView() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [schema, setSchema] =
    useState(null);

  const [formState, setFormState] =
    useState({});

  const [message, setMessage] =
    useState("");

  useEffect(() => {

    const forms = JSON.parse(
      localStorage.getItem("forms") || "[]"
    );

    const f = forms.find(
      (x) => x.id === id
    );

    setSchema(f || null);

  }, [id]);

  const handleChange = (
    name,
    value
  ) => {

    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    for (const field of (
      schema?.fields || []
    )) {

      if (
        field.required &&
        !formState[field.name]
      ) {
        alert(
          `Please fill ${field.label}`
        );

        return;
      }

    }

    const submissions = JSON.parse(
      localStorage.getItem(
        "submissions"
      ) || "[]"
    );

    submissions.push({
      id: `sub_${Date.now()}`,
      formId: schema.id,
      data: formState,
      status: "submitted",
      createdAt:
        new Date().toISOString(),
    });

    localStorage.setItem(
      "submissions",
      JSON.stringify(submissions)
    );

    setMessage(
      "✅ Submitted successfully"
    );

    setTimeout(() => {
      navigate("/student/submissions");
    }, 1200);

  };

  if (!schema) {
    return (
      <StudentLayout>
        <div className="empty-row">
          Form not found.
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>

      <div className="top-navbar">

        <div>
          <h2 className="welcome-title">
            {schema.title}
          </h2>

          <p className="welcome-sub">
            Fill and submit the requested details
          </p>
        </div>

      </div>

      <div
        className="formview-container"
        style={{
          marginTop: "24px",
        }}
      >

        <div
          style={{
            marginBottom: "18px",
            opacity: 0.8,
          }}
        >
          {schema.description}
        </div>

        {message && (
          <div className="success-box">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {schema.fields.map((f) => (

            <div
              className="form-field"
              key={f.name}
            >

              <label className="form-label">
                {f.label}
                {f.required && " *"}
              </label>

              {f.type === "text" && (
                <input
                  className="form-input"
                  value={
                    formState[f.name] || ""
                  }
                  onChange={(e) =>
                    handleChange(
                      f.name,
                      e.target.value
                    )
                  }
                />
              )}

              {f.type === "textarea" && (
                <textarea
                  className="form-textarea"
                  rows={4}
                  value={
                    formState[f.name] || ""
                  }
                  onChange={(e) =>
                    handleChange(
                      f.name,
                      e.target.value
                    )
                  }
                />
              )}

              {f.type === "select" && (
                <select
                  className="form-select"
                  value={
                    formState[f.name] || ""
                  }
                  onChange={(e) =>
                    handleChange(
                      f.name,
                      e.target.value
                    )
                  }
                >

                  <option value="">
                    Select
                  </option>

                  {(f.options || []).map(
                    (opt) => (
                      <option
                        key={opt}
                        value={opt}
                      >
                        {opt}
                      </option>
                    )
                  )}

                </select>
              )}

              {f.type === "file" && (
                <input
                  type="file"
                  className="form-file"
                  onChange={(e) =>
                    handleChange(
                      f.name,
                      e.target.files[0]
                        ?.name || ""
                    )
                  }
                />
              )}

            </div>

          ))}

          <div
            className="form-actions"
            style={{
              marginTop: "30px",
            }}
          >

            <button
              className="btn-primary"
              type="submit"
            >
              Submit Form
            </button>

            <button
              type="button"
              className="btn-secondary"
              onClick={() =>
                window.history.back()
              }
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </StudentLayout>
  );
}