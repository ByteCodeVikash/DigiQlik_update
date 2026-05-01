import React, { useMemo, useState } from 'react';

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

// 🎥 Videos – imported directly (no need to move them into root /public)
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
  'Web App': { bg: 'rgba(99,102,241,0.18)', color: '#a5b4fc' },
  'E-Commerce': { bg: 'rgba(16,185,129,0.18)', color: '#6ee7b7' },
  'Gas Service': { bg: 'rgba(245,158,11,0.18)', color: '#fcd34d' },
  Agency: { bg: 'rgba(236,72,153,0.18)', color: '#f9a8d4' },
  FinTech: { bg: 'rgba(59,130,246,0.18)', color: '#93c5fd' },
  'Real Estate': { bg: 'rgba(34,197,94,0.18)', color: '#86efac' },
  CRM: { bg: 'rgba(14,165,233,0.18)', color: '#7dd3fc' },
  Portfolio: { bg: 'rgba(168,85,247,0.18)', color: '#d8b4fe' },
  Fashion: { bg: 'rgba(244,114,182,0.18)', color: '#f9a8d4' },
  Electronics: { bg: 'rgba(249,115,22,0.18)', color: '#fdba74' },
};

/* ─── Web Design projects (with fixed image fallback) ───────────────── */
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
      iconBg: 'rgba(168,85,247,0.16)',
      iconColor: '#d8b4fe',
    },
    {
      icon: 'social',
      title: 'Social Media Marketing',
      desc: 'Creative content planning and campaign direction to help your brand stay visible and engaging.',
      metric: 'Better audience reach',
      iconBg: 'rgba(14,165,233,0.16)',
      iconColor: '#7dd3fc',
    },
    {
      icon: 'ads',
      title: 'Performance Advertising',
      desc: 'Targeted ad strategies designed to bring in leads, boost sales, and improve campaign efficiency.',
      metric: 'Focused conversions',
      iconBg: 'rgba(245,158,11,0.16)',
      iconColor: '#fcd34d',
    },
    {
      icon: 'email',
      title: 'Email Marketing',
      desc: 'Simple, effective email flows that help you stay connected with customers and drive repeat business.',
      metric: 'Stronger retention',
      iconBg: 'rgba(99,102,241,0.16)',
      iconColor: '#a5b4fc',
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

/* ─── Video projects (using imported files, so videos work from anywhere) ─ */
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
              e.target.onerror = null; // prevent infinite loop
              e.target.style.display = 'none'; // hide broken image, fallback emoji stays visible
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

const ServiceSection = ({ data }) => (
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
      <a href="#contact" className="ps-cta-btn">
        {data.cta} <span>→</span>
      </a>
    </div>
  </section>
);

/* ─── Main component ─────────────────────────────────────────────────── */
const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const matchesSearch = (item) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;

    return [item.title, item.desc, item.tag]
      .filter(Boolean)
      .some((text) => text.toLowerCase().includes(q));
  };

  const visibleWebProjects = useMemo(
    () => WEB_PROJECTS.filter(matchesSearch),
    [search]
  );

  const visibleVideos = useMemo(
    () => VIDEO_PROJECTS.filter(matchesSearch),
    [search]
  );

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
    <section className="pf-root" id="portfolio">
      <div className="pf-container">
        <SectionHeader
          pill="Our Work"
          title="Featured Projects"
          subtitle="A cleaner, easier-to-scan portfolio with better mobile behavior, clearer sections, and quick filtering."
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
                <ServiceSection data={MARKETING_BRANDING_DATA} />
              </div>
            )}

            {activeCategory === 'Marketing & Branding' && showMarketing && (
              <ServiceSection data={MARKETING_BRANDING_DATA} />
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
      </div>

      <style>{`
        /* Base Reset & Root */
        .pf-root {
          background:
            radial-gradient(circle at top, rgba(79,70,229,0.22), transparent 30%),
            linear-gradient(160deg, #070d1a 0%, #0d1525 55%, #070d1a 100%);
          font-family: Inter, system-ui, -apple-system, "Segoe UI", sans-serif;
          padding: clamp(3rem, 6vw, 6rem) 1rem;
          color: #e2e8f0;
          width: 100%;
          overflow-x: hidden;
        }

        .pf-container {
          max-width: 1280px;
          width: 100%;
          margin: 0 auto;
          padding: 0 clamp(0.5rem, 2vw, 1.5rem);
          box-sizing: border-box;
        }

        /* Headers & Typography */
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
          background: rgba(99,102,241,0.15);
          border: 1px solid rgba(99,102,241,0.3);
          padding: 0.35rem 1.1rem;
          border-radius: 999px;
          color: #a5b4fc;
          margin-bottom: 1rem;
        }

        .pf-title, .ps-service-heading {
          font-size: clamp(1.9rem, 4vw, 3rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.12;
          background: linear-gradient(135deg, #fff 20%, #94a3b8 100%);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          margin: 0 0 0.85rem;
        }

        .pf-subtitle, .ps-service-intro {
          font-size: 1rem;
          color: #94a3b8;
          max-width: 760px;
          margin: 0 auto;
          line-height: 1.7;
        }

        /* Search & Filters */
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
          border: 1px solid rgba(148,163,184,0.18);
          background: rgba(15,23,42,0.7);
          color: #e2e8f0;
          border-radius: 999px;
          padding: 0.9rem 1.1rem;
          outline: none;
          box-shadow: 0 8px 24px rgba(0,0,0,0.18);
          transition: border-color 0.2s ease, background 0.2s ease;
          font-size: 0.95rem;
        }

        .pf-search::placeholder {
          color: #64748b;
        }

        .pf-search:focus {
          border-color: rgba(129,140,248,0.5);
          background: rgba(15,23,42,0.9);
        }

        .pf-clear-btn {
          border: 1px solid rgba(148,163,184,0.18);
          background: rgba(30,41,59,0.8);
          color: #cbd5e1;
          border-radius: 999px;
          padding: 0.9rem 1rem;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s ease;
        }

        .pf-clear-btn:hover {
          color: #fff;
          border-color: rgba(129,140,248,0.35);
          background: rgba(51,65,85,0.9);
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
          background: rgba(30,41,59,0.6);
          border: 1px solid rgba(99,102,241,0.15);
          padding: 0.65rem 1.2rem;
          font-size: 0.88rem;
          font-weight: 600;
          border-radius: 999px;
          color: #94a3b8;
          cursor: pointer;
          transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
          font-family: inherit;
          backdrop-filter: blur(8px);
          white-space: nowrap;
        }

        .pf-cat-btn:hover {
          background: rgba(51,65,85,0.75);
          color: #e2e8f0;
          border-color: rgba(99,102,241,0.3);
          transform: translateY(-1px);
        }

        .pf-cat-btn:focus-visible,
        .pf-search:focus-visible,
        .pf-live-btn:focus-visible,
        .pf-card-link:focus-visible,
        .ps-cta-btn:focus-visible {
          outline: 2px solid rgba(129,140,248,0.8);
          outline-offset: 2px;
        }

        .pf-cat-active {
          background: linear-gradient(135deg, #4f46e5, #7c3aed) !important;
          color: #fff !important;
          border-color: transparent !important;
          box-shadow: 0 8px 22px rgba(79,70,229,0.35);
        }

        /* Content Blocks */
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
          padding: 0 0.1rem;
          border-left: 3px solid #4f46e5;
          padding-left: 1rem;
        }

        .pf-section-label h3 {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 700;
          color: #f8fafc;
        }

        .pf-section-label span {
          font-size: 0.85rem;
          color: #94a3b8;
        }

        /* Grid Layouts */
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

        /* Cards - Web & Video */
        .pf-card,
        .pf-video-card,
        .ps-svc-card,
        .ps-gallery-card,
        .pf-empty {
          background: rgba(15,23,42,0.75);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(99,102,241,0.15);
          box-shadow: 0 8px 30px -12px rgba(0,0,0,0.45);
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
          border-color: rgba(99,102,241,0.4);
          box-shadow: 0 24px 48px -14px rgba(0,0,0,0.55);
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
          box-shadow: 0 18px 40px -12px rgba(0,0,0,0.5);
        }

        .pf-media {
          position: relative;
          overflow: hidden;
          aspect-ratio: 16/9;
          background: #0b1120;
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
          background: linear-gradient(145deg, #1e293b, #0f172a);
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

        .pf-card:hover .pf-img {
          transform: scale(1.05);
        }

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

        .pf-video-card:hover .pf-video-element {
          filter: brightness(1);
        }

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
        .pf-video-card:hover .pf-overlay {
          opacity: 1;
        }

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
          background: linear-gradient(105deg, #4f46e5, #7c3aed);
          padding: 0.7rem 1.4rem;
          border-radius: 999px;
          text-decoration: none;
          color: white;
          font-weight: 700;
          font-size: 0.88rem;
          box-shadow: 0 8px 18px rgba(79,70,229,0.35);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .pf-live-btn:hover {
          transform: translateY(-1px) scale(1.02);
          box-shadow: 0 12px 24px rgba(99,102,241,0.45);
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
          color: #f8fafc;
          margin: 0;
        }

        .pf-card-desc {
          font-size: 0.9rem;
          line-height: 1.6;
          color: #94a3b8;
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
          color: #a5b4fc;
          text-decoration: none;
          margin-top: 0.25rem;
          display: inline-block;
          transition: color 0.2s ease;
        }

        .pf-card-link:hover {
          color: #ddd6fe;
          text-decoration: underline;
        }

        /* Marketing & Branding Section */
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
          border-color: rgba(99,102,241,0.35);
          box-shadow: 0 18px 36px -12px rgba(0,0,0,0.5);
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
          color: #f8fafc;
          margin: 0;
        }

        .ps-svc-desc {
          font-size: 0.9rem;
          color: #94a3b8;
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
          color: #a5b4fc;
          padding-top: 0.75rem;
          border-top: 1px solid rgba(99,102,241,0.15);
        }

        .ps-svc-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #818cf8;
          flex-shrink: 0;
          box-shadow: 0 0 6px rgba(129,140,248,0.7);
        }

        /* Gallery Grid */
        .ps-gallery {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 1.2rem;
          margin: 2rem 0 2rem;
        }

        .ps-gallery-card {
          border-radius: 18px;
          overflow: hidden;
          transition: transform 0.2s ease;
        }

        .ps-gallery-card:hover {
          transform: scale(1.02);
        }

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
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          color: white;
          font-weight: 700;
          font-size: 1rem;
          padding: 0.9rem 2rem;
          border-radius: 999px;
          text-decoration: none;
          box-shadow: 0 8px 20px rgba(79,70,229,0.4);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .ps-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 28px rgba(79,70,229,0.5);
        }

        /* Empty State */
        .pf-empty {
          max-width: 560px;
          margin: 2rem auto 0;
          text-align: center;
          border-radius: 24px;
          padding: 2.5rem 1.8rem;
        }

        .pf-empty h3 {
          margin: 0 0 0.6rem;
          color: #f8fafc;
          font-size: 1.4rem;
        }

        .pf-empty p {
          margin: 0;
          color: #94a3b8;
        }

        /* Responsive Adjustments */
        @media (max-width: 900px) {
          .ps-gallery {
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .pf-root {
            padding-left: 0.75rem;
            padding-right: 0.75rem;
          }

          .pf-search-wrap {
            flex-direction: column;
            align-items: stretch;
          }

          .pf-clear-btn {
            width: 100%;
            text-align: center;
          }

          .pf-filters {
            gap: 0.6rem;
          }

          .pf-cat-btn {
            padding: 0.55rem 1rem;
            font-size: 0.85rem;
          }

          .ps-service-grid {
            grid-template-columns: 1fr;
          }

          .pf-section-label {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.2rem;
          }
        }

        @media (max-width: 640px) {
          .pf-title {
            font-size: 1.8rem;
          }

          .pf-grid,
          .pf-video-grid {
            grid-template-columns: 1fr;
          }

          .pf-content,
          .pf-video-content {
            padding: 1.2rem;
          }

          .ps-gallery {
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          }

          .ps-cta-btn {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .ps-gallery {
            grid-template-columns: 1fr;
          }
          
          .pf-card-title {
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Portfolio;