import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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

    return (
        <div className="dashboard-container">
            {/* Background Blobs (Green Theme) */}
            <div className="dashboard-bg">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
            </div>

            {/* Header / Top Bar */}
            <header className="dashboard-header glass-panel">
                <div className="header-content">
                    <h1>My Ventures</h1>
                    <div className="header-actions">
                        <button onClick={() => navigate('/create')} className="btn-primary-create">
                            <span className="icon">➕</span>
                            <span>New Project</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="dashboard-content">
                {portfolios.length === 0 ? (
                    <div className="empty-state-card glass-panel">
                        <div className="empty-graphic">🚀</div>
                        <h2>Ready to Launch?</h2>
                        <p>Start your first entrepreneurial portfolio and showcase your vision to the world.</p>
                        <button onClick={() => navigate('/create')} className="btn-primary-large">
                            Start Your First Pitch
                        </button>
                    </div>
                ) : (
                    <div className="portfolio-grid">
                        {/* Create New Card (First Item) */}
                        <div className="create-card glass-panel" onClick={() => navigate('/create')}>
                            <div className="create-icon-wrapper">
                                <span className="create-icon">➕</span>
                            </div>
                            <h3>Create New Venture</h3>
                        </div>

                        {/* Portfolio Cards */}
                        {portfolios.map((item) => (
                            <article key={item._id} className="portfolio-card glass-panel">
                                <div className="card-media">
                                    {item.image ? (
                                        <img src={item.image} alt={item.businessName} className="card-img" />
                                    ) : (
                                        <div className="card-placeholder">
                                            <span className="placeholder-icon">📷</span>
                                        </div>
                                    )}
                                    <div className="card-status-badge">Active</div>
                                </div>

                                <div className="card-body">
                                    <h3 className="card-title">{item.businessName}</h3>
                                    <p className="card-problem">
                                        {item.description
                                            ? (item.description.length > 80 ? item.description.substring(0, 80) + '...' : item.description)
                                            : "No description provided."}
                                    </p>
                                </div>

                                <div className="card-actions">
                                    <button
                                        className="action-btn preview"
                                        onClick={() => navigate('/investors')} // Preview links to Public View logic
                                        title="Preview Public View"
                                    >
                                        👁️
                                    </button>
                                    <button
                                        className="action-btn edit"
                                        onClick={() => handleEditClick(item)}
                                        title="Edit Portfolio"
                                    >
                                        ✏️
                                    </button>
                                    <button
                                        className="action-btn delete"
                                        onClick={() => handleDelete(item._id)}
                                        disabled={deleting === item._id}
                                        title="Delete Portfolio"
                                    >
                                        {deleting === item._id ? '⏳' : '🗑️'}
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default PortfolioList;