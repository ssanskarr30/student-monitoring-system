export const calculateAcademicStatus = (
  user,
  cgpa,
  backlogCount
) => {

  const currentYear =
    new Date().getFullYear();

  const yearsCompleted =
    currentYear -
    (user.admissionYear || currentYear);

  let academicStatus = "normal";

  /* =========================================
     CGPA + BACKLOG CHECK
  ========================================= */

  if (
    cgpa < 6 ||
    backlogCount >= 4
  ) {
    academicStatus = "warning";
  }

  if (
    cgpa < 5 ||
    backlogCount >= 6
  ) {
    academicStatus = "critical";
  }

  /* =========================================
     PROGRAM DURATION CHECK
  ========================================= */

  if (user.program === "BTech") {

    if (yearsCompleted > 4) {
      academicStatus = "warning";
    }

    if (yearsCompleted > 6) {
      academicStatus = "critical";
    }

  }

  if (user.program === "MTech") {

    if (yearsCompleted > 2) {
      academicStatus = "warning";
    }

    if (yearsCompleted > 4) {
      academicStatus = "critical";
    }

  }

  return {
    academicStatus,
    yearsCompleted,
  };
};