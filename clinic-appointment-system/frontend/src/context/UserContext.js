import React, { createContext, useState, useEffect, useContext } from 'react';
import { userService } from '../services/userService';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = userService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await userService.login(credentials);
      setUser(response.user);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    userService.logout();
    setUser(null);
  };

  const updateUserProfile = async (id, updateData) => {
    try {
      const updatedUser = await userService.updateUser(id, updateData);
      setUser(updatedUser);
      return updatedUser;
    } catch (error) {
      throw error;
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout, updateUserProfile, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
