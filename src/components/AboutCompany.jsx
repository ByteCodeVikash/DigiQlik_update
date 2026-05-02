import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, Eye, Heart, Zap, Users, Globe, Award, TrendingUp } from 'lucide-react';

const stats = [
  { value: '150+', label: 'Projects Delivered', icon: <Award size={22} /> },
  { value: '8+',   label: 'Years of Excellence', icon: <TrendingUp size={22} /> },
  { value: '50+',  label: 'Happy Clients', icon: <Users size={22} /> },
  { value: '10+',  label: 'Countries Served', icon: <Globe size={22} /> },
];

const values = [
  {
    icon: <Target size={28} />,
    color: '#E4403B',
    bg: 'rgba(228,64,59,0.1)',
    title: 'Results-First',
    desc: 'Every strategy, campaign, and line of code we write is engineered to deliver measurable outcomes — not just deliverables.',
  },
  {
    icon: <Eye size={28} />,
    color: '#2D3E50',
    bg: 'rgba(45,62,80,0.1)',
    title: 'Transparent Partnership',
    desc: 'No jargon, no hidden costs. We believe in honest communication and clear timelines that keep you in control at every stage.',
  },
  {
    icon: <Zap size={28} />,
    color: '#E4403B',
    bg: 'rgba(228,64,59,0.1)',
    title: 'Speed & Quality',
    desc: 'We move fast without breaking things. Agile sprints, rapid prototyping, and quality checks baked into every workflow.',
  },
  {
    icon: <Heart size={28} />,
    color: '#2D3E50',
    bg: 'rgba(45,62,80,0.1)',
    title: 'Passion-Driven',
    desc: 'We treat every client\'s brand as if it were our own — bringing genuine excitement and deep care to every project we touch.',
  },
];

