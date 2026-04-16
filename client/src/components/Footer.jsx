import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="enterprise-footer">
      <div className="footer-container">
        <div className="enterprise-footer-grid">
          
          {/* Section 1: Brand Name & Tagline */}
          <div className="footer-section">
            <div className="footer-brand">
              <svg className="footer-logo" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              <h2>SiswaNiaga</h2>
            </div>
            <p className="enterprise-footer-tagline">
              Empowering University Entrepreneurs to build their business empires starting from campus.
            </p>
          </div>

          {/* Section 2: Quick Links */}
          <div className="footer-section">
            <h3 className="enterprise-footer-heading">Quick Links</h3>
            <ul className="enterprise-footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="#about">About Us</Link></li>
              <li><Link to="#contact">Contact</Link></li>
            </ul>
          </div>

          {/* Section 3: Legal & Copyright */ }
          <div className="footer-section">
            <h3 className="enterprise-footer-heading">Legal</h3>
            <ul className="enterprise-footer-links">
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="enterprise-footer-bottom">
            <p className="enterprise-copyright">
              © {currentYear} SiswaNiaga. All rights reserved.
            </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;