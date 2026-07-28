import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "../components/layout/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";

import LoginPage from "../pages/auth/LoginPage";
import ResumeAnalysisDetailPage from "../pages/resume/ResumeAnalysisDetailPage";
import RegisterPage from "../pages/auth/RegisterPage";

import DashboardPage from "../pages/dashboard/DashboardPage";
import HistoryPage from "../pages/history/HistoryPage";
import InterviewDetailsPage from "../pages/history/InterviewDetailsPage";
import ProfilePage from "../pages/profile/ProfilePage";

import InterviewLayout from "../pages/interview/InterviewLayout";
import InterviewSetupPage from "../pages/interview/InterviewSetupPage";
import InterviewSessionPage from "../pages/interview/InterviewSessionPage";
import InterviewResultPage from "../pages/interview/InterviewResultPage";
import ResumeAnalyzerPage from "../pages/resume/ResumeAnalyzerPage";
import ResumeHistoryPage from "../pages/resume/ResumeHistoryPage";

import AuroraBackground from "../components/ui/AuroraBackground";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AuroraBackground>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<DashboardPage />} />

            <Route path="/interview" element={<InterviewLayout />}>
              <Route index element={<InterviewSetupPage />} />
              <Route path="session" element={<InterviewSessionPage />} />
              <Route path="result" element={<InterviewResultPage />} />
            </Route>

            <Route path="/history" element={<HistoryPage />} />

            <Route
              path="/history/:id"
              element={<InterviewDetailsPage />}
            />

            <Route
              path="/resume"
              element={<ResumeAnalyzerPage />}
            />

            <Route
              path="/resume/history"
              element={<ResumeHistoryPage />}
            />

            <Route
              path="/resume/history/:id"
              element={<ResumeAnalysisDetailPage />}
            />

            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </AuroraBackground>
    </BrowserRouter>
  );
}