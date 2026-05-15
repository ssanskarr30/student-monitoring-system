import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useContext(AuthContext);

  // ⏳ wait till auth loads
  if (loading) return null; // or a loader

  // 🔒 not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 🔒 role mismatch
  if (role && user.role !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
}