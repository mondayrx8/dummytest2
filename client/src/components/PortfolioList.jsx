import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import './PortfolioList.css';

const PortfolioList = ({ portfolios, onDelete, setCurrentPortfolio }) => {
    const navigate = useNavigate();
    const [deleting, setDeleting] = useState(null);

    const handleDelete = async (id) => {
        if (!window.confirm("🗑️ Are you sure you want to delete this portfolio? This action cannot be undone.")) return;

        setDeleting(id);
        try {
            await axios.delete(`https://dummytest2.onrender.com/api/portfolio/delete/${id}`, {
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

    const handlePreview = () => {
        navigate('/investors');
    };

    return (
        <div className="dashboard-page">
            {/* Background Orbs */}
            <div className="dashboard-bg">
                <div className="orb orb-1"></div>
                <div className="orb orb-2"></div>
            </div>

            {/* Dashboard Header */}
            <header className="dashboard-header">
                <div className="header-content">
                    <div className="header-text">
                        <h1 className="header-title">My Ventures</h1>
                        <p className="header-subtitle">
                            Manage and showcase your entrepreneurial projects
                        </p>
                    </div>
                    <button
                        onClick={() => navigate('/create')}
                        className="btn-create"
                    >
                        <span className="btn-icon">✨</span>
                        <span>New Project</span>
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="dashboard-content">
                {portfolios.length === 0 ? (
                    /* Empty State */
                    <div className="empty-state glass-card">
                        <div className="empty-icon">🚀</div>
                        <h2 className="empty-title">Welcome, Entrepreneur!</h2>
                        <p className="empty-description">
                            You haven't created any portfolios yet. Start your first pitch
                            and showcase your innovative ideas to the world.
                        </p>
                        <button
                            onClick={() => navigate('/create')}
                            className="btn-start"
                        >
                            <span>Start Your First Pitch</span>
                            <span className="btn-arrow">→</span>
                        </button>
                    </div>
                ) : (
                    /* Portfolio Grid */
                    <div className="portfolio-grid">
                        {/* Create New Card */}
                        <div
                            className="create-card"
                            onClick={() => navigate('/create')}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && navigate('/create')}
                        >
                            <div className="create-icon">
                                <span>+</span>
                            </div>
                            <h3 className="create-title">Create New Venture</h3>
                            <p className="create-subtitle">Start a new project</p>
                        </div>

                        {/* Portfolio Cards */}
                        {portfolios.map((item) => (
                            <article key={item._id} className="portfolio-card glass-card">
                                {/* Card Image */}
                                <div className="card-media">
                                    {item.image ? (
                                        <img
                                            src={item.image}
                                            alt={item.businessName}
                                            className="card-image"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="card-placeholder">
                                            <span className="placeholder-icon">📷</span>
                                            <span className="placeholder-text">No Image</span>
                                        </div>
                                    )}
                                    <div className="card-badge">Active</div>
                                </div>

                                {/* Card Body */}
                                <div className="card-body">
                                    <h3 className="card-title">{item.businessName}</h3>
                                    <p className="card-description">
                                        {item.description
                                            ? (item.description.length > 90
                                                ? item.description.substring(0, 90) + '...'
                                                : item.description)
                                            : "No description provided."}
                                    </p>
                                </div>

                                {/* Card Actions */}
                                <div className="card-actions">
                                    <button
                                        className="action-btn preview"
                                        onClick={handlePreview}
                                        title="Preview Public View"
                                        aria-label="Preview portfolio"
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    </button>
                                    <button
                                        className="action-btn edit"
                                        onClick={() => handleEditClick(item)}
                                        title="Edit Portfolio"
                                        aria-label="Edit portfolio"
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                        </svg>
                                    </button>
                                    <button
                                        className="action-btn delete"
                                        onClick={() => handleDelete(item._id)}
                                        disabled={deleting === item._id}
                                        title="Delete Portfolio"
                                        aria-label="Delete portfolio"
                                    >
                                        {deleting === item._id ? (
                                            <span className="spinner-small"></span>
                                        ) : (
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <polyline points="3 6 5 6 21 6" />
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default PortfolioList;