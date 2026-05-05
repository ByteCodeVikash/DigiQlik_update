import React, { useState } from 'react';
import { Sparkles, ArrowRight, Zap, Target, Rocket, BadgeCheck, GraduationCap, Video } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const UpsellView = ({ onPurchaseSuccess }) => {
  const { user } = useAuth();
  const [purchasing, setPurchasing] = useState(null);

  const recommendedCourses = [
    { id: 'dm-mastery', title: 'Digital Marketing Mastery', price: '₹4,999', icon: Rocket, color: '#E4403B', type: 'Course' },
    { id: 'seo-growth', title: 'SEO Growth System', price: '₹2,999', icon: Target, color: '#2D3E50', type: 'Course' },
  ];

  const recommendedWorkshops = [
    { id: 'workshop-ai', title: 'AI Marketing Workshop', price: '₹999', icon: Zap, color: '#10b981', type: 'Workshop' },
    { id: 'workshop-ads', title: 'Meta Ads Bootcamp', price: '₹1,499', icon: Video, color: '#3b82f6', type: 'Workshop' },
  ];

  const handleEnroll = async (courseId, title) => {
    setPurchasing(courseId);
    try {
      const token = localStorage.getItem('studentToken');
      // Step 1: Intent
      await axios.post('/api/purchase/intent', { courseId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Step 2: Verification (Simulated Success)
      const verifyRes = await axios.post('/api/purchase/verify', { 
        courseId, 
        transactionId: 'mock_tx_' + Date.now() 
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (verifyRes.data.success) {
        onPurchaseSuccess(verifyRes.data.user.purchasedPlans);
      }
    } catch (err) {
      console.error('Purchase failed:', err);
      alert('Purchase failed. Please try again.');
    } finally {
      setPurchasing(null);
    }
  };

  const renderCard = (item) => (
    <div className="upsell-card" key={item.id} style={{ '--course-color': item.color }}>
      <div className="upsell-card-glass" />
      <div className="upsell-card-icon" style={{ background: `${item.color}15`, color: item.color }}>
        <item.icon size={28} />
      </div>
      <div className="upsell-card-content">
        <div className="item-type">{item.type}</div>
        <h3>{item.title}</h3>
        <div className="upsell-price-row">
          <span className="upsell-price">{item.price}</span>
        </div>
        <button 
          className="enroll-btn" 
          onClick={() => handleEnroll(item.id, item.title)}
          disabled={purchasing === item.id}
        >
          {purchasing === item.id ? 'Processing...' : (item.type === 'Workshop' ? 'Join Workshop' : 'Enroll Now')}
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="upsell-wrapper">
      <div className="upsell-container">
        <div className="upsell-header">
          <div className="upsell-badge">
            <Sparkles size={16} />
            Unlock Your Potential
          </div>
          <h1>You have not enrolled in any DigiQlik learning plan yet</h1>
          <p>Choose from our top-rated professional programs and start your journey towards digital mastery today.</p>
        </div>

        <div className="upsell-section">
          <div className="section-title">
            <GraduationCap size={20} />
            Most Recommended Courses
          </div>
          <div className="upsell-grid">
            {recommendedCourses.map(renderCard)}
          </div>
        </div>

        <div className="upsell-section">
          <div className="section-title">
            <Video size={20} />
            High-Impact Workshops
          </div>
          <div className="upsell-grid">
            {recommendedWorkshops.map(renderCard)}
          </div>
        </div>

        <div className="upsell-footer-benefits">
          <div className="benefit">
            <BadgeCheck size={18} />
            <span>Verified Certification</span>
          </div>
          <div className="benefit">
            <Zap size={18} />
            <span>Lifetime Access</span>
          </div>
          <div className="benefit">
            <Sparkles size={18} />
            <span>Industry Experts</span>
          </div>
        </div>
      </div>

      <style>{`
        .upsell-wrapper {
          padding: 2rem 1.5rem;
          min-height: 100%;
          background: radial-gradient(circle at 10% 10%, rgba(228, 64, 59, 0.03), transparent 40%),
                      radial-gradient(circle at 90% 90%, rgba(45, 62, 80, 0.03), transparent 40%);
        }
        .upsell-container {
          max-width: 1000px;
          margin: 0 auto;
        }
        .upsell-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .upsell-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(228, 64, 59, 0.08);
          color: #E4403B;
          padding: 0.5rem 1.25rem;
          border-radius: 2rem;
          font-weight: 700;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1.5rem;
        }
        .upsell-header h1 {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 900;
          color: #0f172a;
          margin-bottom: 1.25rem;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }
        .upsell-header p {
          font-size: 1.15rem;
          color: #64748b;
          max-width: 650px;
          margin: 0 auto;
          line-height: 1.6;
        }
        .upsell-section {
          margin-bottom: 4rem;
        }
        .section-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.25rem;
          font-weight: 800;
          color: #1e293b;
          margin-bottom: 2rem;
          padding-left: 0.5rem;
        }
        .upsell-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 2rem;
        }
        .upsell-card {
          position: relative;
          background: #fff;
          border-radius: 2rem;
          padding: 2rem;
          border: 1px solid rgba(226, 232, 240, 0.8);
          display: flex;
          gap: 1.5rem;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
        }
        .upsell-card-glass {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 100%);
          pointer-events: none;
        }
        .upsell-card:hover {
          transform: translateY(-8px) scale(1.01);
          box-shadow: 0 30px 60px -12px rgba(0,0,0,0.1);
          border-color: var(--course-color);
        }
        .upsell-card-icon {
          width: 56px;
          height: 56px;
          border-radius: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .upsell-card-content {
          flex: 1;
        }
        .item-type {
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
          color: #94a3b8;
          letter-spacing: 0.1em;
          margin-bottom: 0.25rem;
        }
        .upsell-card-content h3 {
          font-size: 1.35rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 1rem;
          line-height: 1.3;
        }
        .upsell-price-row {
          margin-bottom: 1.5rem;
        }
        .upsell-price {
          font-size: 1.5rem;
          font-weight: 900;
          color: #1e293b;
        }
        .enroll-btn {
          width: 100%;
          padding: 1.1rem;
          border-radius: 1.1rem;
          background: #0f172a;
          color: #fff;
          font-weight: 700;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          transition: all 0.3s;
        }
        .upsell-card:hover .enroll-btn {
          background: var(--course-color);
          box-shadow: 0 12px 24px -6px rgba(var(--course-color-rgb), 0.3);
        }
        .upsell-footer-benefits {
          display: flex;
          justify-content: center;
          gap: 4rem;
          margin-top: 2rem;
          padding: 3rem;
          border-top: 1px solid #f1f5f9;
        }
        .benefit {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: #64748b;
          font-weight: 600;
          font-size: 0.95rem;
        }
        .benefit svg {
          color: #E4403B;
        }
        @media (max-width: 768px) {
          .upsell-grid { grid-template-columns: 1fr; }
          .upsell-footer-benefits { flex-direction: column; gap: 1.5rem; align-items: center; }
          .upsell-card { padding: 1.5rem; }
        }
      `}</style>
    </div>
  );
};

export default UpsellView;
