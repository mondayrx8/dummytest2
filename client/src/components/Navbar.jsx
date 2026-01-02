import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ setToken }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null); // Clear token state to trigger re-render
        navigate('/');
    };

    return (
        <nav className="navbar">
            <Link to="/dashboard" className="nav-brand-link">
                <h2 className="nav-brand">🚀 Entrepreneur Portfolio</h2>
            </Link>
            <div className="nav-links">
                <Link to="/dashboard" className="nav-link">All Portfolios</Link>
                <Link to="/create" className="nav-link-create">+ Build New</Link>
                <button onClick={handleLogout} className="nav-btn-logout">Logout</button>
            </div>
        </nav>
    );
};

export default Navbar;