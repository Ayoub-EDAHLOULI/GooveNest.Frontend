import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage/RegisterPage";
import HomePage from "./pages/Dashboard/Home/HomePage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AccountPage from "./pages/AccountPage/AccountPage";
import AdminDashboard from "./pages/AdminDashboard/Main/MainAdminDashboard";
import ArtistDashboard from "./pages/ArtistDashboard/Main/MainArtistDashboard";
import LibraryPage from "./pages/Dashboard/LibraryPage/LibraryPage";
import DiscoverPage from "./pages/Dashboard/DiscoverPage/DiscoverPage";
import PlaylistPage from "./pages/Dashboard/PlaylistPage/PlaylistPage";
import PlaylistDetailsPage from "./pages/Dashboard/PlaylistDetailsPage/PlaylistDetailsPage";
import PodcastDetailsPage from "./pages/Dashboard/PodcastDetailsPage/PodcastDetailsPage";
import PremiumPage from "./pages/Dashboard/PremiumPage/PremiumPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/playlists" element={<PlaylistPage />} />
        <Route path="/playlist/:id" element={<PlaylistDetailsPage />} />
        <Route path="/podcast/:id" element={<PodcastDetailsPage />} />
        <Route path="/premium" element={<PremiumPage />} />
        <Route path="/account" element={<AccountPage />} />
        {/* Authentication Routes */}
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />

        {/* Protected Route Example */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/artist"
          element={
            <ProtectedRoute allowedRoles={["ARTIST"]}>
              <ArtistDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
