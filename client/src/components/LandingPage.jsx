import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import './LandingPage.css';

const LandingPage = () => {
    const heroRef = useRef(null);

    // Intersection Observer for smooth reveal animations
    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, observerOptions);

        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    // Simple parallax effect for hero
    useEffect(() => {
        const handleScroll = () => {
            if (heroRef.current) {
                const scrollValue = window.scrollY;
                heroRef.current.style.transform = `translateY(${scrollValue * 0.15}px)`;
                heroRef.current.style.opacity = 1 - Math.min(scrollValue / 800, 1);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="landing-page-v2">
            {/* Creative Geometric Background */}
            <div className="modern-bg-container">
                <div className="mesh-gradient"></div>
                <div className="grid-overlay"></div>
                <div className="floating-shape shape-1"></div>
                <div className="floating-shape shape-2"></div>
                <div className="floating-shape shape-3"></div>
            </div>

            {/* Hero Section */}
            <section className="hero-section-v2">
                <div className="hero-content-wrapper-v2" ref={heroRef}>
                    <div className="hero-badge-v2 animate-on-scroll">
                        <span className="badge-pulse"></span>
                        <span className="badge-text-v2">SiswaNiaga is Live</span>
                        <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </div>

                    <h1 className="hero-title-v2 animate-on-scroll delay-1">
                        Build Your <br />
                        <span className="text-gradient-navy-gold">Business Portfolio</span> <br />
                        Starting From Campus
                    </h1>

                    <p className="hero-subtitle-v2 animate-on-scroll delay-2">
                        The definitive digital business pitch deck directory for visionary student entrepreneurs.
                        Command attention, secure investment, and scale your digital presence with enterprise-grade aesthetics.
                    </p>

                    <div className="hero-actions-v2 animate-on-scroll delay-3">
                        <Link to="/login" className="cta-btn-v2 cta-primary-v2">
                            <span className="cta-text">Start Building Free</span>
                            <span className="cta-icon-wrapper">
                                <svg className="arrow-icon-v2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </span>
                        </Link>
                        <Link to="/investors" className="cta-btn-v2 cta-secondary-v2">
                            <span className="cta-text">View Portfolios</span>
                        </Link>
                    </div>

                    {/* Dashboard Preview / Mockup Illustration */}
                    <div className="hero-mockup-wrapper animate-on-scroll delay-4">
                        <div className="glass-dashboard-mockup">
                            <div className="mockup-header">
                                <div className="mac-dots"><span></span><span></span><span></span></div>
                            </div>
                            <div className="mockup-body">
                                <div className="mockup-sidebar"></div>
                                <div className="mockup-main">
                                    <div className="mockup-chart"></div>
                                    <div className="mockup-cards">
                                        <span></span><span></span><span></span>
                                    </div>
                                </div>
                            </div>
                            <div className="mockup-glow"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section-v2">
                <div className="features-header-v2 animate-on-scroll">
                    <h2 className="section-title-v2">Everything you need to <span className="highlight-text">succeed</span></h2>
                    <p className="section-subtitle-v2">Designed to meet the exact standards of venture capitalists and academic evaluators.</p>
                </div>

                <div className="features-grid-v2">
                    <div className="feature-card-v2 glass-morphism animate-on-scroll delay-1">
                        <div className="feature-icon-v2 icon-blue">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                        </div>
                        <h3 className="feature-title-v2">Drag & Drop Builder</h3>
                        <p className="feature-desc-v2">Create beautiful business portfolios without writing a single line of code. Intuitive, fast, and highly customizable.</p>
                    </div>

                    <div className="feature-card-v2 glass-morphism animate-on-scroll delay-2">
                        <div className="feature-icon-v2 icon-gold">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                        </div>
                        <h3 className="feature-title-v2">Enterprise Aesthetics</h3>
                        <p className="feature-desc-v2">Leverage stunning UI components aligned with formal academic standards, capturing professional attention instantly.</p>
                    </div>

                    <div className="feature-card-v2 glass-morphism animate-on-scroll delay-3">
                        <div className="feature-icon-v2 icon-purple">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                        </div>
                        <h3 className="feature-title-v2">Global Digital Presence</h3>
                        <p className="feature-desc-v2">Easily publish and share your pitch decks or business links with classmates, mentors, and prospective investors.</p>
                    </div>
                </div>
            </section>

            {/* Social Proof / Trust Section */}
            <section className="trust-section-v2 animate-on-scroll">
                <div className="trust-content glass-morphism">
                    <h3 className="trust-title">Trusted by Student Founders at</h3>
                    <div className="trust-logos">
                        <span className="trust-logo">UUM</span>
                        <span className="trust-logo">EDC</span>
                        <span className="trust-logo">InnoHub</span>
                        <span className="trust-logo">Siswa Enterprise</span>
                    </div>
                </div>
            </section>

            {/* Premium CTA Bottom */}
            <section className="cta-bottom-v2">
                <div className="cta-card-v2 glass-morphism animate-on-scroll">
                    <div className="cta-card-content">
                        <h2 className="cta-bottom-title">Ready to launch your campus startup?</h2>
                        <p className="cta-bottom-desc">Join thousands of student founders changing the world. Setup takes less than 5 minutes.</p>
                        <Link to="/login" className="cta-btn-v2 cta-primary-v2">
                            <span className="cta-text">Create Your Portfolio</span>
                            <span className="cta-icon-wrapper">
                                <svg className="arrow-icon-v2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                            </span>
                        </Link>
                    </div>
                    <div className="cta-decorative-circle"></div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default LandingPage;
