import Navbar from "../../../components/Navbar/Navbar";
import Sidebar from "../../../components/Sidebar/Sidebar";

function LibraryPage() {
  return (
    <section className="home-page">
      <Navbar />
      <div className="dashboard-container">
        <Sidebar />
        <div className="main-content">
          <h1>Your Library</h1>
          <p>Manage your music, playlists, and podcasts.</p>
          {/* Additional content can be added here */}
        </div>
      </div>
    </section>
  );
}

export default LibraryPage;
