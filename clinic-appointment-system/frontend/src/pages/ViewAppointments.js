import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { appointmentService } from '../services/appointmentService';
import { validation } from '../utils/validation';
import GlassCard from '../components/GlassCard/GlassCard';
import AnimatedButton from '../components/AnimatedButton/AnimatedButton';
import '../styles/glassmorphism.css';
import '../styles/animations.css';

const ViewAppointments = () => {
  const { user } = useUser();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, [user]);

  const fetchAppointments = async () => {
    try {
      const data = await appointmentService.getUserAppointments(user.id);
      setAppointments(data);
    } catch (err) {
      setError('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) {
      return;
    }

    try {
      await appointmentService.cancelAppointment(id);
      fetchAppointments();
    } catch (err) {
      alert('Failed to cancel appointment');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'SCHEDULED':
        return 'bg-blue-500';
      case 'CONFIRMED':
        return 'bg-green-500';
      case 'CANCELLED':
        return 'bg-red-500';
      case 'COMPLETED':
        return 'bg-purple-500';
      case 'NO_SHOW':
        return 'bg-gray-500';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      <div className="floating-shape floating-shape-1"></div>
      <div className="floating-shape floating-shape-2"></div>
      <div className="floating-shape floating-shape-3"></div>

      <div className="relative z-10 min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          <GlassCard className="p-8 fade-in">
            <h1 className="text-4xl font-bold text-white mb-6 gradient-text">
              My Appointments
            </h1>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="loading-spinner"></div>
              </div>
            ) : error ? (
              <div className="bg-red-500 bg-opacity-20 border border-red-500 text-white px-4 py-3 rounded">
                {error}
              </div>
            ) : appointments.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No appointments found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {appointments.map((appointment, index) => (
                  <div
                    key={appointment.id}
                    className="glass-card p-6 hover-lift stagger-item"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="text-xl font-bold text-white">
                            {appointment.patientName}
                          </h3>
                          <span
                            className={`${getStatusColor(
                              appointment.status
                            )} text-white text-xs px-3 py-1 rounded-full`}
                          >
                            {appointment.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-400">Doctor</p>
                            <p className="text-white font-medium">
                              Dr. {appointment.doctorName}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-400">Department</p>
                            <p className="text-white">
                              {appointment.department || 'N/A'}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-400">Date & Time</p>
                            <p className="text-white">
                              {validation.formatDate(appointment.appointmentDate)}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-400">Phone</p>
                            <p className="text-white">
                              {appointment.patientPhone || 'N/A'}
                            </p>
                          </div>
                        </div>

                        {appointment.reason && (
                          <div className="mt-3">
                            <p className="text-gray-400 text-sm">Reason</p>
                            <p className="text-white text-sm">
                              {appointment.reason}
                            </p>
                          </div>
                        )}

                        <p className="text-gray-500 text-xs mt-3">
                          ID: {appointment.id}
                        </p>
                      </div>

                      {(appointment.status === 'SCHEDULED' ||
                        appointment.status === 'CONFIRMED') && (
                        <AnimatedButton
                          onClick={() => handleCancel(appointment.id)}
                          variant="danger"
                          className="ml-4"
                        >
                          Cancel
                        </AnimatedButton>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default ViewAppointments;
