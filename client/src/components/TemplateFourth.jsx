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
    MessageCircle,
    Utensils,
    Coffee,
    Leaf,
    ChefHat,
    Soup,
    Sparkles,
    Clock,
    Star,
    CookingPot,
} from "lucide-react"
import { FaInstagram, FaFacebook, FaTiktok, FaWhatsapp } from "react-icons/fa6"

/* ------------------------------------------------------------------
   TemplateFourth — "Maison de Saveur"
   A warm, appetizing LIGHT theme tailored for F&B brands.
   Palette : cream (#FBF7F0) / charcoal (#2A1F1A) / terracotta (#C7522A)
             + soft mustard accent (#E8B14F)
   Type    : Fraunces / Instrument Serif (display) + Nunito / Geist (body)
   ------------------------------------------------------------------ */

const ACCENT = "#C7522A"        // terracotta
const ACCENT_SOFT = "#E8B14F"   // warm mustard
const CREAM = "#FBF7F0"
const CREAM_DEEP = "#F2EADB"
const INK = "#2A1F1A"

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

/* Small reusable eyebrow w/ ornate divider */
function Eyebrow({ index, label, align = "left" }) {
    return (
        <div
            className={
                "flex items-center gap-3 sm:gap-4 " +
                (align === "center" ? "justify-center" : "")
            }
        >
            {index ? (
                <span
                    className="font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase"
                    style={{ color: ACCENT }}
                >
                    {index}
                </span>
            ) : null}
            <span
                className="h-px w-10 sm:w-14"
                style={{ backgroundColor: ACCENT, opacity: 0.5 }}
                aria-hidden="true"
            />
            <span
                className="text-[10px] sm:text-xs tracking-[0.3em] uppercase"
                style={{ color: INK, opacity: 0.6 }}
            >
                {label}
            </span>
        </div>
    )
}

/* Section heading – eyebrow + giant serif title with optional italic accent */
function SectionHeading({ index, eyebrow, title, italicWord, align = "left" }) {
    return (
        <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-15% 0px" }}
            className={
                align === "center"
                    ? "flex flex-col items-center text-center gap-4"
                    : "flex flex-col items-start gap-4"
            }
        >
            <motion.div variants={fadeUp}>
                <Eyebrow index={index} label={eyebrow} align={align} />
            </motion.div>
            <motion.h2
                variants={fadeUp}
                className="font-serif text-balance text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] leading-[0.95] tracking-tight"
                style={{ color: INK }}
            >
                {title}
                {italicWord ? (
                    <>
                        {" "}
                        <em className="italic" style={{ color: ACCENT }}>
                            {italicWord}
                        </em>
                    </>
                ) : null}
            </motion.h2>
        </motion.div>
    )
}

/* Decorative SVG seal — drawn with simple geometry, NOT a complex illustration */
function Seal({ className = "" }) {
    return (
        <svg
            viewBox="0 0 120 120"
            className={className}
            aria-hidden="true"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="60" cy="60" r="58" stroke={ACCENT} strokeWidth="1" opacity="0.4" />
            <circle cx="60" cy="60" r="48" stroke={ACCENT} strokeWidth="1" opacity="0.25" />
            <circle cx="60" cy="60" r="3" fill={ACCENT} />
            <path
                d="M60 14 L60 24 M60 96 L60 106 M14 60 L24 60 M96 60 L106 60"
                stroke={ACCENT}
                strokeWidth="1"
                opacity="0.5"
            />
        </svg>
    )
}

