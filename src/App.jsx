import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function App() {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  const handleCloseScheduleModal = () => {
    setIsScheduleModalOpen(false);
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || "placeholder"}>
      <AuthProvider>
        <Router>
          <>
            <Chatbot />
            <StudentAuthModal />
            <div className="app-wrapper">
              <ScheduleMeetingModal
                isOpen={isScheduleModalOpen}
                onClose={handleCloseScheduleModal}
              />

              <CursorFluid />
              <Header onBookCall={() => setIsScheduleModalOpen(true)} />

              <Routes>
                <Route
                  path="/"
                  element={<Home onBookCall={() => setIsScheduleModalOpen(true)} />}
                />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/courses" element={<CoursesPage />} />
                <Route path="/portfolio" element={<PortfolioPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/courses/student-dashboard" element={<StudentDashboard />} />
              </Routes>

              <Footer />
            </div>
          </>
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;