import "../Popup.scss";
import { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { uploadTrack } from "../../../../store/Actions/trackActions";
import { fetchArtistById } from "../../../../store/Actions/artistActions";
import { ToastContext } from "../../../../context/ToastContext";
import { FaTimes } from "react-icons/fa";

export default function UploadTrackForAlbumPopup({
  artistId,
  albumId,
  onClose,
}) {
  const dispatch = useDispatch();
  const { notify } = useContext(ToastContext);

  const [title, setTitle] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [isPublished, setIsPublished] = useState(false);

  // Get User ID from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.id : null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !audioFile) {
      notify("Please provide both a title and an audio file.", "error");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("audioFile", audioFile);
    formData.append("artistId", artistId);
    formData.append("albumId", albumId); // ✅ added albumId
    formData.append("trackNumber", 1); // You might want to calculate this dynamically later
    formData.append("isPublished", isPublished ? "true" : "false");

    dispatch(uploadTrack(formData))
      .then(() => {
        notify("Track uploaded successfully", "success");
        onClose();
        dispatch(fetchArtistById(userId));
      })
      .catch((error) => {
        notify(error.message || "Failed to upload track", "error");
      });
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div className="popup-header">
          <h3>Upload New Track</h3>
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
            required
          />

          <label>Audio File</label>
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setAudioFile(e.target.files[0])}
            required
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
              Upload
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
