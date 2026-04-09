import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from './Footer';
import './GuestList.css';

const GuestList = () => {
    const navigate = useNavigate();
    const [portfolios, setPortfolios] = useState([]);
    const [filteredPortfolios, setFilteredPortfolios] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPublicData = async () => {
            try {
                const res = await axios.get('https://api.siswaniaga.my/api/portfolio/all');
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
            <div className="guest-container">
                {/* Hero Section */}
                <header className="guest-header">
                    <h1 className="guest-title">Investor Showcase</h1>
                    <p className="guest-subtitle">
                        Explore innovative student ventures and groundbreaking business ideas from the next generation of founders.
                    </p>

                    <div className="stats-badge">
                        <span className="stats-number">{filteredPortfolios.length}</span>
                        <span className="stats-label">Active Ventures</span>
                    </div>

                    <div className="search-wrapper">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            placeholder="Search by venture, founder, or keyword..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                    </div>
                </header>

                {/* Main Content */}
                <main>
                    {loading ? (
                        <div className="loading-state">
                            <p>Loading amazing portfolios...</p>
                        </div>
                    ) : filteredPortfolios.length === 0 ? (
                        <div className="empty-state">
                            <h3 style={{color: 'var(--text-color)', marginBottom: '0.5rem'}}>No Ventures Found</h3>
                            <p>{searchTerm ? "Try adjusting your search terms." : "Check back soon for new student submissions!"}</p>
                            {searchTerm && (
                                <button className="enterprise-btn-view" style={{maxWidth: '200px', margin: '1rem auto 0 auto'}} onClick={() => setSearchTerm('')}>
                                    Clear Search
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="enterprise-grid">
                            {filteredPortfolios.map((item) => (
                                <article key={item._id} className="enterprise-card">
                                    {/* Image Map */}
                                    {item.image ? (
                                        <img src={item.image} alt={item.businessName} className="enterprise-card-image" loading="lazy" />
                                    ) : (
                                        <div className="card-placeholder">
                                            No Image
                                        </div>
                                    )}
                                    
                                    {/* Content Map */}
                                    <div className="enterprise-card-content">
                                        <h3 className="enterprise-business-name">{item.businessName}</h3>
                                        <p className="enterprise-student-name">Founder: {item.studentName}</p>
                                        <p className="enterprise-description">
                                            {item.description ? (item.description.length > 100 ? item.description.substring(0, 100) + '...' : item.description) : "No description provided."}
                                        </p>

                                        {/* Action Buttons Map */}
                                        <div className="enterprise-card-actions">
                                            <button className="enterprise-btn-view" onClick={() => navigate(`/portfolio/${item._id}`)}>
                                                View Full Pitch
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default GuestList;