import "./MainArtistDashboard.scss";
import { useEffect, useState, useContext } from "react";
import {
  FaHome,
  FaMusic,
  FaChartLine,
  FaUser,
  FaUpload,
  FaPlus,
  FaEllipsisH,
  FaPlay,
  FaPencilAlt,
  FaTrash,
  FaPause,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchArtistById,
  updateArtist,
} from "../../../store/Actions/artistActions";
import { API_IMAGE_URL } from "../../../config";
import { ToastContext } from "../../../context/ToastContext";
import UpdateTrackPopup from "../Popups/Track/UpdateTrackPopup";
import UploadTrackForAlbumPopup from "../Popups/Track/UploadTrackForAlbumPopup";
import UploadAlbumPopup from "../Popups/Album/UploadAlbumPopup";
import UploadTrackPopup from "../Popups/Track/UploadTrackPopup";
import { deleteTrack } from "../../../store/Actions/trackActions";
import Swal from "sweetalert2";

function MainArtistDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showUploadForAlbumModal, setShowUploadForAlbumModal] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [showUpdateTrackPopup, setShowUpdateTrackPopup] = useState(false);
  const [showUploadAlbumPopup, setShowUploadAlbumPopup] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  // Mock data - replace with API calls
  const [artistProfile, setArtistProfile] = useState({
    name: "Groove Master",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    profilePicture: "https://via.placeholder.com/150",
    profilePictureUrl: "https://via.placeholder.com/150",
    followers: 12458,
    monthlyListeners: 35642,
    totalPlays: 1245789,
  });

  const [tracks, setTracks] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [audio, setAudio] = useState(null);
  const [currentTrackId, setCurrentTrackId] = useState(null);

  const dispatch = useDispatch();
  const artist = useSelector((state) => state.artist.singleArtist);

  const { notify } = useContext(ToastContext);

  // Ftech artist id from local storage
  const user = localStorage.getItem("user");
  const artistId = user ? JSON.parse(user).id : null;

  // Fetch artist data when component mounts or artistId changes
  useEffect(() => {
    if (artistId) {
      dispatch(fetchArtistById(artistId));
    }
  }, [dispatch, artistId]);

  useEffect(() => {
    if (artist) {
      setArtistProfile({
        name: artist.name || "Groove Master",
        bio:
          artist.bio ||
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        profilePictureUrl:
          artist.profilePictureUrl || "https://via.placeholder.com/150",
        followers: artist.followers || 12458,
        monthlyListeners: artist.monthlyListeners || 35642,
        totalPlays: artist.totalPlays || 1245789,
      });
    }
  }, [artist]);

  useEffect(() => {
    if (artist && artist.albums) {
      const mappedAlbums = artist.albums.map((album) => ({
        id: album.id,
        title: album.title,
        released: new Date(album.releaseDate).toISOString().split("T")[0],
        tracks: album.tracks?.length || 0,
        plays: 0, // You can replace this if you have real data
        coverUrl: `${API_IMAGE_URL}${album.coverUrl}`,
      }));
      setAlbums(mappedAlbums);
    }
  }, [artist]);

  // Functions to handle track upload, delete, and publish
  useEffect(() => {
    if (artist && artist.tracks) {
      const mappedTracks = artist.tracks.map((track) => ({
        id: track.id,
        title: track.title,
        trackUrl: `${API_IMAGE_URL}${track.audioUrl}`,
        plays: 0, // default, or get it from backend if available
        duration: `${Math.floor(track.durationSec / 60)}:${String(
          track.durationSec % 60
        ).padStart(2, "0")}`,
        uploaded: new Date(track.createdAt).toISOString().split("T")[0],
        isPublished: track.isPublished, // ✅ this line
      }));
      setTracks(mappedTracks);
    }
  }, [artist]);

  const handleDeleteTrack = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This track will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        // Dispatch delete action
        dispatch(deleteTrack(id))
          .then(() => {
            notify("Track deleted successfully", "success");
            // Fetch updated tracks
            dispatch(fetchArtistById(artistId));
          })
          .catch((error) => {
            notify(error.message || "Failed to delete track", "error");
          });
      }
    });
  };

  const handleUpdateArtistProfile = (e) => {
    e.preventDefault();

    if (!artistId) return;

    const updatedData = {
      id: artistId,
      name: artistProfile.name,
      bio: artistProfile.bio,
      avatar: artistProfile.profilePicture, // Assuming this is a File object
    };
    dispatch(updateArtist(artist.id, updatedData))
      .then(() => {
        notify("Profile updated successfully!", "success");

        // Fetch updated artist data
        dispatch(fetchArtistById(artistId));
      })
      .catch((error) => {
        notify(error.message || "Failed to update profile", "error");
      });
  };

  const handlePlayTrack = (trackId, audioUrl) => {
    // Stop previous audio if playing
    if (audio) {
      audio.pause();
      setAudio(null);
      if (trackId === currentTrackId) {
        setCurrentTrackId(null);
        return;
      }
    }

    const newAudio = new Audio(audioUrl);
    newAudio.play();
    setAudio(newAudio);
    setCurrentTrackId(trackId);
  };

  return (
    <div className="artist-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="artist-profile">
          <div className="avatar">
            <img
              src={`${API_IMAGE_URL}${artistProfile.profilePictureUrl}`}
              alt={`${artistProfile.name}'s profile`}
              className="profile-picture"
            />
          </div>
          <h3>{artistProfile.name}</h3>
        </div>

        <nav className="nav-menu">
          <button
            className={`nav-item ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            <FaHome className="icon" />
            <span>Overview</span>
          </button>
          <button
            className={`nav-item ${activeTab === "tracks" ? "active" : ""}`}
            onClick={() => setActiveTab("tracks")}
          >
            <FaMusic className="icon" />
            <span>My Tracks</span>
          </button>
          <button
            className={`nav-item ${activeTab === "albums" ? "active" : ""}`}
            onClick={() => setActiveTab("albums")}
          >
            <FaMusic className="icon" />
            <span>My Albums</span>
          </button>
          <button
            className={`nav-item ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            <FaUser className="icon" />
            <span>Profile</span>
          </button>
        </nav>

        <button
          className="upload-button"
          onClick={() => setShowUploadModal(true)}
        >
          <FaUpload className="icon" />
          <span>Upload Track</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {activeTab === "overview" && (
          <div className="overview-tab">
            <h2>Dashboard Overview</h2>

            <div className="stats-grid">
              <div className="stat-card">
                <h3>Followers</h3>
                <p>{artistProfile.followers.toLocaleString()}</p>
              </div>
              <div className="stat-card">
                <h3>Monthly Listeners</h3>
                <p>{artistProfile.monthlyListeners.toLocaleString()}</p>
              </div>
              <div className="stat-card">
                <h3>Total Plays</h3>
                <p>{artistProfile.totalPlays.toLocaleString()}</p>
              </div>
            </div>

            <div className="recent-activity">
              <h3>Recent Activity</h3>
              <div className="activity-item">
                <div className="activity-icon">
                  <FaMusic />
                </div>
                <div className="activity-details">
                  <p>Your track "Summer Vibes" reached 10,000 plays!</p>
                  <span className="activity-date">2 days ago</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">
                  <FaUser />
                </div>
                <div className="activity-details">
                  <p>You gained 245 new followers this week</p>
                  <span className="activity-date">1 week ago</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "tracks" && (
          <div className="tracks-tab">
            <div className="section-header">
              <h2>My Tracks</h2>
              <button
                className="add-button"
                onClick={() => setShowUploadForAlbumModal(true)}
              >
                <FaPlus /> Add Track
              </button>
            </div>

            <div className="tracks-table">
              <div className="table-header">
                <div className="col title">Title</div>
                <div className="col plays">Plays</div>
                <div className="col duration">Duration</div>
                <div className="col uploaded">Uploaded</div>
                <div className="col status">Status</div>
                <div className="col actions">Actions</div>
              </div>

              {tracks.map((track) => (
                <div className="table-row" key={track.id}>
                  <div className="col title">
                    <button
                      className="play-button"
                      onClick={() => handlePlayTrack(track.id, track.trackUrl)}
                    >
                      {currentTrackId === track.id ? <FaPause /> : <FaPlay />}
                    </button>

                    {track.title}
                  </div>
                  <div className="col plays">
                    {track.plays.toLocaleString()}
                  </div>
                  <div className="col duration">{track.duration}</div>
                  <div className="col uploaded">{track.uploaded}</div>
                  <div className="col status">
                    <span
                      className={`status-badge ${
                        track.isPublished ? "published" : "draft"
                      }`}
                    >
                      {track.isPublished ? "Published" : "Draft"}
                    </span>
                  </div>
                  <div className="col actions">
                    <button
                      className="action-button edit"
                      onClick={() => {
                        setSelectedTrack(track);
                        setShowUpdateTrackPopup(true);
                      }}
                    >
                      <FaPencilAlt />
                    </button>
                    <button
                      className="action-button delete"
                      onClick={() => handleDeleteTrack(track.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "albums" && (
          <div className="albums-tab">
            {!selectedAlbum ? (
              <>
                <div className="section-header">
                  <h2>My Albums</h2>
                  <div className="album-actions">
                    <button
                      className="add-button"
                      onClick={() => setShowUploadAlbumPopup(true)}
                    >
                      <FaPlus /> Create Album
                    </button>
                  </div>
                </div>

                <div className="albums-grid">
                  {albums.map((album) => (
                    <div
                      className="album-card"
                      key={album.id}
                      onClick={() => setSelectedAlbum(album)}
                    >
                      <div className="album-cover">
                        <img
                          src={album.coverUrl}
                          alt={album.title}
                          className="cover-image"
                        />
                        <button className="play-button">
                          <FaPlay />
                        </button>
                      </div>
                      <div className="album-info">
                        <h3>{album.title}</h3>
                        <p>
                          {album.tracks} tracks • {album.plays.toLocaleString()}{" "}
                          plays
                        </p>
                        <p>Released: {album.released}</p>
                      </div>
                      <button className="menu-button">
                        <FaEllipsisH />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="section-header">
                  <button
                    className="back-button"
                    onClick={() => setSelectedAlbum(null)}
                  >
                    ← Back to Albums
                  </button>
                  <h2>{selectedAlbum.title}</h2>
                  <button
                    className="add-button"
                    onClick={() => setShowUploadForAlbumModal(true)}
                  >
                    <FaPlus /> Add Track
                  </button>
                </div>

                <table className="tracks-table">
                  <thead>
                    <tr className="table-header">
                      <th className="col title">Title</th>
                      <th className="col plays">Plays</th>
                      <th className="col duration">Duration</th>
                      <th className="col uploaded">Uploaded</th>
                      <th className="col status">Status</th>
                      <th className="col actions">Actions</th>
                    </tr>
                  </thead>

                  {artist?.albums
                    ?.find((a) => a.id === selectedAlbum.id)
                    ?.tracks?.map((track) => (
                      <tbody className="table-row" key={track.id}>
                        <td className="col title">
                          <button
                            className="play-button"
                            onClick={() => {
                              handlePlayTrack(
                                track.id,
                                `${API_IMAGE_URL}${track.audioUrl}`
                              );
                            }}
                          >
                            {currentTrackId === track.id ? (
                              <FaPause />
                            ) : (
                              <FaPlay />
                            )}
                          </button>
                          <span className="track-name">{track.title}</span>
                        </td>
                        <td className="col plays">0</td>
                        <td className="col duration">
                          {`${Math.floor(track.durationSec / 60)}:${String(
                            track.durationSec % 60
                          ).padStart(2, "0")}`}
                        </td>
                        <td className="col uploaded">
                          {
                            new Date(track.createdAt)
                              .toISOString()
                              .split("T")[0]
                          }
                        </td>
                        <td className="col status">
                          <span
                            className={`status-badge ${
                              track.isPublished ? "published" : "draft"
                            }`}
                          >
                            {track.isPublished ? "Published" : "Draft"}
                          </span>
                        </td>
                        <td className="col actions">
                          <button
                            className="action-button edit"
                            onClick={() => {
                              setSelectedTrack(track);
                              setShowUpdateTrackPopup(true);
                            }}
                          >
                            <FaPencilAlt />
                          </button>
                          <button
                            className="action-button delete"
                            onClick={() => handleDeleteTrack(track.id)}
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tbody>
                    ))}
                </table>
              </>
            )}
          </div>
        )}

        {activeTab === "profile" && (
          <div className="profile-tab">
            <h2>Artist Profile</h2>

            <form className="profile-form">
              <div className="form-group">
                <label>Artist Name</label>
                <input
                  type="text"
                  value={artistProfile.name}
                  onChange={(e) =>
                    setArtistProfile({ ...artistProfile, name: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Bio</label>
                <textarea
                  value={artistProfile.bio}
                  onChange={(e) =>
                    setArtistProfile({ ...artistProfile, bio: e.target.value })
                  }
                  rows="4"
                />
              </div>
              <div className="form-group">
                <label>Profile Image</label>
                <div className="image-upload">
                  <div className="current-avatar">
                    <img
                      src={`${API_IMAGE_URL}${artistProfile.profilePictureUrl}`}
                      alt="Profile"
                      className="profile-picture"
                    />
                  </div>

                  <label htmlFor="profilePicture" className="upload-button">
                    Browse Files
                  </label>
                  <input
                    type="file"
                    id="profilePicture"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) =>
                      setArtistProfile({
                        ...artistProfile,
                        profilePicture: e.target.files[0],
                      })
                    }
                  />

                  <span className="file-name">
                    {artistProfile.profilePicture instanceof File
                      ? artistProfile.profilePicture.name
                      : "No file selected"}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="save-button"
                onClick={handleUpdateArtistProfile}
              >
                Save Changes
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <UploadTrackPopup
          artistId={artist.id}
          onClose={() => setShowUploadModal(false)}
        />
      )}

      {showUpdateTrackPopup && (
        <UpdateTrackPopup
          track={selectedTrack}
          onClose={() => setShowUpdateTrackPopup(false)}
        />
      )}

      {showUploadAlbumPopup && (
        <UploadAlbumPopup
          artistId={artist.id}
          onClose={() => setShowUploadAlbumPopup(false)}
        />
      )}

      {showUploadModal && (
        <UploadTrackPopup
          artistId={artist.id}
          albumId={selectedAlbum?.id}
          onClose={() => setShowUploadModal(false)}
        />
      )}

      {showUploadForAlbumModal && (
        <UploadTrackForAlbumPopup
          artistId={artist.id}
          albumId={selectedAlbum?.id}
          onClose={() => setShowUploadForAlbumModal(false)}
        />
      )}
    </div>
  );
}

export default MainArtistDashboard;
