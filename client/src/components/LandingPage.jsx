import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import './LandingPage.css';

const LandingPage = () => {
    const heroRef = useRef(null);
    const showcaseTrackRef = useRef(null);

    // Performance-optimized scroll handler using requestAnimationFrame
    useEffect(() => {
        let ticking = false;
        const hero = heroRef.current;
        const showcaseTrack = showcaseTrackRef.current;

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const y = window.scrollY;

                    // Hero parallax effect
                    if (hero) {
                        const parallaxOffset = y * 0.4;
                        const heroOpacity = Math.max(1 - y / 700, 0);
                        const heroScale = Math.max(1 - y / 2500, 0.85);
                        hero.style.transform = `translateY(${parallaxOffset}px) scale(${heroScale})`;
                        hero.style.opacity = heroOpacity;
                    }

                    // Showcase horizontal scroll effect
                    if (showcaseTrack) {
                        const showcaseOffset = Math.min(Math.max(y - 1400, 0) / 3, 500);
                        showcaseTrack.style.transform = `translateX(-${showcaseOffset}px)`;
                    }

                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Intersection Observer for fade-in sections
    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        const elements = document.querySelectorAll('.fade-in-section');
        elements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="landing-page">
            {/* Hero Section with Parallax */}
            <section className="hero-parallax" ref={heroRef}>
                <div className="hero-background">
                    <div className="gradient-orb orb-1"></div>
                    <div className="gradient-orb orb-2"></div>
                    <div className="gradient-orb orb-3"></div>
                </div>

                <div className="hero-content">
                    <div className="hero-badge">
                        <span className="badge-icon">✨</span>
                        <span>Digital Entrepreneur Portfolio Builder</span>
                    </div>

                    <h1 className="hero-main-title">
                        <span className="title-line">Build Your</span>
                        <span className="title-line gradient-text">Dream Portfolio</span>
                    </h1>

                    <p className="hero-description">
                        Transform your business ideas into stunning digital pitches.
                        Showcase your ventures to investors with a professional portfolio.
                    </p>

                    <div className="hero-cta-group">
                        <Link to="/login" className="cta-button primary">
                            Get Started
                            <span className="button-arrow">→</span>
                        </Link>
                        <Link to="/investors" className="cta-button secondary">
                            Explore Ventures
                        </Link>
                    </div>
                </div>

                <div className="scroll-indicator">
                    <div className="mouse">
                        <div className="wheel"></div>
                    </div>
                    <p>Scroll to explore</p>
                </div>
            </section>

            {/* Features Section with Stagger Animation */}
            <section className="features-section fade-in-section">
                <div className="section-container">
                    <h2 className="section-title">Powerful Features</h2>
                    <p className="section-subtitle">Everything you need to stand out and succeed</p>

                    <div className="features-grid">
                        <div className="feature-card" style={{ '--delay': '0.1s' }}>
                            <div className="feature-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                                </svg>
                            </div>
                            <h3 className="feature-title">Easy Builder</h3>
                            <p className="feature-description">
                                Create stunning portfolios in minutes with our intuitive drag-and-drop builder
                            </p>
                        </div>

                        <div className="feature-card" style={{ '--delay': '0.2s' }}>
                            <div className="feature-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M12 6v6l4 2" />
                                </svg>
                            </div>
                            <h3 className="feature-title">Lightning Fast</h3>
                            <p className="feature-description">
                                Optimized performance with smooth 60fps animations throughout
                            </p>
                        </div>

                        <div className="feature-card" style={{ '--delay': '0.3s' }}>
                            <div className="feature-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="2" y="3" width="20" height="14" rx="2" />
                                    <path d="M8 21h8M12 17v4" />
                                </svg>
                            </div>
                            <h3 className="feature-title">Fully Responsive</h3>
                            <p className="feature-description">
                                Perfect experience across all devices from mobile to desktop
                            </p>
                        </div>

                        <div className="feature-card" style={{ '--delay': '0.4s' }}>
                            <div className="feature-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                            </div>
                            <h3 className="feature-title">Team Collaboration</h3>
                            <p className="feature-description">
                                Add co-founders and team members to present as a cohesive unit
                            </p>
                        </div>

                        <div className="feature-card" style={{ '--delay': '0.5s' }}>
                            <div className="feature-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                                </svg>
                            </div>
                            <h3 className="feature-title">Public Showcase</h3>
                            <p className="feature-description">
                                Share your portfolio with investors and mentors via a simple link
                            </p>
                        </div>

                        <div className="feature-card" style={{ '--delay': '0.6s' }}>
                            <div className="feature-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                </svg>
                            </div>
                            <h3 className="feature-title">Secure & Private</h3>
                            <p className="feature-description">
                                Your intellectual property is protected with enterprise-grade security
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Showcase Section with Horizontal Scroll */}
            <section className="showcase-section fade-in-section">
                <div className="showcase-container">
                    <h2 className="section-title">See It In Action</h2>
                    <p className="section-subtitle">Real portfolios, real results</p>

                    <div className="showcase-scroll-wrapper">
                        <div className="showcase-track" ref={showcaseTrackRef}>
                            <div className="showcase-item">
                                <div className="showcase-card gradient-card-1">
                                    <div className="showcase-overlay">
                                        <h3>Tech Startup</h3>
                                        <p>AI Solutions</p>
                                    </div>
                                </div>
                            </div>

                            <div className="showcase-item">
                                <div className="showcase-card gradient-card-2">
                                    <div className="showcase-overlay">
                                        <h3>E-Commerce</h3>
                                        <p>Marketplace</p>
                                    </div>
                                </div>
                            </div>

                            <div className="showcase-item">
                                <div className="showcase-card gradient-card-3">
                                    <div className="showcase-overlay">
                                        <h3>FinTech</h3>
                                        <p>Payment Solutions</p>
                                    </div>
                                </div>
                            </div>

                            <div className="showcase-item">
                                <div className="showcase-card gradient-card-4">
                                    <div className="showcase-overlay">
                                        <h3>HealthTech</h3>
                                        <p>Medical Innovation</p>
                                    </div>
                                </div>
                            </div>

                            <div className="showcase-item">
                                <div className="showcase-card gradient-card-5">
                                    <div className="showcase-overlay">
                                        <h3>EdTech</h3>
                                        <p>Learning Platform</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section fade-in-section">
                <div className="section-container">
                    <div className="stats-grid">
                        <div className="stat-item">
                            <div className="stat-number">10K+</div>
                            <div className="stat-label">Active Students</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">50K+</div>
                            <div className="stat-label">Portfolios Created</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">99.9%</div>
                            <div className="stat-label">Uptime</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">100%</div>
                            <div className="stat-label">Free for Students</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section fade-in-section">
                <div className="cta-content">
                    <h2 className="cta-title">Ready to Start Your Journey?</h2>
                    <p className="cta-description">
                        Join thousands of student entrepreneurs building their future today.
                    </p>
                    <Link to="/login" className="cta-button-large">
                        Create Your Portfolio Now
                        <span className="button-shine"></span>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default LandingPage;
