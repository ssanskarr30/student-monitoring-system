import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";

/* ---------------------------------------
   AUTH
---------------------------------------- */
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";
import ChangePassword from "./pages/Auth/ChangePassword";


/* ---------------------------------------
   STUDENT
---------------------------------------- */
import StudentDashboard from "./pages/Student/StudentDashboard";
import Profile from "./pages/Student/Profile";
import FormsList from "./pages/Student/FormsList";
import FormView from "./pages/Student/FormView";
import Submissions from "./pages/Student/Submissions";
import StudentUploadMarks from "./pages/Student/StudentUploadMarks";
import StudentMessages from "./pages/Student/Messages";
import StudentMeetingForm from "./pages/Student/StudentMeetingForm";
import StudentMeetings from "./pages/Student/Meetings";
import Notifications from "./pages/Student/Notifications";

/* ---------------------------------------
   MENTOR
---------------------------------------- */
import MentorDashboard from "./pages/Mentor/MentorDashboard";
import MentorStudents from "./pages/Mentor/Students";
import MentorMessages from "./pages/Mentor/MentorMessages";
import MentorStudentProfile from "./pages/Mentor/MentorStudentProfile";
import MentorSemesterResults from "./pages/Mentor/MentorSemesterResults";
import MentorMeetingHistory from "./pages/Mentor/MentorMeetingHistory";
import MentorMeetingRequests from "./pages/Mentor/MentorMeetingRequests";

/* ---------------------------------------
   HOD
---------------------------------------- */
import HodDashboard from "./pages/Hod/HodDashboard";
import AssignMentor from "./pages/Hod/AssignMentor";
import HodUploadStudents from "./pages/Hod/HodUploadStudents";
import HodUploadMentors from "./pages/Hod/HodUploadMentors";

/* ---------------------------------------
   ADMIN
---------------------------------------- */
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ManageUsers from "./pages/Admin/Users";
import AdminCourses from "./pages/Admin/AdminCourses";
import CreateUser from "./pages/Admin/CreateUser";


import PhdDashboard from "./pages/Phd/PhdDashboard";

/* ---------------------------------------
   PROTECTED ROUTE
---------------------------------------- */
function ProtectedRoute({ children, allowed }) {
  const { user, loading } = React.useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  if (!allowed.includes(user.role)) return <Navigate to="/login" replace />;

  return children;
}

/* ---------------------------------------
   MAIN ROUTER
---------------------------------------- */
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/change-password" element={<ChangePassword />} />

          {/* ========================================
               STUDENT ROUTES
          ========================================= */}
          <Route
            path="/student"
            element={
              <ProtectedRoute allowed={["student"]}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/profile"
            element={
              <ProtectedRoute allowed={["student"]}>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/forms"
            element={
              <ProtectedRoute allowed={["student"]}>
                <FormsList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/form/:id"
            element={
              <ProtectedRoute allowed={["student"]}>
                <FormView />
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/submissions"
            element={
              <ProtectedRoute allowed={["student"]}>
                <Submissions />
              </ProtectedRoute>
            }
          />

          {/* NOTE: path matches your existing links (/student/studentuploadmarks) */}
          <Route
            path="/student/upload-marks"
            element={
              <ProtectedRoute allowed={["student"]}>
                <StudentUploadMarks />
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/messages"
            element={
              <ProtectedRoute allowed={["student"]}>
                <StudentMessages />
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/meeting-request"
            element={
              <ProtectedRoute allowed={["student"]}>
                <StudentMeetingForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/meetings"
            element={
              <ProtectedRoute allowed={["student"]}>
                <StudentMeetings />
              </ProtectedRoute>
            }
          />

          <Route
  path="/student/notifications"
  element={
    <ProtectedRoute allowed={["student"]}>
      <Notifications />
    </ProtectedRoute>
  }
/>

          {/* ========================================
               MENTOR ROUTES
          ========================================= */}
          <Route
            path="/mentor"
            element={
              <ProtectedRoute allowed={["mentor"]}>
                <MentorDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/mentor/students"
            element={
              <ProtectedRoute allowed={["mentor"]}>
                <MentorStudents />
              </ProtectedRoute>
            }
          />

          <Route
            path="/mentor/messages"
            element={
              <ProtectedRoute allowed={["mentor"]}>
                <MentorMessages />
              </ProtectedRoute>
            }
          />

<Route
  path="/mentor/requests"
  element={
    <ProtectedRoute allowed={["mentor"]}>
      <MentorMeetingRequests />
    </ProtectedRoute>
  }
/>

          <Route
            path="/mentor/student/:id"
            element={
              <ProtectedRoute allowed={["mentor"]}>
                <MentorStudentProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/mentor/semester-results"
            element={
              <ProtectedRoute allowed={["mentor"]}>
                <MentorSemesterResults />
              </ProtectedRoute>
            }
          />

          <Route
            path="/mentor/meeting-history"
            element={
              <ProtectedRoute allowed={["mentor"]}>
                <MentorMeetingHistory />
              </ProtectedRoute>
            }
          />

          {/* ========================================
               HOD ROUTES
          ========================================= */}
          <Route
            path="/hod"
            element={
              <ProtectedRoute allowed={["hod"]}>
                <HodDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/hod/assign-mentor"
            element={
              <ProtectedRoute allowed={["hod"]}>
                <AssignMentor />
              </ProtectedRoute>
            }
          />

          <Route
            path="/hod/upload-students"
            element={
              <ProtectedRoute allowed={["hod"]}>
                <HodUploadStudents />
              </ProtectedRoute>
            }
          />

            <Route
            path="/hod/upload-mentors"
            element={
              <ProtectedRoute allowed={["hod"]}>
                <HodUploadMentors />
              </ProtectedRoute>
            }
          />

      
          {/* ========================================
               ADMIN ROUTES
          ========================================= */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowed={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <ProtectedRoute allowed={["admin"]}>
                <ManageUsers />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/courses"
            element={
              <ProtectedRoute allowed={["admin"]}>
                <AdminCourses />
              </ProtectedRoute>
            }
          />

          <Route
  path="/phd"
  element={
    <ProtectedRoute allowed={["student"]}>
      <PhdDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/create-user"
  element={
    <ProtectedRoute allowed={["admin"]}>
      <CreateUser />
    </ProtectedRoute>
  }
/>


          {/* FALLBACK */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
