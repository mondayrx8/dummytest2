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
    LayoutTemplate,
    ArrowUpDown,
    Filter,
    Inbox,
    Loader2,
    TrendingUp,
    Rows3,
    Rows4,
    X,
} from 'lucide-react';
import Footer from './Footer';

/* ────────────────────────────────────────────────────────────────────────
   DESIGN SYSTEM — declared per skill.md (Step 3) before any markup.
   Palette  : "Minimal professional" — teal-blue primary in oklch,
              deep ink, paper neutrals, single warm amber for live pulses.
   Type     : Space Grotesk (display) · Outfit (body) · JetBrains Mono (nums).
              Explicitly avoiding Inter / Roboto / Arial / Fraunces / system-ui.
   Radius   : Hierarchical — 18px cards, 10px controls, 999px capsules.
   Shadow   : Two elevation tiers (resting / hovered). No drop-shadow on data.
   Motion   : 200ms ease-out; reduced-motion honored.
──────────────────────────────────────────────────────────────────────── */

const CATEGORY_OPTIONS = [
    { value: '', label: 'All Categories' },
    { value: 'F&B', label: 'F&B' },
    { value: 'Tech & IT', label: 'Tech & IT' },
    { value: 'Retail/Apparel', label: 'Retail/Apparel' },
    { value: 'Services', label: 'Services' },
    { value: 'Other', label: 'Other' },
];

const SORT_OPTIONS = [
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', label: 'Oldest' },
    { value: 'name_asc', label: 'A–Z' },
    { value: 'name_desc', label: 'Z–A' },
];

// Single-source category color map (no gradients, no rainbow — derived hues only).
const CATEGORY_DOT = {
    'F&B': 'var(--cat-fb)',
    'Tech & IT': 'var(--cat-tech)',
    'Retail/Apparel': 'var(--cat-retail)',
    'Services': 'var(--cat-services)',
    'Other': 'var(--cat-other)',
};

