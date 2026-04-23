import React, { useEffect, useState } from 'react';
import {
    ArrowRight,
    ArrowUpRight,
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

    // --- sticky nav shadow on scroll ---
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleContact = () => {
        const section = document.getElementById('pitch-contact');
        if (section) section.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen w-full bg-[#0A0F1E] text-slate-100 font-sans antialiased selection:bg-indigo-500/40 selection:text-white">
            {/* ================================================================ */}
            {/* STICKY GLASS NAV                                                  */}
            {/* ================================================================ */}
            <nav
                className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
                    scrolled
                        ? 'backdrop-blur-xl bg-[#0A0F1E]/70 border-b border-white/5'
                        : 'bg-transparent'
                }`}
            >
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-sky-400 shadow-lg shadow-indigo-500/30">
                            <Sparkles className="h-4 w-4 text-white" strokeWidth={2.5} />
                        </div>
                        <span className="text-sm font-semibold tracking-tight text-white">
                            {businessName}
                        </span>
                    </div>

                    <div className="hidden items-center gap-8 md:flex">
                        {['About', 'Market', 'Traction', 'Team', 'Gallery'].map((item) => (
                            <a
                                key={item}
                                href={`#pitch-${item.toLowerCase()}`}
                                className="text-sm text-slate-400 transition hover:text-white"
                            >
                                {item}
                            </a>
                        ))}
                    </div>

                    <button
                        onClick={handleContact}
                        className="group inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white backdrop-blur transition hover:border-white/20 hover:bg-white/10"
                    >
                        Contact
                        <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                </div>
            </nav>

            {/* ================================================================ */}
            {/* HERO                                                              */}
            {/* ================================================================ */}
            <section className="relative isolate flex min-h-screen w-full items-end overflow-hidden">
                {/* background image + overlay */}
                <div className="absolute inset-0 -z-10">
                    {image ? (
                        <img
                            src={image}
                            alt={businessName}
                            className="h-full w-full object-cover"
                            crossOrigin="anonymous"
                        />
                    ) : (
                        <div className="h-full w-full bg-[radial-gradient(ellipse_at_top,_#1e293b_0%,_#0A0F1E_60%)]" />
                    )}
                    {/* cinematic gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1E]/60 via-[#0A0F1E]/70 to-[#0A0F1E]" />
                    {/* soft colored accents */}
                    <div className="absolute -top-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-indigo-600/20 blur-3xl" />
                    <div className="absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-sky-500/20 blur-3xl" />
                </div>

                <div className="relative mx-auto w-full max-w-7xl px-4 pb-24 pt-36 sm:px-6 sm:pb-32 sm:pt-40 lg:px-8 lg:pb-40">
                    <div
                        data-reveal
                        className="max-w-4xl opacity-0 translate-y-6 transition-all duration-1000 ease-out data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0"
                    >
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300 backdrop-blur">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                            Investor Pitch Deck · 2026
                        </div>

                        <h1 className="text-balance text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl">
                            {businessName}
                        </h1>

                        <p className="mt-6 max-w-2xl text-lg text-slate-300 sm:text-xl">
                            Founded by{' '}
                            <span className="font-medium text-white">{studentName}</span>
                        </p>

                        {description && (
                            <p className="mt-8 max-w-2xl text-pretty text-base leading-relaxed text-slate-400 sm:text-lg">
                                {description}
                            </p>
                        )}

                        <div className="mt-12 flex flex-wrap items-center gap-4">
                            <button
                                onClick={handleContact}
                                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#0A0F1E] shadow-2xl shadow-white/10 transition hover:shadow-white/20"
                            >
                                <span className="relative z-10">Contact Founder</span>
                                <ArrowRight className="relative z-10 h-4 w-4 transition group-hover:translate-x-1" />
                                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-indigo-400 to-sky-400 opacity-0 transition duration-500 group-hover:translate-x-0 group-hover:opacity-20" />
                            </button>

                            <a
                                href="#pitch-about"
                                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:border-white/25 hover:bg-white/10"
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
            {/* ABOUT US — BENTO                                                  */}
            {/* ================================================================ */}
            <section
                id="pitch-about"
                className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
            >
                <SectionLabel icon={<Quote className="h-3.5 w-3.5" />} text="About Us" />

                <h2
                    data-reveal
                    className="mt-6 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-white opacity-0 translate-y-6 transition-all duration-700 data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0 sm:text-5xl"
                >
                    Built with purpose.{' '}
                    <span className="bg-gradient-to-r from-indigo-300 via-sky-300 to-teal-200 bg-clip-text text-transparent">
                        Scaled with vision.
                    </span>
                </h2>

                <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-5">
                    {/* Introduction — large */}
                    <BentoCard
                        className="md:col-span-4"
                        eyebrow="Introduction"
                        title={introduction || `Welcome to ${businessName}.`}
                        body={aboutUs}
                    />

                    {/* Goals */}
                    <BentoCard
                        className="md:col-span-2 bg-gradient-to-br from-indigo-500/20 via-sky-500/10 to-transparent border-indigo-400/20"
                        eyebrow="Our Goals"
                        title={ourGoals || 'Expand reach, deepen impact, stay profitable.'}
                        icon={<Target className="h-5 w-5 text-indigo-300" />}
                    />

                    {/* Mission */}
                    <BentoCard
                        className="md:col-span-3"
                        eyebrow="Mission & Vision"
                        title={missionVision || 'To be the leading brand regionally with global standards.'}
                        icon={<Rocket className="h-5 w-5 text-sky-300" />}
                    />

                    {/* Image card */}
                    <div
                        data-reveal
                        className="relative md:col-span-3 overflow-hidden rounded-2xl border border-white/10 opacity-0 translate-y-6 transition-all duration-700 data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0"
                    >
                        {image ? (
                            <img
                                src={image}
                                alt={businessName}
                                className="h-full w-full min-h-64 object-cover transition duration-700 hover:scale-105"
                                crossOrigin="anonymous"
                            />
                        ) : (
                            <div className="h-full min-h-64 w-full bg-gradient-to-br from-indigo-600/40 via-sky-500/30 to-teal-400/20" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E] via-transparent" />
                        <div className="absolute bottom-4 left-4 text-xs uppercase tracking-[0.18em] text-white/70">
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
                className="relative border-y border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent"
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
                                className="mt-6 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-white opacity-0 translate-y-6 transition-all duration-700 data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0 sm:text-5xl"
                            >
                                Product, market, and a clear edge.
                            </h2>
                        </div>
                    </div>

                    <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Products & Services */}
                        <FeatureCard
                            accent="from-indigo-500/40 to-sky-500/20"
                            eyebrow="Key Products & Services"
                            icon={<Sparkles className="h-5 w-5" />}
                            title={keyProductsServices || 'Signature offerings crafted for the modern customer.'}
                            image={shopImages?.[0]}
                        />

                        {/* Target Market */}
                        <FeatureCard
                            accent="from-amber-400/40 to-rose-500/20"
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
                    className="mt-6 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-white opacity-0 translate-y-6 transition-all duration-700 data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0 sm:text-5xl"
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
                    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-10">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.18),_transparent_60%)]" />

                        <div className="relative flex items-start justify-between">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                                    Monthly Sales Trend
                                </p>
                                <p className="mt-2 text-2xl font-semibold text-white">
                                    Live revenue visualization
                                </p>
                            </div>
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                Growing
                            </span>
                        </div>

                        {/* Placeholder chart area — drop Recharts here later */}
                        <div
                            id="sales-chart-placeholder"
                            className="relative mt-8 flex h-72 items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#070B17] sm:h-80"
                        >
                            <div className="text-center">
                                <p className="text-sm font-medium text-slate-400">
                                    Sales Chart Goes Here
                                </p>
                                <p className="mt-1 text-xs text-slate-600">
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
                                        id="grid"
                                        width="40"
                                        height="40"
                                        patternUnits="userSpaceOnUse"
                                    >
                                        <path
                                            d="M 40 0 L 0 0 0 40"
                                            fill="none"
                                            stroke="rgba(255,255,255,0.06)"
                                            strokeWidth="1"
                                        />
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#grid)" />
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
                className="relative border-y border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent"
            >
                <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
                    <SectionLabel icon={<Users className="h-3.5 w-3.5" />} text="Team & Milestones" />

                    <h2
                        data-reveal
                        className="mt-6 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-white opacity-0 translate-y-6 transition-all duration-700 data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0 sm:text-5xl"
                    >
                        The people behind the product.
                    </h2>

                    <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3">
                        {/* Founder */}
                        <div
                            data-reveal
                            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 opacity-0 translate-y-6 transition-all duration-700 data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0"
                        >
                            <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-indigo-500/20 blur-3xl transition group-hover:bg-indigo-500/30" />
                            <div className="relative">
                                <p className="text-xs font-medium uppercase tracking-[0.18em] text-indigo-300">
                                    Founder
                                </p>
                                <div className="mt-6 flex items-center gap-4">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-sky-400 text-xl font-semibold text-white">
                                        {(founder || studentName || 'F').charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-xl font-semibold text-white">
                                            {founder || studentName}
                                        </p>
                                        <p className="text-sm text-slate-400">Chief Executive</p>
                                    </div>
                                </div>
                                <p className="mt-6 text-sm leading-relaxed text-slate-400">
                                    Leading vision, growth, and operations.
                                </p>
                            </div>
                        </div>

                        {/* Team */}
                        <div
                            data-reveal
                            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 opacity-0 translate-y-6 transition-all duration-700 data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0 lg:col-span-1"
                        >
                            <p className="text-xs font-medium uppercase tracking-[0.18em] text-sky-300">
                                Our Team
                            </p>
                            <Users className="mt-6 h-6 w-6 text-sky-300" />
                            <p className="mt-4 text-lg font-medium leading-relaxed text-white">
                                {ourTeam || 'A tight-knit, cross-functional team.'}
                            </p>
                        </div>

                        {/* Best Achievement — highlighted trophy */}
                        <div
                            data-reveal
                            className="relative overflow-hidden rounded-3xl border border-amber-300/30 bg-gradient-to-br from-amber-400/20 via-amber-500/10 to-transparent p-8 opacity-0 translate-y-6 transition-all duration-700 data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0"
                        >
                            <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-amber-300/20 blur-3xl" />
                            <div className="relative">
                                <div className="flex items-center gap-2">
                                    <Trophy className="h-5 w-5 text-amber-300" />
                                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-amber-200">
                                        Best Achievement
                                    </p>
                                </div>
                                <p className="mt-6 text-xl font-semibold leading-snug text-white">
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
                        className="mt-6 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-white opacity-0 translate-y-6 transition-all duration-700 data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0 sm:text-5xl"
                    >
                        A look inside.
                    </h2>

                    <div className="mt-14 columns-1 gap-4 sm:columns-2 lg:columns-3 [column-fill:_balance]">
                        {shopImages.map((img, idx) => (
                            <div
                                key={idx}
                                className="mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
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
                    className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-indigo-600/30 via-sky-500/20 to-teal-400/10 p-10 opacity-0 translate-y-6 transition-all duration-700 data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0 sm:p-16"
                >
                    <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-500/30 blur-3xl" />
                    <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-sky-400/30 blur-3xl" />

                    <div className="relative grid grid-cols-1 items-end gap-8 lg:grid-cols-2">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-[0.18em] text-indigo-200">
                                Future Outlook
                            </p>
                            <h3 className="mt-3 text-balance text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
                                {futureOutlook || 'Expanding horizons. Compounding impact.'}
                            </h3>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 lg:justify-end">
                            <button
                                onClick={handleContact}
                                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#0A0F1E] transition hover:bg-slate-100"
                            >
                                Contact Founder
                                <ArrowRight className="h-4 w-4" />
                            </button>
                            <a
                                href="#pitch-about"
                                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
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
                <div className="grid grid-cols-1 gap-10 border-t border-white/5 pt-14 md:grid-cols-4">
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2.5">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-sky-400">
                                <Sparkles className="h-4 w-4 text-white" strokeWidth={2.5} />
                            </div>
                            <span className="text-sm font-semibold text-white">
                                {businessName}
                            </span>
                        </div>
                        <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400">
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

                <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-8 text-xs text-slate-500 sm:flex-row sm:items-center">
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
        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-300 backdrop-blur opacity-0 -translate-y-2 transition-all duration-500 data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0"
    >
        <span className="text-indigo-300">{icon}</span>
        {text}
    </div>
);

const BentoCard = ({ className = '', eyebrow, title, body, icon }) => (
    <div
        data-reveal
        className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 opacity-0 translate-y-6 transition-all duration-700 data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0 hover:border-white/20 hover:bg-white/[0.05] ${className}`}
    >
        <div className="flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                {eyebrow}
            </p>
            {icon}
        </div>
        <p className="mt-4 text-pretty text-lg font-medium leading-snug text-white sm:text-xl">
            {title}
        </p>
        {body && (
            <p className="mt-4 text-sm leading-relaxed text-slate-400">{body}</p>
        )}
    </div>
);

const FeatureCard = ({ accent, eyebrow, icon, title, image }) => (
    <div
        data-reveal
        className="group relative flex min-h-[22rem] flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 opacity-0 translate-y-6 transition-all duration-700 data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0"
    >
        {image ? (
            <div className="absolute inset-0 -z-10">
                <img
                    src={image}
                    alt={eyebrow}
                    className="h-full w-full object-cover opacity-30 transition duration-700 group-hover:scale-105 group-hover:opacity-40"
                    crossOrigin="anonymous"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F1E] via-[#0A0F1E]/80 to-transparent" />
            </div>
        ) : (
            <div
                className={`absolute inset-0 -z-10 bg-gradient-to-br ${accent}`}
            />
        )}
        <div className="flex items-center gap-2 text-slate-300">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white">
                {icon}
            </span>
            <span className="text-xs font-medium uppercase tracking-[0.18em]">
                {eyebrow}
            </span>
        </div>
        <p className="mt-6 text-pretty text-2xl font-semibold leading-snug text-white sm:text-3xl">
            {title}
        </p>
    </div>
);

const MetricTile = ({ label, value, hint, icon, highlight = false }) => (
    <div
        data-reveal
        className={`group relative overflow-hidden rounded-3xl border p-7 opacity-0 translate-y-6 transition-all duration-700 data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0 ${
            highlight
                ? 'border-indigo-400/30 bg-gradient-to-br from-indigo-500/20 via-sky-500/10 to-transparent'
                : 'border-white/10 bg-white/[0.03]'
        }`}
    >
        <div className="flex items-center gap-2 text-slate-400">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white">
                {icon}
            </span>
            <span className="text-xs font-medium uppercase tracking-[0.18em]">
                {label}
            </span>
        </div>
        <p className="mt-6 text-balance text-3xl font-semibold leading-tight text-white sm:text-4xl">
            {value}
        </p>
        {hint && (
            <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-400">
                {hint}
            </p>
        )}
    </div>
);

const FooterCol = ({ icon, title, value, href }) => {
    const inner = (
        <>
            <div className="flex items-center gap-2 text-slate-400">
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white">
                    {icon}
                </span>
                <span className="text-xs font-medium uppercase tracking-[0.18em]">
                    {title}
                </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">{value}</p>
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
