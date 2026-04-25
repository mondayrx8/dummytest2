import React, { useEffect } from 'react';
import {
    MapPin, Mail, Share2, Target, Trophy, Users, Compass, Package, Globe, Smartphone
} from 'lucide-react';

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
        businessName = 'Syarikat Kami',
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

            <div className="pt-24 sm:pt-32"></div>

            {/* ================================================================ */}
            {/* 1. ABOUT US (Editorial Zig-Zag)                                  */}
            {/* ================================================================ */}
            {aboutUs && (
                <Section id="pitch-about" eyebrow="01 — Kenali Kami" title="Siapa Kami?">
                    <EditorialRow reverse={false} image={getEditorialImage(0)} imageLabel="Sejarah Kami" accentTone="indigo">
                        <SectionBody text={aboutUs} />
                    </EditorialRow>
                </Section>
            )}

            {/* ================================================================ */}
            {/* 2. MISSION & VISION                                               */}
            {/* ================================================================ */}
            {(missionVision.mission || missionVision.vision) && (
                <Section id="pitch-mission" eyebrow="02 — Misi & Visi" title="Hala Tuju" icon={<Compass className="h-5 w-5" />}>
                    <EditorialRow reverse={true} image={missionVision.graphicInfo || getEditorialImage(1)} imageLabel="Bintang Utara" accentTone="teal">
                        <div className="space-y-8">
                            {missionVision.mission && (
                                <div className="border-l-2 border-teal-200 pl-6">
                                    <h4 className="text-sm font-bold uppercase tracking-widest text-teal-600 mb-2">Misi</h4>
                                    <p className="font-serif text-2xl leading-relaxed text-slate-800">{missionVision.mission}</p>
                                </div>
                            )}
                            {missionVision.vision && (
                                <div className="border-l-2 border-indigo-200 pl-6">
                                    <h4 className="text-sm font-bold uppercase tracking-widest text-indigo-600 mb-2">Visi</h4>
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
                <Section id="pitch-team" eyebrow="03 — Tulang Belakang" title="Pasukan Kami" icon={<Users className="h-5 w-5" />}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                        {ourTeam.map((member, idx) => (
                            <div key={idx} data-reveal className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 ring-1 ring-slate-100 flex flex-col items-center text-center">
                                <div className="w-32 h-32 rounded-full overflow-hidden mb-6 ring-4 ring-indigo-50 shadow-inner">
                                    <img src={member.image || 'https://via.placeholder.com/150'} alt={member.name} className="w-full h-full object-cover" />
                                </div>
                                <h3 className="text-2xl font-serif font-bold text-slate-900">{member.name}</h3>
                                <span className="inline-block mt-3 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-widest">
                                    {member.role}
                                </span>
                            </div>
                        ))}
                    </div>
                </Section>
            )}

            {/* ================================================================ */}
            {/* 4. OUR SERVICES                                                   */}
            {/* ================================================================ */}
            {ourServices.length > 0 && (
                <Section id="pitch-services" eyebrow="04 — Tawaran Kami" title="Perkhidmatan Utama" icon={<Package className="h-5 w-5" />}>
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
            {/* 5. TARGET MARKET                                                  */}
            {/* ================================================================ */}
            {(targetMarket.tam || targetMarket.sam || targetMarket.som) && (
                <Section id="pitch-market" eyebrow="05 — Sasaran" title="Potensi Pasaran" icon={<Target className="h-5 w-5" />}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        {[
                            { label: 'TAM (Total Addressable)', value: targetMarket.tam, color: 'bg-slate-900 text-white', ring: 'ring-slate-800' },
                            { label: 'SAM (Serviceable Available)', value: targetMarket.sam, color: 'bg-indigo-600 text-white', ring: 'ring-indigo-500' },
                            { label: 'SOM (Serviceable Obtainable)', value: targetMarket.som, color: 'bg-teal-500 text-white', ring: 'ring-teal-400' }
                        ].map((m, idx) => m.value ? (
                            <div key={idx} data-reveal className={`relative overflow-hidden rounded-3xl p-8 shadow-xl ${m.color} ring-1 ${m.ring}`}>
                                <p className="text-sm font-medium uppercase tracking-widest opacity-80">{m.label}</p>
                                <p className="mt-6 font-serif text-4xl sm:text-5xl font-semibold tracking-tight">{m.value}</p>
                            </div>
                        ) : null)}
                    </div>
                </Section>
            )}

            {/* ================================================================ */}
            {/* 6. ACHIEVEMENTS (Trophy Layout)                                   */}
            {/* ================================================================ */}
            {achievements.length > 0 && (
                <section id="pitch-achievement" className="relative py-28 sm:py-36">
                    <div className="absolute inset-x-0 top-1/2 -z-10 h-[70%] -translate-y-1/2 bg-gradient-to-r from-amber-50 via-white to-amber-50" />
                    <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
                        {achievements.map((achieve, idx) => (
                            <div key={idx} data-reveal className="relative overflow-hidden rounded-[2.25rem] bg-white p-8 shadow-2xl shadow-amber-900/10 ring-1 ring-amber-100 sm:p-14 mb-10">
                                <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-amber-200/40 blur-3xl" />
                                <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
                                    <div className="lg:col-span-4">
                                        <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-500/30">
                                            <Trophy className="h-12 w-12 text-white" aria-hidden="true" />
                                        </div>
                                        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">
                                            06 — Pencapaian
                                        </p>
                                        <h3 className="mt-3 font-serif text-3xl sm:text-4xl font-semibold leading-tight tracking-tight text-slate-900">
                                            Kejayaan Membanggakan.
                                        </h3>
                                    </div>
                                    <div className="lg:col-span-8">
                                        <div className="rounded-2xl bg-slate-50/80 p-8 ring-1 ring-slate-200 flex flex-col sm:flex-row items-center gap-6">
                                            {achieve.image && (
                                                <img src={achieve.image} alt="Sijil" className="w-full sm:w-40 h-40 object-cover rounded-xl shadow-md" />
                                            )}
                                            <p className="font-serif text-2xl leading-relaxed text-slate-800 flex-1">
                                                "{achieve.description}"
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* ================================================================ */}
            {/* 7. PRODUCT GALLERY — INFINITE MARQUEE                             */}
            {/* ================================================================ */}
            {products.length > 0 && (
                <section id="pitch-gallery" className="bg-[#FAFAF9] py-28 sm:py-36">
                    <div className="mx-auto mb-14 max-w-7xl px-6 sm:px-10 lg:px-16">
                        <div data-reveal className="max-w-2xl">
                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">07 — Galeri Visual</p>
                            <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl">Produk & Inovasi.</h2>
                        </div>
                    </div>
                    <div data-reveal className="group relative overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent 0, #000 7%, #000 93%, transparent 100%)' }}>
                        <div className="pitch-marquee-track flex w-max gap-6">
                            {marqueeImages.map((src, i) => (
                                <figure key={`marquee-${i}`} className="relative h-72 w-[22rem] flex-shrink-0 overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-900/5 ring-1 ring-slate-200 sm:h-80 sm:w-[26rem]">
                                    <img src={src} alt={`Galeri ${i}`} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" loading="lazy" crossOrigin="anonymous" />
                                </figure>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ================================================================ */}
            {/* 8. CONTACT INFO (Footer)                                         */}
            {/* ================================================================ */}
            <footer id="pitch-contact" className="bg-white rounded-t-[3rem] border-t border-slate-200">
                <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-28 lg:px-16">
                    <div data-reveal className="grid grid-cols-1 gap-14 lg:grid-cols-12">
                        <div className="lg:col-span-7">
                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">08 — Hubungi Kami</p>
                            <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
                                Let&apos;s build the future of <span className="italic text-indigo-600">{businessName}</span> together.
                            </h2>
                        </div>

                        <div className="space-y-6 lg:col-span-5">
                            {address && (
                                <div className="flex items-start gap-4 rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
                                    <div className="mt-0.5 flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm ring-1 ring-slate-200"><MapPin className="h-5 w-5" /></div>
                                    <div><p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Alamat</p><p className="mt-1 text-base leading-relaxed text-slate-800">{address}</p></div>
                                </div>
                            )}
                            {phone && (
                                <div className="flex items-start gap-4 rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
                                    <div className="mt-0.5 flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm ring-1 ring-slate-200"><Smartphone className="h-5 w-5" /></div>
                                    <div><p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Telefon / WhatsApp</p><p className="mt-1 text-base leading-relaxed text-slate-800">{phone}</p></div>
                                </div>
                            )}
                            {email && (
                                <div className="flex items-start gap-4 rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
                                    <div className="mt-0.5 flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm ring-1 ring-slate-200"><Mail className="h-5 w-5" /></div>
                                    <div><p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Emel</p><a href={`mailto:${email}`} className="mt-1 block text-base font-medium text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-600">{email}</a></div>
                                </div>
                            )}
                            {website && (
                                <div className="flex items-start gap-4 rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
                                    <div className="mt-0.5 flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm ring-1 ring-slate-200"><Globe className="h-5 w-5" /></div>
                                    <div><p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Laman Web</p><a href={website} target="_blank" rel="noreferrer" className="mt-1 block text-base font-medium text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-600">{website}</a></div>
                                </div>
                            )}
                            {socialList.length > 0 && (
                                <div className="flex items-start gap-4 rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
                                    <div className="mt-0.5 flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm ring-1 ring-slate-200"><Share2 className="h-5 w-5" /></div>
                                    <div className="flex-1"><p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Media Sosial</p>
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {socialList.map((s, i) => (
                                                <a key={i} href={s.url.startsWith('http') ? s.url : `https://${s.url}`} target="_blank" rel="noreferrer" className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-slate-800 shadow-sm ring-1 ring-slate-200 hover:bg-slate-900 hover:text-white capitalize transition">
                                                    {s.platform}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row sm:items-center">
                        <p className="text-sm text-slate-500">© {new Date().getFullYear()} {businessName}. Hak cipta terpelihara.</p>
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">SiswaNiaga Landing Page</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

/* ==================================================================== */
/* Reusable Layout Components                                           */
/* ==================================================================== */

const Section = ({ id, eyebrow, title, icon, children }) => (
    <section id={id} className="py-24 sm:py-32">
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
                            <span className="italic text-lg text-center px-4">Sila muat naik gambar di borang.</span>
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