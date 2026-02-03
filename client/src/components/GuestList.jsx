import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './GuestList.css';

const GuestList = () => {
    const [portfolios, setPortfolios] = useState([]);
    const [filteredPortfolios, setFilteredPortfolios] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPublicData = async () => {
            try {
                const res = await axios.get('https://dummytest2.onrender.com/api/portfolio/all');
                setPortfolios(res.data);
                setFilteredPortfolios(res.data);
            } catch (error) {
                console.error("Error fetching guest data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPublicData();
    }, []);

    useEffect(() => {
        const results = portfolios.filter(item =>
            item.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setFilteredPortfolios(results);
    }, [searchTerm, portfolios]);

    return (
        <div className="guest-list-container">
            {/* Background Blobs */}
            <div className="guest-bg">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
            </div>

            {/* Hero Header */}
            <header className="hero-header">
                <nav className="public-nav glass-nav">
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

                    {/* Search Bar */}
                    <div className="search-section">
                        <div className="search-bar glass-panel">
                            <span className="search-icon">🔍</span>
                            <input
                                type="text"
                                placeholder="Search by venture, founder, or keyword..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="main-content">
                {loading ? (
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Loading amazing portfolios...</p>
                    </div>
                ) : filteredPortfolios.length === 0 ? (
                    <div className="empty-state glass-panel">
                        <div className="empty-icon">🤷‍♂️</div>
                        <h3>No Ventures Found</h3>
                        <p>Try adjusting your search terms to find what you're looking for.</p>
                        {portfolios.length === 0 && <p>Check back soon for new student submissions!</p>}
                    </div>
                ) : (
                    <>
                        <div className="portfolio-stats">
                            <div className="stat-badge glass-panel">
                                <span className="stat-number">{filteredPortfolios.length}</span>
                                <span className="stat-label">Active Ventures</span>
                            </div>
                        </div>

                        <div className="portfolio-grid">
                            {filteredPortfolios.map((item) => (
                                <article key={item._id} className="portfolio-card glass-panel">
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
                                        <div className="card-category-badge">Technology</div>
                                    </div>

                                    <div className="card-content">
                                        <div className="card-header">
                                            <h3 className="business-name">{item.businessName}</h3>
                                            <div className="student-info">
                                                <span className="student-label">Founder:</span>
                                                <span className="student-name">{item.studentName}</span>
                                            </div>
                                        </div>

                                        <div className="card-body">
                                            <p className="card-problem">
                                                {item.description
                                                    ? (item.description.length > 100 ? item.description.substring(0, 100) + '...' : item.description)
                                                    : "No description provided."}
                                            </p>
                                        </div>

                                        <div className="card-footer">
                                            <button className="view-pitch-btn">
                                                View Full Pitch
                                                <span className="arrow">→</span>
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </>
                )}
            </main>
        </div>
    );
};

export default GuestList;