import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Authcontext } from "../context/AuthContext";

function ProtectedRoute({ children, allowedRole }) {
  const { token, user } = useContext(Authcontext);

  // no token → login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // no user
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // role mismatch
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;