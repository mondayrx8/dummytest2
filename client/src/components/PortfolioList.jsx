import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Plus, Search, Eye, Pencil, Trash2,
    ChevronLeft, ChevronRight, Briefcase, Users,
    BarChart3, LayoutTemplate, Tag, ArrowUpDown,
    Filter, Inbox, Loader2, TrendingUp,
} from 'lucide-react';
import Footer from './Footer';
import './PortfolioList.css';

const CATEGORY_OPTIONS = [
    { value: '', label: 'All Categories' },
    { value: 'F&B', label: 'F&B' },
    { value: 'Tech & IT', label: 'Tech & IT' },
    { value: 'Retail/Apparel', label: 'Retail/Apparel' },
    { value: 'Services', label: 'Services' },
    { value: 'Other', label: 'Other' },
];

const SORT_OPTIONS = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'name_asc', label: 'Name A–Z' },
    { value: 'name_desc', label: 'Name Z–A' },
];

const CATEGORY_BADGE_CLASS = {
    'F&B': 'cat-badge--amber',
    'Tech & IT': 'cat-badge--sky',
    'Retail/Apparel': 'cat-badge--rose',
    'Services': 'cat-badge--emerald',
    'Other': 'cat-badge--zinc',
};

const PortfolioList = ({ setCurrentPortfolio, currentUser }) => {
    const navigate = useNavigate();

    // Core data
    const [dashboardPortfolios, setDashboardPortfolios] = useState([]);
    const [stats, setStats] = useState({ totalUsers: 0, totalVisits: 0 });
    const [analytics, setAnalytics] = useState({
        totalVentures: 0,
        categoryDistribution: [],
        templatePopularity: [],
    });
    const [isLoading, setIsLoading] = useState(true);
    const [deleting, setDeleting] = useState(null);

    // Server-side controls
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [sort, setSort] = useState('newest');

    // ───────────── Fetch Analytics & Stats ─────────────
    const fetchAnalyticsAndStats = async () => {
        try {
            const [statRes, analyticsRes] = await Promise.all([
                axios.get('https://api.siswaniaga.my/api/stats'),
                axios.get('https://api.siswaniaga.my/api/stats/analytics'),
            ]);
            setStats(statRes.data);
            setAnalytics(analyticsRes.data);
        } catch (err) {
            console.error(err);
        }
    };

    // ───────────── Fetch Portfolios ─────────────
    const fetchDashboardPortfolios = async () => {
        try {
            setIsLoading(true);
            const token = localStorage.getItem('token');
            const query = `?page=${page}&limit=10&search=${encodeURIComponent(
                search
            )}&category=${encodeURIComponent(category)}&sort=${sort}`;
            const res = await axios.get(
                `https://api.siswaniaga.my/api/portfolio/dashboard-list${query}`,
                { headers: { 'auth-token': token } }
            );
            setDashboardPortfolios(res.data.data || res.data);
            setTotalPages(res.data.totalPages || 1);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAnalyticsAndStats();
    }, []);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchDashboardPortfolios();
        }, 400);
        return () => clearTimeout(delayDebounceFn);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, search, category, sort]);

    // Reset to page 1 when filters change
    useEffect(() => {
        setPage(1);
    }, [search, category, sort]);

    // ───────────── Handlers ─────────────
    const handleDelete = async (id) => {
        if (!window.confirm('Delete this Landing Page? This action cannot be undone.')) return;
        setDeleting(id);
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`https://api.siswaniaga.my/api/portfolio/delete/${id}`, {
                headers: { 'auth-token': token },
            });
            fetchDashboardPortfolios();
            fetchAnalyticsAndStats();
        } catch (error) {
            console.error('Error deleting portfolio:', error);
            alert('Failed to delete portfolio. Please try again.');
        } finally {
            setDeleting(null);
        }
    };

    const handleEditClick = (portfolio) => {
        setCurrentPortfolio(portfolio);
        navigate('/create');
    };

    const handleCreate = () => {
        setCurrentPortfolio(null);
        navigate('/create');
    };

    // ───────────── Derived analytics ─────────────
    const categoryMax = useMemo(() => {
        const arr = analytics?.categoryDistribution || [];
        return Math.max(1, ...arr.map((c) => Number(c.count) || 0));
    }, [analytics]);

    const templateMax = useMemo(() => {
        const arr = analytics?.templatePopularity || [];
        return Math.max(1, ...arr.map((t) => Number(t.count) || 0));
    }, [analytics]);

    const isAdmin = currentUser?.role === 'admin';

    return (
        <main className="dashboard-page" aria-label="Dashboard">
            <div className="dashboard-container">
                {/* ───────────── Header ───────────── */}
                <header className="dashboard-header">
                    <div>
                        <div className="dashboard-live-badge">
                            <span className="dashboard-live-dot" aria-hidden="true" />
                            Live Operations
                        </div>
                        <h1 className="dashboard-title">Command Center</h1>
                        <p className="dashboard-subtitle">
                            Monitor ventures, analyze performance, and manage university business landing pages from a single workspace.
                        </p>
                    </div>
                    <button onClick={handleCreate} className="dashboard-create-btn">
                        <Plus />
                        Create Landing Page
                    </button>
                </header>

                {/* ───────────── Top Metrics ───────────── */}
                <section className="metrics-grid" aria-label="Key metrics">
                    <MetricCard
                        icon={<Briefcase />}
                        label="Total Ventures"
                        value={analytics.totalVentures}
                        iconClass="metric-card__icon--dark"
                    />
                    <MetricCard
                        icon={<Users />}
                        label="Registered Students"
                        value={stats.totalUsers}
                        iconClass="metric-card__icon--sky"
                    />
                    <MetricCard
                        icon={<TrendingUp />}
                        label="Total Visits"
                        value={stats.totalVisits}
                        iconClass="metric-card__icon--emerald"
                    />
                </section>

                {/* ───────────── Admin Analytics ───────────── */}
                {isAdmin && (
                    <section className="analytics-grid" aria-label="Analytics">
                        {/* Category Distribution */}
                        <div className="analytics-panel">
                            <div className="analytics-panel__header">
                                <div className="analytics-panel__icon" aria-hidden="true">
                                    <BarChart3 />
                                </div>
                                <div>
                                    <h2 className="analytics-panel__title">Category Distribution</h2>
                                    <p className="analytics-panel__desc">Ventures grouped by industry</p>
                                </div>
                            </div>
                            <div>
                                {(analytics.categoryDistribution || []).length === 0 ? (
                                    <p className="analytics-empty">No category data available.</p>
                                ) : (
                                    analytics.categoryDistribution.map((c) => {
                                        const name = c._id || c.name || c.category || 'Unknown';
                                        const count = Number(c.count) || 0;
                                        const pct = Math.round((count / categoryMax) * 100);
                                        return (
                                            <div key={name} className="analytics-bar">
                                                <div className="analytics-bar__header">
                                                    <span className="analytics-bar__name">{name}</span>
                                                    <span className="analytics-bar__count">{count}</span>
                                                </div>
                                                <div className="bar-track">
                                                    <div className="bar-fill" style={{ width: `${pct}%` }} />
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>

                        {/* Template Popularity */}
                        <div className="analytics-panel">
                            <div className="analytics-panel__header">
                                <div className="analytics-panel__icon" aria-hidden="true">
                                    <LayoutTemplate />
                                </div>
                                <div>
                                    <h2 className="analytics-panel__title">Template Usage</h2>
                                    <p className="analytics-panel__desc">Most popular themes across ventures</p>
                                </div>
                            </div>
                            <div className="template-grid">
                                {(analytics.templatePopularity || []).length === 0 ? (
                                    <p className="analytics-empty">No template data available.</p>
                                ) : (
                                    analytics.templatePopularity.map((t) => {
                                        const name = t._id || t.name || t.template || 'Unknown';
                                        const count = Number(t.count) || 0;
                                        const pct = Math.round((count / templateMax) * 100);
                                        return (
                                            <div key={name} className="template-card">
                                                <div className="template-card__header">
                                                    <p className="template-card__name">{name}</p>
                                                    <span className="template-card__count">{count}</span>
                                                </div>
                                                <div className="bar-track bar-track--sm">
                                                    <div className="bar-fill bar-fill--solid" style={{ width: `${pct}%` }} />
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </section>
                )}

                {/* ───────────── Toolbar ───────────── */}
                <div className="toolbar">
                    <div className="toolbar__inner">
                        <div className="toolbar-search">
                            <span className="toolbar-search__icon" aria-hidden="true"><Search /></span>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search ventures by name, founder, or slogan…"
                                className="toolbar-search__input"
                                aria-label="Search ventures"
                            />
                        </div>

                        <div className="toolbar-filters">
                            <SelectField
                                icon={<Filter />}
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                options={CATEGORY_OPTIONS}
                                label="Filter by category"
                            />
                            <SelectField
                                icon={<ArrowUpDown />}
                                value={sort}
                                onChange={(e) => setSort(e.target.value)}
                                options={SORT_OPTIONS}
                                label="Sort order"
                            />
                        </div>
                    </div>
                </div>

                {/* ───────────── Data Table ───────────── */}
                <div className="data-table-wrapper">
                    <div className="data-table-scroll">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Venture Name</th>
                                    <th>Category</th>
                                    <th>Theme Template</th>
                                    <th>Date Created</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? (
                                    [...Array(6)].map((_, i) => <SkeletonRow key={i} />)
                                ) : dashboardPortfolios.length === 0 ? (
                                    <tr>
                                        <td colSpan={5}>
                                            <EmptyState />
                                        </td>
                                    </tr>
                                ) : (
                                    dashboardPortfolios.map((item) => {
                                        const founderName =
                                            item.ourTeam && item.ourTeam.length > 0
                                                ? item.ourTeam[0].name
                                                : 'Founder';
                                        const itemCategory = item.category || 'Other';
                                        const template = item.theme || item.template || item.themeTemplate || '—';
                                        // Betulkan cara baca ID sebab item.userId sekarang adalah Populated Object dari MongoDB
                                        const itemOwnerId = item.userId?._id || item.userId;
                                        const currentUserId = currentUser?.id || currentUser?._id;
                                        const canEdit = currentUser?.role === 'admin' || String(currentUserId) === String(itemOwnerId);

                                        return (
                                            <tr key={item._id}>
                                                <td>
                                                    <div className="venture-cell">
                                                        <div className="venture-avatar">
                                                            {item.businessName?.charAt(0)?.toUpperCase() || 'V'}
                                                        </div>
                                                        <div style={{ minWidth: 0 }}>
                                                            <p className="venture-name">
                                                                {item.businessName || 'Untitled Venture'}
                                                            </p>
                                                            <p className="venture-founder">
                                                                By {founderName}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className={`cat-badge ${CATEGORY_BADGE_CLASS[itemCategory] || CATEGORY_BADGE_CLASS.Other}`}>
                                                        <Tag />
                                                        {itemCategory}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="template-cell">
                                                        <LayoutTemplate />
                                                        <span>{template}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="date-cell">
                                                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-MY', {
                                                            day: '2-digit',
                                                            month: 'short',
                                                            year: 'numeric'
                                                        }) : 'N/A'}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="actions-cell">
                                                        <IconButton
                                                            title="View"
                                                            onClick={() => navigate(`/portfolio/${item._id}`)}
                                                        >
                                                            <Eye />
                                                        </IconButton>
                                                        {canEdit && (
                                                            <>
                                                                <IconButton
                                                                    title="Edit"
                                                                    onClick={() => handleEditClick(item)}
                                                                >
                                                                    <Pencil />
                                                                </IconButton>
                                                                <IconButton
                                                                    title="Delete"
                                                                    danger
                                                                    disabled={deleting === item._id}
                                                                    onClick={() => handleDelete(item._id)}
                                                                >
                                                                    {deleting === item._id ? (
                                                                        <Loader2 className="animate-spin" />
                                                                    ) : (
                                                                        <Trash2 />
                                                                    )}
                                                                </IconButton>
                                                            </>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {!isLoading && dashboardPortfolios.length > 0 && (
                        <div className="pagination">
                            <p className="pagination__info">
                                Page <strong>{page}</strong> of <strong>{totalPages}</strong>
                            </p>
                            <div className="pagination__controls">
                                <button
                                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                                    disabled={page <= 1}
                                    className="page-btn"
                                >
                                    <ChevronLeft /> Previous
                                </button>
                                <PageIndicator page={page} totalPages={totalPages} onSelect={setPage} />
                                <button
                                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                    disabled={page >= totalPages}
                                    className="page-btn page-btn--dark"
                                >
                                    Next <ChevronRight />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </main>
    );
};

/* ───────────── Sub-components ───────────── */

const MetricCard = ({ icon, label, value, iconClass }) => (
    <div className="metric-card">
        <div className="metric-card__inner">
            <div>
                <p className="metric-card__label">{label}</p>
                <p className="metric-card__value">
                    {Number(value || 0).toLocaleString()}
                </p>
            </div>
            <div className={`metric-card__icon ${iconClass}`}>{icon}</div>
        </div>
    </div>
);

const SelectField = ({ icon, value, onChange, options, label }) => (
    <div className="toolbar-select">
        <span className="toolbar-select__icon" aria-hidden="true">{icon}</span>
        <select value={value} onChange={onChange} aria-label={label}>
            {options.map((o) => (
                <option key={o.value} value={o.value}>
                    {o.label}
                </option>
            ))}
        </select>
        <span className="toolbar-select__chevron" aria-hidden="true">
            <svg viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 011.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
        </span>
    </div>
);

const IconButton = ({ children, onClick, title, danger, disabled }) => (
    <button
        type="button"
        onClick={onClick}
        title={title}
        aria-label={title}
        disabled={disabled}
        className={`action-btn ${danger ? 'action-btn--danger' : ''}`}
    >
        {children}
    </button>
);

const SkeletonRow = () => (
    <tr className="skeleton-row" aria-hidden="true">
        <td>
            <div className="venture-cell">
                <div className="skeleton-block skeleton-avatar" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div className="skeleton-block skeleton-line skeleton-line--w40" />
                    <div className="skeleton-block skeleton-line--sm skeleton-line--w24" />
                </div>
            </div>
        </td>
        <td><div className="skeleton-block skeleton-badge" /></td>
        <td><div className="skeleton-block skeleton-line skeleton-line--w32" /></td>
        <td><div className="skeleton-block skeleton-line skeleton-line--w24" /></td>
        <td>
            <div className="actions-cell">
                <div className="skeleton-block skeleton-action" />
                <div className="skeleton-block skeleton-action" />
                <div className="skeleton-block skeleton-action" />
            </div>
        </td>
    </tr>
);

const EmptyState = () => (
    <div className="empty-state">
        <div className="empty-state__icon">
            <Inbox />
        </div>
        <h3 className="empty-state__title">No ventures match your filters</h3>
        <p className="empty-state__desc">
            Try adjusting your search, category, or sort options — or create your first landing page to get started.
        </p>
    </div>
);

const PageIndicator = ({ page, totalPages, onSelect }) => {
    const pages = [];
    const start = Math.max(1, Math.min(page - 2, totalPages - 4));
    const end = Math.min(totalPages, start + 4);
    for (let i = start; i <= end; i++) pages.push(i);

    return (
        <div className="page-indicators">
            {pages.map((p) => (
                <button
                    key={p}
                    onClick={() => onSelect(p)}
                    className={`page-indicator-btn ${p === page ? 'page-indicator-btn--active' : ''}`}
                >
                    {p}
                </button>
            ))}
        </div>
    );
};

export default PortfolioList;
