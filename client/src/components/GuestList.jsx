import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from './Footer';
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
        <div className="guest-page">
            {/* Background Orbs */}
            <div className="guest-bg">
                <div className="orb orb-1"></div>
                <div className="orb orb-2"></div>
            </div>

            {/* Hero Section */}
            <header className="guest-hero">
                <div className="hero-content">
                    <div className="hero-badge">
                        <span className="badge-icon">🌟</span>
                        <span>Investor Showcase</span>
                    </div>

                    <h1 className="hero-title">
                        Discover Tomorrow's
                        <span className="gradient-text"> Entrepreneurs</span>
                    </h1>

                    <p className="hero-subtitle">
                        Explore innovative student ventures and groundbreaking business ideas
                        from the next generation of founders
                    </p>

                    {/* Search Bar */}
                    <div className="search-wrapper">
                        <div className="search-bar glass-search">
                            <span className="search-icon">🔍</span>
                            <input
                                type="text"
                                placeholder="Search by venture, founder, or keyword..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                            {searchTerm && (
                                <button
                                    className="search-clear"
                                    onClick={() => setSearchTerm('')}
                                    aria-label="Clear search"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="guest-content">
                {loading ? (
                    /* Loading State */
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Loading amazing portfolios...</p>
                    </div>
                ) : filteredPortfolios.length === 0 ? (
                    /* Empty State */
                    <div className="empty-state glass-card">
                        <div className="empty-icon">🔎</div>
                        <h3 className="empty-title">No Ventures Found</h3>
                        <p className="empty-description">
                            {searchTerm
                                ? "Try adjusting your search terms to find what you're looking for."
                                : "Check back soon for new student submissions!"}
                        </p>
                        {searchTerm && (
                            <button
                                className="btn-clear-search"
                                onClick={() => setSearchTerm('')}
                            >
                                Clear Search
                            </button>
                        )}
                    </div>
                ) : (
                    <>
                        {/* Stats Badge */}
                        <div className="stats-wrapper">
                            <div className="stats-badge glass-card">
                                <span className="stats-number">{filteredPortfolios.length}</span>
                                <span className="stats-label">Active Ventures</span>
                            </div>
                        </div>

                        {/* Portfolio Grid */}
                        <div className="portfolio-grid">
                            {filteredPortfolios.map((item) => (
                                <article key={item._id} className="portfolio-card glass-card">
                                    {/* Card Image */}
                                    <div className="card-image-wrapper">
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={item.businessName}
                                                className="card-image"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="card-placeholder">
                                                <span className="placeholder-icon">🎯</span>
                                                <span className="placeholder-text">No Image</span>
                                            </div>
                                        )}
                                        <div className="card-overlay"></div>
                                        <div className="card-category">Technology</div>
                                    </div>

                                    {/* Card Content */}
                                    <div className="card-content">
                                        <div className="card-header">
                                            <h3 className="business-name">{item.businessName}</h3>
                                            <div className="founder-info">
                                                <span className="founder-label">Founder:</span>
                                                <span className="founder-name">{item.studentName}</span>
                                            </div>
                                        </div>

                                        <div className="card-body">
                                            <p className="card-description">
                                                {item.description
                                                    ? (item.description.length > 110
                                                        ? item.description.substring(0, 110) + '...'
                                                        : item.description)
                                                    : "No description provided."}
                                            </p>
                                        </div>

                                        <div className="card-footer">
                                            <button className="btn-view-pitch">
                                                <span>View Full Pitch</span>
                                                <span className="btn-arrow">→</span>
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default GuestList;