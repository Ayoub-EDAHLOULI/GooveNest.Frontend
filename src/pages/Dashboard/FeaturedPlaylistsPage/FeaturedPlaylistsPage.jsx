import { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { FaPlay } from "react-icons/fa";
import { BsFillPlayFill } from "react-icons/bs";
import "./FeaturedPlaylistsPage.scss";

function FeaturedPlaylistsPage() {
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);
  const [moodCategories, setMoodCategories] = useState([]);
  const [genreCategories, setGenreCategories] = useState([]);
  const [activeMood, setActiveMood] = useState("all");
  const [activeGenre, setActiveGenre] = useState("all");
  const [currentPlaying, setCurrentPlaying] = useState(null);

  useEffect(() => {
    // Mock data - replace with API calls
    setFeaturedPlaylists([
      {
        id: "p1",
        title: "Today's Top Hits",
        description: "The most popular songs right now",
        cover: "/images/playlists/top-hits.jpg",
        tracks: 50,
        mood: "energetic",
        genre: "pop",
      },
      {
        id: "p2",
        title: "Chill Vibes",
        description: "Relaxing tunes for your day",
        cover: "/images/playlists/chill-vibes.jpg",
        tracks: 40,
        mood: "chill",
        genre: "electronic",
      },
      {
        id: "p3",
        title: "RapCaviar",
        description: "New music from Drake, Kendrick Lamar and more",
        cover: "/images/playlists/rapcaviar.jpg",
        tracks: 60,
        mood: "energetic",
        genre: "hip-hop",
      },
      {
        id: "p4",
        title: "Mood Booster",
        description: "Get happy with today's dose of feel-good songs",
        cover: "/images/playlists/mood-booster.jpg",
        tracks: 30,
        mood: "happy",
        genre: "pop",
      },
      {
        id: "p5",
        title: "Rock Classics",
        description: "Rock legends & epic songs",
        cover: "/images/playlists/rock-classics.jpg",
        tracks: 75,
        mood: "energetic",
        genre: "rock",
      },
      {
        id: "p6",
        title: "Indie Mix",
        description: "Fresh indie tracks and classics",
        cover: "/images/playlists/indie-mix.jpg",
        tracks: 45,
        mood: "chill",
        genre: "indie",
      },
      {
        id: "p7",
        title: "Focus Flow",
        description: "Music to help you concentrate",
        cover: "/images/playlists/focus-flow.jpg",
        tracks: 35,
        mood: "focus",
        genre: "electronic",
      },
      {
        id: "p8",
        title: "Sleep",
        description: "Gentle ambient music to help you fall asleep",
        cover: "/images/playlists/sleep.jpg",
        tracks: 25,
        mood: "sleep",
        genre: "ambient",
      },
    ]);

    setMoodCategories([
      { id: "all", name: "All Moods" },
      { id: "energetic", name: "Energetic" },
      { id: "chill", name: "Chill" },
      { id: "happy", name: "Happy" },
      { id: "focus", name: "Focus" },
      { id: "sleep", name: "Sleep" },
    ]);

    setGenreCategories([
      { id: "all", name: "All Genres" },
      { id: "pop", name: "Pop" },
      { id: "electronic", name: "Electronic" },
      { id: "hip-hop", name: "Hip Hop" },
      { id: "rock", name: "Rock" },
      { id: "indie", name: "Indie" },
      { id: "ambient", name: "Ambient" },
    ]);
  }, []);

  const filteredPlaylists = featuredPlaylists.filter((playlist) => {
    const moodMatch = activeMood === "all" || playlist.mood === activeMood;
    const genreMatch = activeGenre === "all" || playlist.genre === activeGenre;
    return moodMatch && genreMatch;
  });

  const handlePlayPlaylist = (playlistId) => {
    setCurrentPlaying(playlistId === currentPlaying ? null : playlistId);
  };

  return (
    <div className="featured-playlists-page">
      <Navbar />
      <div className="dashboard-container">
        <Sidebar />

        <div className="main-content">
          <div className="featured-header">
            <h1>Featured Playlists</h1>
            <p>Curated playlists for every mood and moment</p>
          </div>

          {/* Mood Filter */}
          <div className="category-filter">
            <h3>Mood</h3>
            <div className="category-scroll">
              {moodCategories.map((category) => (
                <button
                  key={category.id}
                  className={`category-button ${
                    activeMood === category.id ? "active" : ""
                  }`}
                  onClick={() => setActiveMood(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Genre Filter */}
          <div className="category-filter">
            <h3>Genre</h3>
            <div className="category-scroll">
              {genreCategories.map((category) => (
                <button
                  key={category.id}
                  className={`category-button ${
                    activeGenre === category.id ? "active" : ""
                  }`}
                  onClick={() => setActiveGenre(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Playlist */}
          {filteredPlaylists.length > 0 && (
            <div className="featured-playlist">
              <div className="featured-cover">
                <img
                  src={filteredPlaylists[0].cover}
                  alt={filteredPlaylists[0].title}
                />
                <button
                  className={`play-button ${
                    currentPlaying === filteredPlaylists[0].id ? "playing" : ""
                  }`}
                  onClick={() => handlePlayPlaylist(filteredPlaylists[0].id)}
                >
                  {currentPlaying === filteredPlaylists[0].id ? (
                    <div className="playing-animation">
                      <span className="bar"></span>
                      <span className="bar"></span>
                      <span className="bar"></span>
                    </div>
                  ) : (
                    <BsFillPlayFill />
                  )}
                </button>
              </div>
              <div className="featured-info">
                <h2>{filteredPlaylists[0].title}</h2>
                <p className="playlist-description">
                  {filteredPlaylists[0].description}
                </p>
                <div className="playlist-meta">
                  <span>{filteredPlaylists[0].tracks} tracks</span>
                  <span>{filteredPlaylists[0].mood}</span>
                  <span>{filteredPlaylists[0].genre}</span>
                </div>
              </div>
            </div>
          )}

          {/* All Playlists */}
          <div className="content-section">
            <h2>All Playlists</h2>
            <div className="playlists-grid">
              {filteredPlaylists.map((playlist) => (
                <div className="playlist-card" key={playlist.id}>
                  <div className="playlist-cover">
                    <img src={playlist.cover} alt={playlist.title} />
                    <button
                      className={`play-overlay ${
                        currentPlaying === playlist.id ? "playing" : ""
                      }`}
                      onClick={() => handlePlayPlaylist(playlist.id)}
                    >
                      {currentPlaying === playlist.id ? (
                        <div className="playing-animation">
                          <span className="bar"></span>
                          <span className="bar"></span>
                          <span className="bar"></span>
                        </div>
                      ) : (
                        <FaPlay />
                      )}
                    </button>
                  </div>
                  <div className="playlist-info">
                    <h3>{playlist.title}</h3>
                    <p>{playlist.description}</p>
                    <div className="playlist-meta">
                      <span>{playlist.tracks} tracks</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Made For You */}
          <div className="content-section">
            <h2>Made For You</h2>
            <div className="personalized-grid">
              {[1, 2, 3, 4].map((i) => (
                <div className="personalized-card" key={i}>
                  <div className="card-cover">
                    <img
                      src={`/images/playlists/personalized-${i}.jpg`}
                      alt={`Personalized ${i}`}
                    />
                    <button className="play-overlay">
                      <FaPlay />
                    </button>
                  </div>
                  <div className="card-info">
                    <h3>
                      {i === 1
                        ? "Daily Mix 1"
                        : i === 2
                        ? "Discover Weekly"
                        : i === 3
                        ? "Release Radar"
                        : "Time Capsule"}
                    </h3>
                    <p>
                      {i === 1
                        ? "A mix of your recent favorites"
                        : i === 2
                        ? "Your weekly mixtape of fresh music"
                        : i === 3
                        ? "New releases from artists you follow"
                        : "Your past favorites"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturedPlaylistsPage;
