import React, { useState } from 'react';
import { appointmentService } from '../../services/appointmentService';
import GlassCard from '../GlassCard/GlassCard';
import AnimatedButton from '../AnimatedButton/AnimatedButton';
import '../../styles/glassmorphism.css';

const CancellationForm = ({ onSuccess }) => {
  const [appointmentId, setAppointmentId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!appointmentId) {
      setError('Please enter an appointment ID');
      return;
    }

    setLoading(true);

    try {
      await appointmentService.cancelAppointment(appointmentId);
      setSuccess('Appointment cancelled successfully');
      setAppointmentId('');
      
      if (onSuccess) {
        setTimeout(() => onSuccess(), 2000);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to cancel appointment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassCard className="p-8 fade-in">
      <h2 className="text-3xl font-bold text-white mb-6">Cancel Appointment</h2>
      
      {error && (
        <div className="bg-red-500 bg-opacity-20 border border-red-500 text-white px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-500 bg-opacity-20 border border-green-500 text-white px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-white mb-2">Appointment ID</label>
          <input
            type="number"
            value={appointmentId}
            onChange={(e) => setAppointmentId(e.target.value)}
            className="glass-input w-full"
            placeholder="Enter appointment ID"
            required
          />
        </div>

        <AnimatedButton
          type="submit"
          disabled={loading}
          className="w-full"
          variant="danger"
        >
          {loading ? 'Cancelling...' : 'Cancel Appointment'}
        </AnimatedButton>
      </form>

      <p className="text-gray-400 text-sm mt-4">
        Note: You can find your appointment ID in your appointments list.
      </p>
    </GlassCard>
  );
};

export default CancellationForm;
