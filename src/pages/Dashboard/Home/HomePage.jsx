import "./HomePage.scss";
import { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { FaPlay, FaHeart, FaEllipsisH } from "react-icons/fa";

function HomePage() {
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);

  // Mock data - replace with API calls
  useEffect(() => {
    // Recently played tracks
    setRecentlyPlayed([
      {
        id: 1,
        title: "Summer Vibes",
        artist: "DJ Groove",
        duration: "3:45",
        plays: 12457,
        cover: "/images/covers/summer.jpg",
      },
      {
        id: 2,
        title: "Midnight Dreams",
        artist: "Luna",
        duration: "4:12",
        plays: 8743,
        cover: "/images/covers/midnight.jpg",
      },
      {
        id: 3,
        title: "Urban Flow",
        artist: "The Streets",
        duration: "3:28",
        plays: 15632,
        cover: "/images/covers/urban.jpg",
      },
      {
        id: 4,
        title: "Classical Moment",
        artist: "Symphony",
        duration: "5:42",
        plays: 5421,
        cover: "/images/covers/classical.jpg",
      },
    ]);

    // Featured playlists
    setFeaturedPlaylists([
      {
        id: 1,
        title: "Chill Vibes",
        description: "Relaxing tunes for your day",
        cover: "/images/playlists/chill.jpg",
        tracks: 24,
      },
      {
        id: 2,
        title: "Workout Mix",
        description: "High energy tracks to keep you moving",
        cover: "/images/playlists/workout.jpg",
        tracks: 18,
      },
      {
        id: 3,
        title: "Focus Flow",
        description: "Concentration enhancing instrumentals",
        cover: "/images/playlists/focus.jpg",
        tracks: 32,
      },
      {
        id: 4,
        title: "Party Starters",
        description: "Get the celebration going",
        cover: "/images/playlists/party.jpg",
        tracks: 20,
      },
    ]);

    // New releases
    setNewReleases([
      {
        id: 1,
        title: "Electric Dreams",
        artist: "Neon Waves",
        cover: "/images/albums/electric.jpg",
        date: "2023-06-15",
      },
      {
        id: 2,
        title: "Acoustic Sessions",
        artist: "Emma Stone",
        cover: "/images/albums/acoustic.jpg",
        date: "2023-06-10",
      },
      {
        id: 3,
        title: "Deep House Vol. 3",
        artist: "Midnight Collective",
        cover: "/images/albums/deephouse.jpg",
        date: "2023-06-05",
      },
      {
        id: 4,
        title: "R&B Essentials",
        artist: "Soulful Sounds",
        cover: "/images/albums/rnb.jpg",
        date: "2023-05-28",
      },
    ]);
  }, []);

  const handlePlayTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    // In a real app, you would play the audio here
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <section className="home-page">
      <Navbar />
      <div className="dashboard-container">
        <Sidebar />

        <div className="main-content">
          <div className="welcome-message">
            <h1>Welcome back</h1>
            <p>Here's what's happening in your music world today.</p>
          </div>

          {/* Recently Played Section */}
          <div className="content-section">
            <h2>Recently Played</h2>
            <div className="tracks-list">
              {recentlyPlayed.map((track) => (
                <div className="track-item" key={track.id}>
                  <div className="track-info">
                    <img
                      src={track.cover}
                      alt={track.title}
                      className="track-cover"
                    />
                    <div className="track-details">
                      <h3>{track.title}</h3>
                      <p>{track.artist}</p>
                    </div>
                  </div>
                  <div className="track-meta">
                    <span className="track-plays">
                      {track.plays.toLocaleString()} plays
                    </span>
                    <span className="track-duration">{track.duration}</span>
                  </div>
                  <div className="track-actions">
                    <button
                      className="play-button"
                      onClick={() => handlePlayTrack(track)}
                    >
                      <FaPlay />
                    </button>
                    <button className="like-button">
                      <FaHeart />
                    </button>
                    <button className="more-button">
                      <FaEllipsisH />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Playlists Section */}
          <div className="content-section">
            <h2>Featured Playlists</h2>
            <div className="playlist-grid">
              {featuredPlaylists.map((playlist) => (
                <div className="playlist-item" key={playlist.id}>
                  <div className="playlist-cover">
                    <img src={playlist.cover} alt={playlist.title} />
                    <button className="play-overlay">
                      <FaPlay />
                    </button>
                  </div>
                  <div className="playlist-info">
                    <h3>{playlist.title}</h3>
                    <p>{playlist.description}</p>
                    <span className="track-count">
                      {playlist.tracks} tracks
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* New Releases Section */}
          <div className="content-section">
            <h2>New Releases</h2>
            <div className="album-grid">
              {newReleases.map((album) => (
                <div className="album-item" key={album.id}>
                  <div className="album-cover">
                    <img src={album.cover} alt={album.title} />
                    <button className="play-overlay">
                      <FaPlay />
                    </button>
                  </div>
                  <div className="album-info">
                    <h3>{album.title}</h3>
                    <p>{album.artist}</p>
                    <span className="release-date">
                      {formatDate(album.date)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Now Playing Bar (would be fixed at bottom in real app) */}
          {currentTrack && (
            <div className={`now-playing ${isPlaying ? "active" : ""}`}>
              <div className="track-info">
                <img src={currentTrack.cover} alt={currentTrack.title} />
                <div>
                  <h4>{currentTrack.title}</h4>
                  <p>{currentTrack.artist}</p>
                </div>
              </div>
              <div className="player-controls">
                <button
                  className="control-button"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? "❚❚" : "▶"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default HomePage;
