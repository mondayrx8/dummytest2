import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ user, setToken }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect for navbar
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('token');
            setToken(null);
            navigate('/');
            setMobileMenuOpen(false);
        }
    };

    const isActive = (path) => location.pathname === path;
    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
    const closeMobileMenu = () => setMobileMenuOpen(false);

    // Get username from token (simple decode)
    const getUsername = () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const payload = JSON.parse(atob(token.split('.')[1]));
                return payload.username || 'User';
            }
        } catch {
            return 'User';
        }
        return 'User';
    };

    return (
        <nav className={`glass-navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-inner">
                {/* Brand */}
                <Link to={user ? "/dashboard" : "/"} className="navbar-brand" onClick={closeMobileMenu}>
                    <span className="brand-icon">🚀</span>
                    <span className="brand-text">DEPB</span>
                </Link>

                {/* Mobile Toggle */}
                <button
                    className={`mobile-toggle ${mobileMenuOpen ? 'active' : ''}`}
                    onClick={toggleMobileMenu}
                    aria-label="Toggle navigation menu"
                    aria-expanded={mobileMenuOpen}
                >
                    <span className="toggle-bar"></span>
                    <span className="toggle-bar"></span>
                    <span className="toggle-bar"></span>
                </button>

                {/* Navigation Links */}
                <div className={`navbar-menu ${mobileMenuOpen ? 'open' : ''}`}>
                    {!user ? (
                        /* Guest Navigation */
                        <>
                            <Link
                                to="/investors"
                                className={`nav-link ${isActive('/investors') ? 'active' : ''}`}
                                onClick={closeMobileMenu}
                            >
                                <span className="nav-icon">🌐</span>
                                <span>Explore Ventures</span>
                            </Link>
                            <Link
                                to="/login"
                                className="nav-btn primary"
                                onClick={closeMobileMenu}
                            >
                                <span className="nav-icon">👤</span>
                                <span>Student Login</span>
                            </Link>
                        </>
                    ) : (
                        /* Authenticated Navigation */
                        <>
                            <Link
                                to="/dashboard"
                                className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
                                onClick={closeMobileMenu}
                            >
                                <span className="nav-icon">📊</span>
                                <span>Dashboard</span>
                            </Link>
                            <Link
                                to="/create"
                                className={`nav-btn accent ${isActive('/create') ? 'active' : ''}`}
                                onClick={closeMobileMenu}
                            >
                                <span className="nav-icon">✨</span>
                                <span>Create Portfolio</span>
                            </Link>
                            <Link
                                to="/investors"
                                className={`nav-link ${isActive('/investors') ? 'active' : ''}`}
                                onClick={closeMobileMenu}
                            >
                                <span className="nav-icon">👀</span>
                                <span>Preview</span>
                            </Link>

                            {/* User Info & Logout */}
                            <div className="nav-user-section">
                                <div className="user-badge">
                                    <span className="user-avatar">👋</span>
                                    <span className="user-name">{getUsername()}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="nav-btn logout"
                                >
                                    <span className="nav-icon">🚪</span>
                                    <span>Logout</span>
                                </button>
                            </div>
                        </>
                    )}
                </div>

                {/* Mobile Menu Overlay */}
                {mobileMenuOpen && (
                    <div className="mobile-overlay" onClick={closeMobileMenu}></div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;