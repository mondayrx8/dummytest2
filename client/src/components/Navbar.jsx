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
                    <span className="brand-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                    </span>
                    <span className="brand-text">SiswaNiaga</span>
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
                                <span className="nav-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                                </span>
                                <span>Explore Ventures</span>
                            </Link>
                            <Link
                                to="/login"
                                className="nav-btn primary"
                                onClick={closeMobileMenu}
                            >
                                <span className="nav-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                </span>
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
                                <span className="nav-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                                </span>
                                <span>Dashboard</span>
                            </Link>
                            <Link
                                to="/create"
                                className={`nav-btn accent ${isActive('/create') ? 'active' : ''}`}
                                onClick={closeMobileMenu}
                            >
                                <span className="nav-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
                                </span>
                                <span>Create Portfolio</span>
                            </Link>
                            <Link
                                to="/investors"
                                className={`nav-link ${isActive('/investors') ? 'active' : ''}`}
                                onClick={closeMobileMenu}
                            >
                                <span className="nav-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                </span>
                                <span>Preview</span>
                            </Link>
                            <Link
                                to="/profile"
                                className={`nav-link ${isActive('/profile') ? 'active' : ''}`}
                                onClick={closeMobileMenu}
                            >
                                <span className="nav-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                                </span>
                                <span>Settings</span>
                            </Link>

                            {/* User Info & Logout */}
                            <div className="nav-user-section">
                                <div className="user-badge">
                                    <span className="user-avatar">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                    </span>
                                    <span className="user-name">{getUsername()}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="nav-btn logout"
                                >
                                    <span className="nav-icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                                    </span>
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