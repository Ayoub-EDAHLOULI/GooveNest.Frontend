import "./ArtistVerification.scss";
import { useState, useEffect } from "react";
import {
  FaCheck,
  FaTimes,
  FaSearch,
  FaMusic,
  FaEnvelope,
  FaLink,
  FaClock,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchArtistApplication } from "../../../store/Actions/artistApplicationActions";

function ArtistVerification() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all"); // 'all', 'pending', 'approved', 'rejected'

  const dispatch = useDispatch();
  const artistApplications = useSelector(
    (state) => state.artistApplication.paginatedArtistApplications
  );

  // Fetch artist applications on component mount
  useEffect(() => {
    dispatch(fetchArtistApplication());
  }, [dispatch]);

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
        {artistApplications.length > 0 ? (
          artistApplications.map((app) => (
            <div className={`application-card ${app.status}`} key={app.id}>
              <div className="card-header">
                <div className="artist-info">
                  <div className="avatar">
                    <FaMusic />
                  </div>
                  <div className="details">
                    <h3>{app.stageName}</h3>
                    <div className="meta">
                      <span className="email">
                        <FaEnvelope /> {app.email}
                      </span>
                      <span className="date">
                        <FaClock /> Submitted: {formatDate(app.submittedAt)}
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
                  {app.status === 0 && "Pending Review"}
                  {app.status === 1 && "Approved"}
                  {app.status === 2 && "Rejected"}
                </div>
              </div>

              <div className="card-content">
                <div className="section">
                  <h4>Genres</h4>
                  <div className="genres">
                    {app.musicGenres.map((genre) => (
                      <span key={genre} className="genre-tag">
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="section">
                  <h4>Bio</h4>
                  <p>{app.artistBio || "No bio provided"}</p>
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
                  {app.sampleTrackLinks.length > 0 ? (
                    <ul className="sample-tracks">
                      {app.sampleTrackLinks.map((track, index) => (
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

                {app.status === 2 && app.rejectionReason && (
                  <div className="section rejection-reason">
                    <h4>Rejection Reason</h4>
                    <p>{app.rejectionReason}</p>
                  </div>
                )}
              </div>

              {app.status === 0 && (
                <div className="card-actions">
                  <button
                    className="approve-btn"
                    onClick={() => console.log(`Approve ${app.id}`)}
                  >
                    <FaCheck /> Approve
                  </button>
                  <button
                    className="reject-btn"
                    onClick={() => console.log(`Reject ${app.id}`)}
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
