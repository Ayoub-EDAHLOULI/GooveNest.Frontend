// AddUserPopup.jsx
import "../Popup.scss";
import { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../../../../../store/Actions/userActions"; // adjust path
import { ToastContext } from "../../../../../context/ToastContext";
import { FaTimes } from "react-icons/fa";

export default function AddUserPopup({ closeModal }) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(0);
  const dispatch = useDispatch();
  const { notify } = useContext(ToastContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName.trim() || !email.trim() || !password.trim()) {
      notify("All fields are required", "error");
      return;
    }

    const user = { userName, email, password, status };

    dispatch(createUser(user))
      .then(() => {
        notify("User created successfully", "success");
        closeModal();
      })
      .catch((err) => {
        notify(err.message || "Failed to create user", "error");
      });
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div className="popup-header">
          <h3>Add New User</h3>
          <button className="close-btn" onClick={closeModal}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="popup-form">
          <label>Username</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(Number(e.target.value))}
          >
            <option value={0}>Active</option>
            <option value={1}>Inactive</option>
          </select>

          <div className="popup-actions">
            <button type="submit" className="save-btn">
              Create User
            </button>
            <button type="button" className="cancel-btn" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
