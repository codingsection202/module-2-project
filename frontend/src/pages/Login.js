/**
 * Login / Register Page
 * =====================
 * Dual-purpose authentication page that toggles between Login and Registration modes.
 * Features:
 * - Email and password validation with inline error messages
 * - Name field shown only in registration mode
 * - Submits credentials to the backend API (/api/auth/login or /api/auth/register)
 * - Stores JWT token and user info in Redux + localStorage on success
 * - Redirects authenticated users to the homepage
 */

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(state => state.auth);

  if (isAuthenticated) {
    navigate('/');
  }

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin && !formData.name) {
      newErrors.name = 'Name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);

    try {
      const endpoint = isLogin ? `${API}/auth/login` : `${API}/auth/register`;
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : { email: formData.email, password: formData.password, name: formData.name };

      const response = await axios.post(endpoint, payload);
      
      dispatch(setCredentials({
        user: response.data.user,
        token: response.data.access_token
      }));

      toast.success(isLogin ? 'Welcome back!' : 'Account created successfully!');
      navigate('/');
    } catch (error) {
      console.error('Auth error:', error);
      const message = error.response?.data?.detail || 'An error occurred. Please try again.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-20 pb-16">
      <div className="max-w-md w-full">
        <div className="bg-[#171717] border border-white/10 p-8" data-testid="login-form-container">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-12 h-12 bg-[#F97316] flex items-center justify-center">
                <span className="text-white font-black text-2xl">N</span>
              </div>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white mb-2">
              {isLogin ? 'WELCOME BACK' : 'CREATE ACCOUNT'}
            </h1>
            <p className="text-[#A3A3A3] text-sm">
              {isLogin ? 'Sign in to your account' : 'Join NexaStore today'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-white text-sm font-semibold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-[#0A0A0A] border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-[#F97316] focus:border-[#F97316] px-4 py-3 rounded-none placeholder-[#A3A3A3] w-full"
                  placeholder="John Doe"
                  data-testid="name-input"
                />
                {errors.name && (
                  <p className="text-[#EF4444] text-xs mt-1" data-testid="name-error">{errors.name}</p>
                )}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-white text-sm font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-[#0A0A0A] border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-[#F97316] focus:border-[#F97316] px-4 py-3 rounded-none placeholder-[#A3A3A3] w-full"
                placeholder="you@example.com"
                data-testid="email-input"
              />
              {errors.email && (
                <p className="text-[#EF4444] text-xs mt-1" data-testid="email-error">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-white text-sm font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="bg-[#0A0A0A] border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-[#F97316] focus:border-[#F97316] px-4 py-3 rounded-none placeholder-[#A3A3A3] w-full"
                placeholder="••••••••"
                data-testid="password-input"
              />
              {errors.password && (
                <p className="text-[#EF4444] text-xs mt-1" data-testid="password-error">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#F97316] text-white hover:bg-[#EA580C] px-6 py-4 font-semibold rounded-none tracking-wide transition-colors uppercase text-sm disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
              data-testid="submit-btn"
            >
              {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Sign Up')}
            </button>
          </form>

          {/* Toggle */}
          <div className="mt-6 text-center">
            <p className="text-[#A3A3A3] text-sm">
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setFormData({ email: '', password: '', name: '' });
                  setErrors({});
                }}
                className="text-[#F97316] hover:underline font-semibold"
                data-testid="toggle-auth-mode"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;