import React, { useState } from 'react';
import { X, CheckCircle, Loader2 } from 'lucide-react';
import { submitToSheets } from '../utils/googleSheets';

const FreeAuditModal = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    url: '',
    websiteName: '',
    email: '',
    phone: '',
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const { success, message } = await submitToSheets({
      formType: 'Free Audit',
      websiteUrl: form.url,
      websiteName: form.websiteName,
      email: form.email,
      phone: form.phone,
    });

    if (success) {
      setStatus('success');
    } else {
      setStatus('error');
      setErrorMsg(message || 'Something went wrong');
    }
  };

  const handleClose = () => {
    setStatus('idle');
    setForm({ url: '', websiteName: '', email: '', phone: '' });
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose} aria-label="Close modal" type="button">
          <X size={24} />
        </button>

        <h2 className="modal-title">Free Website Audit</h2>

        {status === 'success' ? (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <CheckCircle size={52} color="#22c55e" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              Request Submitted! 🎉
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
              We'll audit your website and send you a detailed report within 48 hours.
            </p>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button
                className="btn btn-secondary submit-btn"
                onClick={() => setStatus('idle')}
                type="button"
              >
                Back
              </button>
              <button className="btn btn-primary submit-btn" onClick={handleClose} type="button">
                Close
              </button>
            </div>
          </div>
        ) : (
          <form className="audit-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Website URL *</label>
              <input
                type="url"
                name="url"
                required
                placeholder="example.com"
                value={form.url}
                onChange={handleChange}
                disabled={status === 'loading'}
              />
            </div>

            <div className="form-group">
              <label>Website Name *</label>
              <input
                type="text"
                name="websiteName"
                required
                placeholder="Your Website Name"
                value={form.websiteName}
                onChange={handleChange}
                disabled={status === 'loading'}
              />
            </div>

            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                name="email"
                required
                placeholder="name@example.com"
                value={form.email}
                onChange={handleChange}
                disabled={status === 'loading'}
              />
            </div>

            <div className="form-group">
              <label>Phone Number (Optional)</label>
              <input
                type="tel"
                name="phone"
                placeholder="+1 (555) 000-0000"
                value={form.phone}
                onChange={handleChange}
                disabled={status === 'loading'}
              />
            </div>

            {status === 'error' && (
              <p style={{ color: '#ef4444', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
                ⚠️ {errorMsg}
              </p>
            )}

            <button
              type="submit"
              className="btn btn-primary submit-btn"
              disabled={status === 'loading'}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
              }}
            >
              {status === 'loading' ? (
                <>
                  <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                  Submitting...
                </>
              ) : (
                'Submit for Free Audit'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default FreeAuditModal; 
