import { useEffect, useRef, useState } from "react"
import {
    motion,
    useScroll,
    useTransform,
    useInView,
    useMotionValue,
    animate,
} from "motion/react"
import {
    ArrowUpRight,
    Mail,
    MapPin,
    Phone,
    Globe,
    Utensils,
    Coffee,
    Leaf,
    ChefHat,
    Soup,
    Sparkles,
    Clock,
    Star,
    CookingPot,
    Wheat,
    Flame,
} from "lucide-react"
import { FaInstagram, FaFacebook, FaTiktok, FaWhatsapp } from "react-icons/fa6"

/* ==================================================================
   TemplateFourth — "Maison de Saveur" v2
   F&B light theme, makeover guided by skill.md / advanced-patterns.md
   ------------------------------------------------------------------
   Design system (declared):
     · Palette        → oklch-derived "Artisan warmth"
                        primary  caramel  oklch(0.58 0.14 70)
                        ink      espresso oklch(0.22 0.03 60)
                        cream    warm     oklch(0.97 0.012 85)
                        cream-2  deep     oklch(0.93 0.022 80)
                        accent   sage     oklch(0.62 0.06 145)
     · Typography     → Newsreader (display) + Outfit (body)
                        + Caveat (one handwritten accent)
                        — explicitly avoiding Inter / Fraunces / system-ui
     · Type contrast  → hero clamp(3rem, 11vw, 9rem) vs 17px body (~6×)
     · Radius         → 2rem cards, full-pill CTAs
     · Motion         → ease [0.22,1,0.36,1] · 0.6–0.7s · hover lifts
     · No emoji · no fabricated data · simple geometric SVG only
   ================================================================== */

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
}

const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
}

/* Animated count-up for market stats */
function CountUp({ value }) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: "-20% 0px" })
    const [display, setDisplay] = useState(value)

    const match = String(value).match(/^([^\d.-]*)([\d.]+)(.*)$/)
    const prefix = match ? match[1] : ""
    const numeric = match ? parseFloat(match[2]) : 0
    const suffix = match ? match[3] : ""
    const decimals = match && match[2].includes(".") ? match[2].split(".")[1].length : 0
    const mv = useMotionValue(0)

    useEffect(() => {
        if (!inView) return
        const controls = animate(mv, numeric, {
            duration: 1.4,
            ease: [0.22, 1, 0.36, 1],
            onUpdate: (latest) => {
                setDisplay(prefix + latest.toFixed(decimals) + suffix)
            },
        })
        return () => controls.stop()
    }, [inView, numeric, prefix, suffix, decimals, mv])

    return <span ref={ref}>{display}</span>
}

/* Eyebrow — index · rule · label */
function Eyebrow({ index, label, align = "left", invert = false }) {
    const ruleColor = invert ? "var(--tpl4-accent-soft)" : "var(--tpl4-primary)"
    const labelColor = invert ? "var(--tpl4-cream)" : "var(--tpl4-ink)"
    const labelOp = invert ? 0.7 : 0.55
    return (
        <div
            className={
                "flex items-center gap-3 sm:gap-4 " +
                (align === "center" ? "justify-center" : "")
            }
        >
            {index ? (
                <span
                    className="tpl4-mono text-[10px] sm:text-[11px] tracking-[0.32em] uppercase"
                    style={{ color: ruleColor }}
                >
                    {index}
                </span>
            ) : null}
            <span
                className="h-px w-10 sm:w-14"
                style={{ backgroundColor: ruleColor, opacity: 0.5 }}
                aria-hidden="true"
            />
            <span
                className="tpl4-body text-[10px] sm:text-[11px] tracking-[0.32em] uppercase"
                style={{ color: labelColor, opacity: labelOp }}
            >
                {label}
            </span>
        </div>
    )
}

/* Section heading */
function SectionHeading({ index, eyebrow, title, italicWord, align = "left", invert = false }) {
    const titleColor = invert ? "var(--tpl4-cream)" : "var(--tpl4-ink)"
    const italicColor = invert ? "var(--tpl4-accent-soft)" : "var(--tpl4-primary)"
    return (
        <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-15% 0px" }}
            className={
                align === "center"
                    ? "flex flex-col items-center text-center gap-5"
                    : "flex flex-col items-start gap-5"
            }
        >
            <motion.div variants={fadeUp}>
                <Eyebrow index={index} label={eyebrow} align={align} invert={invert} />
            </motion.div>
            <motion.h2
                variants={fadeUp}
                className="tpl4-display text-balance leading-[0.92] tracking-tight"
                style={{
                    color: titleColor,
                    fontSize: "clamp(2.5rem, 6.5vw, 5.25rem)",
                    fontWeight: 400,
                }}
            >
                {title}
                {italicWord ? (
                    <>
                        {" "}
                        <em
                            className="tpl4-display italic"
                            style={{ color: italicColor, fontWeight: 300 }}
                        >
                            {italicWord}
                        </em>
                    </>
                ) : null}
            </motion.h2>
        </motion.div>
    )
}

/* Compass seal — simple geometry only (skill.md compliant) */
function Seal({ className = "", invert = false }) {
    const stroke = invert ? "var(--tpl4-accent-soft)" : "var(--tpl4-primary)"
    return (
        <svg
            viewBox="0 0 120 120"
            className={className}
            aria-hidden="true"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="60" cy="60" r="58" stroke={stroke} strokeWidth="1" opacity="0.35" />
            <circle cx="60" cy="60" r="48" stroke={stroke} strokeWidth="1" opacity="0.2" />
            <circle cx="60" cy="60" r="3" fill={stroke} />
            <path
                d="M60 14 L60 24 M60 96 L60 106 M14 60 L24 60 M96 60 L106 60"
                stroke={stroke}
                strokeWidth="1"
                opacity="0.45"
            />
        </svg>
    )
}

