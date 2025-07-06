import "./MainArtistDashboard.scss";
import { useState } from "react";
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
} from "react-icons/fa";

function MainArtistDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newTrack, setNewTrack] = useState({
    title: "",
    genre: "",
    file: null,
    coverArt: null,
  });

  // Mock data - replace with API calls
  const [artistProfile, setArtistProfile] = useState({
    name: "DJ GrooveMaster",
    bio: "Electronic music producer creating vibes for your soul",
    genres: ["House", "Techno", "Deep House"],
    followers: 12458,
    monthlyListeners: 35642,
    totalPlays: 1245789,
  });

  const [tracks, setTracks] = useState([
    {
      id: 1,
      title: "Summer Vibes",
      plays: 12457,
      duration: "3:45",
      uploaded: "2023-05-15",
      status: "published",
    },
    {
      id: 2,
      title: "Midnight Groove",
      plays: 8743,
      duration: "4:12",
      uploaded: "2023-04-22",
      status: "published",
    },
    {
      id: 3,
      title: "Urban Flow",
      plays: 15632,
      duration: "3:28",
      uploaded: "2023-06-10",
      status: "published",
    },
    {
      id: 4,
      title: "New Track (Draft)",
      plays: 0,
      duration: "2:56",
      uploaded: "2023-06-18",
      status: "draft",
    },
  ]);

  const [albums, setAlbums] = useState([
    {
      id: 1,
      title: "Summer Collection",
      tracks: 8,
      plays: 45678,
      released: "2023-05-01",
    },
    {
      id: 2,
      title: "Midnight Sessions",
      tracks: 6,
      plays: 32456,
      released: "2023-03-15",
    },
  ]);

  const handleUploadTrack = (e) => {
    e.preventDefault();
    // In a real app, you would upload to your backend here
    const newTrackObj = {
      id: tracks.length + 1,
      title: newTrack.title,
      plays: 0,
      duration: "0:00", // Would calculate from actual file
      uploaded: new Date().toISOString().split("T")[0],
      status: "draft",
    };
    setTracks([...tracks, newTrackObj]);
    setShowUploadModal(false);
    setNewTrack({ title: "", genre: "", file: null, coverArt: null });
  };

  const handleDeleteTrack = (id) => {
    setTracks(tracks.filter((track) => track.id !== id));
  };

  const handlePublishTrack = (id) => {
    setTracks(
      tracks.map((track) =>
        track.id === id ? { ...track, status: "published" } : track
      )
    );
  };

  return (
    <div className="artist-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="artist-profile">
          <div className="avatar">GM</div>
          <h3>{artistProfile.name}</h3>
          <p>{artistProfile.genres.join(", ")}</p>
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
            className={`nav-item ${activeTab === "analytics" ? "active" : ""}`}
            onClick={() => setActiveTab("analytics")}
          >
            <FaChartLine className="icon" />
            <span>Analytics</span>
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
                onClick={() => setShowUploadModal(true)}
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
                    <button className="play-button">
                      <FaPlay />
                    </button>
                    {track.title}
                  </div>
                  <div className="col plays">
                    {track.plays.toLocaleString()}
                  </div>
                  <div className="col duration">{track.duration}</div>
                  <div className="col uploaded">{track.uploaded}</div>
                  <div className="col status">
                    <span className={`status-badge ${track.status}`}>
                      {track.status}
                    </span>
                  </div>
                  <div className="col actions">
                    <button className="action-button edit">
                      <FaPencilAlt />
                    </button>
                    {track.status === "draft" && (
                      <button
                        className="action-button publish"
                        onClick={() => handlePublishTrack(track.id)}
                      >
                        Publish
                      </button>
                    )}
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
            <div className="section-header">
              <h2>My Albums</h2>
              <button className="add-button">
                <FaPlus /> Create Album
              </button>
            </div>

            <div className="albums-grid">
              {albums.map((album) => (
                <div className="album-card" key={album.id}>
                  <div className="album-cover">
                    <div className="cover-image">A</div>
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
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="analytics-tab">
            <h2>Analytics</h2>
            <div className="analytics-grid">
              <div className="chart-container">
                <h3>Monthly Plays</h3>
                <div className="chart-placeholder">
                  [Chart would display here]
                </div>
              </div>
              <div className="chart-container">
                <h3>Top Tracks</h3>
                <div className="chart-placeholder">
                  [Chart would display here]
                </div>
              </div>
              <div className="chart-container">
                <h3>Listener Demographics</h3>
                <div className="chart-placeholder">
                  [Chart would display here]
                </div>
              </div>
              <div className="chart-container">
                <h3>Geographic Distribution</h3>
                <div className="chart-placeholder">
                  [Chart would display here]
                </div>
              </div>
            </div>
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
                <label>Genres</label>
                <div className="genres-tags">
                  {artistProfile.genres.map((genre, index) => (
                    <span key={index} className="genre-tag">
                      {genre}
                      <button
                        className="remove-genre"
                        onClick={(e) => {
                          e.preventDefault();
                          const newGenres = [...artistProfile.genres];
                          newGenres.splice(index, 1);
                          setArtistProfile({
                            ...artistProfile,
                            genres: newGenres,
                          });
                        }}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    placeholder="Add genre"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.target.value.trim()) {
                        setArtistProfile({
                          ...artistProfile,
                          genres: [
                            ...artistProfile.genres,
                            e.target.value.trim(),
                          ],
                        });
                        e.target.value = "";
                      }
                    }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Profile Image</label>
                <div className="image-upload">
                  <div className="current-avatar">GM</div>
                  <button className="upload-button">Change Image</button>
                </div>
              </div>

              <button type="submit" className="save-button">
                Save Changes
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="modal-overlay">
          <div className="upload-modal">
            <div className="modal-header">
              <h3>Upload New Track</h3>
              <button
                className="close-button"
                onClick={() => setShowUploadModal(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleUploadTrack}>
              <div className="form-group">
                <label>Track Title</label>
                <input
                  type="text"
                  value={newTrack.title}
                  onChange={(e) =>
                    setNewTrack({ ...newTrack, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Genre</label>
                <select
                  value={newTrack.genre}
                  onChange={(e) =>
                    setNewTrack({ ...newTrack, genre: e.target.value })
                  }
                  required
                >
                  <option value="">Select a genre</option>
                  <option value="Pop">Pop</option>
                  <option value="Rock">Rock</option>
                  <option value="Hip Hop">Hip Hop</option>
                  <option value="Electronic">Electronic</option>
                  <option value="R&B">R&B</option>
                </select>
              </div>

              <div className="form-group">
                <label>Audio File</label>
                <div className="file-upload">
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={(e) =>
                      setNewTrack({ ...newTrack, file: e.target.files[0] })
                    }
                    required
                  />
                  <button className="browse-button">Browse Files</button>
                  <span className="file-name">
                    {newTrack.file ? newTrack.file.name : "No file selected"}
                  </span>
                </div>
              </div>

              <div className="form-group">
                <label>Cover Art (Optional)</label>
                <div className="file-upload">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setNewTrack({ ...newTrack, coverArt: e.target.files[0] })
                    }
                  />
                  <button className="browse-button">Browse Files</button>
                  <span className="file-name">
                    {newTrack.coverArt
                      ? newTrack.coverArt.name
                      : "No file selected"}
                  </span>
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowUploadModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="upload-button">
                  Upload Track
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainArtistDashboard;