export default function TemplateFourth({ portfolio }) {
    /* ---------- Hero parallax ---------- */
    const heroRef = useRef(null)
    const { scrollYProgress: heroProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    })
    const heroY = useTransform(heroProgress, [0, 1], ["0%", "25%"])
    const heroScale = useTransform(heroProgress, [0, 1], [1.02, 1.12])
    const heroTextY = useTransform(heroProgress, [0, 1], ["0%", "-15%"])
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
    const serviceIcons = [Utensils, Coffee, Leaf, ChefHat, Soup, Sparkles]

    /* ---------- Marquee items ---------- */
    const marqueeText = slogan || "Fresh · Seasonal · Crafted with care"
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

    return (
        <div
            className="min-h-screen font-sans antialiased w-full"
            style={{
                backgroundColor: CREAM,
                color: INK,
            }}
        >
            {/* Selection styling via inline style tag (scoped feel) */}
            <style>{`
                .tpl4 ::selection { background-color: ${ACCENT}; color: ${CREAM}; }
                @keyframes tpl4-scroll {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
                .tpl4-marquee { animation: tpl4-scroll 38s linear infinite; }
            `}</style>

            <div className="tpl4">
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
                                    borderColor: "rgba(42,31,26,0.12)",
                                    backgroundColor: "rgba(251,247,240,0.8)",
                                }}
                            >
                                <span
                                    className="inline-flex size-6 items-center justify-center rounded-full"
                                    style={{ backgroundColor: ACCENT, color: CREAM }}
                                    aria-hidden="true"
                                >
                                    <ChefHat className="size-3.5" />
                                </span>
                                <span
                                    className="font-serif text-base sm:text-lg leading-none truncate max-w-[40vw] sm:max-w-none"
                                    style={{ color: INK }}
                                >
                                    {businessName}
                                </span>
                            </a>

                            <a
                                href={waLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-4 sm:px-5 py-2 min-h-[44px] text-xs sm:text-sm font-medium transition-colors duration-300"
                                style={{ backgroundColor: INK, color: CREAM }}
                            >
                                <FaWhatsapp className="size-3.5 sm:size-4" aria-hidden="true" />
                                <span className="hidden xs:inline">Reserve a Table</span>
                                <ArrowUpRight className="size-3.5 sm:size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </a>
                        </nav>
                    </div>
                </header>

                {/* ============================================================
                    HERO
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
                        <div
                            className="absolute inset-0"
                            style={{ backgroundColor: CREAM_DEEP }}
                        />
                    )}

                    {/* Warm cream wash for legibility (light theme) */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background:
                                "linear-gradient(to bottom, rgba(251,247,240,0.55) 0%, rgba(251,247,240,0.35) 40%, rgba(251,247,240,0.95) 100%)",
                        }}
                        aria-hidden="true"
                    />

                    {/* Decorative seals */}
                    <Seal className="absolute top-24 right-6 sm:right-12 w-20 sm:w-28 opacity-70 hidden sm:block" />
                    <Seal className="absolute bottom-32 left-6 sm:left-12 w-16 sm:w-20 opacity-50 hidden sm:block" />

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
                                    <Eyebrow
                                        label={"Kitchen · Est. " + (new Date().getFullYear() - 5)}
                                    />
                                </motion.div>

                                <motion.h1
                                    variants={fadeUp}
                                    className="font-serif text-balance text-[clamp(2.75rem,10vw,8.5rem)] leading-[0.92] tracking-tight"
                                    style={{ color: INK }}
                                >
                                    {businessName.split(" ").map((word, i, arr) => (
                                        <span key={i}>
                                            {i === arr.length - 1 && arr.length > 1 ? (
                                                <em className="italic" style={{ color: ACCENT }}>
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
                                        className="max-w-xl text-pretty text-base sm:text-lg lg:text-xl leading-relaxed"
                                        style={{ color: INK, opacity: 0.75 }}
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
                                        style={{ backgroundColor: ACCENT, color: CREAM }}
                                    >
                                        <FaWhatsapp className="size-4" aria-hidden="true" />
                                        Order &amp; Enquire
                                        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                    </a>
                                    <a
                                        href="#menu"
                                        className="inline-flex items-center gap-2 rounded-full border px-5 sm:px-6 py-3 sm:py-3.5 min-h-[48px] text-sm font-medium transition-colors duration-300 hover:bg-[color:var(--ink)] hover:text-white"
                                        style={{
                                            borderColor: "rgba(42,31,26,0.25)",
                                            color: INK,
                                        }}
                                    >
                                        <Utensils className="size-4" aria-hidden="true" />
                                        View the Menu
                                    </a>
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
                        borderColor: "rgba(42,31,26,0.08)",
                        backgroundColor: CREAM_DEEP,
                    }}
                    aria-hidden="true"
                >
                    <div className="flex w-max gap-10 sm:gap-14 whitespace-nowrap tpl4-marquee will-change-transform">
                        {marqueeArr.concat(marqueeArr).map((_, i) => (
                            <span
                                key={i}
                                className="font-serif italic text-2xl sm:text-3xl md:text-4xl flex items-center gap-10 sm:gap-14"
                                style={{ color: INK }}
                            >
                                {marqueeText}
                                <span
                                    className="inline-block size-2 rounded-full"
                                    style={{ backgroundColor: ACCENT }}
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
                                    className="text-pretty text-lg sm:text-xl leading-relaxed"
                                    style={{ color: INK, opacity: 0.85 }}
                                >
                                    {aboutUs}
                                </motion.p>

                                <motion.div
                                    variants={fadeUp}
                                    className="flex items-center gap-4 pt-4 border-t"
                                    style={{ borderColor: "rgba(42,31,26,0.12)" }}
                                >
                                    <span
                                        className="inline-flex size-12 items-center justify-center rounded-full"
                                        style={{
                                            backgroundColor: CREAM_DEEP,
                                            color: ACCENT,
                                        }}
                                    >
                                        <ChefHat className="size-5" />
                                    </span>
                                    <div className="flex flex-col">
                                        <span
                                            className="font-serif italic text-lg"
                                            style={{ color: INK }}
                                        >
                                            From our kitchen
                                        </span>
                                        <span
                                            className="text-xs tracking-[0.2em] uppercase"
                                            style={{ color: INK, opacity: 0.5 }}
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
                    MENU — Products as a printed menu
                    ============================================================ */}
                {products.length > 0 ? (
                    <section
                        id="menu"
                        className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36"
                        style={{ backgroundColor: CREAM_DEEP }}
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
                                                    className="relative size-20 sm:size-24 shrink-0 overflow-hidden rounded-2xl ring-1"
                                                    style={{
                                                        ringColor: "rgba(42,31,26,0.1)",
                                                    }}
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
                                                        backgroundColor: CREAM,
                                                        color: ACCENT,
                                                    }}
                                                    aria-hidden="true"
                                                >
                                                    <CookingPot className="size-7" />
                                                </div>
                                            )}

                                            <div className="flex-1 min-w-0 flex flex-col gap-2">
                                                <div className="flex items-baseline gap-3">
                                                    <h3
                                                        className="font-serif text-xl sm:text-2xl leading-tight truncate"
                                                        style={{ color: INK }}
                                                    >
                                                        {name}
                                                    </h3>
                                                    <span
                                                        className="flex-1 border-b border-dotted self-end mb-1.5"
                                                        style={{
                                                            borderColor: "rgba(42,31,26,0.25)",
                                                        }}
                                                        aria-hidden="true"
                                                    />
                                                    {price ? (
                                                        <span
                                                            className="font-mono text-sm sm:text-base font-semibold whitespace-nowrap"
                                                            style={{ color: ACCENT }}
                                                        >
                                                            {price}
                                                        </span>
                                                    ) : null}
                                                </div>
                                                {desc ? (
                                                    <p
                                                        className="text-sm sm:text-base leading-relaxed text-pretty line-clamp-3"
                                                        style={{ color: INK, opacity: 0.7 }}
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
                    SERVICES — what we offer
                    ============================================================ */}
                {services.length > 0 ? (
                    <section className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
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
                                    const title =
                                        s.title || s.name || "Service " + (i + 1)
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
                                            className="group relative flex flex-col gap-5 rounded-3xl p-6 sm:p-8 transition-colors duration-300 border"
                                            style={{
                                                backgroundColor: CREAM,
                                                borderColor: "rgba(42,31,26,0.08)",
                                            }}
                                        >
                                            <div
                                                className="inline-flex size-12 items-center justify-center rounded-2xl"
                                                style={{
                                                    backgroundColor: CREAM_DEEP,
                                                    color: ACCENT,
                                                }}
                                            >
                                                <Icon className="size-5" aria-hidden="true" />
                                            </div>
                                            <h3
                                                className="font-serif text-2xl leading-tight text-balance"
                                                style={{ color: INK }}
                                            >
                                                {title}
                                            </h3>
                                            {desc ? (
                                                <p
                                                    className="text-sm sm:text-base leading-relaxed text-pretty"
                                                    style={{ color: INK, opacity: 0.7 }}
                                                >
                                                    {desc}
                                                </p>
                                            ) : null}
                                            <span
                                                className="absolute right-6 top-6 font-mono text-[10px] tracking-[0.25em]"
                                                style={{ color: INK, opacity: 0.35 }}
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
                    MISSION & VISION — pillars
                    ============================================================ */}
                {(missionVision.mission || missionVision.vision) ? (
                    <section
                        className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36"
                        style={{ backgroundColor: INK, color: CREAM }}
                    >
                        <div className="mx-auto max-w-7xl">
                            <motion.div
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, margin: "-15% 0px" }}
                                variants={stagger}
                                className="flex flex-col items-center text-center gap-4"
                            >
                                <motion.div variants={fadeUp}>
                                    <div className="flex items-center justify-center gap-3 sm:gap-4">
                                        <span
                                            className="font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase"
                                            style={{ color: ACCENT_SOFT }}
                                        >
                                            /04
                                        </span>
                                        <span
                                            className="h-px w-10 sm:w-14"
                                            style={{
                                                backgroundColor: ACCENT_SOFT,
                                                opacity: 0.6,
                                            }}
                                            aria-hidden="true"
                                        />
                                        <span
                                            className="text-[10px] sm:text-xs tracking-[0.3em] uppercase"
                                            style={{ color: CREAM, opacity: 0.7 }}
                                        >
                                            Philosophy
                                        </span>
                                    </div>
                                </motion.div>
                                <motion.h2
                                    variants={fadeUp}
                                    className="font-serif text-balance text-4xl sm:text-6xl md:text-7xl leading-[0.95] tracking-tight"
                                    style={{ color: CREAM }}
                                >
                                    What guides{" "}
                                    <em className="italic" style={{ color: ACCENT_SOFT }}>
                                        our craft.
                                    </em>
                                </motion.h2>
                            </motion.div>

                            <div className="mt-14 sm:mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                                {missionVision.mission ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-10% 0px" }}
                                        transition={{
                                            duration: 0.7,
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                        className="rounded-3xl p-8 sm:p-10 border"
                                        style={{
                                            borderColor: "rgba(251,247,240,0.12)",
                                            backgroundColor: "rgba(251,247,240,0.04)",
                                        }}
                                    >
                                        <Leaf
                                            className="size-7 mb-6"
                                            style={{ color: ACCENT_SOFT }}
                                            aria-hidden="true"
                                        />
                                        <span
                                            className="text-[10px] tracking-[0.3em] uppercase"
                                            style={{ color: ACCENT_SOFT }}
                                        >
                                            Mission
                                        </span>
                                        <p
                                            className="mt-4 font-serif text-2xl sm:text-3xl leading-snug text-pretty"
                                            style={{ color: CREAM }}
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
                                        transition={{
                                            duration: 0.7,
                                            delay: 0.08,
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                        className="rounded-3xl p-8 sm:p-10 border"
                                        style={{
                                            borderColor: "rgba(251,247,240,0.12)",
                                            backgroundColor: "rgba(251,247,240,0.04)",
                                        }}
                                    >
                                        <Sparkles
                                            className="size-7 mb-6"
                                            style={{ color: ACCENT_SOFT }}
                                            aria-hidden="true"
                                        />
                                        <span
                                            className="text-[10px] tracking-[0.3em] uppercase"
                                            style={{ color: ACCENT_SOFT }}
                                        >
                                            Vision
                                        </span>
                                        <p
                                            className="mt-4 font-serif text-2xl sm:text-3xl leading-snug text-pretty"
                                            style={{ color: CREAM }}
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
                    TEAM — the kitchen
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
                                                style={{ backgroundColor: CREAM_DEEP }}
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
                                                        style={{ color: ACCENT }}
                                                    >
                                                        <ChefHat className="size-12" />
                                                    </div>
                                                )}
                                                <span
                                                    className="absolute top-3 right-3 inline-flex size-8 items-center justify-center rounded-full font-mono text-[10px] tracking-wider"
                                                    style={{
                                                        backgroundColor: CREAM,
                                                        color: INK,
                                                    }}
                                                    aria-hidden="true"
                                                >
                                                    0{i + 1}
                                                </span>
                                            </div>
                                            <div className="flex flex-col gap-0.5 px-1">
                                                <h3
                                                    className="font-serif text-lg sm:text-xl leading-tight truncate"
                                                    style={{ color: INK }}
                                                >
                                                    {name}
                                                </h3>
                                                <span
                                                    className="text-[11px] tracking-[0.2em] uppercase truncate"
                                                    style={{ color: INK, opacity: 0.55 }}
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
                    ACHIEVEMENTS — accolades
                    ============================================================ */}
                {achievements.length > 0 ? (
                    <section
                        className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36"
                        style={{ backgroundColor: CREAM_DEEP }}
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
                                        className="flex flex-col gap-5 rounded-3xl overflow-hidden border"
                                        style={{
                                            backgroundColor: CREAM,
                                            borderColor: "rgba(42,31,26,0.08)",
                                        }}
                                    >
                                        {a.image ? (
                                            <div className="aspect-[4/3] w-full overflow-hidden">
                                                <img
                                                    src={a.image || "/placeholder.svg"}
                                                    alt={a.description || "Achievement " + (i + 1)}
                                                    className="size-full object-cover"
                                                />
                                            </div>
                                        ) : (
                                            <div
                                                className="aspect-[4/3] flex items-center justify-center"
                                                style={{
                                                    backgroundColor: CREAM_DEEP,
                                                    color: ACCENT,
                                                }}
                                            >
                                                <Star className="size-10" />
                                            </div>
                                        )}
                                        <div className="px-6 sm:px-8 pb-6 sm:pb-8 flex flex-col gap-3">
                                            <span
                                                className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase"
                                                style={{ color: ACCENT }}
                                            >
                                                <Star className="size-3" />
                                                Chapter 0{i + 1}
                                            </span>
                                            <p
                                                className="font-serif text-lg sm:text-xl leading-snug text-pretty"
                                                style={{ color: INK }}
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
                                            backgroundColor: CREAM_DEEP,
                                            borderColor: "rgba(42,31,26,0.08)",
                                        }}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span
                                                className="text-[10px] tracking-[0.3em] uppercase font-mono"
                                                style={{ color: ACCENT }}
                                            >
                                                {s.key}
                                            </span>
                                            <span
                                                className="font-mono text-[10px] tracking-[0.25em]"
                                                style={{ color: INK, opacity: 0.4 }}
                                            >
                                                /0{i + 1}
                                            </span>
                                        </div>
                                        <div
                                            className="font-serif text-5xl sm:text-6xl leading-none tracking-tight"
                                            style={{ color: INK }}
                                        >
                                            <CountUp value={s.value} />
                                        </div>
                                        <p
                                            className="text-sm leading-relaxed"
                                            style={{ color: INK, opacity: 0.65 }}
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
                    style={{ backgroundColor: CREAM_DEEP }}
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
                                borderColor: "rgba(42,31,26,0.1)",
                                backgroundColor: CREAM,
                            }}
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-5">
                                {/* Left: details */}
                                <div className="lg:col-span-3 p-8 sm:p-12 lg:p-14 flex flex-col gap-8">
                                    <div className="flex items-center gap-3">
                                        <Clock
                                            className="size-5"
                                            style={{ color: ACCENT }}
                                            aria-hidden="true"
                                        />
                                        <span
                                            className="text-xs tracking-[0.25em] uppercase"
                                            style={{ color: INK, opacity: 0.6 }}
                                        >
                                            Open daily — Walk-ins welcome
                                        </span>
                                    </div>

                                    <h3
                                        className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight text-balance"
                                        style={{ color: INK }}
                                    >
                                        Reserve a table or{" "}
                                        <em className="italic" style={{ color: ACCENT }}>
                                            send us a note.
                                        </em>
                                    </h3>

                                    <ul className="flex flex-col gap-4 mt-2">
                                        {phone ? (
                                            <li className="flex items-center gap-4">
                                                <span
                                                    className="inline-flex size-10 items-center justify-center rounded-full"
                                                    style={{
                                                        backgroundColor: CREAM_DEEP,
                                                        color: ACCENT,
                                                    }}
                                                >
                                                    <Phone className="size-4" />
                                                </span>
                                                <a
                                                    href={"tel:" + phone}
                                                    className="text-base sm:text-lg hover:underline"
                                                    style={{ color: INK }}
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
                                                        backgroundColor: CREAM_DEEP,
                                                        color: ACCENT,
                                                    }}
                                                >
                                                    <Mail className="size-4" />
                                                </span>
                                                <a
                                                    href={"mailto:" + email}
                                                    className="text-base sm:text-lg hover:underline break-all"
                                                    style={{ color: INK }}
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
                                                        backgroundColor: CREAM_DEEP,
                                                        color: ACCENT,
                                                    }}
                                                >
                                                    <MapPin className="size-4" />
                                                </span>
                                                <span
                                                    className="text-base sm:text-lg leading-relaxed"
                                                    style={{ color: INK }}
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
                                                        backgroundColor: CREAM_DEEP,
                                                        color: ACCENT,
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
                                                    className="text-base sm:text-lg hover:underline break-all"
                                                    style={{ color: INK }}
                                                >
                                                    {website}
                                                </a>
                                            </li>
                                        ) : null}
                                    </ul>

                                    {socialEntries.length > 0 ? (
                                        <div
                                            className="flex items-center gap-3 pt-4 border-t"
                                            style={{ borderColor: "rgba(42,31,26,0.1)" }}
                                        >
                                            <span
                                                className="text-[10px] tracking-[0.3em] uppercase"
                                                style={{ color: INK, opacity: 0.5 }}
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
                                                        className="inline-flex size-10 items-center justify-center rounded-full transition-colors duration-300"
                                                        style={{
                                                            backgroundColor: CREAM_DEEP,
                                                            color: INK,
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
                                    style={{ backgroundColor: INK, color: CREAM }}
                                >
                                    <div className="flex flex-col gap-4">
                                        <Seal className="w-16" />
                                        <span
                                            className="text-[10px] tracking-[0.3em] uppercase"
                                            style={{ color: ACCENT_SOFT }}
                                        >
                                            Reservations
                                        </span>
                                        <h4
                                            className="font-serif text-3xl sm:text-4xl leading-tight"
                                            style={{ color: CREAM }}
                                        >
                                            Save your seat by WhatsApp.
                                        </h4>
                                        <p
                                            className="text-sm sm:text-base leading-relaxed"
                                            style={{ color: CREAM, opacity: 0.7 }}
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
                                        style={{ backgroundColor: ACCENT, color: CREAM }}
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
                        borderColor: "rgba(42,31,26,0.1)",
                        backgroundColor: CREAM,
                    }}
                >
                    <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <span
                                className="inline-flex size-7 items-center justify-center rounded-full"
                                style={{ backgroundColor: ACCENT, color: CREAM }}
                                aria-hidden="true"
                            >
                                <ChefHat className="size-4" />
                            </span>
                            <span
                                className="font-serif text-base"
                                style={{ color: INK }}
                            >
                                {businessName}
                            </span>
                        </div>
                        <p
                            className="text-xs tracking-[0.2em] uppercase"
                            style={{ color: INK, opacity: 0.5 }}
                        >
                            © {new Date().getFullYear()} {businessName} — Crafted with care
                        </p>
                    </div>
                </footer>
            </div>
        </div>
    )
}
