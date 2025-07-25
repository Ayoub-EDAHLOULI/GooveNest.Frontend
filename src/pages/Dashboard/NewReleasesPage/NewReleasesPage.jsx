import { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { FaPlay, FaHeart, FaEllipsisH } from "react-icons/fa";
import { BsFillPlayFill } from "react-icons/bs";
import "./NewReleasesPage.scss";

function NewReleasesPage() {
  const [newReleases, setNewReleases] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPlaying, setCurrentPlaying] = useState(null);

  useEffect(() => {
    // Mock data - replace with API calls
    setNewReleases([
      {
        id: "a1",
        title: "Midnights (The Til Dawn Edition)",
        artist: "Taylor Swift",
        cover: "/images/albums/midnights.jpg",
        date: "2023-05-26",
        type: "album",
        category: "pop",
      },
      {
        id: "a2",
        title: "UTOPIA",
        artist: "Travis Scott",
        cover: "/images/albums/utopia.jpg",
        date: "2023-07-28",
        type: "album",
        category: "hip-hop",
      },
      {
        id: "a3",
        title: "Guts",
        artist: "Olivia Rodrigo",
        cover: "/images/albums/guts.jpg",
        date: "2023-09-08",
        type: "album",
        category: "pop",
      },
      {
        id: "s1",
        title: "Flowers",
        artist: "Miley Cyrus",
        cover: "/images/singles/flowers.jpg",
        date: "2023-01-13",
        type: "single",
        category: "pop",
      },
      {
        id: "s2",
        title: "Kill Bill",
        artist: "SZA",
        cover: "/images/singles/kill-bill.jpg",
        date: "2023-01-10",
        type: "single",
        category: "r&b",
      },
      {
        id: "a4",
        title: "The Record",
        artist: "boygenius",
        cover: "/images/albums/the-record.jpg",
        date: "2023-03-31",
        type: "album",
        category: "indie",
      },
      {
        id: "a5",
        title: "Did You Know That There's a Tunnel Under Ocean Blvd",
        artist: "Lana Del Rey",
        cover: "/images/albums/ocean-blvd.jpg",
        date: "2023-03-24",
        type: "album",
        category: "alternative",
      },
      {
        id: "s3",
        title: "Anti-Hero",
        artist: "Taylor Swift",
        cover: "/images/singles/anti-hero.jpg",
        date: "2022-10-21",
        type: "single",
        category: "pop",
      },
    ]);

    setCategories([
      { id: "all", name: "All Releases" },
      { id: "album", name: "Albums" },
      { id: "single", name: "Singles" },
      { id: "pop", name: "Pop" },
      { id: "hip-hop", name: "Hip Hop" },
      { id: "r&b", name: "R&B" },
      { id: "indie", name: "Indie" },
      { id: "alternative", name: "Alternative" },
    ]);
  }, []);

  const filteredReleases =
    activeCategory === "all"
      ? newReleases
      : newReleases.filter(
          (release) =>
            release.type === activeCategory ||
            release.category === activeCategory
        );

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handlePlayItem = (itemId) => {
    setCurrentPlaying(itemId === currentPlaying ? null : itemId);
  };

  return (
    <div className="new-releases-page">
      <Navbar />
      <div className="dashboard-container">
        <Sidebar />

        <div className="main-content">
          <div className="new-releases-header">
            <h1>New Releases</h1>
            <p>Discover the latest music and albums</p>
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

          {/* Featured New Release */}
          {filteredReleases.length > 0 && (
            <div className="featured-release">
              <div className="featured-cover">
                <img
                  src={filteredReleases[0].cover}
                  alt={filteredReleases[0].title}
                />
                <button
                  className="play-button"
                  onClick={() => handlePlayItem(filteredReleases[0].id)}
                >
                  <BsFillPlayFill />
                </button>
              </div>
              <div className="featured-info">
                <span className="release-type">
                  {filteredReleases[0].type.toUpperCase()}
                </span>
                <h2>{filteredReleases[0].title}</h2>
                <p className="artist-name">{filteredReleases[0].artist}</p>
                <p className="release-date">
                  {formatDate(filteredReleases[0].date)}
                </p>
                <div className="featured-actions">
                  <button className="play-now-button">
                    <BsFillPlayFill /> Play Now
                  </button>
                  <button className="action-button">
                    <FaHeart />
                  </button>
                  <button className="action-button">
                    <FaEllipsisH />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* All New Releases */}
          <div className="content-section">
            <h2>All New Releases</h2>
            <div className="releases-grid">
              {filteredReleases.map((release) => (
                <div className="release-card" key={release.id}>
                  <div className="release-cover">
                    <img src={release.cover} alt={release.title} />
                    <button
                      className={`play-overlay ${
                        currentPlaying === release.id ? "playing" : ""
                      }`}
                      onClick={() => handlePlayItem(release.id)}
                    >
                      {currentPlaying === release.id ? (
                        <FaVolumeUp className="playing-icon" />
                      ) : (
                        <FaPlay />
                      )}
                    </button>
                  </div>
                  <div className="release-info">
                    <h3>{release.title}</h3>
                    <p className="artist">{release.artist}</p>
                    <div className="release-meta">
                      <span className="type">{release.type}</span>
                      <span className="date">{formatDate(release.date)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recently Played */}
          <div className="content-section">
            <h2>Recently Played New Releases</h2>
            <div className="tracks-list">
              {filteredReleases.slice(0, 5).map((release) => (
                <div
                  className={`track-item ${
                    currentPlaying === release.id ? "playing" : ""
                  }`}
                  key={`track-${release.id}`}
                  onClick={() => handlePlayItem(release.id)}
                >
                  <div className="track-info">
                    <img
                      src={release.cover}
                      alt={release.title}
                      className="track-cover"
                    />
                    <div className="track-details">
                      <h3>{release.title}</h3>
                      <p>{release.artist}</p>
                    </div>
                  </div>
                  <div className="track-meta">
                    <span className="track-duration">3:45</span>
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
        </div>
      </div>
    </div>
  );
}

export default NewReleasesPage;
