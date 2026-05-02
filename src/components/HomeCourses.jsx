import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Filter,
  GraduationCap,
  LayoutGrid,
  Mail,
  Megaphone,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Video,
} from "lucide-react";

const courseData = [
  {
    id: "digital-marketing-basics",
    title: "Digital Marketing Basics",
    price: "₹1,999",
    priceTier: "Essential",
    duration: "4 Weeks",
    mode: "Crash / Weekly",
    icon: Megaphone,
    short: "Complete introduction to digital marketing for beginners.",
    outcome: "Understand marketing funnels, branding, and lead generation fundamentals.",
    topics: ["Marketing fundamentals", "Brand positioning", "Funnel basics", "Lead generation"],
    curriculum: [
      "Introduction to digital marketing",
      "How online business growth works",
      "Marketing funnel and customer journey",
      "Branding, audience, and offer creation",
      "Live practical examples and assignments",
    ],
    imageUrl: "https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "seo-content",
    title: "SEO + Content Marketing",
    price: "₹1,999",
    priceTier: "Essential",
    duration: "5 Weeks",
    mode: "Weekly / Weekend",
    icon: Search,
    short: "Learn SEO and content strategy to drive organic traffic.",
    outcome: "Build SEO expertise and content plan for sustainable growth.",
    topics: ["Keyword research", "On-page SEO", "Off-page SEO", "Blog strategy"],
    curriculum: [
      "SEO fundamentals and search intent",
      "Keyword research tools and planning",
      "On-page SEO structure and optimization",
      "Off-page SEO and backlink basics",
      "Blog writing, content calendar, and ranking practice",
    ],
    imageUrl: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "email-marketing",
    title: "Email Marketing",
    price: "₹1,999",
    priceTier: "Essential",
    duration: "3 Weeks",
    mode: "Weekly / Crash",
    icon: Mail,
    short: "Learn newsletters, automation, and lead nurturing strategies.",
    outcome: "Write high-converting emails and build customer relationships.",
    topics: ["Lead nurturing", "Automation", "Newsletter writing", "Open-rate growth"],
    curriculum: [
      "Email marketing fundamentals",
      "Lead list building and segmentation",
      "Newsletter copywriting",
      "Automation flows and follow-up systems",
      "Performance tracking and improvement",
    ],
    imageUrl: "https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "branding",
    title: "Branding & Creative Strategy",
    price: "₹1,999",
    priceTier: "Essential",
    duration: "3 Weeks",
    mode: "Crash / Weekly",
    icon: Sparkles,
    short: "Create powerful brand identity and creative direction.",
    outcome: "Build visual and content strategy for market presence.",
    topics: ["Brand identity", "Creative planning", "Ad copy", "Tone"],
    curriculum: [
      "Brand identity and market positioning",
      "Creative direction and campaign ideas",
      "Copywriting basics for ads and posts",
      "Visual consistency and brand tone",
      "Practical branding case studies",
    ],
    imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "social-media-marketing",
    title: "Social Media Marketing",
    price: "₹4,999",
    priceTier: "Professional",
    duration: "4 Weeks",
    mode: "Weekly / Weekend",
    icon: Users,
    short: "Advanced social media growth on Instagram, Facebook, YouTube.",
    outcome: "Plan, optimize content and scale engagement across platforms.",
    topics: ["Instagram growth", "Reels strategy", "Audience engagement", "Content planning"],
    curriculum: [
      "Platform-wise marketing strategy",
      "Content planning and calendar creation",
      "Reels, posts, stories, and captions",
      "Engagement, community, and brand voice",
      "Campaign practice and live feedback",
    ],
    imageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "google-ads",
    title: "Google Ads / PPC",
    price: "₹4,999",
    priceTier: "Professional",
    duration: "4 Weeks",
    mode: "Crash / Monthly",
    icon: Target,
    short: "Professional paid ads training for maximum ROI.",
    outcome: "Create and optimize search & display campaigns effectively.",
    topics: ["Search ads", "Display ads", "Campaign setup", "Conversion tracking"],
    curriculum: [
      "Google Ads account structure",
      "Search campaign creation",
      "Keyword targeting and bidding basics",
      "Ad copy, extensions, and conversion tracking",
      "Optimization, reporting, and live campaign breakdown",
    ],
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "analytics",
    title: "Analytics & Reporting",
    price: "₹4,999",
    priceTier: "Professional",
    duration: "4 Weeks",
    mode: "Weekend / Monthly",
    icon: TrendingUp,
    short: "Master data tracking and performance reporting.",
    outcome: "Read metrics, measure ROI, and create client-ready reports.",
    topics: ["Google Analytics", "ROI", "Dashboard reading", "Reporting"],
    curriculum: [
      "Website and campaign metrics",
      "Google Analytics basics",
      "Traffic sources and behavior analysis",
      "Conversions, goals, and reporting",
      "Client-style reports and live practice",
    ],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "ecommerce-marketing",
    title: "E-commerce Marketing",
    price: "₹4,999",
    priceTier: "Professional",
    duration: "4 Weeks",
    mode: "Weekly / Weekend",
    icon: LayoutGrid,
    short: "Grow product-based businesses and online stores.",
    outcome: "Promote products and optimize sales funnels for better conversion.",
    topics: ["Product promotion", "Sales funnels", "Marketplace strategy", "Retention"],
    curriculum: [
      "E-commerce marketing model",
      "Product page optimization",
      "Ad strategy for products",
      "Offer, pricing, and upsell concepts",
      "Store growth and retention planning",
    ],
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
  },
];

