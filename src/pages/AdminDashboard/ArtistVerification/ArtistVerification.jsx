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
import {
  fetchArtistApplication,
  updateArtistApplication,
} from "../../../store/Actions/artistApplicationActions";
import Swal from "sweetalert2";

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

  const confirmApproval = (id) => {
    Swal.fire({
      title: "Approve this artist?",
      text: "Are you sure you want to approve this artist application?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve",
    }).then((result) => {
      if (result.isConfirmed) {
        var applicationData = {
          id: id,
          status: 1, // 1 for approved
        };

        dispatch(updateArtistApplication(applicationData))
          .then(() => {
            Swal.fire({
              title: "Approved!",
              text: "The artist application has been approved.",
              icon: "success",
            });

            // Fetch updated applications
            dispatch(fetchArtistApplication());
          })
          .catch((error) => {
            Swal.fire({
              title: "Error!",
              text:
                error.message || "Failed to approve the artist application.",
              icon: "error",
            });
          });
      }
    });
  };

  const confirmRejection = (id) => {
    Swal.fire({
      title: "Reject this artist?",
      text: "You can later provide a rejection reason.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, reject",
    }).then((result) => {
      if (result.isConfirmed) {
        // Show a second popup to ask for rejection reason
        Swal.fire({
          title: "Rejection Reason",
          input: "textarea",
          inputLabel: "Why are you rejecting this artist?",
          inputPlaceholder: "Type your reason here...",
          inputAttributes: {
            "aria-label": "Rejection reason",
          },
          showCancelButton: true,
        }).then((RejectionReason) => {
          if (RejectionReason.isConfirmed) {
            const reason = RejectionReason.value || "No reason provided";
            // You can dispatch rejection here with reason

            var applicationData = {
              id: id,
              status: 2, // 2 for rejected
              rejectionReason: reason,
            };

            dispatch(updateArtistApplication(applicationData))
              .then(() => {
                // Fetch updated applications
                dispatch(fetchArtistApplication());
              })
              .catch((error) => {
                Swal.fire({
                  title: "Error!",
                  text:
                    error.message || "Failed to reject the artist application.",
                  icon: "error",
                });
              });
            // Show success message
            Swal.fire(
              "Rejected!",
              "The artist application has been rejected.",
              "success"
            );
          }
        });
      }
    });
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
                    onClick={() => confirmApproval(app.id)}
                  >
                    <FaCheck /> Approve
                  </button>
                  <button
                    className="reject-btn"
                    onClick={() => confirmRejection(app.id)}
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
