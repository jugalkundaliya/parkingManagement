import React from "react";
import authService from "../../services/authService";
import { Navigate } from "react-router-dom";

function Logout(props) {
  authService.logout();
  return <Navigate to={"/login"} />;
}

export default Logout;
