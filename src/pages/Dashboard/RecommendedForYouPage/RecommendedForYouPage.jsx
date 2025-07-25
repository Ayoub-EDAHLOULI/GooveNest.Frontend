import { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { FaPlay, FaHeart, FaEllipsisH } from "react-icons/fa";
import "./RecommendedForYouPage.scss";

function RecommendedForYouPage() {
  const [recommendations, setRecommendations] = useState({
    recentlyPlayed: [],
    basedOnArtists: [],
    basedOnTracks: [],
    newReleases: [],
    similarToPlaylists: [],
  });
  const [currentPlaying, setCurrentPlaying] = useState(null);

  useEffect(() => {
    // Mock data - replace with API calls
    setRecommendations({
      recentlyPlayed: [
        {
          id: "r1",
          title: "Blinding Lights",
          artist: "The Weeknd",
          cover: "/images/covers/blinding-lights.jpg",
          duration: "3:20",
          lastPlayed: "2 hours ago",
        },
        {
          id: "r2",
          title: "Save Your Tears",
          artist: "The Weeknd",
          cover: "/images/covers/save-your-tears.jpg",
          duration: "3:35",
          lastPlayed: "1 day ago",
        },
        {
          id: "r3",
          title: "Levitating",
          artist: "Dua Lipa",
          cover: "/images/covers/levitating.jpg",
          duration: "3:23",
          lastPlayed: "3 days ago",
        },
      ],
      basedOnArtists: [
        {
          id: "a1",
          title: "After Hours",
          artist: "The Weeknd",
          cover: "/images/covers/after-hours.jpg",
          type: "album",
        },
        {
          id: "a2",
          title: "Future Nostalgia",
          artist: "Dua Lipa",
          cover: "/images/covers/future-nostalgia.jpg",
          type: "album",
        },
        {
          id: "a3",
          title: "Fine Line",
          artist: "Harry Styles",
          cover: "/images/covers/fine-line.jpg",
          type: "album",
        },
      ],
      basedOnTracks: [
        {
          id: "t1",
          title: "Don't Start Now",
          artist: "Dua Lipa",
          cover: "/images/covers/dont-start-now.jpg",
          duration: "3:03",
        },
        {
          id: "t2",
          title: "Watermelon Sugar",
          artist: "Harry Styles",
          cover: "/images/covers/watermelon-sugar.jpg",
          duration: "2:54",
        },
        {
          id: "t3",
          title: "Circles",
          artist: "Post Malone",
          cover: "/images/covers/circles.jpg",
          duration: "3:35",
        },
      ],
      newReleases: [
        {
          id: "n1",
          title: "Midnights (The Til Dawn Edition)",
          artist: "Taylor Swift",
          cover: "/images/covers/midnights.jpg",
          type: "album",
          date: "2023-05-26",
        },
        {
          id: "n2",
          title: "UTOPIA",
          artist: "Travis Scott",
          cover: "/images/covers/utopia.jpg",
          type: "album",
          date: "2023-07-28",
        },
        {
          id: "n3",
          title: "Guts",
          artist: "Olivia Rodrigo",
          cover: "/images/covers/guts.jpg",
          type: "album",
          date: "2023-09-08",
        },
      ],
      similarToPlaylists: [
        {
          id: "p1",
          title: "Pop Mix",
          description: "The perfect pop playlist for any mood",
          cover: "/images/playlists/pop-mix.jpg",
          tracks: 50,
        },
        {
          id: "p2",
          title: "Chill Vibes",
          description: "Relaxing tunes for your day",
          cover: "/images/playlists/chill-vibes.jpg",
          tracks: 40,
        },
        {
          id: "p3",
          title: "Workout Energy",
          description: "High energy tracks to keep you moving",
          cover: "/images/playlists/workout-energy.jpg",
          tracks: 35,
        },
      ],
    });
  }, []);

  const handlePlayItem = (itemId) => {
    setCurrentPlaying(itemId === currentPlaying ? null : itemId);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="recommended-page">
      <Navbar />
      <div className="dashboard-container">
        <Sidebar />

        <div className="main-content">
          <div className="recommended-header">
            <h1>Recommended For You</h1>
            <p>Personalized recommendations based on your listening activity</p>
          </div>

          {/* Recently Played */}
          <div className="content-section">
            <h2>Continue Listening</h2>
            <div className="tracks-list">
              {recommendations.recentlyPlayed.map((track) => (
                <div
                  className={`track-item ${
                    currentPlaying === track.id ? "playing" : ""
                  }`}
                  key={track.id}
                  onClick={() => handlePlayItem(track.id)}
                >
                  <div className="track-info">
                    <img
                      src={track.cover}
                      alt={track.title}
                      className="track-cover"
                    />
                    <div className="track-details">
                      <h3>{track.title}</h3>
                      <p>{track.artist}</p>
                      <span className="last-played">{track.lastPlayed}</span>
                    </div>
                  </div>
                  <div className="track-meta">
                    <span className="track-duration">{track.duration}</span>
                  </div>
                  <div className="track-actions">
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

          {/* Based On Your Artists */}
          <div className="content-section">
            <h2>Based On Your Favorite Artists</h2>
            <div className="albums-grid">
              {recommendations.basedOnArtists.map((album) => (
                <div className="album-card" key={album.id}>
                  <div className="album-cover">
                    <img src={album.cover} alt={album.title} />
                    <button
                      className={`play-overlay ${
                        currentPlaying === album.id ? "playing" : ""
                      }`}
                      onClick={() => handlePlayItem(album.id)}
                    >
                      <FaPlay />
                    </button>
                  </div>
                  <div className="album-info">
                    <h3>{album.title}</h3>
                    <p>{album.artist}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Based On Your Tracks */}
          <div className="content-section">
            <h2>Similar To Your Favorite Tracks</h2>
            <div className="tracks-list">
              {recommendations.basedOnTracks.map((track) => (
                <div
                  className={`track-item ${
                    currentPlaying === track.id ? "playing" : ""
                  }`}
                  key={track.id}
                  onClick={() => handlePlayItem(track.id)}
                >
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

          {/* New Releases You Might Like */}
          <div className="content-section">
            <h2>New Releases You Might Like</h2>
            <div className="albums-grid">
              {recommendations.newReleases.map((album) => (
                <div className="album-card" key={album.id}>
                  <div className="album-cover">
                    <img src={album.cover} alt={album.title} />
                    <button
                      className={`play-overlay ${
                        currentPlaying === album.id ? "playing" : ""
                      }`}
                      onClick={() => handlePlayItem(album.id)}
                    >
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

          {/* Similar To Your Playlists */}
          <div className="content-section">
            <h2>Similar To Your Playlists</h2>
            <div className="playlists-grid">
              {recommendations.similarToPlaylists.map((playlist) => (
                <div className="playlist-card" key={playlist.id}>
                  <div className="playlist-cover">
                    <img src={playlist.cover} alt={playlist.title} />
                    <button
                      className={`play-overlay ${
                        currentPlaying === playlist.id ? "playing" : ""
                      }`}
                      onClick={() => handlePlayItem(playlist.id)}
                    >
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
        </div>
      </div>
    </div>
  );
}

export default RecommendedForYouPage;
