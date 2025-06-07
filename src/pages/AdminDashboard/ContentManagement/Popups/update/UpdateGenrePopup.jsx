import "../Popup.scss";
import { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { updateGenre } from "../../../../../store/Actions/genreActions";
import { ToastContext } from "../../../../../context/ToastContext";
import { FaTimes } from "react-icons/fa";

export default function UpdateGenrePopup({ genre, onClose }) {
  const [name, setName] = useState(genre.name);
  const dispatch = useDispatch();
  const { notify } = useContext(ToastContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      notify("Genre name cannot be empty", "error");
      return;
    }

    dispatch(updateGenre({ id: genre.id, name }))
      .then(() => {
        notify("Genre updated successfully", "success");
        onClose();
      })
      .catch((error) => {
        notify(error.message || "Failed to update genre", "error");
      });
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div className="popup-header">
          <h3>Edit Genre</h3>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="popup-form">
          <label>Genre Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div className="popup-actions">
            <button type="submit" className="save-btn">
              Save Changes
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
