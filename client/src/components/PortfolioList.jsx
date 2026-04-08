import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import './PortfolioList.css';

const PortfolioList = ({ portfolios, onDelete, setCurrentPortfolio, currentUser }) => {
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

    const handlePreview = (id) => {
        navigate(`/portfolio/${id}`);
    };

    return (
        <div className="dashboard-page">
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
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                            <path d="M12 5v14M5 12h14"/>
                        </svg>
                        <span>New Venture</span>
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="dashboard-content">
                {portfolios.length === 0 ? (
                    <div className="empty-state premium-card">
                        <div className="empty-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" width="64" height="64">
                                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                            </svg>
                        </div>
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
                    <div className="venture-grid">
                        {/* Portfolio Cards */}
                        {portfolios.map((item) => (
                            <article key={item._id} className="venture-card premium-card">
                                {/* Card Media */}
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
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="40" height="40">
                                                <rect x="3" y="3" width="18" height="18" rx="2" />
                                                <circle cx="8.5" cy="8.5" r="1.5" />
                                                <path d="M21 15l-5-5L5 21" />
                                            </svg>
                                            <span className="placeholder-text">No Image</span>
                                        </div>
                                    )}
                                    {/* Category displayed here as a badge */}
                                    {item.category && (
                                        <div className="card-category-badge">{item.category}</div>
                                    )}
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
                                    {/* Everyone can preview */}
                                    <button
                                        className="btn-action preview-link"
                                        onClick={() => handlePreview(item._id)}
                                        title="Preview Public View"
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    </button>

                                    {/* RBAC check */}
                                    {currentUser && (currentUser.role === 'admin' || item.userId === currentUser.id) && (
                                        <div className="admin-actions">
                                            <button
                                                className="btn-action edit"
                                                onClick={() => handleEditClick(item)}
                                                title="Edit Portfolio"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="btn-action delete"
                                                onClick={() => handleDelete(item._id)}
                                                disabled={deleting === item._id}
                                                title="Delete Portfolio"
                                            >
                                                {deleting === item._id ? "..." : "Delete"}
                                            </button>
                                        </div>
                                    )}
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