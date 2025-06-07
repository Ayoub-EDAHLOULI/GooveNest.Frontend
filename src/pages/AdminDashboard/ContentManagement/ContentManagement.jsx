import "./ContentManagement.scss";
import { useState, useEffect, useContext } from "react";
import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaMusic,
  FaUser,
  FaSlidersH,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllGenres,
  createGenre,
} from "../../../store/Actions/genreActions";
import { ToastContext } from "../../../context/ToastContext";

function ContentManagement() {
  const [activeTab, setActiveTab] = useState("tracks");
  const [searchQuery, setSearchQuery] = useState("");
  const [newGenre, setNewGenre] = useState({ name: "" });

  const { notify } = useContext(ToastContext);

  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genre.allGenres || []);

  // Fetch genres on component mount
  useEffect(() => {
    dispatch(fetchAllGenres());
  }, [dispatch]);

  // Mock data - replace with API calls
  const [tracks, setTracks] = useState([
    {
      id: 1,
      title: "Summer Vibes",
      artist: "DJ Cool",
      genre: "Electronic",
      plays: 12457,
      status: "published",
    },
    {
      id: 2,
      title: "Midnight Dreams",
      artist: "Luna",
      genre: "Pop",
      plays: 8743,
      status: "published",
    },
    {
      id: 3,
      title: "Urban Flow",
      artist: "The Streets",
      genre: "Hip Hop",
      plays: 15632,
      status: "pending",
    },
    {
      id: 4,
      title: "Classical Moment",
      artist: "Symphony",
      genre: "Classical",
      plays: 5421,
      status: "published",
    },
  ]);

  const handleDeleteTrack = (id) => {
    setTracks(tracks.filter((track) => track.id !== id));
  };

  const handleToggleTrackStatus = (id) => {
    setTracks(
      tracks.map((track) =>
        track.id === id
          ? {
              ...track,
              status: track.status === "published" ? "pending" : "published",
            }
          : track
      )
    );
  };

  const handleAddGenre = () => {
    if (!newGenre.name.trim()) {
      notify("Genre name cannot be empty", "error");
      return;
    }

    dispatch(createGenre(newGenre))
      .then(() => {
        notify("Genre added successfully!", "success");

        setNewGenre({ name: "" }); // Reset input field
      })
      .catch((error) => {
        notify(error.message || "Failed to add genre", "error");
      });
  };

  // const handleDeleteGenre = (id) => {
  //   setGenres(genres.filter((genre) => genre.id !== id));
  // };

  const filteredTracks = tracks.filter(
    (track) =>
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredGenres = genres.filter((genre) =>
    genre.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="content-management">
      <h1>Content Management</h1>

      <div className="content-tabs">
        <button
          className={`tab-btn ${activeTab === "tracks" ? "active" : ""}`}
          onClick={() => setActiveTab("tracks")}
        >
          <FaMusic className="tab-icon" /> Tracks
        </button>
        <button
          className={`tab-btn ${activeTab === "genres" ? "active" : ""}`}
          onClick={() => setActiveTab("genres")}
        >
          <FaSlidersH className="tab-icon" /> Genres
        </button>
        <button
          className={`tab-btn ${activeTab === "artists" ? "active" : ""}`}
          onClick={() => setActiveTab("artists")}
        >
          <FaUser className="tab-icon" /> Artists
        </button>
      </div>

      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder={`Search ${activeTab}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {activeTab === "tracks" && (
        <div className="tracks-section">
          <div className="section-header">
            <h2>Manage Tracks</h2>
            <button className="add-btn">
              <FaPlus /> Add Track
            </button>
          </div>

          <div className="tracks-table">
            <div className="table-header">
              <div className="col title">Title</div>
              <div className="col artist">Artist</div>
              <div className="col genre">Genre</div>
              <div className="col plays">Plays</div>
              <div className="col status">Status</div>
              <div className="col actions">Actions</div>
            </div>

            {filteredTracks.length > 0 ? (
              filteredTracks.map((track) => (
                <div className="table-row" key={track.id}>
                  <div className="col title">{track.title}</div>
                  <div className="col artist">{track.artist}</div>
                  <div className="col genre">{track.genre}</div>
                  <div className="col plays">
                    {track.plays.toLocaleString()}
                  </div>
                  <div className="col status">
                    <span className={`status-badge ${track.status}`}>
                      {track.status}
                    </span>
                  </div>
                  <div className="col actions">
                    <button className="action-btn edit">
                      <FaEdit />
                    </button>
                    <button
                      className={`action-btn toggle-status ${
                        track.status === "published" ? "unpublish" : "publish"
                      }`}
                      onClick={() => handleToggleTrackStatus(track.id)}
                    >
                      {track.status === "published" ? "Unpublish" : "Publish"}
                    </button>
                    <button
                      className="action-btn delete"
                      onClick={() => handleDeleteTrack(track.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">No tracks found</div>
            )}
          </div>
        </div>
      )}

      {activeTab === "genres" && (
        <div className="genres-section">
          <div className="section-header">
            <h2>Manage Genres</h2>
            <div className="add-genre">
              <input
                type="text"
                placeholder="New genre name"
                value={newGenre.name}
                onChange={(e) => setNewGenre({ name: e.target.value })}
              />
              <button className="add-btn" onClick={() => handleAddGenre()}>
                <FaPlus /> Add
              </button>
            </div>
          </div>

          <div className="genres-grid">
            {filteredGenres.length > 0 ? (
              filteredGenres.map((genre) => (
                <div className="genre-card" key={genre.id}>
                  <div className="genre-name">{genre.name}</div>
                  <div className="genre-stats">
                    <span className="track-count">
                      {genre.trackCount} tracks
                    </span>
                  </div>
                  <div className="genre-actions">
                    <button className="action-btn edit">
                      <FaEdit />
                    </button>
                    <button
                      className="action-btn delete"
                      onClick={() => console.log(`Delete genre ${genre.id}`)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">No genres found</div>
            )}
          </div>
        </div>
      )}

      {activeTab === "artists" && (
        <div className="artists-section">
          <div className="section-header">
            <h2>Manage Artists</h2>
            <div className="filter-controls">
              <select>
                <option>All Artists</option>
                <option>Verified Only</option>
                <option>Unverified Only</option>
              </select>
            </div>
          </div>

          <div className="artists-table">
            <div className="table-header">
              <div className="col name">Artist Name</div>
              <div className="col tracks">Tracks</div>
              <div className="col followers">Followers</div>
              <div className="col status">Status</div>
              <div className="col actions">Actions</div>
            </div>

            {/* Sample artist data - replace with real data */}
            <div className="table-row">
              <div className="col name">
                <div className="artist-info">
                  <div className="avatar">DJ</div>
                  <span>DJ Cool</span>
                </div>
              </div>
              <div className="col tracks">24</div>
              <div className="col followers">12,458</div>
              <div className="col status">
                <span className="status-badge verified">Verified</span>
              </div>
              <div className="col actions">
                <button className="action-btn edit">
                  <FaEdit />
                </button>
                <button className="action-btn revoke">Revoke</button>
              </div>
            </div>

            <div className="table-row">
              <div className="col name">
                <div className="artist-info">
                  <div className="avatar">LU</div>
                  <span>Luna</span>
                </div>
              </div>
              <div className="col tracks">8</div>
              <div className="col followers">5,432</div>
              <div className="col status">
                <span className="status-badge pending">Pending</span>
              </div>
              <div className="col actions">
                <button className="action-btn edit">
                  <FaEdit />
                </button>
                <button className="action-btn verify">Verify</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContentManagement;
