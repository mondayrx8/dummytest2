import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ setToken }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('token');
            setToken(null);
            navigate('/');
        }
    };

    return (
        <nav className="professional-navbar">
            <div className="navbar-container">
                <Link to="/dashboard" className="navbar-brand-link">
                    <span className="navbar-brand-icon">🚀</span>
                    <h2 className="navbar-brand">Entrepreneur Portfolio</h2>
                </Link>

                <div className="navbar-links">
                    <Link to="/dashboard" className="navbar-link">
                        <span className="link-icon">📚</span>
                        Portfolios
                    </Link>
                    <Link to="/create" className="navbar-link-create">
                        <span className="link-icon">➕</span>
                        Create New
                    </Link>
                    <button onClick={handleLogout} className="navbar-btn-logout">
                        <span className="link-icon">🚪</span>
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;