const features = [
  {
    icon: Video,
    title: "Live Classes Only",
    desc: "No recorded lectures. Students learn through live sessions and interaction.",
  },
  {
    icon: ShieldCheck,
    title: "Free Trial Class",
    desc: "A trial option helps students choose before joining the full course.",
  },
  {
    icon: BookOpen,
    title: "Study Material + Certificate",
    desc: "Notes, assignments, and completion certification are included.",
  },
  {
    icon: CheckCircle2,
    title: "Practical Learning",
    desc: "Live practice, doubt solving, and real task-based learning.",
  },
  {
    icon: CalendarDays,
    title: "Flexible Batches",
    desc: "Crash, weekly, weekend, and monthly formats available.",
  },
  {
    icon: GraduationCap,
    title: "Affordable Pricing",
    desc: "Pricing is set for Indian students and beginners.",
  },
];

export default function CoursesPage() {
  const [view, setView] = useState("brief");
  const [activeId, setActiveId] = useState(courseData[0].id);

  const activeCourse = useMemo(
    () => courseData.find((course) => course.id === activeId) || courseData[0],
    [activeId]
  );

  const ActiveIcon = activeCourse.icon;

  return (
    <main className="courses-page">
      <style>{`
        .courses-page{
          min-height:100vh;
          background:
            radial-gradient(circle at top left, rgba(228, 64, 59, 0.12), transparent 28%),
            radial-gradient(circle at bottom right, rgba(45, 62, 80, 0.10), transparent 30%),
            linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
          color:#0f172a;
          padding:32px 18px 70px;
        }

        .cp-container{
          max-width:1240px;
          margin:0 auto;
        }

        .cp-hero{
          display:grid;
          grid-template-columns:1.15fr .85fr;
          gap:22px;
          align-items:stretch;
          margin-bottom:24px;
        }

        .cp-panel{
          background:rgba(255,255,255,.86);
          border:1px solid rgba(148,163,184,.22);
          box-shadow:0 18px 45px rgba(15,23,42,.08);
          border-radius:28px;
          overflow:hidden;
        }

        .cp-hero-left{
          padding:30px;
          display:flex;
          flex-direction:column;
          justify-content:center;
          min-height:390px;
        }

        .cp-badge{
          display:inline-flex;
          align-items:center;
          gap:10px;
          width:fit-content;
          padding:10px 14px;
          border-radius:999px;
          background: rgba(228, 64, 59, 0.1);
          color: var(--color-primary);
          font-weight:800;
          font-size:.92rem;
          margin-bottom:18px;
        }

        .cp-title{
          font-size:clamp(2rem, 4vw, 3.6rem);
          line-height:1.02;
          letter-spacing:-.04em;
          margin:0 0 14px;
          max-width:15ch;
        }

        .cp-title span{ color: var(--color-primary); }

        .cp-subtitle{
          font-size:1.02rem;
          line-height:1.75;
          color:#475569;
          max-width:65ch;
          margin:0 0 24px;
        }

        .cp-actions{
          display:flex;
          flex-wrap:wrap;
          gap:12px;
          margin-top:4px;
        }

        .cp-btn, .cp-btn-secondary{
          display:inline-flex;
          align-items:center;
          justify-content:center;
          gap:10px;
          padding:14px 18px;
          border-radius:16px;
          font-weight:800;
          text-decoration:none;
          transition:transform .2s ease, box-shadow .2s ease;
        }

        .cp-btn{
          background: var(--gradient-primary);
          color:#fff;
          box-shadow:0 14px 30px rgba(228, 64, 59, 0.22);
        }

        .cp-btn-secondary{
          background:#fff;
          color:#0f172a;
          border:1px solid rgba(148,163,184,.35);
        }

        .cp-btn:hover,.cp-btn-secondary:hover{ transform:translateY(-2px); }

        .cp-hero-right{
          position:relative;
          min-height:390px;
          background:
            linear-gradient(180deg, rgba(15,23,42,.10), rgba(15,23,42,.50)),
            url("https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1200&q=80")
            center/cover no-repeat;
          display:flex;
          align-items:flex-end;
        }

        .cp-overlay{
          width:100%;
          padding:24px;
          color:#fff;
        }

        .cp-stats{
          display:grid;
          grid-template-columns:repeat(2, minmax(0, 1fr));
          gap:12px;
        }

        .cp-stat{
          background:rgba(255,255,255,.14);
          backdrop-filter:blur(10px);
          border:1px solid rgba(255,255,255,.18);
          border-radius:18px;
          padding:16px;
        }

        .cp-stat strong{
          display:block;
          font-size:1.15rem;
          margin-bottom:4px;
        }

        .cp-stat span{
          display:block;
          line-height:1.45;
          font-size:.92rem;
          color:rgba(255,255,255,.88);
        }

        .cp-toolbar{
          display:flex;
          justify-content:space-between;
          align-items:center;
          gap:14px;
          flex-wrap:wrap;
          margin:26px 0 16px;
        }

        .cp-toolbar h2{
          margin:0;
          font-size:clamp(1.55rem, 2.3vw, 2.25rem);
          letter-spacing:-.03em;
        }

        .cp-toolbar p{
          margin:6px 0 0;
          color:#64748b;
          line-height:1.6;
          max-width:72ch;
        }

        .cp-toggle{
          display:inline-flex;
          background:#e2e8f0;
          padding:6px;
          border-radius:999px;
          gap:6px;
          box-shadow:inset 0 1px 2px rgba(15,23,42,.06);
        }

        .cp-toggle button{
          border:0;
          background:transparent;
          padding:11px 16px;
          border-radius:999px;
          font-weight:800;
          color:#475569;
          cursor:pointer;
          transition:all .18s ease;
        }

        .cp-toggle button.active{
          background:#fff;
          color:#0f172a;
          box-shadow:0 8px 20px rgba(15,23,42,.08);
        }

        .cp-layout{
          display:grid;
          grid-template-columns:1.05fr .95fr;
          gap:20px;
          align-items:start;
        }

        .cp-brief-grid{
          display:grid;
          grid-template-columns:repeat(2, minmax(0, 1fr));
          gap:18px;
        }

        .cp-card{
          background:rgba(255,255,255,.92);
          border:1px solid rgba(148,163,184,.2);
          border-radius:24px;
          overflow:hidden;
          box-shadow:0 16px 36px rgba(15,23,42,.07);
          transition:transform .2s ease, box-shadow .2s ease;
        }

        .cp-card:hover{
          transform:translateY(-3px);
          box-shadow:0 20px 40px rgba(15,23,42,.10);
        }

        .cp-card-img{
          height:160px;
          background-size:cover;
          background-position:center;
          position:relative;
        }

        .cp-card-img::after{
          content:"";
          position:absolute;
          inset:0;
          background:linear-gradient(180deg, rgba(15,23,42,.05), rgba(15,23,42,.38));
        }

        .cp-card-body{
          padding:20px;
          display:flex;
          flex-direction:column;
          gap:13px;
        }

        .cp-card-top{
          display:flex;
          gap:12px;
          align-items:flex-start;
        }

        .cp-icon{
          width:46px;
          height:46px;
          border-radius:16px;
          background: rgba(228, 64, 59, 0.1);
          display:grid;
          place-items:center;
          color: var(--color-primary);
          flex:0 0 auto;
        }

        .cp-card h3{
          margin:0;
          font-size:1.08rem;
          line-height:1.3;
        }

        .cp-meta{
          display:flex;
          flex-wrap:wrap;
          gap:8px;
          margin-top:8px;
        }

        .cp-pill{
          display:inline-flex;
          align-items:center;
          padding:7px 11px;
          border-radius:999px;
          background: var(--color-primary-light);
          color: var(--color-primary);
          font-size:.84rem;
          font-weight:800;
        }

        .cp-price-tier{
          background: #fef9c3;
          color: #854d0e;
        }

        .cp-short{
          margin:0;
          color:#475569;
          line-height:1.65;
        }

        .cp-bullets{
          margin:0;
          padding:0;
          list-style:none;
          display:grid;
          gap:9px;
        }

        .cp-bullets li{
          display:flex;
          gap:10px;
          align-items:flex-start;
          line-height:1.5;
          color:#334155;
        }

        .cp-bullets svg{
          color:#16a34a;
          flex:0 0 auto;
          margin-top:2px;
        }

        .cp-card-footer{
          margin-top:auto;
          display:flex;
          justify-content:space-between;
          align-items:flex-end;
          flex-wrap:wrap;
          gap:12px;
          padding-top:6px;
        }

        .cp-price{
          display:flex;
          flex-direction:column;
        }

        .cp-price strong{
          font-size:1.4rem;
          line-height:1;
        }

        .cp-price span{
          color:#64748b;
          font-size:.9rem;
          margin-top:4px;
        }

        .cp-link{
          display:inline-flex;
          align-items:center;
          gap:8px;
          color: var(--color-primary);
          font-weight:800;
          text-decoration:none;
          white-space:nowrap;
          background:none;
          border:none;
          cursor:pointer;
        }

        .cp-detail{
          position:sticky;
          top:16px;
        }

        .cp-detail-head{
          padding:20px;
          border-bottom:1px solid rgba(148,163,184,.16);
          display:flex;
          gap:14px;
          align-items:flex-start;
        }

        .cp-detail-head h3{
          margin:0 0 6px;
          font-size:1.25rem;
        }

        .cp-detail-head p{
          margin:0;
          color:#64748b;
          line-height:1.6;
        }

        .cp-detail-body{
          padding:20px;
          display:grid;
          gap:16px;
        }

        .cp-section-box{
          background:#fff;
          border:1px solid rgba(148,163,184,.18);
          border-radius:20px;
          padding:16px;
        }

        .cp-section-box h4{
          margin:0 0 10px;
          font-size:1rem;
        }

        .cp-section-box p{
          margin:0;
          color:#475569;
          line-height:1.7;
        }

        .cp-list{
          margin:0;
          padding:0;
          list-style:none;
          display:grid;
          gap:10px;
        }

        .cp-list li{
          display:flex;
          gap:10px;
          align-items:flex-start;
          color:#334155;
          line-height:1.5;
        }

        .cp-list svg{
          color:#16a34a;
          margin-top:2px;
          flex:0 0 auto;
        }

        .cp-features{
          margin-top:26px;
          background:rgba(15,23,42,.96);
          color:#fff;
          border-radius:28px;
          padding:24px;
          display:grid;
          grid-template-columns:repeat(3, minmax(0, 1fr));
          gap:14px;
        }

        .cp-feature{
          background:rgba(255,255,255,.06);
          border:1px solid rgba(255,255,255,.08);
          border-radius:20px;
          padding:18px;
        }

        .cp-feature .icon{
          width:40px;
          height:40px;
          border-radius:14px;
          background:rgba(255,255,255,.1);
          display:grid;
          place-items:center;
          margin-bottom:12px;
        }

        .cp-feature h4{
          margin:0 0 8px;
          font-size:1.02rem;
        }

        .cp-feature p{
          margin:0;
          color:rgba(255,255,255,.78);
          line-height:1.6;
          font-size:.94rem;
        }

        @media (max-width: 1080px){
          .cp-hero,
          .cp-layout,
          .cp-features{
            grid-template-columns:1fr;
          }
          .cp-detail{
            position:static;
          }
        }

        @media (max-width: 760px){
          .courses-page{ padding:20px 14px 60px; }
          .cp-hero-left{ padding:22px; min-height:auto; }
          .cp-hero-right{ min-height:300px; }
          .cp-brief-grid,
          .cp-stats,
          .cp-features{
            grid-template-columns:1fr;
          }
          .cp-card-footer{
            flex-direction:row;
            justify-content:space-between;
            align-items:center;
          }
          .cp-toggle{
            width:100%;
          }
          .cp-toggle button{
            flex:1;
          }
        }
      `}</style>

      <div className="cp-container">
        <section className="cp-hero">
          <div className="cp-panel cp-hero-left">
            <div className="cp-badge">
              <Sparkles size={16} />
              DigiQlik Courses
            </div>

            <h1 className="cp-title">
              Digital marketing courses with <span>two clear price tiers</span>
            </h1>

            <p className="cp-subtitle">
              Choose from ₹1,999 Essential courses or ₹4,999 Professional tracks. All programs include live classes, free trial, study material, certificate, and practical projects. Designed to help you pick the exact level you need.
            </p>

            <div className="cp-actions">
              <a href="#course-list" className="cp-btn">
                Explore Courses
                <ArrowRight size={18} />
              </a>
              <a href="#detail-panel" className="cp-btn-secondary">
                View Detailed Panel
              </a>
            </div>
          </div>

          <div className="cp-panel cp-hero-right">
            <div className="cp-overlay">
              <div className="cp-stats">
                <div className="cp-stat">
                  <strong>Free Trial</strong>
                  <span>Start with a trial class before you join.</span>
                </div>
                <div className="cp-stat">
                  <strong>Live Learning</strong>
                  <span>No recorded lectures, only live teaching.</span>
                </div>
                <div className="cp-stat">
                  <strong>Certificate</strong>
                  <span>Study material and certificate included.</span>
                </div>
                <div className="cp-stat">
                  <strong>2 Price Points</strong>
                  <span>₹1,999 & ₹4,999 — clear & affordable.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="cp-toolbar" id="course-list">
          <div>
            <h2>Choose your view</h2>
            <p>
              Brief view for quick scanning. Detailed view for full curriculum and outcome.
            </p>
          </div>

          <div className="cp-toggle" role="tablist" aria-label="Course view toggle">
            <button
              type="button"
              className={view === "brief" ? "active" : ""}
              onClick={() => setView("brief")}
            >
              Brief
            </button>
            <button
              type="button"
              className={view === "detailed" ? "active" : ""}
              onClick={() => setView("detailed")}
            >
              Detailed
            </button>
          </div>
        </div>

        {view === "brief" ? (
          <div className="cp-brief-grid">
            {courseData.map((course) => {
              const Icon = course.icon;
              return (
                <article className="cp-card" key={course.id}>
                  <div
                    className="cp-card-img"
                    style={{ backgroundImage: `url(${course.imageUrl})` }}
                  />
                  <div className="cp-card-body">
                    <div className="cp-card-top">
                      <div className="cp-icon">
                        <Icon size={22} />
                      </div>
                      <div>
                        <h3>{course.title}</h3>
                        <div className="cp-meta">
                          <span className="cp-pill">{course.price}</span>
                          <span className="cp-pill cp-price-tier">{course.priceTier}</span>
                          <span className="cp-pill">{course.duration}</span>
                        </div>
                      </div>
                    </div>

                    <p className="cp-short">{course.short}</p>

                    <ul className="cp-bullets">
                      {course.topics.map((topic) => (
                        <li key={topic}>
                          <BadgeCheck size={16} />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="cp-card-footer">
                      <div className="cp-price">
                        <strong>{course.price}</strong>
                        <span>{course.mode}</span>
                      </div>
                      <button
                        type="button"
                        className="cp-link"
                        onClick={() => {
                          setActiveId(course.id);
                          setView("detailed");
                        }}
                      >
                        Open detailed view <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="cp-layout">
            <div className="cp-brief-grid">
              {courseData.map((course) => {
                const Icon = course.icon;
                const active = activeId === course.id;

                return (
                  <article
                    key={course.id}
                    className="cp-card"
                    onClick={() => setActiveId(course.id)}
                    style={{
                      cursor: "pointer",
                      outline: active ? "2px solid #E4403B" : "none",
                    }}
                  >
                    <div
                      className="cp-card-img"
                      style={{ backgroundImage: `url(${course.imageUrl})` }}
                    />
                    <div className="cp-card-body">
                      <div className="cp-card-top">
                        <div className="cp-icon">
                          <Icon size={22} />
                        </div>
                        <div>
                          <h3>{course.title}</h3>
                          <div className="cp-meta">
                            <span className="cp-pill">{course.price}</span>
                            <span className="cp-pill cp-price-tier">{course.priceTier}</span>
                          </div>
                        </div>
                      </div>
                      <p className="cp-short">{course.short}</p>
                    </div>
                  </article>
                );
              })}
            </div>

            <aside className="cp-panel cp-detail" id="detail-panel">
              <div className="cp-detail-head">
                <div className="cp-icon">
                  <ActiveIcon size={22} />
                </div>
                <div>
                  <h3>{activeCourse.title}</h3>
                  <p>
                    {activeCourse.short}
                    <br />
                    <strong>Price:</strong> {activeCourse.price} &nbsp;|&nbsp;
                    <strong>Duration:</strong> {activeCourse.duration} &nbsp;|&nbsp;
                    <strong>Mode:</strong> {activeCourse.mode} &nbsp;|&nbsp;
                    <strong>Tier:</strong> {activeCourse.priceTier}
                  </p>
                </div>
              </div>

              <div className="cp-detail-body">
                <div className="cp-section-box">
                  <h4>Course outcome</h4>
                  <p>{activeCourse.outcome}</p>
                </div>

                <div className="cp-section-box">
                  <h4>What you will learn</h4>
                  <ul className="cp-list">
                    {activeCourse.curriculum.map((item) => (
                      <li key={item}>
                        <CheckCircle2 size={16} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="cp-section-box">
                  <h4>Included in every course</h4>
                  <ul className="cp-list">
                    <li>
                      <Video size={16} />
                      <span>Live classes with mentor interaction</span>
                    </li>
                    <li>
                      <ShieldCheck size={16} />
                      <span>Free trial class before enrollment</span>
                    </li>
                    <li>
                      <BookOpen size={16} />
                      <span>Study material and assignments</span>
                    </li>
                    <li>
                      <GraduationCap size={16} />
                      <span>Certificate after completion</span>
                    </li>
                    <li>
                      <Clock3 size={16} />
                      <span>Crash, weekly, weekend, and monthly batch options</span>
                    </li>
                  </ul>
                </div>

                <div className="cp-section-box">
                  <h4>Why two price ranges?</h4>
                  <p>
                    <strong>₹1,999 (Essential):</strong> Perfect for beginners, core concepts & foundational skills.<br/>
                    <strong>₹4,999 (Professional):</strong> Advanced strategies, in-depth tools & career-ready expertise.<br/>
                    All courses include live instruction, assignments, certificate, and flexible batch options.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        )}

        <section className="cp-features">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div className="cp-feature" key={item.title}>
                <div className="icon">
                  <Icon size={20} />
                </div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            );
          })}
        </section>
      </div>
    </main>
  );
}