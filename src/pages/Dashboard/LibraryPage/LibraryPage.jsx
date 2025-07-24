import { useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Sidebar from "../../../components/Sidebar/Sidebar";
import {
  FaMusic,
  FaHeart,
  FaListUl,
  FaPodcast,
  FaHistory,
  FaPlus,
  FaSearch,
  FaEllipsisH,
} from "react-icons/fa";
import "./LibraryPage.scss";

function LibraryPage() {
  const [activeTab, setActiveTab] = useState("playlists");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - replace with API calls
  const [playlists, setPlaylists] = useState([
    {
      id: 1,
      name: "Liked Songs",
      tracks: 124,
      image: "/images/liked-songs.jpg",
      isLiked: true,
    },
    {
      id: 2,
      name: "Workout Mix",
      tracks: 32,
      image: "/images/workout-mix.jpg",
      isLiked: false,
    },
    {
      id: 3,
      name: "Chill Vibes",
      tracks: 45,
      image: "/images/chill-vibes.jpg",
      isLiked: false,
    },
    {
      id: 4,
      name: "Road Trip",
      tracks: 28,
      image: "/images/road-trip.jpg",
      isLiked: false,
    },
  ]);

  const [likedSongs, setLikedSongs] = useState([
    {
      id: 1,
      title: "Summer Vibes",
      artist: "DJ Groove",
      duration: "3:45",
      cover: "/images/covers/summer.jpg",
    },
    {
      id: 2,
      title: "Midnight Dreams",
      artist: "Luna",
      duration: "4:12",
      cover: "/images/covers/midnight.jpg",
    },
    {
      id: 3,
      title: "Urban Flow",
      artist: "The Streets",
      duration: "3:28",
      cover: "/images/covers/urban.jpg",
    },
    {
      id: 4,
      title: "Classical Moment",
      artist: "Symphony",
      duration: "5:42",
      cover: "/images/covers/classical.jpg",
    },
  ]);

  const [podcasts, setPodcasts] = useState([
    {
      id: 1,
      title: "Tech Today",
      author: "Tech Network",
      episodes: 124,
      image: "/images/podcasts/tech-today.jpg",
    },
    {
      id: 2,
      title: "Science Weekly",
      author: "Science Media",
      episodes: 87,
      image: "/images/podcasts/science-weekly.jpg",
    },
  ]);

  const [history, setHistory] = useState([
    {
      id: 1,
      title: "Summer Vibes",
      artist: "DJ Groove",
      time: "2 hours ago",
      cover: "/images/covers/summer.jpg",
    },
    {
      id: 2,
      title: "Tech Today",
      author: "Tech Network",
      time: "Yesterday",
      cover: "/images/podcasts/tech-today.jpg",
    },
    {
      id: 3,
      title: "Chill Vibes Playlist",
      time: "3 days ago",
      cover: "/images/chill-vibes.jpg",
    },
  ]);

  const createNewPlaylist = () => {
    const newPlaylist = {
      id: playlists.length + 1,
      name: `New Playlist ${playlists.length + 1}`,
      tracks: 0,
      image: "/images/default-playlist.jpg",
      isLiked: false,
    };
    setPlaylists([...playlists, newPlaylist]);
  };

  const filteredPlaylists = playlists.filter((playlist) =>
    playlist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredLikedSongs = likedSongs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPodcasts = podcasts.filter(
    (podcast) =>
      podcast.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      podcast.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredHistory = history.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.artist &&
        item.artist.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.author &&
        item.author.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <section className="library-page">
      <Navbar />
      <div className="dashboard-container">
        <Sidebar />

        <div className="main-content">
          <div className="library-header">
            <h1>Your Library</h1>
            <div className="search-bar">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search in your library..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="library-tabs">
            <button
              className={`tab-button ${
                activeTab === "playlists" ? "active" : ""
              }`}
              onClick={() => setActiveTab("playlists")}
            >
              <FaListUl className="tab-icon" />
              <span>Playlists</span>
            </button>
            <button
              className={`tab-button ${activeTab === "liked" ? "active" : ""}`}
              onClick={() => setActiveTab("liked")}
            >
              <FaHeart className="tab-icon" />
              <span>Liked Songs</span>
            </button>
            <button
              className={`tab-button ${
                activeTab === "podcasts" ? "active" : ""
              }`}
              onClick={() => setActiveTab("podcasts")}
            >
              <FaPodcast className="tab-icon" />
              <span>Podcasts</span>
            </button>
            <button
              className={`tab-button ${
                activeTab === "history" ? "active" : ""
              }`}
              onClick={() => setActiveTab("history")}
            >
              <FaHistory className="tab-icon" />
              <span>History</span>
            </button>
          </div>

          {/* Playlists Tab */}
          {activeTab === "playlists" && (
            <div className="library-content">
              <div className="section-header">
                <h2>Your Playlists</h2>
                <button className="create-button" onClick={createNewPlaylist}>
                  <FaPlus /> Create Playlist
                </button>
              </div>

              {filteredPlaylists.length > 0 ? (
                <div className="playlists-grid">
                  {filteredPlaylists.map((playlist) => (
                    <div className="playlist-card" key={playlist.id}>
                      <div className="playlist-image">
                        <img src={playlist.image} alt={playlist.name} />
                        <button className="play-button">
                          <FaMusic />
                        </button>
                      </div>
                      <div className="playlist-info">
                        <h3>{playlist.name}</h3>
                        <p>{playlist.tracks} tracks</p>
                      </div>
                      <button className="menu-button">
                        <FaEllipsisH />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <p>No playlists found matching your search.</p>
                </div>
              )}
            </div>
          )}

          {/* Liked Songs Tab */}
          {activeTab === "liked" && (
            <div className="library-content">
              <div className="section-header">
                <h2>Liked Songs</h2>
                <p className="subtitle">{likedSongs.length} songs</p>
              </div>

              {filteredLikedSongs.length > 0 ? (
                <div className="tracks-list">
                  {filteredLikedSongs.map((song) => (
                    <div className="track-item" key={song.id}>
                      <div className="track-info">
                        <img
                          src={song.cover}
                          alt={song.title}
                          className="track-cover"
                        />
                        <div className="track-details">
                          <h3>{song.title}</h3>
                          <p>{song.artist}</p>
                        </div>
                      </div>
                      <div className="track-duration">{song.duration}</div>
                      <button className="menu-button">
                        <FaEllipsisH />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <p>No liked songs found matching your search.</p>
                </div>
              )}
            </div>
          )}

          {/* Podcasts Tab */}
          {activeTab === "podcasts" && (
            <div className="library-content">
              <div className="section-header">
                <h2>Your Podcasts</h2>
                <p className="subtitle">Followed shows and episodes</p>
              </div>

              {filteredPodcasts.length > 0 ? (
                <div className="podcasts-grid">
                  {filteredPodcasts.map((podcast) => (
                    <div className="podcast-card" key={podcast.id}>
                      <div className="podcast-image">
                        <img src={podcast.image} alt={podcast.title} />
                      </div>
                      <div className="podcast-info">
                        <h3>{podcast.title}</h3>
                        <p>{podcast.author}</p>
                        <span className="episode-count">
                          {podcast.episodes} episodes
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <p>No podcasts found matching your search.</p>
                </div>
              )}
            </div>
          )}

          {/* History Tab */}
          {activeTab === "history" && (
            <div className="library-content">
              <div className="section-header">
                <h2>Recently Played</h2>
                <p className="subtitle">Your listening history</p>
              </div>

              {filteredHistory.length > 0 ? (
                <div className="history-list">
                  {filteredHistory.map((item) => (
                    <div className="history-item" key={item.id}>
                      <img
                        src={item.cover}
                        alt={item.title}
                        className="item-cover"
                      />
                      <div className="item-info">
                        <h3>{item.title}</h3>
                        <p>{item.artist || item.author || "Playlist"}</p>
                      </div>
                      <div className="item-time">{item.time}</div>
                      <button className="menu-button">
                        <FaEllipsisH />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <p>No history found matching your search.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default LibraryPage;
