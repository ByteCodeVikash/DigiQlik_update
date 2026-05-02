import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Award,
  BadgeCheck,
  BookOpen,
  CalendarDays,
  FileText,
  GraduationCap,
  Megaphone,
  Palette,
  Search,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  Video,
  X,
  Zap,
} from 'lucide-react';

/* ─── WhatsApp helper ─────────────────────────────────── */
const wa = (msg) =>
  `https://wa.me/919217644096?text=${encodeURIComponent(msg)}`;

/* ─── Course catalogue ────────────────────────────────── */
const COURSES = [
  {
    id: 'dm-mastery',
    title: 'Digital Marketing Mastery',
    subtitle: 'Full-spectrum digital marketing — every channel, one program.',
    level: 'Intermediate',
    duration: '8 Weeks',
    sessions: '16 Sessions',
    access: 'Full Access',
    price: '₹4,999',
    original: '₹9,999',
    badge: 'Bestseller',
    g: ['#E4403B', '#c0392b'],
    icon: Megaphone,
    outcomes: [
      'Plan and run multi-channel marketing campaigns',
      'Manage SEO, paid ads, and social simultaneously',
      'Interpret analytics and report ROI',
      'Build a complete portfolio of real campaigns',
    ],
    curriculum: [
      'Digital marketing landscape & funnel strategy',
      'SEO fundamentals and keyword planning',
      'Google Ads campaign management',
      'Meta Ads (Facebook & Instagram)',
      'Email marketing & automation',
      'Analytics, GA4 & performance reporting',
      'Social media content strategy',
      'Capstone: live campaign project',
    ],
    includes: [
      '16 live interactive sessions',
      'Hands-on campaign projects',
      'Study material & session notes',
      'Certificate of completion',
      'Mentor access for doubts',
      '30-day post-course support',
    ],
  },
  {
    id: 'seo-growth',
    title: 'SEO Growth System',
    subtitle: 'Rank higher, grow traffic, and dominate organic search.',
    level: 'Beginner',
    duration: '6 Weeks',
    sessions: '12 Sessions',
    access: 'Full Access',
    price: '₹2,999',
    original: '₹5,999',
    badge: null,
    g: ['#2D3E50', '#111111'],
    icon: Search,
    outcomes: [
      'Perform full SEO audits on any website',
      'Build a data-driven keyword strategy',
      'Earn quality backlinks systematically',
      'Track rankings and organic growth over time',
    ],
    curriculum: [
      'SEO fundamentals and Google algorithm',
      'Keyword research with real tools',
      'On-page SEO: structure, meta, schema',
      'Technical SEO and Core Web Vitals',
      'Link building and outreach strategies',
      'SEO content writing and ranking practice',
    ],
    includes: [
      '12 live interactive sessions',
      'SEO audit toolkit',
      'Study material & templates',
      'Certificate of completion',
      'Mentor access for doubts',
    ],
  },
  {
    id: 'social-media',
    title: 'Social Media Marketing',
    subtitle: 'Grow brands on Instagram, Facebook, and YouTube.',
    level: 'Beginner',
    duration: '5 Weeks',
    sessions: '10 Sessions',
    access: 'Full Access',
    price: '₹2,499',
    original: '₹4,999',
    badge: null,
    g: ['#E4403B', '#2D3E50'],
    icon: Users,
    outcomes: [
      'Create content that consistently drives engagement',
      'Manage brand pages and growth campaigns',
      'Plan content calendars and posting schedules',
      'Read platform analytics to improve performance',
    ],
    curriculum: [
      'Social media platform landscape and strategy',
      'Content planning and editorial calendar',
      'Reels, carousels, and stories strategy',
      'Engagement tactics and community building',
      'Brand voice, creative, and design principles',
      'Platform analytics and performance reporting',
    ],
    includes: [
      '10 live interactive sessions',
      'Content calendar templates',
      'Study material',
      'Certificate of completion',
      'Mentor access',
    ],
  },
  {
    id: 'performance-ads',
    title: 'Performance Ads Mastery',
    subtitle: 'Meta, Google, and retargeting for maximum campaign ROI.',
    level: 'Intermediate',
    duration: '6 Weeks',
    sessions: '12 Sessions',
    access: 'Full Access',
    price: '₹3,999',
    original: '₹7,999',
    badge: 'Hot',
    g: ['#c0392b', '#1a0a08'],
    icon: Target,
    outcomes: [
      'Launch profitable ad campaigns from day one',
      'Optimise cost-per-lead and ROAS effectively',
      'Set up pixel tracking and conversion events',
      'Scale winning campaigns without losing ROI',
    ],
    curriculum: [
      'Ad ecosystem overview: Meta vs Google',
      'Facebook & Instagram Ads setup',
      'Google Search and Display campaigns',
      'Pixel, tracking, and attribution setup',
      'A/B testing and scaling strategies',
      'Budget optimisation and performance reporting',
    ],
    includes: [
      '12 live interactive sessions',
      'Ad account setup walkthroughs',
      'Study material & swipe files',
      'Certificate of completion',
      'Mentor access',
    ],
  },
  {
    id: 'google-ads',
    title: 'Google Ads Professional',
    subtitle: 'Master search, display, shopping, and YouTube ads.',
    level: 'Intermediate',
    duration: '5 Weeks',
    sessions: '10 Sessions',
    access: 'Full Access',
    price: '₹3,499',
    original: '₹6,999',
    badge: null,
    g: ['#2D3E50', '#E4403B'],
    icon: TrendingUp,
    outcomes: [
      'Build and manage Google Ads campaigns end-to-end',
      'Control bidding strategy and quality score',
      'Write effective ad copy with all extensions',
      'Analyse performance and optimise for ROI',
    ],
    curriculum: [
      'Google Ads account architecture',
      'Search campaign creation and keyword targeting',
      'Display and remarketing campaigns',
      'Shopping ads for e-commerce',
      'YouTube advertising basics',
      'Optimisation, reporting and bid automation',
    ],
    includes: [
      '10 live interactive sessions',
      'Campaign templates and checklists',
      'Study material',
      'Certificate of completion',
      'Mentor access',
    ],
  },
  {
    id: 'content-marketing',
    title: 'Content Marketing Blueprint',
    subtitle: 'Build an audience and generate leads with compelling content.',
    level: 'Beginner',
    duration: '4 Weeks',
    sessions: '8 Sessions',
    access: 'Full Access',
    price: '₹1,999',
    original: '₹3,999',
    badge: null,
    g: ['#E4403B', '#f87171'],
    icon: FileText,
    outcomes: [
      'Develop a content strategy that drives qualified leads',
      'Write blogs, scripts, and ad copy that convert',
      'Build a content distribution system across channels',
      'Measure content performance and iterate quickly',
    ],
    curriculum: [
      'Content marketing strategy fundamentals',
      'Audience research and content mapping',
      'Blog writing that ranks and converts',
      'Video scripts and social content formats',
      'Content distribution channels and amplification',
      'Analytics and content ROI measurement',
    ],
    includes: [
      '8 live interactive sessions',
      'Content templates and frameworks',
      'Study material',
      'Certificate of completion',
      'Mentor access',
    ],
  },
  {
    id: 'branding',
    title: 'Branding Strategy',
    subtitle: 'Build a brand people remember, trust, and choose every time.',
    level: 'Beginner',
    duration: '4 Weeks',
    sessions: '8 Sessions',
    access: 'Full Access',
    price: '₹2,499',
    original: '₹4,999',
    badge: null,
    g: ['#1a0a08', '#2D3E50'],
    icon: Palette,
    outcomes: [
      'Build a distinct brand identity from scratch',
      'Define a brand voice, tone, and messaging framework',
      'Create a brand kit and visual identity guidelines',
      'Position your brand competitively in the market',
    ],
    curriculum: [
      'Branding fundamentals and consumer psychology',
      'Market positioning and target persona creation',
      'Visual identity: logo, colours, typography',
      'Brand voice, tone, and messaging strategy',
      'Competitor brand analysis and positioning',
      'Practical brand kit creation exercise',
    ],
    includes: [
      '8 live interactive sessions',
      'Brand kit templates',
      'Study material',
      'Certificate of completion',
      'Mentor access',
    ],
  },
  {
    id: 'ecommerce',
    title: 'E-commerce Marketing',
    subtitle: 'Grow product sales with proven digital and marketplace strategies.',
    level: 'Advanced',
    duration: '6 Weeks',
    sessions: '12 Sessions',
    access: 'Full Access',
    price: '₹3,499',
    original: '₹6,999',
    badge: null,
    g: ['#E4403B', '#111111'],
    icon: ShoppingCart,
    outcomes: [
      'Launch and grow products on Amazon, Flipkart, and D2C',
      'Run product ads that drive consistent profitable sales',
      'Optimise listings for search visibility on marketplaces',
      'Build retention strategies to increase repeat orders',
    ],
    curriculum: [
      'E-commerce business model overview',
      'Product listing and SEO on marketplaces',
      'Performance ads for product promotions',
      'D2C brand building and Shopify basics',
      'Customer retention and email flows',
      'Metrics: conversion rate, AOV, and LTV',
    ],
    includes: [
      '12 live interactive sessions',
      'E-commerce strategy templates',
      'Study material',
      'Certificate of completion',
      'Mentor access',
    ],
  },
];

