import "../../styles/dashboard.css";

export default function SemesterComparison({ results }) {
  // Collect all unique course codes
  const courses = Array.from(
    new Set(
      results.flatMap((r) => r.subjects.map((s) => s.courseCode))
    )
  );

  const getGrade = (semester, code) => {
    const sem = results.find((r) => r.semester === semester);
    const subj = sem?.subjects.find((s) => s.courseCode === code);
    return subj?.grade || "-";
  };

  return (
    <div className="comparison-card">
      <h2>Semester Comparison</h2>

      <table className="data-table">
        <thead>
          <tr>
            <th>Course</th>
            {results.map((r) => (
              <th key={r.semester}>Sem {r.semester}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {courses.map((code) => (
            <tr key={code}>
              <td>{code}</td>
              {results.map((r) => (
                <td key={r.semester}>
                  {getGrade(r.semester, code)}
                </td>
              ))}
            </tr>
          ))}

          {/* SGPA */}
          <tr className="summary-row">
            <td>SGPA</td>
            {results.map((r) => (
              <td key={r.semester}>{r.sgpa}</td>
            ))}
          </tr>

          {/* CGPA */}
          <tr className="summary-row">
            <td>CGPA</td>
            {results.map((r) => (
              <td key={r.semester}>{r.cgpa}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
