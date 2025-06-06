import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage/RegisterPage";
import HomePage from "./pages/Dashboard/Home/HomePage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AccountPage from "./pages/AccountPage/AccountPage";
import AdminDashboard from "./pages/AdminDashboard/Main/MainAdminDashboard";
import ArtistDashboard from "./pages/ArtistDashboard/Main/MainArtistDashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />

        {/* Protected Route Example */}
        <Route
          path="/account"
          element={
            <ProtectedRoute allowedRoles={["LISTENER", "ADMIN", "ARTIST"]}>
              <AccountPage />
            </ProtectedRoute>
          }
        />

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
