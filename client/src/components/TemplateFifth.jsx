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
    Code2,
    Cpu,
    Cloud,
    Shield,
    Database,
    Zap,
    Terminal,
    GitBranch,
    Server,
    Activity,
    Layers,
    Boxes,
    ChevronRight,
    Sparkles,
} from "lucide-react"
import { FaInstagram, FaFacebook, FaLinkedin, FaGithub, FaXTwitter, FaWhatsapp } from "react-icons/fa6"

/* ------------------------------------------------------------------
   TemplateFifth — "NEXUS / Cybernetic"
   A dark, futuristic theme tailored for Tech / IT / SaaS brands.
   Palette : ink (#0A0E1A) / surface (#111827) / fog (#E5E7EB)
             + electric cyan (#22D3EE) primary accent
             + lime (#A3E635) status accent
   Type    : JetBrains Mono / Geist Mono (display+code)
             + Geist / Inter (body)
   ------------------------------------------------------------------ */

const ACCENT = "#22D3EE"        // electric cyan
const ACCENT_DIM = "#0E7490"    // dim cyan
const STATUS = "#A3E635"        // lime
const INK = "#0A0E1A"
const SURFACE = "#111827"
const SURFACE_2 = "#0F1626"
const FOG = "#E5E7EB"
const MUTED = "rgba(229,231,235,0.55)"
const LINE = "rgba(255,255,255,0.08)"

const fadeUp = {
    hidden: { opacity: 0, y: 22 },
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

/* ===== Animated count-up ===== */
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

/* ===== Eyebrow with bracketed index ===== */
function Eyebrow({ index, label, align = "left" }) {
    return (
        <div
            className={
                "flex items-center gap-3 " +
                (align === "center" ? "justify-center" : "")
            }
        >
            {index ? (
                <span
                    className="font-mono text-[10px] sm:text-xs tracking-[0.25em]"
                    style={{ color: ACCENT }}
                >
                    [{index}]
                </span>
            ) : null}
            <span
                className="h-px w-10 sm:w-14"
                style={{ backgroundColor: ACCENT, opacity: 0.45 }}
                aria-hidden="true"
            />
            <span
                className="font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase"
                style={{ color: MUTED }}
            >
                {label}
            </span>
        </div>
    )
}

/* ===== Section heading ===== */
function SectionHeading({ index, eyebrow, title, accentWord, align = "left" }) {
    return (
        <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-15% 0px" }}
            variants={stagger}
            className={align === "center" ? "text-center" : ""}
        >
            <motion.div variants={fadeUp}>
                <Eyebrow index={index} label={eyebrow} align={align} />
            </motion.div>
            <motion.h2
                variants={fadeUp}
                className="mt-4 sm:mt-6 text-3xl sm:text-5xl md:text-6xl lg:text-7xl"
                style={{
                    fontFamily: "'Geist', 'Inter', sans-serif",
                    fontWeight: 600,
                    letterSpacing: "-0.04em",
                    lineHeight: 1.02,
                    color: FOG,
                }}
            >
                {title}
                {accentWord && (
                    <>
                        {" "}
                        <span style={{ color: ACCENT, fontFamily: "'JetBrains Mono', monospace", fontWeight: 500 }}>
                            {accentWord}
                        </span>
                    </>
                )}
            </motion.h2>
        </motion.div>
    )
}

/* ===== Reusable grid background ===== */
function GridBackdrop({ opacity = 0.06 }) {
    return (
        <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
                backgroundImage: `linear-gradient(${LINE} 1px, transparent 1px), linear-gradient(90deg, ${LINE} 1px, transparent 1px)`,
                backgroundSize: "56px 56px",
                opacity,
                maskImage:
                    "radial-gradient(ellipse at center, black 40%, transparent 80%)",
                WebkitMaskImage:
                    "radial-gradient(ellipse at center, black 40%, transparent 80%)",
            }}
        />
    )
}

/* ===== Service icon resolver ===== */
const SERVICE_ICONS = [Code2, Cloud, Shield, Database, Cpu, Zap, Server, Layers]
function getServiceIcon(i) {
    return SERVICE_ICONS[i % SERVICE_ICONS.length]
}

/* ============================================================
   TEMPLATE FIFTH — main component
   ============================================================ */
