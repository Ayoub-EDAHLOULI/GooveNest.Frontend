import "../Popup.scss";
import { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { ToastContext } from "../../../../context/ToastContext";
import { FaTimes } from "react-icons/fa";
import { updateTrack } from "../../../../store/Actions/trackActions";
import { fetchArtistById } from "../../../../store/Actions/artistActions";

export default function UpdateTrackPopup({ track, onClose }) {
  const [title, setTitle] = useState(track.title);
  const [isPublished, setIsPublished] = useState(track.isPublished);
  const dispatch = useDispatch();
  const { notify } = useContext(ToastContext);

  // Get User ID from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.id : null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      notify("Track title cannot be empty", "error");
      return;
    }

    const updatedTrack = {
      id: track.id,
      title,
      isPublished,
    };

    dispatch(updateTrack(updatedTrack))
      .then(() => {
        notify("Track updated successfully", "success");

        dispatch(fetchArtistById(userId));

        onClose();
      })
      .catch((error) => {
        notify(error.message || "Failed to update track", "error");
      });
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div className="popup-header">
          <h3>Edit Track</h3>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="popup-form">
          <label>Track Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Status</label>
          <select
            value={isPublished ? "1" : "0"}
            onChange={(e) => setIsPublished(e.target.value === "1")}
          >
            <option value="1">Published</option>
            <option value="0">Draft</option>
          </select>

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
