import "./ArtistVerification.scss";
import { useState } from "react";
import {
  FaCheck,
  FaTimes,
  FaSearch,
  FaMusic,
  FaUser,
  FaEnvelope,
  FaLink,
  FaClock,
} from "react-icons/fa";

function ArtistVerification() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all"); // 'all', 'pending', 'approved', 'rejected'

  // Mock data - replace with API calls
  const [applications, setApplications] = useState([
    {
      id: 1,
      artistName: "DJ GrooveMaster",
      email: "djgroove@example.com",
      status: "pending",
      dateSubmitted: "2023-05-15T10:30:00Z",
      genres: ["Electronic", "House"],
      socialLinks: {
        instagram: "@djgroove",
        soundcloud: "soundcloud.com/djgroove",
      },
      sampleTracks: [
        "soundcloud.com/djgroove/summer-vibes",
        "youtube.com/watch?v=djgroove-track",
      ],
      bio: "Professional DJ with 5 years of experience playing at clubs and festivals worldwide.",
    },
    {
      id: 2,
      artistName: "Melody Queen",
      email: "melody@example.com",
      status: "pending",
      dateSubmitted: "2023-05-18T14:45:00Z",
      genres: ["Pop", "R&B"],
      socialLinks: {
        instagram: "@melodyqueen",
        youtube: "youtube.com/melodyqueen",
      },
      sampleTracks: [
        "youtube.com/watch?v=melody-hit",
        "spotify.com/track/melody-song",
      ],
      bio: "Singer-songwriter creating heartfelt pop and R&B music.",
    },
    {
      id: 3,
      artistName: "Rock Band",
      email: "rockband@example.com",
      status: "approved",
      dateSubmitted: "2023-05-10T09:15:00Z",
      dateReviewed: "2023-05-12T16:20:00Z",
      genres: ["Rock", "Alternative"],
      socialLinks: {
        facebook: "facebook.com/rockband",
        twitter: "@rockband",
      },
      sampleTracks: [
        "bandcamp.com/rockband/album",
        "soundcloud.com/rockband/track",
      ],
      bio: "High-energy rock band touring nationally.",
    },
    {
      id: 4,
      artistName: "Invalid Artist",
      email: "invalid@example.com",
      status: "rejected",
      dateSubmitted: "2023-05-05T11:20:00Z",
      dateReviewed: "2023-05-07T10:10:00Z",
      rejectionReason: "Insufficient evidence of musical work",
      genres: ["Hip Hop"],
      socialLinks: {},
      sampleTracks: [],
      bio: "",
    },
  ]);

  // Filter and search applications
  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.artistName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || app.status === filter;
    return matchesSearch && matchesFilter;
  });

  // Handle application review
  const handleApprove = (id) => {
    setApplications(
      applications.map((app) =>
        app.id === id
          ? {
              ...app,
              status: "approved",
              dateReviewed: new Date().toISOString(),
            }
          : app
      )
    );
  };

  const handleReject = (id) => {
    const reason = prompt("Please enter rejection reason:");
    if (reason) {
      setApplications(
        applications.map((app) =>
          app.id === id
            ? {
                ...app,
                status: "rejected",
                dateReviewed: new Date().toISOString(),
                rejectionReason: reason,
              }
            : app
        )
      );
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="artist-verification">
      <h1>Artist Verification</h1>

      <div className="controls">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search artists..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filters">
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Applications</option>
            <option value="pending">Pending Review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="applications-list">
        {filteredApplications.length > 0 ? (
          filteredApplications.map((app) => (
            <div className={`application-card ${app.status}`} key={app.id}>
              <div className="card-header">
                <div className="artist-info">
                  <div className="avatar">
                    <FaMusic />
                  </div>
                  <div className="details">
                    <h3>{app.artistName}</h3>
                    <div className="meta">
                      <span className="email">
                        <FaEnvelope /> {app.email}
                      </span>
                      <span className="date">
                        <FaClock /> Submitted: {formatDate(app.dateSubmitted)}
                      </span>
                      {app.dateReviewed && (
                        <span className="date">
                          <FaClock /> Reviewed: {formatDate(app.dateReviewed)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="status-badge">
                  {app.status === "pending" && "Pending Review"}
                  {app.status === "approved" && "Approved"}
                  {app.status === "rejected" && "Rejected"}
                </div>
              </div>

              <div className="card-content">
                <div className="section">
                  <h4>Genres</h4>
                  <div className="genres">
                    {app.genres.map((genre) => (
                      <span key={genre} className="genre-tag">
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="section">
                  <h4>Bio</h4>
                  <p>{app.bio || "No bio provided"}</p>
                </div>

                <div className="section">
                  <h4>Social Links</h4>
                  {Object.keys(app.socialLinks).length > 0 ? (
                    <div className="social-links">
                      {Object.entries(app.socialLinks).map(
                        ([platform, link]) => (
                          <a
                            key={platform}
                            href={`https://${link}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link"
                          >
                            <FaLink /> {platform}: {link}
                          </a>
                        )
                      )}
                    </div>
                  ) : (
                    <p>No social links provided</p>
                  )}
                </div>

                <div className="section">
                  <h4>Sample Tracks</h4>
                  {app.sampleTracks.length > 0 ? (
                    <ul className="sample-tracks">
                      {app.sampleTracks.map((track, index) => (
                        <li key={index}>
                          <a
                            href={`https://${track}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaMusic /> Sample Track {index + 1}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No sample tracks provided</p>
                  )}
                </div>

                {app.status === "rejected" && app.rejectionReason && (
                  <div className="section rejection-reason">
                    <h4>Rejection Reason</h4>
                    <p>{app.rejectionReason}</p>
                  </div>
                )}
              </div>

              {app.status === "pending" && (
                <div className="card-actions">
                  <button
                    className="approve-btn"
                    onClick={() => handleApprove(app.id)}
                  >
                    <FaCheck /> Approve
                  </button>
                  <button
                    className="reject-btn"
                    onClick={() => handleReject(app.id)}
                  >
                    <FaTimes /> Reject
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="no-results">
            No artist applications found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
}

export default ArtistVerification;
