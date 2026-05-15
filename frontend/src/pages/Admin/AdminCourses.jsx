import "../../styles/dashboard.css";
import { useState, useEffect } from "react";
import { loadCourses, saveCourses } from "../../data/CourseData";

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    courseCode: "",
    courseName: "",
    semester: "",
    category: "",
  });

  useEffect(() => {
    setCourses(loadCourses());
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addCourse = () => {
    if (!form.courseCode || !form.courseName) return;

    const newCourse = {
      courseCode: form.courseCode.toUpperCase().trim(),
      courseName: form.courseName.trim(),
      semester: Number(form.semester) || null,
      category: form.category || "",
    };

    const updated = [
      ...courses.filter((c) => c.courseCode !== newCourse.courseCode),
      newCourse,
    ].sort((a, b) => a.courseCode.localeCompare(b.courseCode));

    setCourses(updated);
    saveCourses(updated);

    setForm({ courseCode: "", courseName: "", semester: "", category: "" });
  };

  const deleteCourse = (code) => {
    const updated = courses.filter((c) => c.courseCode !== code);
    setCourses(updated);
    saveCourses(updated);
  };

  return (
    <div className="main-section">
      <h1 className="page-title">Manage Courses</h1>

      <div className="card" style={{ marginBottom: "24px" }}>
        <h3>Add / Update Course</h3>

        <div className="form-row">
          <input
            className="form-input"
            placeholder="Course Code (e.g., CO210)"
            name="courseCode"
            value={form.courseCode}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <input
            className="form-input"
            placeholder="Course Name"
            name="courseName"
            value={form.courseName}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <input
            className="form-input"
            placeholder="Semester"
            name="semester"
            type="number"
            min="1"
            max="8"
            value={form.semester}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <input
            className="form-input"
            placeholder="Category (BSC / ESC / PCC / PEC / OEC)"
            name="category"
            value={form.category}
            onChange={handleChange}
          />
        </div>

        <button className="submit-btn" onClick={addCourse}>
          Save Course
        </button>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Sem</th>
            <th>Category</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {courses.map((c) => (
            <tr key={c.courseCode}>
              <td>{c.courseCode}</td>
              <td>{c.courseName}</td>
              <td>{c.semester}</td>
              <td>{c.category}</td>
              <td>
                <button
                  className="small-danger-btn"
                  onClick={() => deleteCourse(c.courseCode)}
                >
                  ✖
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
