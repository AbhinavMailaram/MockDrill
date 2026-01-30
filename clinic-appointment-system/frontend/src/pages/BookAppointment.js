import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppointmentForm from '../components/AppointmentForm/AppointmentForm';
import '../styles/glassmorphism.css';
import '../styles/animations.css';

const BookAppointment = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const handleSuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      navigate('/view-appointments');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      <div className="floating-shape floating-shape-1"></div>
      <div className="floating-shape floating-shape-2"></div>
      <div className="floating-shape floating-shape-3"></div>

      <div className="relative z-10 min-h-screen p-8">
        <div className="max-w-2xl mx-auto">
          {success && (
            <div className="bg-green-500 bg-opacity-20 border border-green-500 text-white px-6 py-4 rounded-lg mb-6 fade-in">
              <h3 className="font-bold text-lg">Success!</h3>
              <p>Your appointment has been booked successfully. Redirecting...</p>
            </div>
          )}
          
          <AppointmentForm onSuccess={handleSuccess} />
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
