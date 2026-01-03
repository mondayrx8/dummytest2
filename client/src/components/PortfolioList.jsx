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
            await axios.delete(`http://localhost:5000/api/portfolio/delete/${id}`, {
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

    return (
        <div className="dashboard-list-container">
            {/* Third Gradient Blob */}
            <div className="dashboard-gradient-blob-3"></div>

            {/* Hero Section */}
            <header className="dashboard-hero">
                <div className="dashboard-hero-content">
                    <h1 className="dashboard-hero-title">Your Portfolio Collection</h1>
                    <p className="dashboard-hero-subtitle">
                        Manage and showcase your entrepreneurial ventures
                    </p>
                </div>
            </header>

            {/* Main Content */}
            <main className="dashboard-main-content">
                {portfolios.length === 0 ? (
                    <div className="dashboard-empty-state">
                        <div className="empty-icon">📂</div>
                        <h3>No Portfolios Yet</h3>
                        <p>Start building your entrepreneurial portfolio today!</p>
                        <button onClick={() => navigate('/create')} className="btn-create-first">
                            Create Your First Portfolio
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="dashboard-stats">
                            <div className="stat-card">
                                <span className="stat-value">{portfolios.length}</span>
                                <span className="stat-label">Total Portfolios</span>
                            </div>
                        </div>

                        <div className="dashboard-portfolio-grid">
                            {portfolios.map((item) => (
                                <article key={item._id} className="dashboard-portfolio-card">
                                    <div className="dashboard-card-image-wrapper">
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={item.businessName}
                                                className="dashboard-card-image"
                                            />
                                        ) : (
                                            <div className="dashboard-card-image-placeholder">
                                                <span className="dashboard-placeholder-icon">🎯</span>
                                                <span className="dashboard-placeholder-text">No Image</span>
                                            </div>
                                        )}
                                        <div className="dashboard-card-overlay"></div>
                                    </div>

                                    <div className="dashboard-card-content">
                                        <div className="dashboard-card-header">
                                            <h3 className="dashboard-business-name">{item.businessName}</h3>
                                            <div className="dashboard-student-info">
                                                <span className="dashboard-student-icon">👨‍💼</span>
                                                <span className="dashboard-student-name">{item.studentName}</span>
                                            </div>
                                            {/* Show Team Members if they exist */}
                                            {item.teamMembers && (
                                                <div className="dashboard-team-info">
                                                    <span className="dashboard-team-icon">🤝</span>
                                                    <div className="dashboard-team-content">
                                                        <span className="dashboard-team-label">Team Members</span>
                                                        <span className="dashboard-team-members">{item.teamMembers}</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="dashboard-card-body">
                                            <div className="dashboard-info-section">
                                                <div className="dashboard-section-badge pitch">
                                                    <span className="badge-icon">💡</span>
                                                    <span className="badge-text">Pitch</span>
                                                </div>
                                                <p className="dashboard-section-content">{item.description}</p>
                                            </div>

                                            <div className="dashboard-info-section">
                                                <div className="dashboard-section-badge market">
                                                    <span className="badge-icon">📊</span>
                                                    <span className="badge-text">Market Size</span>
                                                </div>
                                                <p className="dashboard-section-content market-size">{item.marketSize}</p>
                                            </div>
                                        </div>

                                        <div className="dashboard-card-actions">
                                            <button
                                                onClick={() => handleEditClick(item)}
                                                className="dashboard-btn-edit"
                                            >
                                                <span className="btn-icon">✏️</span>
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => handleDelete(item._id)}
                                                className="dashboard-btn-delete"
                                                disabled={deleting === item._id}
                                            >
                                                <span className="btn-icon">{deleting === item._id ? '⏳' : '🗑️'}</span>
                                                {deleting === item._id ? 'Deleting...' : 'Delete'}
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </>
                )}
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default PortfolioList;