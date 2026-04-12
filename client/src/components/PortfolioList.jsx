import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import './PortfolioList.css';

const PortfolioList = ({ setCurrentPortfolio, currentUser }) => {
    const navigate = useNavigate();
    const [deleting, setDeleting] = useState(null);
    const [stats, setStats] = useState({ totalUsers: 0, totalVisits: 0 });
    const [dashboardPortfolios, setDashboardPortfolios] = useState([]);

    const fetchDashboardPortfolios = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('https://api.siswaniaga.my/api/portfolio/dashboard-list', {
                headers: { 'auth-token': token }
            });
            setDashboardPortfolios(res.data);
        } catch (err) {
            console.error("Error fetching dashboard portfolios:", err);
        }
    };

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get('https://api.siswaniaga.my/api/stats');
                setStats(res.data);
            } catch (err) {
                console.error("Error fetching stats", err);
            }
        };
        fetchStats();
        fetchDashboardPortfolios();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Eject this portfolio? This action cannot be reversed.')) {
            setDeleting(id);
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`https://api.siswaniaga.my/api/portfolio/delete/${id}`, {
                    headers: { 'auth-token': token }
                });
                fetchDashboardPortfolios();
            } catch (error) {
                console.error("Error deleting portfolio:", error);
                alert("Failed to delete portfolio. Please try again.");
            } finally {
                setDeleting(null);
            }
        }
    };

    const handleEditClick = (portfolio) => {
        setCurrentPortfolio(portfolio);
        navigate('/create');
    };

    return (
        <div className="dashboard-page">
            <div className="dashboard-container">

                {/* Header Area */}
                <header className="enterprise-header">
                    <div>
                        <h1 className="enterprise-title">Dashboard</h1>
                        <p style={{ color: 'var(--text-muted)', margin: '0.5rem 0 0 0' }}>Manage your university ventures.</p>
                    </div>
                    <button className="enterprise-btn-create" onClick={() => { setCurrentPortfolio(null); navigate('/create'); }}>
                        + New Portfolio
                    </button>
                </header>

                {/* Statistics Radar */}
                <section className="enterprise-stats">
                    <div className="stat-card-enterprise">
                        <h3 className="stat-label">Total Verified Users</h3>
                        <p className="stat-value">{stats.totalUsers}</p>
                    </div>
                    <div className="stat-card-enterprise">
                        <h3 className="stat-label">Total Visits</h3>
                        <p className="stat-value">{stats.totalVisits}</p>
                    </div>
                </section>

                {/* Portfolio Grid */}
                {dashboardPortfolios.length === 0 ? (
                    <div className="enterprise-empty-state">
                        <h3 style={{ color: 'var(--text-color)', marginBottom: '0.5rem' }}>No Portfolios Found</h3>
                        <p>You haven't created any pitches yet. Start building your business portfolio today.</p>
                    </div>
                ) : (
                    <section className="enterprise-grid">
                        {dashboardPortfolios.map((item) => (
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
                                        <button className="enterprise-btn" onClick={() => navigate(`/portfolio/${item._id}`)}>
                                            View
                                        </button>
                                        {(currentUser?.role === 'admin' || currentUser?.id === item.userId) && (
                                            <>
                                                <button className="enterprise-btn" onClick={() => handleEditClick(item)}>
                                                    Edit
                                                </button>
                                                <button
                                                    className="enterprise-btn danger"
                                                    onClick={() => handleDelete(item._id)}
                                                    disabled={deleting === item._id}
                                                >
                                                    {deleting === item._id ? 'Deleting...' : 'Delete'}
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </section>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default PortfolioList;