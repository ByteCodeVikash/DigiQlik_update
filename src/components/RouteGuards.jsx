import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null; // Or a spinner

  if (!user) {
    return <Navigate to="/courses" replace />;
  }

  return children;
};

export const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  // For development, we allow if the token is a mock token or role is admin
  const token = localStorage.getItem('studentToken');
  const isAdmin = user?.role === 'admin' || token === 'mock_admin_token';

  if (!user && token !== 'mock_admin_token') {
    return <Navigate to="/admin/login" replace />;
  }
  
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};
