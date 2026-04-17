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

    // State Pagination
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
        <div className="directory-page">
            {/* Hero Section */}
            <div className="directory-hero">
                <div className="directory-hero-content">
                    <div className="directory-badge">
                        <span className="pulse-dot"></span>
                        {totalVentures} Active Ventures
                    </div>
                    <h1 className="directory-title">Investor Directory</h1>
                    <p className="directory-subtitle">
                        Discover and connect with the next generation of student-led enterprises. Explore pitch decks, business models, and innovative solutions.
                    </p>

                    <div className="directory-search-wrapper">
                        <div className="search-pill">
                            <span className="search-icon-modern">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                            </span>
                            <input
                                type="text"
                                placeholder="Search by venture, founder, or keyword..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input-modern"
                            />
                            {searchTerm && (
                                <button className="clear-search-btn" onClick={() => setSearchTerm('')}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="directory-main">
                {loading ? (
                    <div className="directory-loading">
                        <div className="loader-ring"></div>
                        <p>Curating investment opportunities...</p>
                    </div>
                ) : portfolios.length === 0 ? (
                    <div className="directory-empty">
                        <div className="empty-icon-wrapper">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        </div>
                        <h3>No Ventures Found</h3>
                        <p>{searchTerm ? `No results matching "${searchTerm}". Try adjusting your keywords.` : "Check back soon for new student submissions!"}</p>
                        {searchTerm && (
                            <button className="btn-modern-secondary" onClick={() => setSearchTerm('')}>
                                Clear Search
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="directory-grid">
                        {portfolios.map((item) => (
                            <article key={item._id} className="directory-card" onClick={() => navigate(`/portfolio/${item._id}`)}>
                                <div className="card-image-wrapper">
                                    {item.image ? (
                                        <img src={item.image} alt={item.businessName} className="card-image" loading="lazy" />
                                    ) : (
                                        <div className="card-placeholder-modern">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                                        </div>
                                    )}
                                    <div className="card-overlay">
                                        <span className="view-details-text">View Details →</span>
                                    </div>
                                </div>

                                <div className="card-content-modern">
                                    <div className="card-header-modern">
                                        <h3 className="business-name">{item.businessName}</h3>
                                        <span className="founder-badge">{item.studentName}</span>
                                    </div>
                                    <p className="business-desc">
                                        {item.description ? (item.description.length > 110 ? item.description.substring(0, 110) + '...' : item.description) : "No business description provided for this venture."}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {!loading && portfolios.length > 0 && totalPages > 1 && (
                    <div className="directory-pagination">
                        <button
                            onClick={() => fetchPublicData(currentPage - 1, searchTerm)}
                            disabled={currentPage === 1}
                            className="btn-pagination"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
                            Prev
                        </button>

                        <div className="pagination-indicators">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <span 
                                    key={page} 
                                    className={`page-dot ${currentPage === page ? 'active' : ''}`}
                                    onClick={() => fetchPublicData(page, searchTerm)}
                                ></span>
                            ))}
                        </div>

                        <button
                            onClick={() => fetchPublicData(currentPage + 1, searchTerm)}
                            disabled={currentPage === totalPages}
                            className="btn-pagination"
                        >
                            Next
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </button>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default GuestList;