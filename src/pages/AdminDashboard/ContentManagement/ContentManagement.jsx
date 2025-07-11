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
  deleteGenre,
} from "../../../store/Actions/genreActions";
import {
  fetchPaginatedArtists,
  deleteArtist,
} from "../../../store/Actions/artistActions";
import { ToastContext } from "../../../context/ToastContext";
import UpdateGenrePopup from "./Popups/update/UpdateGenrePopup";
import { API_IMAGE_URL } from "../../../config";

import Swal from "sweetalert2";

function ContentManagement() {
  const [activeTab, setActiveTab] = useState("tracks");
  const [searchQuery, setSearchQuery] = useState("");
  const [newGenre, setNewGenre] = useState({ name: "" });
  const [updateGenre, setUpdateGenre] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { notify } = useContext(ToastContext);

  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genre.allGenres || []);
  const artists = useSelector((state) => state.artist.paginatedArtists || []);
  const totalArtists = useSelector((state) => state.artist.totalArtists || 0);

  // Fetch genres on component mount
  useEffect(() => {
    dispatch(fetchAllGenres());
  }, [dispatch]);

  // Fetch artists on component mount
  useEffect(() => {
    dispatch(fetchPaginatedArtists(currentPage, pageSize, searchQuery));
  }, [dispatch, currentPage, pageSize, searchQuery]);

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

  const handleDeleteGenre = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteGenre(id))
          .then(() => {
            notify("Genre deleted successfully", "success");
          })
          .catch((error) => {
            notify(error.message || "Failed to delete genre", "error");
          });
      }
    });
  };

  const filteredTracks = tracks.filter(
    (track) =>
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredGenres = genres.filter((genre) =>
    genre.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle artist deletion
  const handleDeleteArtist = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteArtist(id))
          .then(() => {
            notify("Artist deleted successfully", "success");
          })
          .catch((error) => {
            notify(error.message || "Failed to delete artist", "error");
          });
      }
    });
  };

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
                    <button
                      className="action-btn edit"
                      onClick={() => setUpdateGenre(genre)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="action-btn delete"
                      onClick={() => handleDeleteGenre(genre.id)}
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

          {updateGenre && (
            <UpdateGenrePopup
              genre={updateGenre}
              onClose={() => setUpdateGenre(null)}
            />
          )}
        </div>
      )}

      {activeTab === "artists" && (
        <div className="artists-section">
          <div className="section-header">
            <h2>Manage Artists</h2>
            <div className="filter-controls">
              <select
                id="pageSize"
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>

          <div className="artists-table">
            <div className="table-header">
              <div className="col name">Artist Name</div>
              <div className="col bio">Bio</div>
              <div className="col username">Username</div>
              <div className="col actions">Actions</div>
            </div>

            {artists.length > 0 ? (
              artists.map((artist) => (
                <div className="table-row" key={artist.id}>
                  <div className="col name">
                    <div className="artist-info">
                      <img
                        src={`${API_IMAGE_URL}${artist.profilePictureUrl}`}
                        alt={artist.name}
                        className="avatar-img"
                      />
                      <span>{artist.name}</span>
                    </div>
                  </div>
                  <div className="col bio">{artist.bio}</div>
                  <div className="col username">@{artist.userName}</div>
                  <div className="col actions">
                    <button className="action-btn edit">
                      <FaEdit />
                    </button>
                    <button
                      className="action-btn delete"
                      onClick={() => handleDeleteArtist(artist.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">No artists found</div>
            )}
          </div>

          <div className="pagination">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {Math.ceil(totalArtists / pageSize)}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage * pageSize >= totalArtists}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContentManagement;
