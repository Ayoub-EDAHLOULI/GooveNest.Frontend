import { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { FaPlay, FaHeart, FaRandom } from "react-icons/fa";
import { BsFillPlayFill, BsThreeDots } from "react-icons/bs";
import { IoMdShare } from "react-icons/io";
import "./PodcastsPage.scss";

function PodcastsPage() {
  const [podcasts, setPodcasts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPlaying, setCurrentPlaying] = useState(null);

  useEffect(() => {
    // Mock data - replace with API calls
    setPodcasts([
      {
        id: "tech-talk",
        title: "Tech Talk Today",
        host: "Digital Insights",
        cover: "/images/podcasts/tech-talk.jpg",
        category: "technology",
        episodes: 142,
        followers: "1.2M",
        latestEpisode: {
          title: "The Future of AI Assistants",
          date: "2023-11-20",
          duration: "45:22",
        },
      },
      {
        id: "health-matters",
        title: "Health Matters",
        host: "Wellness Network",
        cover: "/images/podcasts/health-matters.jpg",
        category: "health",
        episodes: 89,
        followers: "856K",
        latestEpisode: {
          title: "Sleep Science Explained",
          date: "2023-11-18",
          duration: "38:15",
        },
      },
      // ... more podcasts
    ]);

    setCategories([
      { id: "all", name: "All Categories" },
      { id: "technology", name: "Technology" },
      { id: "health", name: "Health & Wellness" },
      { id: "business", name: "Business" },
      { id: "entertainment", name: "Entertainment" },
      { id: "education", name: "Education" },
      { id: "news", name: "News & Politics" },
    ]);
  }, []);

  const filteredPodcasts =
    activeCategory === "all"
      ? podcasts
      : podcasts.filter((podcast) => podcast.category === activeCategory);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="podcasts-page">
      <Navbar />
      <div className="dashboard-container">
        <Sidebar />

        <div className="main-content">
          <div className="podcasts-header">
            <h1>Podcasts</h1>
            <p>Discover and listen to your favorite podcasts</p>
          </div>

          {/* Category Filter */}
          <div className="category-filter">
            <div className="category-scroll">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`category-button ${
                    activeCategory === category.id ? "active" : ""
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Podcasts */}
          <div className="content-section">
            <h2>Featured Podcasts</h2>
            <div className="podcasts-grid">
              {filteredPodcasts.slice(0, 4).map((podcast) => (
                <div className="podcast-card" key={podcast.id}>
                  <div className="podcast-cover">
                    <img src={podcast.cover} alt={podcast.title} />
                    <button className="play-overlay">
                      <FaPlay />
                    </button>
                  </div>
                  <div className="podcast-info">
                    <h3>{podcast.title}</h3>
                    <p className="podcast-host">{podcast.host}</p>
                    <div className="podcast-meta">
                      <span>{podcast.episodes} episodes</span>
                      <span>{podcast.followers} followers</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Latest Episodes */}
          <div className="content-section">
            <h2>Latest Episodes</h2>
            <div className="episodes-list">
              {filteredPodcasts.slice(0, 5).map((podcast) => (
                <div
                  className={`episode-item ${
                    currentPlaying === podcast.id ? "playing" : ""
                  }`}
                  key={`${podcast.id}-episode`}
                  onClick={() => setCurrentPlaying(podcast.id)}
                >
                  <div className="episode-info">
                    <img
                      src={podcast.cover}
                      alt={podcast.title}
                      className="episode-cover"
                    />
                    <div className="episode-details">
                      <h3>{podcast.latestEpisode.title}</h3>
                      <p className="podcast-title">{podcast.title}</p>
                      <div className="episode-meta">
                        <span>{formatDate(podcast.latestEpisode.date)}</span>
                        <span>{podcast.latestEpisode.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="episode-actions">
                    <button className="action-button">
                      <FaHeart />
                    </button>
                    <button className="action-button">
                      <IoMdShare />
                    </button>
                    <button className="action-button">
                      <BsThreeDots />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Podcasts */}
          <div className="content-section">
            <div className="section-header">
              <h2>Popular Podcasts</h2>
              <button className="view-all">View All</button>
            </div>
            <div className="podcasts-grid">
              {filteredPodcasts.map((podcast) => (
                <div className="podcast-card" key={`popular-${podcast.id}`}>
                  <div className="podcast-cover">
                    <img src={podcast.cover} alt={podcast.title} />
                    <button className="play-overlay">
                      <FaPlay />
                    </button>
                  </div>
                  <div className="podcast-info">
                    <h3>{podcast.title}</h3>
                    <p className="podcast-host">{podcast.host}</p>
                    <div className="podcast-meta">
                      <span>{podcast.category}</span>
                      <span>{podcast.episodes} episodes</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="content-section">
            <h2>Browse Categories</h2>
            <div className="categories-grid">
              {categories
                .filter((c) => c.id !== "all")
                .map((category) => (
                  <div
                    className="category-card"
                    key={`category-${category.id}`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    <div className="category-icon">
                      {category.id === "technology" && <FaRandom />}
                      {category.id === "health" && <FaHeart />}
                      {/* Add more icons for other categories */}
                    </div>
                    <h3>{category.name}</h3>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PodcastsPage;
