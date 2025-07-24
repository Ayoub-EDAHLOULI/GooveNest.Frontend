import "./Navbar.scss";
import {
  FaSearch,
  FaUserCircle,
  FaShoppingCart,
  FaHeart,
  FaSpotify,
} from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          {/* Logo/Brand */}
          <div className="navbar-brand">
            <FaSpotify className="logo-icon" />
            <Link to="/" className="brand-name">
              GrooveNest
            </Link>
          </div>

          {/* Search Bar */}
          <div className="search-container">
            <input
              type="text"
              placeholder="Search for songs, artists, or albums..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button className="search-button">
              <FaSearch />
            </button>
          </div>

          {/* Main Navigation */}
          <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
            <li>
              <Link to="/discover">Discover</Link>
            </li>
            <li>
              <Link to="/library">Library</Link>
            </li>
            <li>
              <Link to="/playlists">Playlists</Link>
            </li>
            <li>
              <Link to="/premium">Premium</Link>
            </li>
          </ul>

          {/* User Controls */}
          <div className="user-controls">
            <button className="icon-button">
              <FaHeart />
            </button>
            <button className="icon-button">
              <FaShoppingCart />
            </button>
            <Link to="/account" className="user-button">
              <FaUserCircle className="user-icon" />
              <span>Account</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className={`menu-line ${isMenuOpen ? "line-1" : ""}`}></div>
            <div className={`menu-line ${isMenuOpen ? "line-2" : ""}`}></div>
            <div className={`menu-line ${isMenuOpen ? "line-3" : ""}`}></div>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
