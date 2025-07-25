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
import PodcastsPage from "./pages/Dashboard/PodcastsPage/PodcastsPage";
import PodcastDetailsPage from "./pages/Dashboard/PodcastDetailsPage/PodcastDetailsPage";
import PremiumPage from "./pages/Dashboard/PremiumPage/PremiumPage";
import LikedSongsPage from "./pages/Dashboard/LikedSongsPage/LikedSongsPage";
import CartPage from "./pages/Dashboard/CartPage/CartPage";
import NewReleasesPage from "./pages/Dashboard/NewReleasesPage/NewReleasesPage";
import FeaturedPlaylistsPage from "./pages/Dashboard/FeaturedPlaylistsPage/FeaturedPlaylistsPage";
import RecommendedForYouPage from "./pages/Dashboard/RecommendedForYouPage/RecommendedForYouPage";
import TrendingArtistsPage from "./pages/Dashboard/TrendingArtistsPage/TrendingArtistsPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/playlists" element={<PlaylistPage />} />
        <Route path="/playlist/:id" element={<PlaylistDetailsPage />} />
        <Route path="/podcasts" element={<PodcastsPage />} />
        <Route path="/podcast/:id" element={<PodcastDetailsPage />} />
        <Route path="/premium" element={<PremiumPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/liked-songs" element={<LikedSongsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/new-releases" element={<NewReleasesPage />} />
        <Route path="/featured-playlists" element={<FeaturedPlaylistsPage />} />
        <Route
          path="/recommended-for-you"
          element={<RecommendedForYouPage />}
        />
        <Route path="/trending-artists" element={<TrendingArtistsPage />} />
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
