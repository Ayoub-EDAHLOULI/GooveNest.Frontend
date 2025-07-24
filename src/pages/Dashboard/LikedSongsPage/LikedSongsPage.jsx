import { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Sidebar from "../../../components/Sidebar/Sidebar";
import {
  FaPlay,
  FaHeart,
  FaEllipsisH,
  FaClock,
  FaRandom,
  FaRedo,
} from "react-icons/fa";
import { BsFillPlayFill, BsThreeDots } from "react-icons/bs";
import { IoMdShare } from "react-icons/io";
import "./LikedSongsPage.scss";

function LikedSongsPage() {
  const [likedSongs, setLikedSongs] = useState([]);
  const [currentPlaying, setCurrentPlaying] = useState(null);
  const [totalDuration, setTotalDuration] = useState("0 min");

  useEffect(() => {
    // Mock data - replace with API call
    const mockLikedSongs = [
      {
        id: "s1",
        title: "Blinding Lights",
        artist: "The Weeknd",
        album: "After Hours",
        duration: "3:20",
        cover: "/images/covers/after-hours.jpg",
        added: "2 days ago",
      },
      {
        id: "s2",
        title: "Save Your Tears",
        artist: "The Weeknd",
        album: "After Hours",
        duration: "3:35",
        cover: "/images/covers/after-hours.jpg",
        added: "1 week ago",
      },
      {
        id: "s3",
        title: "Levitating",
        artist: "Dua Lipa",
        album: "Future Nostalgia",
        duration: "3:23",
        cover: "/images/covers/future-nostalgia.jpg",
        added: "3 days ago",
      },
      {
        id: "s4",
        title: "Don't Start Now",
        artist: "Dua Lipa",
        album: "Future Nostalgia",
        duration: "3:03",
        cover: "/images/covers/future-nostalgia.jpg",
        added: "2 weeks ago",
      },
      {
        id: "s5",
        title: "Watermelon Sugar",
        artist: "Harry Styles",
        album: "Fine Line",
        duration: "2:54",
        cover: "/images/covers/fine-line.jpg",
        added: "5 days ago",
      },
      {
        id: "s6",
        title: "Adore You",
        artist: "Harry Styles",
        album: "Fine Line",
        duration: "3:27",
        cover: "/images/covers/fine-line.jpg",
        added: "1 month ago",
      },
      {
        id: "s7",
        title: "Circles",
        artist: "Post Malone",
        album: "Hollywood's Bleeding",
        duration: "3:35",
        cover: "/images/covers/hollywoods-bleeding.jpg",
        added: "3 weeks ago",
      },
      {
        id: "s8",
        title: "Sunflower",
        artist: "Post Malone, Swae Lee",
        album: "Spider-Man: Into the Spider-Verse",
        duration: "2:38",
        cover: "/images/covers/spiderman.jpg",
        added: "2 months ago",
      },
    ];

    setLikedSongs(mockLikedSongs);
    // Calculate total duration
    const totalMinutes = mockLikedSongs.reduce((total, song) => {
      const [mins, secs] = song.duration.split(":").map(Number);
      return total + mins + secs / 60;
    }, 0);
    setTotalDuration(`${Math.round(totalMinutes)} min`);
  }, []);

  const handlePlaySong = (songId) => {
    setCurrentPlaying(songId === currentPlaying ? null : songId);
  };

  const handleUnlikeSong = (songId) => {
    setLikedSongs((prev) => prev.filter((song) => song.id !== songId));
  };

  const handlePlayAll = () => {
    // Play all liked songs
    if (likedSongs.length > 0) {
      setCurrentPlaying(likedSongs[0].id);
    }
  };

  return (
    <div className="liked-songs-page">
      <Navbar />
      <div className="dashboard-container">
        <Sidebar />

        <div className="main-content">
          {/* Liked Songs Header */}
          <div className="liked-songs-header">
            <div className="liked-songs-cover">
              <div className="cover-content">
                <span className="heart-icon">❤️</span>
                <h1>Liked Songs</h1>
              </div>
            </div>
            <div className="liked-songs-info">
              <div className="playlist-type">PLAYLIST</div>
              <h1>Liked Songs</h1>
              <p className="playlist-description">
                {likedSongs.length} songs • {totalDuration}
              </p>

              <div className="playlist-actions">
                <button className="play-button" onClick={handlePlayAll}>
                  <BsFillPlayFill /> Play
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

          {/* Playlist Controls */}
          <div className="playlist-controls">
            <button
              className="control-button play-large"
              onClick={handlePlayAll}
            >
              <FaPlay /> Play
            </button>
            <button className="control-button">
              <FaRandom />
            </button>
          </div>

          {/* Tracks List */}
          <div className="tracks-container">
            <div className="tracks-header">
              <div className="index">#</div>
              <div className="title">Title</div>
              <div className="album">Album</div>
              <div className="added">Date Added</div>
              <div className="duration">
                <FaClock />
              </div>
            </div>

            {likedSongs.map((song, index) => (
              <div
                className={`track-row ${
                  currentPlaying === song.id ? "playing" : ""
                }`}
                key={song.id}
                onClick={() => handlePlaySong(song.id)}
              >
                <div className="index">
                  {currentPlaying === song.id ? (
                    <FaPlay className="playing-icon" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <div className="title">
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
                <div className="album">{song.album}</div>
                <div className="added">{song.added}</div>
                <div className="duration">
                  <span>{song.duration}</span>
                  <button
                    className="like-button liked"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUnlikeSong(song.id);
                    }}
                  >
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
      </div>
    </div>
  );
}

export default LikedSongsPage;