const AboutCompany = () => {
  const navigate = useNavigate();

  const handleKnowMoreTeam = () => {
    navigate('/about');
    setTimeout(() => {
      const teamSection = document.getElementById('team-section');
      if (teamSection) {
        teamSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  };

  return (
    <section className="about-company-section">
      <div className="container">

        {/* ── Hero block ── */}
        <div className="ac-hero">
          <span className="section-tag">Who We Are</span>
          <h1 className="ac-heading">
            We Are <span className="text-gradient">DigiQlik</span>
          </h1>
          <p className="ac-lead">
            A full-service digital agency born in Noida, India — built to transform brands,
            accelerate growth, and create digital experiences that people remember.
          </p>
        </div>

        {/* ── Story ── */}
        <div className="ac-story-grid">
          <div className="ac-story-text">
            <span className="section-tag">Our Story</span>
            <h2 className="ac-sub-heading">From a Bold Idea to a Trusted Agency</h2>
            <p>
              DigiQlik was founded with a single belief — that every business, regardless of size,
              deserves world-class digital marketing and technology. Starting with a small team of
              passionate creators and strategists, we have grown into a multi-disciplinary agency
              serving clients across India and beyond.
            </p>
            <p style={{ marginTop: '1.25rem' }}>
              From crafting compelling brand identities to engineering high-performance web platforms,
              we combine creativity with data to deliver work that drives real, lasting impact.
              Our clients trust us not just as a vendor, but as a strategic growth partner.
            </p>
            <div className="ac-badges">
              <span className="ac-badge">🏆 Award-Winning Designs</span>
              <span className="ac-badge">📈 Data-Driven Strategy</span>
              <span className="ac-badge">🤝 Long-Term Partnerships</span>
            </div>

            <button
              className="ac-know-more-btn"
              onClick={handleKnowMoreTeam}
              aria-label="Know more about our team"
            >
              <span>Know More About Team</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <div className="ac-story-visual">
            <div className="ac-stats-grid">
              {stats.map((s, i) => (
                <div className="ac-stat-card" key={i}>
                  <div className="ac-stat-icon">{s.icon}</div>
                  <div className="ac-stat-value">{s.value}</div>
                  <div className="ac-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Mission & Vision ── */}
        <div className="ac-mv-grid">
          <div className="ac-mv-card ac-mission">
            <div className="ac-mv-icon">🎯</div>
            <h3>Our Mission</h3>
            <p>
              To empower businesses with innovative digital solutions that simplify complexity,
              amplify reach, and create sustainable competitive advantage in an ever-evolving
              digital landscape.
            </p>
          </div>
          <div className="ac-mv-card ac-vision">
            <div className="ac-mv-icon">🔭</div>
            <h3>Our Vision</h3>
            <p>
              To become South Asia's most trusted digital growth partner — known for combining
              human creativity with cutting-edge technology to build brands that define their
              industries.
            </p>
          </div>
        </div>

        {/* ── Core Values ── */}
        <div className="ac-values-section">
          <div className="ac-values-header">
            <span className="section-tag">Core Values</span>
            <h2 className="ac-sub-heading">What Drives Us Every Day</h2>
          </div>
          <div className="ac-values-grid">
            {values.map((v, i) => (
              <div className="ac-value-card" key={i}>
                <div className="ac-value-icon" style={{ color: v.color, background: v.bg }}>
                  {v.icon}
                </div>
                <h4 className="ac-value-title">{v.title}</h4>
                <p className="ac-value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        .about-company-section {
          padding: 4rem 0;
          background: linear-gradient(180deg, #F8FAFC 0%, #ffffff 60%, #F8FAFC 100%);
        }

        /* Hero */
        .ac-hero {
          text-align: center;
          margin-bottom: 3.5rem;
        }
        .ac-heading {
          font-size: clamp(2.4rem, 5vw, 3.8rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.1;
          margin: 0.5rem 0 1.25rem;
        }
        .ac-lead {
          font-size: clamp(1rem, 2vw, 1.2rem);
          color: #64748b;
          max-width: 680px;
          margin: 0 auto;
          line-height: 1.7;
        }

        /* Story */
        .ac-story-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          margin-bottom: 3rem;
        }
        .ac-story-text p {
          color: #475569;
          font-size: 1.025rem;
          line-height: 1.75;
        }
        .ac-sub-heading {
          font-size: clamp(1.5rem, 3vw, 2.1rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          margin: 0.5rem 0 1.25rem;
          line-height: 1.2;
        }
        .ac-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-top: 1.75rem;
        }
        .ac-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: var(--color-primary-light);
          border: 1px solid rgba(228, 64, 59, 0.2);
          color: var(--color-primary-hover);
          font-size: 0.85rem;
          font-weight: 600;
          padding: 0.45rem 1rem;
          border-radius: 9999px;
        }

        /* Know More About Team Button */
        .ac-know-more-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          margin-top: 1.75rem;
          padding: 0.65rem 1.5rem;
          background: transparent;
          border: 2px solid var(--color-primary);
          color: var(--color-primary);
          font-size: 0.95rem;
          font-weight: 700;
          border-radius: 9999px;
          cursor: pointer;
          transition: background 0.25s ease, color 0.25s ease, box-shadow 0.25s ease, transform 0.2s ease;
          letter-spacing: 0.01em;
        }
        .ac-know-more-btn:hover {
          background: var(--color-primary);
          color: #ffffff;
          box-shadow: 0 6px 20px rgba(228, 64, 59, 0.35);
          transform: translateY(-2px);
        }
        .ac-know-more-btn:active {
          transform: translateY(0);
          box-shadow: none;
        }

        /* Stats */
        .ac-stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }
        .ac-stat-card {
          background: #ffffff;
          border: 1px solid #f1f5f9;
          border-radius: 1.25rem;
          padding: 1.75rem 1.5rem;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0,0,0,0.04);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .ac-stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 28px rgba(228, 64, 59, 0.1);
        }
        .ac-stat-icon {
          color: var(--color-primary);
          margin-bottom: 0.75rem;
          display: flex;
          justify-content: center;
        }
        .ac-stat-value {
          font-size: 2.25rem;
          font-weight: 800;
          color: var(--color-primary);
          line-height: 1;
          margin-bottom: 0.4rem;
        }
        .ac-stat-label {
          font-size: 0.875rem;
          color: #64748b;
          font-weight: 500;
        }

        /* Mission / Vision */
        .ac-mv-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 3.5rem;
        }
        .ac-mv-card {
          border-radius: 1.5rem;
          padding: 2.5rem;
          position: relative;
          overflow: hidden;
        }
        .ac-mission {
          background: linear-gradient(135deg, #FCECEB, #F8D7D5);
          border: 1px solid rgba(228, 64, 59, 0.2);
        }
        .ac-vision {
          background: linear-gradient(135deg, #E2E8F0, #CBD5E1);
          border: 1px solid rgba(45, 62, 80, 0.2);
        }
        .ac-mv-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        .ac-mv-card h3 {
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          color: #1e293b;
        }
        .ac-mv-card p {
          color: #475569;
          line-height: 1.7;
          font-size: 0.975rem;
        }

        /* Values */
        .ac-values-section { }
        .ac-values-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        .ac-values-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        .ac-value-card {
          background: #ffffff;
          border: 1px solid #f1f5f9;
          border-radius: 1.25rem;
          padding: 2rem 1.5rem;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s;
        }
        .ac-value-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 32px rgba(0,0,0,0.08);
          border-color: var(--color-primary);
        }
        .ac-value-icon {
          width: 56px;
          height: 56px;
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
        }
        .ac-value-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.65rem;
        }
        .ac-value-desc {
          font-size: 0.9rem;
          color: #64748b;
          line-height: 1.65;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .ac-values-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .about-company-section { padding: 2.5rem 0; }
          .ac-story-grid { grid-template-columns: 1fr; gap: 2.5rem; }
          .ac-mv-grid { grid-template-columns: 1fr; gap: 1.25rem; }
          .ac-hero { margin-bottom: 2rem; }
        }
        @media (max-width: 640px) {
          .ac-values-grid { grid-template-columns: 1fr; }
          .ac-stats-grid { grid-template-columns: 1fr 1fr; gap: 1rem; }
          .ac-mv-card { padding: 2rem 1.5rem; }
        }
      `}</style>
    </section>
  );
};

export default AboutCompany;
