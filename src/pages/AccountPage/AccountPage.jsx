import "./AccountPage.scss";
import {
  FaUser,
  FaMusic,
  FaFileAlt,
  FaCheckCircle,
  FaSpotify,
} from "react-icons/fa";
import { useState } from "react";

function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [artistApplication, setArtistApplication] = useState({
    stageName: "",
    bio: "",
    genres: [],
    sampleTracks: "",
    socialLinks: {
      instagram: "",
      twitter: "",
      youtube: "",
    },
    termsAccepted: false,
  });
  const [isApplicationSubmitted, setIsApplicationSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes("socialLinks.")) {
      const socialField = name.split(".")[1];
      setArtistApplication((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialField]: value,
        },
      }));
    } else {
      setArtistApplication((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleGenreToggle = (genre) => {
    setArtistApplication((prev) => {
      if (prev.genres.includes(genre)) {
        return {
          ...prev,
          genres: prev.genres.filter((g) => g !== genre),
        };
      } else {
        return {
          ...prev,
          genres: [...prev.genres, genre],
        };
      }
    });
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    console.log("Artist application submitted:", artistApplication);
    // Here you would typically send the data to your backend
    setIsApplicationSubmitted(true);
  };

  return (
    <div className="account-page">
      <div className="account-header">
        <div className="account-avatar">
          <FaUser className="avatar-icon" />
        </div>
        <div className="account-info">
          <h1>User Profile</h1>
          <p>Free Account</p>
          <button className="upgrade-btn">Upgrade to Premium</button>
        </div>
      </div>

      <div className="account-tabs">
        <button
          className={`tab-btn ${activeTab === "profile" ? "active" : ""}`}
          onClick={() => setActiveTab("profile")}
        >
          <FaUser className="tab-icon" /> Profile
        </button>
        <button
          className={`tab-btn ${activeTab === "settings" ? "active" : ""}`}
          onClick={() => setActiveTab("settings")}
        >
          <FaUser className="tab-icon" /> Settings
        </button>
        <button
          className={`tab-btn ${activeTab === "artist" ? "active" : ""}`}
          onClick={() => setActiveTab("artist")}
        >
          <FaMusic className="tab-icon" /> Become an Artist
        </button>
      </div>

      <div className="account-content">
        {activeTab === "profile" && (
          <div className="profile-section">
            <h2>Your Profile</h2>
            <div className="profile-details">
              <div className="detail-item">
                <span className="detail-label">Username:</span>
                <span className="detail-value">music_lover123</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Email:</span>
                <span className="detail-value">user@example.com</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Account Created:</span>
                <span className="detail-value">January 15, 2023</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Favorite Genres:</span>
                <span className="detail-value">Pop, Rock, Electronic</span>
              </div>
            </div>

            <div className="stats-section">
              <h3>Your Stats</h3>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-number">1,247</div>
                  <div className="stat-label">Songs Played</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">42</div>
                  <div className="stat-label">Playlists</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">87</div>
                  <div className="stat-label">Following</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">156</div>
                  <div className="stat-label">Followers</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="settings-section">
            <h2>Account Settings</h2>
            <form className="settings-form">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  defaultValue="music_lover123"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  defaultValue="user@example.com"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Change Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter new password"
                />
              </div>
              <div className="form-group">
                <label htmlFor="notifications">Email Notifications</label>
                <select id="notifications">
                  <option>Weekly digest</option>
                  <option>Monthly digest</option>
                  <option>No emails</option>
                </select>
              </div>
              <button type="submit" className="save-btn">
                Save Changes
              </button>
            </form>
          </div>
        )}

        {activeTab === "artist" && (
          <div className="artist-section">
            {isApplicationSubmitted ? (
              <div className="application-success">
                <FaCheckCircle className="success-icon" />
                <h2>Application Submitted!</h2>
                <p>
                  Thank you for applying to become an artist on GrooveNest. Our
                  team will review your application and get back to you within
                  5-7 business days.
                </p>
                <p>
                  In the meantime, you can continue enjoying GrooveNest as a
                  listener.
                </p>
              </div>
            ) : (
              <>
                <h2>Become an Artist</h2>
                <p className="artist-description">
                  Apply to distribute your music on GrooveNest and reach
                  millions of listeners worldwide. Once approved, you'll get
                  access to our artist dashboard where you can upload tracks,
                  view analytics, and manage your profile.
                </p>

                <form
                  className="artist-form"
                  onSubmit={handleSubmitApplication}
                >
                  <div className="form-group">
                    <label htmlFor="stageName">Stage Name *</label>
                    <input
                      type="text"
                      id="stageName"
                      name="stageName"
                      value={artistApplication.stageName}
                      onChange={handleInputChange}
                      required
                      placeholder="Your artist name"
                    />
                  </div>

                  <div className="form-group">
                    <label>Music Genres *</label>
                    <div className="genre-tags">
                      {[
                        "Pop",
                        "Rock",
                        "Hip Hop",
                        "Electronic",
                        "R&B",
                        "Jazz",
                        "Classical",
                        "Country",
                        "Metal",
                        "Indie",
                      ].map((genre) => (
                        <button
                          type="button"
                          key={genre}
                          className={`genre-tag ${
                            artistApplication.genres.includes(genre)
                              ? "selected"
                              : ""
                          }`}
                          onClick={() => handleGenreToggle(genre)}
                        >
                          {genre}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="bio">Artist Bio *</label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={artistApplication.bio}
                      onChange={handleInputChange}
                      required
                      placeholder="Tell us about yourself and your music"
                      rows="4"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="sampleTracks">
                      Sample Tracks (Links) *
                    </label>
                    <textarea
                      id="sampleTracks"
                      name="sampleTracks"
                      value={artistApplication.sampleTracks}
                      onChange={handleInputChange}
                      required
                      placeholder="Paste links to your music (SoundCloud, YouTube, etc.)"
                      rows="3"
                    />
                  </div>

                  <div className="form-group">
                    <label>Social Media Links</label>
                    <input
                      type="text"
                      placeholder="Instagram"
                      name="socialLinks.instagram"
                      value={artistApplication.socialLinks.instagram}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      placeholder="Twitter/X"
                      name="socialLinks.twitter"
                      value={artistApplication.socialLinks.twitter}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      placeholder="YouTube"
                      name="socialLinks.youtube"
                      value={artistApplication.socialLinks.youtube}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group checkbox-group">
                    <input
                      type="checkbox"
                      id="termsAccepted"
                      name="termsAccepted"
                      checked={artistApplication.termsAccepted}
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor="termsAccepted">
                      I agree to the GrooveNest Artist Terms and confirm that I
                      have the rights to distribute this music.
                    </label>
                  </div>

                  <button type="submit" className="submit-application-btn">
                    Submit Application
                  </button>
                </form>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountPage;
