import { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Sidebar from "../../../components/Sidebar/Sidebar";
import {
  FaPlay,
  FaHeart,
  FaEllipsisH,
  FaRandom,
  FaClock,
  FaRegHeart,
  FaRegClock,
} from "react-icons/fa";
import { BsFillPlayFill, BsThreeDots } from "react-icons/bs";
import { IoMdShare } from "react-icons/io";
import "./PlaylistPage.scss";

function PlaylistPage() {
  const [playlist, setPlaylist] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [currentPlaying, setCurrentPlaying] = useState(null);

  useEffect(() => {
    setPlaylist({
      id: "pl1",
      title: "Chill Vibes",
      description:
        "Your perfect soundtrack for relaxing evenings and lazy weekends",
      cover: "/images/playlists/chill-vibes.jpg",
      owner: "Spotify",
      followers: "1,245,678",
      duration: "4h 22m",
      tracks: 62,
      public: true,
      collaborative: false,
      tracksList: [
        {
          id: "t1",
          title: "Sunset Memories",
          artist: "The Midnight",
          album: "Endless Summer",
          duration: "3:45",
          cover: "/images/covers/sunset-memories.jpg",
          added: "2 weeks ago",
          liked: true,
        },
        // ... other tracks (same as before)
      ],
    });
  }, []);

  const handlePlayTrack = (trackId) => {
    setCurrentPlaying(trackId);
  };

  const toggleLikeTrack = (trackId) => {
    setPlaylist((prev) => ({
      ...prev,
      tracksList: prev.tracksList.map((track) =>
        track.id === trackId ? { ...track, liked: !track.liked } : track
      ),
    }));
  };

  const toggleFollowPlaylist = () => {
    setIsFollowing(!isFollowing);
  };

  if (!playlist) {
    return <div>Loading...</div>;
  }

  return (
    <div className="playlist-page">
      <Navbar />
      <div className="dashboard-container">
        <Sidebar />

        <div className="main-content">
          {/* Playlist Header */}
          <div className="playlist-header">
            <div className="playlist-cover-container">
              <img
                src={playlist.cover}
                alt={playlist.title}
                className="playlist-cover"
              />
            </div>
            <div className="playlist-info">
              <div className="playlist-type">Playlist</div>
              <h1>{playlist.title}</h1>
              <p className="playlist-description">{playlist.description}</p>

              <div className="playlist-meta">
                <span className="owner">{playlist.owner}</span>
                <span className="followers">
                  {playlist.followers} followers
                </span>
                <span className="tracks">{playlist.tracks} songs</span>
                <span className="duration">{playlist.duration}</span>
              </div>

              <div className="playlist-actions">
                <button className="play-button">
                  <BsFillPlayFill /> Play
                </button>
                <button
                  className={`follow-button ${isFollowing ? "following" : ""}`}
                  onClick={toggleFollowPlaylist}
                >
                  {isFollowing ? "Following" : "Follow"}
                </button>
                <button className="action-button">
                  <IoMdShare />
                </button>
                <button className="action-button">
                  <BsThreeDots />
                </button>
              </div>
            </div>
          </div>

          {/* Tracks List */}
          <div className="content-section">
            <div className="tracks-list">
              <div className="tracks-header">
                <div className="index">#</div>
                <div className="title">Title</div>
                <div className="album">Album</div>
                <div className="added">Date Added</div>
                <div className="duration">
                  <FaRegClock />
                </div>
              </div>

              {playlist.tracksList.map((track, index) => (
                <div
                  className={`track-item ${
                    currentPlaying === track.id ? "playing" : ""
                  }`}
                  key={track.id}
                  onClick={() => handlePlayTrack(track.id)}
                >
                  <div className="index">
                    {currentPlaying === track.id ? (
                      <FaPlay className="playing-icon" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
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
                  <div className="album">{track.album}</div>
                  <div className="added">{track.added}</div>
                  <div className="track-meta">
                    <span className="track-duration">{track.duration}</span>
                    <button
                      className={`action-button like-button ${
                        track.liked ? "liked" : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLikeTrack(track.id);
                      }}
                    >
                      {track.liked ? <FaHeart /> : <FaRegHeart />}
                    </button>
                    <button className="action-button">
                      <FaEllipsisH />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* More by Creator */}
          <div className="content-section">
            <h2>More by {playlist.owner}</h2>
            <div className="playlist-grid">
              {[1, 2, 3, 4].map((i) => (
                <div className="playlist-item" key={i}>
                  <div className="playlist-cover">
                    <img
                      src={`/images/playlists/similar-${i}.jpg`}
                      alt={`Similar Playlist ${i}`}
                    />
                    <button className="play-overlay">
                      <FaPlay />
                    </button>
                  </div>
                  <div className="playlist-info">
                    <h3>{`${playlist.owner}'s ${
                      i === 1
                        ? "Morning"
                        : i === 2
                        ? "Workout"
                        : i === 3
                        ? "Focus"
                        : "Party"
                    } Mix`}</h3>
                    <p>
                      {i === 1
                        ? "Wake up with these fresh tunes"
                        : i === 2
                        ? "High energy tracks for your workout"
                        : i === 3
                        ? "Concentration enhancing beats"
                        : "Dance the night away"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* You Might Also Like */}
          <div className="content-section">
            <h2>You might also like</h2>
            <div className="playlist-grid">
              {[1, 2, 3, 4].map((i) => (
                <div className="playlist-item" key={i}>
                  <div className="playlist-cover">
                    <img
                      src={`/images/playlists/recommended-${i}.jpg`}
                      alt={`Recommended Playlist ${i}`}
                    />
                    <button className="play-overlay">
                      <FaPlay />
                    </button>
                  </div>
                  <div className="playlist-info">
                    <h3>
                      {i === 1
                        ? "Lofi Beats"
                        : i === 2
                        ? "Acoustic Morning"
                        : i === 3
                        ? "Deep Focus"
                        : "Chillhop Essentials"}
                    </h3>
                    <p>
                      {i === 1
                        ? "Chill beats to relax/study to"
                        : i === 2
                        ? "Soft acoustic songs for your morning"
                        : i === 3
                        ? "Music to help you concentrate"
                        : "Chillhop music for your day"}
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

export default PlaylistPage;
