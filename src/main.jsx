import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import "./index.scss";
import App from "./App.jsx";
import { ToastProvider } from "./context/ToastContext";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <ToastProvider>
        <App />
        <ToastContainer autoClose={3000} position="top-right" />
      </ToastProvider>
    </Router>
  </Provider>
);
