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
    Compass,
    Package,
    Flag,
} from 'lucide-react';

/**
 * InvestorPitchDeck
 * ------------------------------------------------------------------
 * Single-page scroll pitch deck (LIGHT MODE / WHITE PREMIUM).
 * - No navbar (host app provides its own global nav).
 * - Strict section order as per brief.
 * - Editorial zig-zag layout (no bento grid).
 * - Infinite right-to-left marquee for the shop gallery.
 * - Subtle scroll-reveal via IntersectionObserver.
 * ------------------------------------------------------------------
 */
const InvestorPitchDeck = ({ portfolio }) => {
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

    // --- scroll-reveal ---
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

    // Safe image pool for editorial sections (falls back to hero image if shopImages is thin).
    const editorialPool =
        Array.isArray(shopImages) && shopImages.length > 0
            ? shopImages
            : image
                ? [image]
                : [];
    const pickImage = (idx) =>
        editorialPool.length > 0
            ? editorialPool[idx % editorialPool.length]
            : null;

    // Parse monthly revenue into a visible display string (supports number or string).
    const formattedRevenue =
        monthlyRevenue !== undefined && monthlyRevenue !== null && monthlyRevenue !== ''
            ? typeof monthlyRevenue === 'number'
                ? `RM ${monthlyRevenue.toLocaleString()}`
                : String(monthlyRevenue)
            : 'RM —';

    // Normalise paymentMethods into an array of chip labels.
    const paymentMethodList = Array.isArray(paymentMethods)
        ? paymentMethods
        : typeof paymentMethods === 'string' && paymentMethods.trim()
            ? paymentMethods.split(/[,|;]/).map((s) => s.trim()).filter(Boolean)
            : [];

    // Normalise socialMedia (array of {platform, url} OR object map OR string).
    const socialList = (() => {
        if (!socialMedia) return [];
        if (Array.isArray(socialMedia)) return socialMedia;
        if (typeof socialMedia === 'object') {
            return Object.entries(socialMedia)
                .filter(([, v]) => !!v)
                .map(([platform, url]) => ({ platform, url }));
        }
        if (typeof socialMedia === 'string') return [{ platform: 'Link', url: socialMedia }];
        return [];
    })();

    const handleContact = () => {
        const section = document.getElementById('pitch-contact');
        if (section) section.scrollIntoView({ behavior: 'smooth' });
    };

    // Marquee list — duplicate for seamless loop.
    const marqueeImages =
        Array.isArray(shopImages) && shopImages.length > 0
            ? [...shopImages, ...shopImages]
            : [];

    return (
        <div className="min-h-screen w-full bg-[#FAFAF9] text-slate-900 font-sans antialiased selection:bg-indigo-200 selection:text-slate-900">
            {/* Local styles: scroll-reveal + marquee keyframes */}
            <style>{`
                [data-reveal]{opacity:0;transform:translateY(24px);transition:opacity .9s ease,transform .9s cubic-bezier(.2,.7,.2,1)}
                [data-reveal][data-revealed="true"]{opacity:1;transform:none}
                @keyframes pitch-marquee {
                    from { transform: translate3d(0,0,0); }
                    to   { transform: translate3d(-50%,0,0); }
                }
                .pitch-marquee-track {
                    animation: pitch-marquee 45s linear infinite;
                    will-change: transform;
                }
                .pitch-marquee-track:hover { animation-play-state: paused; }
                @media (prefers-reduced-motion: reduce) {
                    .pitch-marquee-track { animation: none; }
                    [data-reveal]{opacity:1;transform:none;transition:none}
                }
            `}</style>

            {/* ================================================================ */}
            {/* 1. HERO — image background + businessName + studentName + desc    */}
            {/* ================================================================ */}
            <section className="relative isolate overflow-hidden">
                {/* Background image */}
                {image ? (
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 -z-10 bg-cover bg-center"
                        style={{ backgroundImage: `url(${image})` }}
                    />
                ) : (
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-slate-50 to-slate-100"
                    />
                )}
                {/* Soft white overlay for legibility in light mode */}
                <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 bg-gradient-to-b from-white/85 via-white/70 to-white/95"
                />
                {/* Pastel orbs */}
                <div
                    aria-hidden="true"
                    className="absolute -top-32 -left-32 -z-10 h-[28rem] w-[28rem] rounded-full bg-indigo-100/60 blur-3xl"
                />
                <div
                    aria-hidden="true"
                    className="absolute -bottom-40 -right-24 -z-10 h-[32rem] w-[32rem] rounded-full bg-amber-100/50 blur-3xl"
                />

                <div className="mx-auto flex min-h-[92vh] max-w-7xl flex-col items-start justify-center px-6 pt-28 pb-24 sm:px-10 sm:pt-32 lg:px-16">
                    <div
                        data-reveal
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-1.5 text-xs font-medium tracking-widest text-slate-600 uppercase shadow-sm backdrop-blur"
                    >
                        <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
                        Investor Pitch · {new Date().getFullYear()}
                    </div>

                    <h1
                        data-reveal
                        className="mt-8 max-w-5xl text-balance font-serif text-5xl font-semibold leading-[1.02] tracking-tight text-slate-900 sm:text-6xl md:text-7xl lg:text-[88px]"
                        style={{ fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", serif' }}
                    >
                        {businessName}
                    </h1>

                    <p
                        data-reveal
                        className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-700 sm:text-xl"
                    >
                        Founded by{' '}
                        <span className="font-semibold text-slate-900">{studentName}</span>
                        {description ? (
                            <>
                                {' '}
                                — <span className="text-slate-600">{description}</span>
                            </>
                        ) : null}
                    </p>

                    <div data-reveal className="mt-10 flex flex-wrap items-center gap-4">
                        <button
                            type="button"
                            onClick={handleContact}
                            className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/20"
                        >
                            Contact Founder
                            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                        </button>
                        <a
                            href="#pitch-introduction"
                            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/80 px-7 py-3.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:border-slate-400 hover:bg-white"
                        >
                            Explore the Deck
                        </a>
                    </div>

                    <div
                        data-reveal
                        className="mt-16 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-500"
                    >
                        <ChevronDown className="h-4 w-4 animate-bounce text-slate-400" />
                        Scroll to begin
                    </div>
                </div>
            </section>

            {/* ================================================================ */}
            {/* 2. INTRODUCTION — editorial, text-forward                         */}
            {/* ================================================================ */}
            <Section id="pitch-introduction" eyebrow="01 — Introduction" title="A brief introduction">
                <EditorialRow
                    reverse={false}
                    image={pickImage(0)}
                    imageLabel={businessName}
                    accentTone="indigo"
                >
                    <SectionBody text={introduction} placeholder="{landingPage.introduction}" />
                </EditorialRow>
            </Section>

            {/* ================================================================ */}
            {/* 3. ABOUT US                                                       */}
            {/* ================================================================ */}
            <Section id="pitch-about" eyebrow="02 — About Us" title="Who we are">
                <EditorialRow reverse={true} image={pickImage(1)} imageLabel="Our Story" accentTone="sky">
                    <SectionBody text={aboutUs} placeholder="{landingPage.aboutUs}" />
                </EditorialRow>
            </Section>

            {/* ================================================================ */}
            {/* 4. MISSION & VISION                                               */}
            {/* ================================================================ */}
            <Section
                id="pitch-mission"
                eyebrow="03 — Mission & Vision"
                title="What drives us"
                icon={<Compass className="h-5 w-5" />}
            >
                <EditorialRow reverse={false} image={pickImage(2)} imageLabel="North Star" accentTone="teal">
                    <SectionBody
                        text={missionVision}
                        placeholder="{landingPage.missionVision}"
                        variant="quote"
                    />
                </EditorialRow>
            </Section>

            {/* ================================================================ */}
            {/* 5. KEY PRODUCTS & SERVICES                                        */}
            {/* ================================================================ */}
            <Section
                id="pitch-products"
                eyebrow="04 — Key Products & Services"
                title="What we offer"
                icon={<Package className="h-5 w-5" />}
            >
                <EditorialRow reverse={true} image={pickImage(3)} imageLabel="Our Offerings" accentTone="amber">
                    <SectionBody
                        text={keyProductsServices}
                        placeholder="{landingPage.keyProductsServices}"
                    />
                </EditorialRow>
            </Section>

            {/* ================================================================ */}
            {/* 6. TARGET MARKET                                                  */}
            {/* ================================================================ */}
            <Section
                id="pitch-market"
                eyebrow="05 — Target Market"
                title="Who we serve"
                icon={<Target className="h-5 w-5" />}
            >
                <EditorialRow reverse={false} image={pickImage(4)} imageLabel="Our Audience" accentTone="indigo">
                    <SectionBody text={targetMarket} placeholder="{landingPage.targetMarket}" />
                </EditorialRow>
            </Section>

            {/* ================================================================ */}
            {/* 7. FOUNDER                                                        */}
            {/* ================================================================ */}
            <Section
                id="pitch-founder"
                eyebrow="06 — Founder"
                title="Meet the founder"
            >
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
                    <div data-reveal className="lg:col-span-5">
                        <div className="relative overflow-hidden rounded-3xl bg-white p-2 shadow-xl shadow-slate-900/5 ring-1 ring-slate-200/80">
                            <div className="flex aspect-[4/5] items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-50 via-white to-slate-100">
                                <div className="flex h-40 w-40 items-center justify-center rounded-full bg-white text-5xl font-semibold text-slate-800 shadow-md ring-1 ring-slate-200">
                                    {(studentName || 'F').trim().charAt(0).toUpperCase()}
                                </div>
                            </div>
                            <div className="absolute bottom-5 left-5 rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-slate-700 shadow-sm ring-1 ring-slate-200 backdrop-blur">
                                Founder &amp; CEO
                            </div>
                        </div>
                    </div>

                    <div data-reveal className="lg:col-span-7">
                        <Quote className="h-8 w-8 text-indigo-400" aria-hidden="true" />
                        <h3 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                            {studentName}
                        </h3>
                        <div className="mt-6 max-w-xl">
                            <SectionBody text={founder} placeholder="{landingPage.founder}" />
                        </div>
                    </div>
                </div>
            </Section>

            {/* ================================================================ */}
            {/* 8. OUR TEAM                                                       */}
            {/* ================================================================ */}
            <Section
                id="pitch-team"
                eyebrow="07 — Our Team"
                title="The people behind the work"
                icon={<Users className="h-5 w-5" />}
            >
                <EditorialRow reverse={true} image={pickImage(5)} imageLabel="Our Team" accentTone="sky">
                    <SectionBody text={ourTeam} placeholder="{landingPage.ourTeam}" />
                </EditorialRow>
            </Section>

            {/* ================================================================ */}
            {/* 9. OUR GOALS                                                      */}
            {/* ================================================================ */}
            <Section
                id="pitch-goals"
                eyebrow="08 — Our Goals"
                title="Where we&apos;re heading"
                icon={<Flag className="h-5 w-5" />}
            >
                <EditorialRow reverse={false} image={pickImage(6)} imageLabel="Objectives" accentTone="teal">
                    <SectionBody text={ourGoals} placeholder="{landingPage.ourGoals}" />
                </EditorialRow>
            </Section>

            {/* ================================================================ */}
            {/* 10. BEST ACHIEVEMENT — HIGHLIGHTED                                */}
            {/* ================================================================ */}
            <section id="pitch-achievement" className="relative py-28 sm:py-36">
                <div className="absolute inset-x-0 top-1/2 -z-10 h-[70%] -translate-y-1/2 bg-gradient-to-r from-amber-50 via-white to-amber-50" />
                <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
                    <div
                        data-reveal
                        className="relative overflow-hidden rounded-[2.25rem] bg-white p-8 shadow-2xl shadow-amber-900/10 ring-1 ring-amber-100 sm:p-14"
                    >
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-amber-200/40 blur-3xl"
                        />
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-amber-100/50 blur-3xl"
                        />

                        <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
                            <div className="lg:col-span-4">
                                <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-500/30">
                                    <Trophy className="h-12 w-12 text-white" aria-hidden="true" />
                                </div>
                                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">
                                    09 — Best Achievement
                                </p>
                                <h3 className="mt-3 font-serif text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl">
                                    Our proudest milestone so far.
                                </h3>
                            </div>

                            <div className="lg:col-span-8">
                                <div className="rounded-2xl bg-slate-50/80 p-8 ring-1 ring-slate-200">
                                    <SectionBody
                                        text={bestAchievement}
                                        placeholder="{landingPage.bestAchievement}"
                                        variant="quote"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================================================================ */}
            {/* 11. FUTURE OUTLOOK                                                */}
            {/* ================================================================ */}
            <Section
                id="pitch-outlook"
                eyebrow="10 — Future Outlook"
                title="What&apos;s next"
                icon={<Rocket className="h-5 w-5" />}
            >
                <EditorialRow reverse={true} image={pickImage(7)} imageLabel="Horizon" accentTone="indigo">
                    <SectionBody text={futureOutlook} placeholder="{landingPage.futureOutlook}" />
                </EditorialRow>
            </Section>

            {/* ================================================================ */}
            {/* 12. SALES & TRACTION                                              */}
            {/* ================================================================ */}
            <section id="pitch-sales" className="bg-white py-28 sm:py-36">
                <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
                    <div data-reveal className="max-w-3xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">
                            11 — Sales &amp; Traction
                        </p>
                        <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
                            Momentum in numbers.
                        </h2>
                    </div>

                    <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Monthly revenue */}
                        <div
                            data-reveal
                            className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-xl shadow-slate-900/5 ring-1 ring-slate-200/80"
                        >
                            <div className="flex items-center gap-3 text-slate-500">
                                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
                                    <TrendingUp className="h-5 w-5" />
                                </div>
                                <p className="text-sm font-medium uppercase tracking-widest">
                                    Monthly revenue
                                </p>
                            </div>
                            <p className="mt-6 font-serif text-5xl font-semibold tracking-tight text-slate-900 sm:text-6xl">
                                {formattedRevenue}
                            </p>
                            <p className="mt-2 text-sm text-slate-500">
                                {'{'}salesRevenue.monthlyRevenue{'}'}
                            </p>
                        </div>

                        {/* Payment methods */}
                        <div
                            data-reveal
                            className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-xl shadow-slate-900/5 ring-1 ring-slate-200/80"
                        >
                            <div className="flex items-center gap-3 text-slate-500">
                                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 ring-1 ring-teal-100">
                                    <CreditCard className="h-5 w-5" />
                                </div>
                                <p className="text-sm font-medium uppercase tracking-widest">
                                    Payment methods
                                </p>
                            </div>

                            {paymentMethodList.length > 0 ? (
                                <div className="mt-6 flex flex-wrap gap-2">
                                    {paymentMethodList.map((method, i) => (
                                        <span
                                            key={`${method}-${i}`}
                                            className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 ring-1 ring-slate-200"
                                        >
                                            {method}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <p className="mt-6 text-lg text-slate-400 italic">
                                    {'{'}salesRevenue.paymentMethods{'}'}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Sales chart placeholder (required) */}
                    <div data-reveal className="mt-8">
                        <div
                            id="sales-chart-placeholder"
                            className="flex min-h-[22rem] w-full items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50/70 p-10 text-center shadow-inner"
                        >
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                                    Chart Canvas
                                </p>
                                <p className="mt-3 font-serif text-2xl font-medium text-slate-500">
                                    Sales chart goes here
                                </p>
                                <p className="mt-2 text-sm text-slate-400">
                                    #sales-chart-placeholder
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================================================================ */}
            {/* 13. PRODUCT / SHOP GALLERY — INFINITE MARQUEE                     */}
            {/* ================================================================ */}
            <section id="pitch-gallery" className="bg-[#FAFAF9] py-28 sm:py-36">
                <div className="mx-auto mb-14 max-w-7xl px-6 sm:px-10 lg:px-16">
                    <div data-reveal className="flex flex-wrap items-end justify-between gap-6">
                        <div className="max-w-2xl">
                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">
                                12 — Gallery
                            </p>
                            <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
                                Products in the wild.
                            </h2>
                        </div>
                        <p className="max-w-sm text-sm leading-relaxed text-slate-500">
                            A glimpse of our shop, our products and our craft — updated straight from{' '}
                            <span className="font-medium text-slate-700">{'{shopImages}'}</span>.
                        </p>
                    </div>
                </div>

                {/* Marquee — edge fades + continuous right-to-left */}
                <div
                    data-reveal
                    className="group relative overflow-hidden"
                    style={{
                        maskImage:
                            'linear-gradient(to right, transparent 0, #000 7%, #000 93%, transparent 100%)',
                        WebkitMaskImage:
                            'linear-gradient(to right, transparent 0, #000 7%, #000 93%, transparent 100%)',
                    }}
                >
                    {marqueeImages.length > 0 ? (
                        <div className="pitch-marquee-track flex w-max gap-6">
                            {marqueeImages.map((src, i) => (
                                <figure
                                    key={`marquee-${i}`}
                                    className="relative h-72 w-[22rem] flex-shrink-0 overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-900/5 ring-1 ring-slate-200 sm:h-80 sm:w-[26rem]"
                                >
                                    <img
                                        src={src || '/placeholder.svg'}
                                        alt={`${businessName} product ${i + 1}`}
                                        className="h-full w-full object-cover"
                                        loading="lazy"
                                        crossOrigin="anonymous"
                                    />
                                </figure>
                            ))}
                        </div>
                    ) : (
                        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
                            <div className="flex h-72 items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white/60 text-slate-400">
                                Add images to{' '}
                                <span className="mx-2 font-medium text-slate-600">
                                    {'{shopImages}'}
                                </span>{' '}
                                to populate the marquee.
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* ================================================================ */}
            {/* 14. CONTACT INFO (Footer)                                         */}
            {/* ================================================================ */}
            <footer id="pitch-contact" className="bg-white">
                <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-28 lg:px-16">
                    <div data-reveal className="grid grid-cols-1 gap-14 lg:grid-cols-12">
                        <div className="lg:col-span-7">
                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">
                                13 — Contact
                            </p>
                            <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
                                Let&apos;s build the future of{' '}
                                <span className="italic text-slate-500">{businessName}</span>{' '}
                                together.
                            </h2>
                        </div>

                        <div className="space-y-6 lg:col-span-5">
                            {/* Address */}
                            <div className="flex items-start gap-4 rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
                                <div className="mt-0.5 flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm ring-1 ring-slate-200">
                                    <MapPin className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                                        Address
                                    </p>
                                    <p className="mt-1 text-base leading-relaxed text-slate-800">
                                        {address || (
                                            <span className="italic text-slate-400">
                                                {'{landingPage.contactInfo.address}'}
                                            </span>
                                        )}
                                    </p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-start gap-4 rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
                                <div className="mt-0.5 flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm ring-1 ring-slate-200">
                                    <Mail className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                                        Email
                                    </p>
                                    {email ? (
                                        <a
                                            href={`mailto:${email}`}
                                            className="mt-1 block text-base font-medium text-slate-900 underline decoration-slate-300 underline-offset-4 transition hover:decoration-slate-600"
                                        >
                                            {email}
                                        </a>
                                    ) : (
                                        <p className="mt-1 italic text-slate-400">
                                            {'{landingPage.contactInfo.email}'}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Social */}
                            <div className="flex items-start gap-4 rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
                                <div className="mt-0.5 flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm ring-1 ring-slate-200">
                                    <Share2 className="h-5 w-5" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                                        Social media
                                    </p>
                                    {socialList.length > 0 ? (
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {socialList.map((s, i) => (
                                                <a
                                                    key={`${s.platform}-${i}`}
                                                    href={s.url || '#'}
                                                    target="_blank"
                                                    rel="noreferrer noopener"
                                                    className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-slate-800 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-900 hover:text-white"
                                                >
                                                    {s.platform}
                                                </a>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="mt-1 italic text-slate-400">
                                            {'{landingPage.contactInfo.socialMedia}'}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row sm:items-center">
                        <p className="text-sm text-slate-500">
                            © {new Date().getFullYear()} {businessName}. Crafted with intention by{' '}
                            {studentName}.
                        </p>
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                            Investor Pitch Deck
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

/* ==================================================================== */
/* Reusable bits                                                         */
/* ==================================================================== */

const Section = ({ id, eyebrow, title, icon, children }) => (
    <section id={id} className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
            <header data-reveal className="mb-14 max-w-3xl">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">
                    {icon ? (
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
                            {icon}
                        </span>
                    ) : null}
                    {eyebrow}
                </p>
                <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
                    {title}
                </h2>
            </header>
            {children}
        </div>
    </section>
);

/** Zig-zag editorial row: image on one side, prose on the other. */
const EditorialRow = ({ reverse = false, image, imageLabel, accentTone = 'indigo', children }) => {
    const tones = {
        indigo: 'from-indigo-50 via-white to-slate-50',
        sky: 'from-sky-50 via-white to-slate-50',
        teal: 'from-teal-50 via-white to-slate-50',
        amber: 'from-amber-50 via-white to-slate-50',
    };
    const tone = tones[accentTone] || tones.indigo;

    return (
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div
                data-reveal
                className={`order-1 lg:col-span-6 ${reverse ? 'lg:order-2' : 'lg:order-1'}`}
            >
                <div className="relative overflow-hidden rounded-3xl bg-white p-2 shadow-2xl shadow-slate-900/5 ring-1 ring-slate-200/80">
                    {image ? (
                        <img
                            src={image || '/placeholder.svg'}
                            alt={imageLabel || 'Editorial visual'}
                            className="h-[30rem] w-full rounded-2xl object-cover"
                            loading="lazy"
                            crossOrigin="anonymous"
                        />
                    ) : (
                        <div
                            className={`flex h-[30rem] items-center justify-center rounded-2xl bg-gradient-to-br ${tone} text-slate-400`}
                        >
                            <span className="italic">{'{shopImages}'}</span>
                        </div>
                    )}
                    {imageLabel ? (
                        <div className="absolute bottom-5 left-5 rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-slate-700 shadow-sm ring-1 ring-slate-200 backdrop-blur">
                            {imageLabel}
                        </div>
                    ) : null}
                </div>
            </div>

            <div
                data-reveal
                className={`order-2 lg:col-span-6 ${reverse ? 'lg:order-1 lg:pr-6' : 'lg:order-2 lg:pl-6'}`}
            >
                {children}
            </div>
        </div>
    );
};

/** Renders portfolio prose nicely (splits paragraphs on blank lines). */
const SectionBody = ({ text, placeholder, variant = 'default' }) => {
    if (!text) {
        return (
            <p className="italic text-slate-400">
                {placeholder}
            </p>
        );
    }
    const paragraphs = String(text)
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean);

    if (variant === 'quote') {
        return (
            <blockquote className="relative border-l-2 border-indigo-200 pl-6">
                {paragraphs.map((p, i) => (
                    <p
                        key={i}
                        className="mb-4 font-serif text-2xl leading-relaxed text-slate-800 sm:text-3xl"
                    >
                        {p}
                    </p>
                ))}
            </blockquote>
        );
    }

    return (
        <div className="space-y-5 text-lg leading-relaxed text-slate-700 sm:text-xl">
            {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
            ))}
        </div>
    );
};

export default InvestorPitchDeck;