export default function TemplateFifth({ portfolio }) {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    })

    /* --- Data extraction (defensive) --- */
    const businessName = (portfolio && portfolio.businessName) || "NEXUS"
    const banner = (portfolio && portfolio.banner) || ""
    const slogan = (portfolio && portfolio.slogan) || "Engineering tomorrow's infrastructure, today."
    const aboutUs = (portfolio && portfolio.aboutUs) || ""
    const missionVision = (portfolio && portfolio.missionVision) || {}
    const team = (portfolio && portfolio.ourTeam) || []
    const services = (portfolio && portfolio.ourServices) || []
    const market = (portfolio && portfolio.targetMarket) || {}
    const achievements = (portfolio && portfolio.achievements) || []
    const products = (portfolio && portfolio.products) || []
    const contactInfo = (portfolio && portfolio.contactInfo) || {}

    const phoneRaw = contactInfo.phone || ""
    const phoneClean = String(phoneRaw).replace(/\D/g, "")
    const waNumber = phoneClean.startsWith("0") ? "60" + phoneClean.slice(1) : phoneClean
    const waLink = waNumber
        ? `https://wa.me/${waNumber}?text=${encodeURIComponent(
            "Hi " + businessName + ", I'd like to discuss a project."
        )}`
        : null

    /* --- Hero parallax --- */
    const heroBgY = useTransform(scrollYProgress, [0, 0.25], ["0%", "18%"])
    const heroOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0.4])

    /* --- Terminal typing effect --- */
    const [typed, setTyped] = useState("")
    useEffect(() => {
        const fullText = `> initializing ${businessName.toLowerCase()}.system\n> loading modules... [OK]\n> deploying solutions... [READY]`
        let i = 0
        const id = setInterval(() => {
            i++
            setTyped(fullText.slice(0, i))
            if (i >= fullText.length) clearInterval(id)
        }, 22)
        return () => clearInterval(id)
    }, [businessName])

    return (
        <div
            ref={containerRef}
            className="w-full relative overflow-hidden"
            style={{
                backgroundColor: INK,
                color: FOG,
                fontFamily: "'Geist', 'Inter', sans-serif",
            }}
        >
            {/* ============================================================
                01 — HERO
            ============================================================ */}
            <section className="relative min-h-screen w-full flex items-center overflow-hidden">
                {/* Background image / gradient */}
                <motion.div
                    style={{ y: heroBgY, opacity: heroOpacity }}
                    className="absolute inset-0"
                >
                    {banner ? (
                        <>
                            <img
                                src={banner}
                                alt=""
                                className="absolute inset-0 w-full h-full object-cover"
                                style={{ filter: "grayscale(40%) contrast(1.05) brightness(0.55)" }}
                            />
                            <div
                                className="absolute inset-0"
                                style={{
                                    background: `linear-gradient(180deg, rgba(10,14,26,0.45) 0%, rgba(10,14,26,0.85) 60%, ${INK} 100%)`,
                                }}
                            />
                        </>
                    ) : (
                        <div
                            className="absolute inset-0"
                            style={{
                                background: `radial-gradient(ellipse at 30% 20%, rgba(34,211,238,0.18), transparent 55%), radial-gradient(ellipse at 80% 70%, rgba(34,211,238,0.08), transparent 55%), ${INK}`,
                            }}
                        />
                    )}
                </motion.div>

                <GridBackdrop opacity={0.09} />

                {/* Top status bar */}
                <div
                    className="absolute top-0 left-0 right-0 z-20 border-b"
                    style={{ borderColor: LINE, backgroundColor: "rgba(10,14,26,0.6)", backdropFilter: "blur(8px)" }}
                >
                    <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-3 flex items-center justify-between text-[11px] font-mono">
                        <div className="flex items-center gap-2.5" style={{ color: MUTED }}>
                            <span
                                className="inline-flex h-2 w-2 rounded-full"
                                style={{ backgroundColor: STATUS, boxShadow: `0 0 8px ${STATUS}` }}
                            />
                            <span className="uppercase tracking-[0.25em]" style={{ color: STATUS }}>
                                System Online
                            </span>
                            <span className="hidden sm:inline">·</span>
                            <span className="hidden sm:inline tracking-wider">v.2026.11.27</span>
                        </div>
                        <div className="hidden md:flex items-center gap-5 tracking-wider" style={{ color: MUTED }}>
                            <span>UPTIME 99.99%</span>
                            <span>·</span>
                            <span>LAT 14ms</span>
                            <span>·</span>
                            <span style={{ color: ACCENT }}>SECURE</span>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-32 pb-16">
                    <motion.div
                        initial="hidden"
                        animate="show"
                        variants={stagger}
                        className="max-w-5xl"
                    >
                        <motion.div variants={fadeUp}>
                            <Eyebrow index="01" label="Engineered Systems" />
                        </motion.div>

                        <motion.h1
                            variants={fadeUp}
                            className="mt-6 sm:mt-8 text-5xl sm:text-7xl md:text-8xl lg:text-9xl"
                            style={{
                                fontFamily: "'Geist', 'Inter', sans-serif",
                                fontWeight: 600,
                                letterSpacing: "-0.05em",
                                lineHeight: 0.95,
                                color: FOG,
                            }}
                        >
                            {businessName}
                            <span style={{ color: ACCENT }}>.</span>
                        </motion.h1>

                        <motion.p
                            variants={fadeUp}
                            className="mt-6 sm:mt-8 text-lg sm:text-xl md:text-2xl max-w-3xl"
                            style={{ color: "rgba(229,231,235,0.78)", lineHeight: 1.5 }}
                        >
                            {slogan}
                        </motion.p>

                        {/* Terminal block */}
                        <motion.div
                            variants={fadeUp}
                            className="mt-10 max-w-2xl rounded-md overflow-hidden border"
                            style={{ borderColor: LINE, backgroundColor: "rgba(15,22,38,0.85)" }}
                        >
                            <div
                                className="flex items-center gap-2 px-4 py-2 border-b"
                                style={{ borderColor: LINE }}
                            >
                                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#FF5F57" }} />
                                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#FEBC2E" }} />
                                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#28C840" }} />
                                <span
                                    className="ml-auto font-mono text-[10px] tracking-wider"
                                    style={{ color: MUTED }}
                                >
                                    ~/{businessName.toLowerCase().replace(/\s+/g, "-")} — zsh
                                </span>
                            </div>
                            <pre
                                className="px-4 py-4 text-xs sm:text-sm whitespace-pre-wrap"
                                style={{
                                    fontFamily: "'JetBrains Mono', 'Geist Mono', monospace",
                                    color: STATUS,
                                    minHeight: "5.5rem",
                                }}
                            >
                                {typed}
                                <span
                                    className="inline-block w-2 h-4 ml-0.5 align-middle"
                                    style={{ backgroundColor: STATUS, animation: "blink 1s step-end infinite" }}
                                />
                            </pre>
                        </motion.div>

                        <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
                            {waLink && (
                                <a
                                    href={waLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-2.5 px-6 py-3.5 font-mono text-xs tracking-[0.25em] uppercase transition-all"
                                    style={{
                                        backgroundColor: ACCENT,
                                        color: INK,
                                        borderRadius: 4,
                                        boxShadow: `0 0 0 1px ${ACCENT}, 0 0 24px rgba(34,211,238,0.35)`,
                                    }}
                                    onMouseEnter={(e) =>
                                        (e.currentTarget.style.boxShadow = `0 0 0 1px ${ACCENT}, 0 0 36px rgba(34,211,238,0.55)`)
                                    }
                                    onMouseLeave={(e) =>
                                        (e.currentTarget.style.boxShadow = `0 0 0 1px ${ACCENT}, 0 0 24px rgba(34,211,238,0.35)`)
                                    }
                                >
                                    <Terminal className="h-4 w-4" />
                                    <span>./start_project</span>
                                </a>
                            )}
                            <a
                                href="#stack"
                                className="inline-flex items-center gap-2.5 px-6 py-3.5 font-mono text-xs tracking-[0.25em] uppercase border transition-all"
                                style={{
                                    borderColor: "rgba(229,231,235,0.25)",
                                    color: FOG,
                                    borderRadius: 4,
                                    backgroundColor: "transparent",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = ACCENT
                                    e.currentTarget.style.color = ACCENT
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = "rgba(229,231,235,0.25)"
                                    e.currentTarget.style.color = FOG
                                }}
                            >
                                Explore Stack
                                <ChevronRight className="h-4 w-4" />
                            </a>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Bottom scroll indicator */}
                <div className="absolute bottom-6 left-0 right-0 z-10 flex items-center justify-center">
                    <span className="font-mono text-[10px] tracking-[0.4em] uppercase" style={{ color: MUTED }}>
                        scroll · 002
                    </span>
                </div>

                <style>{`
                    @keyframes blink { 50% { opacity: 0; } }
                `}</style>
            </section>

            {/* ============================================================
                02 — KEYWORD MARQUEE
            ============================================================ */}
            <section
                className="relative py-6 border-y overflow-hidden"
                style={{ borderColor: LINE, backgroundColor: SURFACE_2 }}
            >
                <motion.div
                    className="flex gap-12 whitespace-nowrap"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                >
                    {[...Array(2)].map((_, dup) => (
                        <div key={dup} className="flex gap-12 shrink-0">
                            {["// CLOUD NATIVE", "// AI-DRIVEN", "// ZERO-TRUST", "// EDGE COMPUTE", "// REAL-TIME", "// SCALABLE", "// SECURE BY DESIGN", "// OPEN SOURCE", "// 24/7 SRE"].map((w, i) => (
                                <span
                                    key={`${dup}-${i}`}
                                    className="font-mono text-sm sm:text-base tracking-widest"
                                    style={{ color: i % 2 === 0 ? FOG : ACCENT, opacity: i % 2 === 0 ? 0.6 : 1 }}
                                >
                                    {w}
                                </span>
                            ))}
                        </div>
                    ))}
                </motion.div>
            </section>

            {/* ============================================================
                03 — ABOUT (split with code snippet)
            ============================================================ */}
            {aboutUs && (
                <section className="relative py-24 sm:py-32 lg:py-40" style={{ backgroundColor: INK }}>
                    <GridBackdrop opacity={0.04} />
                    <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                        <div className="lg:col-span-5">
                            <SectionHeading
                                index="02"
                                eyebrow="About / Manifesto"
                                title="We build"
                                accentWord="resilient_systems."
                            />
                        </div>
                        <motion.div
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-15% 0px" }}
                            variants={stagger}
                            className="lg:col-span-7 lg:pt-4"
                        >
                            <motion.p
                                variants={fadeUp}
                                className="text-base sm:text-lg leading-relaxed"
                                style={{ color: "rgba(229,231,235,0.75)" }}
                            >
                                {aboutUs}
                            </motion.p>

                            {/* Code-snippet block */}
                            <motion.div
                                variants={fadeUp}
                                className="mt-10 rounded-md border overflow-hidden"
                                style={{ borderColor: LINE, backgroundColor: SURFACE }}
                            >
                                <div
                                    className="flex items-center justify-between px-4 py-2.5 border-b font-mono text-[11px]"
                                    style={{ borderColor: LINE, color: MUTED }}
                                >
                                    <div className="flex items-center gap-2">
                                        <Code2 className="h-3.5 w-3.5" style={{ color: ACCENT }} />
                                        <span>manifest.ts</span>
                                    </div>
                                    <span style={{ color: STATUS }}>● synced</span>
                                </div>
                                <pre
                                    className="px-5 py-5 text-xs sm:text-sm leading-relaxed overflow-x-auto"
                                    style={{
                                        fontFamily: "'JetBrains Mono', 'Geist Mono', monospace",
                                        color: "rgba(229,231,235,0.85)",
                                    }}
                                >
                                    {`const ${businessName.toLowerCase().replace(/\s+/g, "_")} = {`}
                                    {`\n  mission: `}<span style={{ color: ACCENT }}>"deliver world-class engineering"</span>{`,`}
                                    {`\n  values:  [`}<span style={{ color: STATUS }}>"craft"</span>{`, `}<span style={{ color: STATUS }}>"velocity"</span>{`, `}<span style={{ color: STATUS }}>"trust"</span>{`],`}
                                    {`\n  status:  `}<span style={{ color: ACCENT }}>"shipping"</span>{`,`}
                                    {`\n};`}
                                </pre>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* ============================================================
                04 — SERVICES / STACK
            ============================================================ */}
            {services.length > 0 && (
                <section
                    id="stack"
                    className="relative py-24 sm:py-32 lg:py-40 border-t"
                    style={{ backgroundColor: SURFACE_2, borderColor: LINE }}
                >
                    <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
                        <SectionHeading
                            index="03"
                            eyebrow="Capabilities"
                            title="Our"
                            accentWord="stack()"
                        />
                        <motion.div
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-10% 0px" }}
                            variants={stagger}
                            className="mt-14 sm:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
                            style={{ backgroundColor: LINE }}
                        >
                            {services.map((s, i) => {
                                const Icon = getServiceIcon(i)
                                return (
                                    <motion.div
                                        key={i}
                                        variants={fadeUp}
                                        className="group relative p-7 sm:p-9 transition-colors"
                                        style={{ backgroundColor: INK }}
                                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = SURFACE)}
                                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = INK)}
                                    >
                                        <div className="flex items-start justify-between mb-8">
                                            <div
                                                className="inline-flex items-center justify-center h-12 w-12 rounded border"
                                                style={{ borderColor: LINE, backgroundColor: "rgba(34,211,238,0.06)" }}
                                            >
                                                <Icon className="h-5 w-5" style={{ color: ACCENT }} />
                                            </div>
                                            <span
                                                className="font-mono text-[10px] tracking-[0.25em]"
                                                style={{ color: MUTED }}
                                            >
                                                {String(i + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                                            </span>
                                        </div>
                                        <h3
                                            className="text-xl sm:text-2xl mb-3"
                                            style={{
                                                fontFamily: "'Geist', sans-serif",
                                                fontWeight: 500,
                                                letterSpacing: "-0.02em",
                                                color: FOG,
                                            }}
                                        >
                                            {s.title || s.name || "Service"}
                                        </h3>
                                        <p
                                            className="text-sm leading-relaxed"
                                            style={{ color: "rgba(229,231,235,0.6)" }}
                                        >
                                            {s.description || ""}
                                        </p>
                                        <div className="mt-7 flex items-center gap-2 font-mono text-[11px] tracking-widest" style={{ color: ACCENT, opacity: 0 }}>
                                            <span className="group-hover:opacity-100 transition-opacity inline-flex items-center gap-2">
                                                LEARN MORE
                                                <ArrowUpRight className="h-3.5 w-3.5" />
                                            </span>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </motion.div>
                    </div>
                </section>
            )}

            {/* ============================================================
                05 — PRODUCTS / MODULES
            ============================================================ */}
            {products.length > 0 && (
                <section className="relative py-24 sm:py-32 lg:py-40 border-t" style={{ backgroundColor: INK, borderColor: LINE }}>
                    <GridBackdrop opacity={0.04} />
                    <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
                        <SectionHeading
                            index="04"
                            eyebrow="Products / Repos"
                            title="Modules in"
                            accentWord="production"
                        />

                        <motion.div
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-10% 0px" }}
                            variants={stagger}
                            className="mt-14 sm:mt-20 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6"
                        >
                            {products.map((p, i) => (
                                <motion.article
                                    key={i}
                                    variants={fadeUp}
                                    className="group relative rounded-md border overflow-hidden flex flex-col"
                                    style={{ borderColor: LINE, backgroundColor: SURFACE }}
                                >
                                    {/* Top header bar */}
                                    <div
                                        className="flex items-center justify-between px-5 py-3 border-b font-mono text-[11px]"
                                        style={{ borderColor: LINE, color: MUTED }}
                                    >
                                        <div className="flex items-center gap-2">
                                            <Boxes className="h-3.5 w-3.5" style={{ color: ACCENT }} />
                                            <span>~/modules/{(p.name || "module").toLowerCase().replace(/\s+/g, "-")}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span
                                                className="inline-flex h-1.5 w-1.5 rounded-full"
                                                style={{ backgroundColor: STATUS, boxShadow: `0 0 6px ${STATUS}` }}
                                            />
                                            <span style={{ color: STATUS }}>v{1 + (i % 5)}.{2 + i}.0</span>
                                        </div>
                                    </div>

                                    {/* Image */}
                                    {p.image && (
                                        <div className="relative aspect-[16/9] overflow-hidden" style={{ backgroundColor: SURFACE_2 }}>
                                            <img
                                                src={p.image}
                                                alt={p.name || "Product"}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                style={{ filter: "saturate(0.9) contrast(1.05)" }}
                                            />
                                            <div
                                                className="absolute inset-0"
                                                style={{
                                                    background: `linear-gradient(180deg, transparent 50%, ${SURFACE} 100%)`,
                                                }}
                                            />
                                        </div>
                                    )}

                                    {/* Body */}
                                    <div className="p-6 sm:p-7 flex-1 flex flex-col">
                                        <div className="flex items-start justify-between gap-4 mb-3">
                                            <h3
                                                className="text-xl sm:text-2xl"
                                                style={{
                                                    fontFamily: "'Geist', sans-serif",
                                                    fontWeight: 500,
                                                    letterSpacing: "-0.02em",
                                                    color: FOG,
                                                }}
                                            >
                                                {p.name || "Untitled module"}
                                            </h3>
                                            {p.price && (
                                                <span
                                                    className="font-mono text-xs px-2.5 py-1 rounded border whitespace-nowrap"
                                                    style={{
                                                        borderColor: ACCENT,
                                                        color: ACCENT,
                                                        backgroundColor: "rgba(34,211,238,0.06)",
                                                    }}
                                                >
                                                    {p.price}
                                                </span>
                                            )}
                                        </div>
                                        <p
                                            className="text-sm leading-relaxed flex-1"
                                            style={{ color: "rgba(229,231,235,0.6)" }}
                                        >
                                            {p.description || ""}
                                        </p>
                                        <div
                                            className="mt-6 pt-5 border-t flex items-center justify-between font-mono text-[11px] tracking-widest"
                                            style={{ borderColor: LINE, color: MUTED }}
                                        >
                                            <span className="inline-flex items-center gap-2">
                                                <GitBranch className="h-3.5 w-3.5" />
                                                main
                                            </span>
                                            <span
                                                className="inline-flex items-center gap-2 transition-colors"
                                                style={{ color: ACCENT }}
                                            >
                                                VIEW MODULE <ArrowUpRight className="h-3.5 w-3.5" />
                                            </span>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </motion.div>
                    </div>
                </section>
            )}

            {/* ============================================================
                06 — MISSION / VISION (glow panel)
            ============================================================ */}
            {(missionVision.mission || missionVision.vision) && (
                <section className="relative py-24 sm:py-32 lg:py-40 border-t" style={{ backgroundColor: SURFACE_2, borderColor: LINE }}>
                    <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
                        <SectionHeading
                            index="05"
                            eyebrow="Directive"
                            title="Mission ↔"
                            accentWord="vision"
                            align="center"
                        />
                        <div className="mt-14 sm:mt-20 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                            {missionVision.mission && (
                                <motion.div
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-15% 0px" }}
                                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                                    className="relative rounded-md border p-8 sm:p-10 overflow-hidden"
                                    style={{ borderColor: LINE, backgroundColor: INK }}
                                >
                                    <div
                                        className="absolute -top-20 -right-20 h-60 w-60 rounded-full"
                                        style={{ background: `radial-gradient(circle, rgba(34,211,238,0.18), transparent 70%)` }}
                                    />
                                    <div className="relative">
                                        <div className="flex items-center gap-3 mb-5">
                                            <Activity className="h-4 w-4" style={{ color: ACCENT }} />
                                            <span
                                                className="font-mono text-[11px] tracking-[0.3em] uppercase"
                                                style={{ color: ACCENT }}
                                            >
                                                Mission
                                            </span>
                                        </div>
                                        <p
                                            className="text-2xl sm:text-3xl md:text-4xl leading-snug"
                                            style={{
                                                fontFamily: "'Geist', sans-serif",
                                                fontWeight: 400,
                                                letterSpacing: "-0.02em",
                                                color: FOG,
                                            }}
                                        >
                                            {missionVision.mission}
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                            {missionVision.vision && (
                                <motion.div
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-15% 0px" }}
                                    transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                                    className="relative rounded-md border p-8 sm:p-10 overflow-hidden"
                                    style={{ borderColor: LINE, backgroundColor: INK }}
                                >
                                    <div
                                        className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full"
                                        style={{ background: `radial-gradient(circle, rgba(163,230,53,0.14), transparent 70%)` }}
                                    />
                                    <div className="relative">
                                        <div className="flex items-center gap-3 mb-5">
                                            <Sparkles className="h-4 w-4" style={{ color: STATUS }} />
                                            <span
                                                className="font-mono text-[11px] tracking-[0.3em] uppercase"
                                                style={{ color: STATUS }}
                                            >
                                                Vision
                                            </span>
                                        </div>
                                        <p
                                            className="text-2xl sm:text-3xl md:text-4xl leading-snug"
                                            style={{
                                                fontFamily: "'Geist', sans-serif",
                                                fontWeight: 400,
                                                letterSpacing: "-0.02em",
                                                color: FOG,
                                            }}
                                        >
                                            {missionVision.vision}
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* ============================================================
                07 — TEAM / ENGINEERS
            ============================================================ */}
            {team.length > 0 && (
                <section className="relative py-24 sm:py-32 lg:py-40 border-t" style={{ backgroundColor: INK, borderColor: LINE }}>
                    <GridBackdrop opacity={0.04} />
                    <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
                        <SectionHeading
                            index="06"
                            eyebrow="Team / Engineers"
                            title="The"
                            accentWord="builders"
                        />
                        <motion.div
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-10% 0px" }}
                            variants={stagger}
                            className="mt-14 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
                        >
                            {team.map((m, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeUp}
                                    className="group rounded-md border overflow-hidden"
                                    style={{ borderColor: LINE, backgroundColor: SURFACE }}
                                >
                                    <div className="relative aspect-[4/5] overflow-hidden" style={{ backgroundColor: SURFACE_2 }}>
                                        {m.image ? (
                                            <img
                                                src={m.image}
                                                alt={m.name || "Team member"}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                style={{ filter: "grayscale(20%)" }}
                                            />
                                        ) : (
                                            <div
                                                className="absolute inset-0 flex items-center justify-center font-mono text-4xl"
                                                style={{ color: ACCENT, opacity: 0.4 }}
                                            >
                                                {(m.name || "?").charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                        <div
                                            className="absolute inset-0"
                                            style={{
                                                background: `linear-gradient(180deg, transparent 55%, ${SURFACE} 100%)`,
                                            }}
                                        />
                                        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded font-mono text-[10px] tracking-widest"
                                            style={{ backgroundColor: "rgba(10,14,26,0.7)", border: `1px solid ${LINE}`, color: STATUS }}
                                        >
                                            <span
                                                className="inline-flex h-1.5 w-1.5 rounded-full"
                                                style={{ backgroundColor: STATUS, boxShadow: `0 0 6px ${STATUS}` }}
                                            />
                                            ACTIVE
                                        </div>
                                    </div>
                                    <div className="p-5 sm:p-6">
                                        <h3
                                            className="text-lg sm:text-xl"
                                            style={{
                                                fontFamily: "'Geist', sans-serif",
                                                fontWeight: 500,
                                                letterSpacing: "-0.01em",
                                                color: FOG,
                                            }}
                                        >
                                            {m.name || "Engineer"}
                                        </h3>
                                        <p
                                            className="mt-1 font-mono text-[11px] tracking-[0.2em] uppercase"
                                            style={{ color: ACCENT }}
                                        >
                                            {m.role || "Role"}
                                        </p>
                                        {m.bio && (
                                            <p
                                                className="mt-3 text-sm leading-relaxed"
                                                style={{ color: "rgba(229,231,235,0.6)" }}
                                            >
                                                {m.bio}
                                            </p>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>
            )}

            {/* ============================================================
                08 — MARKET / METRICS
            ============================================================ */}
            {(market.tam || market.sam || market.som) && (
                <section className="relative py-24 sm:py-32 lg:py-40 border-t" style={{ backgroundColor: SURFACE_2, borderColor: LINE }}>
                    <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
                        <SectionHeading
                            index="07"
                            eyebrow="Market / Telemetry"
                            title="Scale of"
                            accentWord="opportunity"
                        />
                        <div className="mt-14 sm:mt-20 grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: LINE }}>
                            {[
                                { key: "TAM", label: "Total Addressable", value: market.tam },
                                { key: "SAM", label: "Serviceable Available", value: market.sam },
                                { key: "SOM", label: "Serviceable Obtainable", value: market.som },
                            ]
                                .filter((m) => m.value)
                                .map((m, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 16 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-15% 0px" }}
                                        transition={{ duration: 0.6, delay: i * 0.08 }}
                                        className="p-8 sm:p-10"
                                        style={{ backgroundColor: INK }}
                                    >
                                        <div className="flex items-center justify-between mb-6">
                                            <span
                                                className="font-mono text-xs tracking-[0.3em]"
                                                style={{ color: ACCENT }}
                                            >
                                                /{m.key}
                                            </span>
                                            <span
                                                className="font-mono text-[10px] tracking-[0.25em] uppercase"
                                                style={{ color: MUTED }}
                                            >
                                                {m.label}
                                            </span>
                                        </div>
                                        <div
                                            className="text-5xl sm:text-6xl md:text-7xl"
                                            style={{
                                                fontFamily: "'Geist', sans-serif",
                                                fontWeight: 500,
                                                letterSpacing: "-0.04em",
                                                color: FOG,
                                            }}
                                        >
                                            <CountUp value={m.value} />
                                        </div>
                                    </motion.div>
                                ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ============================================================
                09 — ACHIEVEMENTS / RELEASE NOTES
            ============================================================ */}
            {achievements.length > 0 && (
                <section className="relative py-24 sm:py-32 lg:py-40 border-t" style={{ backgroundColor: INK, borderColor: LINE }}>
                    <div className="relative max-w-5xl mx-auto px-5 sm:px-8 lg:px-12">
                        <SectionHeading
                            index="08"
                            eyebrow="Changelog"
                            title="Selected"
                            accentWord="releases"
                        />
                        <motion.ol
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-10% 0px" }}
                            variants={stagger}
                            className="mt-14 sm:mt-20 relative"
                        >
                            <div
                                className="absolute left-3 sm:left-4 top-2 bottom-2 w-px"
                                style={{ backgroundColor: LINE }}
                                aria-hidden="true"
                            />
                            {achievements.map((a, i) => (
                                <motion.li
                                    key={i}
                                    variants={fadeUp}
                                    className="relative pl-12 sm:pl-16 pb-12 last:pb-0"
                                >
                                    <span
                                        className="absolute left-0 top-1.5 inline-flex items-center justify-center h-6 w-6 sm:h-8 sm:w-8 rounded-full border font-mono text-[10px]"
                                        style={{
                                            borderColor: ACCENT,
                                            backgroundColor: INK,
                                            color: ACCENT,
                                            boxShadow: `0 0 14px rgba(34,211,238,0.25)`,
                                        }}
                                    >
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span
                                            className="font-mono text-[11px] tracking-[0.25em] uppercase px-2 py-0.5 rounded"
                                            style={{
                                                backgroundColor: "rgba(34,211,238,0.08)",
                                                color: ACCENT,
                                                border: `1px solid ${ACCENT_DIM}`,
                                            }}
                                        >
                                            {a.year || "RELEASE"}
                                        </span>
                                        <span
                                            className="font-mono text-[10px] tracking-[0.25em] uppercase"
                                            style={{ color: STATUS }}
                                        >
                                            ● shipped
                                        </span>
                                    </div>
                                    <h3
                                        className="text-xl sm:text-2xl md:text-3xl"
                                        style={{
                                            fontFamily: "'Geist', sans-serif",
                                            fontWeight: 500,
                                            letterSpacing: "-0.02em",
                                            color: FOG,
                                        }}
                                    >
                                        {a.title || "Milestone"}
                                    </h3>
                                    {a.description && (
                                        <p
                                            className="mt-2 text-sm sm:text-base leading-relaxed"
                                            style={{ color: "rgba(229,231,235,0.6)" }}
                                        >
                                            {a.description}
                                        </p>
                                    )}
                                </motion.li>
                            ))}
                        </motion.ol>
                    </div>
                </section>
            )}

            {/* ============================================================
                10 — CONTACT / CTA
            ============================================================ */}
            <section className="relative py-24 sm:py-32 lg:py-40 border-t overflow-hidden" style={{ backgroundColor: SURFACE_2, borderColor: LINE }}>
                <GridBackdrop opacity={0.07} />
                <div
                    aria-hidden="true"
                    className="absolute -top-32 left-1/2 -translate-x-1/2 h-80 w-[60rem] rounded-full pointer-events-none"
                    style={{ background: `radial-gradient(circle, rgba(34,211,238,0.18), transparent 70%)` }}
                />
                <div className="relative max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
                    <Eyebrow index="09" label="Initiate Connection" align="center" />
                    <h2
                        className="mt-6 text-4xl sm:text-6xl md:text-7xl lg:text-8xl"
                        style={{
                            fontFamily: "'Geist', sans-serif",
                            fontWeight: 600,
                            letterSpacing: "-0.04em",
                            lineHeight: 1.02,
                            color: FOG,
                        }}
                    >
                        Let&apos;s ship{" "}
                        <span
                            style={{
                                color: ACCENT,
                                fontFamily: "'JetBrains Mono', monospace",
                                fontWeight: 500,
                            }}
                        >
                            something_real.
                        </span>
                    </h2>
                    <p
                        className="mt-6 max-w-2xl mx-auto text-base sm:text-lg"
                        style={{ color: "rgba(229,231,235,0.7)" }}
                    >
                        Open a channel with our engineering team. We respond within 24 hours, no automated bots.
                    </p>

                    {/* Terminal-prompt CTA */}
                    {waLink && (
                        <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-10 inline-flex items-center gap-3 px-7 py-4 font-mono text-xs sm:text-sm tracking-[0.25em] uppercase transition-all"
                            style={{
                                backgroundColor: ACCENT,
                                color: INK,
                                borderRadius: 4,
                                boxShadow: `0 0 0 1px ${ACCENT}, 0 0 36px rgba(34,211,238,0.4)`,
                            }}
                        >
                            <Terminal className="h-4 w-4" />
                            ./contact --priority=high
                            <ArrowUpRight className="h-4 w-4" />
                        </a>
                    )}

                    {/* Contact grid */}
                    <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px text-left rounded-md overflow-hidden border" style={{ borderColor: LINE, backgroundColor: LINE }}>
                        {[
                            { icon: Mail, label: "Email", value: contactInfo.email, href: contactInfo.email ? `mailto:${contactInfo.email}` : null },
                            { icon: Phone, label: "Phone", value: contactInfo.phone, href: contactInfo.phone ? `tel:${contactInfo.phone}` : null },
                            { icon: Globe, label: "Website", value: contactInfo.website, href: contactInfo.website },
                            { icon: MapPin, label: "HQ", value: contactInfo.address, href: null },
                        ]
                            .filter((c) => c.value)
                            .map((c, i) => {
                                const Icon = c.icon
                                const inner = (
                                    <div className="p-5 sm:p-6 h-full" style={{ backgroundColor: INK }}>
                                        <div className="flex items-center gap-2 mb-3">
                                            <Icon className="h-3.5 w-3.5" style={{ color: ACCENT }} />
                                            <span
                                                className="font-mono text-[10px] tracking-[0.3em] uppercase"
                                                style={{ color: MUTED }}
                                            >
                                                {c.label}
                                            </span>
                                        </div>
                                        <p
                                            className="text-sm break-words"
                                            style={{ color: FOG, fontFamily: "'JetBrains Mono', monospace" }}
                                        >
                                            {c.value}
                                        </p>
                                    </div>
                                )
                                return c.href ? (
                                    <a
                                        key={i}
                                        href={c.href}
                                        target={c.href.startsWith("http") ? "_blank" : undefined}
                                        rel="noopener noreferrer"
                                        className="transition-colors hover:bg-[#0F1626]"
                                    >
                                        {inner}
                                    </a>
                                ) : (
                                    <div key={i}>{inner}</div>
                                )
                            })}
                    </div>
                </div>
            </section>

            {/* ============================================================
                11 — FOOTER
            ============================================================ */}
            <footer className="relative border-t" style={{ borderColor: LINE, backgroundColor: INK }}>
                <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <span
                            className="inline-flex h-2 w-2 rounded-full"
                            style={{ backgroundColor: STATUS, boxShadow: `0 0 8px ${STATUS}` }}
                        />
                        <span
                            className="font-mono text-[11px] tracking-[0.25em] uppercase"
                            style={{ color: MUTED }}
                        >
                            © {new Date().getFullYear()} {businessName} — All systems operational
                        </span>
                    </div>
                    <div className="flex items-center gap-5">
                        {[
                            { Icon: FaGithub, href: contactInfo.github },
                            { Icon: FaLinkedin, href: contactInfo.linkedin },
                            { Icon: FaXTwitter, href: contactInfo.twitter || contactInfo.x },
                            { Icon: FaInstagram, href: contactInfo.instagram },
                            { Icon: FaFacebook, href: contactInfo.facebook },
                            { Icon: FaWhatsapp, href: waLink },
                        ]
                            .filter((s) => s.href)
                            .map(({ Icon, href }, i) => (
                                <a
                                    key={i}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="transition-colors"
                                    style={{ color: MUTED }}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = ACCENT)}
                                    onMouseLeave={(e) => (e.currentTarget.style.color = MUTED)}
                                    aria-label="Social link"
                                >
                                    <Icon className="h-4 w-4" />
                                </a>
                            ))}
                    </div>
                </div>
            </footer>
        </div>
    )
}