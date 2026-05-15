// src/components/CourseSearch.jsx
import { useState, useEffect } from "react";
import { loadCourses } from "../data/CourseData";

export default function CourseSearch({ onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const list = loadCourses();
    setCourses(list);
  }, []);

  const handleSearch = (text) => {
    setQuery(text);

    if (text.trim().length < 2) {
      setResults([]);
      return;
    }

    const filtered = courses.filter(
      (c) =>
        c.courseCode.toLowerCase().includes(text.toLowerCase()) ||
        c.courseName.toLowerCase().includes(text.toLowerCase())
    );

    setResults(filtered.slice(0, 10)); // limit suggestions
  };

  return (
    <div className="course-search">
      <input
        className="form-input"
        placeholder="Search by course code or name"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
      />

      {results.length > 0 && (
        <ul className="search-list">
          {results.map((c) => (
            <li
              key={c.courseCode}
              className="search-item"
              onClick={() => {
                onSelect(c);
                setQuery(`${c.courseCode} - ${c.courseName}`);
                setResults([]);
              }}
            >
              {c.courseCode} – {c.courseName} (Sem {c.semester})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
