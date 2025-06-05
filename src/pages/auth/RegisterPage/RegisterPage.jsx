import "./RegisterPage.scss";
import { useState, useContext } from "react";
import { FaSpotify } from "react-icons/fa";
import { validationRegister } from "../../../validations/validations";
import { useDispatch } from "react-redux";
import { register } from "../../../store/Actions/authActions";
import { ToastContext } from "../../../context/ToastContext";

function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const { notify } = useContext(ToastContext);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate input on change
    const validation = validationRegister({ ...formData, [name]: value });
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
    const validation = validationRegister(formData);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    // Dispatch the register action
    dispatch(register(formData))
      .then(() => {
        notify("Registration successful!", "success");

        // Empty the form after successful registration
        setFormData({
          username: "",
          email: "",
          password: "",
        });
      })
      .catch((error) => {
        notify(error.message || "Registration failed", "error");
      });
  };

  return (
    <div className="register-container">
      <div className="register-header">
        <FaSpotify className="logo" />
        <h1>GrooveNest</h1>
      </div>
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Sign up for free to start listening.</h2>

        <div className="form-group">
          <label htmlFor="username">What should we call you?</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter a profile name."
            value={formData.username}
            onChange={handleChange}
          />
          <p className="hint">This appears on your profile.</p>

          {errors.username && <p className="error">{errors.username}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">What's your email?</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email."
            value={formData.email}
            onChange={handleChange}
          />

          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Create a password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Create a password."
            value={formData.password}
            onChange={handleChange}
          />

          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <div className="terms">
          <p>
            By clicking on sign-up, you agree to GrooveNest's{" "}
            <a href="#">Terms and Conditions of Use</a>.
          </p>
          <p>
            To learn more about how GrooveNest collects, uses, shares and
            protects your personal data, please see{" "}
            <a href="#">GrooveNest's Privacy Policy</a>.
          </p>
        </div>

        <button type="submit" className="register-btn">
          Sign Up
        </button>

        <div className="login-link">
          <span>Already have an account?</span>
          <a href="login">Log in</a>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
