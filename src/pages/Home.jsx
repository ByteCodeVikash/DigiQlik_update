// src/pages/Home.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Search,
  Share2,
  Palette,
  Target,
  Code,
  Video,
} from 'lucide-react';
import Hero from '../components/Hero';
import TrustedMarquee from '../components/TrustedMarquee';

// Image imports
import attentionSeekerImg from '../assets/attentionSeekerImg.jpeg';
import myFirstCrmImg from '../assets/my first crm.jpeg';
import gasxpertImg from '../assets/gasxpert.jpeg';
const founderImg = '/shekharkatiyar.jpeg';

/* ───────────────────────────────────────────
   Services data
─────────────────────────────────────────── */
const serviceHighlights = [
  { icon: <Search size={22} />, label: 'SEO & Performance Marketing', color: '#3b82f6' },
  { icon: <Code size={22} />, label: 'Web Development', color: '#6366f1' },
  { icon: <Palette size={22} />, label: 'Graphic & Branding Design', color: '#8b5cf6' },
  { icon: <Video size={22} />, label: 'Video Production', color: '#ec4899' },
  { icon: <Share2 size={22} />, label: 'Social Media Marketing', color: '#10b981' },
  { icon: <Target size={22} />, label: 'Paid Advertising (PPC)', color: '#f97316' },
];

