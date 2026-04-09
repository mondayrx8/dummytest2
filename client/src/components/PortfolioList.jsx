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
        <div className="enterprise-dashboard">
            <div className="enterprise-container">
                {/* Header */}
                <header className="enterprise-header">
                    <div className="header-title-wrapper">
                        <h1 className="enterprise-title">Ventures</h1>
                        <p className="enterprise-subtitle">Manage and oversee your portfolio projects.</p>
                    </div>
                    <button onClick={() => navigate('/create')} className="btn-enterprise-primary">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        Create New Pitch
                    </button>
                </header>

                {/* Statistics Radar */}
                <section className="enterprise-stats">
                    <div className="stat-card-enterprise">
                        <h3 className="stat-label">Total Users</h3>
                        <p className="stat-value">{stats.totalUsers}</p>
                    </div>
                    <div className="stat-card-enterprise">
                        <h3 className="stat-label">Platform Visits</h3>
                        <p className="stat-value">{stats.totalVisits}</p>
                    </div>
                </section>

                {/* Main Content Area */}
                <main>
                    {portfolios.length === 0 ? (
                        <div className="enterprise-empty-state">
                            <div className="empty-icon-wrap">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="48" height="48">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <h2 className="empty-title">No Portfolios Found</h2>
                            <p className="empty-desc">
                                Get started by creating your first portfolio. It will appear here once it has been saved.
                            </p>
                            <button onClick={() => navigate('/create')} className="btn-enterprise-primary">
                                Create New Pitch
                            </button>
                        </div>
                    ) : (
                        <div className="enterprise-grid">
                            {portfolios.map((item) => (
                                <article key={item._id} className="enterprise-card">
                                    {/* Media */}
                                    <div className="enterprise-card-media">
                                        {item.image ? (
                                            <img src={item.image} alt={item.businessName} className="enterprise-card-img" loading="lazy" />
                                        ) : (
                                            <div className="enterprise-card-no-img">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
                                                    <rect x="3" y="3" width="18" height="18" rx="2" />
                                                    <circle cx="8.5" cy="8.5" r="1.5" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 15l-5-5L5 21" />
                                                </svg>
                                                <span>No Media</span>
                                            </div>
                                        )}
                                        {item.category && (
                                            <span className="enterprise-badge">{item.category}</span>
                                        )}
                                    </div>

                                    {/* Body */}
                                    <div className="enterprise-card-body">
                                        <h3 className="enterprise-card-title">{item.businessName}</h3>
                                        <p className="enterprise-card-desc">
                                            {item.description
                                                ? (item.description.length > 100
                                                    ? item.description.substring(0, 100) + '...'
                                                    : item.description)
                                                : "No description provided."}
                                        </p>
                                    </div>

                                    {/* Footer */}
                                    <div className="enterprise-card-footer">
                                        <button className="btn-enterprise-text" onClick={() => handlePreview(item._id)}>
                                            View Details
                                        </button>

                                        {currentUser && (currentUser.role === 'admin' || item.userId === currentUser.id) && (
                                            <div className="enterprise-actions">
                                                <button className="btn-enterprise-action" onClick={() => handleEditClick(item)} title="Edit">
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                    Edit
                                                </button>
                                                <button className="btn-enterprise-action btn-enterprise-delete" onClick={() => handleDelete(item._id)} disabled={deleting === item._id} title="Delete">
                                                    {deleting === item._id ? (
                                                        <span>...</span>
                                                    ) : (
                                                        <>
                                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                            Delete
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        )}
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