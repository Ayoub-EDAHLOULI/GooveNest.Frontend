import "./Sidebar.scss";
import { FaHome, FaSearch, FaPlus, FaHeart, FaPodcast } from "react-icons/fa";
import { MdLibraryMusic } from "react-icons/md";
import { Link } from "react-router-dom";

function Sidebar() {
  // Mock data - replace with your actual data
  const playlists = [
    { id: 1, name: "Liked Songs", count: 125 },
    { id: 2, name: "Workout Mix", count: 42 },
    { id: 3, name: "Chill Vibes", count: 87 },
    { id: 4, name: "Road Trip", count: 63 },
  ];

  const podcasts = [
    { id: 1, name: "Tech Today", author: "Tech Network" },
    { id: 2, name: "Science Weekly", author: "Science Media" },
    { id: 3, name: "Business Insights", author: "Finance Group" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        {/* Main Navigation */}
        <nav className="main-nav">
          <ul>
            <li>
              <Link to="/" className="active">
                <FaHome className="nav-icon" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link to="/library">
                <MdLibraryMusic className="nav-icon" />
                <span>Your Library</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Playlists Section */}
        <div className="playlists-section">
          <div className="section-header">
            <button className="create-playlist">
              <FaPlus className="icon" />
              <span>Create Playlist</span>
            </button>
            <button className="liked-songs">
              <FaHeart className="icon" />
              <Link to="/liked-songs">
                <span>Liked Songs</span>
              </Link>
            </button>
          </div>

          <div className="playlists-list">
            <h3 className="section-title">Your Playlists</h3>
            <ul>
              {playlists.map((playlist) => (
                <li key={playlist.id}>
                  <Link to={`/playlist/${playlist.id}`}>
                    <span className="playlist-name">{playlist.name}</span>
                    <span className="track-count">{playlist.count} songs</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Podcasts Section */}
        <div className="podcasts-section">
          <div className="section-header">
            <FaPodcast className="section-icon" />
            <h3 className="section-title">Podcasts</h3>
          </div>
          <ul>
            {podcasts.map((podcast) => (
              <li key={podcast.id}>
                <Link to={`/podcast/${podcast.id}`}>
                  <span className="podcast-name">{podcast.name}</span>
                  <span className="podcast-author">{podcast.author}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/podcasts" className="browse-link">
            Browse all podcasts
          </Link>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
