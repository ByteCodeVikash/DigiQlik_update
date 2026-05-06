import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, ChevronRight, ShieldCheck } from 'lucide-react';
import './AdminLoginPage.css';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // [HARDCODED BYPASS] as requested by user
    if (email === 'admin@digiqlik.com' && password === 'admin@123') {
      const mockUser = { name: 'DigiQlik Admin', role: 'admin', email: 'admin@digiqlik.com' };
      localStorage.setItem('studentToken', 'mock_admin_token');
      // We also update the AuthContext state manually if possible, or trigger a refresh
      window.location.href = '/admin'; // Force reload to pick up mock token
      return;
    }

    try {
      const res = await login(email, password);
      if (res.user && res.user.role === 'admin') {
        navigate('/admin');
      } else {
        setError('Access Denied: You do not have administrator privileges.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid admin credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-overlay"></div>
      <div className="admin-login-card">
        <div className="admin-login-header">
          <div className="admin-badge">
            <ShieldCheck size={20} />
            <span>Secure Access</span>
          </div>
          <h1>DigiQlik Control</h1>
          <p>Sign in to manage your LMS ecosystem</p>
        </div>

        {error && <div className="admin-login-error">{error}</div>}

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="admin-input-group">
            <label>Email Address</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={18} />
              <input 
                type="email" 
                placeholder="admin@digiqlik.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="admin-input-group">
            <label>Admin Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={18} />
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="admin-login-btn" disabled={loading}>
            {loading ? 'Authenticating...' : 'Enter Dashboard'}
            <ChevronRight size={20} />
          </button>
        </form>

        <div className="admin-login-footer">
          <p>&copy; 2026 DigiQlik LMS. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
