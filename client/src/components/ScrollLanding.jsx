import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import '../scroll-landing.css';

const ScrollLanding = () => {
    const [scrollY, setScrollY] = useState(0);
    const heroRef = useRef(null);
    const featuresRef = useRef(null);
    const showcaseRef = useRef(null);
    const ctaRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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

    const parallaxOffset = scrollY * 0.5;
    const heroOpacity = Math.max(1 - scrollY / 600, 0);
    const heroScale = Math.max(1 - scrollY / 2000, 0.8);

    return (
        <div className="scroll-landing">
            {/* Hero Section with Parallax */}
            <section
                className="hero-parallax"
                ref={heroRef}
                style={{
                    transform: `translateY(${parallaxOffset}px) scale(${heroScale})`,
                    opacity: heroOpacity
                }}
            >
                <div className="hero-background">
                    <div className="gradient-orb orb-1"></div>
                    <div className="gradient-orb orb-2"></div>
                    <div className="gradient-orb orb-3"></div>
                </div>

                <div className="hero-content">
                    <h1 className="hero-main-title">
                        <span className="title-line">Build Your</span>
                        <span className="title-line gradient-text">Dream Portfolio</span>
                    </h1>
                    <p className="hero-description">
                        Showcase your work with stunning visuals and immersive interactions
                    </p>
                    <div className="hero-cta-group">
                        <Link to="/login" className="cta-button primary">
                            Get Started
                            <span className="button-arrow">→</span>
                        </Link>
                        <Link to="/investors" className="cta-button secondary">
                            View Gallery
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
            <section className="features-section fade-in-section" ref={featuresRef}>
                <div className="section-container">
                    <h2 className="section-title">Powerful Features</h2>
                    <p className="section-subtitle">Everything you need to stand out</p>

                    <div className="features-grid">
                        <div className="feature-card" style={{ '--delay': '0.1s' }}>
                            <div className="feature-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                                </svg>
                            </div>
                            <h3 className="feature-title">Layered Design</h3>
                            <p className="feature-description">
                                Create depth with parallax scrolling and multi-layered animations
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
                                Optimized performance with smooth 60fps animations
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
                                Perfect experience across all devices and screen sizes
                            </p>
                        </div>

                        <div className="feature-card" style={{ '--delay': '0.4s' }}>
                            <div className="feature-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                                    <line x1="7" y1="7" x2="7.01" y2="7" />
                                </svg>
                            </div>
                            <h3 className="feature-title">Customizable</h3>
                            <p className="feature-description">
                                Tailor every aspect to match your unique brand identity
                            </p>
                        </div>

                        <div className="feature-card" style={{ '--delay': '0.5s' }}>
                            <div className="feature-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                                    <line x1="12" y1="22.08" x2="12" y2="12" />
                                </svg>
                            </div>
                            <h3 className="feature-title">Modern Stack</h3>
                            <p className="feature-description">
                                Built with React, optimized for performance and scalability
                            </p>
                        </div>

                        <div className="feature-card" style={{ '--delay': '0.6s' }}>
                            <div className="feature-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                </svg>
                            </div>
                            <h3 className="feature-title">Secure & Reliable</h3>
                            <p className="feature-description">
                                Enterprise-grade security with reliable cloud infrastructure
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Showcase Section with Horizontal Scroll Effect */}
            <section className="showcase-section fade-in-section" ref={showcaseRef}>
                <div className="showcase-sticky">
                    <h2 className="section-title">See It In Action</h2>
                    <p className="section-subtitle">Real portfolios, real results</p>

                    <div className="showcase-scroll-container">
                        <div
                            className="showcase-track"
                            style={{
                                transform: `translateX(-${Math.min(Math.max(scrollY - 1200, 0) / 3, 600)}px)`
                            }}
                        >
                            <div className="showcase-item">
                                <div className="showcase-image gradient-card-1">
                                    <div className="showcase-overlay">
                                        <h3>Creative Studio</h3>
                                        <p>Design Portfolio</p>
                                    </div>
                                </div>
                            </div>

                            <div className="showcase-item">
                                <div className="showcase-image gradient-card-2">
                                    <div className="showcase-overlay">
                                        <h3>Tech Startup</h3>
                                        <p>Product Showcase</p>
                                    </div>
                                </div>
                            </div>

                            <div className="showcase-item">
                                <div className="showcase-image gradient-card-3">
                                    <div className="showcase-overlay">
                                        <h3>Photography</h3>
                                        <p>Visual Stories</p>
                                    </div>
                                </div>
                            </div>

                            <div className="showcase-item">
                                <div className="showcase-image gradient-card-4">
                                    <div className="showcase-overlay">
                                        <h3>Developer</h3>
                                        <p>Code Projects</p>
                                    </div>
                                </div>
                            </div>

                            <div className="showcase-item">
                                <div className="showcase-image gradient-card-5">
                                    <div className="showcase-overlay">
                                        <h3>Marketing</h3>
                                        <p>Campaign Results</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section with Counter Animation */}
            <section className="stats-section fade-in-section">
                <div className="section-container">
                    <div className="stats-grid">
                        <div className="stat-item">
                            <div className="stat-number">10K+</div>
                            <div className="stat-label">Active Users</div>
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
                            <div className="stat-number">24/7</div>
                            <div className="stat-label">Support</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section fade-in-section" ref={ctaRef}>
                <div className="cta-content">
                    <h2 className="cta-title">Ready to Get Started?</h2>
                    <p className="cta-description">
                        Join thousands of creators building amazing portfolios
                    </p>
                    <Link to="/login" className="cta-button-large">
                        Create Your Portfolio Now
                        <span className="button-shine"></span>
                    </Link>
                </div>
            </section>

            {/* Professional Footer */}
            <Footer />
        </div>
    );
};

export default ScrollLanding;
