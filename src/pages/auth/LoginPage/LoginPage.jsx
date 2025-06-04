import "./LoginPage.scss";
import { useState } from "react";
import { FaSpotify } from "react-icons/fa";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted:", formData);
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
            placeholder="Email address or username"
            value={formData.email}
            onChange={handleChange}
            required
          />
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
            required
          />
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
