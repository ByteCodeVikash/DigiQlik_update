import React from 'react';
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Users,
} from 'lucide-react';
import Services from '../components/Services';
import MarketingBranding from '../components/MarketingBranding';
import FAQ from '../components/FAQ';

const wa = (msg) =>
  `https://wa.me/919217644096?text=${encodeURIComponent(msg)}`;

const ServicesPage = () => {
  return (
    <div className="svc-page">
      <style>{`
        /* ╔══════════════════════════════════════════════════╗
           ║  SERVICES PAGE  ·  .svc-page prefix             ║
           ╚══════════════════════════════════════════════════╝ */

        .svc-page {
          font-family: Inter, system-ui, -apple-system, 'Segoe UI', sans-serif;
          background: var(--bg-dark-master);
        }

        /* ── HERO ─────────────────────────────────────────── */
        .svc-hero {
          padding: clamp(80px, 11vw, 130px) 1.5rem clamp(70px, 9vw, 110px);
          background: var(--gradient-dark-master);
          position: relative; overflow: hidden; text-align: center;
        }
        .svc-hero::before {
          content: "";
          position: absolute; inset: 0;
          background: var(--gradient-glow-master);
          pointer-events: none;
        }
        .svc-hero::after {
          content: "";
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 50px 50px;
          pointer-events: none;
        }
        .svc-hero-inner {
          max-width: 760px; margin: 0 auto; position: relative; z-index: 1;
        }
        .svc-hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 7px 20px; border-radius: 999px;
          background: rgba(228,64,59,0.14); border: 1px solid rgba(228,64,59,0.32);
          color: #f8a09d; font-size: 0.75rem; font-weight: 700;
          letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 1.8rem;
        }
        .svc-hero-h1 {
          font-size: clamp(2.4rem, 5.5vw, 4rem); font-weight: 800;
          line-height: 1.06; letter-spacing: -0.038em;
          color: var(--text-main-dark); margin: 0 0 1.2rem;
        }
        .svc-hero-h1 em {
          font-style: normal;
          background: linear-gradient(135deg, #E4403B, #f87171);
          background-clip: text; -webkit-background-clip: text; color: transparent;
        }
        .svc-hero-p {
          font-size: clamp(1rem, 2vw, 1.15rem); color: var(--text-muted-dark);
          line-height: 1.72; margin: 0 auto 2rem; max-width: 560px;
        }
        .svc-trust-row {
          display: flex; align-items: center; justify-content: center;
          gap: 1.5rem; flex-wrap: wrap; margin-bottom: 2.4rem;
        }
        .svc-trust-pill {
          display: flex; align-items: center; gap: 6px;
          color: #94a3b8; font-size: 0.88rem; font-weight: 600;
        }
        .svc-trust-pill svg { color: #E4403B; }
        .svc-trust-dot { width: 4px; height: 4px; border-radius: 50%; background: #E4403B; }
        .svc-hero-actions {
          display: flex; align-items: center; justify-content: center;
          gap: 1rem; flex-wrap: wrap;
        }

        /* ── SHARED BUTTONS ───────────────────────────────── */
        .svc-btn-orange {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 26px; border-radius: 9999px;
          background: linear-gradient(135deg, #E4403B, #c0392b);
          color: #fff; font-weight: 700; font-size: 0.97rem;
          border: none; cursor: pointer; text-decoration: none;
          box-shadow: 0 10px 28px rgba(228,64,59,0.28);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .svc-btn-orange:hover {
          transform: translateY(-3px); box-shadow: 0 18px 38px rgba(228,64,59,0.38);
        }
        .svc-btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 26px; border-radius: 9999px;
          background: transparent; color: #cbd5e1;
          font-weight: 600; font-size: 0.97rem;
          border: 1px solid rgba(203,213,225,0.22); cursor: pointer;
          text-decoration: none;
          transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
        }
        .svc-btn-ghost:hover {
          background: rgba(203,213,225,0.08);
          border-color: rgba(203,213,225,0.4);
          color: #f1f5f9;
        }

        /* ── FINAL CTA ────────────────────────────────────── */
        .svc-cta {
          padding: clamp(4.5rem, 8vw, 8rem) 1.5rem; text-align: center;
          background:
            radial-gradient(ellipse at 25% 60%, rgba(228,64,59,0.24), transparent 50%),
            radial-gradient(ellipse at 78% 25%, rgba(228,64,59,0.16), transparent 48%),
            linear-gradient(170deg, #1a0a08 0%, #2d1510 100%);
          position: relative; overflow: hidden;
        }
        .svc-cta::before {
          content: "";
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 50px 50px; pointer-events: none;
        }
        .svc-cta-inner {
          max-width: 620px; margin: 0 auto; position: relative; z-index: 1;
        }
        .svc-cta-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 7px 20px; border-radius: 999px;
          background: rgba(228,64,59,0.14); border: 1px solid rgba(228,64,59,0.32);
          color: #f8a09d; font-size: 0.75rem; font-weight: 700;
          letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 1.5rem;
        }
        .svc-cta-h2 {
          font-size: clamp(2rem, 5vw, 3.4rem); font-weight: 800;
          letter-spacing: -0.038em; line-height: 1.08;
          color: #f8fafc; margin: 0 0 1rem;
        }
        .svc-cta-h2 em {
          font-style: normal;
          background: linear-gradient(135deg, #E4403B, #f87171);
          background-clip: text; -webkit-background-clip: text; color: transparent;
        }
        .svc-cta-p {
          font-size: 1.05rem; color: #94a3b8; line-height: 1.7;
          margin: 0 auto 2.4rem; max-width: 480px;
        }
        .svc-cta-actions {
          display: flex; align-items: center; justify-content: center;
          gap: 1rem; flex-wrap: wrap;
        }
        .svc-cta-note {
          font-size: 0.78rem; color: #475569; margin-top: 1.4rem;
          letter-spacing: 0.01em;
        }

        /* ── RESPONSIVE ───────────────────────────────────── */
        @media (max-width: 640px) {
          .svc-btn-orange,
          .svc-btn-ghost {
            width: 100%; justify-content: center;
          }
          .svc-hero-actions,
          .svc-cta-actions {
            flex-direction: column;
          }
          .svc-trust-row {
            gap: 0.75rem;
          }
        }
      `}</style>

      {/* ── 1. HERO ── */}
      <section className="svc-hero">
        <div className="svc-hero-inner">
          <div className="svc-hero-badge">
            <Sparkles size={12} />
            DigiQlik Services
          </div>
          <h1 className="svc-hero-h1">
            Full-Spectrum Digital Services<br />
            <em>Built to Scale</em>
          </h1>
          <p className="svc-hero-p">
            From web development to performance marketing — we handle every
            digital touchpoint so your brand grows faster, looks premium, and converts better.
          </p>
          <div className="svc-trust-row">
            <span className="svc-trust-pill"><TrendingUp size={14} /> Growth-Focused</span>
            <span className="svc-trust-dot" />
            <span className="svc-trust-pill"><Users size={14} /> 100+ Clients</span>
            <span className="svc-trust-dot" />
            <span className="svc-trust-pill"><Award size={14} /> Premium Quality</span>
            <span className="svc-trust-dot" />
            <span className="svc-trust-pill"><CheckCircle2 size={14} /> Full-Cycle Support</span>
          </div>
          <div className="svc-hero-actions">
            <a href="#services" className="svc-btn-orange">
              Explore Services <ArrowRight size={16} />
            </a>
            <a
              href={wa('Hi, I want to know more about DigiQlik services and pricing.')}
              target="_blank"
              rel="noopener noreferrer"
              className="svc-btn-ghost"
            >
              Talk to Us
            </a>
          </div>
        </div>
      </section>

      {/* ── 2. SERVICES GRID ── */}
      <div id="services">
        <FAQ />
      </div>

      {/* ── 3. MARKETING & BRANDING ── */}
      <Services />
      <MarketingBranding />

      {/* ── 4. FINAL CTA ── */}
      <section className="svc-cta">
        <div className="svc-cta-inner">
          <div className="svc-cta-badge">
            <Sparkles size={12} /> Get Started
          </div>
          <h2 className="svc-cta-h2">
            Ready to Build Something<br />
            <em>Exceptional?</em>
          </h2>
          <p className="svc-cta-p">
            Tell us about your project and get a tailored proposal within 24 hours.
            No obligation — just clarity on what's possible.
          </p>
          <div className="svc-cta-actions">
            <a
              href={wa('Hi, I want to start a project with DigiQlik. Please guide me on the next steps.')}
              target="_blank"
              rel="noopener noreferrer"
              className="svc-btn-orange"
            >
              Start a Project <ArrowRight size={16} />
            </a>
            <a
              href={wa('Hi, I would like a free consultation about DigiQlik services.')}
              target="_blank"
              rel="noopener noreferrer"
              className="svc-btn-ghost"
            >
              Free Consultation
            </a>
          </div>
          <p className="svc-cta-note">
            Web · Marketing · Branding · Video · SEO — all under one roof
          </p>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