const PortfolioList = ({ setCurrentPortfolio, currentUser }) => {
    const navigate = useNavigate();

    // ── Core data ───────────────────────────────────────────────────────
    const [dashboardPortfolios, setDashboardPortfolios] = useState([]);
    const [stats, setStats] = useState({ totalUsers: 0, totalVisits: 0 });
    const [analytics, setAnalytics] = useState({
        totalVentures: 0,
        categoryDistribution: [],
        templatePopularity: [],
    });
    const [isLoading, setIsLoading] = useState(true);
    const [deleting, setDeleting] = useState(null);

    // ── Server-side controls ────────────────────────────────────────────
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [sort, setSort] = useState('newest');

    // ── Tweak: density (skill.md guidance — add 1–2 creative tweaks) ────
    const [density, setDensity] = useState('comfortable'); // 'comfortable' | 'compact'

    // ── Live clock for the editorial header ─────────────────────────────
    const [now, setNow] = useState(() => new Date());
    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 60_000);
        return () => clearInterval(id);
    }, []);

    // ── Fetch Analytics & Stats ─────────────────────────────────────────
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

    // ── Fetch Portfolios ────────────────────────────────────────────────
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

    useEffect(() => {
        setPage(1);
    }, [search, category, sort]);

    // ── Handlers ────────────────────────────────────────────────────────
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

    // ── Derived analytics ───────────────────────────────────────────────
    const categoryMax = useMemo(() => {
        const arr = analytics?.categoryDistribution || [];
        return Math.max(1, ...arr.map((c) => Number(c.count) || 0));
    }, [analytics]);

    const templateMax = useMemo(() => {
        const arr = analytics?.templatePopularity || [];
        return Math.max(1, ...arr.map((t) => Number(t.count) || 0));
    }, [analytics]);

    const isAdmin = currentUser?.role === 'admin';

    const greetingName =
        currentUser?.name?.split(' ')[0] ||
        currentUser?.username ||
        'there';

    const dateLabel = now.toLocaleDateString(undefined, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    });

    const rowPad = density === 'compact' ? 'py-2.5' : 'py-4';

    return (
        <>
            {/* Scoped tokens + fonts. Kept inline so the makeover is self-contained. */}
            <ScopedStyles />

            <div className="dash-root min-h-screen">
                <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10 py-8 lg:py-12">
                    {/* ──────────── Editorial Header ──────────── */}
                    <header className="mb-10 lg:mb-12">
                        <div className="flex flex-wrap items-end justify-between gap-6">
                            <div className="max-w-2xl">
                                <div className="dash-eyebrow">
                                    <span className="dash-pulse" aria-hidden="true" />
                                    <span>Live · {dateLabel}</span>
                                </div>
                                <h1 className="dash-display mt-3">
                                    Good {hourGreeting(now)}, <span className="dash-display-accent">{greetingName}</span>.
                                </h1>
                                <p className="dash-lede mt-3">
                                    A bird&apos;s-eye view of every student venture, surfaced with the
                                    metrics you actually care about. Search, filter, and ship.
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                <DensityToggle value={density} onChange={setDensity} />
                                <button
                                    onClick={handleCreate}
                                    className="dash-cta"
                                    type="button"
                                >
                                    <Plus className="h-4 w-4" strokeWidth={2.25} />
                                    <span>New Landing Page</span>
                                </button>
                            </div>
                        </div>
                    </header>

                    {/* ──────────── Asymmetric Metrics Row ──────────── */}
                    <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                        {/* Hero metric — spans 2 cols on lg */}
                        <HeroMetric
                            label="Total Ventures"
                            value={analytics.totalVentures}
                            sublabel="Across all categories"
                            icon={<Briefcase className="h-5 w-5" />}
                            spark={(analytics.categoryDistribution || []).map((c) => Number(c.count) || 0)}
                        />
                        <SatelliteMetric
                            label="Registered Students"
                            value={stats.totalUsers}
                            icon={<Users className="h-4 w-4" />}
                        />
                        <SatelliteMetric
                            label="Total Visits"
                            value={stats.totalVisits}
                            icon={<TrendingUp className="h-4 w-4" />}
                            tone="accent"
                        />
                    </section>

                    {/* ──────────── Admin Analytics ──────────── */}
                    {isAdmin && (
                        <section className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-8">
                            {/* Category Distribution — 3 cols */}
                            <div className="dash-panel lg:col-span-3 p-6">
                                <PanelHeader
                                    eyebrow="Distribution"
                                    title="Ventures by Category"
                                    hint={`Across ${analytics.categoryDistribution?.length || 0} segments`}
                                />
                                <div className="mt-6">
                                    {(analytics.categoryDistribution || []).length === 0 ? (
                                        <EmptyHint>No category data available yet.</EmptyHint>
                                    ) : (
                                        <ul className="space-y-3.5">
                                            {analytics.categoryDistribution.map((c) => {
                                                const name = c._id || c.name || c.category || 'Unknown';
                                                const count = Number(c.count) || 0;
                                                const pct = Math.round((count / categoryMax) * 100);
                                                return (
                                                    <li key={name} className="dash-bar-row">
                                                        <span
                                                            className="dash-cat-dot"
                                                            style={{ background: CATEGORY_DOT[name] || 'var(--cat-other)' }}
                                                            aria-hidden="true"
                                                        />
                                                        <span className="dash-bar-label">{name}</span>
                                                        <div className="dash-bar-track" aria-hidden="true">
                                                            <div
                                                                className="dash-bar-fill"
                                                                style={{ width: `${pct}%` }}
                                                            />
                                                        </div>
                                                        <span className="dash-bar-value">{count}</span>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    )}
                                </div>
                            </div>

                            {/* Template popularity — 2 cols */}
                            <div className="dash-panel lg:col-span-2 p-6">
                                <PanelHeader
                                    eyebrow="Adoption"
                                    title="Template Usage"
                                    hint={`${analytics.templatePopularity?.length || 0} themes`}
                                />
                                <div className="mt-6">
                                    {(analytics.templatePopularity || []).length === 0 ? (
                                        <EmptyHint>No template data available yet.</EmptyHint>
                                    ) : (
                                        <ul className="space-y-3">
                                            {analytics.templatePopularity.map((t, i) => {
                                                const name = t._id || t.name || t.template || 'Unknown';
                                                const count = Number(t.count) || 0;
                                                const pct = Math.round((count / templateMax) * 100);
                                                return (
                                                    <li key={name} className="dash-tpl-row">
                                                        <span className="dash-tpl-rank">
                                                            {String(i + 1).padStart(2, '0')}
                                                        </span>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-baseline justify-between gap-3">
                                                                <span className="dash-tpl-name">{name}</span>
                                                                <span className="dash-tpl-count">{count}</span>
                                                            </div>
                                                            <div className="dash-tpl-track mt-1.5" aria-hidden="true">
                                                                <div
                                                                    className="dash-tpl-fill"
                                                                    style={{ width: `${pct}%` }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* ──────────── Toolbar ──────────── */}
                    <div className="dash-toolbar mb-3">
                        <div className="dash-search">
                            <Search className="h-4 w-4 dash-search-icon" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search ventures by name, founder, or slogan…"
                                className="dash-search-input"
                                aria-label="Search ventures"
                            />
                            {search && (
                                <button
                                    onClick={() => setSearch('')}
                                    className="dash-search-clear"
                                    aria-label="Clear search"
                                    type="button"
                                >
                                    <X className="h-3.5 w-3.5" />
                                </button>
                            )}
                        </div>

                        <div className="dash-toolbar-divider" aria-hidden="true" />

                        <SelectField
                            icon={<Filter className="h-4 w-4" />}
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            options={CATEGORY_OPTIONS}
                        />

                        <SelectField
                            icon={<ArrowUpDown className="h-4 w-4" />}
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            options={SORT_OPTIONS}
                        />
                    </div>

                    <p className="dash-result-count" aria-live="polite">
                        {isLoading
                            ? 'Loading ventures…'
                            : `${dashboardPortfolios.length} venture${
                                  dashboardPortfolios.length === 1 ? '' : 's'
                              } on this page · page ${page} of ${totalPages}`}
                    </p>

                    {/* ──────────── Data Table ──────────── */}
                    <div className="dash-table-wrap">
                        <div className="overflow-x-auto">
                            <table className="dash-table">
                                <thead>
                                    <tr>
                                        <th className="dash-th">Venture</th>
                                        <th className="dash-th">Category</th>
                                        <th className="dash-th">Theme</th>
                                        <th className="dash-th dash-th-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isLoading ? (
                                        [...Array(6)].map((_, i) => <SkeletonRow key={i} pad={rowPad} />)
                                    ) : dashboardPortfolios.length === 0 ? (
                                        <tr>
                                            <td colSpan={4}>
                                                <EmptyState onCreate={handleCreate} />
                                            </td>
                                        </tr>
                                    ) : (
                                        dashboardPortfolios.map((item) => {
                                            const founderName =
                                                item.ourTeam && item.ourTeam.length > 0
                                                    ? item.ourTeam[0].name
                                                    : 'Founder';
                                            const itemCategory = item.category || 'Other';
                                            const template =
                                                item.theme || item.template || item.themeTemplate || '—';
                                            const canEdit =
                                                currentUser?.role === 'admin' || currentUser?.id === item.userId;

                                            return (
                                                <tr key={item._id} className="dash-tr group">
                                                    <td className={`dash-td ${rowPad}`}>
                                                        <div className="flex items-center gap-3">
                                                            <Avatar
                                                                name={item.businessName || 'V'}
                                                                category={itemCategory}
                                                            />
                                                            <div className="min-w-0">
                                                                <p className="dash-name">
                                                                    {item.businessName || 'Untitled Venture'}
                                                                </p>
                                                                <p className="dash-sub">By {founderName}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className={`dash-td ${rowPad}`}>
                                                        <span className="dash-chip">
                                                            <span
                                                                className="dash-chip-dot"
                                                                style={{
                                                                    background:
                                                                        CATEGORY_DOT[itemCategory] || 'var(--cat-other)',
                                                                }}
                                                                aria-hidden="true"
                                                            />
                                                            {itemCategory}
                                                        </span>
                                                    </td>
                                                    <td className={`dash-td ${rowPad}`}>
                                                        <div className="flex items-center gap-2 dash-template">
                                                            <LayoutTemplate className="h-4 w-4 opacity-60" />
                                                            <span>{template}</span>
                                                        </div>
                                                    </td>
                                                    <td className={`dash-td ${rowPad}`}>
                                                        <div className="flex items-center justify-end gap-1 dash-actions">
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
                            <div className="dash-pagination">
                                <p className="dash-page-label">
                                    Page <span className="dash-mono">{page}</span>
                                    <span className="opacity-50 mx-1.5">/</span>
                                    <span className="dash-mono">{totalPages}</span>
                                </p>
                                <div className="flex items-center gap-1.5">
                                    <PageButton
                                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                                        disabled={page <= 1}
                                    >
                                        <ChevronLeft className="h-3.5 w-3.5" />
                                        <span className="hidden sm:inline">Previous</span>
                                    </PageButton>
                                    <PageIndicator page={page} totalPages={totalPages} onSelect={setPage} />
                                    <PageButton
                                        primary
                                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                        disabled={page >= totalPages}
                                    >
                                        <span className="hidden sm:inline">Next</span>
                                        <ChevronRight className="h-3.5 w-3.5" />
                                    </PageButton>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

/* ──────────── Helpers ──────────── */

const hourGreeting = (d) => {
    const h = d.getHours();
    if (h < 5) return 'evening';
    if (h < 12) return 'morning';
    if (h < 18) return 'afternoon';
    return 'evening';
};

/* ──────────── Sub-components ──────────── */

const HeroMetric = ({ label, value, sublabel, icon, spark }) => {
    const max = Math.max(1, ...(spark || [1]));
    return (
        <div className="dash-panel dash-hero-metric lg:col-span-2 p-6 sm:p-7">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="dash-metric-label">{label}</p>
                    <p className="dash-metric-value">
                        {Number(value || 0).toLocaleString()}
                    </p>
                    <p className="dash-metric-sub">{sublabel}</p>
                </div>
                <div className="dash-metric-icon dash-metric-icon-primary">{icon}</div>
            </div>

            {spark && spark.length > 0 && (
                <div className="dash-spark mt-6" aria-hidden="true">
                    {spark.map((v, i) => (
                        <span
                            key={i}
                            className="dash-spark-bar"
                            style={{ height: `${Math.max(8, (v / max) * 100)}%` }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const SatelliteMetric = ({ label, value, icon, tone }) => (
    <div className="dash-panel p-6">
        <div className="flex items-center justify-between">
            <p className="dash-metric-label">{label}</p>
            <div
                className={
                    tone === 'accent' ? 'dash-metric-icon dash-metric-icon-accent' : 'dash-metric-icon'
                }
            >
                {icon}
            </div>
        </div>
        <p className="dash-metric-value dash-metric-value-sm mt-3">
            {Number(value || 0).toLocaleString()}
        </p>
    </div>
);

const PanelHeader = ({ eyebrow, title, hint }) => (
    <div>
        <p className="dash-panel-eyebrow">{eyebrow}</p>
        <div className="flex items-baseline justify-between gap-3 mt-1">
            <h2 className="dash-panel-title">{title}</h2>
            {hint && <span className="dash-panel-hint">{hint}</span>}
        </div>
    </div>
);

const EmptyHint = ({ children }) => (
    <p className="text-sm text-[color:var(--dash-muted)] italic">{children}</p>
);

const DensityToggle = ({ value, onChange }) => (
    <div className="dash-density" role="group" aria-label="Row density">
        <button
            type="button"
            className={value === 'comfortable' ? 'dash-density-btn dash-density-active' : 'dash-density-btn'}
            onClick={() => onChange('comfortable')}
            aria-pressed={value === 'comfortable'}
            title="Comfortable"
        >
            <Rows3 className="h-4 w-4" />
        </button>
        <button
            type="button"
            className={value === 'compact' ? 'dash-density-btn dash-density-active' : 'dash-density-btn'}
            onClick={() => onChange('compact')}
            aria-pressed={value === 'compact'}
            title="Compact"
        >
            <Rows4 className="h-4 w-4" />
        </button>
    </div>
);

const SelectField = ({ icon, value, onChange, options }) => (
    <div className="dash-select">
        <span className="dash-select-icon">{icon}</span>
        <select value={value} onChange={onChange} className="dash-select-input">
            {options.map((o) => (
                <option key={o.value} value={o.value}>
                    {o.label}
                </option>
            ))}
        </select>
        <svg
            className="dash-select-caret"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
        >
            <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 011.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
            />
        </svg>
    </div>
);

const Avatar = ({ name, category }) => {
    const initial = (name || 'V').charAt(0).toUpperCase();
    return (
        <div
            className="dash-avatar"
            style={{
                background: `color-mix(in oklch, ${CATEGORY_DOT[category] || 'var(--cat-other)'} 14%, var(--dash-paper))`,
                color: CATEGORY_DOT[category] || 'var(--cat-other)',
            }}
            aria-hidden="true"
        >
            {initial}
        </div>
    );
};

const IconButton = ({ children, onClick, title, danger, disabled }) => (
    <button
        type="button"
        onClick={onClick}
        title={title}
        aria-label={title}
        disabled={disabled}
        className={danger ? 'dash-icon-btn dash-icon-btn-danger' : 'dash-icon-btn'}
    >
        {children}
    </button>
);

const SkeletonRow = ({ pad }) => (
    <tr className="dash-skeleton-row">
        <td className={`dash-td ${pad}`}>
            <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl dash-skel-block" />
                <div className="space-y-2">
                    <div className="h-3 w-40 dash-skel-block rounded" />
                    <div className="h-2.5 w-24 dash-skel-block rounded opacity-60" />
                </div>
            </div>
        </td>
        <td className={`dash-td ${pad}`}>
            <div className="h-6 w-24 dash-skel-block rounded-full" />
        </td>
        <td className={`dash-td ${pad}`}>
            <div className="h-3 w-32 dash-skel-block rounded" />
        </td>
        <td className={`dash-td ${pad}`}>
            <div className="flex items-center justify-end gap-1.5">
                <div className="h-8 w-8 dash-skel-block rounded-lg" />
                <div className="h-8 w-8 dash-skel-block rounded-lg" />
                <div className="h-8 w-8 dash-skel-block rounded-lg" />
            </div>
        </td>
    </tr>
);

const EmptyState = ({ onCreate }) => (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
        <div className="dash-empty-icon">
            <Inbox className="h-6 w-6" />
        </div>
        <h3 className="dash-empty-title">No ventures match your filters</h3>
        <p className="dash-empty-body">
            Adjust the search, category, or sort — or launch your first landing page.
        </p>
        {onCreate && (
            <button onClick={onCreate} className="dash-cta dash-cta-sm mt-5" type="button">
                <Plus className="h-4 w-4" strokeWidth={2.25} />
                Create one now
            </button>
        )}
    </div>
);

const PageButton = ({ children, onClick, disabled, primary }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={primary ? 'dash-page-btn dash-page-btn-primary' : 'dash-page-btn'}
        type="button"
    >
        {children}
    </button>
);

const PageIndicator = ({ page, totalPages, onSelect }) => {
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
                    className={p === page ? 'dash-page-num dash-page-num-active' : 'dash-page-num'}
                    type="button"
                >
                    {p}
                </button>
            ))}
        </div>
    );
};

/* ──────────── Scoped Styles (tokens + custom CSS) ──────────── */

const ScopedStyles = () => (
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Outfit:wght@400;500;600&family=JetBrains+Mono:wght@500;600&display=swap');

        .dash-root {
            /* Palette — oklch "Minimal professional" */
            --dash-bg:        oklch(0.985 0.004 220);
            --dash-paper:     oklch(1 0 0);
            --dash-paper-2:   oklch(0.975 0.005 220);
            --dash-line:      oklch(0.92 0.008 220);
            --dash-line-soft: oklch(0.95 0.006 220);
            --dash-ink:       oklch(0.21 0.014 250);
            --dash-ink-2:     oklch(0.36 0.014 250);
            --dash-muted:     oklch(0.58 0.012 250);
            --dash-primary:   oklch(0.52 0.13 220);
            --dash-primary-2: oklch(0.42 0.14 220);
            --dash-primary-soft: oklch(0.94 0.04 220);
            --dash-accent:    oklch(0.74 0.14 65);
            --dash-danger:    oklch(0.55 0.18 25);
            --dash-danger-soft: oklch(0.95 0.04 25);

            /* Category hues — coherent oklch ramp, not rainbow */
            --cat-fb:       oklch(0.68 0.13 65);
            --cat-tech:     oklch(0.52 0.13 220);
            --cat-retail:   oklch(0.60 0.14 350);
            --cat-services: oklch(0.58 0.10 160);
            --cat-other:    oklch(0.58 0.012 250);

            /* Typography */
            --dash-font-display: 'Space Grotesk', ui-sans-serif, sans-serif;
            --dash-font-body:    'Outfit', ui-sans-serif, sans-serif;
            --dash-font-mono:    'JetBrains Mono', ui-monospace, monospace;

            background: var(--dash-bg);
            color: var(--dash-ink);
            font-family: var(--dash-font-body);
            font-size: 15px;
            line-height: 1.55;
            letter-spacing: -0.005em;
            text-wrap: pretty;
        }

        /* ── Header ── */
        .dash-eyebrow {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            font-family: var(--dash-font-mono);
            font-size: 11.5px;
            font-weight: 600;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            color: var(--dash-muted);
        }
        .dash-pulse {
            position: relative;
            width: 8px; height: 8px;
            border-radius: 999px;
            background: var(--dash-accent);
        }
        .dash-pulse::after {
            content: '';
            position: absolute;
            inset: -4px;
            border-radius: 999px;
            background: var(--dash-accent);
            opacity: 0.35;
            animation: dashPulse 2s ease-out infinite;
        }
        @keyframes dashPulse {
            0%   { transform: scale(0.6); opacity: 0.45; }
            70%  { transform: scale(1.6); opacity: 0; }
            100% { transform: scale(1.6); opacity: 0; }
        }

        .dash-display {
            font-family: var(--dash-font-display);
            font-weight: 600;
            font-size: clamp(2.25rem, 4.6vw, 3.75rem);
            line-height: 1.04;
            letter-spacing: -0.035em;
            color: var(--dash-ink);
        }
        .dash-display-accent {
            color: var(--dash-primary-2);
            font-style: italic;
            font-weight: 500;
        }
        .dash-lede {
            color: var(--dash-ink-2);
            font-size: 15.5px;
            max-width: 38rem;
        }

        /* ── CTA ── */
        .dash-cta {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: var(--dash-ink);
            color: var(--dash-paper);
            font-family: var(--dash-font-body);
            font-weight: 500;
            font-size: 14px;
            padding: 0.7rem 1.1rem;
            border-radius: 12px;
            border: 1px solid var(--dash-ink);
            box-shadow: 0 1px 0 rgba(255,255,255,0.05) inset, 0 1px 2px rgba(0,0,0,0.06);
            transition: transform .2s ease-out, background .2s ease-out, box-shadow .2s ease-out;
        }
        .dash-cta:hover { background: var(--dash-primary-2); border-color: var(--dash-primary-2); transform: translateY(-1px); box-shadow: 0 6px 16px -8px rgba(0,0,0,0.25); }
        .dash-cta:active { transform: translateY(0); }
        .dash-cta-sm { padding: 0.55rem 0.95rem; font-size: 13px; }

        /* ── Density toggle ── */
        .dash-density {
            display: inline-flex;
            background: var(--dash-paper);
            border: 1px solid var(--dash-line);
            border-radius: 12px;
            padding: 3px;
        }
        .dash-density-btn {
            display: grid; place-items: center;
            width: 36px; height: 36px;
            border-radius: 9px;
            color: var(--dash-muted);
            transition: background .15s ease-out, color .15s ease-out;
        }
        .dash-density-btn:hover { color: var(--dash-ink); }
        .dash-density-active {
            background: var(--dash-ink);
            color: var(--dash-paper);
        }

        /* ── Panel (cards) ── */
        .dash-panel {
            background: var(--dash-paper);
            border: 1px solid var(--dash-line);
            border-radius: 18px;
            box-shadow: 0 1px 0 rgba(15, 23, 42, 0.02);
            transition: border-color .2s ease-out, box-shadow .2s ease-out, transform .2s ease-out;
        }
        .dash-panel:hover { border-color: oklch(0.88 0.01 220); box-shadow: 0 8px 24px -16px rgba(15, 23, 42, 0.18); }

        /* ── Metrics ── */
        .dash-hero-metric {
            background:
                radial-gradient(1100px 220px at -10% -50%, color-mix(in oklch, var(--dash-primary-soft) 70%, transparent), transparent 60%),
                var(--dash-paper);
        }
        .dash-metric-label {
            font-family: var(--dash-font-mono);
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: var(--dash-muted);
        }
        .dash-metric-value {
            font-family: var(--dash-font-display);
            font-feature-settings: "tnum" 1;
            font-weight: 600;
            font-size: clamp(2.5rem, 4.5vw, 3.5rem);
            line-height: 1;
            letter-spacing: -0.04em;
            color: var(--dash-ink);
            margin-top: 0.6rem;
        }
        .dash-metric-value-sm { font-size: clamp(1.75rem, 2.4vw, 2.25rem); }
        .dash-metric-sub {
            margin-top: 0.4rem;
            font-size: 13px;
            color: var(--dash-muted);
        }
        .dash-metric-icon {
            display: grid; place-items: center;
            width: 40px; height: 40px;
            border-radius: 12px;
            background: var(--dash-paper-2);
            border: 1px solid var(--dash-line);
            color: var(--dash-ink-2);
        }
        .dash-metric-icon-primary {
            background: var(--dash-ink);
            color: var(--dash-paper);
            border-color: var(--dash-ink);
        }
        .dash-metric-icon-accent {
            background: color-mix(in oklch, var(--dash-accent) 14%, var(--dash-paper));
            color: oklch(0.45 0.15 65);
            border-color: color-mix(in oklch, var(--dash-accent) 30%, var(--dash-line));
        }

        /* ── Sparkline ── */
        .dash-spark {
            display: flex;
            align-items: flex-end;
            gap: 6px;
            height: 64px;
            padding-top: 0.25rem;
            border-top: 1px dashed var(--dash-line);
        }
        .dash-spark-bar {
            flex: 1;
            min-width: 4px;
            background: linear-gradient(to top, var(--dash-primary), color-mix(in oklch, var(--dash-primary) 50%, var(--dash-paper)));
            border-radius: 4px 4px 0 0;
            opacity: 0.85;
            transition: transform .25s ease-out, opacity .25s ease-out;
        }
        .dash-spark-bar:hover { transform: scaleY(1.04); opacity: 1; }

        /* ── Panel headers ── */
        .dash-panel-eyebrow {
            font-family: var(--dash-font-mono);
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: var(--dash-primary-2);
        }
        .dash-panel-title {
            font-family: var(--dash-font-display);
            font-weight: 600;
            font-size: 18px;
            letter-spacing: -0.02em;
            color: var(--dash-ink);
        }
        .dash-panel-hint {
            font-family: var(--dash-font-mono);
            font-size: 11px;
            color: var(--dash-muted);
        }

        /* ── Bar rows ── */
        .dash-bar-row {
            display: grid;
            grid-template-columns: 10px 9.5rem 1fr auto;
            align-items: center;
            gap: 0.75rem;
        }
        .dash-cat-dot { width: 10px; height: 10px; border-radius: 999px; }
        .dash-bar-label {
            font-size: 13.5px;
            font-weight: 500;
            color: var(--dash-ink-2);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .dash-bar-track {
            position: relative;
            height: 8px;
            background: var(--dash-line-soft);
            border-radius: 999px;
            overflow: hidden;
        }
        .dash-bar-fill {
            height: 100%;
            background: var(--dash-ink);
            border-radius: 999px;
            transition: width .55s cubic-bezier(.2,.8,.2,1);
        }
        .dash-bar-value {
            font-family: var(--dash-font-mono);
            font-size: 12.5px;
            font-weight: 600;
            color: var(--dash-ink);
            min-width: 2ch;
            text-align: right;
        }

        /* ── Template rows ── */
        .dash-tpl-row {
            display: flex;
            align-items: center;
            gap: 0.85rem;
            padding: 0.4rem 0;
        }
        .dash-tpl-rank {
            font-family: var(--dash-font-mono);
            font-size: 11px;
            font-weight: 600;
            color: var(--dash-muted);
            width: 1.75rem;
        }
        .dash-tpl-name {
            font-size: 13.5px;
            font-weight: 500;
            color: var(--dash-ink);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .dash-tpl-count {
            font-family: var(--dash-font-mono);
            font-size: 12.5px;
            font-weight: 600;
            color: var(--dash-ink-2);
        }
        .dash-tpl-track {
            height: 4px;
            background: var(--dash-line-soft);
            border-radius: 999px;
            overflow: hidden;
        }
        .dash-tpl-fill {
            height: 100%;
            background: var(--dash-primary);
            border-radius: 999px;
            transition: width .55s cubic-bezier(.2,.8,.2,1);
        }

        /* ── Toolbar ── */
        .dash-toolbar {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.55rem;
            background: var(--dash-paper);
            border: 1px solid var(--dash-line);
            border-radius: 16px;
            box-shadow: 0 1px 0 rgba(15, 23, 42, 0.02);
            flex-wrap: wrap;
        }
        .dash-search {
            position: relative;
            flex: 1 1 240px;
            min-width: 240px;
            display: flex;
            align-items: center;
        }
        .dash-search-icon {
            position: absolute;
            left: 0.85rem;
            color: var(--dash-muted);
            pointer-events: none;
        }
        .dash-search-input {
            width: 100%;
            background: transparent;
            border: none;
            outline: none;
            padding: 0.7rem 0.7rem 0.7rem 2.4rem;
            font-family: var(--dash-font-body);
            font-size: 14.5px;
            color: var(--dash-ink);
        }
        .dash-search-input::placeholder { color: var(--dash-muted); }
        .dash-search-clear {
            position: absolute;
            right: 0.5rem;
            display: grid; place-items: center;
            width: 22px; height: 22px;
            border-radius: 999px;
            background: var(--dash-paper-2);
            color: var(--dash-muted);
            transition: background .15s ease-out, color .15s ease-out;
        }
        .dash-search-clear:hover { background: var(--dash-line); color: var(--dash-ink); }

        .dash-toolbar-divider {
            width: 1px;
            height: 28px;
            background: var(--dash-line);
            display: none;
        }
        @media (min-width: 768px) { .dash-toolbar-divider { display: block; } }

        /* ── Select ── */
        .dash-select {
            position: relative;
            display: inline-flex;
            align-items: center;
            background: var(--dash-paper-2);
            border: 1px solid var(--dash-line);
            border-radius: 10px;
            transition: border-color .15s ease-out, background .15s ease-out;
        }
        .dash-select:hover { border-color: oklch(0.88 0.01 220); }
        .dash-select:focus-within { background: var(--dash-paper); border-color: var(--dash-ink); box-shadow: 0 0 0 3px color-mix(in oklch, var(--dash-ink) 8%, transparent); }
        .dash-select-icon { position: absolute; left: 0.7rem; color: var(--dash-muted); display: inline-flex; }
        .dash-select-input {
            appearance: none;
            background: transparent;
            border: none;
            outline: none;
            padding: 0.55rem 2.1rem 0.55rem 2.1rem;
            font-family: var(--dash-font-body);
            font-size: 13.5px;
            color: var(--dash-ink);
            min-width: 11rem;
            cursor: pointer;
        }
        .dash-select-caret { position: absolute; right: 0.7rem; width: 14px; height: 14px; color: var(--dash-muted); pointer-events: none; }

        .dash-result-count {
            font-family: var(--dash-font-mono);
            font-size: 11.5px;
            color: var(--dash-muted);
            margin: 0 0.15rem 0.6rem;
            letter-spacing: 0.02em;
        }

        /* ── Table ── */
        .dash-table-wrap {
            background: var(--dash-paper);
            border: 1px solid var(--dash-line);
            border-radius: 18px;
            overflow: hidden;
            box-shadow: 0 1px 0 rgba(15, 23, 42, 0.02);
        }
        .dash-table { width: 100%; border-collapse: collapse; font-size: 14px; }
        .dash-th {
            background: var(--dash-paper-2);
            text-align: left;
            font-family: var(--dash-font-mono);
            font-size: 10.5px;
            font-weight: 600;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: var(--dash-muted);
            padding: 0.85rem 1.5rem;
            border-bottom: 1px solid var(--dash-line);
        }
        .dash-th-right { text-align: right; }
        .dash-tr { border-bottom: 1px solid var(--dash-line-soft); transition: background .15s ease-out; }
        .dash-tr:last-child { border-bottom: none; }
        .dash-tr:hover { background: oklch(0.985 0.005 220); }
        .dash-td { padding-left: 1.5rem; padding-right: 1.5rem; vertical-align: middle; }

        .dash-name {
            font-weight: 500;
            color: var(--dash-ink);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 22rem;
        }
        .dash-sub {
            font-size: 12.5px;
            color: var(--dash-muted);
            margin-top: 1px;
        }
        .dash-template { font-size: 13.5px; color: var(--dash-ink-2); font-family: var(--dash-font-mono); }

        .dash-avatar {
            display: grid; place-items: center;
            width: 38px; height: 38px;
            border-radius: 12px;
            font-family: var(--dash-font-display);
            font-weight: 600;
            font-size: 14px;
            flex-shrink: 0;
        }

        .dash-chip {
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
            padding: 0.3rem 0.7rem;
            border-radius: 999px;
            background: var(--dash-paper-2);
            border: 1px solid var(--dash-line);
            font-size: 12.5px;
            font-weight: 500;
            color: var(--dash-ink-2);
            white-space: nowrap;
        }
        .dash-chip-dot { width: 6px; height: 6px; border-radius: 999px; }

        .dash-actions { opacity: 0.55; transition: opacity .15s ease-out; }
        .dash-tr:hover .dash-actions, .dash-actions:focus-within { opacity: 1; }

        .dash-icon-btn {
            display: grid; place-items: center;
            width: 32px; height: 32px;
            border-radius: 9px;
            color: var(--dash-ink-2);
            transition: background .15s ease-out, color .15s ease-out;
        }
        .dash-icon-btn:hover { background: var(--dash-paper-2); color: var(--dash-ink); }
        .dash-icon-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .dash-icon-btn-danger { color: var(--dash-danger); }
        .dash-icon-btn-danger:hover { background: var(--dash-danger-soft); color: var(--dash-danger); }

        /* ── Pagination ── */
        .dash-pagination {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            justify-content: space-between;
            align-items: center;
            border-top: 1px solid var(--dash-line);
            background: var(--dash-paper-2);
            padding: 0.85rem 1.5rem;
        }
        @media (min-width: 640px) { .dash-pagination { flex-direction: row; } }
        .dash-page-label {
            font-family: var(--dash-font-mono);
            font-size: 11.5px;
            color: var(--dash-muted);
            letter-spacing: 0.04em;
        }
        .dash-mono { font-family: var(--dash-font-mono); color: var(--dash-ink); font-weight: 600; }
        .dash-page-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            background: var(--dash-paper);
            border: 1px solid var(--dash-line);
            color: var(--dash-ink-2);
            padding: 0.45rem 0.7rem;
            border-radius: 9px;
            font-size: 12px;
            font-weight: 500;
            transition: background .15s ease-out, border-color .15s ease-out;
        }
        .dash-page-btn:hover:not(:disabled) { background: var(--dash-paper-2); border-color: oklch(0.88 0.01 220); }
        .dash-page-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .dash-page-btn-primary {
            background: var(--dash-ink);
            border-color: var(--dash-ink);
            color: var(--dash-paper);
        }
        .dash-page-btn-primary:hover:not(:disabled) { background: var(--dash-primary-2); border-color: var(--dash-primary-2); }

        .dash-page-num {
            min-width: 32px; height: 32px;
            padding: 0 0.4rem;
            border-radius: 9px;
            border: 1px solid transparent;
            font-family: var(--dash-font-mono);
            font-size: 12px;
            font-weight: 500;
            color: var(--dash-ink-2);
            transition: background .15s ease-out, border-color .15s ease-out;
        }
        .dash-page-num:hover { background: var(--dash-paper-2); border-color: var(--dash-line); }
        .dash-page-num-active {
            background: var(--dash-ink);
            color: var(--dash-paper);
            border-color: var(--dash-ink);
        }

        /* ── Empty / Skeleton ── */
        .dash-empty-icon {
            display: grid; place-items: center;
            width: 56px; height: 56px;
            border-radius: 16px;
            background: var(--dash-paper-2);
            border: 1px solid var(--dash-line);
            color: var(--dash-muted);
            margin-bottom: 1rem;
        }
        .dash-empty-title {
            font-family: var(--dash-font-display);
            font-size: 18px;
            font-weight: 600;
            color: var(--dash-ink);
            letter-spacing: -0.015em;
        }
        .dash-empty-body {
            margin-top: 0.4rem;
            font-size: 14px;
            color: var(--dash-muted);
            max-width: 26rem;
        }
        .dash-skeleton-row { animation: dashShimmer 1.4s ease-in-out infinite; }
        .dash-skel-block {
            background: linear-gradient(90deg, var(--dash-line-soft), var(--dash-line), var(--dash-line-soft));
            background-size: 200% 100%;
        }
        @keyframes dashShimmer {
            0% { background-position: 0% 50%; }
            100% { background-position: 200% 50%; }
        }

        /* ── Reduced motion ── */
        @media (prefers-reduced-motion: reduce) {
            .dash-pulse::after,
            .dash-skeleton-row,
            .dash-spark-bar,
            .dash-tr,
            .dash-cta,
            .dash-icon-btn,
            .dash-page-btn,
            .dash-page-num,
            .dash-bar-fill,
            .dash-tpl-fill {
                animation: none !important;
                transition: none !important;
            }
        }
    `}</style>
);

export default PortfolioList;
