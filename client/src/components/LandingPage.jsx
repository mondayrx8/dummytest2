import React, { useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import './LandingPage.css';

const LandingPage = () => {
    const heroRef = useRef(null);
    const revealRefs = useRef([]);

    /* Collect refs for scroll-reveal elements */
    const addRevealRef = useCallback((el) => {
        if (el && !revealRefs.current.includes(el)) {
            revealRefs.current.push(el);
        }
    }, []);

    /* Intersection Observer — ref-based scroll reveals */
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        );

        revealRefs.current.forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    /* Soft parallax fade on hero — respects reduced motion */
    const handleScroll = useCallback(() => {
        if (!heroRef.current) return;
        const y = window.scrollY;
        heroRef.current.style.transform = `translateY(${y * 0.06}px)`;
        heroRef.current.style.opacity = 1 - Math.min(y / 1800, 1);
    }, []);

    useEffect(() => {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) return;

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    /* Enso-like circle divider */
    const EnsoSvg = () => (
        <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14" opacity="0.6" />
        </svg>
    );

    return (
        <main className="japandi-landing" aria-label="SiswaNiaga Landing Page">
            {/* ── Ambient Background ─────────────── */}
            <div className="japandi-bg" aria-hidden="true">
                <div className="japandi-bg-wash"></div>
                <div className="japandi-bg-orb japandi-bg-orb--moss"></div>
                <div className="japandi-bg-orb japandi-bg-orb--clay"></div>
            </div>

            {/* ── Hero ───────────────────────────── */}
            <section className="japandi-hero" aria-label="Hero">
                <div className="japandi-hero__inner" ref={heroRef}>
                    <div className="japandi-hero__badge japandi-reveal" ref={addRevealRef}>
                        <span className="japandi-hero__badge-dot" aria-hidden="true"></span>
                        <span className="japandi-hero__badge-text">Platform is Live</span>
                    </div>

                    <h1 className="japandi-hero__title japandi-reveal japandi-delay-1" ref={addRevealRef}>
                        Craft Your <br />
                        <em>Business Portfolio</em> <br />
                        From Campus
                    </h1>

                    <p className="japandi-hero__subtitle japandi-reveal japandi-delay-2" ref={addRevealRef}>
                        A curated digital pitch deck directory for student entrepreneurs —
                        designed with intention, built for clarity.
                    </p>

                    <div className="japandi-hero__actions japandi-reveal japandi-delay-3" ref={addRevealRef}>
                        <Link to="/login" className="btn-organic-base btn-organic-primary">
                            <span className="cta-text">Start Building</span>
                            <span className="cta-icon-wrapper" aria-hidden="true">
                                <svg className="arrow-icon-v2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </span>
                        </Link>
                        <Link to="/investors" className="btn-organic-base btn-organic-secondary">
                            <span className="cta-text">Browse Portfolios</span>
                        </Link>
                    </div>

                    {/* Dashboard Preview */}
                    <div className="japandi-hero__mockup japandi-reveal japandi-delay-4" ref={addRevealRef}>
                        <div className="japandi-mockup-frame">
                            <div className="mockup-header">
                                <div className="mac-dots" aria-hidden="true"><span></span><span></span><span></span></div>
                                <div className="mockup-url-bar" aria-hidden="true">siswaniaga.my/dashboard</div>
                            </div>
                            <div className="mockup-body">
                                <div className="mockup-sidebar"></div>
                                <div className="mockup-main">
                                    <div className="mockup-chart"></div>
                                    <div className="mockup-cards">
                                        <span></span><span></span><span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Divider ────────────────────────── */}
            <div className="japandi-divider japandi-reveal" ref={addRevealRef} aria-hidden="true">
                <EnsoSvg />
            </div>

            {/* ── Philosophy / About ─────────────── */}
            <section className="japandi-philosophy" aria-label="Our Philosophy">
                <p className="japandi-philosophy__eyebrow japandi-reveal" ref={addRevealRef}>Our Philosophy</p>
                <h2 className="japandi-philosophy__heading japandi-reveal japandi-delay-1" ref={addRevealRef}>
                    Less, but better — crafted for clarity
                </h2>
                <p className="japandi-philosophy__body japandi-reveal japandi-delay-2" ref={addRevealRef}>
                    SiswaNiaga provides a quiet, focused space where university startups
                    present their ventures with the precision and warmth of a handcrafted
                    portfolio. Every element is considered — nothing extraneous, nothing
                    missing. Your business story, told with intentional simplicity.
                </p>
            </section>

            {/* ── Divider ────────────────────────── */}
            <div className="japandi-divider japandi-reveal" ref={addRevealRef} aria-hidden="true">
                <EnsoSvg />
            </div>

            {/* ── Features ───────────────────────── */}
            <section className="japandi-features" aria-label="Capabilities">
                <div className="japandi-features__header">
                    <p className="japandi-features__eyebrow japandi-reveal" ref={addRevealRef}>Capabilities</p>
                    <h2 className="japandi-features__title japandi-reveal japandi-delay-1" ref={addRevealRef}>
                        Thoughtfully designed tools
                    </h2>
                    <p className="japandi-features__subtitle japandi-reveal japandi-delay-2" ref={addRevealRef}>
                        Every feature serves a purpose — meeting the exact standards of
                        academic evaluators and discerning investors.
                    </p>
                </div>

                <div className="japandi-features__grid">
                    <article className="japandi-feature-card japandi-reveal japandi-delay-1" ref={addRevealRef}>
                        <div className="japandi-feature-card__icon japandi-feature-card__icon--moss" aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                        </div>
                        <h3 className="japandi-feature-card__title">Intuitive Builder</h3>
                        <p className="japandi-feature-card__desc">
                            Create polished business portfolios effortlessly — a guided,
                            form-based experience that shapes your pitch deck with care.
                        </p>
                    </article>

                    <article className="japandi-feature-card japandi-reveal japandi-delay-2" ref={addRevealRef}>
                        <div className="japandi-feature-card__icon japandi-feature-card__icon--clay" aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                        </div>
                        <h3 className="japandi-feature-card__title">Refined Aesthetics</h3>
                        <p className="japandi-feature-card__desc">
                            Enterprise-grade visual presentation aligned with formal
                            academic standards — capturing professional attention at first glance.
                        </p>
                    </article>

                    <article className="japandi-feature-card japandi-reveal japandi-delay-3" ref={addRevealRef}>
                        <div className="japandi-feature-card__icon japandi-feature-card__icon--stone" aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="2" y1="12" x2="22" y2="12" />
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                            </svg>
                        </div>
                        <h3 className="japandi-feature-card__title">Global Reach</h3>
                        <p className="japandi-feature-card__desc">
                            Publish and share your pitch decks instantly with classmates,
                            mentors, and prospective investors — accessible anywhere.
                        </p>
                    </article>
                </div>
            </section>

            {/* ── Trust ──────────────────────────── */}
            <section className="japandi-trust japandi-reveal" ref={addRevealRef} aria-label="Trusted by">
                <div className="japandi-trust__card">
                    <span className="japandi-trust__label">Trusted by student founders at</span>
                    <div className="japandi-trust__logos">
                        <span className="japandi-trust__logo">UUM</span>
                        <span className="japandi-trust__logo">EDC</span>
                        <span className="japandi-trust__logo">InnoHub</span>
                        <span className="japandi-trust__logo">Siswa Enterprise</span>
                    </div>
                </div>
            </section>

            {/* ── Divider ────────────────────────── */}
            <div className="japandi-divider japandi-reveal" ref={addRevealRef} aria-hidden="true">
                <EnsoSvg />
            </div>

            {/* ── Final CTA ──────────────────────── */}
            <section className="japandi-cta" aria-label="Call to action">
                <div className="japandi-cta__card japandi-reveal" ref={addRevealRef}>
                    <div className="japandi-cta__content">
                        <h2 className="japandi-cta__title">Ready to share your story?</h2>
                        <p className="japandi-cta__desc">
                            Join a community of student founders building with purpose.
                            Setup takes less than five minutes.
                        </p>
                        <Link to="/login" className="btn-organic-base btn-organic-primary">
                            <span className="cta-text">Create Your Portfolio</span>
                            <span className="cta-icon-wrapper" aria-hidden="true">
                                <svg className="arrow-icon-v2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </span>
                        </Link>
                    </div>
                    <div className="japandi-cta__glow" aria-hidden="true"></div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default LandingPage;
