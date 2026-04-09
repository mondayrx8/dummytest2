import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ user, setToken }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

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

    return (
        <nav className={`enterprise-navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                {/* Left Section - Brand */}
                <div className="enterprise-navbar-left">
                    <Link to={user ? "/dashboard" : "/"} className="enterprise-brand" onClick={closeMobileMenu}>
                        <span className="enterprise-brand-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                        </span>
                        <span>SiswaNiaga</span>
                    </Link>
                </div>

                {/* Center Section - Precision Centered Links */}
                <div className="enterprise-navbar-center">
                    {!user ? (
                        <>
                            <Link to="/" className={`enterprise-nav-link-center ${isActive('/') ? 'active' : ''}`}>Home</Link>
                            <Link to="/investors" className={`enterprise-nav-link-center ${isActive('/investors') ? 'active' : ''}`}>Explore</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/dashboard" className={`enterprise-nav-link-center ${isActive('/dashboard') ? 'active' : ''}`}>Home</Link>
                        </>
                    )}
                </div>

                {/* Right Section - CTA and Auth */}
                <div className="enterprise-navbar-right">
                    {!user ? (
                        <>
                            <Link to="/login" className="enterprise-nav-link-ghost">Sign In</Link>
                            <Link to="/login" className="enterprise-nav-btn primary">Get Started</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/create" className="enterprise-nav-btn primary">+ New Portfolio</Link>
                            
                            {/* Profile & Logout Group */}
                            <div className="enterprise-user-section">
                                <span className="enterprise-user-avatar">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                </span>
                                <Link to="/profile" className="enterprise-profile-link">Profile</Link>
                                <button onClick={handleLogout} className="enterprise-logout-btn">Logout</button>
                            </div>
                        </>
                    )}
                </div>

                {/* Mobile Toggle Button (Visible only on mobile) */}
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

                {/* Mobile Menu Structure */}
                <div className={`enterprise-nav-menu-mobile ${mobileMenuOpen ? 'open' : ''}`}>
                    {!user ? (
                        <>
                            <Link to="/" className="mobile-nav-link" onClick={closeMobileMenu}>Home</Link>
                            <Link to="/investors" className="mobile-nav-link" onClick={closeMobileMenu}>Explore</Link>
                            <Link to="/login" className="mobile-nav-link" onClick={closeMobileMenu}>Sign In</Link>
                            <Link to="/login" className="enterprise-nav-btn primary" onClick={closeMobileMenu}>Get Started</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/dashboard" className="mobile-nav-link" onClick={closeMobileMenu}>Home</Link>
                            <Link to="/create" className="enterprise-nav-btn primary" onClick={closeMobileMenu}>+ New Portfolio</Link>
                            
                            <div className="mobile-user-section">
                                <Link to="/profile" className="mobile-nav-link" onClick={closeMobileMenu}>Profile</Link>
                                <button onClick={handleLogout} className="mobile-nav-link" style={{ textAlign: 'left', background: 'none', border: 'none', borderBottom: '1px solid var(--border-color)', cursor: 'pointer', fontFamily: 'inherit' }}>Logout</button>
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