const LEVEL_COLOR = {
  Beginner: { bg: '#f1f5f9', text: '#475569' },
  Intermediate: { bg: '#ffebeb', text: '#E4403B' },
  Advanced: { bg: '#2D3E50', text: '#fff' },
};

const BENEFITS = [
  { icon: Zap, title: 'Instant Access', desc: 'Get course materials the moment you enroll.' },
  { icon: BookOpen, title: 'Practical Learning', desc: 'Real tasks, live projects, and campaign practice.' },
  { icon: Award, title: 'Certificate Included', desc: 'Industry-recognised certificate on completion.' },
  { icon: ShieldCheck, title: 'Expert Support', desc: 'Mentor Q&A and post-course doubt clearing.' },
];

const STEPS = [
  { num: '01', title: 'Browse & Choose', desc: 'Explore the catalog and pick the skill that matches your goal.' },
  { num: '02', title: 'Secure Purchase', desc: 'Pay via UPI, card, or bank transfer. Get instant confirmation on WhatsApp.' },
  { num: '03', title: 'Start Learning', desc: 'Access your course, join live sessions, finish projects, earn your certificate.' },
];

const REVIEWS = [
  { name: 'Priya Sharma', role: 'Digital Marketing Executive', city: 'Bengaluru', rating: 5, course: 'Google Ads Professional', text: 'I landed my first digital marketing job within a month of completing this course. The live sessions are incredibly practical and the mentor is always available to help.' },
  { name: 'Rahul Mehta', role: 'Freelance SEO Specialist', city: 'Delhi', rating: 5, course: 'SEO Growth System', text: 'This course changed how I approach content. Organic traffic on my clients\' sites went up 3× within 60 days. Completely worth every rupee.' },
  { name: 'Anita Patel', role: 'Small Business Owner', city: 'Mumbai', rating: 5, course: 'Digital Marketing Mastery', text: 'Best investment I made this year. My ads are finally profitable and I understand exactly what\'s working. The capstone project alone was worth the full price.' },
];

const STATS = [
  { value: '500+', label: 'Students Enrolled' },
  { value: '4.8★', label: 'Average Rating' },
  { value: '95%', label: 'Completion Rate' },
  { value: '200+', label: 'Certificates Issued' },
];

