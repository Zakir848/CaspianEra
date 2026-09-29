import HomePage from "../pages/HomePage";
import ProtectedRoute from "../features/auth/components/ProtectedRoute";
import { Navigate, Route, Routes } from "react-router-dom";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
