import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import Sidebar from "../../../components/Sidebar/Sidebar";
import {
  FaPlay,
  FaHeart,
  FaEllipsisH,
  FaClock,
  FaRegHeart,
  FaVolumeUp,
} from "react-icons/fa";
import { BsFillPlayFill, BsThreeDots } from "react-icons/bs";
import { IoMdShare } from "react-icons/io";
import "./PodcastDetailsPage.scss";

function PodcastDetailsPage() {
  const { id } = useParams();
  const [podcast, setPodcast] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [currentPlaying, setCurrentPlaying] = useState(null);

  useEffect(() => {
    // Mock data - replace with API call using the id parameter
    const mockPodcasts = {
      "daily-tech": {
        id: "daily-tech",
        title: "The Daily Tech",
        host: "Tech Insights Network",
        description:
          "Daily updates on the latest in technology, startups, and innovation. Join us as we explore the tech shaping our future.",
        cover: "/images/podcasts/daily-tech.jpg",
        followers: "845,321",
        episodes: 328,
        category: "Technology",
        rating: 4.8,
        episodesList: [
          {
            id: "e1",
            title: "The Future of AI in 2024",
            description:
              "Exploring the latest advancements in artificial intelligence and what to expect in the coming year.",
            duration: "42:15",
            date: "2023-11-15",
            listened: true,
            saved: false,
          },
          {
            id: "e2",
            title: "Blockchain Beyond Cryptocurrency",
            description:
              "How blockchain technology is being used in industries from healthcare to supply chain management.",
            duration: "38:52",
            date: "2023-11-08",
            listened: false,
            saved: true,
          },
          // ... more episodes
        ],
      },
      // ... more mock podcasts
    };

    setPodcast(mockPodcasts[id] || mockPodcasts["daily-tech"]);
  }, [id]);

  const handlePlayEpisode = (episodeId) => {
    setCurrentPlaying(episodeId === currentPlaying ? null : episodeId);
  };

  const toggleSaveEpisode = (episodeId) => {
    setPodcast((prev) => ({
      ...prev,
      episodesList: prev.episodesList.map((episode) =>
        episode.id === episodeId
          ? { ...episode, saved: !episode.saved }
          : episode
      ),
    }));
  };

  const toggleFollowPodcast = () => {
    setIsFollowing(!isFollowing);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (!podcast) {
    return <div>Loading...</div>;
  }

  return (
    <div className="podcast-details-page">
      <Navbar />
      <div className="dashboard-container">
        <Sidebar />

        <div className="main-content">
          {/* Podcast Header */}
          <div className="podcast-header">
            <div className="podcast-cover-container">
              <img
                src={podcast.cover}
                alt={podcast.title}
                className="podcast-cover"
              />
            </div>
            <div className="podcast-info">
              <div className="podcast-type">Podcast</div>
              <h1>{podcast.title}</h1>
              <p className="podcast-host">By {podcast.host}</p>
              <p className="podcast-description">{podcast.description}</p>

              <div className="podcast-meta">
                <span className="category">{podcast.category}</span>
                <span className="rating">⭐ {podcast.rating}</span>
                <span className="followers">{podcast.followers} followers</span>
                <span className="episodes">{podcast.episodes} episodes</span>
              </div>

              <div className="podcast-actions">
                <button className="play-button">
                  <BsFillPlayFill /> Play Latest
                </button>
                <button
                  className={`follow-button ${isFollowing ? "following" : ""}`}
                  onClick={toggleFollowPodcast}
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

          {/* Episodes List */}
          <div className="content-section">
            <h2>All Episodes</h2>
            <div className="episodes-list">
              {podcast.episodesList.map((episode, index) => (
                <div
                  className={`episode-item ${
                    currentPlaying === episode.id ? "playing" : ""
                  }`}
                  key={episode.id}
                  onClick={() => handlePlayEpisode(episode.id)}
                >
                  <div className="episode-number">
                    {currentPlaying === episode.id ? (
                      <FaVolumeUp className="playing-icon" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  <div className="episode-info">
                    <h3>{episode.title}</h3>
                    <p className="episode-description">{episode.description}</p>
                    <div className="episode-meta">
                      <span
                        className={`listened ${
                          episode.listened ? "listened-true" : ""
                        }`}
                      >
                        {episode.listened ? "Listened" : "New"}
                      </span>
                      <span className="date">{formatDate(episode.date)}</span>
                    </div>
                  </div>
                  <div className="episode-duration">
                    <span>{episode.duration}</span>
                    <button
                      className={`save-button ${episode.saved ? "saved" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSaveEpisode(episode.id);
                      }}
                    >
                      {episode.saved ? <FaHeart /> : <FaRegHeart />}
                    </button>
                    <button className="more-button">
                      <FaEllipsisH />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Similar Podcasts */}
          <div className="content-section">
            <h2>Similar Podcasts</h2>
            <div className="podcasts-grid">
              {[1, 2, 3, 4].map((i) => (
                <div className="podcast-item" key={i}>
                  <div className="podcast-cover">
                    <img
                      src={`/images/podcasts/similar-${i}.jpg`}
                      alt={`Similar Podcast ${i}`}
                    />
                    <button className="play-overlay">
                      <FaPlay />
                    </button>
                  </div>
                  <div className="podcast-info">
                    <h3>
                      {i === 1
                        ? "Tech Today"
                        : i === 2
                        ? "AI Explained"
                        : i === 3
                        ? "Future Forward"
                        : "Digital Minds"}
                    </h3>
                    <p>
                      {i === 1
                        ? "Daily tech news and analysis"
                        : i === 2
                        ? "Understanding artificial intelligence"
                        : i === 3
                        ? "Emerging technologies explored"
                        : "Conversations with tech leaders"}
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

export default PodcastDetailsPage;
