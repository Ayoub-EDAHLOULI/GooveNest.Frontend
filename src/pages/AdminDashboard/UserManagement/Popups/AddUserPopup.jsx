import "./Popup.scss";
import { useState, useContext, useCallback } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../../../../store/Actions/userActions";
import { ToastContext } from "../../../../context/ToastContext";
import { FaTimes } from "react-icons/fa";
import { validationAddUser } from "../../../../validations/validations";

export default function AddUserPopup({ closeModal }) {
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    password: "",
    status: 0,
  });

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { notify } = useContext(ToastContext);

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      const updatedData = { ...userData, [name]: value };
      setUserData(updatedData);

      const { errors: fieldErrors } = validationAddUser(updatedData);
      setErrors(fieldErrors);
    },
    [userData]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { valid, errors: validationErrors } = validationAddUser(userData);
    if (!valid) {
      setErrors(validationErrors);
      return;
    }

    dispatch(createUser(userData))
      .then(() => {
        notify("User created successfully", "success");
        closeModal();

        setUserData({
          userName: "",
          email: "",
          password: "",
          status: 0,
        });
      })
      .catch((error) => {
        notify(error.message || "Failed to create user", "error");
      });
  };

  const inputFields = [
    { label: "Username", name: "userName", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Password", name: "password", type: "password" },
  ];

  return (
    <div className="usermanagement-popup-overlay">
      <div className="popup-container">
        <div className="popup-header">
          <h3>Add New User</h3>
          <button className="close-btn" onClick={closeModal} type="button">
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="popup-form" noValidate>
          {inputFields.map(({ label, name, type }) => (
            <div key={name} className="form-group">
              <label htmlFor={name}>{label}</label>
              <input
                id={name}
                name={name}
                type={type}
                value={userData[name]}
                onChange={handleInputChange}
              />
              {errors[name] && <span className="error">{errors[name]}</span>}
            </div>
          ))}

          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={userData.status}
            onChange={handleInputChange}
          >
            <option value={0}>Active</option>
            <option value={1}>Inactive</option>
          </select>
          {errors.status && <span className="error">{errors.status}</span>}

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
