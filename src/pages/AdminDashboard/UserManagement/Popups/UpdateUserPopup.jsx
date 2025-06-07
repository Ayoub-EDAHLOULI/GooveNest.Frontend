import "./Popup.scss";
import { useState, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../../store/Actions/userActions";
import { ToastContext } from "../../../../context/ToastContext";
import { FaTimes } from "react-icons/fa";
import { validationUpdateUser } from "../../../../validations/validations";

const inputFields = [
  { label: "Username", name: "userName", type: "text" },
  { label: "Email", name: "email", type: "email" },
];

export default function UpdateUserPopup({ user, onClose }) {
  const [userData, setUserData] = useState({ ...user });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { notify } = useContext(ToastContext);

  console.log("UpdateUserPopup userData:", userData);

  useEffect(() => {
    setUserData(user); // Update state if props change
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if the value is a number and convert it
    const parsedValue = name === "status" ? parseInt(value, 10) : value;

    const updated = { ...userData, [name]: parsedValue };
    setUserData(updated);

    const validationErrors = validationUpdateUser(updated);
    setErrors(validationErrors.errors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const changedFields = {};
    Object.keys(userData).forEach((key) => {
      if (userData[key] !== user[key]) {
        changedFields[key] = userData[key];
      }
    });

    if (Object.keys(changedFields).length === 0) {
      notify("No changes to update", "info");
      return;
    }

    const validation = validationUpdateUser({ ...user, ...changedFields });
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    dispatch(updateUser({ id: user.id, ...changedFields }))
      .then(() => {
        notify("User updated successfully", "success");
        onClose();
      })
      .catch((error) => {
        notify(error.message || "Failed to update user", "error");
      });
  };

  return (
    <div className="usermanagement-popup-overlay">
      <div className="popup-container">
        <div className="popup-header">
          <h3>Update User</h3>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <form className="popup-form" onSubmit={handleSubmit}>
          {inputFields.map(({ label, name, type }) => (
            <div key={name}>
              <label>{label}</label>
              <input
                type={type}
                name={name}
                value={userData[name] || ""}
                onChange={handleChange}
              />
              {errors[name] && <span className="error">{errors[name]}</span>}
            </div>
          ))}

          <label>Status</label>
          <select name="status" value={userData.status} onChange={handleChange}>
            <option value={0}>Active</option>
            <option value={1}>Inactive</option>
          </select>
          {errors.status && <span className="error">{errors.status}</span>}

          <div className="popup-actions">
            <button type="submit" className="save-btn">
              Update
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
