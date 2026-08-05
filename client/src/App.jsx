import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Providers
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Route Guards
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import ProtectedStudentRoute from './components/ProtectedStudentRoute';

// Pages
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import StudentLoginPage from './pages/StudentLoginPage';
import StudentRegisterPage from './pages/StudentRegisterPage';
import AdminLoginPage from './pages/AdminLoginPage';
import StudentDashboardPage from './pages/StudentDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ComplaintFormPage from './pages/ComplaintFormPage';
import ComplaintHistoryPage from './pages/ComplaintHistoryPage';
import ComplaintDetailsPage from './pages/ComplaintDetailsPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <ToastProvider>
        <AuthProvider>
          <div className="app-container">
            <Navbar />
            <main className="main-content">
              <Routes>
                {/* Public Pages */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/student-login" element={<StudentLoginPage />} />
                <Route path="/student-register" element={<StudentRegisterPage />} />
                <Route path="/admin-login" element={<AdminLoginPage />} />

                {/* Protected Student Routes */}
                <Route
                  path="/student-dashboard"
                  element={
                    <ProtectedStudentRoute>
                      <StudentDashboardPage />
                    </ProtectedStudentRoute>
                  }
                />
                <Route
                  path="/submit-complaint"
                  element={
                    <ProtectedStudentRoute>
                      <ComplaintFormPage />
                    </ProtectedStudentRoute>
                  }
                />
                <Route
                  path="/complaint-history"
                  element={
                    <ProtectedStudentRoute>
                      <ComplaintHistoryPage />
                    </ProtectedStudentRoute>
                  }
                />

                {/* Protected Admin Routes */}
                <Route
                  path="/admin-dashboard"
                  element={
                    <ProtectedAdminRoute>
                      <AdminDashboardPage />
                    </ProtectedAdminRoute>
                  }
                />

                {/* Protected Shared Routes */}
                <Route path="/complaint/:id" element={<ComplaintDetailsPage />} />
                <Route path="/profile" element={<ProfilePage />} />

                {/* 404 Route */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </ToastProvider>
    </Router>
  );
}

export default App;
