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
        <div className="landing-page">
            {/* Background elements */}
            <div className="blobs-container">
                <div className="blob blob-blue"></div>
                <div className="blob blob-orange"></div>
            </div>

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content-wrapper" ref={heroRef}>
                    <div className="badge animate-on-scroll">
                        <span className="badge-sparkle">✨</span>
                        <span className="badge-text">SiswaNiaga 2.0 is Live</span>
                    </div>

                    <h1 className="hero-title animate-on-scroll delay-1">
                        Build Your <br/>
                        <span className="text-gradient-primary">Business Empire</span> <br/>
                        Starting from Campus
                    </h1>

                    <p className="hero-subtitle animate-on-scroll delay-2">
                        The ultimate portfolio builder for student entrepreneurs. 
                        Launch your digital presence, attract investors, and scale your ideas fast.
                    </p>

                    <div className="hero-actions animate-on-scroll delay-3">
                        <Link to="/login" className="cta-button primary">
                            Get Started Now
                            <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </Link>
                        <Link to="/guest" className="cta-button secondary">
                            Explore as Guest
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="section-header animate-on-scroll">
                    <h2 className="section-title">Everything you need to <span className="text-gradient-orange">stand out</span></h2>
                    <p className="section-description">Crafted specifically for the modern student entrepreneur.</p>
                </div>

                <div className="features-container">
                    <div className="feature-card glass-card animate-on-scroll delay-1">
                        <div className="feature-icon-wrapper">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                        </div>
                        <h3 className="feature-card-title">Drag & Drop Builder</h3>
                        <p className="feature-card-text">Create beautiful business portfolios without writing a single line of code. Intuitive and completely streamlined.</p>
                    </div>

                    <div className="feature-card glass-card animate-on-scroll delay-2">
                        <div className="feature-icon-wrapper">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                        </div>
                        <h3 className="feature-card-title">Premium Aesthetics</h3>
                        <p className="feature-card-text">Leverage stunning UI components inspired by Silicon Valley startups, capturing investor attention instantly.</p>
                    </div>

                    <div className="feature-card glass-card animate-on-scroll delay-3">
                        <div className="feature-icon-wrapper">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                        </div>
                        <h3 className="feature-card-title">Digital Presence</h3>
                        <p className="feature-card-text">Easily publish and share your pitch decks or business links with classmates, mentors, and professors.</p>
                    </div>
                </div>
            </section>

            {/* Minimalist CTA Bottom */}
            <section className="cta-bottom-section">
                <div className="cta-bottom-card glass-card animate-on-scroll">
                    <h2>Ready to launch your campus startup?</h2>
                    <p>Join thousands of student founders changing the world.</p>
                    <Link to="/login" className="cta-button primary">
                        Create Your Portfolio
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default LandingPage;
