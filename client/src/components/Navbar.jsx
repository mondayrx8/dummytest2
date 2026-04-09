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
        <nav className={`enterprise-navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                {/* Brand */}
                <Link to={user ? "/dashboard" : "/"} className="enterprise-brand" onClick={closeMobileMenu}>
                    <span className="enterprise-brand-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                    </span>
                    <span>SiswaNiaga</span>
                </Link>

                {/* Mobile Toggle */}
                <button
                    className={`enterprise-mobile-toggle ${mobileMenuOpen ? 'active' : ''}`}
                    onClick={toggleMobileMenu}
                    aria-label="Toggle navigation menu"
                    aria-expanded={mobileMenuOpen}
                >
                    <span className="toggle-line"></span>
                    <span className="toggle-line"></span>
                    <span className="toggle-line"></span>
                </button>

                {/* Navigation Links */}
                <div className={`enterprise-nav-menu ${mobileMenuOpen ? 'open' : 'enterprise-desktop-menu'}`}>
                    {!user ? (
                        /* Guest Navigation */
                        <>
                            <Link
                                to="/investors"
                                className={`enterprise-nav-link ${isActive('/investors') ? 'active' : ''}`}
                                onClick={closeMobileMenu}
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                                <span>Explore Ventures</span>
                            </Link>
                            <Link
                                to="/login"
                                className="enterprise-nav-btn primary"
                                onClick={closeMobileMenu}
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                <span>Student Login</span>
                            </Link>
                        </>
                    ) : (
                        /* Authenticated Navigation */
                        <>
                            <Link
                                to="/dashboard"
                                className={`enterprise-nav-link ${isActive('/dashboard') ? 'active' : ''}`}
                                onClick={closeMobileMenu}
                            >
                                <span>Dashboard</span>
                            </Link>
                            <Link
                                to="/create"
                                className={`enterprise-nav-link ${isActive('/create') ? 'active' : ''}`}
                                onClick={closeMobileMenu}
                            >
                                <span>Create Pitch</span>
                            </Link>
                            <Link
                                to="/investors"
                                className={`enterprise-nav-link ${isActive('/investors') ? 'active' : ''}`}
                                onClick={closeMobileMenu}
                            >
                                <span>Preview Public View</span>
                            </Link>

                            {/* User Info & Logout */}
                            <div className="enterprise-user-section">
                                <div className="enterprise-user-badge">
                                    <span className="enterprise-user-avatar">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                    </span>
                                    <span>{getUsername()}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="enterprise-nav-btn secondary"
                                >
                                    <span>Logout</span>
                                </button>
                            </div>
                        </>
                    )}
                </div>

                {/* Mobile Menu Overlay */}
                {mobileMenuOpen && (
                    <div className="enterprise-mobile-overlay" onClick={closeMobileMenu}></div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;