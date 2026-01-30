import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { userService } from '../services/userService';
import { validation } from '../utils/validation';
import GlassCard from '../components/GlassCard/GlassCard';
import AnimatedButton from '../components/AnimatedButton/AnimatedButton';
import '../styles/glassmorphism.css';
import '../styles/animations.css';

const Home = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: '',
    phoneNumber: '',
  });

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(loginData);
      navigate('/book-appointment');
    } catch (err) {
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!validation.isValidUsername(registerData.username)) {
      setError('Username must be between 3 and 50 characters');
      return;
    }
    if (!validation.isValidEmail(registerData.email)) {
      setError('Please enter a valid email');
      return;
    }
    if (!validation.isStrongPassword(registerData.password)) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await userService.register(registerData);
      await login({ username: registerData.username, password: registerData.password });
      navigate('/book-appointment');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Floating Background Shapes */}
      <div className="floating-shape floating-shape-1"></div>
      <div className="floating-shape floating-shape-2"></div>
      <div className="floating-shape floating-shape-3"></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8 fade-in">
            <h1 className="text-5xl font-bold text-white mb-4 gradient-text">
              ClinicCare
            </h1>
            <p className="text-gray-300 text-lg">
              Your Health, Our Priority
            </p>
          </div>

          <GlassCard className="p-8">
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 rounded-lg transition ${
                  isLogin ? 'glass-button' : 'text-gray-400'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 rounded-lg transition ${
                  !isLogin ? 'glass-button' : 'text-gray-400'
                }`}
              >
                Register
              </button>
            </div>

            {error && (
              <div className="bg-red-500 bg-opacity-20 border border-red-500 text-white px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            {isLogin ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-white mb-2">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={loginData.username}
                    onChange={handleLoginChange}
                    className="glass-input w-full"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    className="glass-input w-full"
                    required
                  />
                </div>

                <AnimatedButton type="submit" disabled={loading} className="w-full">
                  {loading ? 'Logging in...' : 'Login'}
                </AnimatedButton>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-white mb-2">Username *</label>
                  <input
                    type="text"
                    name="username"
                    value={registerData.username}
                    onChange={handleRegisterChange}
                    className="glass-input w-full"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    className="glass-input w-full"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">Password *</label>
                  <input
                    type="password"
                    name="password"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    className="glass-input w-full"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={registerData.fullName}
                    onChange={handleRegisterChange}
                    className="glass-input w-full"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={registerData.phoneNumber}
                    onChange={handleRegisterChange}
                    className="glass-input w-full"
                  />
                </div>

                <AnimatedButton type="submit" disabled={loading} className="w-full">
                  {loading ? 'Registering...' : 'Register'}
                </AnimatedButton>
              </form>
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default Home;
