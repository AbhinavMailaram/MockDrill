import React from 'react';
import { useUser } from '../../context/UserContext';
import GlassCard from '../GlassCard/GlassCard';
import '../../styles/glassmorphism.css';

const UserProfileCard = () => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <GlassCard className="p-6 hover-lift">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
          {user.username?.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white">{user.fullName || user.username}</h3>
          <p className="text-gray-400">{user.email}</p>
          <p className="text-gray-500 text-sm mt-1">{user.role}</p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="grid grid-cols-2 gap-4 text-sm">
          {user.phoneNumber && (
            <div>
              <p className="text-gray-400">Phone</p>
              <p className="text-white">{user.phoneNumber}</p>
            </div>
          )}
          {user.address && (
            <div>
              <p className="text-gray-400">Address</p>
              <p className="text-white">{user.address}</p>
            </div>
          )}
        </div>
      </div>
    </GlassCard>
  );
};

export default UserProfileCard;
