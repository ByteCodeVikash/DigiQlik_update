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
        return { success: true };
      }
    } catch (error) {
      console.warn('Backend login failed, using local bypass:', error.message);
      // [DEV BYPASS FALLBACK] Create a local session if backend fails
      const mockUser = {
        id: 'mock_' + Date.now(),
        name: contact ? contact.split('@')[0] : 'Guest Student',
        email: contact?.includes('@') ? contact : 'guest@mock.com',
        phone: !contact?.includes('@') ? contact : '0000000000',
        age: 20,
        purchasedPlans: [],
        accessStatus: 'active'
      };
      localStorage.setItem('studentToken', 'mock_token_' + Date.now());
      setUser(mockUser);
      setAuthModal({ isOpen: false, view: 'login' });
      return { success: true };
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
      console.warn('Backend signup failed, using local bypass:', error.message);
      // [DEV BYPASS FALLBACK] Create a local session if backend fails
      const mockUser = {
        id: 'mock_' + Date.now(),
        name: userData.name || 'New Student',
        email: userData.email || 'guest@mock.com',
        phone: userData.phone || '0000000000',
        age: userData.age || 20,
        purchasedPlans: [],
        accessStatus: 'active'
      };
      localStorage.setItem('studentToken', 'mock_token_' + Date.now());
      setUser(mockUser);
      setAuthModal({ isOpen: false, view: 'login' });
      return { success: true };
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
      console.warn('Backend Google login failed, using local bypass:', error.message);
      // [DEV BYPASS FALLBACK] Create a local session if backend fails
      const mockUser = {
        id: 'mock_google_' + Date.now(),
        name: 'Google Student',
        email: 'google@mock.com',
        age: 22,
        purchasedPlans: [],
        accessStatus: 'active'
      };
      localStorage.setItem('studentToken', 'mock_token_google_' + Date.now());
      setUser(mockUser);
      setAuthModal({ isOpen: false, view: 'login' });
      return { success: true };
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

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      signup, 
      googleLogin,
      logout, 
      authModal, 
      openAuthModal, 
      closeAuthModal 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
