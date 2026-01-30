import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import '../../styles/glassmorphism.css';
import '../../styles/animations.css';

const Navbar = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="glass-navbar sticky top-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold gradient-text">
          ClinicCare
        </Link>

        <div className="flex items-center space-x-6">
          {user ? (
            <>
              <Link to="/book-appointment" className="text-white hover:text-indigo-400 transition">
                Book Appointment
              </Link>
              <Link to="/view-appointments" className="text-white hover:text-indigo-400 transition">
                My Appointments
              </Link>
              <Link to="/profile" className="text-white hover:text-indigo-400 transition">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="glass-button text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/" className="text-white hover:text-indigo-400 transition">
                Home
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
