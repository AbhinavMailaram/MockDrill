import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { appointmentService } from '../../services/appointmentService';
import { validation } from '../../utils/validation';
import GlassCard from '../GlassCard/GlassCard';
import AnimatedButton from '../AnimatedButton/AnimatedButton';
import '../../styles/glassmorphism.css';
import '../../styles/animations.css';

const AppointmentForm = ({ onSuccess }) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    patientName: user?.fullName || '',
    patientPhone: user?.phoneNumber || '',
    appointmentDate: '',
    doctorName: '',
    department: '',
    reason: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!validation.isRequired(formData.patientName)) {
      setError('Patient name is required');
      return;
    }
    if (!validation.isRequired(formData.appointmentDate)) {
      setError('Appointment date is required');
      return;
    }
    if (!validation.isFutureDate(formData.appointmentDate)) {
      setError('Appointment date must be in the future');
      return;
    }
    if (!validation.isRequired(formData.doctorName)) {
      setError('Doctor name is required');
      return;
    }

    setLoading(true);

    try {
      const appointmentData = {
        ...formData,
        userId: user.id,
        appointmentDate: new Date(formData.appointmentDate).toISOString(),
      };

      await appointmentService.createAppointment(appointmentData);
      
      // Reset form
      setFormData({
        patientName: user?.fullName || '',
        patientPhone: user?.phoneNumber || '',
        appointmentDate: '',
        doctorName: '',
        department: '',
        reason: '',
      });

      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create appointment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassCard className="p-8 fade-in">
      <h2 className="text-3xl font-bold text-white mb-6">Book Appointment</h2>
      
      {error && (
        <div className="bg-red-500 bg-opacity-20 border border-red-500 text-white px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-white mb-2">Patient Name *</label>
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            className="glass-input w-full"
            required
          />
        </div>

        <div>
          <label className="block text-white mb-2">Patient Phone</label>
          <input
            type="tel"
            name="patientPhone"
            value={formData.patientPhone}
            onChange={handleChange}
            className="glass-input w-full"
          />
        </div>

        <div>
          <label className="block text-white mb-2">Appointment Date & Time *</label>
          <input
            type="datetime-local"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            className="glass-input w-full"
            required
          />
        </div>

        <div>
          <label className="block text-white mb-2">Doctor Name *</label>
          <input
            type="text"
            name="doctorName"
            value={formData.doctorName}
            onChange={handleChange}
            className="glass-input w-full"
            required
          />
        </div>

        <div>
          <label className="block text-white mb-2">Department</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="glass-input w-full"
          >
            <option value="">Select Department</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Dermatology">Dermatology</option>
            <option value="Neurology">Neurology</option>
            <option value="Orthopedics">Orthopedics</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="General">General</option>
          </select>
        </div>

        <div>
          <label className="block text-white mb-2">Reason for Visit</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="glass-input w-full"
            rows="3"
          />
        </div>

        <AnimatedButton
          type="submit"
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Booking...' : 'Book Appointment'}
        </AnimatedButton>
      </form>
    </GlassCard>
  );
};

export default AppointmentForm;
