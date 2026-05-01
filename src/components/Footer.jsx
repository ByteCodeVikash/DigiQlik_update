import React from 'react';
import { Phone, MapPin, ExternalLink, Mail } from 'lucide-react';
import { FacebookIcon, InstagramIcon, WhatsAppIcon, MailIcon } from './ColorIcons';
import './Footer.css';

import logoVideo from '../assets/logo_video.mp4';

const LOGO_VIDEO_SRC = logoVideo;

const Footer = () => {
  const address = "B-37, Sector 62, Noida, Uttar Pradesh - 201301";
  const phoneNumber = "+91 9217644096";
  const email = "digiqlik@info.com";

  const socialLinks = [
    { name: "Facebook", icon: FacebookIcon, url: "https://www.facebook.com/share/1DTzzFGtj6/?mibextid=wwXIfr" },
    { name: "Instagram", icon: InstagramIcon, url: "https://www.instagram.com/digiqlikmedia?igsh=MTZ3ZjYzamRrc2ZrcA==" },
    { name: "WhatsApp", icon: WhatsAppIcon, url: "https://wa.me/9217644096" },
    { name: "Gmail", icon: MailIcon, url: "mailto:digiqlik@info.com" }
  ];

  return (
    <>
      <a
        href="https://wa.me/9217644096?text=Hi%20DigiQlik%2C%20I%20need%20assistance!"
        className="sticky-whatsapp"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="wa-svg-exact">
          <path
            fill="currentColor"
            d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
          />
        </svg>
        <span className="whatsapp-tooltip">Chat with us</span>
      </a>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="/" className="logo footer-logo" aria-label="DigiQlik home">
                <div className="logo-video-container">
                  <video
                    className="footer-logo-video"
                    src={LOGO_VIDEO_SRC}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                  />
                </div>
              </a>

              <p className="footer-desc">
                Transforming businesses through innovative digital solutions. We bring your vision to life with creativity, expertise, and passion.
              </p>

              <div className="contact-details">
                <div className="contact-item">
                  <MapPin size={18} />
                  <span>{address}</span>
                </div>
                <div className="contact-item">
                  <Phone size={18} />
                  <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
                </div>
                <div className="contact-item">
                  <Mail size={18} />
                  <a href={`mailto:${email}`}>{email}</a>
                </div>
              </div>

              <div className="social-links">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="social-icon"
                  >
                    <social.icon size={36} className="color-icon" />
                  </a>
                ))}
              </div>
            </div>

            <div className="footer-links-group">
              <h4 className="footer-heading">Services</h4>
              <ul className="footer-links">
                <li><a href="#services">Digital Marketing</a></li>
                <li><a href="#services">Web Development</a></li>
                <li><a href="#services">Graphic Design</a></li>
                <li><a href="#services">Video Production</a></li>
                <li><a href="#services">Real Estate Marketing</a></li>
              </ul>
            </div>

            <div className="footer-links-group">
              <h4 className="footer-heading">Company</h4>
              <ul className="footer-links">
                <li><a href="#about">About Us</a></li>
                <li><a href="#careers">Careers</a></li>
                <li><a href="#blog">Blog</a></li>
                <li><a href="#cases">Team</a></li>
              </ul>
            </div>

            <div className="footer-links-group">
              <h4 className="footer-heading">Support</h4>
              <ul className="footer-links">
                <li><a href="#help">Help Center</a></li>
                <li><a href="#contact">Contact Us</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#terms">Terms of Service</a></li>
                <li><a href="#privacy">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} DigiQlik. All rights reserved.</p>
            <p className="footer-credit">
              Developed by{' '}
              <a
                href="https://shivam-portfolio-pandey.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="developer-link"
              >
                Shivam Pandey <ExternalLink size={14} />
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Styles loaded via Footer.css import — inline block removed
        .footer {
          background: linear-gradient(135deg, #030303 0%, #060607 100%);
          color: #E2E8F0;
          padding: 4rem 0 1.5rem;
          margin-top: 4rem;
          border-top: 1px solid rgba(59, 130, 246, 0.2);
          overflow-x: hidden;
          width: 100%;
        }

        .footer .container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr;
          gap: 2.5rem;
          margin-bottom: 3rem;
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .footer-logo {
          display: block;
        }

        .logo-video-container {
          background: rgba(59, 130, 246, 0.1);
          border-radius: 12px;
          padding: 4px;
          display: block;
          width: 100%;
          max-width: 280px;
          border: 1px solid rgba(59, 130, 246, 0.3);
          transition: all 0.3s ease;
          box-sizing: border-box;
        }

        .logo-video-container:hover {
          border-color: #3B82F6;
          background: rgba(59, 130, 246, 0.15);
        }

        .footer-logo-video {
          width: 100%;
          height: auto;
          object-fit: contain;
          display: block;
          border-radius: 8px;
          background: #000;
        }

        .footer-desc {
          color: #94A3B8;
          line-height: 1.6;
          font-size: 0.9rem;
          margin: 0;
        }

        .contact-details {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin: 0.5rem 0;
        }

        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          font-size: 0.9rem;
          color: #CBD5E1;
        }

        .contact-item svg {
          color: #3B82F6;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .contact-item a {
          color: #CBD5E1;
          text-decoration: none;
          transition: color 0.2s;
          word-break: break-word;
        }

        .contact-item a:hover {
          color: #60A5FA;
        }

        .social-links {
          display: flex;
          gap: 1rem;
          margin-top: 0.5rem;
          flex-wrap: wrap;
        }

        .social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .social-icon:hover {
          transform: translateY(-4px) scale(1.1);
          filter: drop-shadow(0 8px 12px rgba(255, 255, 255, 0.15));
        }

        .footer-links-group {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .footer-heading {
          color: white;
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0 0 0.5rem;
          position: relative;
          display: inline-block;
        }

        .footer-heading::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 0;
          width: 35px;
          height: 2px;
          background: #3B82F6;
          border-radius: 2px;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .footer-links li a {
          color: #94A3B8;
          text-decoration: none;
          transition: all 0.2s;
          font-size: 0.9rem;
          display: inline-block;
        }

        .footer-links li a:hover {
          color: #60A5FA;
          transform: translateX(4px);
        }

        .footer-bottom {
          border-top: 1px solid rgba(148, 163, 184, 0.2);
          padding-top: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          font-size: 0.85rem;
          color: #94A3B8;
        }

        .footer-credit {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .developer-link {
          color: #60A5FA;
          text-decoration: none;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          transition: color 0.2s;
        }

        .developer-link:hover {
          color: #93C5FD;
          text-decoration: underline;
        }

        .sticky-whatsapp {
          position: fixed;
          bottom: 96px;
          right: 24px;
          top: auto;
          z-index: 999990;
          background-color: #25D366;
          color: white;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 16px rgba(37, 211, 102, 0.45);
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          text-decoration: none;
          cursor: pointer;
          border: 2px solid rgba(255,255,255,0.15);
          -webkit-tap-highlight-color: transparent;
        }

        .wa-svg-exact {
          width: 32px;
          height: 32px;
          display: block;
          flex-shrink: 0;
        }

        .sticky-whatsapp::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          border-radius: 50%;
          border: 2px solid #25D366;
          animation: wa-pulse 2s infinite ease-out;
          z-index: -1;
        }

        @keyframes wa-pulse {
          0%   { transform: scale(1);   opacity: 0.8; }
          100% { transform: scale(1.5); opacity: 0;   border-width: 0; }
        }

        .sticky-whatsapp:hover {
          transform: scale(1.1) translateY(-4px);
          background-color: #20B859;
          box-shadow: 0 12px 24px rgba(37, 211, 102, 0.55);
        }

        .whatsapp-tooltip {
          position: absolute;
          right: calc(100% + 12px);
          top: 50%;
          transform: translateY(-50%) translateX(10px);
          background: #ffffff;
          color: #1F2937;
          padding: 8px 14px;
          border-radius: 12px;
          font-size: 0.85rem;
          white-space: nowrap;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          pointer-events: none;
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          border: 1px solid rgba(0,0,0,0.05);
        }

        .sticky-whatsapp:hover .whatsapp-tooltip {
          opacity: 1;
          visibility: visible;
          transform: translateY(-50%) translateX(0);
        }

        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
          }
        }

        @media (max-width: 768px) {
          .footer .container {
            padding: 0 1.25rem;
          }

          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }

          .social-links {
            justify-content: flex-start;
          }

          .footer-heading::after {
            width: 30px;
          }

          .logo-video-container {
            max-width: 240px;
          }

          .sticky-whatsapp {
            bottom: 90px;
            right: 16px;
            width: 50px;
            height: 50px;
          }

          .wa-svg-exact {
            width: 26px;
            height: 26px;
          }
        }

        @media (max-width: 480px) {
          .footer {
            padding: 2.5rem 0 1rem;
          }

          .sticky-whatsapp {
            bottom: 86px;
            right: 16px;
            width: 48px;
            height: 48px;
          }

          .wa-svg-exact {
            width: 24px;
            height: 24px;
          }

          .whatsapp-tooltip {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default Footer;