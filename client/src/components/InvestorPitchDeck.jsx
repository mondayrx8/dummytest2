import React, { useEffect } from 'react';
import {
    ArrowRight,
    Mail,
    MapPin,
    Share2,
    Sparkles,
    Target,
    Trophy,
    Users,
    TrendingUp,
    CreditCard,
    Rocket,
    Quote,
    ChevronDown,
} from 'lucide-react';

/**
 * InvestorPitchDeck
 * ------------------------------------------------------------------
 * Ultra-premium, single-page scroll pitch deck for a student startup.
 * LIGHT MODE · CLEAN & EXCLUSIVE · NO NAVBAR
 *
 * Drop your real data in by passing the `portfolio` prop, e.g.:
 *
 *   <InvestorPitchDeck portfolio={portfolio} />
 *
 * Variables referenced (see `data` destructuring below):
 *   businessName, studentName, image, description,
 *   landingPage: {
 *     introduction, aboutUs, missionVision,
 *     keyProductsServices, targetMarket,
 *     founder, ourTeam, ourGoals,
 *     bestAchievement, futureOutlook,
 *     contactInfo: { address, email, socialMedia }
 *   },
 *   salesRevenue: { monthlyRevenue, paymentMethods },
 *   shopImages: []
 *
 * Tech: React + Tailwind CSS v4 + Lucide React.
 * ------------------------------------------------------------------
 */
