import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import './PortfolioList.css';

const PortfolioList = ({ portfolios, onDelete, setCurrentPortfolio, currentUser }) => {
    const navigate = useNavigate();
    const [deleting, setDeleting] = useState(null);
    const [stats, setStats] = useState({ totalUsers: 0, totalVisits: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get('https://api.siswaniaga.my/api/stats');
                setStats(response.data);
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        };
        fetchStats();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("🗑️ Are you sure you want to delete this portfolio? This action cannot be undone.")) return;

        setDeleting(id);
        try {
            await axios.delete(`https://api.siswaniaga.my/api/portfolio/delete/${id}`, {
                headers: { 'auth-token': localStorage.getItem('token') }
            });
            onDelete();
        } catch (error) {
            console.error("Error deleting:", error);
            alert("Error deleting portfolio. Please try again.");
        } finally {
            setDeleting(null);
        }
    };

    const handleEditClick = (item) => {
        setCurrentPortfolio(item);
        navigate('/create');
    };

    const handlePreview = (id) => {
        navigate(`/portfolio/${id}`);
    };

    return (
        <div className="dashboard-page-modern modern-portfolio-theme">
            {/* Ambient Background Lights */}
            <div className="ambient-light-1"></div>
            <div className="ambient-light-2"></div>

            <div className="dashboard-wrapper">
                {/* Dashboard Header */}
                <header className="dash-header">
                    <div className="dash-header-left">
                        <h1 className="dash-title">My Ventures</h1>
                        <p className="dash-subtitle">Architect the future of your entrepreneurial journey.</p>
                    </div>
                    <div className="dash-header-right">
                        <button onClick={() => navigate('/create')} className="btn-stunning-create">
                            <span className="btn-glow-wrapper">
                                <span className="btn-glow"></span>
                            </span>
                            <span className="btn-content">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                                Create New Pitch
                            </span>
                        </button>
                    </div>
                </header>

                {/* Intelligent Radar Dashboard */}
                <section className="dash-radar-section">
                    <div className="radar-glass-card">
                        <div className="radar-icon-wrap user-icon-wrap">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5V18a3 3 0 0 0-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 0 1 5.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 0 1 9.288 0M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm6 3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM7 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
                            </svg>
                        </div>
                        <div className="radar-info">
                            <h3 className="radar-label">Total Network Users</h3>
                            <p className="radar-value">{stats.totalUsers}</p>
                        </div>
                    </div>
                    
                    <div className="radar-glass-card">
                        <div className="radar-icon-wrap globe-icon-wrap">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                            </svg>
                        </div>
                        <div className="radar-info">
                            <h3 className="radar-label">Global Platform Visits</h3>
                            <p className="radar-value">{stats.totalVisits}</p>
                        </div>
                    </div>
                </section>

                {/* Main Content Area */}
                <main className="dash-main-area">
                    {portfolios.length === 0 ? (
                        <div className="stunning-empty-state">
                            <div className="empty-state-visual">
                                <div className="outer-orb"></div>
                                <div className="inner-orb"></div>
                                <svg className="sparkle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <h2 className="empty-heading">A Blank Canvas Awaits</h2>
                            <p className="empty-text">
                                Your entrepreneurial portfolio is currently empty. Design your first pitch deck and start making waves in the industry.
                            </p>
                            <button onClick={() => navigate('/create')} className="btn-hero-start">
                                Launch Your Pitch
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        </div>
                    ) : (
                        <div className="neo-venture-grid">
                            {portfolios.map((item) => (
                                <article key={item._id} className="neo-card">
                                    <div className="neo-card-inner">
                                        {/* Image Section */}
                                        <div className="neo-card-media">
                                            {item.image ? (
                                                <img src={item.image} alt={item.businessName} className="neo-card-img" loading="lazy" />
                                            ) : (
                                                <div className="neo-card-no-img">
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="48" height="48">
                                                        <rect x="3" y="3" width="18" height="18" rx="4" />
                                                        <circle cx="8.5" cy="8.5" r="2.5" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 15l-5-5L5 21" />
                                                    </svg>
                                                    <span>No Media</span>
                                                </div>
                                            )}
                                            {item.category && (
                                                <span className="neo-badge">{item.category}</span>
                                            )}
                                        </div>

                                        {/* Content Section */}
                                        <div className="neo-card-body">
                                            <h3 className="neo-card-title">{item.businessName}</h3>
                                            <p className="neo-card-desc">
                                                {item.description
                                                    ? (item.description.length > 100
                                                        ? item.description.substring(0, 100) + '...'
                                                        : item.description)
                                                    : "An innovative venture ready to disrupt the market."}
                                            </p>
                                        </div>

                                        {/* Action Section */}
                                        <div className="neo-card-footer">
                                            <button className="neo-btn-icon neo-preview" onClick={() => handlePreview(item._id)} title="Preview Live">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                                <span>View</span>
                                            </button>

                                            {currentUser && (currentUser.role === 'admin' || item.userId === currentUser.id) && (
                                                <div className="neo-admin-tools">
                                                    <button className="neo-btn-icon neo-edit" onClick={() => handleEditClick(item)} title="Edit">
                                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </button>
                                                    <button className="neo-btn-icon neo-delete" onClick={() => handleDelete(item._id)} disabled={deleting === item._id} title="Delete">
                                                        {deleting === item._id ? (
                                                            <svg className="spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                                                                <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
                                                            </svg>
                                                        ) : (
                                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        )}
                                                    </button>
                                                </div>
                                            )}
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

export default PortfolioList;