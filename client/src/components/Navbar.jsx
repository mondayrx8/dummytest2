import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ user, setToken }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle click outside for dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('token');
            setToken(null);
            navigate('/');
            setMobileMenuOpen(false);
            setIsDropdownOpen(false);
        }
    };

    const isActive = (path) => location.pathname === path;
    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
        setIsDropdownOpen(false);
    };

    // Get username from token
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
                {/* Left Section - Brand */}
                <div className="enterprise-navbar-left">
                    <Link to={user ? "/dashboard" : "/"} className="enterprise-brand" onClick={closeMobileMenu}>
                        <span className="enterprise-brand-icon">
                            <img
                                src="/favicon-siswa-bg.png"
                                alt="SiswaNiaga Logo"
                                style={{ width: '82px', height: '82px', objectFit: 'contain' }}
                            />
                        </span>
                        <span>SiswaNiaga</span>
                    </Link>
                </div>

                {/* Right Section */}
                <div className="enterprise-navbar-right">
                    {!user ? (
                        <>
                            <Link to="/" className={`enterprise-nav-link ${isActive('/') ? 'active' : ''}`}>Home</Link>
                            <Link to="/investors" className={`enterprise-nav-link ${isActive('/investors') ? 'active' : ''}`}>Explore</Link>
                            <Link to="/login" className="enterprise-nav-btn primary">Sign In</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/dashboard" className={`enterprise-nav-link ${isActive('/dashboard') ? 'active' : ''}`}>Dashboard</Link>
                            <Link to="/investors" className={`enterprise-nav-link ${isActive('/investors') ? 'active' : ''}`}>Explore</Link>

                            {/* Profile Dropdown Component */}
                            <div className="enterprise-user-dropdown-container" ref={dropdownRef}>
                                <button
                                    className="enterprise-user-trigger"
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                >
                                    <span className="enterprise-user-avatar">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                    </span>
                                    <span>{getUsername()}</span>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {isDropdownOpen && (
                                    <div className="enterprise-dropdown-menu">
                                        <Link to="/profile" className="enterprise-dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                            Profile
                                        </Link>
                                        <div className="enterprise-dropdown-divider"></div>
                                        <button onClick={handleLogout} className="enterprise-dropdown-item danger">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                            Logout
                                        </button>
                                    </div>
                                )}
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
                            <Link to="/login" className="enterprise-nav-btn primary" onClick={closeMobileMenu}>Sign In</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/dashboard" className="mobile-nav-link" onClick={closeMobileMenu}>Dashboard</Link>
                            <Link to="/investors" className="mobile-nav-link" onClick={closeMobileMenu}>Explore</Link>

                            <div className="mobile-user-section">
                                <span className="mobile-nav-link" style={{ color: 'var(--text-muted)' }}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                    {getUsername()}
                                </span>
                                <Link to="/profile" className="mobile-nav-link" style={{ paddingLeft: '2.5rem' }} onClick={closeMobileMenu}>Profile</Link>
                                <button onClick={handleLogout} className="mobile-nav-link" style={{ textAlign: 'left', background: 'none', border: 'none', borderBottom: '1px solid var(--border-color)', cursor: 'pointer', fontFamily: 'inherit', color: 'var(--danger)', paddingLeft: '2.5rem' }}>Logout</button>
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