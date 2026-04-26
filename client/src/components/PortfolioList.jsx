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
        if (window.confirm('Delete this Landing Page? This action cannot be undone.')) {
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

                <header className="enterprise-header">
                    <div>
                        <h1 className="enterprise-title">Dashboard</h1>
                        <p className="enterprise-subtitle">Manage your university business Landing Page.</p>
                    </div>
                    <button className="enterprise-btn-create" onClick={() => { setCurrentPortfolio(null); navigate('/create'); }}>
                        + Create Landing Page
                    </button>
                </header>

                <section className="enterprise-stats">
                    <div className="stat-card-enterprise">
                        <h3 className="stat-label">Total Users</h3>
                        <p className="stat-value">{stats.totalUsers}</p>
                    </div>
                    <div className="stat-card-enterprise">
                        <h3 className="stat-label">Total Visits</h3>
                        <p className="stat-value">{stats.totalVisits}</p>
                    </div>
                </section>

                {dashboardPortfolios.length === 0 ? (
                    <div className="enterprise-empty-state">
                        <h3>No Landing Page Found</h3>
                        <p>You haven't built anything yet. Start your first project today.</p>
                    </div>
                ) : (
                    <section className="enterprise-grid">
                        {dashboardPortfolios.map((item) => {
                            // AMBIL GAMBAR PERTAMA DARI PRODUK ATAU PASUKAN SEBAGAI THUMBNAIL
                            let thumbnail = null;
                            if (item.products && item.products.length > 0 && item.products[0].image) {
                                thumbnail = item.products[0].image;
                            } else if (item.ourTeam && item.ourTeam.length > 0 && item.ourTeam[0].image) {
                                thumbnail = item.ourTeam[0].image;
                            } else if (item.missionVision?.graphicInfo) {
                                thumbnail = item.missionVision.graphicInfo;
                            }

                            // CARI NAMA FOUNDER DARI ARRAY TEAM
                            const founderName = item.ourTeam && item.ourTeam.length > 0 ? item.ourTeam[0].name : "Founder";

                            return (
                                <article key={item._id} className="enterprise-card">
                                    {thumbnail ? (
                                        <img src={thumbnail} alt={item.businessName} className="enterprise-card-image" loading="lazy" />
                                    ) : (
                                        <div className="card-placeholder">
                                            No Image
                                        </div>
                                    )}

                                    <div className="enterprise-card-content">
                                        <h3 className="enterprise-business-name">{item.businessName}</h3>
                                        <p className="enterprise-student-name">By: {founderName}</p>
                                        <p className="enterprise-description">
                                            {item.slogan ? (item.slogan.length > 100 ? item.slogan.substring(0, 100) + '...' : item.slogan) : "No slogan provided."}
                                        </p>

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
                            );
                        })}
                    </section>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default PortfolioList;