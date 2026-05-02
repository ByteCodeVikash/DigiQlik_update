import React, { useMemo, useState } from 'react';
import { ArrowRight, Layout, Sparkles, Star, Video } from 'lucide-react';
import ScheduleMeetingModal from './ScheduleMeetingModal';

// Rebranding & Marketing images
import rebrandingMarketing0 from '../assets/rebranding and marketing.jpeg';
import rebrandingMarketing1 from '../assets/rebranding and marketing1.jpeg';
import rebrandingMarketing2 from '../assets/rebranding and marketing2.jpeg';
import rebrandingMarketing3 from '../assets/rebranding and marketing3.jpeg';
import rebrandingMarketing4 from '../assets/rebranding and marketing4.jpeg';

// Web Design project images
import attentionSeekerImg from '../assets/attentionSeekerImg.jpeg';

import digitalMarkSevenImg from '../assets/digital mark seven vercel.jpeg';
import djIntroImg from '../assets/dj intro.jpeg';
import gasxpertImg from '../assets/gasxpert.jpeg';
import headphonesOnlyImg from '../assets/headphones only.jpeg';
import lavaFlameflowImg from '../assets/lava flameflow animation.jpeg';
import liveAnimationLoginImg from '../assets/liveanimation login form.jpeg';
import mohanResidencyImg from '../assets/mohanresidency.jpeg';
import myFirstCrmImg from '../assets/my first crm.jpeg';
import rankriseUsaImg from '../assets/rankriseusa.jpeg';
import shivamPortfolioImg from '../assets/shivam portfolio pandey.jpeg';
import shoppingAppaImg from '../assets/shopping appa.jpeg';
import smartGadgetShopImg from '../assets/smartgadgetshop.jpeg';
import villaOptionImg from '../assets/villa option.jpeg';
import yesGasServiceImg from '../assets/yesgasservice.jpeg';
import gharKaMarketImg from '../assets/gharkamarket.jpeg';

// 🎥 Videos
import media1 from '../public/Media1.mp4';
import media2 from '../public/Media2.mp4';
import media3 from '../public/Media3.mp4';
import media4 from '../public/Media4.mp4';
import media5 from '../public/Media5.mp4';

