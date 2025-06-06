import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, getUser } from "../../utils/auth";
import { ToastContext } from "../../context/ToastContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = getUser();

  const { notify } = useContext(ToastContext);

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    notify("You do not have permission to access this page.", "error");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
