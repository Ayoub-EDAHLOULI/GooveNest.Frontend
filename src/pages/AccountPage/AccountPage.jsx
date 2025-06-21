import "./AccountPage.scss";
import { FaUser, FaMusic, FaCheckCircle } from "react-icons/fa";
import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllGenres } from "../../store/Actions/genreActions";
import {
  createArtistApplication,
  fetchArtistApplicationsForUser,
} from "../../store/Actions/artistApplicationActions";
import { validationArtistApplication } from "../../validations/validations";
import { ToastContext } from "../../context/ToastContext";
import { fetchUserById, updateUser } from "../../store/Actions/userActions";

function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [artistApplication, setArtistApplication] = useState({
    stageName: "",
    artistBio: "",
    musicGenres: [],
    sampleTrackLinks: [],
    instagramUrl: "",
    twitterUrl: "",
    youTubeUrl: "",
    userId: null,
    termsAccepted: false,
  });
  const [sampleTrackInput, setSampleTrackInput] = useState("");
  const [isApplicationSubmitted, setIsApplicationSubmitted] = useState(false);
  const [
    validationArtistApplicationErrors,
    setValidationArtistApplicationErrors,
  ] = useState({});
  const [userSettings, setUserSettings] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genre.allGenres || []);
  const userArtistApplication = useSelector(
    (state) => state.artistApplication.userApplication
  );
  const singleUser = useSelector((state) => state.user.singleUser);

  const { notify } = useContext(ToastContext);

  // Fetch genres on component mount
  useEffect(() => {
    dispatch(fetchAllGenres());
  }, [dispatch]);

  // Fetch artist applications for the current user
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      dispatch(fetchArtistApplicationsForUser(user.id));
    }
  }, [dispatch]);

  useEffect(() => {
    if (userArtistApplication) {
      setIsApplicationSubmitted(true);
    }
  }, [userArtistApplication]);

  // Fetch user artist application if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setArtistApplication((prev) => ({
          ...prev,
          userId: user.id || null,
        }));
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
      }
    }
  }, []);

  // Fetch user by ID when component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      dispatch(fetchUserById(user.id));
    }
  }, [dispatch]);

  // Update user settings when singleUser changes
  useEffect(() => {
    if (singleUser?.userDetails) {
      setUserSettings((prev) => ({
        ...prev,
        userName: singleUser.userDetails.userName || "",
        email: singleUser.userDetails.email || "",
      }));
    }
  }, [singleUser]);

  // Handle User Settings Change
  const handleSettingsChange = (e) => {
    const { name, value } = e.target;
    setUserSettings((prev) => ({ ...prev, [name]: value }));
  };

  // Handle User Settings Submit
  const handleSettingsSubmit = (e) => {
    e.preventDefault();

    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    const user = JSON.parse(storedUser);
    const userId = user.id;

    dispatch(updateUser(userId, userSettings))
      .then(() => {
        notify("User settings updated successfully!", "success");
      })
      .catch((error) => {
        notify(
          `Failed to update settings: ${error.message || "Unknown error"}`,
          "error"
        );
      });
  };

  // Handle Input Channge for User Application Form
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Clear the specific field error when user starts typing
    setValidationArtistApplicationErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[name];
      return newErrors;
    });

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

  // Handle genre toggle for artist application
  const handleGenreToggle = (genreName) => {
    setArtistApplication((prev) => {
      const updatedGenres = prev.musicGenres.includes(genreName)
        ? prev.musicGenres.filter((g) => g !== genreName)
        : [...prev.musicGenres, genreName];

      return {
        ...prev,
        musicGenres: updatedGenres,
      };
    });

    // Clear the musicGenres error when user selects a genre
    setValidationArtistApplicationErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors.musicGenres;
      return newErrors;
    });
  };

  // Handle adding a sample track link
  const handleAddSampleTrackLink = () => {
    if (sampleTrackInput.trim() !== "") {
      setArtistApplication((prev) => ({
        ...prev,
        sampleTrackLinks: [...prev.sampleTrackLinks, sampleTrackInput.trim()],
      }));
      setSampleTrackInput("");
    }
  };

  // Handle removing a sample track link
  const handleRemoveSampleTrackLink = (indexToRemove) => {
    setArtistApplication((prev) => ({
      ...prev,
      sampleTrackLinks: prev.sampleTrackLinks.filter(
        (_, i) => i !== indexToRemove
      ),
    }));
  };

  // Handle form submission for artist application
  const handleSubmitApplication = (e) => {
    e.preventDefault();

    // Validate the application form
    const validationErrors = validationArtistApplication(artistApplication);
    if (!validationErrors.valid) {
      setValidationArtistApplicationErrors(validationErrors.errors);
      return;
    }

    // Here you would typically send the data to your backend
    dispatch(createArtistApplication(artistApplication))
      .then(() => {
        notify("Artist application submitted successfully!", "success");
        setIsApplicationSubmitted(true);
        setArtistApplication({
          stageName: "",
          artistBio: "",
          musicGenres: [],
          sampleTrackLinks: [],
          instagramUrl: "",
          twitterUrl: "",
          youTubeUrl: "",
          userId: artistApplication.userId, // Keep the userId
          termsAccepted: false,
        });
        setValidationArtistApplicationErrors({});
      })
      .catch((error) => {
        notify(
          `Failed to submit application: ${error.message || "Unknown error"}`,
          "error"
        );
      });
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
                <span className="detail-value">
                  {singleUser?.userDetails?.userName}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Email:</span>
                <span className="detail-value">
                  {singleUser?.userDetails?.email}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Account Created:</span>
                <span className="detail-value">
                  {new Date(
                    singleUser?.userDetails?.createdAt
                  ).toLocaleDateString()}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Favorite Genres:</span>
                <span className="detail-value">
                  {singleUser?.userDetails?.favoriteGenres
                    ?.map((genre) => genre.name)
                    .join(", ") || "None"}
                </span>
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
                  <div className="stat-number">
                    {singleUser?.totalPlaylists || 0}
                  </div>
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
            <form className="settings-form" onSubmit={handleSettingsSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="userName"
                  value={userSettings.userName}
                  onChange={handleSettingsChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userSettings.email}
                  onChange={handleSettingsChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Change Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={userSettings.password}
                  onChange={handleSettingsChange}
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
                      placeholder="Your artist name"
                    />
                    {validationArtistApplicationErrors.stageName && (
                      <span className="error-message">
                        {validationArtistApplicationErrors.stageName}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Music Genres *</label>
                    <div className="genre-tags">
                      {genres.map((genre) => (
                        <button
                          type="button"
                          key={genre.id}
                          className={`genre-tag ${
                            artistApplication.musicGenres.includes(genre.name)
                              ? "selected"
                              : ""
                          }`}
                          onClick={() => handleGenreToggle(genre.name)}
                        >
                          {genre.name}
                        </button>
                      ))}
                    </div>
                    {validationArtistApplicationErrors.musicGenres && (
                      <span className="error-message">
                        {validationArtistApplicationErrors.musicGenres}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="artistBio">Artist Bio *</label>
                    <textarea
                      id="artistBio"
                      name="artistBio"
                      value={artistApplication.artistBio}
                      onChange={handleInputChange}
                      placeholder="Tell us about yourself and your music"
                      rows="4"
                    />
                    {validationArtistApplicationErrors.artistBio && (
                      <span className="error-message">
                        {validationArtistApplicationErrors.artistBio}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="sampleTrackLinks">
                      Sample Track Links *
                    </label>
                    <div className="sample-track-input-wrapper">
                      <input
                        type="text"
                        id="sampleTrackLinks"
                        name="sampleTrackLinks"
                        placeholder="Enter track URL"
                        value={sampleTrackInput}
                        onChange={(e) => setSampleTrackInput(e.target.value)}
                      />
                      <button
                        type="button"
                        className="add-track-btn"
                        onClick={handleAddSampleTrackLink}
                      >
                        Add
                      </button>
                    </div>

                    {artistApplication.sampleTrackLinks.length > 0 && (
                      <ul className="sample-track-list">
                        {artistApplication.sampleTrackLinks.map(
                          (link, index) => (
                            <li key={index}>
                              <span>{link}</span>
                              <button
                                type="button"
                                className="remove-track-btn"
                                onClick={() =>
                                  handleRemoveSampleTrackLink(index)
                                }
                              >
                                Remove
                              </button>
                            </li>
                          )
                        )}
                      </ul>
                    )}

                    {validationArtistApplicationErrors.sampleTrackLinks && (
                      <span className="error-message">
                        {validationArtistApplicationErrors.sampleTrackLinks}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Social Media Links</label>
                    <input
                      type="text"
                      placeholder="Instagram"
                      name="instagramUrl"
                      value={artistApplication.instagramUrl}
                      onChange={handleInputChange}
                    />
                    {validationArtistApplicationErrors.instagramUrl && (
                      <span className="error-message">
                        {validationArtistApplicationErrors.instagramUrl}
                      </span>
                    )}
                    <input
                      type="text"
                      placeholder="Twitter/X"
                      name="twitterUrl"
                      value={artistApplication.twitterUrl}
                      onChange={handleInputChange}
                    />
                    {validationArtistApplicationErrors.twitterUrl && (
                      <span className="error-message">
                        {validationArtistApplicationErrors.twitterUrl}
                      </span>
                    )}
                    <input
                      type="text"
                      placeholder="YouTube"
                      name="youTubeUrl"
                      value={artistApplication.youTubeUrl}
                      onChange={handleInputChange}
                    />
                    {validationArtistApplicationErrors.youTubeUrl && (
                      <span className="error-message">
                        {validationArtistApplicationErrors.youTubeUrl}
                      </span>
                    )}
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
