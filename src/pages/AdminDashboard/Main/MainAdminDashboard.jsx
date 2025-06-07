import "./MainAdminDashboard.scss";
import { useState } from "react";
import {
  FaTachometerAlt,
  FaUsers,
  FaMusic,
  FaFileAlt,
  FaCog,
  FaChartLine,
  FaBell,
  FaUserCircle,
  FaSearch,
} from "react-icons/fa";
import AdminDashboard from "../AdminDashboard/AdminDashboard";
import UserManagement from "../UserManagement/UserManagement";
import ContentManagement from "../ContentManagement/ContentManagement";
import ArtistVerification from "../ArtistVerification/ArtistVerification";
import ReportsAnalytics from "../ReportsAnalytics/ReportsAnalytics";
import SystemSettings from "../SystemSettings/SystemSettings";

function MainAdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <AdminDashboard />;
      case "users":
        return <UserManagement />;
      case "content":
        return <ContentManagement />;
      case "artists":
        return <ArtistVerification />;
      case "reports":
        return <ReportsAnalytics />;
      case "settings":
        return <SystemSettings />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div
      className={`admin-container ${
        sidebarCollapsed ? "sidebar-collapsed" : ""
      }`}
    >
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-icon">GN</span>
            {!sidebarCollapsed && (
              <span className="logo-text">GrooveNest Admin</span>
            )}
          </div>
          <button
            className="collapse-btn"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? "»" : "«"}
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li>
              <button
                className={`nav-item ${
                  activeTab === "dashboard" ? "active" : ""
                }`}
                onClick={() => setActiveTab("dashboard")}
              >
                <FaTachometerAlt className="nav-icon" />
                {!sidebarCollapsed && <span>Dashboard</span>}
              </button>
            </li>
            <li>
              <button
                className={`nav-item ${activeTab === "users" ? "active" : ""}`}
                onClick={() => setActiveTab("users")}
              >
                <FaUsers className="nav-icon" />
                {!sidebarCollapsed && <span>User Management</span>}
              </button>
            </li>
            <li>
              <button
                className={`nav-item ${
                  activeTab === "content" ? "active" : ""
                }`}
                onClick={() => setActiveTab("content")}
              >
                <FaMusic className="nav-icon" />
                {!sidebarCollapsed && <span>Content Management</span>}
              </button>
            </li>
            <li>
              <button
                className={`nav-item ${
                  activeTab === "artists" ? "active" : ""
                }`}
                onClick={() => setActiveTab("artists")}
              >
                <FaFileAlt className="nav-icon" />
                {!sidebarCollapsed && <span>Artist Verification</span>}
              </button>
            </li>
            <li>
              <button
                className={`nav-item ${
                  activeTab === "reports" ? "active" : ""
                }`}
                onClick={() => setActiveTab("reports")}
              >
                <FaChartLine className="nav-icon" />
                {!sidebarCollapsed && <span>Reports & Analytics</span>}
              </button>
            </li>
            <li>
              <button
                className={`nav-item ${
                  activeTab === "settings" ? "active" : ""
                }`}
                onClick={() => setActiveTab("settings")}
              >
                <FaCog className="nav-icon" />
                {!sidebarCollapsed && <span>System Settings</span>}
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {/* Top Navigation */}
        <header className="admin-header">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search..." />
          </div>
          <div className="admin-controls">
            <button className="notification-btn">
              <FaBell />
              <span className="badge">3</span>
            </button>
            <button className="user-profile">
              <FaUserCircle className="user-icon" />
              <span>Admin User</span>
            </button>
          </div>
        </header>

        {/* Dynamic Content Area */}
        <div className="admin-content">{renderContent()}</div>
      </main>
    </div>
  );
}

export default MainAdminDashboard;