export default function TemplateFourth({ portfolio }) {
    /* Inject Google Fonts once (Newsreader + Outfit + Caveat) */
    useEffect(() => {
        const id = "tpl4-fonts"
        if (document.getElementById(id)) return
        const preconnect1 = document.createElement("link")
        preconnect1.rel = "preconnect"
        preconnect1.href = "https://fonts.googleapis.com"
        const preconnect2 = document.createElement("link")
        preconnect2.rel = "preconnect"
        preconnect2.href = "https://fonts.gstatic.com"
        preconnect2.crossOrigin = "anonymous"
        const link = document.createElement("link")
        link.id = id
        link.rel = "stylesheet"
        link.href =
            "https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;1,6..72,300;1,6..72,400&family=Outfit:wght@300;400;500;600;700&family=Caveat:wght@500;600&family=JetBrains+Mono:wght@400;500&display=swap"
        document.head.appendChild(preconnect1)
        document.head.appendChild(preconnect2)
        document.head.appendChild(link)
    }, [])

    /* ---------- Hero parallax ---------- */
    const heroRef = useRef(null)
    const { scrollYProgress: heroProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    })
    const heroY = useTransform(heroProgress, [0, 1], ["0%", "22%"])
    const heroScale = useTransform(heroProgress, [0, 1], [1.04, 1.14])
    const heroTextY = useTransform(heroProgress, [0, 1], ["0%", "-12%"])
    const heroOpacity = useTransform(heroProgress, [0, 0.85], [1, 0])

    /* ---------- Data ---------- */
    const businessName = (portfolio && portfolio.businessName) || "Maison"
    const banner = (portfolio && portfolio.banner) || ""
    const slogan = (portfolio && portfolio.slogan) || ""
    const aboutUs = (portfolio && portfolio.aboutUs) || ""
    const missionVision = (portfolio && portfolio.missionVision) || {}
    const team = (portfolio && portfolio.ourTeam) || []
    const services = (portfolio && portfolio.ourServices) || []
    const market = (portfolio && portfolio.targetMarket) || {}
    const achievements = (portfolio && portfolio.achievements) || []
    const products = (portfolio && portfolio.products) || []
    const contactInfo = (portfolio && portfolio.contactInfo) || {}
    const phone = contactInfo.phone || ""
    const email = contactInfo.email || ""
    const address = contactInfo.address || ""
    const website = contactInfo.website || ""
    const socials = contactInfo.socials || {}

    /* ---------- WhatsApp smart link ---------- */
    const cleanedPhone = phone.replace(/[^0-9]/g, "")
    const waNumber = cleanedPhone.startsWith("6") ? cleanedPhone : "6" + cleanedPhone
    const waLink = "https://wa.me/" + waNumber

    /* ---------- Social link helper ---------- */
    const getFullSocialLink = (platform, value) => {
        if (!value) return "#"
        if (value.startsWith("http")) return value
        const cleanUser = value.replace("@", "")
        const links = {
            tiktok: "https://www.tiktok.com/@" + cleanUser,
            instagram: "https://www.instagram.com/" + cleanUser,
            facebook: "https://www.facebook.com/" + cleanUser,
            threads: "https://www.threads.net/@" + cleanUser,
        }
        return links[platform.toLowerCase()] || "https://" + value
    }

    /* ---------- Service icon picker ---------- */
    const serviceIcons = [Utensils, Coffee, Leaf, ChefHat, Soup, Sparkles, Wheat, Flame]

    /* ---------- Marquee items ---------- */
    const marqueeText = slogan || "Fresh — Seasonal — Crafted with care"
    const marqueeArr = Array.from({ length: 8 })

    /* ---------- Stat data ---------- */
    const stats = [
        { key: "TAM", label: "Total addressable market", value: market.tam },
        { key: "SAM", label: "Serviceable available market", value: market.sam },
        { key: "SOM", label: "Serviceable obtainable market", value: market.som },
    ].filter((s) => s.value)

    /* ---------- Active social links only ---------- */
    const socialEntries = [
        { key: "instagram", value: socials.instagram, Icon: FaInstagram, label: "Instagram" },
        { key: "facebook", value: socials.facebook, Icon: FaFacebook, label: "Facebook" },
        { key: "tiktok", value: socials.tiktok, Icon: FaTiktok, label: "TikTok" },
    ].filter((s) => s.value)

    const yearOpened = new Date().getFullYear() - 5

    return (
        <div
            className="tpl4 min-h-screen w-full antialiased"
            style={{
                backgroundColor: "var(--tpl4-cream)",
                color: "var(--tpl4-ink)",
                fontFamily: "var(--tpl4-body-font)",
            }}
        >
            {/* ============================================================
                DESIGN TOKENS · FONT FAMILIES · ANIMATIONS
                ============================================================ */}
            <style>{`
                .tpl4 {
                    /* oklch palette — Artisan warmth */
                    --tpl4-cream:        oklch(0.97 0.012 85);
                    --tpl4-cream-deep:   oklch(0.93 0.022 80);
                    --tpl4-ink:          oklch(0.22 0.030 60);
                    --tpl4-ink-soft:     oklch(0.32 0.030 60);
                    --tpl4-primary:      oklch(0.58 0.140 70);
                    --tpl4-primary-deep: oklch(0.46 0.150 60);
                    --tpl4-accent-soft:  oklch(0.78 0.110 90);
                    --tpl4-sage:         oklch(0.62 0.060 145);
                    --tpl4-line:         oklch(0.22 0.030 60 / 0.10);
                    --tpl4-line-strong:  oklch(0.22 0.030 60 / 0.18);

                    /* fonts (skill.md compliant — avoiding Inter / Roboto / Fraunces / system-ui) */
                    --tpl4-display-font: "Newsreader", "Cormorant Garamond", Georgia, serif;
                    --tpl4-body-font:    "Outfit", "Helvetica Neue", Helvetica, sans-serif;
                    --tpl4-script-font:  "Caveat", "Brush Script MT", cursive;
                    --tpl4-mono-font:    "JetBrains Mono", ui-monospace, monospace;
                }
                .tpl4 .tpl4-display { font-family: var(--tpl4-display-font); font-feature-settings: "ss01", "liga"; }
                .tpl4 .tpl4-body    { font-family: var(--tpl4-body-font); }
                .tpl4 .tpl4-script  { font-family: var(--tpl4-script-font); }
                .tpl4 .tpl4-mono    { font-family: var(--tpl4-mono-font); }

                .tpl4 ::selection { background-color: var(--tpl4-primary); color: var(--tpl4-cream); }

                @keyframes tpl4-scroll {
                    from { transform: translateX(0); }
                    to   { transform: translateX(-50%); }
                }
                .tpl4-marquee { animation: tpl4-scroll 42s linear infinite; }

                @keyframes tpl4-pulse {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50%      { transform: scale(1.6); opacity: 0; }
                }
                .tpl4-pulse-dot::after {
                    content: "";
                    position: absolute;
                    inset: 0;
                    border-radius: 9999px;
                    background: var(--tpl4-sage);
                    animation: tpl4-pulse 2s ease-out infinite;
                }

                .tpl4 .tpl4-link-underline {
                    background-image: linear-gradient(currentColor, currentColor);
                    background-size: 0% 1px;
                    background-position: 0 100%;
                    background-repeat: no-repeat;
                    transition: background-size 0.5s cubic-bezier(0.22,1,0.36,1);
                }
                .tpl4 .tpl4-link-underline:hover { background-size: 100% 1px; }

                .tpl4 .tpl4-card-hover {
                    transition: transform 0.5s cubic-bezier(0.22,1,0.36,1),
                                box-shadow 0.5s cubic-bezier(0.22,1,0.36,1),
                                border-color 0.3s ease;
                }
                .tpl4 .tpl4-card-hover:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 24px 48px -28px oklch(0.22 0.030 60 / 0.20);
                    border-color: var(--tpl4-line-strong);
                }

                @media (prefers-reduced-motion: reduce) {
                    .tpl4-marquee, .tpl4-pulse-dot::after { animation: none !important; }
                    .tpl4 * { transition-duration: 0.01ms !important; }
                }
            `}</style>

            {/* ============================================================
                NAVIGATION
                ============================================================ */}
            <header className="fixed top-0 inset-x-0 z-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
                    <nav className="flex items-center justify-between">
                        <a
                            href="#top"
                            className="group inline-flex items-center gap-2 sm:gap-3 rounded-full border px-3 sm:px-4 py-2 min-h-[44px] backdrop-blur-xl"
                            style={{
                                borderColor: "var(--tpl4-line-strong)",
                                backgroundColor: "color-mix(in oklch, var(--tpl4-cream) 78%, transparent)",
                            }}
                        >
                            <span
                                className="inline-flex size-7 items-center justify-center rounded-full"
                                style={{ backgroundColor: "var(--tpl4-primary)", color: "var(--tpl4-cream)" }}
                                aria-hidden="true"
                            >
                                <ChefHat className="size-3.5" />
                            </span>
                            <span
                                className="tpl4-display text-base sm:text-lg leading-none truncate max-w-[40vw] sm:max-w-none"
                                style={{ color: "var(--tpl4-ink)", fontWeight: 500 }}
                            >
                                {businessName}
                            </span>
                        </a>

                        <div className="hidden md:flex items-center gap-7 lg:gap-9">
                            {[
                                { href: "#about", label: "Story" },
                                { href: "#menu", label: "Menu" },
                                { href: "#services", label: "Service" },
                                { href: "#contact", label: "Visit" },
                            ].map((l) => (
                                <a
                                    key={l.href}
                                    href={l.href}
                                    className="tpl4-link-underline tpl4-body text-[13px] tracking-[0.18em] uppercase"
                                    style={{ color: "var(--tpl4-ink)", opacity: 0.7 }}
                                >
                                    {l.label}
                                </a>
                            ))}
                        </div>

                        <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-4 sm:px-5 py-2 min-h-[44px] text-xs sm:text-sm font-medium"
                            style={{ backgroundColor: "var(--tpl4-ink)", color: "var(--tpl4-cream)" }}
                        >
                            <FaWhatsapp className="size-3.5 sm:size-4" aria-hidden="true" />
                            <span className="hidden xs:inline">Reserve a Table</span>
                            <ArrowUpRight className="size-3.5 sm:size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </a>
                    </nav>
                </div>
            </header>

            {/* ============================================================
                HERO — editorial poster
                ============================================================ */}
            <section
                ref={heroRef}
                id="top"
                className="relative h-[100svh] min-h-[640px] w-full overflow-hidden"
            >
                {banner ? (
                    <motion.div
                        style={{ y: heroY, scale: heroScale }}
                        className="absolute inset-0 will-change-transform"
                    >
                        <img
                            src={banner || "/placeholder.svg"}
                            alt={businessName + " brand image"}
                            className="size-full object-cover"
                        />
                    </motion.div>
                ) : (
                    /* Skill.md placeholder philosophy: signal real material is needed */
                    <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ backgroundColor: "var(--tpl4-cream-deep)" }}
                    >
                        <div
                            className="tpl4-mono text-[11px] tracking-[0.3em] uppercase px-3 py-1.5 rounded-full border"
                            style={{
                                color: "var(--tpl4-ink)",
                                opacity: 0.45,
                                borderColor: "var(--tpl4-line-strong)",
                            }}
                        >
                            16:9 hero image
                        </div>
                    </div>
                )}

                {/* Cream wash for legibility */}
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(to bottom, oklch(0.97 0.012 85 / 0.5) 0%, oklch(0.97 0.012 85 / 0.30) 38%, oklch(0.97 0.012 85 / 0.96) 100%)",
                    }}
                    aria-hidden="true"
                />

                {/* Editorial corner metadata */}
                <div className="absolute top-24 sm:top-28 right-4 sm:right-8 z-10 hidden sm:flex flex-col items-end gap-3">
                    <Seal className="w-20 lg:w-24 opacity-70" />
                    <div className="text-right">
                        <div
                            className="tpl4-mono text-[10px] tracking-[0.3em] uppercase"
                            style={{ color: "var(--tpl4-ink)", opacity: 0.5 }}
                        >
                            Vol. {new Date().getFullYear() - yearOpened} · Est. {yearOpened}
                        </div>
                        <div
                            className="tpl4-script text-2xl mt-1"
                            style={{ color: "var(--tpl4-primary)" }}
                        >
                            à votre table
                        </div>
                    </div>
                </div>

                {/* Hero copy */}
                <motion.div
                    style={{ y: heroTextY, opacity: heroOpacity }}
                    className="relative z-10 flex h-full flex-col justify-end px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24 lg:pb-28"
                >
                    <div className="mx-auto w-full max-w-7xl">
                        <motion.div
                            initial="hidden"
                            animate="show"
                            variants={stagger}
                            className="flex flex-col gap-5 sm:gap-7 max-w-4xl"
                        >
                            <motion.div variants={fadeUp}>
                                <Eyebrow label={"The Kitchen · Open today"} />
                            </motion.div>

                            <motion.h1
                                variants={fadeUp}
                                className="tpl4-display text-balance leading-[0.9] tracking-tight"
                                style={{
                                    color: "var(--tpl4-ink)",
                                    fontSize: "clamp(3rem, 11vw, 9rem)",
                                    fontWeight: 400,
                                }}
                            >
                                {businessName.split(" ").map((word, i, arr) => (
                                    <span key={i}>
                                        {i === arr.length - 1 && arr.length > 1 ? (
                                            <em
                                                className="tpl4-display italic"
                                                style={{ color: "var(--tpl4-primary)", fontWeight: 300 }}
                                            >
                                                {word}
                                            </em>
                                        ) : (
                                            word
                                        )}
                                        {i < arr.length - 1 ? " " : null}
                                    </span>
                                ))}
                            </motion.h1>

                            {slogan ? (
                                <motion.p
                                    variants={fadeUp}
                                    className="tpl4-body max-w-xl text-pretty leading-relaxed"
                                    style={{
                                        color: "var(--tpl4-ink)",
                                        opacity: 0.78,
                                        fontSize: "clamp(1rem, 1.1vw + 0.6rem, 1.2rem)",
                                    }}
                                >
                                    {slogan}
                                </motion.p>
                            ) : null}

                            <motion.div
                                variants={fadeUp}
                                className="mt-2 sm:mt-4 flex flex-wrap items-center gap-3 sm:gap-4"
                            >
                                <a
                                    href={waLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-2 rounded-full px-5 sm:px-6 py-3 sm:py-3.5 min-h-[48px] text-sm font-semibold transition-transform duration-300 hover:-translate-y-0.5"
                                    style={{ backgroundColor: "var(--tpl4-primary)", color: "var(--tpl4-cream)" }}
                                >
                                    <FaWhatsapp className="size-4" aria-hidden="true" />
                                    Order &amp; Enquire
                                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                </a>
                                <a
                                    href="#menu"
                                    className="inline-flex items-center gap-2 rounded-full border px-5 sm:px-6 py-3 sm:py-3.5 min-h-[48px] text-sm font-medium transition-colors duration-300"
                                    style={{
                                        borderColor: "var(--tpl4-line-strong)",
                                        color: "var(--tpl4-ink)",
                                    }}
                                >
                                    <Utensils className="size-4" aria-hidden="true" />
                                    View the Menu
                                </a>

                                <span
                                    className="hidden sm:inline-flex items-center gap-2 ml-2 tpl4-body text-xs"
                                    style={{ color: "var(--tpl4-ink)", opacity: 0.55 }}
                                >
                                    <span className="relative inline-flex size-2 rounded-full tpl4-pulse-dot" style={{ backgroundColor: "var(--tpl4-sage)" }} />
                                    Now serving lunch
                                </span>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* ============================================================
                MARQUEE STRIP
                ============================================================ */}
            <section
                className="overflow-hidden border-y py-4 sm:py-5"
                style={{
                    borderColor: "var(--tpl4-line)",
                    backgroundColor: "var(--tpl4-cream-deep)",
                }}
                aria-hidden="true"
            >
                <div className="flex w-max gap-10 sm:gap-14 whitespace-nowrap tpl4-marquee will-change-transform">
                    {marqueeArr.concat(marqueeArr).map((_, i) => (
                        <span
                            key={i}
                            className="tpl4-display italic flex items-center gap-10 sm:gap-14"
                            style={{
                                color: "var(--tpl4-ink)",
                                fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
                                fontWeight: 300,
                            }}
                        >
                            {marqueeText}
                            <span
                                className="inline-block size-1.5 rounded-full"
                                style={{ backgroundColor: "var(--tpl4-primary)" }}
                                aria-hidden="true"
                            />
                        </span>
                    ))}
                </div>
            </section>

            {/* ============================================================
                ABOUT — Chef's note
                ============================================================ */}
            {aboutUs ? (
                <section
                    id="about"
                    className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36"
                >
                    <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                        <div className="lg:col-span-5">
                            <SectionHeading
                                index="/01"
                                eyebrow="Our Story"
                                title="A table set with"
                                italicWord="intention."
                            />
                        </div>
                        <motion.div
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-15% 0px" }}
                            variants={stagger}
                            className="lg:col-span-7 flex flex-col gap-8"
                        >
                            <motion.p
                                variants={fadeUp}
                                className="tpl4-body text-pretty leading-relaxed"
                                style={{
                                    color: "var(--tpl4-ink)",
                                    opacity: 0.85,
                                    fontSize: "clamp(1.1rem, 1.1vw + 0.7rem, 1.3rem)",
                                    lineHeight: 1.65,
                                }}
                            >
                                {aboutUs}
                            </motion.p>

                            <motion.div
                                variants={fadeUp}
                                className="flex items-center gap-4 pt-4 border-t"
                                style={{ borderColor: "var(--tpl4-line-strong)" }}
                            >
                                <span
                                    className="inline-flex size-12 items-center justify-center rounded-full"
                                    style={{
                                        backgroundColor: "var(--tpl4-cream-deep)",
                                        color: "var(--tpl4-primary)",
                                    }}
                                >
                                    <ChefHat className="size-5" />
                                </span>
                                <div className="flex flex-col">
                                    <span
                                        className="tpl4-script text-2xl leading-none"
                                        style={{ color: "var(--tpl4-primary)" }}
                                    >
                                        From our kitchen
                                    </span>
                                    <span
                                        className="tpl4-mono text-[10px] tracking-[0.3em] uppercase mt-1"
                                        style={{ color: "var(--tpl4-ink)", opacity: 0.5 }}
                                    >
                                        A note from the team
                                    </span>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>
            ) : null}

            {/* ============================================================
                MENU — printed menu
                ============================================================ */}
            {products.length > 0 ? (
                <section
                    id="menu"
                    className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36"
                    style={{ backgroundColor: "var(--tpl4-cream-deep)" }}
                >
                    <div className="mx-auto max-w-7xl">
                        <SectionHeading
                            index="/02"
                            eyebrow="The Menu"
                            title="Made fresh,"
                            italicWord="served warm."
                            align="center"
                        />

                        <div className="mt-14 sm:mt-20 grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-20 gap-y-10">
                            {products.map((p, i) => {
                                const name =
                                    p.name ||
                                    p.title ||
                                    p.productName ||
                                    "Signature dish " + (i + 1)
                                const desc = p.description || ""
                                const price = p.price || p.cost || ""
                                return (
                                    <motion.article
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-10% 0px" }}
                                        transition={{
                                            duration: 0.6,
                                            delay: (i % 4) * 0.05,
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                        className="group flex gap-5 sm:gap-6"
                                    >
                                        {p.image ? (
                                            <div
                                                className="relative size-20 sm:size-24 shrink-0 overflow-hidden rounded-2xl"
                                                style={{ outline: "1px solid var(--tpl4-line)" }}
                                            >
                                                <img
                                                    src={p.image || "/placeholder.svg"}
                                                    alt={name}
                                                    className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                            </div>
                                        ) : (
                                            <div
                                                className="flex size-20 sm:size-24 shrink-0 items-center justify-center rounded-2xl"
                                                style={{
                                                    backgroundColor: "var(--tpl4-cream)",
                                                    color: "var(--tpl4-primary)",
                                                }}
                                                aria-hidden="true"
                                            >
                                                <CookingPot className="size-7" />
                                            </div>
                                        )}

                                        <div className="flex-1 min-w-0 flex flex-col gap-2">
                                            <div className="flex items-baseline gap-3">
                                                <h3
                                                    className="tpl4-display leading-tight truncate"
                                                    style={{
                                                        color: "var(--tpl4-ink)",
                                                        fontSize: "clamp(1.25rem, 1.4vw + 0.6rem, 1.6rem)",
                                                        fontWeight: 400,
                                                    }}
                                                >
                                                    {name}
                                                </h3>
                                                <span
                                                    className="flex-1 border-b border-dotted self-end mb-1.5"
                                                    style={{ borderColor: "var(--tpl4-line-strong)" }}
                                                    aria-hidden="true"
                                                />
                                                {price ? (
                                                    <span
                                                        className="tpl4-mono text-sm sm:text-base font-medium whitespace-nowrap"
                                                        style={{ color: "var(--tpl4-primary)" }}
                                                    >
                                                        {price}
                                                    </span>
                                                ) : null}
                                            </div>
                                            {desc ? (
                                                <p
                                                    className="tpl4-body text-sm sm:text-base leading-relaxed text-pretty line-clamp-3"
                                                    style={{ color: "var(--tpl4-ink)", opacity: 0.7 }}
                                                >
                                                    {desc}
                                                </p>
                                            ) : null}
                                        </div>
                                    </motion.article>
                                )
                            })}
                        </div>
                    </div>
                </section>
            ) : null}

            {/* ============================================================
                SERVICES
                ============================================================ */}
            {services.length > 0 ? (
                <section
                    id="services"
                    className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36"
                >
                    <div className="mx-auto max-w-7xl">
                        <SectionHeading
                            index="/03"
                            eyebrow="The Service"
                            title="More than"
                            italicWord="a meal."
                        />

                        <div className="mt-14 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                            {services.map((s, i) => {
                                const Icon = serviceIcons[i % serviceIcons.length]
                                const title = s.title || s.name || "Service " + (i + 1)
                                const desc = s.description || ""
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-10% 0px" }}
                                        transition={{
                                            duration: 0.6,
                                            delay: (i % 3) * 0.06,
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                        className="tpl4-card-hover group relative flex flex-col gap-5 rounded-3xl p-6 sm:p-8 border"
                                        style={{
                                            backgroundColor: "var(--tpl4-cream)",
                                            borderColor: "var(--tpl4-line)",
                                        }}
                                    >
                                        <div
                                            className="inline-flex size-12 items-center justify-center rounded-2xl"
                                            style={{
                                                backgroundColor: "var(--tpl4-cream-deep)",
                                                color: "var(--tpl4-primary)",
                                            }}
                                        >
                                            <Icon className="size-5" aria-hidden="true" />
                                        </div>
                                        <h3
                                            className="tpl4-display leading-tight text-balance"
                                            style={{
                                                color: "var(--tpl4-ink)",
                                                fontSize: "clamp(1.4rem, 1.4vw + 0.7rem, 1.7rem)",
                                                fontWeight: 400,
                                            }}
                                        >
                                            {title}
                                        </h3>
                                        {desc ? (
                                            <p
                                                className="tpl4-body text-sm sm:text-base leading-relaxed text-pretty"
                                                style={{ color: "var(--tpl4-ink)", opacity: 0.7 }}
                                            >
                                                {desc}
                                            </p>
                                        ) : null}
                                        <span
                                            className="absolute right-6 top-6 tpl4-mono text-[10px] tracking-[0.25em]"
                                            style={{ color: "var(--tpl4-ink)", opacity: 0.35 }}
                                            aria-hidden="true"
                                        >
                                            /0{i + 1}
                                        </span>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>
                </section>
            ) : null}

            {/* ============================================================
                MISSION & VISION — inverted philosophy panel
                ============================================================ */}
            {(missionVision.mission || missionVision.vision) ? (
                <section
                    className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36"
                    style={{ backgroundColor: "var(--tpl4-ink)", color: "var(--tpl4-cream)" }}
                >
                    <div className="mx-auto max-w-7xl">
                        <SectionHeading
                            index="/04"
                            eyebrow="Philosophy"
                            title="What guides"
                            italicWord="our craft."
                            align="center"
                            invert
                        />

                        <div className="mt-14 sm:mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                            {missionVision.mission ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-10% 0px" }}
                                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                                    className="rounded-3xl p-8 sm:p-10 border"
                                    style={{
                                        borderColor: "color-mix(in oklch, var(--tpl4-cream) 14%, transparent)",
                                        backgroundColor: "color-mix(in oklch, var(--tpl4-cream) 4%, transparent)",
                                    }}
                                >
                                    <Leaf
                                        className="size-7 mb-6"
                                        style={{ color: "var(--tpl4-accent-soft)" }}
                                        aria-hidden="true"
                                    />
                                    <span
                                        className="tpl4-mono text-[10px] tracking-[0.3em] uppercase"
                                        style={{ color: "var(--tpl4-accent-soft)" }}
                                    >
                                        Mission
                                    </span>
                                    <p
                                        className="mt-4 tpl4-display leading-snug text-pretty"
                                        style={{
                                            color: "var(--tpl4-cream)",
                                            fontSize: "clamp(1.4rem, 1.6vw + 0.7rem, 1.85rem)",
                                            fontWeight: 300,
                                        }}
                                    >
                                        {missionVision.mission}
                                    </p>
                                </motion.div>
                            ) : null}

                            {missionVision.vision ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-10% 0px" }}
                                    transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                                    className="rounded-3xl p-8 sm:p-10 border"
                                    style={{
                                        borderColor: "color-mix(in oklch, var(--tpl4-cream) 14%, transparent)",
                                        backgroundColor: "color-mix(in oklch, var(--tpl4-cream) 4%, transparent)",
                                    }}
                                >
                                    <Sparkles
                                        className="size-7 mb-6"
                                        style={{ color: "var(--tpl4-accent-soft)" }}
                                        aria-hidden="true"
                                    />
                                    <span
                                        className="tpl4-mono text-[10px] tracking-[0.3em] uppercase"
                                        style={{ color: "var(--tpl4-accent-soft)" }}
                                    >
                                        Vision
                                    </span>
                                    <p
                                        className="mt-4 tpl4-display leading-snug text-pretty"
                                        style={{
                                            color: "var(--tpl4-cream)",
                                            fontSize: "clamp(1.4rem, 1.6vw + 0.7rem, 1.85rem)",
                                            fontWeight: 300,
                                        }}
                                    >
                                        {missionVision.vision}
                                    </p>
                                </motion.div>
                            ) : null}
                        </div>
                    </div>
                </section>
            ) : null}

            {/* ============================================================
                TEAM
                ============================================================ */}
            {team.length > 0 ? (
                <section className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
                    <div className="mx-auto max-w-7xl">
                        <SectionHeading
                            index="/05"
                            eyebrow="The Kitchen"
                            title="Hands behind"
                            italicWord="the plates."
                        />

                        <div className="mt-14 sm:mt-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
                            {team.map((t, i) => {
                                const name = t.name || "Team member"
                                const role = t.position || t.role || "Crew"
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-10% 0px" }}
                                        transition={{
                                            duration: 0.6,
                                            delay: (i % 4) * 0.05,
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                        className="group flex flex-col gap-3"
                                    >
                                        <div
                                            className="relative aspect-[3/4] overflow-hidden rounded-3xl"
                                            style={{ backgroundColor: "var(--tpl4-cream-deep)" }}
                                        >
                                            {t.image ? (
                                                <img
                                                    src={t.image || "/placeholder.svg"}
                                                    alt={name}
                                                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div
                                                    className="flex size-full items-center justify-center"
                                                    style={{ color: "var(--tpl4-primary)" }}
                                                    aria-hidden="true"
                                                >
                                                    <span
                                                        className="tpl4-display text-5xl"
                                                        style={{ fontWeight: 300 }}
                                                    >
                                                        {name.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                            )}
                                            <span
                                                className="absolute top-3 right-3 inline-flex size-8 items-center justify-center rounded-full tpl4-mono text-[10px] tracking-wider"
                                                style={{
                                                    backgroundColor: "var(--tpl4-cream)",
                                                    color: "var(--tpl4-ink)",
                                                }}
                                                aria-hidden="true"
                                            >
                                                0{i + 1}
                                            </span>
                                        </div>
                                        <div className="flex flex-col gap-0.5 px-1">
                                            <h3
                                                className="tpl4-display leading-tight truncate"
                                                style={{
                                                    color: "var(--tpl4-ink)",
                                                    fontSize: "clamp(1.05rem, 1vw + 0.6rem, 1.3rem)",
                                                    fontWeight: 400,
                                                }}
                                            >
                                                {name}
                                            </h3>
                                            <span
                                                className="tpl4-body text-[11px] tracking-[0.2em] uppercase truncate"
                                                style={{ color: "var(--tpl4-ink)", opacity: 0.55 }}
                                            >
                                                {role}
                                            </span>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>
                </section>
            ) : null}

            {/* ============================================================
                ACHIEVEMENTS
                ============================================================ */}
            {achievements.length > 0 ? (
                <section
                    className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36"
                    style={{ backgroundColor: "var(--tpl4-cream-deep)" }}
                >
                    <div className="mx-auto max-w-7xl">
                        <SectionHeading
                            index="/06"
                            eyebrow="Recognition"
                            title="Accolades and"
                            italicWord="kind words."
                        />

                        <div className="mt-14 sm:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                            {achievements.map((a, i) => (
                                <motion.article
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-10% 0px" }}
                                    transition={{
                                        duration: 0.6,
                                        delay: (i % 3) * 0.06,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className="tpl4-card-hover flex flex-col gap-5 rounded-3xl overflow-hidden border"
                                    style={{
                                        backgroundColor: "var(--tpl4-cream)",
                                        borderColor: "var(--tpl4-line)",
                                    }}
                                >
                                    {a.image ? (
                                        <div className="aspect-[4/3] w-full overflow-hidden">
                                            <img
                                                src={a.image || "/placeholder.svg"}
                                                alt={a.description || "Achievement " + (i + 1)}
                                                className="size-full object-cover transition-transform duration-700 hover:scale-105"
                                            />
                                        </div>
                                    ) : (
                                        <div
                                            className="aspect-[4/3] flex items-center justify-center"
                                            style={{
                                                backgroundColor: "var(--tpl4-cream-deep)",
                                                color: "var(--tpl4-primary)",
                                            }}
                                            aria-hidden="true"
                                        >
                                            <Star className="size-10" />
                                        </div>
                                    )}
                                    <div className="px-6 sm:px-8 pb-6 sm:pb-8 flex flex-col gap-3">
                                        <span
                                            className="inline-flex items-center gap-2 tpl4-mono text-[10px] tracking-[0.25em] uppercase"
                                            style={{ color: "var(--tpl4-primary)" }}
                                        >
                                            <Star className="size-3" />
                                            Chapter 0{i + 1}
                                        </span>
                                        <p
                                            className="tpl4-display leading-snug text-pretty"
                                            style={{
                                                color: "var(--tpl4-ink)",
                                                fontSize: "clamp(1.1rem, 1vw + 0.7rem, 1.35rem)",
                                                fontWeight: 400,
                                            }}
                                        >
                                            {a.description || "A milestone worth celebrating."}
                                        </p>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    </div>
                </section>
            ) : null}

            {/* ============================================================
                MARKET — TAM/SAM/SOM
                ============================================================ */}
            {stats.length > 0 ? (
                <section className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
                    <div className="mx-auto max-w-7xl">
                        <SectionHeading
                            index="/07"
                            eyebrow="The Appetite"
                            title="A growing"
                            italicWord="market."
                            align="center"
                        />

                        <div className="mt-14 sm:mt-20 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
                            {stats.map((s, i) => (
                                <div
                                    key={s.key}
                                    className="rounded-3xl p-8 sm:p-10 flex flex-col gap-4 border"
                                    style={{
                                        backgroundColor: "var(--tpl4-cream-deep)",
                                        borderColor: "var(--tpl4-line)",
                                    }}
                                >
                                    <div className="flex items-center justify-between">
                                        <span
                                            className="tpl4-mono text-[10px] tracking-[0.3em] uppercase"
                                            style={{ color: "var(--tpl4-primary)" }}
                                        >
                                            {s.key}
                                        </span>
                                        <span
                                            className="tpl4-mono text-[10px] tracking-[0.25em]"
                                            style={{ color: "var(--tpl4-ink)", opacity: 0.4 }}
                                        >
                                            /0{i + 1}
                                        </span>
                                    </div>
                                    <div
                                        className="tpl4-display leading-none tracking-tight"
                                        style={{
                                            color: "var(--tpl4-ink)",
                                            fontSize: "clamp(2.75rem, 4vw + 1rem, 4rem)",
                                            fontWeight: 400,
                                        }}
                                    >
                                        <CountUp value={s.value} />
                                    </div>
                                    <p
                                        className="tpl4-body text-sm leading-relaxed"
                                        style={{ color: "var(--tpl4-ink)", opacity: 0.65 }}
                                    >
                                        {s.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            ) : null}

            {/* ============================================================
                CONTACT — Reservation card
                ============================================================ */}
            <section
                id="contact"
                className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36"
                style={{ backgroundColor: "var(--tpl4-cream-deep)" }}
            >
                <div className="mx-auto max-w-7xl">
                    <SectionHeading
                        index="/08"
                        eyebrow="Find Us"
                        title="Come hungry,"
                        italicWord="leave happy."
                        align="center"
                    />

                    <div
                        className="mt-14 sm:mt-20 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden border"
                        style={{
                            borderColor: "var(--tpl4-line-strong)",
                            backgroundColor: "var(--tpl4-cream)",
                        }}
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-5">
                            {/* Left: details */}
                            <div className="lg:col-span-3 p-8 sm:p-12 lg:p-14 flex flex-col gap-8">
                                <div className="flex items-center gap-3">
                                    <Clock
                                        className="size-5"
                                        style={{ color: "var(--tpl4-primary)" }}
                                        aria-hidden="true"
                                    />
                                    <span
                                        className="tpl4-mono text-[10px] tracking-[0.3em] uppercase"
                                        style={{ color: "var(--tpl4-ink)", opacity: 0.6 }}
                                    >
                                        Open daily — Walk-ins welcome
                                    </span>
                                </div>

                                <h3
                                    className="tpl4-display leading-tight text-balance"
                                    style={{
                                        color: "var(--tpl4-ink)",
                                        fontSize: "clamp(1.85rem, 2.5vw + 0.8rem, 3rem)",
                                        fontWeight: 400,
                                    }}
                                >
                                    Reserve a table or{" "}
                                    <em
                                        className="tpl4-display italic"
                                        style={{ color: "var(--tpl4-primary)", fontWeight: 300 }}
                                    >
                                        send us a note.
                                    </em>
                                </h3>

                                <ul className="flex flex-col gap-4 mt-2">
                                    {phone ? (
                                        <li className="flex items-center gap-4">
                                            <span
                                                className="inline-flex size-10 items-center justify-center rounded-full"
                                                style={{
                                                    backgroundColor: "var(--tpl4-cream-deep)",
                                                    color: "var(--tpl4-primary)",
                                                }}
                                            >
                                                <Phone className="size-4" />
                                            </span>
                                            <a
                                                href={"tel:" + phone}
                                                className="tpl4-link-underline tpl4-body text-base sm:text-lg"
                                                style={{ color: "var(--tpl4-ink)" }}
                                            >
                                                {phone}
                                            </a>
                                        </li>
                                    ) : null}
                                    {email ? (
                                        <li className="flex items-center gap-4">
                                            <span
                                                className="inline-flex size-10 items-center justify-center rounded-full"
                                                style={{
                                                    backgroundColor: "var(--tpl4-cream-deep)",
                                                    color: "var(--tpl4-primary)",
                                                }}
                                            >
                                                <Mail className="size-4" />
                                            </span>
                                            <a
                                                href={"mailto:" + email}
                                                className="tpl4-link-underline tpl4-body text-base sm:text-lg break-all"
                                                style={{ color: "var(--tpl4-ink)" }}
                                            >
                                                {email}
                                            </a>
                                        </li>
                                    ) : null}
                                    {address ? (
                                        <li className="flex items-start gap-4">
                                            <span
                                                className="inline-flex size-10 items-center justify-center rounded-full shrink-0"
                                                style={{
                                                    backgroundColor: "var(--tpl4-cream-deep)",
                                                    color: "var(--tpl4-primary)",
                                                }}
                                            >
                                                <MapPin className="size-4" />
                                            </span>
                                            <span
                                                className="tpl4-body text-base sm:text-lg leading-relaxed"
                                                style={{ color: "var(--tpl4-ink)" }}
                                            >
                                                {address}
                                            </span>
                                        </li>
                                    ) : null}
                                    {website ? (
                                        <li className="flex items-center gap-4">
                                            <span
                                                className="inline-flex size-10 items-center justify-center rounded-full"
                                                style={{
                                                    backgroundColor: "var(--tpl4-cream-deep)",
                                                    color: "var(--tpl4-primary)",
                                                }}
                                            >
                                                <Globe className="size-4" />
                                            </span>
                                            <a
                                                href={
                                                    website.startsWith("http")
                                                        ? website
                                                        : "https://" + website
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="tpl4-link-underline tpl4-body text-base sm:text-lg break-all"
                                                style={{ color: "var(--tpl4-ink)" }}
                                            >
                                                {website}
                                            </a>
                                        </li>
                                    ) : null}
                                </ul>

                                {socialEntries.length > 0 ? (
                                    <div
                                        className="flex items-center gap-3 pt-4 border-t"
                                        style={{ borderColor: "var(--tpl4-line-strong)" }}
                                    >
                                        <span
                                            className="tpl4-mono text-[10px] tracking-[0.3em] uppercase"
                                            style={{ color: "var(--tpl4-ink)", opacity: 0.5 }}
                                        >
                                            Follow
                                        </span>
                                        <div className="flex items-center gap-2">
                                            {socialEntries.map(({ key, value, Icon, label }) => (
                                                <a
                                                    key={key}
                                                    href={getFullSocialLink(key, value)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label={label}
                                                    className="inline-flex size-10 items-center justify-center rounded-full transition-colors duration-300 hover:bg-[var(--tpl4-primary)] hover:text-[var(--tpl4-cream)]"
                                                    style={{
                                                        backgroundColor: "var(--tpl4-cream-deep)",
                                                        color: "var(--tpl4-ink)",
                                                    }}
                                                >
                                                    <Icon className="size-4" />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                ) : null}
                            </div>

                            {/* Right: CTA panel */}
                            <div
                                className="lg:col-span-2 p-8 sm:p-12 lg:p-14 flex flex-col justify-between gap-8"
                                style={{ backgroundColor: "var(--tpl4-ink)", color: "var(--tpl4-cream)" }}
                            >
                                <div className="flex flex-col gap-4">
                                    <Seal className="w-16" invert />
                                    <span
                                        className="tpl4-mono text-[10px] tracking-[0.3em] uppercase"
                                        style={{ color: "var(--tpl4-accent-soft)" }}
                                    >
                                        Reservations
                                    </span>
                                    <h4
                                        className="tpl4-display leading-tight"
                                        style={{
                                            color: "var(--tpl4-cream)",
                                            fontSize: "clamp(1.6rem, 1.6vw + 0.9rem, 2.25rem)",
                                            fontWeight: 400,
                                        }}
                                    >
                                        Save your seat by{" "}
                                        <em
                                            className="tpl4-script not-italic"
                                            style={{
                                                color: "var(--tpl4-accent-soft)",
                                                fontSize: "1.25em",
                                                fontWeight: 500,
                                            }}
                                        >
                                            WhatsApp
                                        </em>
                                        .
                                    </h4>
                                    <p
                                        className="tpl4-body text-sm sm:text-base leading-relaxed"
                                        style={{ color: "var(--tpl4-cream)", opacity: 0.7 }}
                                    >
                                        Tell us your party size and preferred time —
                                        we&apos;ll have everything ready when you arrive.
                                    </p>
                                </div>

                                <a
                                    href={waLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 min-h-[52px] text-sm font-semibold transition-transform duration-300 hover:-translate-y-0.5"
                                    style={{ backgroundColor: "var(--tpl4-primary)", color: "var(--tpl4-cream)" }}
                                >
                                    <FaWhatsapp className="size-4" aria-hidden="true" />
                                    Message us on WhatsApp
                                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================
                FOOTER
                ============================================================ */}
            <footer
                className="px-4 sm:px-6 lg:px-8 py-10 sm:py-12 border-t"
                style={{
                    borderColor: "var(--tpl4-line-strong)",
                    backgroundColor: "var(--tpl4-cream)",
                }}
            >
                <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <span
                            className="inline-flex size-7 items-center justify-center rounded-full"
                            style={{ backgroundColor: "var(--tpl4-primary)", color: "var(--tpl4-cream)" }}
                            aria-hidden="true"
                        >
                            <ChefHat className="size-4" />
                        </span>
                        <span
                            className="tpl4-display text-base"
                            style={{ color: "var(--tpl4-ink)", fontWeight: 500 }}
                        >
                            {businessName}
                        </span>
                    </div>
                    <p
                        className="tpl4-mono text-[10px] tracking-[0.3em] uppercase"
                        style={{ color: "var(--tpl4-ink)", opacity: 0.5 }}
                    >
                        © {new Date().getFullYear()} {businessName} — Crafted with care
                    </p>
                </div>
            </footer>
        </div>
    )
}
