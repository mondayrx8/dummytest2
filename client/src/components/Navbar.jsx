import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ setToken }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('token');
            setToken(null);
            navigate('/');
        }
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <nav className="professional-navbar">
            <div className="navbar-container">
                <Link to="/dashboard" className="navbar-brand-link">
                    <span className="navbar-brand-icon">🚀</span>
                    <h2 className="navbar-brand">Entrepreneur Portfolio</h2>
                </Link>

                {/* Mobile Menu Toggle */}
                <button
                    className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                >
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                </button>

                {/* Desktop & Mobile Navigation */}
                <div className={`navbar-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                    <Link
                        to="/dashboard"
                        className={`navbar-link ${isActive('/dashboard') ? 'active' : ''}`}
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <span className="link-icon">📚</span>
                        <span className="link-text">Portfolios</span>
                    </Link>
                    <Link
                        to="/create"
                        className={`navbar-link-create ${isActive('/create') ? 'active' : ''}`}
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <span className="link-icon">✨</span>
                        <span className="link-text">Create New</span>
                    </Link>
                    <Link
                        to="/investors"
                        className={`navbar-link ${isActive('/investors') ? 'active' : ''}`}
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <span className="link-icon">👀</span>
                        <span className="link-text">Public View</span>
                    </Link>
                    <button
                        onClick={() => {
                            handleLogout();
                            setMobileMenuOpen(false);
                        }}
                        className="navbar-btn-logout"
                    >
                        <span className="link-icon">🚪</span>
                        <span className="link-text">Logout</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;