import React from "react";
import authService from "../services/authService";
import { Navigate } from "react-router-dom";

function ProtectedRoute(props) {
  const user = authService.getCurrentUser();
  if (user) return props.element;
  else return <Navigate to="/login" />;
}

export default ProtectedRoute;
