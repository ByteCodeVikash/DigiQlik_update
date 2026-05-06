import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CursorFluid from "./components/CursorFluid";
import ScheduleMeetingModal from "./components/ScheduleMeetingModal";
import Chatbot from "./components/Chatbot";
import { AuthProvider } from "./context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import StudentAuthModal from "./components/StudentAuthModal";

// Pages
import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";
import PortfolioPage from "./pages/PortfolioPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import CoursesPage from "./pages/CoursesPage";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLoginPage from "./pages/AdminLoginPage";
import { ProtectedRoute, AdminRoute } from "./components/RouteGuards";

function App() {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  const handleCloseScheduleModal = () => {
    setIsScheduleModalOpen(false);
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || "placeholder"}>
      <AuthProvider>
        <Router>
          <AppContent onBookCall={() => setIsScheduleModalOpen(true)} isScheduleModalOpen={isScheduleModalOpen} handleCloseScheduleModal={handleCloseScheduleModal} />
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

function AppContent({ onBookCall, isScheduleModalOpen, handleCloseScheduleModal }) {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');
  const isDashboardPath = location.pathname.includes('dashboard');
  const hideChrome = isAdminPath || isDashboardPath;

  return (
    <>
      <Chatbot />
      <StudentAuthModal />
      <div className="app-wrapper">
        <ScheduleMeetingModal
          isOpen={isScheduleModalOpen}
          onClose={handleCloseScheduleModal}
        />

        <CursorFluid />
        {!hideChrome && <Header onBookCall={onBookCall} />}

        <Routes>
          <Route
            path="/"
            element={<Home onBookCall={onBookCall} />}
          />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route 
            path="/courses/student-dashboard" 
            element={
              <ProtectedRoute>
                <StudentDashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route 
            path="/admin" 
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } 
          />
        </Routes>

        {!hideChrome && <Footer />}
      </div>
    </>
  );
}

export default App;