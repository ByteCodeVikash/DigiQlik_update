import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Play,
  ArrowRight,
  Sparkles,
  X,
  CheckCircle,
  Loader2,
} from 'lucide-react';
import { submitToSheets } from '../utils/googleSheets';
import './Hero.css';

const animatedWords = ['Visions', 'Ideas', 'Brands', 'Businesses'];

const PHONE_NUMBER = '+91 9217644096';
const PHONE_NUMBER_LINK = '+919217644096';
const WHATSAPP_MESSAGE = encodeURIComponent('Hi, I want to connect with you.');
const WHATSAPP_LINK = `https://wa.me/${PHONE_NUMBER_LINK}?text=${WHATSAPP_MESSAGE}`;

const ConnectModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    business: '',
    email: '',
    phone: '',
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    setStatus('idle');
    setErrorMsg('');
    setFormData({ name: '', business: '', email: '', phone: '' });
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.business || !formData.email || !formData.phone) {
      setStatus('error');
      setErrorMsg('Please fill in all fields.');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

   const { success, message } = await submitToSheets({
  formType: "Hero Connect",
  name: formData.name,
  business: formData.business,
  email: formData.email,
  phone: formData.phone,
});

    if (success) {
      setStatus('success');
      setFormData({ name: '', business: '', email: '', phone: '' });
    } else {
      setStatus('error');
      setErrorMsg(message || 'Something went wrong.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="hero-modal-overlay" onClick={handleClose}>
      <div className="hero-modal" onClick={(e) => e.stopPropagation()}>
        <button onClick={handleClose} className="hero-modal-close" aria-label="Close modal">
          <X size={20} />
        </button>

        {status === 'success' ? (
          <div className="hero-modal-success">
            <CheckCircle size={56} className="hero-success-icon" />
            <h2 className="hero-modal-title">We&apos;ll Be In Touch! 🎉</h2>
            <p className="hero-modal-subtitle">
              Thanks for reaching out. Our team will contact you within 24 hours to discuss your project.
            </p>
            <button className="hero-submit-btn" onClick={handleClose}>
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 className="hero-modal-title">Let&apos;s Connect & Grow</h2>
            <p className="hero-modal-subtitle">
              Share your details and our team will reach out to discuss how we can transform your business.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="hero-input-group">
                <label className="hero-label">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="hero-input"
                  required
                  disabled={status === 'loading'}
                />
              </div>

              <div className="hero-input-group">
                <label className="hero-label">Business / Company *</label>
                <input
                  type="text"
                  name="business"
                  value={formData.business}
                  onChange={handleChange}
                  placeholder="Your Company Name"
                  className="hero-input"
                  required
                  disabled={status === 'loading'}
                />
              </div>

              <div className="hero-input-group">
                <label className="hero-label">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="hello@company.com"
                  className="hero-input"
                  required
                  disabled={status === 'loading'}
                />
              </div>

              <div className="hero-input-group">
                <label className="hero-label">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="hero-input"
                  required
                  disabled={status === 'loading'}
                />
              </div>

              {status === 'error' && (
                <p className="hero-error">⚠️ {errorMsg}</p>
              )}

              <button
                type="submit"
                className="hero-submit-btn"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={18} className="spin-icon" />
                    Sending...
                  </>
                ) : (
                  'Get in Touch'
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

const Hero = ({ onBookCall }) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % animatedWords.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Auto-open lead popup on every fresh page load / refresh
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsConnectModalOpen(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="hero">
      <div className="hero-bg-shapes" aria-hidden="true">
        <div className="shape shape-1" />
        <div className="shape shape-2" />
      </div>

      <div className="hero-container">
        <div className="hero-content">
          <button
            className="hero-badge float-animation"
            onClick={() => setIsConnectModalOpen(true)}
          >
            <Sparkles size={18} strokeWidth={2.5} />
            <span className="badge-text">Click. Connect. Grow.</span>
            <Sparkles size={18} strokeWidth={2.5} />
          </button>

          <h1 className="hero-title">
            Transform Your <br />
            <span
              key={wordIndex}
              className="hero-animated-word"
              style={{ animation: 'heroModalFadeIn 0.8s ease-out forwards', display: 'inline-block' }}
            >
              {animatedWords[wordIndex]}
            </span>{' '}
            <br />
            Into Digital Success
          </h1>

          <p className="hero-description">
            Full-service digital agency specializing in marketing, web development, design, and video production.
          </p>

          <div className="hero-actions">
            <button onClick={onBookCall} className="btn btn-primary">
              Get Started <ArrowRight size={20} />
            </button>
            <Link to="/portfolio" className="btn btn-outline">
              <Play size={20} strokeWidth={1.8} /> View Our Work
            </Link>
          </div>
        </div>
      </div>

      <ConnectModal isOpen={isConnectModalOpen} onClose={() => setIsConnectModalOpen(false)} />
    </section>
  );
};

export default Hero;