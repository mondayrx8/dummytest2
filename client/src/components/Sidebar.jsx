import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

// SVG Icons Component
const Icons = {
    // DEPB Brand Logo (Emerald Green)
    Brand: () => (
        <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Stylized D with integrated bars */}
            <path d="M8 8h12a16 16 0 0 1 0 32H8V8z" stroke="#059669" strokeWidth="3" fill="none" />
            <rect x="28" y="24" width="4" height="16" rx="2" fill="#059669" />
            <rect x="34" y="18" width="4" height="22" rx="2" fill="#059669" />
            <rect x="40" y="12" width="4" height="28" rx="2" fill="#059669" />
        </svg>
    ),
    Dashboard: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="7" height="9" x="3" y="3" rx="1" />
            <rect width="7" height="5" x="14" y="3" rx="1" />
            <rect width="7" height="9" x="14" y="12" rx="1" />
            <rect width="7" height="5" x="3" y="16" rx="1" />
        </svg>
    ),
    Create: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12h8" />
            <path d="M12 8v8" />
        </svg>
    ),
    Public: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    ),
    CollapseLeft: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <path d="M9 3v18" />
            <path d="m14 9-3 3 3 3" />
        </svg>
    ),
    CollapseRight: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <path d="M9 3v18" />
            <path d="m13 15 3-3-3-3" />
        </svg>
    ),
    Logout: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" x2="9" y1="12" y2="12" />
        </svg>
    )
};

const Sidebar = ({ setToken, isCollapsed, toggleCollapse }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('token');
            setToken(null);
            navigate('/');
        }
    };

    const isActive = (path) => location.pathname === path;

    return (
        <aside className={`modern-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            {/* Header */}
            <div className="sidebar-header">
                <div className="sidebar-brand">
                    <span className="brand-icon">
                        <Icons.Brand />
                    </span>
                    <span className={`brand-text ${isCollapsed ? 'hidden' : ''}`}>DEPB</span>
                </div>
            </div>

            {/* Navigation Links */}
            <nav className="sidebar-menu">
                <Link
                    to="/dashboard"
                    className={`menu-item ${isActive('/dashboard') ? 'active' : ''}`}
                    title="Dashboard"
                >
                    <span className="menu-icon"><Icons.Dashboard /></span>
                    <span className={`menu-text ${isCollapsed ? 'hidden' : ''}`}>Dashboard</span>
                </Link>

                <Link
                    to="/create"
                    className={`menu-item ${isActive('/create') ? 'active' : ''}`}
                    title="Create New"
                >
                    <span className="menu-icon"><Icons.Create /></span>
                    <span className={`menu-text ${isCollapsed ? 'hidden' : ''}`}>Create New</span>
                </Link>

                <Link
                    to="/investors"
                    className={`menu-item ${isActive('/investors') ? 'active' : ''}`}
                    title="Public View"
                >
                    <span className="menu-icon"><Icons.Public /></span>
                    <span className={`menu-text ${isCollapsed ? 'hidden' : ''}`}>Public View</span>
                </Link>

                <div className="menu-divider"></div>

                {/* Collapse Toggle Button */}
                <button
                    onClick={toggleCollapse}
                    className="menu-item collapse-toggle-item"
                    title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
                >
                    <span className="menu-icon">
                        {isCollapsed ? <Icons.CollapseRight /> : <Icons.CollapseLeft />}
                    </span>
                    <span className={`menu-text ${isCollapsed ? 'hidden' : ''}`}>Collapse</span>
                </button>

                <button
                    onClick={handleLogout}
                    className="menu-item logout-item"
                    title="Logout"
                >
                    <span className="menu-icon"><Icons.Logout /></span>
                    <span className={`menu-text ${isCollapsed ? 'hidden' : ''}`}>Logout</span>
                </button>
            </nav>
        </aside>
    );
};

export default Sidebar;
