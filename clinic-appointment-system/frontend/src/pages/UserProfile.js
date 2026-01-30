import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { validation } from '../utils/validation';
import GlassCard from '../components/GlassCard/GlassCard';
import AnimatedButton from '../components/AnimatedButton/AnimatedButton';
import UserProfileCard from '../components/UserProfileCard/UserProfileCard';
import '../styles/glassmorphism.css';
import '../styles/animations.css';

const UserProfile = () => {
  const { user, updateUserProfile } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    phoneNumber: user?.phoneNumber || '',
    address: user?.address || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (formData.email && !validation.isValidEmail(formData.email)) {
      setError('Please enter a valid email');
      return;
    }

    if (formData.newPassword && !formData.currentPassword) {
      setError('Current password is required to change password');
      return;
    }

    if (formData.newPassword && !validation.isStrongPassword(formData.newPassword)) {
      setError('New password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const updateData = {
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        email: formData.email,
      };

      if (formData.newPassword) {
        updateData.currentPassword = formData.currentPassword;
        updateData.newPassword = formData.newPassword;
      }

      await updateUserProfile(user.id, updateData);
      setSuccess('Profile updated successfully');
      setIsEditing(false);
      setFormData({
        ...formData,
        currentPassword: '',
        newPassword: '',
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      <div className="floating-shape floating-shape-1"></div>
      <div className="floating-shape floating-shape-2"></div>
      <div className="floating-shape floating-shape-3"></div>

      <div className="relative z-10 min-h-screen p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="fade-in">
            <h1 className="text-4xl font-bold text-white mb-2 gradient-text">
              My Profile
            </h1>
            <p className="text-gray-400">Manage your account information</p>
          </div>

          <div className="slide-in">
            <UserProfileCard />
          </div>

          <GlassCard className="p-8 fade-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
              <AnimatedButton
                onClick={() => setIsEditing(!isEditing)}
                variant={isEditing ? 'secondary' : 'primary'}
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </AnimatedButton>
            </div>

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
                <label className="block text-white mb-2">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="glass-input w-full"
                  disabled={!isEditing}
                />
              </div>

              <div>
                <label className="block text-white mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="glass-input w-full"
                  disabled={!isEditing}
                />
              </div>

              <div>
                <label className="block text-white mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="glass-input w-full"
                  disabled={!isEditing}
                />
              </div>

              <div>
                <label className="block text-white mb-2">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="glass-input w-full"
                  rows="2"
                  disabled={!isEditing}
                />
              </div>

              {isEditing && (
                <>
                  <div className="border-t border-gray-700 pt-4 mt-6">
                    <h3 className="text-lg font-bold text-white mb-4">
                      Change Password
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-white mb-2">
                          Current Password
                        </label>
                        <input
                          type="password"
                          name="currentPassword"
                          value={formData.currentPassword}
                          onChange={handleChange}
                          className="glass-input w-full"
                        />
                      </div>

                      <div>
                        <label className="block text-white mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleChange}
                          className="glass-input w-full"
                        />
                      </div>
                    </div>
                  </div>

                  <AnimatedButton
                    type="submit"
                    disabled={loading}
                    className="w-full"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </AnimatedButton>
                </>
              )}
            </form>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
