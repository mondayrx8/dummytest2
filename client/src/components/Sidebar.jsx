import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

// SVG Icons Component
const Icons = {
    Brand: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
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
                    <span className={`brand-text ${isCollapsed ? 'hidden' : ''}`}>Portfolio</span>
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
