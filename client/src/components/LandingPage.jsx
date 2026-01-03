import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    return (
        <div className="landing-container">
            {/* Hero Section */}
            <section className="hero-section">
                <nav className="landing-nav">
                    <div className="nav-logo">
                        <span className="logo-icon">🚀</span>
                        <span className="logo-text">Entrepreneur Portfolio</span>
                    </div>
                    <div className="nav-links">
                        <Link to="/investors" className="nav-link">View Portfolios</Link>
                        <Link to="/login" className="nav-btn-primary">Student Login</Link>
                    </div>
                </nav>

                <div className="hero-content">
                    <div className="hero-badge">
                        <span className="badge-emoji">✨</span>
                        <span>Empowering Student Entrepreneurs</span>
                    </div>
                    <h1 className="hero-title">
                        Build Your<br />
                        <span className="gradient-text">Entrepreneurial Portfolio</span>
                    </h1>
                    <p className="hero-description">
                        Showcase your innovative business ideas, connect with investors,
                        and turn your entrepreneurial dreams into reality.
                    </p>
                    <div className="hero-cta">
                        <Link to="/login" className="cta-button-primary">
                            <span>Get Started</span>
                            <span className="btn-arrow">→</span>
                        </Link>
                        <Link to="/investors" className="cta-button-secondary">
                            <span>Explore Ventures</span>
                        </Link>
                    </div>
                </div>

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

            {/* Features Section */}
            <section className="features-section">
                <div className="section-header">
                    <span className="section-badge">Why Choose Us</span>
                    <h2 className="section-title">Everything You Need to Succeed</h2>
                    <p className="section-subtitle">
                        Powerful tools and features designed for student entrepreneurs
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
                            No design skills required.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon gradient-2">
                            <span>👥</span>
                        </div>
                        <h3 className="feature-title">Team Collaboration</h3>
                        <p className="feature-description">
                            Add team members and co-founders. Build your entrepreneurial
                            network together.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon gradient-3">
                            <span>🌐</span>
                        </div>
                        <h3 className="feature-title">Public Showcase</h3>
                        <p className="feature-description">
                            Share your portfolio with investors, mentors, and the world.
                            Get discovered.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon gradient-4">
                            <span>📈</span>
                        </div>
                        <h3 className="feature-title">Market Insights</h3>
                        <p className="feature-description">
                            Present market size, target audience, and growth potential
                            to attract investors.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon gradient-5">
                            <span>🎨</span>
                        </div>
                        <h3 className="feature-title">Professional Design</h3>
                        <p className="feature-description">
                            Modern, responsive templates that look great on any device.
                            Stand out from the crowd.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon gradient-6">
                            <span>🔒</span>
                        </div>
                        <h3 className="feature-title">Secure & Private</h3>
                        <p className="feature-description">
                            Your data is protected with industry-standard security.
                            You control your visibility.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="cta-content">
                    <h2 className="cta-title">Ready to Start Your Journey?</h2>
                    <p className="cta-description">
                        Join hundreds of student entrepreneurs building their future today.
                    </p>
                    <Link to="/login" className="cta-button-large">
                        <span>Create Your Portfolio Now</span>
                        <span className="btn-sparkle">✨</span>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <p>© 2026 Entrepreneur Portfolio | Empowering Student Innovation</p>
            </footer>
        </div>
    );
};

export default LandingPage;
