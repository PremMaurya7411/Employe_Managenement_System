import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const token = localStorage.getItem("token");

  // Wait for auth state to load before checking authentication
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-lg">Loading...</div>
    </div>;
  }

  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;