const InvestorPitchDeck = ({ portfolio }) => {
    // Gracefully fall back to an empty shape so `{landingPage.introduction}` etc.
    // never throw when you first render this component without data.
    const data = portfolio || {};
    const {
        businessName = 'Your Business Name',
        studentName = 'Your Founder Name',
        image,
        description,
        landingPage = {},
        salesRevenue = {},
        shopImages = [],
    } = data;

    const {
        introduction,
        aboutUs,
        missionVision,
        keyProductsServices,
        targetMarket,
        founder,
        ourTeam,
        ourGoals,
        bestAchievement,
        futureOutlook,
        contactInfo = {},
    } = landingPage;

    const { address, email, socialMedia } = contactInfo;
    const { monthlyRevenue, paymentMethods } = salesRevenue;

    // --- subtle scroll-reveal without any animation library ---
    useEffect(() => {
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.dataset.revealed = 'true';
                        io.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -80px 0px' }
        );
        document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);

    const handleContact = () => {
        const section = document.getElementById('pitch-contact');
        if (section) section.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen w-full bg-[#FAFAF9] text-slate-900 font-sans antialiased selection:bg-indigo-200 selection:text-slate-900">
            {/* ================================================================ */}
            {/* HERO                                                              */}
            {/* ================================================================ */}
            <section className="relative isolate flex min-h-screen w-full items-end overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100">
                {/* background image + overlay */}
                <div className="absolute inset-0 -z-10">
                    {image ? (
                        <img
                            src={image}
                            alt={businessName}
                            className="h-full w-full object-cover opacity-20"
                            crossOrigin="anonymous"
                        />
                    ) : (
                        <div className="h-full w-full bg-[radial-gradient(ellipse_at_top,_#f1f5f9_0%,_#FAFAF9_60%)]" />
                    )}
                    {/* soft gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-slate-50/70 to-slate-100/90" />
                    {/* soft colored accents */}
                    <div className="absolute -top-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-indigo-300/20 blur-3xl" />
                    <div className="absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-sky-300/20 blur-3xl" />
                </div>

                <div className="relative mx-auto w-full max-w-7xl px-4 pb-24 pt-32 sm:px-6 sm:pb-32 sm:pt-36 lg:px-8 lg:pb-40">
                    <div
                        data-reveal
                        className="max-w-4xl opacity-0 translate-y-6 transition-all duration-1000 ease-out data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0"
                    >
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/80 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm backdrop-blur">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.6)]" />
                            Investor Pitch Deck · 2026
                        </div>

                        <h1 className="text-balance text-5xl font-semibold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl xl:text-8xl">
                            {businessName}
                        </h1>

                        <p className="mt-6 max-w-2xl text-lg text-slate-700 sm:text-xl">
                            Founded by{' '}
                            <span className="font-semibold text-slate-900">{studentName}</span>
                        </p>

                        {description && (
                            <p className="mt-8 max-w-2xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg">
                                {description}
                            </p>
                        )}

                        <div className="mt-12 flex flex-wrap items-center gap-4">
                            <button
                                onClick={handleContact}
                                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-slate-900 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:shadow-xl hover:shadow-slate-900/30"
                            >
                                <span className="relative z-10">Contact Founder</span>
                                <ArrowRight className="relative z-10 h-4 w-4 transition group-hover:translate-x-1" />
                            </button>

                            <a
                                href="#pitch-about"
                                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/80 px-7 py-3.5 text-sm font-semibold text-slate-900 shadow-sm backdrop-blur transition hover:border-slate-400 hover:bg-white"
                            >
                                View Pitch
                            </a>
                        </div>
                    </div>
                </div>

                {/* scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400">
                    <ChevronDown className="h-5 w-5 animate-bounce" />
                </div>
            </section>

            {/* ================================================================ */}
            {/* ABOUT US — EDITORIAL LAYOUT (no bento)                            */}
            {/* ================================================================ */}
            <section
                id="pitch-about"
                className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
            >
                <SectionLabel icon={<Quote className="h-3.5 w-3.5" />} text="About Us" />

                <h2
                    data-reveal
                    className="mt-6 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-slate-900 opacity-0 translate-y-6 transition-all duration-700 data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0 sm:text-5xl"
                >
                    Built with purpose.{' '}
                    <span className="bg-gradient-to-r from-indigo-600 via-sky-600 to-teal-600 bg-clip-text text-transparent">
                        Scaled with vision.
                    </span>
                </h2>

                {/* Classic editorial layout: big text left, big image right */}
                <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
                    {/* Left column — big clean text */}
                    <div
                        data-reveal
                        className="flex flex-col gap-8 opacity-0 translate-y-6 transition-all duration-700 data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0"
                    >
                        {/* Introduction */}
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">
                                Introduction
                            </p>
                            <h3 className="mt-3 text-pretty text-2xl font-semibold leading-snug text-slate-900 sm:text-3xl">
                                {introduction || `Welcome to ${businessName}.`}
                            </h3>
                            {aboutUs && (
                                <p className="mt-4 text-base leading-relaxed text-slate-600">
                                    {aboutUs}
                                </p>
                            )}
                        </div>

                        {/* Mission & Vision */}
                        <div>
                            <div className="flex items-center gap-2">
                                <Rocket className="h-5 w-5 text-sky-600" />
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
                                    Mission & Vision
                                </p>
                            </div>
                            <p className="mt-3 text-lg font-medium leading-relaxed text-slate-800">
                                {missionVision || 'To be the leading brand regionally with global standards.'}
                            </p>
                        </div>

                        {/* Our Goals */}
                        <div className="rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-transparent p-6 shadow-sm">
                            <div className="flex items-center gap-2">
                                <Target className="h-5 w-5 text-indigo-600" />
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">
                                    Our Goals
                                </p>
                            </div>
                            <p className="mt-3 text-lg font-medium leading-relaxed text-slate-900">
                                {ourGoals || 'Expand reach, deepen impact, stay profitable.'}
                            </p>
                        </div>
                    </div>

                    {/* Right column — big beautiful image */}
                    <div
                        data-reveal
                        className="relative overflow-hidden rounded-3xl shadow-2xl opacity-0 translate-y-6 transition-all duration-700 data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0"
                    >
                        {image ? (
                            <img
                                src={image}
                                alt={businessName}
                                className="h-full w-full min-h-[32rem] object-cover transition duration-700 hover:scale-105"
                                crossOrigin="anonymous"
                            />
                        ) : (
                            <div className="h-full min-h-[32rem] w-full bg-gradient-to-br from-indigo-200 via-sky-200 to-teal-100" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent" />
                        <div className="absolute bottom-6 left-6 text-xs font-medium uppercase tracking-[0.18em] text-white">
                            {businessName}
                        </div>
                    </div>
                </div>
            </section>

            {/* ================================================================ */}
            {/* WHAT WE DO & MARKET                                               */}
            {/* ================================================================ */}
            <section
                id="pitch-market"
                className="relative border-y border-slate-200 bg-white"
            >
                <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
                    <div className="flex items-end justify-between gap-6">
                        <div>
                            <SectionLabel
                                icon={<Sparkles className="h-3.5 w-3.5" />}
                                text="What We Do"
                            />
                            <h2
                                data-reveal
                                className="mt-6 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-slate-900 opacity-0 translate-y-6 transition-all duration-700 data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0 sm:text-5xl"
                            >
                                Product, market, and a clear edge.
                            </h2>
                        </div>
                    </div>

                    <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Products & Services */}
                        <FeatureCard
                            accent="from-indigo-200 to-sky-100"
                            eyebrow="Key Products & Services"
                            icon={<Sparkles className="h-5 w-5" />}
                            title={keyProductsServices || 'Signature offerings crafted for the modern customer.'}
                            image={shopImages?.[0]}
                        />

                        {/* Target Market */}
                        <FeatureCard
                            accent="from-amber-200 to-rose-100"
                            eyebrow="Target Market"
                            icon={<Target className="h-5 w-5" />}
                            title={targetMarket || 'Young professionals & digital-first consumers.'}
                            image={shopImages?.[1]}
                        />
                    </div>
                </div>
            </section>

            {/* ================================================================ */}
            {/* SALES & TRACTION                                                  */}
            {/* ================================================================ */}
            <section
                id="pitch-traction"
                className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
            >
                <SectionLabel icon={<TrendingUp className="h-3.5 w-3.5" />} text="Sales & Traction" />

                <h2
                    data-reveal
                    className="mt-6 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-slate-900 opacity-0 translate-y-6 transition-all duration-700 data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0 sm:text-5xl"
                >
                    Numbers that speak.{' '}
                    <span className="text-slate-500">Momentum you can feel.</span>
                </h2>

                {/* Metric strip */}
                <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <MetricTile
                        label="Monthly Revenue"
                        value={monthlyRevenue || 'RM —'}
                        icon={<TrendingUp className="h-4 w-4" />}
                        highlight
                    />
                    <MetricTile
                        label="Payment Methods"
                        value={paymentMethods || 'Multiple channels'}
                        icon={<CreditCard className="h-4 w-4" />}
                    />
                    <MetricTile
                        label="Future Outlook"
                        value={futureOutlook ? 'On track' : 'Accelerating'}
                        hint={futureOutlook}
                        icon={<Rocket className="h-4 w-4" />}
                    />
                </div>

                {/* Chart placeholder */}
                <div
                    data-reveal
                    className="mt-10 opacity-0 translate-y-6 transition-all duration-700 data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0"
                >
                    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-10 shadow-lg">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.08),_transparent_60%)]" />

                        <div className="relative flex items-start justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                                    Monthly Sales Trend
                                </p>
                                <p className="mt-2 text-2xl font-semibold text-slate-900">
                                    Live revenue visualization
                                </p>
                            </div>
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                Growing
                            </span>
                        </div>

                        {/* Placeholder chart area — drop Recharts here later */}
                        <div
                            id="sales-chart-placeholder"
                            className="relative mt-8 flex h-72 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 sm:h-80"
                        >
                            <div className="text-center">
                                <p className="text-sm font-medium text-slate-600">
                                    Sales Chart Goes Here
                                </p>
                                <p className="mt-1 text-xs text-slate-400">
                                    (Mount your Recharts LineChart into this div)
                                </p>
                            </div>

                            {/* decorative faux grid */}
                            <svg
                                className="pointer-events-none absolute inset-0 h-full w-full opacity-30"
                                aria-hidden="true"
                            >
                                <defs>
                                    <pattern
                                        id="grid-light"
                                        width="40"
                                        height="40"
                                        patternUnits="userSpaceOnUse"
                                    >
                                        <path
                                            d="M 40 0 L 0 0 0 40"
                                            fill="none"
                                            stroke="rgba(0,0,0,0.05)"
                                            strokeWidth="1"
                                        />
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#grid-light)" />
                            </svg>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================================================================ */}
            {/* TEAM & MILESTONES                                                 */}
            {/* ================================================================ */}
            <section
                id="pitch-team"
                className="relative border-y border-slate-200 bg-white"
            >
                <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
                    <SectionLabel icon={<Users className="h-3.5 w-3.5" />} text="Team & Milestones" />

                    <h2
                        data-reveal
                        className="mt-6 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-slate-900 opacity-0 translate-y-6 transition-all duration-700 data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0 sm:text-5xl"
                    >
                        The people behind the product.
                    </h2>

                    <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3">
                        {/* Founder */}
                        <div
                            data-reveal
                            className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-lg opacity-0 translate-y-6 transition-all duration-700 data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0"
                        >
                            <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-indigo-200/40 blur-3xl transition group-hover:bg-indigo-200/60" />
                            <div className="relative">
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">
                                    Founder
                                </p>
                                <div className="mt-6 flex items-center gap-4">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-sky-400 text-xl font-semibold text-white shadow-md">
                                        {(founder || studentName || 'F').charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-xl font-semibold text-slate-900">
                                            {founder || studentName}
                                        </p>
                                        <p className="text-sm text-slate-600">Chief Executive</p>
                                    </div>
                                </div>
                                <p className="mt-6 text-sm leading-relaxed text-slate-600">
                                    Leading vision, growth, and operations.
                                </p>
                            </div>
                        </div>

                        {/* Team */}
                        <div
                            data-reveal
                            className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-lg opacity-0 translate-y-6 transition-all duration-700 data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0 lg:col-span-1"
                        >
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
                                Our Team
                            </p>
                            <Users className="mt-6 h-6 w-6 text-sky-600" />
                            <p className="mt-4 text-lg font-medium leading-relaxed text-slate-900">
                                {ourTeam || 'A tight-knit, cross-functional team.'}
                            </p>
                        </div>

                        {/* Best Achievement — highlighted trophy */}
                        <div
                            data-reveal
                            className="relative overflow-hidden rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-100 to-transparent p-8 shadow-lg opacity-0 translate-y-6 transition-all duration-700 data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0"
                        >
                            <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-amber-200/40 blur-3xl" />
                            <div className="relative">
                                <div className="flex items-center gap-2">
                                    <Trophy className="h-5 w-5 text-amber-600" />
                                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
                                        Best Achievement
                                    </p>
                                </div>
                                <p className="mt-6 text-xl font-semibold leading-snug text-slate-900">
                                    {bestAchievement || 'Consistent growth across every quarter.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================================================================ */}
            {/* PRODUCT GALLERY                                                   */}
            {/* ================================================================ */}
            {shopImages && shopImages.length > 0 && (
                <section
                    id="pitch-gallery"
                    className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
                >
                    <SectionLabel icon={<Sparkles className="h-3.5 w-3.5" />} text="Gallery" />

                    <h2
                        data-reveal
                        className="mt-6 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-slate-900 opacity-0 translate-y-6 transition-all duration-700 data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0 sm:text-5xl"
                    >
                        A look inside.
                    </h2>

                    <div className="mt-14 columns-1 gap-4 sm:columns-2 lg:columns-3 [column-fill:_balance]">
                        {shopImages.map((img, idx) => (
                            <div
                                key={idx}
                                className="mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                            >
                                <img
                                    src={img}
                                    alt={`${businessName} product ${idx + 1}`}
                                    loading="lazy"
                                    crossOrigin="anonymous"
                                    className="h-auto w-full object-cover transition duration-700 hover:scale-[1.03]"
                                />
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* ================================================================ */}
            {/* CTA BAND                                                          */}
            {/* ================================================================ */}
            <section id="pitch-contact" className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
                <div
                    data-reveal
                    className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-indigo-100 via-sky-50 to-teal-50 p-10 shadow-xl opacity-0 translate-y-6 transition-all duration-700 data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0 sm:p-16"
                >
                    <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl" />
                    <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" />

                    <div className="relative grid grid-cols-1 items-end gap-8 lg:grid-cols-2">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-700">
                                Future Outlook
                            </p>
                            <h3 className="mt-3 text-balance text-3xl font-semibold text-slate-900 sm:text-4xl lg:text-5xl">
                                {futureOutlook || 'Expanding horizons. Compounding impact.'}
                            </h3>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 lg:justify-end">
                            <button
                                onClick={handleContact}
                                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800"
                            >
                                Contact Founder
                                <ArrowRight className="h-4 w-4" />
                            </button>
                            <a
                                href="#pitch-about"
                                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/80 px-7 py-3.5 text-sm font-semibold text-slate-900 backdrop-blur transition hover:bg-white"
                            >
                                Re-read pitch
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================================================================ */}
            {/* FOOTER                                                            */}
            {/* ================================================================ */}
            <footer className="mx-auto mt-20 max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-10 border-t border-slate-200 pt-14 md:grid-cols-4">
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2.5">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-sky-400 shadow-md">
                                <Sparkles className="h-4 w-4 text-white" strokeWidth={2.5} />
                            </div>
                            <span className="text-sm font-semibold text-slate-900">
                                {businessName}
                            </span>
                        </div>
                        <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-600">
                            {description ||
                                `A company portfolio by ${studentName}. Built to be seen, measured, and invested in.`}
                        </p>
                    </div>

                    <FooterCol
                        icon={<MapPin className="h-4 w-4" />}
                        title="Address"
                        value={address || 'Add your address'}
                    />

                    <FooterCol
                        icon={<Mail className="h-4 w-4" />}
                        title="Email"
                        value={email || 'founder@example.com'}
                        href={email ? `mailto:${email}` : undefined}
                    />
                </div>

                {socialMedia && (
                    <div className="mt-10 flex items-center gap-2 text-xs text-slate-500">
                        <Share2 className="h-3.5 w-3.5" />
                        <span>{socialMedia}</span>
                    </div>
                )}

                <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-slate-200 pt-8 text-xs text-slate-500 sm:flex-row sm:items-center">
                    <p>
                        © {new Date().getFullYear()} {businessName}. All rights reserved.
                    </p>
                    <p>Crafted for investors · Single-page pitch</p>
                </div>
            </footer>
        </div>
    );
};

/* =====================================================================
   LITTLE PRESENTATIONAL BUILDING BLOCKS
   ===================================================================== */

const SectionLabel = ({ icon, text }) => (
    <div
        data-reveal
        className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700 shadow-sm backdrop-blur opacity-0 -translate-y-2 transition-all duration-500 data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0"
    >
        <span className="text-indigo-600">{icon}</span>
        {text}
    </div>
);

const FeatureCard = ({ accent, eyebrow, icon, title, image }) => (
    <div
        data-reveal
        className="group relative flex min-h-[22rem] flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-lg opacity-0 translate-y-6 transition-all duration-700 data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0"
    >
        {image ? (
            <div className="absolute inset-0 -z-10">
                <img
                    src={image}
                    alt={eyebrow}
                    className="h-full w-full object-cover opacity-20 transition duration-700 group-hover:scale-105 group-hover:opacity-30"
                    crossOrigin="anonymous"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white via-white/90 to-transparent" />
            </div>
        ) : (
            <div
                className={`absolute inset-0 -z-10 bg-gradient-to-br ${accent}`}
            />
        )}
        <div className="flex items-center gap-2 text-slate-700">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white shadow-sm text-slate-900">
                {icon}
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.18em]">
                {eyebrow}
            </span>
        </div>
        <p className="mt-6 text-pretty text-2xl font-semibold leading-snug text-slate-900 sm:text-3xl">
            {title}
        </p>
    </div>
);

const MetricTile = ({ label, value, hint, icon, highlight = false }) => (
    <div
        data-reveal
        className={`group relative overflow-hidden rounded-3xl border p-7 shadow-lg opacity-0 translate-y-6 transition-all duration-700 data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0 ${
            highlight
                ? 'border-indigo-200 bg-gradient-to-br from-indigo-100 to-transparent'
                : 'border-slate-200 bg-white'
        }`}
    >
        <div className="flex items-center gap-2 text-slate-600">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white shadow-sm text-slate-900">
                {icon}
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.18em]">
                {label}
            </span>
        </div>
        <p className="mt-6 text-balance text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl">
            {value}
        </p>
        {hint && (
            <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-600">
                {hint}
            </p>
        )}
    </div>
);

const FooterCol = ({ icon, title, value, href }) => {
    const inner = (
        <>
            <div className="flex items-center gap-2 text-slate-600">
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 bg-white shadow-sm text-slate-900">
                    {icon}
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.18em]">
                    {title}
                </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">{value}</p>
        </>
    );

    return href ? (
        <a
            href={href}
            className="block transition hover:opacity-80"
            target="_blank"
            rel="noreferrer"
        >
            {inner}
        </a>
    ) : (
        <div>{inner}</div>
    );
};

export default InvestorPitchDeck;
