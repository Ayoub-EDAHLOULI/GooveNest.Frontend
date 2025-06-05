import "./HomePage.scss";
import Navbar from "../../../components/Navbar/Navbar";
import Sidebar from "../../../components/Sidebar/Sidebar";

function HomePage() {
  return (
    <section className="home-page">
      <Navbar />
      <div className="dashboard-container">
        {/* Main Content */}
        <Sidebar />

        <div className="main-content">
          <div className="welcome-message">
            <h1>Welcome to GrooveNest</h1>
            <p>Your personal music space.</p>
          </div>

          <div className="featured-content">
            <h2>Featured Playlists</h2>
            {/* Placeholder for featured playlists */}
            <div className="playlist-grid">
              {/* Example playlist item */}
              <div className="playlist-item">
                <img src="/path/to/playlist-image.jpg" alt="Playlist" />
                <h3>Chill Vibes</h3>
              </div>
              {/* Repeat for more playlists */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
