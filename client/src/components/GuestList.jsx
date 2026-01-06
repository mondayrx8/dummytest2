import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import './GuestList.css';

const GuestList = () => {
    const [portfolios, setPortfolios] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPublicData = async () => {
            try {
                const res = await axios.get('https://dummytest2.onrender.com/api/portfolio/all');
                setPortfolios(res.data);
            } catch (error) {
                console.error("Error fetching guest data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPublicData();
    }, []);

    return (
        <div className="guest-list-container">
            {/* Hero Header */}
            <header className="hero-header">
                <nav className="public-nav">
                    <div className="nav-brand">
                        <span className="brand-icon">🚀</span>
                        <h1 className="brand-title">Entrepreneur Showcase</h1>
                    </div>
                    <Link to="/" className="login-button">
                        <span className="button-icon">👤</span>
                        Student Login
                    </Link>
                </nav>

                <div className="hero-content">
                    <h2 className="hero-title">Discover Tomorrow's Entrepreneurs</h2>
                    <p className="hero-subtitle">
                        Explore innovative student ventures and groundbreaking business ideas from the next generation of founders
                    </p>
                </div>
            </header>

            {/* Main Content */}
            <main className="main-content">
                {loading ? (
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Loading amazing portfolios...</p>
                    </div>
                ) : portfolios.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">📋</div>
                        <h3>No Portfolios Yet</h3>
                        <p>Check back soon to discover exciting student ventures!</p>
                    </div>
                ) : (
                    <>
                        <div className="portfolio-stats">
                            <div className="stat-badge">
                                <span className="stat-number">{portfolios.length}</span>
                                <span className="stat-label">Active Ventures</span>
                            </div>
                        </div>

                        <div className="portfolio-grid">
                            {portfolios.map((item) => (
                                <article key={item._id} className="portfolio-card">
                                    <div className="card-image-wrapper">
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={item.businessName}
                                                className="card-image"
                                            />
                                        ) : (
                                            <div className="card-image-placeholder">
                                                <span className="placeholder-icon">🎯</span>
                                                <span className="placeholder-text">No Image</span>
                                            </div>
                                        )}
                                        <div className="card-overlay"></div>
                                    </div>

                                    <div className="card-content">
                                        <div className="card-header">
                                            <h3 className="business-name">{item.businessName}</h3>
                                            <div className="student-info">
                                                <span className="student-label">👨‍🎓 Founder:</span>
                                                <span className="student-name">{item.studentName}</span>
                                            </div>
                                            {/* Show Team Members if they exist */}
                                            {item.teamMembers && (
                                                <div className="team-info">
                                                    <span className="team-icon">🤝</span>
                                                    <div className="team-content">
                                                        <span className="team-label">Team Members</span>
                                                        <span className="team-members">{item.teamMembers}</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="card-body">
                                            <div className="info-section">
                                                <div className="section-badge pitch-badge">
                                                    <span className="badge-icon">💡</span>
                                                    <span className="badge-text">The Pitch</span>
                                                </div>
                                                <p className="section-content">{item.description}</p>
                                            </div>

                                            <div className="info-section">
                                                <div className="section-badge market-badge">
                                                    <span className="badge-icon">📊</span>
                                                    <span className="badge-text">Market Size</span>
                                                </div>
                                                <p className="section-content market-size">{item.marketSize}</p>
                                            </div>
                                        </div>

                                        <div className="card-footer">
                                            <span className="view-details">View Details →</span>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </>
                )}
            </main>

            {/* Professional Footer */}
            <Footer />
        </div>
    );
};

export default GuestList;