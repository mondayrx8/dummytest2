import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-section footer-brand-section">
            <div className="footer-brand">
              <span className="brand-icon">🚀</span>
              <span className="brand-text">DEPB</span>
            </div>
            <p className="footer-tagline">
              Empowering student entrepreneurs to showcase their innovative ventures to the world.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-section-title">Quick Links</h4>
            <div className="footer-links">
              <Link to="/dashboard" className="footer-link">Dashboard</Link>
              <Link to="/create" className="footer-link">Create Portfolio</Link>
              <Link to="/investors" className="footer-link">Explore Ventures</Link>
            </div>
          </div>

          {/* Resources */}
          <div className="footer-section">
            <h4 className="footer-section-title">Resources</h4>
            <div className="footer-links">
              <a href="#" className="footer-link">Documentation</a>
              <a href="#" className="footer-link">Support</a>
              <a href="#" className="footer-link">Contact Us</a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} DEPB. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <a href="#" className="footer-bottom-link">Privacy Policy</a>
            <span className="footer-divider">•</span>
            <a href="#" className="footer-bottom-link">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;