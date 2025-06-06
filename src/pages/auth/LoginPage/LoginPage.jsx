import "./LoginPage.scss";
import { useState, useContext } from "react";
import { FaSpotify } from "react-icons/fa";
import { validationLogin } from "../../../validations/validations";
import { useDispatch } from "react-redux";
import { login } from "../../../store/Actions/authActions";
import { ToastContext } from "../../../context/ToastContext";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const { notify } = useContext(ToastContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Validate input on change
    const validation = validationLogin({ ...formData, [name]: value });
    if (!validation.valid) {
      setErrors((prev) => ({ ...prev, [name]: validation.errors[name] }));
    }
    // Clear error for the current field if valid
    if (validation.valid) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    // Update form data
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the entire form on submit
    const validation = validationLogin(formData);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    // Dispatch the login action
    dispatch(login(formData))
      .then(() => {
        notify("Login successful!", "success");

        // Empty the form after successful login
        setFormData({
          email: "",
          password: "",
        });

        // Optionally, redirect based on user role
        const user = JSON.parse(localStorage.getItem("user"));
        const roleRedirectMap = {
          ADMIN: "/admin",
          ARTIST: "/artist",
          LISTENER: "/account",
        };

        const role = user.role?.toUpperCase();
        navigate(roleRedirectMap[role] || "/");
      })
      .catch((error) => {
        notify(error.message || "Invalid Email Or Password", "error");
      });
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <FaSpotify className="logo" />
        <h1>GrooveNest</h1>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Log in to GrooveNest</h2>

        <div className="social-login">
          <button type="button" className="social-btn facebook">
            Continue with Facebook
          </button>
          <button type="button" className="social-btn google">
            Continue with Google
          </button>
          <button type="button" className="social-btn apple">
            Continue with Apple
          </button>
        </div>

        <div className="divider">
          <span>or</span>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
          />

          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <div className="remember-me">
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">Remember me</label>
        </div>

        <button type="submit" className="login-btn">
          Log In
        </button>

        <a href="#" className="forgot-password">
          Forgot your password?
        </a>

        <div className="signup-link">
          <span>Don't have an account?</span>
          <a href="register">Sign up for GrooveNest</a>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
