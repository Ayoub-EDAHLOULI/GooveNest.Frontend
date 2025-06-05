import "./RegisterPage.scss";
import { useState } from "react";
import { FaSpotify } from "react-icons/fa";

function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registration submitted:", formData);
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
            required
          />
          <p className="hint">This appears on your profile.</p>
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
            required
          />
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
            required
          />
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
