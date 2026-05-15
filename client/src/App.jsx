import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";

import SignupPage from "./pages/SignupPage";

import DashboardPage from "./pages/DashboardPage";
import SharedNotePage from "./pages/SharedNotePage";
import ProtectedRoute from "./routes/ProtectedRoute";
import AnalyticsPage from "./pages/AnalyticsPage";
function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route path="/signup" element={<SignupPage />} />
      <Route path="/shared/:shareId" element={<SharedNotePage />} />
      <Route
  path="/analytics"
  element={
    <ProtectedRoute>
      <AnalyticsPage />
    </ProtectedRoute>
  }
/>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
