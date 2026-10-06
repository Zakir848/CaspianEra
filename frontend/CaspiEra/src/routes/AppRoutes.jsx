import HomePage from "../pages/HomePage";
import ProtectedRoute from "../features/auth/components/ProtectedRoute";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NotFoundPage from "../pages/404NotFoundPage";
import MainLayout from "../layouts/MainLayout";
import CitiesPage from "../pages/CitiesPage";
import AdminPage from "../pages/AdminPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/AppAdmin"
        element={
          <ProtectedRoute roles={["Admin"]}>
            <AdminPage />
          </ProtectedRoute>
        }
      />

      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />

        <Route path="/cities" element={<CitiesPage />}>
          <Route path="/cities/:id" />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
