import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from './Footer';
import './GuestList.css';

const GuestList = () => {
    const navigate = useNavigate();
    const [portfolios, setPortfolios] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    // 👇 State Pagination Baru
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalVentures, setTotalVentures] = useState(0);

    const fetchPublicData = async (page = 1, search = '') => {
        try {
            setLoading(true);
            const res = await axios.get(`https://api.siswaniaga.my/api/portfolio/all?page=${page}&limit=9&search=${search}`);
            setPortfolios(res.data.data);
            setCurrentPage(res.data.currentPage);
            setTotalPages(res.data.totalPages === 0 ? 1 : res.data.totalPages);
            setTotalVentures(res.data.total);
        } catch (error) {
            console.error("Error fetching guest data:", error);
        } finally {
            setLoading(false);
        }
    };

    // Auto-fetch bila user menaip (delay 0.5s supaya server tak jem)
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchPublicData(1, searchTerm);
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    return (
        <div className="guest-page">
            <div className="guest-container">
                {/* Hero Section */}
                <header className="guest-header">
                    <h1 className="guest-title">Our Showcase</h1>
                    <p className="guest-subtitle">
                        Explore innovative student ventures and groundbreaking business ideas from the next generation of founders.
                    </p>

                    <div className="stats-badge">
                        <span className="stats-number">{totalVentures}</span>
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
                    ) : portfolios.length === 0 ? (
                        <div className="empty-state">
                            <h3 style={{ color: 'var(--text-color)', marginBottom: '0.5rem' }}>No Ventures Found</h3>
                            <p>{searchTerm ? "Try adjusting your search terms." : "Check back soon for new student submissions!"}</p>
                            {searchTerm && (
                                <button className="enterprise-btn-view" style={{ maxWidth: '200px', margin: '1rem auto 0 auto' }} onClick={() => setSearchTerm('')}>
                                    Clear Search
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="enterprise-grid">
                            {portfolios.map((item) => (
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
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}

                    {/* 👇👇👇 KOD BUTANG PAGINATION 👇👇👇 */}
                    {!loading && portfolios.length > 0 && totalPages > 1 && (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', margin: '40px 0' }}>
                            <button
                                onClick={() => fetchPublicData(currentPage - 1, searchTerm)}
                                disabled={currentPage === 1}
                                className="enterprise-btn-view"
                                style={{ opacity: currentPage === 1 ? 0.5 : 1, cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                            >
                                ← Previous
                            </button>

                            <span style={{ color: 'var(--text-color)', fontWeight: 'bold' }}>
                                Page {currentPage} of {totalPages}
                            </span>

                            <button
                                onClick={() => fetchPublicData(currentPage + 1, searchTerm)}
                                disabled={currentPage === totalPages}
                                className="enterprise-btn-view"
                                style={{ opacity: currentPage === totalPages ? 0.5 : 1, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
                            >
                                Next →
                            </button>
                        </div>
                    )}
                    {/* 👆👆👆 ----------------------- 👆👆👆 */}

                </main>
            </div>
            <Footer />
        </div>
    );
};

export default GuestList;