/* ══════════════════════════════════════════════════════════ */
export default function CoursesPage() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  const displayed =
    filter === 'All' ? COURSES : COURSES.filter((c) => c.level === filter);

  return (
    <div className="cmp">
      <style>{`
        /* ╔══════════════════════════════════════════════════╗
           ║  COURSE MARKETPLACE PAGE  ·  .cmp prefix        ║
           ╚══════════════════════════════════════════════════╝ */

        .cmp { font-family: Inter, system-ui, -apple-system, 'Segoe UI', sans-serif; background: #fff; }

        /* ── shared helpers ─────────────────────────────── */
        .cmp-tag {
          display: inline-block;
          font-size: 0.73rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.15em;
          background: #ffebeb; color: #E4403B;
          padding: 0.3rem 1rem; border-radius: 40px;
          margin-bottom: 0.75rem;
          border: 1px solid rgba(228, 64, 59, 0.2);
        }
        .cmp-h2 {
          font-size: clamp(1.85rem, 4vw, 2.9rem);
          font-weight: 800; letter-spacing: -0.032em;
          color: #1e293b; margin: 0 0 0.55rem; line-height: 1.12;
        }
        .cmp-h2 em { font-style: normal;
          background: linear-gradient(135deg, #E4403B, #c0392b);
          background-clip: text; -webkit-background-clip: text; color: transparent;
        }
        .cmp-sub { font-size: 1rem; color: #64748b; line-height: 1.65; margin: 0; }
        .cmp-btn-orange {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 26px; border-radius: 9999px;
          background: linear-gradient(135deg, #E4403B, #c0392b);
          color: #fff; font-weight: 700; font-size: 0.97rem;
          border: none; cursor: pointer; text-decoration: none;
          box-shadow: 0 10px 28px rgba(228,64,59,0.28);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .cmp-btn-orange:hover { transform: translateY(-3px); box-shadow: 0 18px 38px rgba(228,64,59,0.38); }
        .cmp-btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 26px; border-radius: 9999px;
          background: transparent; color: #cbd5e1;
          font-weight: 600; font-size: 0.97rem;
          border: 1px solid rgba(203,213,225,0.22); cursor: pointer;
          text-decoration: none;
          transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
        }
        .cmp-btn-ghost:hover { background: rgba(203,213,225,0.08); border-color: rgba(203,213,225,0.4); color: #f1f5f9; }

        /* ── 1. HERO ─────────────────────────────────────── */
        .cmp-hero {
          padding: clamp(80px, 11vw, 130px) 1.5rem clamp(70px, 9vw, 110px);
          background: var(--gradient-dark-master);
          position: relative; overflow: hidden; text-align: center;
        }
        .cmp-hero::before {
          content: "";
          position: absolute; inset: 0;
          background: var(--gradient-glow-master);
          pointer-events: none;
        }
        .cmp-hero::after {
          content: "";
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 50px 50px;
          pointer-events: none;
        }
        .cmp-hero-inner { max-width: 780px; margin: 0 auto; position: relative; z-index: 1; }
        .cmp-hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 7px 20px; border-radius: 999px;
          background: rgba(228,64,59,0.14); border: 1px solid rgba(228,64,59,0.32);
          color: #f8a09d; font-size: 0.75rem; font-weight: 700;
          letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 1.8rem;
        }
        .cmp-hero-h1 {
          font-size: clamp(2.4rem, 5.5vw, 4rem); font-weight: 800;
          line-height: 1.06; letter-spacing: -0.038em;
          color: var(--text-main-dark); margin: 0 0 1.2rem;
        }
        .cmp-hero-h1 em { font-style: normal;
          background: linear-gradient(135deg, #E4403B, #f87171);
          background-clip: text; -webkit-background-clip: text; color: transparent;
        }
        .cmp-hero-p {
          font-size: clamp(1rem, 2vw, 1.15rem); color: var(--text-muted-dark);
          line-height: 1.72; margin: 0 auto 2rem; max-width: 560px;
        }
        .cmp-trust-row {
          display: flex; align-items: center; justify-content: center;
          gap: 1.5rem; flex-wrap: wrap; margin-bottom: 2.4rem;
        }
        .cmp-trust-pill {
          display: flex; align-items: center; gap: 6px;
          color: #94a3b8; font-size: 0.88rem; font-weight: 600;
        }
        .cmp-trust-pill svg { color: #E4403B; }
        .cmp-trust-dot { width: 4px; height: 4px; border-radius: 50%; background: #E4403B; }
        .cmp-hero-actions { display: flex; align-items: center; justify-content: center; gap: 1rem; flex-wrap: wrap; }

        /* ── 2. BENEFITS ─────────────────────────────────── */
        .cmp-benefits {
          background: #fff;
          border-top: 1px solid rgba(0,0,0,0.05); border-bottom: 1px solid rgba(0,0,0,0.05);
        }
        .cmp-benefits-inner {
          max-width: 1200px; margin: 0 auto;
          display: grid; grid-template-columns: repeat(4, 1fr);
        }
        .cmp-benefit {
          display: flex; align-items: flex-start; gap: 14px;
          padding: 1.6rem 1.75rem;
          border-right: 1px solid rgba(0,0,0,0.05);
          background: #fff;
          transition: background 0.2s ease;
        }
        .cmp-benefit:last-child { border-right: none; }
        .cmp-benefit:hover { background: #f8fafc; }
        .cmp-benefit-icon {
          width: 46px; height: 46px; border-radius: 13px; flex-shrink: 0;
          background: #ffebeb;
          display: flex; align-items: center; justify-content: center; color: #E4403B;
        }
        .cmp-benefit h4 { font-size: 0.95rem; font-weight: 700; color: #1e293b; margin: 0 0 4px; }
        .cmp-benefit p { font-size: 0.82rem; color: #64748b; margin: 0; line-height: 1.5; }

        /* ── 3. CATALOG ──────────────────────────────────── */
        .cmp-catalog { background: #f8fafc; padding: clamp(3.5rem, 6vw, 6rem) 1.5rem; position: relative; }
        .cmp-catalog::before {
          content: "";
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(228, 64, 59, 0.1), transparent);
        }
        .cmp-catalog-inner { max-width: 1200px; margin: 0 auto; }
        .cmp-catalog-header { text-align: center; margin-bottom: 2.5rem; }
        .cmp-filters {
          display: flex; align-items: center; justify-content: center;
          gap: 0.5rem; flex-wrap: wrap; margin-bottom: 2.25rem;
        }
        .cmp-filter {
          padding: 8px 20px; border-radius: 999px; font-size: 0.85rem;
          font-weight: 600; cursor: pointer; border: 1.5px solid #e2e8f0;
          background: #fff; color: #64748b;
          transition: all 0.18s ease;
        }
        .cmp-filter:hover:not(.active) { border-color: rgba(228,64,59,0.3); color: #1e293b; }
        .cmp-filter.active { background: #E4403B; color: #fff; border-color: #E4403B; box-shadow: 0 8px 20px rgba(228,64,59,0.25); }
        .cmp-filter.beginner.active { background: #16a34a; border-color: #16a34a; }
        .cmp-filter.intermediate.active { background: #E4403B; border-color: #E4403B; }
        .cmp-filter.advanced.active { background: #2D3E50; border-color: #2D3E50; }

        .cmp-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(268px,1fr)); gap: 1.25rem; }

        .cmp-card {
          background: #fff;
          border: 1px solid #e2e8f0; border-radius: 20px;
          overflow: hidden; display: flex; flex-direction: column;
          transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .cmp-card:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.06); border-color: rgba(228, 64, 59, 0.3); }

        .cmp-card-thumb {
          height: 110px; position: relative; overflow: hidden;
          display: flex; align-items: center; justify-content: center;
        }
        .cmp-card-thumb-icon {
          width: 54px; height: 54px; border-radius: 16px;
          background: rgba(255,255,255,0.22); backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center;
          color: #fff; position: relative; z-index: 1;
          box-shadow: 0 4px 20px rgba(0,0,0,0.18);
        }
        .cmp-card-badge {
          position: absolute; top: 10px; right: 10px;
          background: #E4403B; color: #fff;
          font-size: 0.65rem; font-weight: 800; text-transform: uppercase;
          letter-spacing: 0.08em; padding: 3px 10px; border-radius: 20px; z-index: 2;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        .cmp-card-badge.hot { background: #2D3E50; color: #fff; }

        .cmp-card-body { padding: 1.3rem; flex: 1; display: flex; flex-direction: column; gap: 0.7rem; }
        .cmp-card-title { font-size: 1.02rem; font-weight: 700; color: #1e293b; margin: 0; line-height: 1.3; }
        .cmp-card-desc { font-size: 0.84rem; color: #64748b; line-height: 1.55; margin: 0; flex: 1; }
        .cmp-card-meta { display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center; }
        .cmp-level-badge {
          font-size: 0.7rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.08em; padding: 3px 9px; border-radius: 6px;
        }
        .cmp-meta-chip {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: 0.76rem; font-weight: 600; color: #64748b;
          background: #f1f5f9; padding: 3px 9px; border-radius: 999px;
        }
        .cmp-meta-chip svg { opacity: 0.7; }
        .cmp-card-footer {
          margin-top: auto; padding-top: 0.85rem;
          border-top: 1px solid #f1f5f9;
        }
        .cmp-price-row { display: flex; align-items: baseline; gap: 8px; margin-bottom: 0.8rem; }
        .cmp-price { font-size: 1.55rem; font-weight: 900; color: #1e293b; letter-spacing: -0.03em; }
        .cmp-price-original { font-size: 0.9rem; color: #94a3b8; text-decoration: line-through; }
        .cmp-card-ctas { display: flex; gap: 0.6rem; }
        .cmp-buy-btn {
          flex: 1; padding: 10px 0; border-radius: 10px;
          background: linear-gradient(135deg, #E4403B, #c0392b);
          color: #fff; font-weight: 700; font-size: 0.88rem;
          border: none; cursor: pointer; text-decoration: none;
          display: flex; align-items: center; justify-content: center; gap: 6px;
          box-shadow: 0 6px 18px rgba(228,64,59,0.25);
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }
        .cmp-buy-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(228,64,59,0.35); }
        .cmp-details-btn {
          padding: 10px 14px; border-radius: 10px;
          background: #f8fafc; color: #64748b; font-weight: 600;
          font-size: 0.88rem; border: 1px solid #e2e8f0; cursor: pointer;
          transition: all 0.18s ease;
          white-space: nowrap;
        }
        .cmp-details-btn:hover { background: #f1f5f9; border-color: #cbd5e1; color: #1e293b; }

        /* ── 4. BUNDLE ───────────────────────────────────── */
        .cmp-bundle-section { background: var(--bg-deep-master); padding: clamp(3rem, 5vw, 5rem) 1.5rem; border-top: 1px solid rgba(255,255,255,0.05); }
        .cmp-bundle-inner { max-width: 1000px; margin: 0 auto; }
        .cmp-bundle-card {
          background: linear-gradient(140deg, #1a1010 0%, #111111 100%);
          border: 1px solid rgba(228, 64, 59, 0.22);
          border-radius: 28px; overflow: hidden; position: relative;
          padding: clamp(2rem, 4vw, 3.5rem);
          box-shadow: 0 30px 70px -20px rgba(0,0,0,0.4);
        }
        .cmp-bundle-card::before {
          content: "";
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 80% 20%, rgba(228, 64, 59, 0.1), transparent 55%);
          pointer-events: none;
        }
        .cmp-bundle-wrap { display: grid; grid-template-columns: 1.3fr 0.7fr; gap: 3rem; align-items: center; position: relative; z-index: 1; }
        .cmp-bundle-label {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 6px 14px; border-radius: 999px;
          background: rgba(228, 64, 59, 0.14); border: 1px solid rgba(228, 64, 59, 0.28);
          color: #f8a09d; font-size: 0.72rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.14em; margin-bottom: 1.25rem;
        }
        .cmp-bundle-h3 {
          font-size: clamp(1.6rem, 3.5vw, 2.4rem); font-weight: 800;
          color: #f8fafc; margin: 0 0 0.75rem; letter-spacing: -0.03em; line-height: 1.15;
        }
        .cmp-bundle-h3 em { font-style: normal; color: #E4403B; }
        .cmp-bundle-desc { font-size: 0.97rem; color: #94a3b8; line-height: 1.65; margin: 0 0 1.5rem; }
        .cmp-bundle-courses {
          display: grid; grid-template-columns: 1fr 1fr; gap: 6px 16px; margin-bottom: 1.75rem;
        }
        .cmp-bundle-course {
          display: flex; align-items: center; gap: 7px;
          font-size: 0.82rem; color: #cbd5e1; font-weight: 500;
        }
        .cmp-bundle-course svg { color: #22c55e; flex-shrink: 0; }
        .cmp-bundle-right { text-align: center; }
        .cmp-bundle-savings {
          display: inline-block; font-size: 0.78rem; font-weight: 700;
          color: #22c55e; background: rgba(34,197,94,0.12);
          border: 1px solid rgba(34,197,94,0.25); padding: 5px 14px;
          border-radius: 8px; margin-bottom: 1rem;
        }
        .cmp-bundle-price-big { font-size: 3rem; font-weight: 900; color: #f8fafc; letter-spacing: -0.04em; line-height: 1; margin-bottom: 4px; }
        .cmp-bundle-orig { font-size: 1rem; color: #475569; text-decoration: line-through; margin-bottom: 1.5rem; }
        .cmp-bundle-buy {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          width: 100%; padding: 15px 0; border-radius: 14px;
          background: linear-gradient(135deg, #E4403B, #c0392b);
          color: #fff; font-weight: 700; font-size: 1rem;
          border: none; cursor: pointer; text-decoration: none;
          box-shadow: 0 12px 32px rgba(228,64,59,0.35);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .cmp-bundle-buy:hover { transform: translateY(-3px); box-shadow: 0 20px 42px rgba(228,64,59,0.45); }
        .cmp-bundle-note { font-size: 0.75rem; color: #475569; margin-top: 0.75rem; }

        /* ── 5. HOW IT WORKS ─────────────────────────────── */
        .cmp-how { background: #fff; padding: clamp(3rem, 5vw, 5rem) 1.5rem; border-top: 1px solid rgba(0,0,0,0.05); position: relative; }
        .cmp-how::before {
          content: "";
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(228, 64, 59, 0.1), transparent);
        }
        .cmp-how-inner { max-width: 900px; margin: 0 auto; }
        .cmp-how-header { text-align: center; margin-bottom: 3rem; }
        .cmp-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; }
        .cmp-step { text-align: center; padding: 0 2rem; position: relative; }
        .cmp-step:not(:last-child)::after {
          content: "";
          position: absolute; right: 0; top: 32px;
          width: 1px; height: 40px;
          background: linear-gradient(to bottom, #e2e8f0, transparent);
        }
        .cmp-step-num {
          width: 64px; height: 64px; border-radius: 20px; margin: 0 auto 1.25rem;
          background: linear-gradient(135deg, #E4403B, #c0392b);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.1rem; font-weight: 900; color: #fff;
          box-shadow: 0 12px 28px rgba(228,64,59,0.28);
        }
        .cmp-step h4 { font-size: 1.05rem; font-weight: 700; color: #1e293b; margin: 0 0 0.5rem; }
        .cmp-step p { font-size: 0.87rem; color: #64748b; line-height: 1.6; margin: 0; }

        /* ── 6. TRUST ────────────────────────────────────── */
        .cmp-trust-section { background: #f8fafc; padding: clamp(3rem, 5vw, 5rem) 1.5rem; border-top: 1px solid rgba(0,0,0,0.05); }
        .cmp-trust-inner { max-width: 1100px; margin: 0 auto; }
        .cmp-trust-header { text-align: center; margin-bottom: 2.5rem; }
        .cmp-stats-row {
          display: grid; grid-template-columns: repeat(4,1fr); gap: 1.25rem; margin-bottom: 3rem;
        }
        .cmp-stat {
          background: #fff; border: 1px solid #e2e8f0; border-radius: 18px;
          padding: 1.5rem; text-align: center;
          transition: transform 0.2s ease;
        }
        .cmp-stat:hover { transform: translateY(-3px); border-color: rgba(228, 64, 59, 0.3); }
        .cmp-stat-val { font-size: clamp(1.8rem, 3vw, 2.4rem); font-weight: 900; color: #1e293b; letter-spacing: -0.03em; line-height: 1; }
        .cmp-stat-label { font-size: 0.82rem; color: #64748b; margin-top: 6px; font-weight: 600; }
        .cmp-reviews { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.25rem; }
        .cmp-review {
          background: #fff; border: 1px solid #e2e8f0; border-radius: 20px;
          padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem;
          transition: all 0.25s ease;
        }
        .cmp-review:hover { transform: translateY(-4px); box-shadow: 0 15px 30px rgba(0,0,0,0.05); border-color: rgba(228, 64, 59, 0.3); }
        .cmp-stars { display: flex; gap: 3px; }
        .cmp-review-text { font-size: 0.9rem; color: #475569; line-height: 1.68; margin: 0; font-style: italic; flex: 1; }
        .cmp-review-course {
          font-size: 0.72rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.1em; color: #E4403B; background: #ffebeb;
          padding: 3px 10px; border-radius: 6px; width: fit-content;
        }
        .cmp-reviewer { display: flex; align-items: center; gap: 10px; }
        .cmp-reviewer-avatar {
          width: 38px; height: 38px; border-radius: 50%;
          background: linear-gradient(135deg, #E4403B, #c0392b);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.9rem; font-weight: 700; color: #fff; flex-shrink: 0;
        }
        .cmp-reviewer-name { font-size: 0.9rem; font-weight: 700; color: #1e293b; }
        .cmp-reviewer-role { font-size: 0.78rem; color: #94a3b8; }

        /* ── 7. FINAL CTA ────────────────────────────────── */
        .cmp-cta {
          padding: clamp(4.5rem, 8vw, 8rem) 1.5rem; text-align: center;
          background:
            radial-gradient(ellipse at 25% 60%, rgba(228,64,59,0.24), transparent 50%),
            radial-gradient(ellipse at 78% 25%, rgba(228,64,59,0.16), transparent 48%),
            linear-gradient(170deg, #1a0a08 0%, #2d1510 100%);
          position: relative; overflow: hidden;
        }
        .cmp-cta::before {
          content: "";
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 50px 50px; pointer-events: none;
        }
        .cmp-cta-inner { max-width: 620px; margin: 0 auto; position: relative; z-index: 1; }
        .cmp-cta-h2 {
          font-size: clamp(2rem, 5vw, 3.4rem); font-weight: 800;
          letter-spacing: -0.038em; line-height: 1.08; color: #f8fafc; margin: 0 0 1rem;
        }
        .cmp-cta-h2 em { font-style: normal;
          background: linear-gradient(135deg, #E4403B, #f87171);
          background-clip: text; -webkit-background-clip: text; color: transparent;
        }
        .cmp-cta-p { font-size: 1.05rem; color: #94a3b8; line-height: 1.7; margin: 0 auto 2.4rem; max-width: 480px; }
        .cmp-cta-actions { display: flex; align-items: center; justify-content: center; gap: 1rem; flex-wrap: wrap; }
        .cmp-cta-note { font-size: 0.78rem; color: #475569; margin-top: 1.4rem; letter-spacing: 0.01em; }

        /* ── MODAL ───────────────────────────────────────── */
        .cmp-overlay {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(0,0,0,0.82); backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center;
          padding: 1rem; animation: cmpFadeIn 0.22s ease;
        }
        @keyframes cmpFadeIn { from { opacity: 0; } to { opacity: 1; } }
        .cmp-modal {
          background: var(--bg-dark-master); border: var(--border-master); border-radius: 24px; width: 100%; max-width: 680px;
          max-height: 90vh; overflow: hidden; display: flex; flex-direction: column;
          box-shadow: 0 40px 100px rgba(0,0,0,0.8);
          animation: cmpSlideUp 0.26s cubic-bezier(0.34,1.56,0.64,1);
          color: var(--text-main-dark);
        }
        @keyframes cmpSlideUp { from { transform: translateY(24px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .cmp-modal-head {
          padding: 1.75rem 1.75rem 1.25rem; flex-shrink: 0;
          border-bottom: 1px solid rgba(255,255,255,0.08); position: relative;
        }
        .cmp-modal-thumb {
          height: 90px; border-radius: 16px; margin-bottom: 1rem;
          display: flex; align-items: center; justify-content: center; position: relative;
        }
        .cmp-modal-thumb-icon {
          width: 56px; height: 56px; border-radius: 18px;
          background: rgba(255,255,255,0.2); display: flex;
          align-items: center; justify-content: center; color: #fff;
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        }
        .cmp-modal-close {
          position: absolute; top: 1.25rem; right: 1.25rem;
          width: 36px; height: 36px; border-radius: 10px;
          background: rgba(255,255,255,0.05); border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center; color: var(--text-muted-dark);
          transition: all 0.18s ease;
        }
        .cmp-modal-close:hover { background: rgba(255,255,255,0.1); color: #fff; }
        .cmp-modal-title { font-size: 1.4rem; font-weight: 800; color: var(--text-main-dark); margin: 0 0 0.4rem; line-height: 1.25; }
        .cmp-modal-subtitle { font-size: 0.9rem; color: var(--text-muted-dark); margin: 0; line-height: 1.55; }
        .cmp-modal-chips { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.75rem; }
        .cmp-modal-chip {
          font-size: 0.76rem; font-weight: 600; padding: 4px 10px;
          border-radius: 8px; background: #f1f5f9; color: #475569;
          display: flex; align-items: center; gap: 5px;
        }
        .cmp-modal-body { padding: 1.5rem 1.75rem; overflow-y: auto; flex: 1; display: flex; flex-direction: column; gap: 1.5rem; }
        .cmp-modal-section-title { font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #64748b; margin: 0 0 0.75rem; }
        .cmp-modal-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
        .cmp-modal-list li { display: flex; align-items: flex-start; gap: 9px; font-size: 0.9rem; color: #475569; line-height: 1.5; }
        .cmp-modal-list li svg { flex-shrink: 0; margin-top: 2px; }
        .cmp-modal-foot {
          padding: 1.25rem 1.75rem; border-top: 1px solid rgba(255,255,255,0.08); flex-shrink: 0;
          display: flex; align-items: center; justify-content: space-between; gap: 1rem;
        }
        .cmp-modal-price { font-size: 1.7rem; font-weight: 900; color: var(--text-main-dark); letter-spacing: -0.03em; line-height: 1; }
        .cmp-modal-orig { font-size: 0.88rem; color: var(--text-dim-dark); text-decoration: line-through; margin-top: 2px; }
        .cmp-modal-buy {
          display: flex; align-items: center; gap: 8px;
          padding: 12px 28px; border-radius: 12px;
          background: linear-gradient(135deg, #E4403B, #c0392b);
          color: #fff; font-weight: 700; font-size: 1rem;
          border: none; cursor: pointer; text-decoration: none;
          box-shadow: 0 8px 24px rgba(228,64,59,0.28);
          transition: transform 0.18s ease, box-shadow 0.18s ease;
          white-space: nowrap;
        }
        .cmp-modal-buy:hover { transform: translateY(-2px); box-shadow: 0 14px 32px rgba(228,64,59,0.38); }

        /* ── RESPONSIVE ──────────────────────────────────── */
        @media (max-width: 1024px) {
          .cmp-benefits-inner { grid-template-columns: repeat(2, 1fr); }
          .cmp-benefit:nth-child(2) { border-right: none; }
          .cmp-benefit:nth-child(3) { border-top: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0; }
          .cmp-benefit:nth-child(4) { border-top: 1px solid #e2e8f0; border-right: none; }
          .cmp-bundle-wrap { grid-template-columns: 1fr; gap: 2rem; }
          .cmp-bundle-right { text-align: left; }
          .cmp-bundle-buy { max-width: 300px; }
          .cmp-stats-row { grid-template-columns: repeat(2, 1fr); }
          .cmp-reviews { grid-template-columns: repeat(2, 1fr); }
          .cmp-steps { gap: 2rem; }
          .cmp-step::after { display: none; }
        }
        @media (max-width: 768px) {
          .cmp-benefits-inner { grid-template-columns: 1fr; }
          .cmp-benefit { border-right: none !important; border-top: none !important; border-bottom: 1px solid #e2e8f0; }
          .cmp-benefit:last-child { border-bottom: none; }
          .cmp-steps { grid-template-columns: 1fr; text-align: left; }
          .cmp-step { padding: 0; display: flex; align-items: flex-start; gap: 1.25rem; text-align: left; }
          .cmp-step-num { margin: 0; flex-shrink: 0; width: 52px; height: 52px; border-radius: 16px; }
          .cmp-reviews { grid-template-columns: 1fr; }
          .cmp-modal-foot { flex-direction: column; align-items: stretch; }
          .cmp-modal-buy { justify-content: center; }
        }
        @media (max-width: 640px) {
          .cmp-grid { grid-template-columns: 1fr; }
          .cmp-stats-row { grid-template-columns: repeat(2, 1fr); }
          .cmp-hero-h1 { font-size: clamp(2.1rem, 9.5vw, 2.6rem); }
          .cmp-bundle-courses { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ── 1. HERO ── */}
      <section className="cmp-hero">
        <div className="cmp-hero-inner">
          <div className="cmp-hero-badge">
            <Sparkles size={12} />
            New Courses — 2025
          </div>
          <h1 className="cmp-hero-h1">
            Learn In-Demand Digital Skills<br />
            <em>with DigiQlik</em>
          </h1>
          <p className="cmp-hero-p">
            8 expert-designed courses. Buy any course individually. Get instant
            access, live sessions, practical assignments, and a recognised
            certificate.
          </p>
          <div className="cmp-trust-row">
            <span className="cmp-trust-pill"><Star size={14} /> 4.8 Rated</span>
            <span className="cmp-trust-dot" />
            <span className="cmp-trust-pill"><Users size={14} /> 500+ Students</span>
            <span className="cmp-trust-dot" />
            <span className="cmp-trust-pill"><GraduationCap size={14} /> 8 Courses</span>
            <span className="cmp-trust-dot" />
            <span className="cmp-trust-pill"><Award size={14} /> Certificate Included</span>
          </div>
          <div className="cmp-hero-actions">
            <a href="#catalog" className="cmp-btn-orange">
              Browse Courses <ArrowRight size={16} />
            </a>
            <a
              href={wa('Hi, I need guidance on which DigiQlik course is right for me.')}
              target="_blank"
              rel="noopener noreferrer"
              className="cmp-btn-ghost"
            >
              Get Guidance
            </a>
          </div>
        </div>
      </section>

      {/* ── 2. BENEFITS STRIP ── */}
      <section className="cmp-benefits">
        <div className="cmp-benefits-inner">
          {BENEFITS.map((b) => {
            const BIcon = b.icon;
            return (
              <div className="cmp-benefit" key={b.title}>
                <div className="cmp-benefit-icon">
                  <BIcon size={21} />
                </div>
                <div>
                  <h4>{b.title}</h4>
                  <p>{b.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 3. COURSE CATALOG ── */}
      <section className="cmp-catalog" id="catalog">
        <div className="cmp-catalog-inner">
          <div className="cmp-catalog-header">
            <span className="cmp-tag">Course Catalog</span>
            <h2 className="cmp-h2">
              Choose Your <em>Course</em>
            </h2>
            <p className="cmp-sub">
              Every course is self-contained, individually purchasable, and taught
              live by industry mentors.
            </p>
          </div>

          <div className="cmp-filters">
            {['All', 'Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
              <button
                key={lvl}
                className={`cmp-filter${lvl !== 'All' ? ' ' + lvl.toLowerCase() : ''}${filter === lvl ? ' active' : ''}`}
                onClick={() => setFilter(lvl)}
              >
                {lvl}
              </button>
            ))}
          </div>

          <div className="cmp-grid">
            {displayed.map((course) => {
              const CIcon = course.icon;
              const lc = LEVEL_COLOR[course.level];
              return (
                <div className="cmp-card" key={course.id}>
                  {/* Gradient thumbnail */}
                  <div
                    className="cmp-card-thumb"
                    style={{
                      background: `linear-gradient(140deg, ${course.g[0]}, ${course.g[1]})`,
                    }}
                  >
                    <div className="cmp-card-thumb-icon">
                      <CIcon size={26} />
                    </div>
                    {course.badge && (
                      <span
                        className={`cmp-card-badge${course.badge === 'Hot' ? ' hot' : ''}`}
                      >
                        {course.badge}
                      </span>
                    )}
                  </div>

                  <div className="cmp-card-body">
                    <h3 className="cmp-card-title">{course.title}</h3>
                    <p className="cmp-card-desc">{course.subtitle}</p>

                    <div className="cmp-card-meta">
                      <span
                        className="cmp-level-badge"
                        style={{ background: lc.bg, color: lc.text }}
                      >
                        {course.level}
                      </span>
                      <span className="cmp-meta-chip">
                        <CalendarDays size={11} />
                        {course.duration}
                      </span>
                      <span className="cmp-meta-chip">{course.access}</span>
                    </div>

                    <div className="cmp-card-footer">
                      <div className="cmp-price-row">
                        <span className="cmp-price">{course.price}</span>
                        <span className="cmp-price-original">{course.original}</span>
                      </div>
                      <div className="cmp-card-ctas">
                        <a
                          href={wa(
                            `Hi, I want to purchase the "${course.title}" course at DigiQlik. Please guide me.`
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cmp-buy-btn"
                        >
                          Buy Now
                        </a>
                        <button
                          className="cmp-details-btn"
                          onClick={() => setSelected(course)}
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. FEATURED BUNDLE ── */}
      <section className="cmp-bundle-section">
        <div className="cmp-bundle-inner">
          <div className="cmp-bundle-card">
            <div className="cmp-bundle-wrap">
              <div>
                <div className="cmp-bundle-label">
                  <Sparkles size={12} /> Most Popular
                </div>
                <h3 className="cmp-bundle-h3">
                  Complete Digital Marketing<br />
                  <em>All-Access Bundle</em>
                </h3>
                <p className="cmp-bundle-desc">
                  Every course in one package. Buy once and unlock all 8 programs — SEO,
                  Ads, Social, Branding, E-commerce, Analytics, and more.
                </p>
                <div className="cmp-bundle-courses">
                  {COURSES.map((c) => (
                    <div className="cmp-bundle-course" key={c.id}>
                      <BadgeCheck size={13} />
                      {c.title}
                    </div>
                  ))}
                </div>
              </div>

              <div className="cmp-bundle-right">
                <div className="cmp-bundle-savings">Save ₹15,000+</div>
                <div className="cmp-bundle-price-big">₹9,999</div>
                <div className="cmp-bundle-orig">₹25,000+ individually</div>
                <a
                  href={wa(
                    'Hi, I want to purchase the DigiQlik Complete Digital Marketing All-Access Bundle. Please guide me.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cmp-bundle-buy"
                >
                  Get All-Access <ArrowRight size={16} />
                </a>
                <p className="cmp-bundle-note">
                  Includes all 8 courses · Certificate for each
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. HOW IT WORKS ── */}
      <section className="cmp-how">
        <div className="cmp-how-inner">
          <div className="cmp-how-header">
            <span className="cmp-tag">Simple Process</span>
            <h2 className="cmp-h2">
              How <em>Access Works</em>
            </h2>
            <p className="cmp-sub">
              Three steps from browsing to learning — no complexity.
            </p>
          </div>
          <div className="cmp-steps">
            {STEPS.map((step) => (
              <div className="cmp-step" key={step.num}>
                <div className="cmp-step-num">{step.num}</div>
                <div>
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. STUDENT TRUST ── */}
      <section className="cmp-trust-section">
        <div className="cmp-trust-inner">
          <div className="cmp-trust-header">
            <span className="cmp-tag">Student Outcomes</span>
            <h2 className="cmp-h2">
              Results That <em>Speak</em>
            </h2>
            <p className="cmp-sub">
              Real students. Real outcomes. DigiQlik graduates go on to land jobs,
              grow businesses, and build profitable freelance careers.
            </p>
          </div>

          <div className="cmp-stats-row">
            {STATS.map((s) => (
              <div className="cmp-stat" key={s.label}>
                <div className="cmp-stat-val">{s.value}</div>
                <div className="cmp-stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="cmp-reviews">
            {REVIEWS.map((r) => (
              <div className="cmp-review" key={r.name}>
                <div>
                  <div className="cmp-stars">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill="#fbbf24"
                        color="#fbbf24"
                      />
                    ))}
                  </div>
                </div>
                <p className="cmp-review-text">"{r.text}"</p>
                <div className="cmp-review-course">{r.course}</div>
                <div className="cmp-reviewer">
                  <div className="cmp-reviewer-avatar">
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <div className="cmp-reviewer-name">{r.name}</div>
                    <div className="cmp-reviewer-role">
                      {r.role} · {r.city}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. FINAL CTA ── */}
      <section className="cmp-cta">
        <div className="cmp-cta-inner">
          <h2 className="cmp-cta-h2">
            Ready to Invest<br />
            <em>in Your Skills?</em>
          </h2>
          <p className="cmp-cta-p">
            Pick a course, purchase it now, and start your first live session
            within 24 hours. Your career upgrade starts today.
          </p>
          <div className="cmp-cta-actions">
            <a href="#catalog" className="cmp-btn-orange">
              Browse All Courses <ArrowRight size={16} />
            </a>
            <a
              href={wa('Hi, I need help choosing the right DigiQlik course.')}
              target="_blank"
              rel="noopener noreferrer"
              className="cmp-btn-ghost"
            >
              Talk to an Advisor
            </a>
          </div>
          <p className="cmp-cta-note">
            Individual courses · All-access bundle · Free guidance call available
          </p>
        </div>
      </section>

      {/* ── COURSE DETAIL MODAL ── */}
      {selected && (
        <div
          className="cmp-overlay"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="cmp-modal" onClick={(e) => e.stopPropagation()}>
            {/* Head */}
            <div className="cmp-modal-head">
              <button
                className="cmp-modal-close"
                onClick={() => setSelected(null)}
                aria-label="Close"
              >
                <X size={16} />
              </button>
              <div
                className="cmp-modal-thumb"
                style={{
                  background: `linear-gradient(140deg, ${selected.g[0]}, ${selected.g[1]})`,
                }}
              >
                <div className="cmp-modal-thumb-icon">
                  <selected.icon size={28} />
                </div>
              </div>
              <h2 className="cmp-modal-title">{selected.title}</h2>
              <p className="cmp-modal-subtitle">{selected.subtitle}</p>
              <div className="cmp-modal-chips">
                <span
                  className="cmp-modal-chip"
                  style={{
                    background: LEVEL_COLOR[selected.level].bg,
                    color: LEVEL_COLOR[selected.level].text,
                  }}
                >
                  {selected.level}
                </span>
                <span className="cmp-modal-chip">
                  <CalendarDays size={11} /> {selected.duration}
                </span>
                <span className="cmp-modal-chip">
                  <Video size={11} /> {selected.sessions}
                </span>
                <span className="cmp-modal-chip">{selected.access}</span>
              </div>
            </div>

            {/* Body */}
            <div className="cmp-modal-body">
              <div>
                <p className="cmp-modal-section-title">What You'll Learn</p>
                <ul className="cmp-modal-list">
                  {selected.outcomes.map((o, i) => (
                    <li key={i}>
                      <BadgeCheck size={14} color="#22c55e" />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="cmp-modal-section-title">Curriculum</p>
                <ul className="cmp-modal-list">
                  {selected.curriculum.map((c, i) => (
                    <li key={i}>
                      <BadgeCheck size={14} color="#E4403B" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="cmp-modal-section-title">What's Included</p>
                <ul className="cmp-modal-list">
                  {selected.includes.map((inc, i) => (
                    <li key={i}>
                      <BadgeCheck size={14} color="#E4403B" />
                      {inc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="cmp-modal-foot">
              <div>
                <div className="cmp-modal-price">{selected.price}</div>
                <div className="cmp-modal-orig">{selected.original}</div>
              </div>
              <a
                href={wa(
                  `Hi, I want to purchase the "${selected.title}" course at DigiQlik. Please guide me.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="cmp-modal-buy"
              >
                Buy Now <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
