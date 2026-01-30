import React from 'react';
import CancellationForm from '../components/CancellationForm/CancellationForm';
import '../styles/glassmorphism.css';
import '../styles/animations.css';

const CancelAppointment = () => {
  const handleSuccess = () => {
    // Optional: redirect or refresh
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      <div className="floating-shape floating-shape-1"></div>
      <div className="floating-shape floating-shape-2"></div>
      <div className="floating-shape floating-shape-3"></div>

      <div className="relative z-10 min-h-screen p-8">
        <div className="max-w-2xl mx-auto">
          <CancellationForm onSuccess={handleSuccess} />
        </div>
      </div>
    </div>
  );
};

export default CancelAppointment;
