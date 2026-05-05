import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowRight, Target, Menu, X, Phone, LayoutDashboard } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import logoImage from "/logo.png";
import FreeAuditModal from "./FreeAuditModal";
import "./Header.css";

const NAV_LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/services", label: "Services" },
  { to: "/courses", label: "Courses" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Header = ({ onBookCall }) => {
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  /* ── Scroll detection ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Body scroll lock when drawer is open ── */
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  /* ── Close on ESC ── */
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handler = (e) => { if (e.key === "Escape") setIsMobileMenuOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isMobileMenuOpen]);

  /* ── Close on resize to desktop ── */
  useEffect(() => {
    const handler = () => { if (window.innerWidth > 900) setIsMobileMenuOpen(false); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  /* ── Close on route change + scroll to top ── */
  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const closeMobile = () => setIsMobileMenuOpen(false);

  /* ── Portal: render overlay + drawer directly into body ──
     This bypasses the header's stacking context (z-index: 100)
     so the drawer can truly sit on top of everything.         */
  const mobilePortal = createPortal(
    <>
      {/* Backdrop */}
      <div
        className={`header-mobile-overlay${isMobileMenuOpen ? " open" : ""}`}
        onClick={closeMobile}
        aria-hidden="true"
      />

      {/* Slide-in drawer */}
      <nav
        className={`header-mobile-drawer${isMobileMenuOpen ? " open" : ""}`}
        aria-hidden={!isMobileMenuOpen}
        aria-label="Mobile navigation"
      >
        {/* Close button inside drawer */}
        <button
          className="header-drawer-close"
          aria-label="Close menu"
          onClick={closeMobile}
        >
          <X size={22} />
        </button>

        <ul className="header-mobile-nav-list">
          {NAV_LINKS.map(({ to, label, end }) => (
            <li key={to}>
              <NavLink to={to} end={end || undefined} onClick={closeMobile}>
                {label}
              </NavLink>
            </li>
          ))}
          {user && (
            <li>
              <NavLink to="/courses/student-dashboard" onClick={closeMobile} className="mobile-dashboard-link">
                <LayoutDashboard size={20} /> Dashboard
              </NavLink>
            </li>
          )}
        </ul>

        <div className="header-mobile-actions">
          <button
            className="header-btn header-btn-outline header-btn-full"
            onClick={() => { setIsAuditModalOpen(true); closeMobile(); }}
          >
            <Target size={16} /> Free Audit
          </button>
          <button
            className="header-btn header-btn-primary header-btn-full"
            onClick={() => { onBookCall?.(); closeMobile(); }}
          >
            <Phone size={16} /> Book a Call
          </button>
          <Link
            to="/contact"
            className="header-btn header-btn-primary header-btn-full"
            onClick={closeMobile}
          >
            Get Started <ArrowRight size={16} />
          </Link>
        </div>
      </nav>
    </>,
    document.body
  );

  return (
    <>
      <header className={`header${scrolled ? " scrolled" : ""}`}>
        <div className="header-inner">

          {/* Logo */}
          <Link to="/" className="header-logo">
            <img src={logoImage} alt="DigiQlik" />
          </Link>

          {/* Desktop navigation */}
          <nav className="header-nav" aria-label="Main navigation">
            <ul className="header-nav-list">
              {NAV_LINKS.map(({ to, label, end }) => (
                <li key={to}>
                  <NavLink to={to} end={end || undefined}>{label}</NavLink>
                </li>
              ))}
              {user && (
                <li>
                  <NavLink to="/courses/student-dashboard" className="header-dashboard-link">
                    <LayoutDashboard size={14} /> Dashboard
                  </NavLink>
                </li>
              )}
            </ul>
          </nav>

          {/* Desktop CTAs */}
          <div className="header-actions">
            <button
              className="header-btn header-btn-outline"
              onClick={() => setIsAuditModalOpen(true)}
            >
              <Target size={14} />
              Free Audit
            </button>
            <button
              className="header-btn header-btn-primary"
              onClick={onBookCall}
            >
              Book a Call
              <Phone size={14} />
            </button>
          </div>

          {/* Hamburger (visible on mobile only) */}
          <button
            className="header-hamburger"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((p) => !p)}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile drawer via portal — escapes header stacking context */}
      {mobilePortal}

      <FreeAuditModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
      />
    </>
  );
};

export default Header;
