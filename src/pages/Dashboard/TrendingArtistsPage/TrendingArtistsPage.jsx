import { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { FaPlay, FaChartLine } from "react-icons/fa";
import { BsFillPlayFill } from "react-icons/bs";
import "./TrendingArtistsPage.scss";

function TrendingArtistsPage() {
  const [trendingArtists, setTrendingArtists] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPlaying, setCurrentPlaying] = useState(null);

  useEffect(() => {
    // Mock data - replace with API calls
    setTrendingArtists([
      {
        id: "a1",
        name: "Taylor Swift",
        cover: "/images/artists/taylor-swift.jpg",
        followers: "98.5M",
        monthlyListeners: "82.4M",
        genre: "pop",
        topTrack: "Anti-Hero",
        popularity: 100,
      },
      {
        id: "a2",
        name: "Bad Bunny",
        cover: "/images/artists/bad-bunny.jpg",
        followers: "62.3M",
        monthlyListeners: "78.1M",
        genre: "latin",
        topTrack: "Tití Me Preguntó",
        popularity: 98,
      },
      {
        id: "a3",
        name: "The Weeknd",
        cover: "/images/artists/the-weeknd.jpg",
        followers: "55.7M",
        monthlyListeners: "75.3M",
        genre: "r&b",
        topTrack: "Blinding Lights",
        popularity: 97,
      },
      {
        id: "a4",
        name: "Drake",
        cover: "/images/artists/drake.jpg",
        followers: "68.9M",
        monthlyListeners: "70.2M",
        genre: "hip-hop",
        topTrack: "God's Plan",
        popularity: 96,
      },
      {
        id: "a5",
        name: "BTS",
        cover: "/images/artists/bts.jpg",
        followers: "72.1M",
        monthlyListeners: "65.8M",
        genre: "k-pop",
        topTrack: "Dynamite",
        popularity: 95,
      },
      {
        id: "a6",
        name: "Ed Sheeran",
        cover: "/images/artists/ed-sheeran.jpg",
        followers: "112.4M",
        monthlyListeners: "60.3M",
        genre: "pop",
        topTrack: "Shape of You",
        popularity: 94,
      },
      {
        id: "a7",
        name: "Billie Eilish",
        cover: "/images/artists/billie-eilish.jpg",
        followers: "53.2M",
        monthlyListeners: "58.7M",
        genre: "alternative",
        topTrack: "bad guy",
        popularity: 93,
      },
      {
        id: "a8",
        name: "Post Malone",
        cover: "/images/artists/post-malone.jpg",
        followers: "49.8M",
        monthlyListeners: "55.1M",
        genre: "hip-hop",
        topTrack: "Sunflower",
        popularity: 92,
      },
    ]);

    setCategories([
      { id: "all", name: "All Artists" },
      { id: "pop", name: "Pop" },
      { id: "hip-hop", name: "Hip Hop" },
      { id: "r&b", name: "R&B" },
      { id: "latin", name: "Latin" },
      { id: "k-pop", name: "K-Pop" },
      { id: "alternative", name: "Alternative" },
    ]);
  }, []);

  const filteredArtists =
    activeCategory === "all"
      ? trendingArtists
      : trendingArtists.filter((artist) => artist.genre === activeCategory);

  const sortedArtists = [...filteredArtists].sort(
    (a, b) => b.popularity - a.popularity
  );

  const handlePlayArtist = (artistId) => {
    setCurrentPlaying(artistId === currentPlaying ? null : artistId);
  };

  return (
    <div className="trending-artists-page">
      <Navbar />
      <div className="dashboard-container">
        <Sidebar />

        <div className="main-content">
          <div className="trending-header">
            <h1>Trending Artists</h1>
            <p>The most popular artists right now</p>
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

          {/* Top Charts Banner */}
          <div className="charts-banner">
            <div className="charts-content">
              <div className="charts-icon">
                <FaChartLine />
              </div>
              <div className="charts-info">
                <h2>Global Top 50</h2>
                <p>The most played tracks right now</p>
              </div>
            </div>
            <button className="play-charts-button">
              <BsFillPlayFill /> Play
            </button>
          </div>

          {/* Artists Grid */}
          <div className="content-section">
            <h2>Trending Now</h2>
            <div className="artists-grid">
              {sortedArtists.map((artist) => (
                <div className="artist-card" key={artist.id}>
                  <div className="artist-cover">
                    <img src={artist.cover} alt={artist.name} />
                    <button
                      className={`play-overlay ${
                        currentPlaying === artist.id ? "playing" : ""
                      }`}
                      onClick={() => handlePlayArtist(artist.id)}
                    >
                      <FaPlay />
                    </button>
                  </div>
                  <div className="artist-info">
                    <h3>{artist.name}</h3>
                    <div className="artist-meta">
                      <span>{artist.followers} followers</span>
                      <span>{artist.monthlyListeners} monthly listeners</span>
                    </div>
                    <div className="artist-track">
                      <span>Top track:</span> {artist.topTrack}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rising Artists */}
          <div className="content-section">
            <h2>Rising Artists</h2>
            <div className="artists-list">
              {sortedArtists
                .slice()
                .reverse()
                .slice(0, 5)
                .map((artist) => (
                  <div
                    className={`artist-item ${
                      currentPlaying === artist.id ? "playing" : ""
                    }`}
                    key={`rising-${artist.id}`}
                    onClick={() => handlePlayArtist(artist.id)}
                  >
                    <div className="artist-avatar">
                      <img src={artist.cover} alt={artist.name} />
                    </div>
                    <div className="artist-details">
                      <h3>{artist.name}</h3>
                      <p>{artist.genre.toUpperCase()}</p>
                    </div>
                    <div className="artist-popularity">
                      <div
                        className="popularity-bar"
                        style={{ width: `${artist.popularity}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* By Genre */}
          <div className="content-section">
            <h2>Top By Genre</h2>
            <div className="genre-grid">
              {categories
                .filter((c) => c.id !== "all")
                .map((genre) => {
                  const topArtist = [...trendingArtists]
                    .filter((a) => a.genre === genre.id)
                    .sort((a, b) => b.popularity - a.popularity)[0];

                  return topArtist ? (
                    <div className="genre-card" key={genre.id}>
                      <div className="genre-header">
                        <h3>{genre.name}</h3>
                        <span>Top Artist</span>
                      </div>
                      <div className="genre-artist">
                        <img src={topArtist.cover} alt={topArtist.name} />
                        <div className="genre-artist-info">
                          <h4>{topArtist.name}</h4>
                          <p>{topArtist.monthlyListeners} monthly listeners</p>
                        </div>
                      </div>
                    </div>
                  ) : null;
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrendingArtistsPage;
