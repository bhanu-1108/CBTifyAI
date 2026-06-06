import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import DashboardPage from './pages/DashboardPage';
import UploadPage from './pages/UploadPage';
import TestPage from './pages/TestPage';
import AnalyticsPage from './pages/AnalyticsPage';
import OrgPortal from './pages/OrgPortal';

// Layout wrapper for authenticated pages
const AppLayout = ({ children }) => {
  const { currentUser } = useApp();
  const location = useLocation();

  // If not logged in, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Check if current route is the test page (needs full-screen immersive view)
  const isTestPage = location.pathname.startsWith('/test/');

  if (isTestPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-darkBg text-white">
      <Navbar />
      <div className="flex flex-1 max-w-7xl mx-auto w-full">
        {/* Sidebar on left */}
        <Sidebar />
        
        {/* Main Content Pane on right */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

// Layout wrapper for public pages
const PublicLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-darkBg text-white">
      <Navbar />
      <div className="flex-1">{children}</div>
    </div>
  );
};

const AppContent = () => {
  return (
    <Routes>
      {/* Public Paths */}
      <Route path="/" element={<PublicLayout><LandingPage /></PublicLayout>} />
      <Route path="/login" element={<PublicLayout><LoginPage /></PublicLayout>} />
      <Route path="/register" element={<PublicLayout><RegisterPage /></PublicLayout>} />
      <Route path="/forgot-password" element={<PublicLayout><ForgotPasswordPage /></PublicLayout>} />

      {/* Authenticated Workspace Paths */}
      <Route path="/dashboard" element={<AppLayout><DashboardPage /></AppLayout>} />
      <Route path="/upload" element={<AppLayout><UploadPage /></AppLayout>} />
      <Route path="/test/:id" element={<AppLayout><TestPage /></AppLayout>} />
      <Route path="/analytics" element={<AppLayout><AnalyticsPage /></AppLayout>} />
      <Route path="/organization" element={<AppLayout><OrgPortal /></AppLayout>} />

      {/* Catch-all Redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App = () => {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
};

export default App;
