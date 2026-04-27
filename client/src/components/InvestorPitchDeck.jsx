import React, { useEffect } from 'react';
import {
    MapPin, Mail, Globe, Smartphone,
    Link2
} from 'lucide-react';
import {
    FaInstagram, FaFacebook, FaTwitter, FaLinkedin, FaYoutube, FaGithub
} from 'react-icons/fa';
import { FaTiktok, FaThreads } from 'react-icons/fa6';

/**
 * InvestorPitchDeck — Editorial Redesign
 * ------------------------------------------------------------------
 * Refined single-page scroll pitch deck.
 * Curated warm palette (Ink / Paper / Accent) with Fraunces + Nunito.
 * All visual classes live in PortfolioDetails.css under `.pitch-deck`.
 * ------------------------------------------------------------------
 */
const InvestorPitchDeck = ({ portfolio }) => {
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
            { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
        );
        document.querySelectorAll('.pitch-deck [data-reveal]').forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);

    // Marquee images (doubled for seamless loop)
    const marqueeImages = products.length > 0
        ? [...products, ...products].map(p => p.image).filter(Boolean)
        : [];

    // Social media links
    const socialList = Object.entries(socials)
        .filter(([, url]) => !!url)
        .map(([platform, url]) => ({ platform, url }));

    // Image pool for editorial sections
    const allImages = [
        ...products.map(p => p.image),
        missionVision.graphicInfo,
        ...ourTeam.map(t => t.image),
        ...achievements.map(a => a.image)
    ].filter(Boolean);
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

    // Pad ordinal: 1 → "01"
    const ordinal = (n) => String(n).padStart(2, '0');

    return (
        <div className="pitch-deck" style={{ fontFamily: "'Nunito', sans-serif" }}>

            {/* Spacer after hero */}
            <div className="pt-16 sm:pt-20 lg:pt-24"></div>

            {/* ================================================================ */}
            {/* 1. ABOUT US — Cinematic Image + Frosted Overlay                  */}
            {/* ================================================================ */}
            {aboutUs && (
                <section id="pitch-about" className="pitch-section pitch-section--paper">
                    <div className="pitch-container">
                        <div data-reveal className="pitch-about-frame">
                            <img
                                src={getEditorialImage(0) || 'https://via.placeholder.com/1200x800'}
                                alt="About our company"
                                className="pitch-about-image"
                            />
                            <div className="pitch-about-overlay">
                                <span className="pitch-eyebrow">Who We Are</span>
                                <h2 className="pitch-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                                    About Us
                                </h2>
                                <SectionBody text={aboutUs} />
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ================================================================ */}
            {/* 2. MISSION & VISION — Dark Editorial Pull-Quotes                 */}
            {/* ================================================================ */}
            {(missionVision.mission || missionVision.vision) && (
                <section id="pitch-mission" className="pitch-section pitch-section--ink overflow-hidden relative">
                    {/* Background image if available */}
                    {missionVision.graphicInfo && (
                        <div
                            className="absolute inset-0 bg-cover bg-center opacity-[0.06] pointer-events-none"
                            style={{ backgroundImage: `url(${missionVision.graphicInfo})` }}
                        />
                    )}

                    <div className="pitch-container relative z-[1]">
                        <div data-reveal>
                            <span className="pitch-eyebrow">Our Direction</span>
                            <h2 className="pitch-heading pitch-heading--inverted text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-8 sm:mb-10 lg:mb-12">
                                Mission & Vision
                            </h2>
                        </div>

                        <div data-reveal className="flex flex-col gap-8 sm:gap-10 lg:gap-12">
                            {/* Stacks vertically on mobile, side-by-side on lg */}
                            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                                {missionVision.mission && (
                                    <div className="flex-1 min-w-0">
                                        <p className="pitch-mv-label">Mission</p>
                                        <p className="pitch-mv-quote">{missionVision.mission}</p>
                                    </div>
                                )}
                                {missionVision.mission && missionVision.vision && (
                                    <div className="pitch-mv-divider" />
                                )}
                                {missionVision.vision && (
                                    <div className="flex-1 min-w-0">
                                        <p className="pitch-mv-label">Vision</p>
                                        <p className="pitch-mv-quote">{missionVision.vision}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ================================================================ */}
            {/* 3. OUR TEAM — Minimal Photo Cards                                */}
            {/* ================================================================ */}
            {ourTeam.length > 0 && (
                <section id="pitch-team" className="pitch-section pitch-section--paper">
                    <div className="pitch-container">
                        <div data-reveal className="max-w-2xl mb-8 sm:mb-10 lg:mb-14">
                            <span className="pitch-eyebrow">The Team</span>
                            <h2 className="pitch-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                                People who make it happen.
                            </h2>
                            <p className="pitch-body mt-3 sm:mt-4">
                                Meet the people behind our mission — strategists, makers, and visionaries building something that matters.
                            </p>
                        </div>

                        <div
                            data-reveal-stagger
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6"
                        >
                            {ourTeam.map((member, idx) => (
                                <div
                                    key={idx}
                                    data-reveal
                                    className="pitch-team-card"
                                    style={{ '--reveal-index': idx }}
                                >
                                    <div className="overflow-hidden">
                                        <img
                                            src={member.image || 'https://via.placeholder.com/400x500'}
                                            alt={member.name}
                                            className="pitch-team-photo"
                                        />
                                    </div>
                                    <div className="pitch-team-info">
                                        <p className="pitch-team-name">{member.name}</p>
                                        <p className="pitch-team-role">{member.role || 'Team Member'}</p>
                                        {member.description && (
                                            <p className="pitch-team-desc">{member.description}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ================================================================ */}
            {/* 4. OUR SERVICES — Numbered Typographic List                      */}
            {/* ================================================================ */}
            {ourServices.length > 0 && (
                <section id="pitch-services" className="pitch-section pitch-section--chalk">
                    <div className="pitch-container">
                        <div data-reveal className="mb-8 sm:mb-10 lg:mb-14">
                            <span className="pitch-eyebrow">What We Do</span>
                            <h2 className="pitch-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                                Our Services
                            </h2>
                        </div>

                        <div data-reveal>
                            {ourServices.map((service, idx) => (
                                <div key={idx} className="pitch-service-item">
                                    <span className="pitch-service-ordinal">{ordinal(idx + 1)}</span>
                                    <div>
                                        <h3 className="pitch-service-name">{service.serviceName}</h3>
                                        <p className="pitch-service-desc">{service.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ================================================================ */}
            {/* 5. TARGET MARKET — Horizontal Bar Diagram                        */}
            {/* ================================================================ */}
            {(targetMarket.tam || targetMarket.sam || targetMarket.som) && (
                <section id="pitch-market" className="pitch-section pitch-section--paper">
                    <div className="pitch-container">
                        <div data-reveal className="mb-8 sm:mb-10 lg:mb-14">
                            <span className="pitch-eyebrow">Market Potential</span>
                            <h2 className="pitch-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                                Target Market
                            </h2>
                        </div>

                        <div data-reveal className="max-w-3xl">
                            {[
                                { id: 'tam', code: 'TAM', label: 'Total Addressable Market', value: targetMarket.tam, barClass: 'pitch-market-bar--tam' },
                                { id: 'sam', code: 'SAM', label: 'Serviceable Available Market', value: targetMarket.sam, barClass: 'pitch-market-bar--sam' },
                                { id: 'som', code: 'SOM', label: 'Serviceable Obtainable Market', value: targetMarket.som, barClass: 'pitch-market-bar--som' }
                            ].filter(m => !!m.value).map((m) => (
                                <div key={m.id} className="pitch-market-tier">
                                    <div>
                                        <p className="pitch-market-code mb-0">{m.code}</p>
                                        <p className="pitch-market-label">{m.label}</p>
                                    </div>
                                    <div className={`pitch-market-bar ${m.barClass}`}>
                                        {m.value}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ================================================================ */}
            {/* 6. ACHIEVEMENTS — Horizontal Scroll Gallery                      */}
            {/* ================================================================ */}
            {achievements.length > 0 && (
                <section id="pitch-achievements" className="pitch-section pitch-section--chalk">
                    <div className="pitch-container">
                        <div data-reveal className="text-center max-w-lg mx-auto mb-8 sm:mb-10 lg:mb-14">
                            <span className="pitch-eyebrow justify-center">Milestones</span>
                            <h2 className="pitch-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                                Our Achievements
                            </h2>
                        </div>

                        <div data-reveal className="pitch-achieve-scroll hide-scrollbar">
                            {achievements.map((achieve, idx) => (
                                <div key={idx} className="pitch-achieve-card">
                                    {achieve.image && (
                                        <img
                                            src={achieve.image}
                                            alt={`Achievement ${idx + 1}`}
                                            className="pitch-achieve-img"
                                            loading="lazy"
                                            crossOrigin="anonymous"
                                        />
                                    )}
                                    <div className="pitch-achieve-body">
                                        <p className="pitch-achieve-text">
                                            "{achieve.description}"
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ================================================================ */}
            {/* 7. PRODUCT GALLERY — Clean Marquee                               */}
            {/* ================================================================ */}
            {products.length > 0 && (
                <section id="pitch-gallery" className="pitch-section pitch-section--paper pb-0">
                    <div className="pitch-container mb-8 sm:mb-10 lg:mb-12">
                        <div data-reveal className="text-center max-w-lg mx-auto">
                            <span className="pitch-eyebrow justify-center">Our Products</span>
                            <h2 className="pitch-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                                Product & Innovation
                            </h2>
                        </div>
                    </div>

                    <div data-reveal className="pitch-gallery-strip">
                        <div className="pitch-marquee-track flex gap-3 sm:gap-4 lg:gap-6 w-max px-3 sm:px-4 lg:px-6">
                            {marqueeImages.map((src, i) => (
                                <figure key={`marquee-${i}`} className="pitch-gallery-item">
                                    <img src={src} alt={`Product ${i + 1}`} loading="lazy" crossOrigin="anonymous" />
                                </figure>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ================================================================ */}
            {/* 8. CONTACT / FOOTER — Dark Editorial CTA                        */}
            {/* ================================================================ */}
            <footer id="pitch-contact" className="pitch-section pitch-section--ink rounded-none">
                <div className="pitch-container">
                    <div data-reveal className="grid grid-cols-1 gap-10 sm:gap-12 lg:gap-16">
                        {/* Left — CTA */}
                        <div className="max-w-3xl">
                            <span className="pitch-eyebrow">Let's Connect</span>
                            <h2
                                className="pitch-heading pitch-heading--inverted text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-4 sm:mb-6"
                            >
                                Ready to build the future of{' '}
                                <span className="italic" style={{ color: '#B8860B' }}>{businessName}</span>{' '}
                                together?
                            </h2>
                            <p className="pitch-body pitch-body--inverted max-w-lg text-base sm:text-lg">
                                We are always looking for visionary partners, investors, and clients. Reach out and let's start a conversation.
                            </p>
                        </div>

                        {/* Right — Contact Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            {address && (
                                <div className="pitch-contact-card">
                                    <div className="pitch-contact-icon"><MapPin className="h-5 w-5" /></div>
                                    <div className="min-w-0">
                                        <p className="pitch-contact-label">Headquarters</p>
                                        <p className="pitch-contact-value break-words">{address}</p>
                                    </div>
                                </div>
                            )}
                            {phone && (
                                <div className="pitch-contact-card">
                                    <div className="pitch-contact-icon"><Smartphone className="h-5 w-5" /></div>
                                    <div className="min-w-0">
                                        <p className="pitch-contact-label">Direct Line</p>
                                        <p className="pitch-contact-value break-words">{phone}</p>
                                    </div>
                                </div>
                            )}
                            {email && (
                                <div className="pitch-contact-card">
                                    <div className="pitch-contact-icon"><Mail className="h-5 w-5" /></div>
                                    <div className="min-w-0">
                                        <p className="pitch-contact-label">Email</p>
                                        <p className="pitch-contact-value break-words">
                                            <a href={`mailto:${email}`}>{email}</a>
                                        </p>
                                    </div>
                                </div>
                            )}
                            {website && (
                                <div className="pitch-contact-card">
                                    <div className="pitch-contact-icon"><Globe className="h-5 w-5" /></div>
                                    <div className="min-w-0">
                                        <p className="pitch-contact-label">Website</p>
                                        <p className="pitch-contact-value break-words">
                                            <a href={website} target="_blank" rel="noreferrer">{website}</a>
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Socials */}
                        {socialList.length > 0 && (
                            <div data-reveal>
                                <p className="pitch-contact-label mb-3 sm:mb-4">Follow Our Journey</p>
                                <div className="flex flex-wrap gap-2 sm:gap-3">
                                    {socialList.map((s, i) => (
                                        <a
                                            key={i}
                                            href={s.url.startsWith('http') ? s.url : `https://${s.url}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="pitch-social-link"
                                            title={s.platform}
                                        >
                                            {getSocialIcon(s.platform)}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </footer>
        </div>
    );
};

/* ==================================================================== */
/* Reusable Layout Components                                           */
/* ==================================================================== */

const SectionBody = ({ text }) => {
    if (!text) return null;
    const paragraphs = String(text).split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

    return (
        <div className="pitch-body mt-3 sm:mt-4">
            {paragraphs.map((p, i) => (
                <p key={i} style={{ marginBottom: i < paragraphs.length - 1 ? '1rem' : 0 }}>{p}</p>
            ))}
        </div>
    );
};

export default InvestorPitchDeck;