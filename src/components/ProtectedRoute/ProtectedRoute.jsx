import { Navigate } from "react-router-dom";
import { isAuthenticated, getUser } from "../utils/auth";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = getUser();

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
