import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';
// v2.0 - Clean sidebar without profile

const Sidebar = ({ setToken }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('token');
            setToken(null);
            navigate('/');
        }
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <aside className={`modern-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            {/* Header */}
            <div className="sidebar-header">
                <div className="sidebar-brand">
                    <span className="brand-icon">🚀</span>
                    {!isCollapsed && <span className="brand-text">Portfolio</span>}
                </div>
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="collapse-btn"
                    title={isCollapsed ? 'Expand' : 'Collapse'}
                >
                    <span className="collapse-icon">☰</span>
                </button>
            </div>

            {/* Navigation Links */}
            <nav className="sidebar-menu">
                <Link
                    to="/dashboard"
                    className={`menu-item ${isActive('/dashboard') ? 'active' : ''}`}
                    title="Dashboard"
                >
                    <span className="menu-icon">📊</span>
                    {!isCollapsed && <span className="menu-text">Dashboard</span>}
                </Link>

                <Link
                    to="/create"
                    className={`menu-item ${isActive('/create') ? 'active' : ''}`}
                    title="Create New"
                >
                    <span className="menu-icon">➕</span>
                    {!isCollapsed && <span className="menu-text">Create New</span>}
                </Link>

                <Link
                    to="/investors"
                    className={`menu-item ${isActive('/investors') ? 'active' : ''}`}
                    title="Public View"
                >
                    <span className="menu-icon">👁️</span>
                    {!isCollapsed && <span className="menu-text">Public View</span>}
                </Link>

                <div className="menu-divider"></div>

                <button
                    onClick={handleLogout}
                    className="menu-item logout-item"
                    title="Logout"
                >
                    <span className="menu-icon">🚪</span>
                    {!isCollapsed && <span className="menu-text">Logout</span>}
                </button>
            </nav>
        </aside>
    );
};

export default Sidebar;
