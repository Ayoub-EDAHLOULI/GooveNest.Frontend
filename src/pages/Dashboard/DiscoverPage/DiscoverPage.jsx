import { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Sidebar from "../../../components/Sidebar/Sidebar";
import {
  FaPlay,
  FaHeart,
  FaEllipsisH,
  FaRandom,
  FaChartLine,
} from "react-icons/fa";
import "./DiscoverPage.scss";
import { Link } from "react-router-dom";

function DiscoverPage() {
  const [newReleases, setNewReleases] = useState([]);
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);
  const [recommendedTracks, setRecommendedTracks] = useState([]);
  const [trendingArtists, setTrendingArtists] = useState([]);
  const [genres, setGenres] = useState([]);
  const [activeGenre, setActiveGenre] = useState("all");

  // Mock data - replace with API calls
  useEffect(() => {
    // New Releases
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
      {
        id: 5,
        title: "Pop Revolution",
        artist: "The Stars",
        cover: "/images/albums/pop.jpg",
        date: "2023-06-12",
      },
      {
        id: 6,
        title: "Jazz Nights",
        artist: "Smooth Operators",
        cover: "/images/albums/jazz.jpg",
        date: "2023-06-08",
      },
    ]);

    // Featured Playlists
    setFeaturedPlaylists([
      {
        id: 1,
        title: "Discover Weekly",
        description: "Your weekly mixtape of fresh music",
        cover: "/images/playlists/discover-weekly.jpg",
        tracks: 30,
        genre: "mixed",
      },
      {
        id: 2,
        title: "Release Radar",
        description: "Catch all the new releases from artists you follow",
        cover: "/images/playlists/release-radar.jpg",
        tracks: 25,
        genre: "mixed",
      },
      {
        id: 3,
        title: "Chill Vibes",
        description: "Relaxing tunes for your day",
        cover: "/images/playlists/chill.jpg",
        tracks: 24,
        genre: "electronic",
      },
      {
        id: 4,
        title: "Workout Mix",
        description: "High energy tracks to keep you moving",
        cover: "/images/playlists/workout.jpg",
        tracks: 18,
        genre: "pop",
      },
    ]);

    // Recommended Tracks
    setRecommendedTracks([
      {
        id: 1,
        title: "Summer Breeze",
        artist: "DJ Solar",
        duration: "3:45",
        cover: "/images/covers/summer-breeze.jpg",
        genre: "electronic",
      },
      {
        id: 2,
        title: "Midnight City",
        artist: "Urban Lights",
        duration: "4:12",
        cover: "/images/covers/midnight-city.jpg",
        genre: "electronic",
      },
      {
        id: 3,
        title: "Golden Hour",
        artist: "Sunset Collective",
        duration: "3:28",
        cover: "/images/covers/golden-hour.jpg",
        genre: "indie",
      },
      {
        id: 4,
        title: "Neon Dreams",
        artist: "Synthwave",
        duration: "5:42",
        cover: "/images/covers/neon-dreams.jpg",
        genre: "electronic",
      },
      {
        id: 5,
        title: "Coffee & Rain",
        artist: "Acoustic Mornings",
        duration: "4:15",
        cover: "/images/covers/coffee-rain.jpg",
        genre: "acoustic",
      },
    ]);

    // Trending Artists
    setTrendingArtists([
      {
        id: 1,
        name: "DJ GrooveMaster",
        followers: "1.2M",
        cover: "/images/artists/dj-groove.jpg",
        genre: "electronic",
      },
      {
        id: 2,
        name: "Luna",
        followers: "856K",
        cover: "/images/artists/luna.jpg",
        genre: "pop",
      },
      {
        id: 3,
        name: "The Streets",
        followers: "2.1M",
        cover: "/images/artists/the-streets.jpg",
        genre: "hip-hop",
      },
      {
        id: 4,
        name: "Symphony",
        followers: "1.5M",
        cover: "/images/artists/symphony.jpg",
        genre: "classical",
      },
    ]);

    // Genres
    setGenres([
      { id: "all", name: "All Genres" },
      { id: "pop", name: "Pop" },
      { id: "electronic", name: "Electronic" },
      { id: "hip-hop", name: "Hip Hop" },
      { id: "rock", name: "Rock" },
      { id: "indie", name: "Indie" },
      { id: "r&b", name: "R&B" },
      { id: "jazz", name: "Jazz" },
    ]);
  }, []);

  const filteredNewReleases =
    activeGenre === "all"
      ? newReleases
      : newReleases.filter((release) => release.genre === activeGenre);

  const filteredFeaturedPlaylists =
    activeGenre === "all"
      ? featuredPlaylists
      : featuredPlaylists.filter((playlist) => playlist.genre === activeGenre);

  const filteredRecommendedTracks =
    activeGenre === "all"
      ? recommendedTracks
      : recommendedTracks.filter((track) => track.genre === activeGenre);

  const filteredTrendingArtists =
    activeGenre === "all"
      ? trendingArtists
      : trendingArtists.filter((artist) => artist.genre === activeGenre);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <section className="discover-page">
      <Navbar />
      <div className="dashboard-container">
        <Sidebar />

        <div className="main-content">
          <div className="discover-header">
            <h1>Discover New Music</h1>
            <p>
              Explore the latest tracks, albums, and artists tailored for you
            </p>
          </div>

          {/* Genre Filter */}
          <div className="genre-filter">
            <div className="genre-scroll">
              {genres.map((genre) => (
                <button
                  key={genre.id}
                  className={`genre-button ${
                    activeGenre === genre.id ? "active" : ""
                  }`}
                  onClick={() => setActiveGenre(genre.id)}
                >
                  {genre.name}
                </button>
              ))}
            </div>
          </div>

          {/* New Releases Section */}
          <div className="section">
            <div className="section-header">
              <h2>New Releases</h2>
              <Link to="/new-releases">
                <button className="view-all">View All</button>
              </Link>
            </div>
            <div className="album-grid">
              {filteredNewReleases.map((album) => (
                <div className="album-card" key={album.id}>
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

          {/* Featured Playlists Section */}
          <div className="section">
            <div className="section-header">
              <h2>Featured Playlists</h2>
              <Link to="/featured-playlists">
                <button className="view-all">View All</button>
              </Link>
            </div>
            <div className="playlist-grid">
              {filteredFeaturedPlaylists.map((playlist) => (
                <div className="playlist-card" key={playlist.id}>
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

          {/* Recommended Tracks Section */}
          <div className="section">
            <div className="section-header">
              <h2>Recommended For You</h2>
              <Link to="/recommended-for-you">
                <button className="view-all">View All</button>
              </Link>
            </div>
            <div className="tracks-list">
              {filteredRecommendedTracks.map((track) => (
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
                    <span className="track-duration">{track.duration}</span>
                  </div>
                  <div className="track-actions">
                    <button className="action-button">
                      <FaPlay />
                    </button>
                    <button className="action-button">
                      <FaHeart />
                    </button>
                    <button className="action-button">
                      <FaEllipsisH />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Artists Section */}
          <div className="section">
            <div className="section-header">
              <h2>Trending Artists</h2>
              <Link to="/trending-artists">
                <button className="view-all">View All</button>
              </Link>
            </div>
            <div className="artists-grid">
              {filteredTrendingArtists.map((artist) => (
                <div className="artist-card" key={artist.id}>
                  <div className="artist-avatar">
                    <img src={artist.cover} alt={artist.name} />
                  </div>
                  <div className="artist-info">
                    <h3>{artist.name}</h3>
                    <p>{artist.followers} followers</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Discovery Features */}
          <div className="section">
            <h2>More Ways to Discover</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <FaRandom />
                </div>
                <h3>Radio Stations</h3>
                <p>Endless music based on your favorite artists and genres</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <FaChartLine />
                </div>
                <h3>Charts</h3>
                <p>See what's trending worldwide and in your country</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DiscoverPage;
