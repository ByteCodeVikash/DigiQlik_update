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
        .faq-section {
          padding: clamp(3rem, 5vw, 5rem) 1rem;
          background:
            radial-gradient(circle at top, rgba(79,70,229,0.14), transparent 32%),
            linear-gradient(180deg, #0b1020 0%, #070d1a 100%);
          color: #e2e8f0;
          font-family: Inter, system-ui, -apple-system, "Segoe UI", sans-serif;
        }

        .faq-section .container {
          max-width: 1240px;
          margin: 0 auto;
        }

        .faq-section .section-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .faq-section .section-tag {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.35rem 1rem;
          border-radius: 999px;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #c4b5fd;
          border: 1px solid rgba(129,140,248,0.25);
          background: rgba(99,102,241,0.12);
          margin-bottom: 1rem;
        }

        .faq-section .section-title {
          margin: 0;
          font-size: clamp(2rem, 4vw, 3rem);
          line-height: 1.1;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #f8fafc;
        }

        .faq-section .section-subtitle {
          max-width: 720px;
          margin: 0.9rem auto 0;
          font-size: 1rem;
          line-height: 1.7;
          color: #94a3b8;
        }

        .faq-section .services-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1.25rem;
        }

        .faq-section .service-card {
          overflow: hidden;
          border-radius: 22px;
          background: rgba(15,23,42,0.72);
          border: 1px solid rgba(99,102,241,0.14);
          box-shadow: 0 10px 30px -14px rgba(0,0,0,0.5);
          backdrop-filter: blur(12px);
          transition: transform 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease;
          display: flex;
          flex-direction: column;
          min-height: 100%;
          border-top: none;
        }

        .faq-section .service-card:hover {
          transform: translateY(-6px);
          border-color: rgba(129,140,248,0.35);
          box-shadow: 0 22px 44px -18px rgba(0,0,0,0.65);
          border-top-color: transparent;
        }

        .faq-section .service-image-wrapper {
          position: relative;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background: #0b1120;
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
            rgba(2,6,23,0.02) 0%,
            rgba(2,6,23,0.18) 45%,
            rgba(2,6,23,0.4) 100%
          );
          pointer-events: none;
        }

        .faq-section .service-content {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          padding: 1.35rem;
          flex: 1;
        }

        .faq-section .service-icon {
          width: 54px;
          height: 54px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(79,70,229,0.2), rgba(124,58,237,0.2));
          color: #c4b5fd;
          border: 1px solid rgba(129,140,248,0.18);
          flex-shrink: 0;
          margin-bottom: 0;
          margin-top: 0;
          position: static;
        }

        .faq-section .service-title {
          margin: 0;
          font-size: 1.1rem;
          line-height: 1.35;
          font-weight: 700;
          color: #f8fafc;
          letter-spacing: -0.01em;
        }

        .faq-section .service-desc {
          margin: 0;
          font-size: 0.95rem;
          line-height: 1.7;
          color: #94a3b8;
          flex: 1;
        }

        .faq-section .service-link {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          width: fit-content;
          margin-top: 0.2rem;
          color: #a5b4fc;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 700;
          transition: color 0.2s ease, transform 0.2s ease;
        }

        .faq-section .service-link:hover {
          color: #ddd6fe;
          transform: translateX(2px);
        }

        .faq-section .service-link svg {
          transition: transform 0.2s ease;
        }

        .faq-section .service-link:hover svg {
          transform: translateX(2px);
        }

        @media (max-width: 1024px) {
          .faq-section .services-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 640px) {
          .faq-section {
            padding: 2.5rem 0.9rem;
          }

          .faq-section .services-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .faq-section .section-subtitle {
            font-size: 0.95rem;
          }

          .faq-section .service-content {
            padding: 1.15rem;
          }
        }
      `}</style>
    </section>
  );
};

export default FAQ;