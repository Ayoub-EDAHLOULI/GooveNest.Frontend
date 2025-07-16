import "../Popup.scss";
import { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { FaTimes } from "react-icons/fa";
import { ToastContext } from "../../../../context/ToastContext";
import { fetchArtistById } from "../../../../store/Actions/artistActions";
import { createAlbum } from "../../../../store/Actions/albumActions";

export default function UploadAlbumPopup({ artistId, onClose }) {
  const dispatch = useDispatch();
  const { notify } = useContext(ToastContext);

  const [title, setTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [coverFile, setCoverFile] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.id : null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !releaseDate || !coverFile) {
      notify("Please fill in all fields including a cover image.", "error");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("releaseDate", releaseDate);
    formData.append("artistId", artistId);
    formData.append("cover", coverFile);

    dispatch(createAlbum(formData))
      .then(() => {
        notify("Album created successfully!", "success");
        onClose();
        dispatch(fetchArtistById(userId));
      })
      .catch((error) => {
        notify(error.message || "Failed to create album.", "error");
      });
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div className="popup-header">
          <h3>Create New Album</h3>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="popup-form">
          <label>Album Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label>Release Date</label>
          <input
            type="date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            required
          />

          <label>Cover Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverFile(e.target.files[0])}
            required
          />

          <div className="popup-actions">
            <button type="submit" className="save-btn">
              Create Album
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
