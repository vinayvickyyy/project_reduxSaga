import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function PrivateRoute(props) {
    const hasToken = localStorage.getItem("token");
    let location = useLocation();
  
    if (!hasToken) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  
    return props.children;
}

export default PrivateRoute;