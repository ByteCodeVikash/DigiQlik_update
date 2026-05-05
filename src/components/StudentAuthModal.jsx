import React, { useState } from 'react';
import { X, Mail, Phone, Lock, User, Calendar, ArrowRight, Chrome } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import './StudentAuthModal.css';

const StudentAuthModal = () => {
  const { authModal, closeAuthModal, login, signup, googleLogin } = useAuth();
  const navigate = useNavigate();
  const [view, setView] = useState(authModal.view || 'login'); // 'login' or 'signup'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    age: '',
    contact: '' // for login
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!authModal.isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (view === 'login') {
        const res = await login(formData.contact, formData.password);
        if (!res.success) setError(res.message);
      } else {
        const res = await signup({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          age: parseInt(formData.age)
        });
        if (res.success) {
          closeAuthModal();
          navigate('/courses/student-dashboard');
        } else {
          setError(res.message);
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setError('');
    setLoading(true);
    try {
      const res = await googleLogin(credentialResponse.credential);
      if (res.success) {
        closeAuthModal();
        navigate('/courses/student-dashboard');
      } else {
        setError(res.message);
      }
    } catch (err) {
      setError('Google Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-overlay" onClick={closeAuthModal}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close" onClick={closeAuthModal}>
          <X size={24} />
        </button>

        <div className="auth-header">
          <div className="auth-logo">
            <span className="logo-text">Digi<span className="text-gradient">Qlik</span> LMS</span>
          </div>
          <h2>{view === 'login' ? 'Welcome Back' : 'Create Student Account'}</h2>
          <p>{view === 'login' ? 'Access your courses and dashboard' : 'Join our professional marketing ecosystem'}</p>
        </div>

        <div className="auth-tabs">
          <button 
            className={`auth-tab ${view === 'login' ? 'active' : ''}`}
            onClick={() => setView('login')}
          >
            Login
          </button>
          <button 
            className={`auth-tab ${view === 'signup' ? 'active' : ''}`}
            onClick={() => setView('signup')}
          >
            Sign Up
          </button>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          {view === 'signup' && (
            <>
              <div className="input-group">
                <User className="input-icon" size={20} />
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="input-group">
                <Calendar className="input-icon" size={20} />
                <input 
                  type="number" 
                  placeholder="Age" 
                  required 
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                />
              </div>
              <div className="input-group">
                <Mail className="input-icon" size={20} />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="input-group">
                <Phone className="input-icon" size={20} />
                <input 
                  type="text" 
                  placeholder="Phone Number" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </>
          )}

          {view === 'login' && (
            <div className="input-group">
              <Mail className="input-icon" size={20} />
              <input 
                type="text" 
                placeholder="Email or Phone" 
                required 
                value={formData.contact}
                onChange={(e) => setFormData({...formData, contact: e.target.value})}
              />
            </div>
          )}

          <div className="input-group">
            <Lock className="input-icon" size={20} />
            <input 
              type="password" 
              placeholder="Password" 
              required 
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button className="auth-submit" type="submit" disabled={loading}>
            {loading ? 'Processing...' : (view === 'login' ? 'Login' : 'Create Account')}
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <div className="google-auth-container">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError('Google Login Failed')}
            theme="filled_blue"
            shape="pill"
            width="320"
          />
        </div>

        <p className="auth-footer">
          {view === 'login' ? "Don't have an account? " : "Already have an account? "}
          <span onClick={() => setView(view === 'login' ? 'signup' : 'login')}>
            {view === 'login' ? 'Sign Up' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default StudentAuthModal;
