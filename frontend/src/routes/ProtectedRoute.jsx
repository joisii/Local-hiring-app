import { useContext } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext }
from "../context/AuthContext";

function ProtectedRoute({
  children,
  allowedRole
}) {

  const {
    token,
    user,
    loading
  } = useContext(AuthContext);

  // wait until auth check finishes
  if (loading) {
    return <p>Loading...</p>;
  }

  // no token
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // no user
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // role mismatch
  if (
    allowedRole &&
    user.role !== allowedRole
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;