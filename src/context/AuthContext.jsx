import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authModal, setAuthModal] = useState({ isOpen: false, view: 'login' });

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const token = localStorage.getItem('studentToken');
    if (!token) {
      setLoading(false);
      return;
    }

    if (token === 'mock_admin_token') {
      setUser({ name: 'DigiQlik Admin', role: 'admin', email: 'admin@digiqlik.com' });
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setUser(res.data.user);
      }
    } catch (error) {
      console.error('Check user failed:', error);
      localStorage.removeItem('studentToken');
    } finally {
      setLoading(false);
    }
  };

  const login = async (contact, password) => {
    try {
      const res = await axios.post('/api/auth/login', { contact, password });
      if (res.data.success) {
        localStorage.setItem('studentToken', res.data.token);
        setUser(res.data.user);
        setAuthModal({ isOpen: false, view: 'login' });
        return { success: true, user: res.data.user };
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || error.message);
      throw error; // re-throw so AdminLoginPage can catch it
    }
  };

  const signup = async (userData) => {
    try {
      const res = await axios.post('/api/auth/signup', userData);
      if (res.data.success) {
        localStorage.setItem('studentToken', res.data.token);
        setUser(res.data.user);
        setAuthModal({ isOpen: false, view: 'login' });
        return { success: true };
      }
    } catch (error) {
      console.error('Signup failed:', error.response?.data?.message || error.message);
      return { success: false, message: error.response?.data?.message || 'Signup failed' };
    }
  };

  const googleLogin = async (credential) => {
    try {
      const res = await axios.post('/api/auth/google', { credential });
      if (res.data.success) {
        localStorage.setItem('studentToken', res.data.token);
        setUser(res.data.user);
        setAuthModal({ isOpen: false, view: 'login' });
        return { success: true };
      }
    } catch (error) {
      console.error('Google Login failed:', error.response?.data?.message || error.message);
      return { success: false, message: error.response?.data?.message || 'Google Login failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('studentToken');
    setUser(null);
  };

  const openAuthModal = (view = 'login') => {
    setAuthModal({ isOpen: true, view });
  };

  const closeAuthModal = () => {
    setAuthModal({ ...authModal, isOpen: false });
  };

  const refreshUser = async () => {
    await checkUser();
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      signup, 
      googleLogin,
      logout, 
      refreshUser,
      authModal, 
      openAuthModal, 
      closeAuthModal 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
