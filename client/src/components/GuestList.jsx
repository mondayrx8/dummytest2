import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from './Footer';
import './GuestList.css';
import { GooeyInput } from './ui/GooeyInput.jsx';

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

    // Auto-fetch when user types (delay 0.5s so server doesn't crash)
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchPublicData(1, searchTerm);
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    return (
        <div className="directory-page">
            {/* Hero Section */}
            <section className="directory-hero" aria-label="Investor Directory Hero">
                <div className="directory-hero-content">
                    <div className="directory-badge">
                        <span className="pulse-dot" aria-hidden="true"></span>
                        {totalVentures} Active Ventures
                    </div>
                    <h1 className="directory-title">Investor Directory</h1>
                    <p className="directory-subtitle">
                        Discover and connect with the next generation of student-led enterprises. Explore pitch decks, business models, and innovative solutions.
                    </p>

                    <div className="directory-search-wrapper flex justify-center w-full mt-8">
                        <div className="w-full max-w-md">
                            <GooeyInput
                                placeholder="Search by venture, founder..."
                                value={searchTerm}
                                onValueChange={(text) => setSearchTerm(text)}
                                collapsedWidth={200}
                                expandedWidth={300}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <main className="directory-main" aria-label="Venture listings">
                {loading ? (
                    <div className="directory-grid" aria-hidden="true">
                        {[1, 2, 3, 4, 5, 6].map((skel) => (
                            <article key={skel} className="directory-card">
                                <div className="skeleton-thumb"></div>
                                <div className="skeleton-content">
                                    <div className="skeleton-content__row">
                                        <div className="skeleton-block skel-h6-half"></div>
                                        <div className="skeleton-block skel-badge"></div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <div className="skeleton-block skel-line"></div>
                                        <div className="skeleton-block skel-line-5-6"></div>
                                        <div className="skeleton-block skel-line-2-3"></div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : portfolios.length === 0 ? (
                    <div className="directory-empty">
                        <div className="empty-icon-wrapper" aria-hidden="true">
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
                        {portfolios.map((item) => {
                            let thumbnail = item.banner || null;

                            if (!thumbnail) {
                                if (item.products && item.products.length > 0 && item.products[0].image) {
                                    thumbnail = item.products[0].image;
                                } else if (item.ourTeam && item.ourTeam.length > 0 && item.ourTeam[0].image) {
                                    thumbnail = item.ourTeam[0].image;
                                } else if (item.missionVision?.graphicInfo) {
                                    thumbnail = item.missionVision.graphicInfo;
                                }
                            }

                            const founderName = item.ourTeam && item.ourTeam.length > 0 && item.ourTeam[0].name
                                ? item.ourTeam[0].name
                                : "Founder";

                            const brief = item.slogan || item.aboutUs || "No business description provided for this venture.";

                            return (
                                <article key={item._id} className="directory-card" onClick={() => navigate(`/portfolio/${item._id}`)}>
                                    <div className="card-image-wrapper">
                                        {thumbnail ? (
                                            <img src={thumbnail} alt={item.businessName} className="card-image" loading="lazy" />
                                        ) : (
                                            <div className="card-placeholder-modern" aria-hidden="true">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                                            </div>
                                        )}
                                        <div className="card-overlay" aria-hidden="true">
                                            <span className="view-details-text">View Details →</span>
                                        </div>
                                    </div>

                                    <div className="card-content-modern">
                                        <div className="card-header-modern">
                                            <h3 className="business-name">{item.businessName}</h3>
                                            <span className="founder-badge">{founderName}</span>
                                        </div>
                                        <p className="business-desc">
                                            {brief.length > 110 ? brief.substring(0, 110) + '...' : brief}
                                        </p>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}

                {/* Pagination */}
                {!loading && portfolios.length > 0 && totalPages > 1 && (
                    <nav className="directory-pagination" aria-label="Pagination">
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
                                    role="button"
                                    aria-label={`Go to page ${page}`}
                                    tabIndex={0}
                                    onKeyDown={(e) => e.key === 'Enter' && fetchPublicData(page, searchTerm)}
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
                    </nav>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default GuestList;