/* ───────────────────────────────────────────
   Sub‑components
─────────────────────────────────────────── */
const ServicesPreview = () => {
  const navigate = useNavigate();
  return (
    <section className="hp-preview hp-services-preview">
      <div className="container">
        <div className="hp-preview-header">
          <span className="section-tag">What We Do</span>
          <h2 className="hp-preview-title">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="hp-preview-desc">
            Full-spectrum digital solutions designed to scale your brand and drive measurable growth.
          </p>
        </div>

        <div className="hp-services-chips">
          {serviceHighlights.map((s, i) => (
            <div className="hp-service-chip" key={i} style={{ '--chip-color': s.color }}>
              <span className="hp-chip-icon" style={{ color: s.color }}>{s.icon}</span>
              <span className="hp-chip-label">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="hp-preview-cta">
          <button className="hp-cta-btn" onClick={() => navigate('/services')}>
            Know More About Services <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

const processSteps = ['Discovery', 'Planning', 'Execution', 'Optimization'];

const ProcessPreview = () => {
  const navigate = useNavigate();
  return (
    <section className="hp-preview hp-process-preview">
      <div className="container">
        <div className="hp-preview-header">
          <span className="section-tag">Our Approach</span>
          <h2 className="hp-preview-title">
            How We <span className="text-gradient">Work</span>
          </h2>
          <p className="hp-preview-desc">
            A proven 4-step methodology that turns your vision into measurable digital success.
          </p>
        </div>

        <div className="hp-process-steps">
          {processSteps.map((step, i) => (
            <div className="hp-process-step" key={i}>
              <span className="hp-step-num">0{i + 1}</span>
              <span className="hp-step-label">{step}</span>
            </div>
          ))}
        </div>

        <div className="hp-preview-cta">
          <button className="hp-cta-btn hp-cta-btn--dark" onClick={() => navigate('/services')}>
            Know More About Our Process <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

const FounderPreview = () => {
  const navigate = useNavigate();

  const handleKnowMoreTeam = () => {
    navigate('/about');
    setTimeout(() => {
      const section = document.getElementById('team-section');
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <section className="hp-preview hp-founder-preview">
      <div className="container">
        <div className="hp-founder-card">
          <div className="hp-founder-img-col">
            <div className="hp-founder-img-frame">
              <img src={founderImg} alt="Shekhar Katiyar" className="hp-founder-hero-img" />
            </div>
          </div>
          <div className="hp-founder-content-col">
            <span className="hp-founder-label">Founder & CEO</span>
            <h3 className="hp-founder-subtitle">The Visionary</h3>
            <h2 className="hp-founder-name">Shekhar <span className="text-gradient">Katiyar</span></h2>
            <p className="hp-founder-desc">
              "Building digital excellence isn't just about code and pixels; it's about creating meaningful connections and driving real business impact for our partners across the globe. At DigiQlik, we turn your digital vision into reality."
            </p>
            <div className="hp-founder-cta">
              <button className="hp-cta-btn" onClick={handleKnowMoreTeam}>
                Know More About Our Team <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const homeProjects = [
  { title: '3D Portfolio', tag: 'Portfolio', image: attentionSeekerImg, liveUrl: 'https://attention-seeker-portfolio.vercel.app/' },
  { title: 'My First CRM', tag: 'CRM', image: myFirstCrmImg, liveUrl: 'https://my-first-crm.vercel.app/' },
  { title: 'GasXpert', tag: 'Gas Service', image: gasxpertImg, liveUrl: 'https://gasxpert.in/' },
];

const PortfolioPreview = () => {
  const navigate = useNavigate();
  return (
    <section className="hp-preview hp-portfolio-preview">
      <div className="container">
        <div className="hp-preview-header">
          <span className="section-tag">Our Work</span>
          <h2 className="hp-preview-title">
            Case <span className="text-gradient">Studies</span>
          </h2>
          <p className="hp-preview-desc">
            Explore how we've helped businesses achieve digital dominance.
          </p>
        </div>

        <div className="hp-portfolio-grid">
          {homeProjects.map((p, i) => (
            <a
              className="hp-project-mini"
              key={i}
              href={p.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <div className="hp-project-img-box">
                <img src={p.image} alt={p.title} />
                <div className="hp-project-overlay">
                  <span className="hp-project-tag">{p.tag}</span>
                </div>
              </div>
              <h4 className="hp-project-title">{p.title}</h4>
            </a>
          ))}
        </div>

        <div className="hp-preview-cta">
          <button className="hp-cta-btn" onClick={() => navigate('/portfolio')}>
            View All Projects <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

/* ───────────────────────────────────────────
   Main Home Component
─────────────────────────────────────────── */
const Home = ({ onBookCall = () => {} }) => {
  /* scroll-padding-top is set globally in index.css */

  return (
    <div className="page-home">
      <style>{`
        /* Home page overrides */
        .page-home {
          overflow-x: clip;
        }

        /* ----- common preview styles ----- */
        .hp-preview {
          padding: 5rem 0;
        }

        .hp-preview-header {
          text-align: center;
          max-width: 680px;
          margin: 0 auto 3rem;
        }

        .section-tag {
          display: inline-block;
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          background: #fff1e6;
          color: #f97316;
          padding: 0.35rem 1rem;
          border-radius: 40px;
          margin-bottom: 1rem;
        }

        .hp-preview-title {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.2;
          margin: 0.5rem 0 1rem;
          color: #0f172a;
        }

        .text-gradient {
          background: linear-gradient(135deg, #f97316, #fb923c);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }

        .hp-preview-desc {
          font-size: 1.1rem;
          color: #64748b;
          line-height: 1.6;
          margin: 0;
        }

        .hp-preview-cta {
          display: flex;
          justify-content: center;
          margin-top: 3rem;
        }

        .hp-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.85rem 2rem;
          background: linear-gradient(135deg, #f97316, #fb923c);
          color: #fff;
          font-weight: 700;
          font-size: 1rem;
          border: none;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 10px 25px rgba(249,115,22,0.25);
        }

        .hp-cta-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 35px rgba(249,115,22,0.35);
        }

        .hp-cta-btn--dark {
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          box-shadow: 0 10px 25px rgba(79,70,229,0.25);
        }

        .hp-cta-btn--dark:hover {
          box-shadow: 0 20px 35px rgba(79,70,229,0.35);
        }

        /* ----- services chips ----- */
        .hp-services-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
          max-width: 1000px;
          margin: 0 auto;
        }

        .hp-service-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.7rem 1.4rem;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 9999px;
          font-size: 0.95rem;
          font-weight: 600;
          color: #1e293b;
          transition: all 0.25s ease;
          cursor: default;
        }

        .hp-service-chip:hover {
          border-color: var(--chip-color);
          background: #fff;
          color: var(--chip-color);
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.05);
        }

        /* ----- process steps ----- */
        .hp-process-preview {
          background: #0f172a;
        }

        .hp-process-preview .hp-preview-title {
          color: #fff;
        }

        .hp-process-preview .hp-preview-desc {
          color: #94a3b8;
        }

        .hp-process-steps {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          flex-wrap: wrap;
          margin: 0 auto;
          max-width: 900px;
        }

        .hp-process-step {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 1.25rem;
          padding: 0.9rem 1.8rem;
          transition: all 0.3s ease;
        }

        .hp-process-step:hover {
          background: rgba(255,255,255,0.08);
          border-color: #4f46e5;
          transform: translateY(-4px);
        }

        .hp-step-num {
          font-size: 0.85rem;
          font-weight: 800;
          color: #4f46e5;
          background: #fff;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
        }

        .hp-step-label {
          font-weight: 700;
          font-size: 1rem;
          color: #e2e8f0;
        }

        /* ----- founder card ----- */
        .hp-founder-preview {
          background: #f8fafc;
        }

        .hp-founder-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          background: #fff;
          padding: 3rem;
          border-radius: 2.5rem;
          box-shadow: 0 25px 50px -12px rgba(0,0,0,0.1);
        }

        .hp-founder-img-frame {
          position: relative;
          border-radius: 2rem;
          overflow: hidden;
          aspect-ratio: 1 / 1;
        }

        .hp-founder-hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }

        .hp-founder-img-frame:hover .hp-founder-hero-img {
          transform: scale(1.02);
        }

        .hp-founder-content-col {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .hp-founder-label {
          font-size: 0.85rem;
          font-weight: 700;
          color: #f97316;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .hp-founder-subtitle {
          font-size: 1.3rem;
          font-weight: 600;
          color: #64748b;
          margin: 0;
        }

        .hp-founder-name {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          color: #0f172a;
          margin: 0;
          line-height: 1.2;
        }

        .hp-founder-desc {
          font-style: italic;
          font-size: 1.05rem;
          color: #334155;
          line-height: 1.7;
          margin: 0.5rem 0;
          padding-left: 1.25rem;
          border-left: 4px solid #f97316;
        }

        /* ----- portfolio grid ----- */
        .hp-portfolio-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-top: 1rem;
        }

        .hp-project-mini {
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .hp-project-mini:hover {
          transform: translateY(-6px);
        }

        .hp-project-img-box {
          position: relative;
          aspect-ratio: 16 / 10;
          border-radius: 1.25rem;
          overflow: hidden;
          margin-bottom: 1rem;
          box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);
        }

        .hp-project-img-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .hp-project-mini:hover .hp-project-img-box img {
          transform: scale(1.05);
        }

        .hp-project-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
          display: flex;
          align-items: flex-end;
          padding: 1rem;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .hp-project-mini:hover .hp-project-overlay {
          opacity: 1;
        }

        .hp-project-tag {
          color: #fff;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          background: #f97316;
          padding: 0.25rem 0.75rem;
          border-radius: 30px;
        }

        .hp-project-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0;
          text-align: center;
        }

        /* ----- responsive adjustments ----- */
        @media (max-width: 1024px) {
          .hp-founder-card {
            gap: 2.5rem;
            padding: 2.5rem;
          }
          .hp-portfolio-grid {
            gap: 1.5rem;
          }
          .hp-process-steps {
            gap: 1rem;
          }
        }

        @media (max-width: 768px) {
          .page-home .container {
            padding: 0 1.25rem;
          }
          .hp-preview {
            padding: 4rem 0;
          }
          .hp-preview-header {
            margin-bottom: 2rem;
          }
          .hp-founder-card {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 2rem;
            padding: 2rem;
          }
          .hp-founder-img-col {
            max-width: 260px;
            margin: 0 auto;
          }
          .hp-founder-desc {
            padding-left: 0;
            border-left: none;
            border-top: 3px solid #f97316;
            padding-top: 1rem;
            margin-top: 0.5rem;
          }
          .hp-portfolio-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .hp-process-steps {
            flex-direction: column;
            align-items: stretch;
            gap: 1rem;
          }
          .hp-process-step {
            justify-content: center;
          }
          .hp-preview-cta {
            margin-top: 2rem;
          }
          .hp-cta-btn {
            width: 100%;
            justify-content: center;
          }
          .hp-service-chip {
            padding: 0.6rem 1.2rem;
            font-size: 0.85rem;
          }
        }

        @media (max-width: 640px) {
          .hp-portfolio-grid {
            grid-template-columns: 1fr;
            max-width: 380px;
            margin-left: auto;
            margin-right: auto;
          }
          .hp-founder-card {
            padding: 1.5rem;
          }
          .hp-preview-title {
            font-size: clamp(1.8rem, 8vw, 2.2rem);
          }
          .hp-preview-desc {
            font-size: 1rem;
          }
        }
      `}</style>

      <Hero onBookCall={onBookCall} />
      <ServicesPreview />
      <ProcessPreview />
      <FounderPreview />
      <PortfolioPreview />
      <TrustedMarquee />
    </div>
  );
};

export default Home;