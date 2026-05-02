import React from 'react';
import { AreaChart, Code, PenTool, Video, Home, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: <AreaChart size={28} />,
    image:
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=500',
    title: 'Digital Marketing & Performance Marketing',
    description:
      'Accelerate your business growth with data-driven marketing strategies. We create targeted campaigns, optimize performance, and maximize ROI across digital platforms.',
  },
  {
    icon: <Code size={28} />,
    image: 'webdev.jpg',
    title: 'Web Development',
    description:
      'Build fast, responsive, and scalable websites with cutting-edge technologies and modern frameworks.',
  },
  {
    icon: <PenTool size={28} />,
    image: 'graphic.jpg',
    title: 'Graphic Design',
    description:
      'Create stunning visual identities that capture attention and communicate your brand message effectively.',
  },
  {
    icon: <Video size={28} />,
    image: 'videoproduction.jpg',
    title: 'Video Production',
    description:
      'Produce high-quality video content that engages your audience and tells your story compellingly.',
  },
  {
    icon: <Home size={28} />,
    image: 'seo.jpg',
    title: 'SEO',
    description:
      'Rank higher, grow faster. We use smart SEO techniques to boost your visibility, bring in organic traffic, and help your business stand out online.',
  },
  {
    icon: <Home size={28} />,
    image: 'appdevelopment.jpg',
    title: 'App Development',
    description:
      'Build powerful, scalable mobile applications tailored to your business needs. We design and develop high-performance Android and iOS apps with seamless user experiences, modern UI, and robust backend integration to help your brand grow in the mobile-first world.',
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="faq-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Our Services</span>
          <h2 className="section-title">What We Do Best</h2>
          <p className="section-subtitle">
            Comprehensive digital solutions to elevate your brand and drive results
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <article className="service-card" key={index}>
              <div className="service-image-wrapper">
                <img src={service.image} alt={service.title} className="service-image" />
                <div className="service-overlay" />
              </div>

              <div className="service-content">
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.description}</p>

                <a href="#contact" className="service-link">
                  Learn More <ArrowRight size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        /* ── SERVICES GRID — Clean Light Section ────────────── */
        .faq-section {
          padding: clamp(4rem, 6vw, 6rem) 1rem;
          background: #F8F5F4;
          color: #1E293B;
          font-family: Inter, system-ui, -apple-system, "Segoe UI", sans-serif;
          position: relative;
          overflow: hidden;
        }

        .faq-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 0%, rgba(228,64,59,0.07) 0%, transparent 65%);
          pointer-events: none;
        }

        .faq-section .container {
          max-width: 1240px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .faq-section .section-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .faq-section .section-tag {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.35rem 1.1rem;
          border-radius: 999px;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #E4403B;
          border: 1px solid rgba(228, 64, 59, 0.3);
          background: rgba(228, 64, 59, 0.08);
          margin-bottom: 1rem;
        }

        .faq-section .section-title {
          margin: 0;
          font-size: clamp(2rem, 4vw, 3rem);
          line-height: 1.1;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #111111;
        }

        .faq-section .section-subtitle {
          max-width: 720px;
          margin: 0.9rem auto 0;
          font-size: 1rem;
          line-height: 1.7;
          color: #64748B;
        }

        .faq-section .services-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1.5rem;
        }

        .faq-section .service-card {
          overflow: hidden;
          border-radius: 22px;
          background: #FFFFFF;
          border: 1px solid rgba(0,0,0,0.07);
          box-shadow: 0 4px 24px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04);
          transition: all 0.28s ease;
          display: flex;
          flex-direction: column;
          min-height: 100%;
        }

        .faq-section .service-card:hover {
          transform: translateY(-6px);
          border-color: rgba(228, 64, 59, 0.22);
          box-shadow: 0 20px 44px -12px rgba(228,64,59,0.18), 0 4px 16px rgba(0,0,0,0.08);
        }

        .faq-section .service-image-wrapper {
          position: relative;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background: #f1f5f9;
        }

        .faq-section .service-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1.01);
          transition: transform 0.5s ease;
        }

        .faq-section .service-card:hover .service-image {
          transform: scale(1.06);
        }

        .faq-section .service-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(0,0,0,0.01) 0%,
            rgba(0,0,0,0.12) 50%,
            rgba(0,0,0,0.32) 100%
          );
          pointer-events: none;
        }

        .faq-section .service-content {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          padding: 1.5rem;
          flex: 1;
        }

        .faq-section .service-icon {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #ffeceb, #ffe0de);
          color: #E4403B;
          border: 1px solid rgba(228, 64, 59, 0.15);
          flex-shrink: 0;
          position: static;
        }

        .faq-section .service-title {
          margin: 0;
          font-size: 1.08rem;
          line-height: 1.35;
          font-weight: 700;
          color: #111111;
          letter-spacing: -0.01em;
        }

        .faq-section .service-desc {
          margin: 0;
          font-size: 0.93rem;
          line-height: 1.7;
          color: #64748B;
          flex: 1;
        }

        .faq-section .service-link {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          width: fit-content;
          margin-top: 0.2rem;
          color: #E4403B;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 700;
          transition: color 0.2s ease, gap 0.2s ease;
        }

        .faq-section .service-link:hover {
          color: #c0392b;
          gap: 0.65rem;
        }

        .faq-section .service-link svg {
          transition: transform 0.2s ease;
        }

        .faq-section .service-link:hover svg {
          transform: translateX(3px);
        }

        @media (max-width: 1024px) {
          .faq-section .services-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 640px) {
          .faq-section {
            padding: 3rem 0.9rem;
          }
          .faq-section .services-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .faq-section .section-subtitle {
            font-size: 0.95rem;
          }
          .faq-section .service-content {
            padding: 1.2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default FAQ;