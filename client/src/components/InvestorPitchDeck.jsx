import React, { useEffect } from 'react';
import {
    MapPin, Mail, Share2, Target, Trophy, Users, Compass, Package, Globe, Smartphone,
    Link2
} from 'lucide-react';
import {
    FaInstagram, FaFacebook, FaTwitter, FaLinkedin, FaYoutube, FaGithub
} from 'react-icons/fa';
import { FaTiktok, FaThreads } from 'react-icons/fa6';

/**
 * InvestorPitchDeck
 * ------------------------------------------------------------------
 * Single-page scroll pitch deck (LIGHT MODE / WHITE PREMIUM).
 * Dibina semula sepenuhnya dengan skema "Landing Page 0-9" dinamik.
 * ------------------------------------------------------------------
 */
const InvestorPitchDeck = ({ portfolio }) => {
    // Tarik keluar struktur data 0-9 dengan selamat
    const {
        businessName = 'Our Company',
        aboutUs = '',
        missionVision = {},
        ourTeam = [],
        ourServices = [],
        products = [],
        targetMarket = {},
        achievements = [],
        contactInfo = {}
    } = portfolio || {};

    const { phone, email, address, website, socials = {} } = contactInfo;

    // --- scroll-reveal efek ---
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

    // Marquee list untuk produk (digandakan supaya loop tak putus)
    const marqueeImages = products.length > 0 ? [...products, ...products].map(p => p.image).filter(Boolean) : [];

    // Proses sosial media
    const socialList = Object.entries(socials)
        .filter(([, url]) => !!url)
        .map(([platform, url]) => ({ platform, url }));

    // Helper untuk cari gambar rawak (fallback untuk EditorialRow)
    const allImages = [...marqueeImages, missionVision.graphicInfo, ...(ourTeam.map(t => t.image)), ...(achievements.map(a => a.image))].filter(Boolean);
    const getEditorialImage = (index) => allImages.length > 0 ? allImages[index % allImages.length] : null;

    const getSocialIcon = (platform) => {
        const p = platform.toLowerCase();
        if (p.includes('instagram') || p.includes('insta')) return <FaInstagram className="h-5 w-5" />;
        if (p.includes('facebook') || p.includes('fb')) return <FaFacebook className="h-5 w-5" />;
        if (p.includes('twitter') || p.includes('x')) return <FaTwitter className="h-5 w-5" />;
        if (p.includes('linkedin')) return <FaLinkedin className="h-5 w-5" />;
        if (p.includes('youtube') || p.includes('yt')) return <FaYoutube className="h-5 w-5" />;
        if (p.includes('github') || p.includes('git')) return <FaGithub className="h-5 w-5" />;
        if (p.includes('tiktok')) return <FaTiktok className="h-5 w-5" />;
        if (p.includes('threads')) return <FaThreads className="h-5 w-5" />;
        return <Link2 className="h-5 w-5" />;
    };

    return (
        <div className="min-h-screen w-full bg-[#FAFAF9] text-slate-900 font-sans antialiased selection:bg-indigo-200 selection:text-slate-900">
            <style>{`
                [data-reveal]{opacity:0;transform:translateY(24px);transition:opacity .9s ease,transform .9s cubic-bezier(.2,.7,.2,1)}
                [data-reveal][data-revealed="true"]{opacity:1;transform:none}
                @keyframes pitch-marquee {
                    from { transform: translate3d(0,0,0); }
                    to   { transform: translate3d(-50%,0,0); }
                }
                .pitch-marquee-track { animation: pitch-marquee 45s linear infinite; will-change: transform; }
                .pitch-marquee-track:hover { animation-play-state: paused; }
                @media (prefers-reduced-motion: reduce) {
                    .pitch-marquee-track { animation: none; }
                    [data-reveal]{opacity:1;transform:none;transition:none}
                }
            `}</style>

            <div className="fixed inset-0 z-[-1] pointer-events-none">
                <div className="absolute top-0 left-0 w-[50rem] h-[50rem] bg-indigo-500/5 rounded-full blur-[120px] mix-blend-multiply"></div>
                <div className="absolute bottom-0 right-0 w-[60rem] h-[60rem] bg-teal-500/5 rounded-full blur-[120px] mix-blend-multiply"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80rem] h-[40rem] bg-amber-500/5 rounded-full blur-[150px] mix-blend-multiply"></div>
            </div>

            <div className="pt-24 sm:pt-32"></div>

            {/* ================================================================ */}
            {/* 1. ABOUT US (Editorial Zig-Zag)                                  */}
            {/* ================================================================ */}
            {aboutUs && (
                <section id="pitch-about" className="py-24 sm:py-32 relative bg-white/40">
                    <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
                        <div data-reveal className="relative w-full rounded-[3rem] overflow-hidden shadow-2xl ring-1 ring-slate-200">
                            {/* Large Cinematic Image */}
                            <img src={getEditorialImage(0) || 'https://via.placeholder.com/1200x800'} alt="Our History" className="w-full h-[40rem] object-cover" />

                            {/* Frosted Glass Overlay Card */}
                            <div className="absolute bottom-0 right-0 w-full sm:w-4/5 lg:w-2/3 bg-white/80 backdrop-blur-xl p-10 sm:p-16 rounded-tl-[3rem] border-t border-l border-white/50 shadow-[0_-20px_40px_-20px_rgba(0,0,0,0.1)]">
                                <header className="mb-6">
                                    <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">
                                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-indigo-100 text-indigo-600 ring-1 ring-indigo-200">
                                            <Compass className="h-3 w-3" />
                                        </span>
                                        Who Are We?
                                    </p>
                                    <h2 className="mt-4 font-serif text-4xl sm:text-5xl font-semibold leading-[1.05] tracking-tight text-slate-900">
                                        About Us
                                    </h2>
                                </header>
                                <SectionBody text={aboutUs} />
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ================================================================ */}
            {/* 2. MISSION & VISION                                               */}
            {/* ================================================================ */}
            {(missionVision.mission || missionVision.vision) && (
                <Section id="pitch-mission" eyebrow="Mission & Vision" title="Mission & Vision" icon={<Compass className="h-5 w-5" />} className="bg-blue-50/20 border-y border-blue-100/10">
                    <EditorialRow reverse={true} image={missionVision.graphicInfo || getEditorialImage(1)} imageLabel="Our Direction" accentTone="teal">
                        <div className="space-y-8">
                            {missionVision.mission && (
                                <div className="border-l-2 border-teal-200 pl-6">
                                    <h4 className="text-sm font-bold uppercase tracking-widest text-teal-600 mb-2">Mission</h4>
                                    <p className="font-serif text-2xl leading-relaxed text-slate-800">{missionVision.mission}</p>
                                </div>
                            )}
                            {missionVision.vision && (
                                <div className="border-l-2 border-indigo-200 pl-6">
                                    <h4 className="text-sm font-bold uppercase tracking-widest text-indigo-600 mb-2">Vision</h4>
                                    <p className="font-serif text-2xl leading-relaxed text-slate-800">{missionVision.vision}</p>
                                </div>
                            )}
                        </div>
                    </EditorialRow>
                </Section>
            )}

            {/* ================================================================ */}
            {/* 3. OUR TEAM                                                       */}
            {/* ================================================================ */}
            {ourTeam.length > 0 && (
                <section id="team" className="py-24 sm:py-32 bg-white/40">
                    <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
                        <header data-reveal className="mb-14 max-w-3xl">
                            <h2 className="font-sans text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
                                A team who is not afraid to take risks and bet on themselves.
                            </h2>
                            <p className="mt-6 text-lg leading-relaxed text-slate-600">
                                Meet the creators, strategists, and makers who move our mission forward, combining design, code, and vision to achieve remarkable results.
                            </p>
                        </header>

                        {/* Grid Container */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                            {ourTeam.map((member, idx) => (
                                <div
                                    key={idx}
                                    data-reveal
                                    className="bg-[#111111] rounded-[1.5rem] p-0 flex flex-col transition-all duration-500 hover:-translate-y-2 ring-1 ring-white/5 shadow-2xl group"
                                >
                                    {/* 1. Image */}
                                    <div className="w-full aspect-square rounded-xl overflow-hidden mb-5 bg-zinc-800">
                                        <img
                                            src={member.image || 'https://via.placeholder.com/400x400'}
                                            alt={member.name}
                                            className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                                        />
                                    </div>

                                    {/* 2. Content Area */}
                                    <div className="flex-1 flex flex-col px-4 pb-8">
                                        <h3 className="text-base font-bold text-white tracking-tight">
                                            {member.name}
                                        </h3>

                                        <p className="text-zinc-200 text-sm mt-0">
                                            {member.role || "Innovator"}
                                        </p>

                                        <div className="border-t border-dotted border-zinc-700/60 my-6 w-full"></div>

                                        {member.description && (
                                            <p className="text-zinc-200 text-sm leading-relaxed">
                                                {member.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ================================================================ */}
            {/* 4. OUR SERVICES                                                   */}
            {/* ================================================================ */}
            {ourServices.length > 0 && (
                <Section id="pitch-services" eyebrow="Our Services" title="Our Services" icon={<Package className="h-5 w-5" />} className="bg-blue-50/20 border-y border-blue-100/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                        {ourServices.map((service, idx) => (
                            <div key={idx} data-reveal className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-xl shadow-slate-900/5 ring-1 ring-slate-200/80 hover:shadow-2xl transition duration-300">
                                <h3 className="text-2xl font-serif font-semibold text-slate-900 mb-4">{service.serviceName}</h3>
                                <p className="text-slate-600 leading-relaxed text-lg">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </Section>
            )}

            {/* ================================================================ */}
            {/* 5. TARGET MARKET (Infographic Funnel)                             */}
            {/* ================================================================ */}
            {(targetMarket.tam || targetMarket.sam || targetMarket.som) && (
                <Section id="pitch-market" eyebrow="Target Market" title="Market Potential" icon={<Target className="h-5 w-5" />} className="bg-white/40">
                    <div className="flex flex-col items-center mt-12 w-full">
                        {[
                            { id: 'tam', label: 'Total Addressable Market', code: 'TAM', value: targetMarket.tam, color: 'bg-slate-900', textColor: 'text-slate-400', badgeBg: 'bg-slate-800', badgeText: 'text-slate-300', icon: Globe, iconColor: 'text-slate-800', width: 'w-full lg:max-w-5xl' },
                            { id: 'sam', label: 'Serviceable Available Market', code: 'SAM', value: targetMarket.sam, color: 'bg-indigo-600', textColor: 'text-indigo-200', badgeBg: 'bg-indigo-700', badgeText: 'text-indigo-100', icon: Compass, iconColor: 'text-indigo-500', width: 'w-[92%] lg:max-w-3xl' },
                            { id: 'som', label: 'Serviceable Obtainable Market', code: 'SOM', value: targetMarket.som, color: 'bg-teal-500', textColor: 'text-teal-100', badgeBg: 'bg-teal-600', badgeText: 'text-teal-100', icon: Target, iconColor: 'text-teal-400', width: 'w-[84%] lg:max-w-xl' }
                        ].filter(m => !!m.value).map((m, idx, arr) => {
                            const Icon = m.icon;
                            const isLast = idx === arr.length - 1;
                            const isFirst = idx === 0;

                            return (
                                <div
                                    key={m.id}
                                    data-reveal
                                    className={`group relative ${m.width} mx-auto ${m.color} rounded-[2.5rem] px-6 sm:px-10 text-center shadow-2xl overflow-hidden transition-transform duration-500 hover:scale-[1.02]
                                        ${!isLast ? 'pt-12 pb-24 sm:pb-32' : 'py-12 sm:py-16'}
                                        ${!isFirst ? '-mt-12 sm:-mt-20 border-[8px] border-[#FAFAF9]' : 'ring-1 ring-slate-800'}
                                    `}
                                    style={{ zIndex: idx }}
                                >
                                    {/* Background Icon */}
                                    <Icon className={`absolute ${idx % 2 === 0 ? '-right-12 -bottom-12' : '-left-12 -bottom-12'} w-64 h-64 sm:w-80 sm:h-80 ${m.iconColor} opacity-50 stroke-[1] pointer-events-none transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-12`} />

                                    {/* Content */}
                                    <div className="relative z-10 flex flex-col items-center">
                                        <span className={`flex items-center gap-2 px-4 py-1.5 rounded-full ${m.badgeBg} ${m.badgeText} text-xs font-bold tracking-[0.2em] uppercase mb-4 shadow-inner`}>
                                            <Icon className="w-3.5 h-3.5" /> {m.code}
                                        </span>
                                        <h3 className={`font-sans text-lg sm:text-xl ${m.textColor} mb-3`}>{m.label}</h3>
                                        <p className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tight break-words max-w-full">
                                            {m.value}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Section>
            )}

            {/* ================================================================ */}
            {/* 6. ACHIEVEMENTS (Vertical Timeline)                               */}
            {/* ================================================================ */}
            {achievements.length > 0 && (
                <section id="pitch-achievement" className="relative py-28 sm:py-36 bg-blue-50/20 border-y border-blue-100/10">
                    <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
                        <header data-reveal className="mb-20 text-center max-w-2xl mx-auto">
                            <p className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-amber-600 mb-4">
                                <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-amber-100 text-amber-600 ring-1 ring-amber-200">
                                    <Trophy className="h-3 w-3" />
                                </span>
                                Milestones
                            </p>
                            <h2 className="font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl">
                                Our Achievements
                            </h2>
                        </header>

                        <div className="relative">
                            {/* Vertical Line */}
                            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-slate-200 sm:-translate-x-1/2"></div>

                            <div className="space-y-12 sm:space-y-24">
                                {achievements.map((achieve, idx) => {
                                    const isEven = idx % 2 === 0;
                                    return (
                                        <div key={idx} data-reveal className={`relative flex flex-col sm:flex-row items-center gap-8 sm:gap-16 ${isEven ? 'sm:flex-row-reverse' : ''}`}>
                                            {/* Center Dot */}
                                            <div className="absolute left-4 sm:left-1/2 w-4 h-4 rounded-full bg-white border-4 border-amber-500 sm:-translate-x-1/2 mt-8 sm:mt-0 shadow-lg z-10"></div>

                                            {/* Spacer for desktop */}
                                            <div className="hidden sm:block w-1/2"></div>

                                            {/* Content Card */}
                                            <div className="w-full sm:w-1/2 pl-12 sm:pl-0 flex flex-col gap-6 group">
                                                <div className={`flex flex-col gap-6 bg-white p-8 sm:p-10 rounded-[2rem] shadow-xl ring-1 ring-slate-100 transition-transform duration-500 hover:-translate-y-2 ${isEven ? 'sm:mr-12' : 'sm:ml-12'}`}>
                                                    {achieve.image && (
                                                        <img src={achieve.image} alt="Achievement" className="w-full h-48 object-cover rounded-xl shadow-md transition-transform duration-700 group-hover:scale-105" />
                                                    )}
                                                    <p className="font-serif text-2xl leading-relaxed text-slate-800">
                                                        "{achieve.description}"
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ================================================================ */}
            {/* 7. PRODUCT GALLERY (Filmstrip Marquee)                            */}
            {/* ================================================================ */}
            {products.length > 0 && (
                <section id="pitch-gallery" className="py-28 sm:py-36 relative overflow-hidden bg-white/40">
                    <div className="mx-auto mb-16 max-w-7xl px-6 sm:px-10 lg:px-16 text-center">
                        <div data-reveal className="max-w-2xl mx-auto">
                            <p className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600 mb-4">
                                <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
                                    <Package className="h-3 w-3" />
                                </span>
                                Our Products
                            </p>
                            <h2 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl">Product & Innovation</h2>
                        </div>
                    </div>

                    {/* Filmstrip Frame */}
                    <div data-reveal className="relative py-10 bg-slate-900 shadow-2xl">
                        {/* Filmstrip edges (CSS borders) */}
                        <div className="absolute top-2 left-0 right-0 border-t border-dashed border-white/20"></div>
                        <div className="absolute bottom-2 left-0 right-0 border-b border-dashed border-white/20"></div>

                        {/* Fades */}
                        <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none"></div>
                        <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none"></div>

                        <div className="pitch-marquee-track flex w-max gap-8 px-8">
                            {marqueeImages.map((src, i) => (
                                <figure key={`marquee-${i}`} className="relative h-72 w-[22rem] flex-shrink-0 overflow-hidden rounded-2xl bg-slate-800 shadow-xl ring-1 ring-white/10 sm:h-80 sm:w-[26rem] transition-all duration-500 hover:brightness-110">
                                    <img src={src} alt={`Gallery ${i}`} className="h-full w-full object-cover" loading="lazy" crossOrigin="anonymous" />
                                </figure>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ================================================================ */}
            {/* 8. CONTACT INFO / CTA                                            */}
            {/* ================================================================ */}
            <footer id="pitch-contact" className="relative bg-slate-900 text-white rounded-t-[0rem] overflow-hidden">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[40rem] h-[40rem] rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[30rem] h-[30rem] rounded-full bg-teal-500/10 blur-[100px] pointer-events-none"></div>

                <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-32 lg:px-16 relative z-10">
                    <div data-reveal className="grid grid-cols-1 gap-16 lg:grid-cols-12">
                        <div className="lg:col-span-7 flex flex-col justify-center">
                            <p className="text-sm font-bold uppercase tracking-[0.3em] text-indigo-400 mb-6">Let's Connect</p>
                            <h2 className="font-serif text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl md:text-7xl mb-8">
                                Ready to build the future of <span className="italic text-indigo-400">{businessName}</span> together?
                            </h2>
                            <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
                                We are always looking for visionary partners, investors, and clients. Reach out and let's start a conversation.
                            </p>
                        </div>

                        <div className="lg:col-span-5 flex flex-col gap-6">
                            {address && (
                                <div className="group flex items-center gap-6 rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 hover:bg-white/10 hover:ring-white/20 transition-all">
                                    <div className="flex h-14 w-14 flex-none items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-300 group-hover:bg-indigo-500 group-hover:text-white transition-colors"><MapPin className="h-6 w-6" /></div>
                                    <div><p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Headquarters</p><p className="mt-1 text-lg font-medium text-white">{address}</p></div>
                                </div>
                            )}
                            {phone && (
                                <div className="group flex items-center gap-6 rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 hover:bg-white/10 hover:ring-white/20 transition-all">
                                    <div className="flex h-14 w-14 flex-none items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-300 group-hover:bg-indigo-500 group-hover:text-white transition-colors"><Smartphone className="h-6 w-6" /></div>
                                    <div><p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Direct Line</p><p className="mt-1 text-lg font-medium text-white">{phone}</p></div>
                                </div>
                            )}
                            {email && (
                                <div className="group flex items-center gap-6 rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 hover:bg-white/10 hover:ring-white/20 transition-all">
                                    <div className="flex h-14 w-14 flex-none items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-300 group-hover:bg-indigo-500 group-hover:text-white transition-colors"><Mail className="h-6 w-6" /></div>
                                    <div><p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Electronic Mail</p><a href={`mailto:${email}`} className="mt-1 block text-lg font-medium text-white hover:text-indigo-300 transition-colors">{email}</a></div>
                                </div>
                            )}
                            {website && (
                                <div className="group flex items-center gap-6 rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 hover:bg-white/10 hover:ring-white/20 transition-all">
                                    <div className="flex h-14 w-14 flex-none items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-300 group-hover:bg-indigo-500 group-hover:text-white transition-colors"><Globe className="h-6 w-6" /></div>
                                    <div><p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Website</p><a href={website} target="_blank" rel="noreferrer" className="mt-1 block text-lg font-medium text-white hover:text-indigo-300 transition-colors">{website}</a></div>
                                </div>
                            )}

                            {/* SOCIAL ICONS REDESIGN */}
                            {socialList.length > 0 && (
                                <div className="pt-6">
                                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4 ml-2">Follow Our Journey</p>
                                    <div className="flex flex-wrap gap-4">
                                        {socialList.map((s, i) => (
                                            <a
                                                key={i}
                                                href={s.url.startsWith('http') ? s.url : `https://${s.url}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="group flex items-center gap-3 rounded-full bg-white/5 px-6 py-3 ring-1 ring-white/10 hover:bg-indigo-500 hover:ring-indigo-500 hover:text-white transition-all shadow-lg"
                                                title={s.platform}
                                            >
                                                <span className="text-slate-300 group-hover:text-white transition-colors">
                                                    {getSocialIcon(s.platform)}
                                                </span>
                                                <span className="text-sm font-semibold capitalize text-slate-200 group-hover:text-white">
                                                    {s.platform}
                                                </span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>


                </div>
            </footer>
        </div>
    );
};

/* ==================================================================== */
/* Reusable Layout Components                                           */
/* ==================================================================== */

const Section = ({ id, eyebrow, title, icon, children, className = "" }) => (
    <section id={id} className={`py-24 sm:py-32 ${className}`}>
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
            <header data-reveal className="mb-14 max-w-3xl">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">
                    {icon ? <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">{icon}</span> : null}
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
            <div data-reveal className={`order-1 lg:col-span-6 ${reverse ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="relative overflow-hidden rounded-3xl bg-white p-2 shadow-2xl shadow-slate-900/5 ring-1 ring-slate-200/80">
                    {image ? (
                        <img src={image} alt={imageLabel || 'Visual'} className="h-[30rem] w-full rounded-2xl object-cover" loading="lazy" crossOrigin="anonymous" />
                    ) : (
                        <div className={`flex h-[30rem] items-center justify-center rounded-2xl bg-gradient-to-br ${tone} text-slate-400`}>
                            <span className="italic text-lg text-center px-4">Please upload the image in the form.</span>
                        </div>
                    )}
                    {imageLabel && (
                        <div className="absolute bottom-5 left-5 rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-slate-700 shadow-sm ring-1 ring-slate-200 backdrop-blur">
                            {imageLabel}
                        </div>
                    )}
                </div>
            </div>
            <div data-reveal className={`order-2 lg:col-span-6 ${reverse ? 'lg:order-1 lg:pr-6' : 'lg:order-2 lg:pl-6'}`}>
                {children}
            </div>
        </div>
    );
};

const SectionBody = ({ text }) => {
    if (!text) return null;
    const paragraphs = String(text).split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

    return (
        <div className="space-y-5 text-lg leading-relaxed text-slate-700 sm:text-xl">
            {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
            ))}
        </div>
    );
};

export default InvestorPitchDeck;