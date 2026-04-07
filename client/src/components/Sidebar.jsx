import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Icons = {
    Brand: () => (
        <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 10C10 7.79086 11.7909 6 14 6H24C32.8366 6 40 13.1634 40 22V26C40 34.8366 32.8366 42 24 42H14C11.7909 42 10 40.2091 10 38V10Z" stroke="currentColor" strokeWidth="3" fill="none" />
            <path d="M22 16L30 24L22 32" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="16" cy="24" r="2" fill="currentColor" />
        </svg>
    ),
    Dashboard: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="9" />
            <rect x="14" y="3" width="7" height="5" />
            <rect x="14" y="12" width="7" height="9" />
            <rect x="3" y="16" width="7" height="5" />
        </svg>
    ),
    Create: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12H16" />
            <path d="M12 8V16" />
        </svg>
    ),
    Public: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    ),
    CollapseLeft: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18L9 12L15 6" />
        </svg>
    ),
    CollapseRight: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18L15 12L9 6" />
        </svg>
    ),
    Logout: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5C4.44772 21 4 20.5523 4 20V4C4 3.44772 4.44772 3 5 3H9" />
            <path d="M16 17L21 12L16 7" />
            <path d="M21 12H9" />
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

    const getSidebarClass = () => {
        if (isCollapsed === 'mobile-open') return 'mobile-open';
        if (isCollapsed === true) return 'collapsed';
        return '';
    };

    return (
        <>
            <aside className={`modern-sidebar ${getSidebarClass()}`}>
                {/* Header */}
                <div className="sidebar-header">
                    <div className="sidebar-brand">
                        <span className="brand-icon">
                            <Icons.Brand />
                        </span>
                        {/* Title swapped to SiswaNiaga */}
                        <span className={`brand-text ${isCollapsed === true ? 'hidden' : ''}`}>SiswaNiaga</span>
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
                        <span className={`menu-text ${isCollapsed === true ? 'hidden' : ''}`}>Dashboard</span>
                    </Link>

                    <Link
                        to="/create"
                        className={`menu-item ${isActive('/create') ? 'active' : ''}`}
                        title="Create New"
                    >
                        <span className="menu-icon"><Icons.Create /></span>
                        <span className={`menu-text ${isCollapsed === true ? 'hidden' : ''}`}>Create New</span>
                    </Link>

                    <Link
                        to="/investors"
                        className={`menu-item ${isActive('/investors') ? 'active' : ''}`}
                        title="Public View"
                    >
                        <span className="menu-icon"><Icons.Public /></span>
                        <span className={`menu-text ${isCollapsed === true ? 'hidden' : ''}`}>Public View</span>
                    </Link>

                    <div className="menu-divider"></div>

                    {/* Collapse Toggle Button (Desktop Only) */}
                    <button
                        onClick={toggleCollapse}
                        className="menu-item collapse-toggle-item"
                        title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
                    >
                        <span className="menu-icon">
                            {isCollapsed === true ? <Icons.CollapseRight /> : <Icons.CollapseLeft />}
                        </span>
                        <span className={`menu-text ${isCollapsed === true ? 'hidden' : ''}`}>Collapse</span>
                    </button>

                    <button
                        onClick={handleLogout}
                        className="menu-item logout-item"
                        title="Logout"
                    >
                        <span className="menu-icon"><Icons.Logout /></span>
                        <span className={`menu-text ${isCollapsed === true ? 'hidden' : ''}`}>Logout</span>
                    </button>
                </nav>
            </aside>

            {/* Mobile Backdrop Overlay */}
            {isCollapsed === 'mobile-open' && (
                <div className="mobile-backdrop active" onClick={toggleCollapse}></div>
            )}
        </>
    );
};

export default Sidebar;
