import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Plus,
    Search,
    Eye,
    Pencil,
    Trash2,
    ChevronLeft,
    ChevronRight,
    Briefcase,
    Users,
    BarChart3,
    LayoutTemplate,
    Tag,
    ArrowUpDown,
    Filter,
    Inbox,
    Loader2,
    TrendingUp,
} from 'lucide-react';
import Footer from './Footer';

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

const CATEGORY_BADGE = {
    'F&B': 'bg-amber-50 text-amber-700 ring-amber-200',
    'Tech & IT': 'bg-sky-50 text-sky-700 ring-sky-200',
    'Retail/Apparel': 'bg-rose-50 text-rose-700 ring-rose-200',
    'Services': 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    'Other': 'bg-zinc-100 text-zinc-700 ring-zinc-200',
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
        <div className="min-h-screen bg-zinc-50 text-zinc-900">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
                {/* ───────────── Header ───────────── */}
                <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
                    <div>
                        <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">
                            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                            Live Operations
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900">
                            Command Center
                        </h1>
                        <p className="mt-1.5 text-sm text-zinc-500 max-w-xl">
                            Monitor ventures, analyze performance, and manage university business landing pages from a single workspace.
                        </p>
                    </div>
                    <button
                        onClick={handleCreate}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white shadow-sm ring-1 ring-zinc-900/10 hover:bg-zinc-800 active:scale-[0.98] transition-all"
                    >
                        <Plus className="h-4 w-4" />
                        Create Landing Page
                    </button>
                </header>

                {/* ───────────── Top Metrics ───────────── */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    <MetricCard
                        icon={<Briefcase className="h-5 w-5" />}
                        label="Total Ventures"
                        value={analytics.totalVentures}
                        accent="bg-zinc-900 text-white"
                    />
                    <MetricCard
                        icon={<Users className="h-5 w-5" />}
                        label="Registered Students"
                        value={stats.totalUsers}
                        accent="bg-sky-50 text-sky-700 ring-1 ring-sky-200"
                    />
                    <MetricCard
                        icon={<TrendingUp className="h-5 w-5" />}
                        label="Total Visits"
                        value={stats.totalVisits}
                        accent="bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                    />
                </section>

                {/* ───────────── Admin Analytics ───────────── */}
                {isAdmin && (
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
                        {/* Category Distribution */}
                        <div className="rounded-2xl bg-white ring-1 ring-zinc-200 p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-5">
                                <div className="flex items-center gap-2.5">
                                    <div className="grid place-items-center h-9 w-9 rounded-lg bg-zinc-900 text-white">
                                        <BarChart3 className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <h2 className="text-sm font-semibold text-zinc-900">Category Distribution</h2>
                                        <p className="text-xs text-zinc-500">Ventures grouped by industry</p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                {(analytics.categoryDistribution || []).length === 0 ? (
                                    <p className="text-sm text-zinc-400 italic">No category data available.</p>
                                ) : (
                                    analytics.categoryDistribution.map((c) => {
                                        const name = c._id || c.name || c.category || 'Unknown';
                                        const count = Number(c.count) || 0;
                                        const pct = Math.round((count / categoryMax) * 100);
                                        return (
                                            <div key={name}>
                                                <div className="flex items-center justify-between text-sm mb-1.5">
                                                    <span className="font-medium text-zinc-700">{name}</span>
                                                    <span className="tabular-nums text-zinc-500">{count}</span>
                                                </div>
                                                <div className="h-2 w-full rounded-full bg-zinc-100 overflow-hidden">
                                                    <div
                                                        className="h-full rounded-full bg-gradient-to-r from-zinc-800 to-zinc-600 transition-all duration-500"
                                                        style={{ width: `${pct}%` }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>

                        {/* Template Popularity */}
                        <div className="rounded-2xl bg-white ring-1 ring-zinc-200 p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-5">
                                <div className="flex items-center gap-2.5">
                                    <div className="grid place-items-center h-9 w-9 rounded-lg bg-zinc-900 text-white">
                                        <LayoutTemplate className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <h2 className="text-sm font-semibold text-zinc-900">Template Usage</h2>
                                        <p className="text-xs text-zinc-500">Most popular themes across ventures</p>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {(analytics.templatePopularity || []).length === 0 ? (
                                    <p className="text-sm text-zinc-400 italic col-span-full">No template data available.</p>
                                ) : (
                                    analytics.templatePopularity.map((t) => {
                                        const name = t._id || t.name || t.template || 'Unknown';
                                        const count = Number(t.count) || 0;
                                        const pct = Math.round((count / templateMax) * 100);
                                        return (
                                            <div
                                                key={name}
                                                className="rounded-xl ring-1 ring-zinc-200 bg-zinc-50/60 p-4 hover:ring-zinc-300 transition"
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <p className="text-sm font-medium text-zinc-800 truncate">{name}</p>
                                                    <span className="text-xs font-semibold tabular-nums text-zinc-900 bg-white ring-1 ring-zinc-200 rounded-md px-1.5 py-0.5">
                                                        {count}
                                                    </span>
                                                </div>
                                                <div className="h-1.5 w-full rounded-full bg-zinc-200 overflow-hidden">
                                                    <div
                                                        className="h-full rounded-full bg-zinc-900 transition-all duration-500"
                                                        style={{ width: `${pct}%` }}
                                                    />
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
                <div className="rounded-2xl bg-white ring-1 ring-zinc-200 shadow-sm p-4 sm:p-5 mb-4">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                        <div className="relative flex-1">
                            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search ventures by name, founder, or slogan…"
                                className="w-full h-11 rounded-xl bg-zinc-50 ring-1 ring-zinc-200 pl-10 pr-4 text-sm text-zinc-900 placeholder:text-zinc-400 focus:bg-white focus:ring-zinc-900 focus:outline-none transition"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <SelectField
                                icon={<Filter className="h-4 w-4 text-zinc-400" />}
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                options={CATEGORY_OPTIONS}
                            />
                            <SelectField
                                icon={<ArrowUpDown className="h-4 w-4 text-zinc-400" />}
                                value={sort}
                                onChange={(e) => setSort(e.target.value)}
                                options={SORT_OPTIONS}
                            />
                        </div>
                    </div>
                </div>

                {/* ───────────── Data Table ───────────── */}
                <div className="rounded-2xl bg-white ring-1 ring-zinc-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead>
                                <tr className="bg-zinc-50/70 border-b border-zinc-200">
                                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                                        Venture Name
                                    </th>
                                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                                        Category
                                    </th>
                                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                                        Theme Template
                                    </th>
                                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                                        Date Created
                                    </th>
                                    <th className="px-6 py-3.5 text-right text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100">
                                {isLoading ? (
                                    [...Array(6)].map((_, i) => <SkeletonRow key={i} />)
                                ) : dashboardPortfolios.length === 0 ? (
                                    <tr>
                                        <td colSpan={4}>
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
                                            <tr key={item._id} className="hover:bg-zinc-50/60 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="grid place-items-center h-9 w-9 rounded-lg bg-zinc-100 ring-1 ring-zinc-200 text-zinc-600 font-semibold text-sm shrink-0">
                                                            {item.businessName?.charAt(0)?.toUpperCase() || 'V'}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="font-medium text-zinc-900 truncate">
                                                                {item.businessName || 'Untitled Venture'}
                                                            </p>
                                                            <p className="text-xs text-zinc-500 truncate">
                                                                By {founderName}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${CATEGORY_BADGE[itemCategory] || CATEGORY_BADGE.Other
                                                            }`}
                                                    >
                                                        <Tag className="h-3 w-3" />
                                                        {itemCategory}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="inline-flex items-center gap-2 text-zinc-700">
                                                        <LayoutTemplate className="h-4 w-4 text-zinc-400" />
                                                        <span className="text-sm">{template}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-sm text-zinc-500">
                                                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-MY', {
                                                            day: '2-digit',
                                                            month: 'short',
                                                            year: 'numeric'
                                                        }) : 'N/A'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <IconButton
                                                            title="View"
                                                            onClick={() => navigate(`/portfolio/${item._id}`)}
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </IconButton>
                                                        {canEdit && (
                                                            <>
                                                                <IconButton
                                                                    title="Edit"
                                                                    onClick={() => handleEditClick(item)}
                                                                >
                                                                    <Pencil className="h-4 w-4" />
                                                                </IconButton>
                                                                <IconButton
                                                                    title="Delete"
                                                                    danger
                                                                    disabled={deleting === item._id}
                                                                    onClick={() => handleDelete(item._id)}
                                                                >
                                                                    {deleting === item._id ? (
                                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                                    ) : (
                                                                        <Trash2 className="h-4 w-4" />
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
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-zinc-200 bg-zinc-50/40 px-6 py-4">
                            <p className="text-xs text-zinc-500">
                                Page <span className="font-semibold text-zinc-900">{page}</span> of{' '}
                                <span className="font-semibold text-zinc-900">{totalPages}</span>
                            </p>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                                    disabled={page <= 1}
                                    className="inline-flex items-center gap-1.5 rounded-lg bg-white ring-1 ring-zinc-200 px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-50 hover:ring-zinc-300 disabled:opacity-40 disabled:cursor-not-allowed transition"
                                >
                                    <ChevronLeft className="h-3.5 w-3.5" />
                                    Previous
                                </button>
                                <PageIndicator page={page} totalPages={totalPages} onSelect={setPage} />
                                <button
                                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                    disabled={page >= totalPages}
                                    className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 ring-1 ring-zinc-900 px-3 py-2 text-xs font-medium text-white hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition"
                                >
                                    Next
                                    <ChevronRight className="h-3.5 w-3.5" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

/* ───────────── Sub-components ───────────── */

const MetricCard = ({ icon, label, value, accent }) => (
    <div className="rounded-2xl bg-white ring-1 ring-zinc-200 p-5 shadow-sm hover:shadow-md hover:ring-zinc-300 transition-all">
        <div className="flex items-start justify-between">
            <div>
                <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{label}</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 tabular-nums">
                    {Number(value || 0).toLocaleString()}
                </p>
            </div>
            <div className={`grid place-items-center h-10 w-10 rounded-xl ${accent}`}>{icon}</div>
        </div>
    </div>
);

const SelectField = ({ icon, value, onChange, options }) => (
    <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">{icon}</span>
        <select
            value={value}
            onChange={onChange}
            className="appearance-none w-full sm:w-52 h-11 rounded-xl bg-zinc-50 ring-1 ring-zinc-200 pl-9 pr-9 text-sm text-zinc-900 focus:bg-white focus:ring-zinc-900 focus:outline-none transition cursor-pointer"
        >
            {options.map((o) => (
                <option key={o.value} value={o.value}>
                    {o.label}
                </option>
            ))}
        </select>
        <svg
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
        >
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 011.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
    </div>
);

const IconButton = ({ children, onClick, title, danger, disabled }) => (
    <button
        type="button"
        onClick={onClick}
        title={title}
        aria-label={title}
        disabled={disabled}
        className={`grid place-items-center h-8 w-8 rounded-lg ring-1 transition-colors ${danger
            ? 'text-rose-600 ring-rose-200 hover:bg-rose-50 hover:ring-rose-300'
            : 'text-zinc-600 ring-zinc-200 hover:bg-zinc-100 hover:text-zinc-900'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
        {children}
    </button>
);

const SkeletonRow = () => (
    <tr className="animate-pulse">
        <td className="px-6 py-4">
            <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-zinc-200" />
                <div className="space-y-2">
                    <div className="h-3 w-40 bg-zinc-200 rounded" />
                    <div className="h-2.5 w-24 bg-zinc-100 rounded" />
                </div>
            </div>
        </td>
        <td className="px-6 py-4">
            <div className="h-6 w-20 bg-zinc-200 rounded-full" />
        </td>
        <td className="px-6 py-4">
            <div className="h-3 w-32 bg-zinc-200 rounded" />
        </td>
        <td className="px-6 py-4">
            <div className="flex items-center justify-end gap-1">
                <div className="h-8 w-8 bg-zinc-200 rounded-lg" />
                <div className="h-8 w-8 bg-zinc-200 rounded-lg" />
                <div className="h-8 w-8 bg-zinc-200 rounded-lg" />
            </div>
        </td>
    </tr>
);

const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
        <div className="grid place-items-center h-14 w-14 rounded-2xl bg-zinc-100 ring-1 ring-zinc-200 text-zinc-400 mb-4">
            <Inbox className="h-6 w-6" />
        </div>
        <h3 className="text-base font-semibold text-zinc-900">No ventures match your filters</h3>
        <p className="mt-1 text-sm text-zinc-500 max-w-sm">
            Try adjusting your search, category, or sort options — or create your first landing page to get started.
        </p>
    </div>
);

const PageIndicator = ({ page, totalPages, onSelect }) => {
    // compact indicator: show up to 5 pages around current
    const pages = [];
    const start = Math.max(1, Math.min(page - 2, totalPages - 4));
    const end = Math.min(totalPages, start + 4);
    for (let i = start; i <= end; i++) pages.push(i);

    return (
        <div className="hidden sm:flex items-center gap-1 mx-1">
            {pages.map((p) => (
                <button
                    key={p}
                    onClick={() => onSelect(p)}
                    className={`min-w-[32px] h-8 px-2 text-xs font-medium rounded-lg transition ${p === page
                        ? 'bg-zinc-900 text-white ring-1 ring-zinc-900'
                        : 'text-zinc-600 ring-1 ring-zinc-200 hover:bg-zinc-50 hover:ring-zinc-300'
                        }`}
                >
                    {p}
                </button>
            ))}
        </div>
    );
};

export default PortfolioList;