/* ─── Inline SVG icon helper ─────────────────────────────────────────── */
const Icon = ({ paths, size = 24, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {paths.map((d, i) => (
      <path key={i} d={d} />
    ))}
  </svg>
);

const ICONS = {
  seo: ['M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z', 'M21 21l-4.35-4.35'],
  social: ['M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z'],
  ads: ['M12 2L2 7l10 5 10-5-10-5z', 'M2 17l10 5 10-5', 'M2 12l10 5 10-5'],
  email: ['M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z', 'M22 6l-10 7L2 6'],
  logo: ['M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'],
  heart: ['M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'],
  file: ['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', 'M14 2v6h6', 'M16 13H8', 'M16 17H8'],
  video: ['M23 7l-7 5 7 5V7z', 'M1 5h15a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H1a2 2 0 0 0-2-2V7a2 2 0 0 1 1-2z'],
};

/* ─── Tag colours ────────────────────────────────────────────────────── */
const TAG_COLORS = {
  'Web App': { bg: 'rgba(228,64,59,0.18)', color: '#FF6B66' },
  'E-Commerce': { bg: 'rgba(45,62,80,0.18)', color: '#94a3b8' },
  'Gas Service': { bg: 'rgba(228,64,59,0.18)', color: '#FF6B66' },
  Agency: { bg: 'rgba(45,62,80,0.18)', color: '#94a3b8' },
  FinTech: { bg: 'rgba(228,64,59,0.18)', color: '#FF6B66' },
  'Real Estate': { bg: 'rgba(45,62,80,0.18)', color: '#94a3b8' },
  CRM: { bg: 'rgba(228,64,59,0.18)', color: '#FF6B66' },
  Portfolio: { bg: 'rgba(45,62,80,0.18)', color: '#94a3b8' },
  Fashion: { bg: 'rgba(228,64,59,0.18)', color: '#FF6B66' },
  Electronics: { bg: 'rgba(45,62,80,0.18)', color: '#94a3b8' },
};

/* ─── Web Design projects ────────────────────────────────────────────── */
const WEB_PROJECTS = [
  {
    title: 'Attention Seeker 3D Portfolio',
    tag: 'Portfolio',
    emoji: '🎯',
    liveUrl: 'https://attention-seeker-portfolio.vercel.app/',
    image: attentionSeekerImg,
    desc: 'Immersive 3D portfolio experience with bold motion, modern layout, and a high-impact first impression.',
  },
  {
    title: 'Digital Mark Seven',
    tag: 'Agency',
    emoji: '🚀',
    liveUrl: 'https://digital-mark-seven.vercel.app/',
    image: digitalMarkSevenImg,
    desc: 'Clean digital agency website built to present services, build trust, and convert visitors into inquiries.',
  },
  {
    title: 'DJ Intro',
    tag: 'Web App',
    emoji: '🎧',
    liveUrl: 'https://dj-intro.netlify.app/',
    image: djIntroImg,
    desc: 'Stylish intro site with music-forward visuals and an energetic presentation for a DJ brand.',
  },
  {
    title: 'GasXpert',
    tag: 'Gas Service',
    emoji: '🔥',
    liveUrl: 'https://gasxpert.in/',
    image: gasxpertImg,
    desc: 'Modern gas service platform with booking flow, customer support, and a clean service-first UI.',
  },
  {
    title: 'Headphones Only',
    tag: 'E-Commerce',
    emoji: '🎧',
    liveUrl: 'https://headphonesonly.netlify.app/',
    image: headphonesOnlyImg,
    desc: 'Premium headphone storefront with a product-focused layout and conversion-friendly shopping experience.',
  },
  {
    title: 'Lava Flameflow Animation',
    tag: 'Web App',
    emoji: '🔥',
    liveUrl: 'https://lava-flameflow-animation.netlify.app/',
    image: lavaFlameflowImg,
    desc: 'Experimental animated landing page with dramatic visuals and smooth motion-driven storytelling.',
  },
  {
    title: 'Live Animation Login Form',
    tag: 'Web App',
    emoji: '🔐',
    liveUrl: 'https://live-animation-login-page.netlify.app/',
    image: liveAnimationLoginImg,
    desc: 'Interactive login page with animated polish, designed for a modern and premium user experience.',
  },
  {
    title: 'Mohan Residency',
    tag: 'Real Estate',
    emoji: '🏠',
    liveUrl: 'https://real-estate-mohan-residency.vercel.app/',
    image: mohanResidencyImg,
    desc: 'Real estate website crafted for property showcase, lead generation, and strong visual presentation.',
  },
  {
    title: 'My First CRM',
    tag: 'CRM',
    emoji: '📊',
    liveUrl: 'https://my-first-crm.vercel.app/',
    image: myFirstCrmImg,
    desc: 'A full-featured CRM web application with lead pipeline management, client contact tracking, task assignments, and an intuitive dashboard — built to streamline sales workflows for small businesses.',
  },
  {
    title: 'RankRise USA',
    tag: 'Agency',
    emoji: '⭐',
    liveUrl: 'https://rankriseusa.com/',
    image: rankriseUsaImg,
    desc: 'Performance marketing and SEO-style agency site with a professional, trust-building presentation.',
  },
  {
    title: 'Shivam Portfolio Pandey',
    tag: 'Portfolio',
    emoji: '👨‍💻',
    liveUrl: 'https://shivam-portfolio-pandey.netlify.app/',
    image: shivamPortfolioImg,
    desc: 'Personal portfolio with a clean structure, strong personal branding, and project showcase sections.',
  },
  {
    title: 'Shopping Appa',
    tag: 'E-Commerce',
    emoji: '🛍️',
    liveUrl: 'https://shoppingappa.netlify.app/',
    image: shoppingAppaImg,
    desc: 'Responsive shopping experience with product discovery, browsing flow, and easy-to-scan UI.',
  },
  {
    title: 'Smart Gadget Shop',
    tag: 'Electronics',
    emoji: '📱',
    liveUrl: 'https://smartgadgetshop.netlify.app/',
    image: smartGadgetShopImg,
    desc: 'Gadget store layout built to highlight products, categories, and a modern tech-store feel.',
  },
  {
    title: 'Villa Options',
    tag: 'Real Estate',
    emoji: '🏡',
    liveUrl: 'https://villaoptions.netlify.app/',
    image: villaOptionImg,
    desc: 'Luxury villa presentation website with premium aesthetics and property-oriented content sections.',
  },
  {
    title: 'YesGasService',
    tag: 'Gas Service',
    emoji: '⚡',
    liveUrl: 'https://yesgasservice.in/',
    image: yesGasServiceImg,
    desc: 'Gas service platform designed for quick bookings, service trust, and mobile-friendly access.',
  },
  {
    title: 'Ghar Ka Market',
    tag: 'E-Commerce',
    emoji: '🛒',
    liveUrl: 'https://gharkamarket.in/',
    image: gharKaMarketImg,
    desc: 'Hyperlocal marketplace concept built for local buying and selling with a simple commerce flow.',
  },
];

/* ─── Marketing + Branding data ──────────────────────────────────────── */
const MARKETING_BRANDING_DATA = {
  tag: 'Marketing & Branding',
  heading: 'Grow Faster With Marketing + Brand Identity',
  intro:
    'A combined strategy section for lead generation, visibility, and memorable brand presence — built to help your business look premium and perform better.',
  cta: 'Start a Project',
  services: [
    {
      icon: 'logo',
      title: 'Brand Identity',
      desc: 'Logos, visual systems, and consistent brand assets that make your business look polished and memorable.',
      metric: 'Clear brand direction',
      iconBg: 'rgba(228,64,59,0.16)',
      iconColor: '#E4403B',
    },
    {
      icon: 'social',
      title: 'Social Media Marketing',
      desc: 'Creative content planning and campaign direction to help your brand stay visible and engaging.',
      metric: 'Better audience reach',
      iconBg: 'rgba(45,62,80,0.16)',
      iconColor: '#2D3E50',
    },
    {
      icon: 'ads',
      title: 'Performance Advertising',
      desc: 'Targeted ad strategies designed to bring in leads, boost sales, and improve campaign efficiency.',
      metric: 'Focused conversions',
      iconBg: 'rgba(228,64,59,0.16)',
      iconColor: '#E4403B',
    },
    {
      icon: 'email',
      title: 'Email Marketing',
      desc: 'Simple, effective email flows that help you stay connected with customers and drive repeat business.',
      metric: 'Stronger retention',
      iconBg: 'rgba(45,62,80,0.16)',
      iconColor: '#2D3E50',
    },
  ],
  gallery: [
    { src: rebrandingMarketing0, alt: 'Rebranding and marketing creative 1' },
    { src: rebrandingMarketing1, alt: 'Rebranding and marketing creative 2' },
    { src: rebrandingMarketing2, alt: 'Rebranding and marketing creative 3' },
    { src: rebrandingMarketing3, alt: 'Rebranding and marketing creative 4' },
    { src: rebrandingMarketing4, alt: 'Rebranding and marketing creative 5' },
  ],
};

/* ─── Video projects ─────────────────────────────────────────────────── */
const VIDEO_PROJECTS = [
  {
    title: 'Prime Estate Showreel',
    videoSrc: media1,
    desc: 'Luxury real estate cinematic experience with drone footage and premium transitions.',
  },
  {
    title: 'Golden City Highlights',
    videoSrc: media2,
    desc: 'High-energy promo film for a flagship township — energy, lifestyle, and investment potential.',
  },
  {
    title: 'Aqua Green Drone Tour',
    videoSrc: media3,
    desc: 'Aerial visuals near Jewar Airport with modern editing and strategic callouts.',
  },
  {
    title: 'SMSGraph Product Explainer',
    videoSrc: media4,
    desc: 'Dynamic explainer for bulk messaging solutions — smooth animations, clear value props.',
  },
  {
    title: 'Brand Story – Digital Prizma',
    videoSrc: media5,
    desc: 'Creative agency brand film. Visual storytelling that builds trust and emotional connection.',
  },
];

const CATEGORIES = ['All', 'Web Design', 'Marketing & Branding', 'Video'];

/* ─── Small reusable UI pieces ───────────────────────────────────────── */
const SectionHeader = ({ pill, title, subtitle }) => (
  <div className="pf-header">
    <span className="pf-pill">{pill}</span>
    <h2 className="pf-title">{title}</h2>
    <p className="pf-subtitle">{subtitle}</p>
  </div>
);

const CategoryTabs = ({ activeCategory, setActiveCategory }) => (
  <div className="pf-filters" role="tablist" aria-label="Portfolio categories">
    {CATEGORIES.map((cat) => (
      <button
        key={cat}
        className={`pf-cat-btn${activeCategory === cat ? ' pf-cat-active' : ''}`}
        onClick={() => setActiveCategory(cat)}
        type="button"
        role="tab"
        aria-selected={activeCategory === cat}
      >
        {cat}
      </button>
    ))}
  </div>
);

const SearchBar = ({ value, onChange }) => (
  <div className="pf-search-wrap">
    <input
      className="pf-search"
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search by title, tag, or description"
      aria-label="Search projects"
    />
    {value && (
      <button className="pf-clear-btn" type="button" onClick={() => onChange('')}>
        Clear
      </button>
    )}
  </div>
);

const ProjectCard = ({ project }) => {
  const tagStyle = TAG_COLORS[project.tag] || TAG_COLORS['Web App'];

  return (
    <article className="pf-card">
      <div className="pf-media">
        <div className="pf-img-wrap">
          <div className="pf-img-fallback">{project.emoji}</div>
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="pf-img"
            onError={(e) => {
              e.target.onerror = null;
              e.target.style.display = 'none';
            }}
          />
        </div>

        <div className="pf-overlay">
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="pf-live-btn">
            <span>↗</span> Live Demo
          </a>
        </div>
      </div>

      <div className="pf-content">
        <span className="pf-project-tag" style={{ background: tagStyle.bg, color: tagStyle.color }}>
          {project.tag}
        </span>
        <h3 className="pf-card-title">{project.title}</h3>
        <p className="pf-card-desc">{project.desc}</p>
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="pf-card-link">
          View Project →
        </a>
      </div>
    </article>
  );
};

const VideoCard = ({ project }) => (
  <article className="pf-video-card">
    <div className="pf-video-media">
      <video className="pf-video-element" autoPlay loop muted playsInline preload="metadata">
        <source src={project.videoSrc} type="video/mp4" />
      </video>
      <div className="pf-overlay">
        <span className="pf-badge pf-badge-video">▶ Auto loop</span>
      </div>
    </div>
    <div className="pf-video-content">
      <h3 className="pf-card-title">{project.title}</h3>
      <p className="pf-card-desc">{project.desc}</p>
    </div>
  </article>
);

const ServiceSection = ({ data, onCtaClick }) => (
  <section className="ps-service-wrap">
    <div className="ps-service-header">
      <span className="ps-service-pill">{data.tag}</span>
      <h3 className="ps-service-heading">{data.heading}</h3>
      <p className="ps-service-intro">{data.intro}</p>
    </div>

    <div className="ps-service-grid">
      {data.services.map((svc, i) => (
        <article className="ps-svc-card" key={i}>
          <div className="ps-svc-icon" style={{ background: svc.iconBg }}>
            <Icon paths={ICONS[svc.icon]} size={24} color={svc.iconColor} />
          </div>
          <h4 className="ps-svc-title">{svc.title}</h4>
          <p className="ps-svc-desc">{svc.desc}</p>
          <div className="ps-svc-metric">
            <span className="ps-svc-dot" />
            {svc.metric}
          </div>
        </article>
      ))}
    </div>

    {Array.isArray(data.gallery) && data.gallery.length > 0 && (
      <div className="ps-gallery">
        {data.gallery.map((item, index) => (
          <div className="ps-gallery-card" key={index}>
            <img
              src={item.src}
              alt={item.alt}
              className="ps-gallery-img"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
              }}
            />
          </div>
        ))}
      </div>
    )}

    <div className="ps-service-cta">
      <button onClick={onCtaClick} className="ps-cta-btn" type="button">
        {data.cta} <span>→</span>
      </button>
    </div>
  </section>
);

