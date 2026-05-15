// src/data/CourseData.jsx
// B.Tech CSE course master (Tezpur University curriculum 2018, approx.)
// Now includes: credits + core/elective flag.
//
// core = true  -> compulsory / core / basic / HSS / project
// core = false -> electives (PEC / OEC)
//
// NOTE: If your department has slightly different credit numbers
// you can just adjust the `credits` field for that courseCode.

const KEY = "courses";

export const COURSES = [
  // ---------------- BASIC SCIENCE COURSES (BSC) ----------------
  { courseCode: "MS104", courseName: "Mathematics-I", semester: 1, category: "BSC", credits: 4, core: true },
  { courseCode: "PH103", courseName: "Physics-I", semester: 1, category: "BSC", credits: 3, core: true },
  { courseCode: "CH103", courseName: "Chemistry", semester: 1, category: "BSC", credits: 4, core: true },

  { courseCode: "PH104", courseName: "Physics-II", semester: 2, category: "BSC", credits: 2, core: true },
  { courseCode: "MS105", courseName: "Mathematics-II", semester: 2, category: "BSC", credits: 4, core: true },
  { courseCode: "CO105", courseName: "Discrete Mathematics", semester: 2, category: "BSC", credits: 4, core: true },

  { courseCode: "MS205", courseName: "Mathematics-III", semester: 3, category: "BSC", credits: 3, core: true },
  { courseCode: "BT201", courseName: "Biology", semester: 4, category: "BSC", credits: 3, core: true },

  // Environmental Science is mandatory non-credit in the curriculum
  { courseCode: "ES201", courseName: "Environmental Science", semester: 3, category: "BSC", credits: 0, core: true, nonCredit: true },

  // ---------------- HSS / MANAGEMENT (HSMC) ----------------
  { courseCode: "EF103", courseName: "Communicative English", semester: 1, category: "HSMC", credits: 3, core: true },
  { courseCode: "BA201", courseName: "Economics", semester: 3, category: "HSMC", credits: 3, core: true },
  { courseCode: "IC361", courseName: "Accounting and Financial Management", semester: 6, category: "HSMC", credits: 3, core: true },

  // Indian Constitution & Traditional Knowledge are shown as non-credit MC courses
  { courseCode: "LW301", courseName: "Indian Constitution", semester: 5, category: "HSMC", credits: 0, core: true, nonCredit: true },
  { courseCode: "CT430", courseName: "Essence of Indian Traditional Knowledge", semester: 7, category: "HSMC", credits: 0, core: true, nonCredit: true },

  // ---------------- ENGINEERING SCIENCE COURSES (ESC) ----------------
  { courseCode: "EE103", courseName: "Basic Electrical Engineering", semester: 1, category: "ESC", credits: 3, core: true },
  { courseCode: "EE104", courseName: "Basic Electrical Engineering Lab", semester: 1, category: "ESC", credits: 1, core: true },

  { courseCode: "EC102", courseName: "Basic Electronics", semester: 2, category: "ESC", credits: 4, core: true },
  { courseCode: "ME103", courseName: "Workshop Practice", semester: 2, category: "ESC", credits: 2, core: true },
  { courseCode: "CO103", courseName: "Introductory Computing", semester: 2, category: "ESC", credits: 3, core: true },
  { courseCode: "CO104", courseName: "Computing Laboratory", semester: 2, category: "ESC", credits: 2, core: true },
  { courseCode: "CE103", courseName: "Engineering Graphics and Design", semester: 2, category: "ESC", credits: 3, core: true },

  { courseCode: "EC205", courseName: "Signals and Systems", semester: 3, category: "ESC", credits: 3, core: true },
  { courseCode: "CO209", courseName: "Computing Workshop", semester: 3, category: "ESC", credits: 2, core: true },

  { courseCode: "CO218", courseName: "Data Communication", semester: 4, category: "ESC", credits: 3, core: true },

  // ---------------- PROFESSIONAL CORE COURSES (PCC) ----------------
  { courseCode: "CO202", courseName: "Digital Logic Design", semester: 3, category: "PCC", credits: 4, core: true },
  { courseCode: "CO210", courseName: "Data Structures", semester: 3, category: "PCC", credits: 4, core: true },
  { courseCode: "CO211", courseName: "Data Structures using Object Oriented Programming Lab", semester: 3, category: "PCC", credits: 3, core: true },

  { courseCode: "CO214", courseName: "Computer Architecture and Organization", semester: 4, category: "PCC", credits: 4, core: true },
  { courseCode: "CO215", courseName: "Computer Organization Lab", semester: 4, category: "PCC", credits: 1, core: true },
  { courseCode: "CO216", courseName: "Formal Languages and Automata", semester: 4, category: "PCC", credits: 3, core: true },
  { courseCode: "CO206", courseName: "Design and Analysis of Algorithms", semester: 4, category: "PCC", credits: 4, core: true },
  { courseCode: "CO217", courseName: "Graph Theory", semester: 4, category: "PCC", credits: 3, core: true },

  { courseCode: "CO309", courseName: "Operating Systems", semester: 5, category: "PCC", credits: 3, core: true },
  { courseCode: "CO310", courseName: "Operating Systems Lab", semester: 5, category: "PCC", credits: 2, core: true },
  { courseCode: "CO312", courseName: "Database Systems", semester: 5, category: "PCC", credits: 3, core: true },
  { courseCode: "CO313", courseName: "Database Systems Lab", semester: 5, category: "PCC", credits: 2, core: true },
  { courseCode: "CO303", courseName: "Computer Graphics", semester: 5, category: "PCC", credits: 3, core: true },
  { courseCode: "CO311", courseName: "Software Engineering", semester: 5, category: "PCC", credits: 3, core: true },

  { courseCode: "CO314", courseName: "System Software and Compiler Design", semester: 6, category: "PCC", credits: 4, core: true },
  { courseCode: "CO315", courseName: "Computer Networks", semester: 6, category: "PCC", credits: 3, core: true },
  { courseCode: "CO316", courseName: "Computer Networks Lab", semester: 6, category: "PCC", credits: 1, core: true },
  { courseCode: "CO317", courseName: "Project-I (SE Perspective)", semester: 6, category: "PCC", credits: 2, core: true },

  { courseCode: "CO401", courseName: "Artificial Intelligence", semester: 7, category: "PCC", credits: 3, core: true },
  { courseCode: "CO402", courseName: "Project-II", semester: 7, category: "PCC", credits: 4, core: true },
  { courseCode: "CO403", courseName: "Project-III", semester: 8, category: "PCC", credits: 8, core: true },

  // ---------------- OPEN ELECTIVES (OEC) ----------------
  { courseCode: "OEC01", courseName: "Open Elective-I", semester: 5, category: "OEC", credits: 3, core: false },
  { courseCode: "OEC02", courseName: "Open Elective-II", semester: 6, category: "OEC", credits: 3, core: false },
  { courseCode: "OEC03", courseName: "Open Elective-III", semester: 7, category: "OEC", credits: 3, core: false },
  { courseCode: "OEC04", courseName: "Open Elective-IV", semester: 8, category: "OEC", credits: 3, core: false },

  // ---------------- PROFESSIONAL ELECTIVES SLOTS (generic) ----------------
  // These represent "slot" choices PEC01–05 in the structure (each is filled by one of the PEC courses below).
  { courseCode: "PEC01", courseName: "Professional Elective-I", semester: 5, category: "PEC", credits: 3, core: false },
  { courseCode: "PEC02", courseName: "Professional Elective-II", semester: 6, category: "PEC", credits: 3, core: false },
  { courseCode: "PEC03", courseName: "Professional Elective-III", semester: 7, category: "PEC", credits: 3, core: false },
  { courseCode: "PEC04", courseName: "Professional Elective-IV", semester: 7, category: "PEC", credits: 3, core: false },
  { courseCode: "PEC05", courseName: "Professional Elective-V", semester: 8, category: "PEC", credits: 3, core: false },

  // ---------------- PROFESSIONAL ELECTIVE COURSES (PEC) ----------------
  // All of these are listed as 3-0-0 : 3 Credits in the curriculum.
  { courseCode: "CO304", courseName: "Principles of Programming Languages", semester: 5, category: "PEC", credits: 3, core: false },
  { courseCode: "CO318", courseName: "Cryptography", semester: 5, category: "PEC", credits: 3, core: false },

  { courseCode: "CO432", courseName: "Information Theory and Coding", semester: 6, category: "PEC", credits: 3, core: false },
  { courseCode: "CO319", courseName: "Statistical Modelling and Applications", semester: 6, category: "PEC", credits: 3, core: false },
  { courseCode: "CO423", courseName: "Web Technology", semester: 6, category: "PEC", credits: 3, core: false },
  { courseCode: "CO306", courseName: "Embedded Systems", semester: 6, category: "PEC", credits: 3, core: false },
  { courseCode: "CO426", courseName: "Advanced Computer Architecture", semester: 6, category: "PEC", credits: 3, core: false },
  { courseCode: "CO422", courseName: "Theory of Computation", semester: 6, category: "PEC", credits: 3, core: false },
  { courseCode: "CO406", courseName: "Distributed Systems", semester: 6, category: "PEC", credits: 3, core: false },

  { courseCode: "CO509", courseName: "Computer Vision & Image Processing", semester: 7, category: "PEC", credits: 3, core: false },
  { courseCode: "CO512", courseName: "Parallel Programming", semester: 7, category: "PEC", credits: 3, core: false },
  { courseCode: "CO513", courseName: "Fundamentals of Speech Processing", semester: 7, category: "PEC", credits: 3, core: false },
  { courseCode: "CO514", courseName: "Machine Learning", semester: 7, category: "PEC", credits: 3, core: false },
  { courseCode: "CO515", courseName: "Knowledge Representation and Reasoning", semester: 7, category: "PEC", credits: 3, core: false },
  { courseCode: "CO516", courseName: "Advanced Algorithms", semester: 7, category: "PEC", credits: 3, core: false },
  { courseCode: "CO517", courseName: "Virtual and Augmented Reality", semester: 7, category: "PEC", credits: 3, core: false },
  { courseCode: "CO518", courseName: "Cloud Computing", semester: 7, category: "PEC", credits: 3, core: false },
  { courseCode: "CO504", courseName: "Natural Language Processing", semester: 7, category: "PEC", credits: 3, core: false },
  { courseCode: "CO519", courseName: "Internet of Things", semester: 7, category: "PEC", credits: 3, core: false },
  { courseCode: "CO520", courseName: "Software Defined Networking and NFV", semester: 7, category: "PEC", credits: 3, core: false },
  { courseCode: "CO521", courseName: "Computational Geometry", semester: 7, category: "PEC", credits: 3, core: false },
  { courseCode: "CO522", courseName: "Bioinformatics", semester: 7, category: "PEC", credits: 3, core: false },
  { courseCode: "CO523", courseName: "Quantum Computing", semester: 7, category: "PEC", credits: 3, core: false },
  { courseCode: "CO524", courseName: "Linear Optimization", semester: 7, category: "PEC", credits: 3, core: false },
  { courseCode: "CO505", courseName: "Advanced Database Management System", semester: 7, category: "PEC", credits: 3, core: false },
  { courseCode: "CO503", courseName: "Fuzzy Logic and Neural Networks", semester: 7, category: "PEC", credits: 3, core: false },
  { courseCode: "CO435", courseName: "Mobile Computing", semester: 7, category: "PEC", credits: 3, core: false },
  { courseCode: "CO525", courseName: "Data Mining", semester: 7, category: "PEC", credits: 3, core: false },
  { courseCode: "CO526", courseName: "Operations Research", semester: 7, category: "PEC", credits: 3, core: false },
];

export function loadCourses() {
  const saved = localStorage.getItem(KEY);
  if (saved) return JSON.parse(saved);
  localStorage.setItem(KEY, JSON.stringify(COURSES));
  return COURSES;
}

export function saveCourses(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export default COURSES;
