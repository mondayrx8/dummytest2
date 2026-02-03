import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    // Refs for Intersection Observer
    const heroRef = useRef(null);
    const featuresRef = useRef(null);
    const statsRef = useRef(null);

    // Scroll Fade-in Animation Hook
    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Animates only once
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        const sections = document.querySelectorAll('.fade-in-section');
        sections.forEach(section => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="landing-container">
            {/* 1. Hero Section */}
            <section className="hero-section fade-in-section" ref={heroRef}>
                <div className="hero-blob blob-1"></div>
                <div className="hero-blob blob-2"></div>

                {/* Navbar */}
                <nav className="landing-nav">
                    <div className="nav-logo">
                        <span className="logo-icon">🚀</span>
                        <span className="logo-text">DEPB</span>
                    </div>
                    <div className="nav-links">
                        <Link to="/investors" className="nav-link">Explore Ventures</Link>
                        <Link to="/login" className="nav-btn-primary">Student Login</Link>
                    </div>
                </nav>

                <div className="hero-content">
                    <div className="hero-badge">
                        <span className="badge-emoji">✨</span>
                        <span>Digital Portfolio Builder</span>
                    </div>
                    <h1 className="hero-title">
                        Build Your Professional<br />
                        <span className="gradient-text">Entrepreneurial Pitch</span>
                    </h1>
                    <p className="hero-description">
                        Transform your business plan into a shareable digital portfolio.
                        No coding required. Replace dull PDFs with a professional Digital Pitch Deck.
                    </p>
                    <div className="hero-cta">
                        <Link to="/login" className="cta-button-primary">
                            <span>Get Started</span>
                            <span className="btn-arrow">→</span>
                        </Link>
                        <Link to="/investors" className="cta-button-secondary">
                            <span>View Examples</span>
                        </Link>
                    </div>
                </div>

                {/* Floating Glass Visuals */}
                <div className="hero-visual">
                    <div className="floating-card card-1">
                        <span className="card-emoji">💡</span>
                        <span className="card-text">Innovative Ideas</span>
                    </div>
                    <div className="floating-card card-2">
                        <span className="card-emoji">📊</span>
                        <span className="card-text">Market Analysis</span>
                    </div>
                    <div className="floating-card card-3">
                        <span className="card-emoji">🎯</span>
                        <span className="card-text">Growth Strategy</span>
                    </div>
                </div>
            </section>

            {/* 2. Features Section */}
            <section className="features-section fade-in-section" ref={featuresRef}>
                <div className="section-header">
                    <span className="section-badge">Why Choose DEPB</span>
                    <h2 className="section-title">Everything You Need to Succeed</h2>
                    <p className="section-subtitle">
                        Powerful tools designed for student entrepreneurs to pitch with confidence.
                    </p>
                </div>

                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon gradient-1">
                            <span>📝</span>
                        </div>
                        <h3 className="feature-title">Easy Portfolio Builder</h3>
                        <p className="feature-description">
                            Create stunning portfolios in minutes with our intuitive builder.
                            Focus on your pitch, not the code.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon gradient-2">
                            <span>👥</span>
                        </div>
                        <h3 className="feature-title">Team Collaboration</h3>
                        <p className="feature-description">
                            Add team members and co-founders. Build your entrepreneurial
                            network and present as a cohesive unit.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon gradient-3">
                            <span>🌐</span>
                        </div>
                        <h3 className="feature-title">Public Showcase</h3>
                        <p className="feature-description">
                            Share your portfolio with investors, mentors, and the world via a
                            simple public link.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon gradient-4">
                            <span>📈</span>
                        </div>
                        <h3 className="feature-title">Dynamic Page Gen</h3>
                        <p className="feature-description">
                            Automatically generate a professional landing page for your venture
                            using your input data.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon gradient-5">
                            <span>🎥</span>
                        </div>
                        <h3 className="feature-title">Media Management</h3>
                        <p className="feature-description">
                            Upload high-quality images and embed pitch videos to make your
                            presentation stand out.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon gradient-6">
                            <span>🔒</span>
                        </div>
                        <h3 className="feature-title">Secure Platform</h3>
                        <p className="feature-description">
                            Your intellectual property is important. We use industry-standard
                            security practices.
                        </p>
                    </div>
                </div>
            </section>

            {/* 3. Stats Section (Social Proof) */}
            <section className="features-section fade-in-section" style={{ background: 'var(--bg-off-white)' }} ref={statsRef}>
                <div className="section-header">
                    <h2 className="section-title">Trusted by Student Innovators</h2>
                </div>
                <div className="features-grid" style={{ textAlign: 'center', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                    <div className="stat-item">
                        <div style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--primary-violet)' }}>10K+</div>
                        <div style={{ color: 'var(--text-muted)', fontWeight: '600' }}>Active Students</div>
                    </div>
                    <div className="stat-item">
                        <div style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--primary-violet)' }}>50K+</div>
                        <div style={{ color: 'var(--text-muted)', fontWeight: '600' }}>Portfolios Created</div>
                    </div>
                    <div className="stat-item">
                        <div style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--primary-violet)' }}>100%</div>
                        <div style={{ color: 'var(--text-muted)', fontWeight: '600' }}>Free for Students</div>
                    </div>
                </div>
            </section>

            {/* 4. CTA Section */}
            <section className="cta-section fade-in-section">
                <div className="cta-content">
                    <h2 className="cta-title">Ready to Start Your Journey?</h2>
                    <p className="cta-description">
                        Join thousands of student entrepreneurs building their future today.
                    </p>
                    <Link to="/login" className="cta-button-large">
                        <span>Create Your Portfolio Now</span>
                        <span className="btn-sparkle">✨</span>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <p>© 2026 DEPB | Empowering Student Innovation</p>
            </footer>
        </div>
    );
};

export default LandingPage;