/* ─── Main component ─────────────────────────────────────────────────── */
const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const handleOpenProjectModal = () => setIsProjectModalOpen(true);
  const handleCloseProjectModal = () => setIsProjectModalOpen(false);

  const matchesSearch = (item) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return [item.title, item.desc, item.tag]
      .filter(Boolean)
      .some((text) => text.toLowerCase().includes(q));
  };

  const visibleWebProjects = useMemo(() => WEB_PROJECTS.filter(matchesSearch), [search]);
  const visibleVideos = useMemo(() => VIDEO_PROJECTS.filter(matchesSearch), [search]);

  const showMarketing = useMemo(() => {
    if (!search.trim()) return true;
    const q = search.trim().toLowerCase();
    const haystack = [
      MARKETING_BRANDING_DATA.tag,
      MARKETING_BRANDING_DATA.heading,
      MARKETING_BRANDING_DATA.intro,
      ...MARKETING_BRANDING_DATA.services.map((s) => `${s.title} ${s.desc} ${s.metric}`),
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(q);
  }, [search]);

  const hasAnyResults =
    (activeCategory === 'All' &&
      (showMarketing || visibleWebProjects.length > 0 || visibleVideos.length > 0)) ||
    (activeCategory === 'Marketing & Branding' && showMarketing) ||
    (activeCategory === 'Web Design' && visibleWebProjects.length > 0) ||
    (activeCategory === 'Video' && visibleVideos.length > 0);

  return (
    <div className="pf-page">

      {/* ── HERO ── */}
      <section className="pf-hero">
        <div className="pf-hero-inner">
          <div className="pf-hero-badge">
            <Sparkles size={12} />
            Our Portfolio
          </div>
          <h1 className="pf-hero-h1">
            Work That <em>Speaks</em>
          </h1>
          <p className="pf-hero-p">
            16+ web projects, 5 video showreels, and complete brand campaigns —
            each built to drive real results for our clients.
          </p>
          <div className="pf-trust-row">
            <span className="pf-trust-pill"><Layout size={14} /> 16+ Web Projects</span>
            <span className="pf-trust-dot" />
            <span className="pf-trust-pill"><Video size={14} /> 5 Video Showreels</span>
            <span className="pf-trust-dot" />
            <span className="pf-trust-pill"><Star size={14} /> Brand Campaigns</span>
          </div>
          <a href="#portfolio" className="pf-hero-cta">
            View Projects <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="pf-root" id="portfolio">
        <div className="pf-container">
          <SectionHeader
            pill="Our Work"
            title="Featured Projects"
            subtitle="Browse web design, video production, and marketing campaigns — filtered by category or searched by keyword."
          />

          <SearchBar value={search} onChange={setSearch} />
          <CategoryTabs activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

          {!hasAnyResults && (
            <div className="pf-empty">
              <h3>No results found</h3>
              <p>Try a different category or clear the search box.</p>
            </div>
          )}

          {hasAnyResults && (
            <>
              {activeCategory === 'All' && showMarketing && (
                <div className="pf-block">
                  <ServiceSection data={MARKETING_BRANDING_DATA} onCtaClick={handleOpenProjectModal} />
                </div>
              )}

              {activeCategory === 'Marketing & Branding' && showMarketing && (
                <ServiceSection data={MARKETING_BRANDING_DATA} onCtaClick={handleOpenProjectModal} />
              )}

              {(activeCategory === 'All' || activeCategory === 'Web Design') && visibleWebProjects.length > 0 && (
                <section className="pf-block">
                  {activeCategory === 'All' && (
                    <div className="pf-section-label">
                      <h3>Web Design</h3>
                      <span>{visibleWebProjects.length} projects</span>
                    </div>
                  )}
                  <div className="pf-grid">
                    {visibleWebProjects.map((project, idx) => (
                      <ProjectCard key={`${project.title}-${idx}`} project={project} />
                    ))}
                  </div>
                </section>
              )}

              {(activeCategory === 'All' || activeCategory === 'Video') && visibleVideos.length > 0 && (
                <section className="pf-block">
                  {activeCategory === 'All' && (
                    <div className="pf-section-label">
                      <h3>Video</h3>
                      <span>{visibleVideos.length} projects</span>
                    </div>
                  )}
                  <div className="pf-video-grid">
                    {visibleVideos.map((project, idx) => (
                      <VideoCard key={`${project.title}-${idx}`} project={project} />
                    ))}
                  </div>
                </section>
              )}
            </>
          )}

          <ScheduleMeetingModal
            isOpen={isProjectModalOpen}
            onClose={handleCloseProjectModal}
            title="Start Your Project"
            subtitle="Tell us about your requirements and we'll get back to you with a tailored proposal."
            emoji="🚀"
            formType="Portfolio Start Project"
            showMessageField={true}
          />
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="pf-bottom-cta">
        <div className="pf-bottom-cta-inner">
          <div className="pf-bottom-cta-badge">
            <Sparkles size={12} /> Start a Project
          </div>
          <h2 className="pf-bottom-cta-h2">
            Like What You See?<br />
            <em>Let's Build Yours.</em>
          </h2>
          <p className="pf-bottom-cta-p">
            Tell us your vision and we'll turn it into a high-performance
            digital product — website, brand, or campaign.
          </p>
          <div className="pf-bottom-cta-actions">
            <button className="pf-bottom-cta-btn" onClick={handleOpenProjectModal}>
              Start a Project <ArrowRight size={16} />
            </button>
          </div>
          <p className="pf-bottom-cta-note">
            Web · Marketing · Branding · Video — custom quote in 24 hours
          </p>
        </div>
      </section>

      <style>{`
        /* ── PAGE WRAPPER ─────────────────────────────────── */
        .pf-page {
          font-family: Inter, system-ui, -apple-system, "Segoe UI", sans-serif;
          background: var(--bg-dark-master);
        }

        /* ── HERO ─────────────────────────────────────────── */
        .pf-hero {
          padding: clamp(80px, 11vw, 130px) 1.5rem clamp(70px, 9vw, 110px);
          background: var(--gradient-dark-master);
          position: relative; overflow: hidden; text-align: center;
        }
        .pf-hero::before {
          content: ""; position: absolute; inset: 0;
          background: var(--gradient-glow-master); pointer-events: none;
        }
        .pf-hero::after {
          content: ""; position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 50px 50px; pointer-events: none;
        }
        .pf-hero-inner {
          max-width: 720px; margin: 0 auto; position: relative; z-index: 1;
        }
        .pf-hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 7px 20px; border-radius: 999px;
          background: rgba(228,64,59,0.14); border: 1px solid rgba(228,64,59,0.32);
          color: #f8a09d; font-size: 0.75rem; font-weight: 700;
          letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 1.8rem;
        }
        .pf-hero-h1 {
          font-size: clamp(2.4rem, 5.5vw, 4rem); font-weight: 800;
          line-height: 1.06; letter-spacing: -0.038em;
          color: var(--text-main-dark); margin: 0 0 1.2rem;
        }
        .pf-hero-h1 em {
          font-style: normal;
          background: linear-gradient(135deg, #E4403B, #f87171);
          background-clip: text; -webkit-background-clip: text; color: transparent;
        }
        .pf-hero-p {
          font-size: clamp(1rem, 2vw, 1.15rem); color: var(--text-muted-dark);
          line-height: 1.72; margin: 0 auto 2rem; max-width: 520px;
        }
        .pf-trust-row {
          display: flex; align-items: center; justify-content: center;
          gap: 1.5rem; flex-wrap: wrap; margin-bottom: 2.4rem;
        }
        .pf-trust-pill {
          display: flex; align-items: center; gap: 6px;
          color: #94a3b8; font-size: 0.88rem; font-weight: 600;
        }
        .pf-trust-pill svg { color: #E4403B; }
        .pf-trust-dot { width: 4px; height: 4px; border-radius: 50%; background: #E4403B; }
        .pf-hero-cta {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 26px; border-radius: 9999px;
          background: linear-gradient(135deg, #E4403B, #c0392b);
          color: #fff; font-weight: 700; font-size: 0.97rem;
          border: none; cursor: pointer; text-decoration: none;
          box-shadow: 0 10px 28px rgba(228,64,59,0.28);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .pf-hero-cta:hover {
          transform: translateY(-3px); box-shadow: 0 18px 38px rgba(228,64,59,0.38);
        }

        /* ── CONTENT ROOT ─────────────────────────────────── */
        .pf-root {
          background: #FFFFFF;
          font-family: Inter, system-ui, -apple-system, "Segoe UI", sans-serif;
          padding: clamp(3rem, 6vw, 6rem) 1rem;
          color: #111111;
          width: 100%;
          overflow-x: hidden;
          position: relative;
        }

        .pf-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 0%, rgba(228,64,59,0.07) 0%, transparent 65%);
          pointer-events: none;
        }

        .pf-container {
          max-width: 1280px;
          width: 100%;
          margin: 0 auto;
          padding: 0 clamp(0.5rem, 2vw, 1.5rem);
          box-sizing: border-box;
        }

        /* ── SECTION HEADER ───────────────────────────────── */
        .pf-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .pf-pill, .ps-service-pill {
          display: inline-block;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          background: rgba(228, 64, 59, 0.15);
          border: 1px solid rgba(228, 64, 59, 0.3);
          padding: 0.35rem 1.1rem;
          border-radius: 999px;
          color: #FF6B66;
          margin-bottom: 1rem;
        }

        .pf-title, .ps-service-heading {
          font-size: clamp(1.9rem, 4vw, 3rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.12;
          color: #111111;
          margin: 0 0 0.85rem;
        }

        .pf-subtitle, .ps-service-intro {
          font-size: 1rem;
          color: #64748B;
          max-width: 760px;
          margin: 0 auto;
          line-height: 1.7;
        }

        /* ── SEARCH & FILTERS ─────────────────────────────── */
        .pf-search-wrap {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          max-width: 760px;
          margin: 0 auto 1rem;
          width: 100%;
        }

        .pf-search {
          width: 100%;
          border: 1px solid rgba(0,0,0,0.08);
          background: #FFFFFF;
          color: #111111;
          border-radius: 999px;
          padding: 0.9rem 1.1rem;
          outline: none;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          transition: all 0.2s ease;
          font-size: 0.95rem;
        }

        .pf-search::placeholder { color: #64748b; }

        .pf-search:focus {
          border-color: rgba(228, 64, 59, 0.5);
          background: rgba(15,23,42,0.9);
        }

        .pf-clear-btn {
          border: 1px solid rgba(0,0,0,0.08);
          background: #F1F5F9;
          color: #64748B;
          border-radius: 999px;
          padding: 0.9rem 1rem;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s ease;
        }

        .pf-clear-btn:hover {
          color: #111111;
          border-color: rgba(228,64,59,0.3);
          background: #E2E8F0;
        }

        .pf-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          justify-content: center;
          margin: 1.8rem 0 2rem;
          padding: 0.25rem 0;
        }

        .pf-cat-btn {
          background: #F1F5F9;
          border: 1.5px solid rgba(0,0,0,0.06);
          padding: 8px 20px;
          font-size: 0.85rem;
          font-weight: 600;
          border-radius: 999px;
          color: #64748B;
          cursor: pointer;
          transition: all 0.18s ease;
          font-family: inherit;
          white-space: nowrap;
        }

        .pf-cat-btn:hover:not(.pf-cat-active) {
          border-color: rgba(228, 64, 59, 0.2);
          color: #111111;
          background: #E2E8F0;
        }

        .pf-cat-btn:focus-visible,
        .pf-search:focus-visible,
        .pf-live-btn:focus-visible,
        .pf-card-link:focus-visible,
        .ps-cta-btn:focus-visible {
          outline: 2px solid rgba(228, 64, 59, 0.8);
          outline-offset: 2px;
        }

        .pf-cat-active {
          background: var(--color-primary) !important;
          color: #fff !important;
          border-color: var(--color-primary) !important;
          box-shadow: 0 8px 20px rgba(228, 64, 59, 0.25);
        }

        /* ── CONTENT BLOCKS ───────────────────────────────── */
        .pf-block {
          margin-top: 1.8rem;
          animation: pfFadeUp 0.45s ease-out;
        }

        .pf-section-label {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 1rem;
          margin: 0 0 1.4rem;
          padding: 0 0.1rem 0 1rem;
          border-left: 3px solid var(--color-primary);
        }

        .pf-section-label h3 {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 700;
          color: #111111;
        }

        .pf-section-label span {
          font-size: 0.85rem;
          color: #64748B;
        }

        /* ── GRID LAYOUTS ─────────────────────────────────── */
        .pf-grid,
        .pf-video-grid {
          display: grid;
          gap: 1.5rem;
        }

        .pf-grid {
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        }

        .pf-video-grid {
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          max-width: 1100px;
          margin: 0 auto;
        }

        @keyframes pfFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ── CARDS ────────────────────────────────────────── */
        .pf-card,
        .pf-video-card,
        .ps-svc-card,
        .ps-gallery-card,
        .pf-empty {
          background: #FFFFFF;
          border: 1px solid rgba(0,0,0,0.07);
          box-shadow: 0 4px 24px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04);
        }

        .pf-card {
          border-radius: 24px;
          overflow: hidden;
          transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .pf-card:hover {
          transform: translateY(-6px);
          border-color: rgba(228, 64, 59, 0.22);
          box-shadow: 0 20px 44px -12px rgba(228,64,59,0.18), 0 4px 16px rgba(0,0,0,0.08);
        }

        .pf-video-card {
          border-radius: 20px;
          overflow: hidden;
          transition: transform 0.28s ease, box-shadow 0.28s ease;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .pf-video-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 32px -10px rgba(0,0,0,0.1);
        }

        .pf-media {
          position: relative;
          overflow: hidden;
          aspect-ratio: 16/9;
          background: #111111;
          flex-shrink: 0;
        }

        .pf-img-wrap {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .pf-img-fallback {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3.4rem;
          background: linear-gradient(145deg, #1f1414, #111111);
          z-index: 0;
        }

        .pf-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
          z-index: 1;
        }

        .pf-card:hover .pf-img { transform: scale(1.05); }

        .pf-video-media {
          position: relative;
          overflow: hidden;
          aspect-ratio: 16/9;
          background: #000;
          flex-shrink: 0;
        }

        .pf-video-element {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: brightness(0.9);
          transition: filter 0.3s ease;
        }

        .pf-video-card:hover .pf-video-element { filter: brightness(1); }

        .pf-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle, rgba(10,18,40,0.85), rgba(0,0,0,0.7));
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.28s ease;
          z-index: 2;
        }

        .pf-card:hover .pf-overlay,
        .pf-video-card:hover .pf-overlay { opacity: 1; }

        .pf-badge {
          padding: 0.45rem 1.1rem;
          border-radius: 999px;
          font-weight: 700;
          font-size: 0.78rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .pf-badge-video {
          background: rgba(0,0,0,0.65);
          backdrop-filter: blur(8px);
          color: white;
          border: 1px solid rgba(255,255,255,0.15);
        }

        .pf-live-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #E4403B 0%, #B91C1C 100%);
          padding: 0.7rem 1.4rem;
          border-radius: 999px;
          text-decoration: none;
          color: white;
          font-weight: 700;
          font-size: 0.88rem;
          box-shadow: 0 8px 18px rgba(228, 64, 59, 0.35);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .pf-live-btn:hover {
          transform: translateY(-1px) scale(1.02);
          box-shadow: 0 12px 24px rgba(228, 64, 59, 0.45);
        }

        .pf-content,
        .pf-video-content {
          padding: 1.4rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          flex: 1;
        }

        .pf-project-tag {
          display: inline-block;
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 0.3rem 0.85rem;
          border-radius: 999px;
          width: fit-content;
        }

        .pf-card-title {
          font-size: 1.15rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          line-height: 1.35;
          color: #111111;
          margin: 0;
        }

        .pf-card-desc {
          font-size: 0.9rem;
          line-height: 1.6;
          color: #64748B;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin: 0;
          flex: 1;
        }

        .pf-card-link {
          font-size: 0.85rem;
          font-weight: 700;
          color: #E4403B;
          text-decoration: none;
          margin-top: 0.25rem;
          display: inline-block;
          transition: color 0.2s ease;
        }

        .pf-card-link:hover {
          color: #f87171;
          text-decoration: underline;
        }

        /* ── MARKETING & BRANDING SECTION ─────────────────── */
        .ps-service-wrap {
          animation: pfFadeUp 0.45s ease-out;
          margin-top: 0.8rem;
        }

        .ps-service-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .ps-service-heading {
          font-size: clamp(1.7rem, 3.2vw, 2.5rem);
          margin-bottom: 0.8rem;
        }

        .ps-service-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .ps-svc-card {
          border-radius: 20px;
          padding: 1.6rem;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
          height: 100%;
        }

        .ps-svc-card:hover {
          transform: translateY(-4px);
          border-color: rgba(228, 64, 59, 0.22);
          box-shadow: 0 16px 32px -10px rgba(0,0,0,0.08);
        }

        .ps-svc-icon {
          width: 54px;
          height: 54px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .ps-svc-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #111111;
          margin: 0;
        }

        .ps-svc-desc {
          font-size: 0.9rem;
          color: #64748B;
          line-height: 1.6;
          margin: 0;
          flex: 1;
        }

        .ps-svc-metric {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.75rem;
          font-weight: 700;
          color: #E4403B;
          padding-top: 0.75rem;
          border-top: 1px solid rgba(228, 64, 59, 0.15);
        }

        .ps-svc-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #E4403B;
          flex-shrink: 0;
          box-shadow: 0 0 6px rgba(228, 64, 59, 0.7);
        }

        /* ── GALLERY GRID ─────────────────────────────────── */
        .ps-gallery {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 1.2rem;
          margin: 2rem 0;
        }

        .ps-gallery-card {
          border-radius: 18px;
          overflow: hidden;
          transition: transform 0.2s ease;
        }

        .ps-gallery-card:hover { transform: scale(1.02); }

        .ps-gallery-img {
          display: block;
          width: 100%;
          aspect-ratio: 1 / 1;
          object-fit: cover;
        }

        .ps-service-cta {
          display: flex;
          justify-content: center;
          margin-top: 1rem;
        }

        .ps-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: linear-gradient(135deg, #E4403B, #c0392b);
          color: white;
          font-weight: 700;
          font-size: 1rem;
          padding: 13px 26px;
          border-radius: 9999px;
          text-decoration: none;
          border: none;
          cursor: pointer;
          font-family: inherit;
          box-shadow: 0 10px 28px rgba(228, 64, 59, 0.28);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .ps-cta-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 18px 38px rgba(228, 64, 59, 0.38);
        }

        /* ── EMPTY STATE ──────────────────────────────────── */
        .pf-empty {
          max-width: 560px;
          margin: 2rem auto 0;
          text-align: center;
          border-radius: 24px;
          padding: 2.5rem 1.8rem;
        }

        .pf-empty h3 { margin: 0 0 0.6rem; color: #111111; font-size: 1.4rem; }
        .pf-empty p { margin: 0; color: #64748B; }

        /* ── BOTTOM CTA ───────────────────────────────────── */
        .pf-bottom-cta {
          padding: clamp(4.5rem, 8vw, 8rem) 1.5rem; text-align: center;
          background:
            radial-gradient(ellipse at 25% 60%, rgba(228,64,59,0.24), transparent 50%),
            radial-gradient(ellipse at 78% 25%, rgba(228,64,59,0.16), transparent 48%),
            linear-gradient(170deg, #1a0a08 0%, #2d1510 100%);
          position: relative; overflow: hidden;
        }
        .pf-bottom-cta::before {
          content: ""; position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 50px 50px; pointer-events: none;
        }
        .pf-bottom-cta-inner {
          max-width: 620px; margin: 0 auto; position: relative; z-index: 1;
        }
        .pf-bottom-cta-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 7px 20px; border-radius: 999px;
          background: rgba(228,64,59,0.14); border: 1px solid rgba(228,64,59,0.32);
          color: #f8a09d; font-size: 0.75rem; font-weight: 700;
          letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 1.5rem;
        }
        .pf-bottom-cta-h2 {
          font-size: clamp(2rem, 5vw, 3.4rem); font-weight: 800;
          letter-spacing: -0.038em; line-height: 1.08;
          color: #f8fafc; margin: 0 0 1rem;
        }
        .pf-bottom-cta-h2 em {
          font-style: normal;
          background: linear-gradient(135deg, #E4403B, #f87171);
          background-clip: text; -webkit-background-clip: text; color: transparent;
        }
        .pf-bottom-cta-p {
          font-size: 1.05rem; color: #94a3b8; line-height: 1.7;
          margin: 0 auto 2.4rem; max-width: 480px;
        }
        .pf-bottom-cta-actions {
          display: flex; align-items: center; justify-content: center;
          gap: 1rem; flex-wrap: wrap;
        }
        .pf-bottom-cta-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 26px; border-radius: 9999px;
          background: linear-gradient(135deg, #E4403B, #c0392b);
          color: #fff; font-weight: 700; font-size: 0.97rem;
          border: none; cursor: pointer;
          box-shadow: 0 10px 28px rgba(228,64,59,0.28);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          font-family: inherit;
        }
        .pf-bottom-cta-btn:hover {
          transform: translateY(-3px); box-shadow: 0 18px 38px rgba(228,64,59,0.38);
        }
        .pf-bottom-cta-note {
          font-size: 0.78rem; color: #475569; margin-top: 1.4rem;
        }

        /* ── RESPONSIVE ───────────────────────────────────── */
        @media (max-width: 900px) {
          .ps-gallery { grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); }
        }

        @media (max-width: 768px) {
          .pf-root { padding-left: 0.75rem; padding-right: 0.75rem; }
          .pf-search-wrap { flex-direction: column; align-items: stretch; }
          .pf-clear-btn { width: 100%; text-align: center; }
          .pf-filters { gap: 0.6rem; }
          .pf-cat-btn { padding: 0.55rem 1rem; font-size: 0.85rem; }
          .ps-service-grid { grid-template-columns: 1fr; }
          .pf-section-label { flex-direction: column; align-items: flex-start; gap: 0.2rem; }
          .pf-trust-row { gap: 0.75rem; }
        }

        @media (max-width: 640px) {
          .pf-title { font-size: 1.8rem; }
          .pf-grid, .pf-video-grid { grid-template-columns: 1fr; }
          .pf-content, .pf-video-content { padding: 1.2rem; }
          .ps-gallery { grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); }
          .ps-cta-btn { width: 100%; justify-content: center; }
          .pf-bottom-cta-btn { width: 100%; justify-content: center; }
        }

        @media (max-width: 480px) {
          .ps-gallery { grid-template-columns: 1fr; }
          .pf-card-title { font-size: 1rem; }
        }
      `}</style>
    </div>
  );
};

export default Portfolio;
