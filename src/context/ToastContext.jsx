import { createContext } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastContext = createContext();

const ToastProvider = ({ children }) => {
  const notify = (message, type = "info") => {
    return new Promise((resolve) => {
      toast[type](message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose: resolve,
      });
    });
  };

  return (
    <ToastContext.Provider value={{ notify }}>{children}</ToastContext.Provider>
  );
};

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ToastProvider, ToastContext };
