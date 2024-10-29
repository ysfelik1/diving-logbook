import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  console.log("ProtectedRoute user:", user);

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
