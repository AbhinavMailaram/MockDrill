import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider, useUser } from './context/UserContext';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import BookAppointment from './pages/BookAppointment';
import ViewAppointments from './pages/ViewAppointments';
import CancelAppointment from './pages/CancelAppointment';
import UserProfile from './pages/UserProfile';
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return user ? children : <Navigate to="/" />;
};

function AppContent() {
  const { user } = useUser();

  return (
    <Router>
      {user && <Navbar />}
      <Routes>
        <Route path="/" element={user ? <Navigate to="/book-appointment" /> : <Home />} />
        <Route
          path="/book-appointment"
          element={
            <ProtectedRoute>
              <BookAppointment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/view-appointments"
          element={
            <ProtectedRoute>
              <ViewAppointments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cancel-appointment"
          element={
            <ProtectedRoute>
              <CancelAppointment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export default App;
