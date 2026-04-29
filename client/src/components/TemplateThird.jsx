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
    AtSign,
    MessageCircle,
    Plus,
} from "lucide-react"
import { FaInstagram, FaFacebook, FaTwitter, FaTiktok } from "react-icons/fa6"

/* ------------------------------------------------------------------
   TemplateThird — "Maison Editorial"
   A cinematic dark-luxe portfolio template.
   Palette : near-black / off-white / warm gold (#D4A574)
   Type    : Instrument Serif (display) + Geist (body)
   ------------------------------------------------------------------ */

const ACCENT = "#D4A574"

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
}

const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
}

/* Animated count-up for the stat numbers */
function CountUp({ value }) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: "-20% 0px" })
    const [display, setDisplay] = useState(value)

    // Try to extract the numeric portion (e.g. "$48B" -> 48, suffix "$" "B")
    const match = String(value).match(/^([^\d.-]*)([\d.]+)(.*)$/)
    const prefix = match ? match[1] : ""
    const numeric = match ? parseFloat(match[2]) : 0
    const suffix = match ? match[3] : ""
    const decimals = match && match[2].includes(".") ? match[2].split(".")[1].length : 0

    const mv = useMotionValue(0)

    useEffect(() => {
        if (!inView) return
        const controls = animate(mv, numeric, {
            duration: 1.6,
            ease: [0.22, 1, 0.36, 1],
            onUpdate: (latest) => {
                setDisplay(prefix + latest.toFixed(decimals) + suffix)
            },
        })
        return () => controls.stop()
    }, [inView, numeric, prefix, suffix, decimals, mv])

    return <span ref={ref}>{display}</span>
}

/* Pinned achievement panels — extracted so hooks are called in component scope */
// Replace AchievementImage and AchievementText components with this:

function AchievementsDesktop({ achievements }) {
    const [activeIndex, setActiveIndex] = useState(0)
    const triggerRefs = useRef([])

    useEffect(() => {
        const observers = triggerRefs.current.map((el, i) => {
            if (!el) return null
            const obs = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) setActiveIndex(i)
                },
                { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
            )
            obs.observe(el)
            return obs
        })
        return () => observers.forEach(o => o?.disconnect())
    }, [achievements])

    return (
        <div className="relative">
            {/* Sticky display panel — image + text */}
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <div className="mx-auto max-w-7xl w-full px-8 grid grid-cols-12 gap-12 items-center">
                    {/* Image */}
                    <div className="col-span-6 relative aspect-[4/5] overflow-hidden bg-zinc-900">
                        {achievements.map((a, i) => (
                            <motion.div
                                key={i}
                                className="absolute inset-0"
                                animate={{ opacity: i === activeIndex ? 1 : 0, scale: i === activeIndex ? 1 : 1.05 }}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            >
                                {a.image && (
                                    <img
                                        src={a.image}
                                        alt={"Achievement " + (i + 1)}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </motion.div>
                        ))}
                        <div
                            className="absolute bottom-5 left-5 font-mono text-xs tracking-[0.25em] uppercase backdrop-blur-md bg-black/40 px-3 py-2"
                            style={{ color: ACCENT }}
                        >
                            Chapter
                        </div>
                    </div>

                    {/* Text */}
                    <div className="col-span-6 relative h-[60vh]">
                        {achievements.map((a, i) => (
                            <motion.div
                                key={i}
                                className="absolute inset-0 flex flex-col justify-center gap-6"
                                animate={{
                                    opacity: i === activeIndex ? 1 : 0,
                                    y: i === activeIndex ? 0 : (i < activeIndex ? -40 : 40),
                                }}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <span className="font-serif text-8xl leading-none" style={{ color: ACCENT }}>
                                    /0{i + 1}
                                </span>
                                <p className="font-serif text-3xl xl:text-4xl leading-tight text-zinc-100 text-pretty max-w-xl">
                                    {a.description}
                                </p>
                                <div className="flex items-center gap-3 mt-2">
                                    <span className="h-px w-12" style={{ backgroundColor: ACCENT }} />
                                    <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-500">
                                        Chapter {i + 1} of {achievements.length}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Invisible trigger zones — one per achievement, each 100vh tall */}
            {achievements.map((_, i) => (
                <div
                    key={i}
                    ref={el => { triggerRefs.current[i] = el }}
                    className="h-screen"
                    aria-hidden="true"
                />
            ))}
        </div>
    )
}

/* Magazine-style number badge */
function IndexNumber({ children }) {
    return (
        <span
            className="font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase"
            style={{ color: ACCENT }}
        >
            {children}
        </span>
    )
}

/* Section heading – tiny eyebrow + giant serif title */
function SectionHeading({ index, eyebrow, title, italicWord, align = "left" }) {
    return (
        <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-15% 0px" }}
            className={
                align === "center"
                    ? "flex flex-col items-center text-center gap-3 sm:gap-4"
                    : "flex flex-col items-start gap-3 sm:gap-4"
            }
        >
            <motion.div
                variants={fadeUp}
                className={
                    "flex items-center gap-3 sm:gap-4 " + (align === "center" ? "justify-center" : "")
                }
            >
                <IndexNumber>{index}</IndexNumber>
                <span
                    className="h-px w-10 sm:w-16"
                    style={{ backgroundColor: ACCENT, opacity: 0.6 }}
                    aria-hidden="true"
                />
                <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-zinc-500">
                    {eyebrow}
                </span>
            </motion.div>
            <motion.h2
                variants={fadeUp}
                className="font-serif text-balance text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.95] tracking-tight text-zinc-100"
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

export default function TemplateThird({ portfolio }) {
    /* ---------- Hero parallax ---------- */
    const heroRef = useRef(null)
    const { scrollYProgress: heroProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    })
    const heroY = useTransform(heroProgress, [0, 1], ["0%", "35%"])
    const heroScale = useTransform(heroProgress, [0, 1], [1.05, 1.2])
    const heroTextY = useTransform(heroProgress, [0, 1], ["0%", "-20%"])
    const heroOpacity = useTransform(heroProgress, [0, 0.85], [1, 0])

    /* ---------- Achievements: IntersectionObserver state ---------- */


    /* ---------- Product columns parallax ---------- */
    const productsRef = useRef(null)
    const { scrollYProgress: productsProgress } = useScroll({
        target: productsRef,
        offset: ["start end", "end start"],
    })
    const colA_y = useTransform(productsProgress, [0, 1], ["8%", "-8%"])
    const colB_y = useTransform(productsProgress, [0, 1], ["-8%", "8%"])
    const colC_y = useTransform(productsProgress, [0, 1], ["6%", "-6%"])

    /* ---------- Data ---------- */
    const businessName = (portfolio && portfolio.businessName) || "Brand"
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

    const [activeAchIndex, setActiveAchIndex] = useState(0)
    const achTriggerRefs = useRef([])

    useEffect(() => {
        const observers = achTriggerRefs.current.map((el, i) => {
            if (!el) return null
            const obs = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setActiveAchIndex(i) },
                { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
            )
            obs.observe(el)
            return obs
        })
        return () => observers.forEach(o => o?.disconnect())
    }, [achievements])

    /* ---------- WhatsApp smart link ---------- */
    const cleanedPhone = phone.replace(/[^0-9]/g, "")
    const waNumber = cleanedPhone.startsWith("6") ? cleanedPhone : "6" + cleanedPhone
    const waLink = "https://wa.me/" + waNumber

    /* ---------- Social link helper ---------- */
    const getFullSocialLink = (platform, value) => {
        if (!value) return "#"
        if (value.startsWith("http")) return value
        const username = value.startsWith("@") ? value : "@" + value
        const cleanUser = value.replace("@", "")
        const links = {
            tiktok: "https://www.tiktok.com/" + username,
            instagram: "https://www.instagram.com/" + cleanUser,
            twitter: "https://x.com/" + cleanUser,
            facebook: "https://www.facebook.com/" + cleanUser,
            threads: "https://www.threads.net/" + username,
        }
        return links[platform.toLowerCase()] || "https://" + value
    }

    /* ---------- Split products into 3 columns for parallax ---------- */
    const cols = [[], [], []]
    products.forEach((p, i) => cols[i % 3].push(p))

    /* ---------- Marquee items (slogan strip) ---------- */
    const marqueeText = slogan || businessName
    const marqueeArr = Array.from({ length: 8 })

    /* ---------- Stat data ---------- */
    const stats = [
        { key: "TAM", label: "Total addressable market", value: market.tam },
        { key: "SAM", label: "Serviceable available market", value: market.sam },
        { key: "SOM", label: "Serviceable obtainable market", value: market.som },
    ].filter((s) => s.value)

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-zinc-100 font-sans antialiased w-full selection:bg-[#D4A574] selection:text-[#0A0A0A]">
            {/* ============================================================
          NAVIGATION
          ============================================================ */}
            <header className="fixed top-0 inset-x-0 z-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
                    <nav className="flex items-center justify-between">
                        <a
                            href="#top"
                            className="group inline-flex items-center gap-2 sm:gap-3 rounded-full border border-white/10 bg-black/40 backdrop-blur-xl px-3 sm:px-4 py-2 min-h-[44px]"
                        >
                            <span
                                className="inline-block size-1.5 rounded-full"
                                style={{ backgroundColor: ACCENT }}
                                aria-hidden="true"
                            />
                            <span className="font-serif text-base sm:text-lg leading-none truncate max-w-[40vw] sm:max-w-none">
                                {businessName}
                            </span>
                        </a>

                        <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-xl px-3 sm:px-4 py-2 min-h-[44px] text-xs sm:text-sm hover:bg-[#D4A574] hover:text-[#0A0A0A] hover:border-[#D4A574] transition-colors duration-300"
                        >
                            <MessageCircle className="size-3.5 sm:size-4" aria-hidden="true" />
                            <span className="hidden xs:inline">Enquire</span>
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
                    <div className="absolute inset-0 bg-zinc-900" />
                )}

                {/* Vignette + readability gradients */}
                <div
                    className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-[#0A0A0A]"
                    aria-hidden="true"
                />
                <div
                    className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.6)_100%)]"
                    aria-hidden="true"
                />

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
                            className="flex flex-col gap-5 sm:gap-7"
                        >
                            <motion.div
                                variants={fadeUp}
                                className="flex items-center gap-3 sm:gap-4"
                            >
                                <span
                                    className="h-px w-8 sm:w-12"
                                    style={{ backgroundColor: ACCENT }}
                                    aria-hidden="true"
                                />
                                <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-zinc-300">
                                    Maison · Est. {new Date().getFullYear() - 7}
                                </span>
                            </motion.div>

                            <motion.h1
                                variants={fadeUp}
                                className="font-serif text-balance text-[clamp(2.75rem,11vw,9rem)] leading-[0.92] tracking-tight text-zinc-50"
                            >
                                {businessName.split(" ").map((word, i, arr) => (
                                    <span key={i}>
                                        {i === arr.length - 1 ? (
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
                                    className="max-w-xl text-pretty text-base sm:text-lg lg:text-xl leading-relaxed text-zinc-300"
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
                                    className="group inline-flex items-center gap-2 rounded-full px-5 sm:px-6 py-3 sm:py-3.5 min-h-[48px] text-sm font-medium transition-colors duration-300"
                                    style={{ backgroundColor: ACCENT, color: "#0A0A0A" }}
                                >
                                    <MessageCircle className="size-4" aria-hidden="true" />
                                    Begin a conversation
                                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                </a>
                                <a
                                    href="#about"
                                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 sm:px-6 py-3 sm:py-3.5 min-h-[48px] text-sm text-zinc-100 hover:bg-white hover:text-[#0A0A0A] transition-colors duration-300"
                                >
                                    Discover the studio
                                </a>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Scroll cue */}
                <motion.div
                    style={{ opacity: heroOpacity }}
                    className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
                    aria-hidden="true"
                >
                    <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-400">
                        Scroll
                    </span>
                    <span className="block h-8 w-px bg-zinc-500/60 overflow-hidden relative">
                        <motion.span
                            className="absolute inset-x-0 top-0 h-1/2"
                            style={{ backgroundColor: ACCENT }}
                            animate={{ y: ["-100%", "200%"] }}
                            transition={{
                                duration: 2.2,
                                ease: "easeInOut",
                                repeat: Infinity,
                            }}
                        />
                    </span>
                </motion.div>
            </section>

            {/* ============================================================
          MARQUEE STRIP
          ============================================================ */}
            <section
                className="border-y border-white/5 py-4 sm:py-5 overflow-hidden"
                aria-hidden="true"
            >
                <div className="flex gap-8 sm:gap-12 whitespace-nowrap animate-[scroll_40s_linear_infinite] will-change-transform">
                    {marqueeArr.map((_, i) => (
                        <span
                            key={i}
                            className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-zinc-200 flex items-center gap-8 sm:gap-12"
                        >
                            {marqueeText}
                            <span
                                className="inline-block size-1.5 rounded-full"
                                style={{ backgroundColor: ACCENT }}
                            />
                        </span>
                    ))}
                </div>
                <style>{`
          @keyframes scroll {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
        `}</style>
            </section>

            {/* ============================================================
          ABOUT
          ============================================================ */}
            <section
                id="about"
                className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36"
            >
                <div className="mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                        {/* Sticky label rail */}
                        <div className="lg:col-span-4">
                            <div className="lg:sticky lg:top-28 flex flex-col gap-5">
                                <SectionHeading
                                    index="01 — About"
                                    eyebrow="The studio"
                                    title="A house for"
                                    italicWord="quiet things."
                                />
                            </div>
                        </div>

                        {/* About copy */}
                        <motion.div
                            variants={stagger}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-15% 0px" }}
                            className="lg:col-span-8 flex flex-col gap-6"
                        >
                            {aboutUs ? (
                                <motion.p
                                    variants={fadeUp}
                                    className="text-pretty text-lg sm:text-xl lg:text-2xl leading-relaxed text-zinc-300"
                                >
                                    <span
                                        className="float-left mr-2 sm:mr-3 mt-1 sm:mt-2 font-serif text-5xl sm:text-6xl lg:text-7xl leading-none"
                                        style={{ color: ACCENT }}
                                    >
                                        {aboutUs.charAt(0)}
                                    </span>
                                    {aboutUs.slice(1)}
                                </motion.p>
                            ) : null}

                            {(missionVision.mission || missionVision.vision) && (
                                <motion.div
                                    variants={fadeUp}
                                    className="mt-6 sm:mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10"
                                >
                                    {missionVision.mission ? (
                                        <div className="flex flex-col gap-3 border-l border-white/10 pl-5 sm:pl-6">
                                            <span
                                                className="text-[10px] tracking-[0.3em] uppercase"
                                                style={{ color: ACCENT }}
                                            >
                                                Mission
                                            </span>
                                            <p className="font-serif italic text-xl sm:text-2xl leading-snug text-zinc-100">
                                                &ldquo;{missionVision.mission}&rdquo;
                                            </p>
                                        </div>
                                    ) : null}
                                    {missionVision.vision ? (
                                        <div className="flex flex-col gap-3 border-l border-white/10 pl-5 sm:pl-6">
                                            <span
                                                className="text-[10px] tracking-[0.3em] uppercase"
                                                style={{ color: ACCENT }}
                                            >
                                                Vision
                                            </span>
                                            <p className="font-serif italic text-xl sm:text-2xl leading-snug text-zinc-100">
                                                &ldquo;{missionVision.vision}&rdquo;
                                            </p>
                                        </div>
                                    ) : null}
                                </motion.div>
                            )}

                            {missionVision.graphicInfo ? (
                                <motion.p
                                    variants={fadeUp}
                                    className="mt-4 text-sm sm:text-base text-zinc-500 max-w-prose"
                                >
                                    — {missionVision.graphicInfo}
                                </motion.p>
                            ) : null}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ============================================================
          SERVICES — numbered editorial index
          ============================================================ */}
            {services.length > 0 && (
                <section className="relative border-t border-white/5 px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-12 sm:mb-16 lg:mb-20">
                            <SectionHeading
                                index="02 — Practice"
                                eyebrow="What we offer"
                                title="Disciplines of the"
                                italicWord="house."
                            />
                        </div>

                        <motion.ul
                            variants={stagger}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-10% 0px" }}
                            className="flex flex-col"
                        >
                            {services.map((s, i) => (
                                <motion.li
                                    key={i}
                                    variants={fadeUp}
                                    className="group relative border-t border-white/10 last:border-b"
                                >
                                    <a
                                        href={waLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="grid grid-cols-12 items-start gap-4 sm:gap-6 py-6 sm:py-8 lg:py-10 min-h-[64px] transition-colors duration-500"
                                    >
                                        {/* hover background sweep */}
                                        <span
                                            className="pointer-events-none absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                                            style={{ backgroundColor: "rgba(212,165,116,0.06)" }}
                                            aria-hidden="true"
                                        />

                                        <span
                                            className="col-span-2 sm:col-span-1 font-mono text-xs sm:text-sm pt-1"
                                            style={{ color: ACCENT }}
                                        >
                                            0{i + 1}
                                        </span>

                                        <h3 className="col-span-10 sm:col-span-4 font-serif text-2xl sm:text-3xl lg:text-4xl leading-tight text-zinc-100 group-hover:translate-x-1 transition-transform duration-500">
                                            {s.serviceName}
                                        </h3>

                                        <p className="col-span-12 sm:col-span-6 text-sm sm:text-base leading-relaxed text-zinc-400 group-hover:text-zinc-200 transition-colors duration-500">
                                            {s.description}
                                        </p>

                                        <span className="col-span-12 sm:col-span-1 flex sm:justify-end items-start pt-1">
                                            <span
                                                className="inline-flex size-9 sm:size-10 items-center justify-center rounded-full border border-white/15 group-hover:border-[#D4A574] group-hover:bg-[#D4A574] group-hover:text-[#0A0A0A] transition-colors duration-500"
                                            >
                                                <ArrowUpRight className="size-4" aria-hidden="true" />
                                            </span>
                                        </span>
                                    </a>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </div>
                </section>
            )}

            {/* ============================================================
          TEAM — magazine portrait gallery
          ============================================================ */}
            {team.length > 0 && (
                <section className="relative border-t border-white/5 px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-12 sm:mb-16 lg:mb-20">
                            <SectionHeading
                                index="03 — Hands"
                                eyebrow="The makers"
                                title="Worked by"
                                italicWord="few."
                            />
                        </div>

                        <motion.div
                            variants={stagger}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-10% 0px" }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12"
                        >
                            {team.map((member, i) => (
                                <motion.article
                                    key={i}
                                    variants={fadeUp}
                                    className={
                                        "group flex flex-col gap-5 " +
                                        (i === 1 ? "md:mt-12 lg:mt-16" : "") +
                                        (i === 2 ? "md:mt-4 lg:mt-8" : "")
                                    }
                                >
                                    <div className="relative overflow-hidden aspect-[3/4] bg-zinc-900">
                                        {/* corner accents */}
                                        <span
                                            className="absolute top-3 left-3 size-3 border-t border-l z-10 transition-all duration-500 group-hover:size-5"
                                            style={{ borderColor: ACCENT }}
                                            aria-hidden="true"
                                        />
                                        <span
                                            className="absolute top-3 right-3 size-3 border-t border-r z-10 transition-all duration-500 group-hover:size-5"
                                            style={{ borderColor: ACCENT }}
                                            aria-hidden="true"
                                        />
                                        <span
                                            className="absolute bottom-3 left-3 size-3 border-b border-l z-10 transition-all duration-500 group-hover:size-5"
                                            style={{ borderColor: ACCENT }}
                                            aria-hidden="true"
                                        />
                                        <span
                                            className="absolute bottom-3 right-3 size-3 border-b border-r z-10 transition-all duration-500 group-hover:size-5"
                                            style={{ borderColor: ACCENT }}
                                            aria-hidden="true"
                                        />

                                        {member.image ? (
                                            <img
                                                src={member.image || "/placeholder.svg"}
                                                alt={"Portrait of " + member.name}
                                                className="size-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="size-full bg-zinc-800" />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-100 group-hover:opacity-40 transition-opacity duration-500" />
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex items-baseline justify-between gap-3">
                                            <h3 className="font-serif text-2xl sm:text-3xl text-zinc-100 leading-tight">
                                                {member.name}
                                            </h3>
                                            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-zinc-500 shrink-0">
                                                — 0{i + 1}
                                            </span>
                                        </div>
                                        <p
                                            className="text-xs sm:text-sm tracking-[0.15em] uppercase"
                                            style={{ color: ACCENT }}
                                        >
                                            {member.role}
                                        </p>
                                        {member.description ? (
                                            <p className="mt-2 text-sm sm:text-[0.95rem] leading-relaxed text-zinc-400">
                                                {member.description}
                                            </p>
                                        ) : null}
                                    </div>
                                </motion.article>
                            ))}
                        </motion.div>
                    </div>
                </section>
            )}

            {/* ============================================================
          ACHIEVEMENTS — pinned-image scroll
          ============================================================ */}
            {achievements.length > 0 && (
                <section
                    className="relative border-t border-white/5"
                >
                    {/* mobile fallback (stacked) */}
                    <div className="lg:hidden px-4 sm:px-6 py-20 sm:py-28">
                        <div className="mb-12 sm:mb-16">
                            <SectionHeading
                                index="04 — Record"
                                eyebrow="Selected achievements"
                                title="Moments worth"
                                italicWord="marking."
                            />
                        </div>
                        <div className="flex flex-col gap-12 sm:gap-16">
                            {achievements.map((a, i) => (
                                <motion.article
                                    key={i}
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true, margin: "-15% 0px" }}
                                    className="flex flex-col gap-5"
                                >
                                    <span
                                        className="font-serif text-6xl sm:text-7xl leading-none"
                                        style={{ color: ACCENT }}
                                    >
                                        /0{i + 1}
                                    </span>
                                    {/* 👇 BUG GAMBAR DIBAIKI DI SINI 👇 */}
                                    {a.image && (
                                        <div className="overflow-hidden aspect-[4/5] bg-zinc-900 relative">
                                            <img
                                                src={a.image}
                                                alt={"Achievement " + (i + 1)}
                                                className="absolute inset-0 w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
                                    {/* 👆 ---------------------------- 👆 */}
                                    <p className="text-base sm:text-lg leading-relaxed text-zinc-300 text-pretty">
                                        {a.description}
                                    </p>
                                </motion.article>
                            ))}
                        </div>
                    </div>

                    {/* desktop pinned scroll */}
                    <div className="hidden lg:block">
                        <div className="px-8 pt-28 pb-20 mx-auto max-w-7xl">
                            <SectionHeading
                                index="04 — Record"
                                eyebrow="Selected achievements"
                                title="Moments worth"
                                italicWord="marking."
                            />
                        </div>

                        {/* ✅ NEW BLOCK: */}
                        <div className="relative">
                            {/* Sticky display panel */}
                            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                                <div className="mx-auto max-w-7xl w-full px-8 grid grid-cols-12 gap-12 items-center">
                                    {/* Left: image */}
                                    <div className="col-span-6 relative aspect-[4/5] overflow-hidden bg-zinc-900">
                                        {achievements.map((a, i) => (
                                            <motion.div
                                                key={i}
                                                className="absolute inset-0"
                                                animate={{
                                                    opacity: i === activeAchIndex ? 1 : 0,
                                                    scale: i === activeAchIndex ? 1 : 1.05,
                                                }}
                                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                            >
                                                {a.image && (
                                                    <img
                                                        src={a.image}
                                                        alt={"Achievement " + (i + 1)}
                                                        className="w-full h-full object-cover"
                                                    />
                                                )}
                                            </motion.div>
                                        ))}
                                        <div
                                            className="absolute bottom-5 left-5 font-mono text-xs tracking-[0.25em] uppercase backdrop-blur-md bg-black/40 px-3 py-2"
                                            style={{ color: ACCENT }}
                                        >
                                            Chapter
                                        </div>
                                    </div>

                                    {/* Right: text */}
                                    <div className="col-span-6 relative h-[60vh]">
                                        {achievements.map((a, i) => (
                                            <motion.div
                                                key={i}
                                                className="absolute inset-0 flex flex-col justify-center gap-6"
                                                animate={{
                                                    opacity: i === activeAchIndex ? 1 : 0,
                                                    y: i === activeAchIndex ? 0 : i < activeAchIndex ? -40 : 40,
                                                }}
                                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                            >
                                                <span className="font-serif text-8xl leading-none" style={{ color: ACCENT }}>
                                                    /0{i + 1}
                                                </span>
                                                <p className="font-serif text-3xl xl:text-4xl leading-tight text-zinc-100 text-pretty max-w-xl">
                                                    {a.description}
                                                </p>
                                                <div className="flex items-center gap-3 mt-2">
                                                    <span className="h-px w-12" style={{ backgroundColor: ACCENT }} />
                                                    <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-500">
                                                        Chapter {i + 1} of {achievements.length}
                                                    </span>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Invisible scroll triggers — one 100vh zone per achievement */}
                            {achievements.map((_, i) => (
                                <div
                                    key={i}
                                    ref={el => { achTriggerRefs.current[i] = el }}
                                    className="h-screen"
                                    aria-hidden="true"
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ============================================================
          MARKET STATS — animated count-up
          ============================================================ */}
            {stats.length > 0 && (
                <section className="relative border-t border-white/5 px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-12 sm:mb-16 lg:mb-20">
                            <SectionHeading
                                index="05 — Reach"
                                eyebrow="The opportunity"
                                title="Numbers, with"
                                italicWord="intent."
                            />
                        </div>

                        <motion.div
                            variants={stagger}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-10% 0px" }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10"
                        >
                            {stats.map((s, i) => (
                                <motion.div
                                    key={s.key}
                                    variants={fadeUp}
                                    className="bg-[#0A0A0A] flex flex-col gap-4 sm:gap-6 p-6 sm:p-8 lg:p-10"
                                >
                                    <div className="flex items-center gap-3">
                                        <span
                                            className="font-mono text-xs tracking-[0.25em] uppercase"
                                            style={{ color: ACCENT }}
                                        >
                                            0{i + 1}
                                        </span>
                                        <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-500">
                                            {s.key}
                                        </span>
                                    </div>
                                    <div
                                        className="font-serif text-6xl sm:text-7xl lg:text-8xl leading-none tracking-tight"
                                        style={{ color: ACCENT }}
                                    >
                                        <CountUp value={s.value} />
                                    </div>
                                    <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                                        {s.label}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>
            )}

            {/* ============================================================
          PRODUCTS — three-column parallax gallery
          ============================================================ */}
            {products.length > 0 && (
                <section
                    ref={productsRef}
                    className="relative border-t border-white/5 px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36 overflow-hidden"
                >
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-12 sm:mb-16 lg:mb-20 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
                            <SectionHeading
                                index="06 — Catalogue"
                                eyebrow="Recent works"
                                title="Objects in"
                                italicWord="circulation."
                            />
                            <a
                                href={waLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="self-start sm:self-end inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-[#D4A574] transition-colors"
                            >
                                Request the lookbook
                                <ArrowUpRight className="size-4" aria-hidden="true" />
                            </a>
                        </div>

                        {/* Mobile: simple two-column grid */}
                        <div className="grid grid-cols-2 gap-3 sm:hidden">
                            {products.map((p, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-5% 0px" }}
                                    transition={{
                                        duration: 0.7,
                                        delay: (i % 4) * 0.05,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className={
                                        "relative overflow-hidden bg-zinc-900 " +
                                        (i % 3 === 0 ? "aspect-[3/4]" : "aspect-square")
                                    }
                                >
                                    <img
                                        src={p.image || "/placeholder.svg"}
                                        alt={"Product " + (i + 1)}
                                        className="size-full object-cover"
                                    />
                                </motion.div>
                            ))}
                        </div>

                        {/* Desktop: three parallax columns */}
                        <div className="hidden sm:grid grid-cols-3 gap-4 lg:gap-6">
                            {[colA_y, colB_y, colC_y].map((yMV, ci) => (
                                <motion.div
                                    key={ci}
                                    style={{ y: yMV }}
                                    className="flex flex-col gap-4 lg:gap-6 will-change-transform"
                                >
                                    {cols[ci].map((p, i) => (
                                        <div
                                            key={i}
                                            className={
                                                "group relative overflow-hidden bg-zinc-900 " +
                                                (i % 2 === 0 ? "aspect-[3/4]" : "aspect-square")
                                            }
                                        >
                                            <img
                                                src={p.image || "/placeholder.svg"}
                                                alt={"Product " + (ci * 100 + i + 1)}
                                                className="size-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700"
                                            />
                                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            <span
                                                className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.25em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                                style={{ color: ACCENT }}
                                            >
                                                <Plus className="size-3" />
                                                View
                                            </span>
                                        </div>
                                    ))}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ============================================================
          CTA / CONTACT
          ============================================================ */}
            <section className="relative border-t border-white/5 px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
                <div className="mx-auto max-w-7xl">
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-15% 0px" }}
                        className="flex flex-col gap-10 sm:gap-14"
                    >
                        <motion.div variants={fadeUp} className="flex items-center gap-3 sm:gap-4">
                            <IndexNumber>07 — Contact</IndexNumber>
                            <span
                                className="h-px w-10 sm:w-16"
                                style={{ backgroundColor: ACCENT, opacity: 0.6 }}
                                aria-hidden="true"
                            />
                            <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-zinc-500">
                                Begin a project
                            </span>
                        </motion.div>

                        <motion.h2
                            variants={fadeUp}
                            className="font-serif text-balance text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] leading-[0.9] tracking-tight text-zinc-50"
                        >
                            Let&apos;s make something{" "}
                            <em className="italic" style={{ color: ACCENT }}>
                                lasting.
                            </em>
                        </motion.h2>

                        <motion.div
                            variants={fadeUp}
                            className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 pt-6 sm:pt-10 border-t border-white/10"
                        >
                            {/* Primary CTA */}
                            <div className="md:col-span-5 flex flex-col gap-5">
                                <a
                                    href={waLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center justify-between gap-4 rounded-full px-6 sm:px-7 py-4 sm:py-5 transition-colors duration-300"
                                    style={{ backgroundColor: ACCENT, color: "#0A0A0A" }}
                                >
                                    <span className="flex items-center gap-3 text-base sm:text-lg font-medium">
                                        <MessageCircle className="size-5" aria-hidden="true" />
                                        WhatsApp the studio
                                    </span>
                                    <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                </a>
                                {phone ? (
                                    <p className="text-sm text-zinc-400">
                                        Direct line ·{" "}
                                        <a
                                            href={"tel:" + cleanedPhone}
                                            className="text-zinc-200 hover:text-[#D4A574] transition-colors"
                                        >
                                            {phone}
                                        </a>
                                    </p>
                                ) : null}
                            </div>

                            {/* Detail columns */}
                            <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                                {email ? (
                                    <a
                                        href={"mailto:" + email}
                                        className="group flex flex-col gap-2 border-t border-white/10 pt-5"
                                    >
                                        <span className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-zinc-500">
                                            <Mail className="size-3.5" aria-hidden="true" />
                                            Correspondence
                                        </span>
                                        <span className="font-serif text-xl sm:text-2xl text-zinc-100 group-hover:text-[#D4A574] transition-colors break-words">
                                            {email}
                                        </span>
                                    </a>
                                ) : null}

                                {address ? (
                                    <div className="flex flex-col gap-2 border-t border-white/10 pt-5">
                                        <span className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-zinc-500">
                                            <MapPin className="size-3.5" aria-hidden="true" />
                                            Studio
                                        </span>
                                        <span className="font-serif text-xl sm:text-2xl text-zinc-100 leading-snug">
                                            {address}
                                        </span>
                                    </div>
                                ) : null}

                                {website ? (
                                    <a
                                        href={"https://" + website.replace(/^https?:\/\//, "")}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex flex-col gap-2 border-t border-white/10 pt-5"
                                    >
                                        <span className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-zinc-500">
                                            <Globe className="size-3.5" aria-hidden="true" />
                                            Web
                                        </span>
                                        <span className="font-serif text-xl sm:text-2xl text-zinc-100 group-hover:text-[#D4A574] transition-colors">
                                            {website}
                                        </span>
                                    </a>
                                ) : null}

                                {phone ? (
                                    <div className="flex flex-col gap-2 border-t border-white/10 pt-5">
                                        <span className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-zinc-500">
                                            <Phone className="size-3.5" aria-hidden="true" />
                                            By appointment
                                        </span>
                                        <span className="font-serif text-xl sm:text-2xl text-zinc-100">
                                            {phone}
                                        </span>
                                    </div>
                                ) : null}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ============================================================
          FOOTER
          ============================================================ */}
            <footer className="relative border-t border-white/10 px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
                <div className="mx-auto max-w-7xl flex flex-col gap-8 sm:gap-10">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
                        <div className="flex items-center gap-3">
                            <span
                                className="inline-block size-2 rounded-full"
                                style={{ backgroundColor: ACCENT }}
                                aria-hidden="true"
                            />
                            <span className="font-serif text-2xl sm:text-3xl">
                                {businessName}
                            </span>
                        </div>

                        {/* Socials */}
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                            {socials.instagram ? (
                                <a
                                    href={getFullSocialLink("instagram", socials.instagram)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Instagram"
                                    className="inline-flex size-11 items-center justify-center rounded-full border border-white/15 hover:border-[#D4A574] hover:bg-[#D4A574] hover:text-[#0A0A0A] transition-colors"
                                >
                                    <FaInstagram className="size-4" />
                                </a>
                            ) : null}
                            {socials.tiktok ? (
                                <a
                                    href={getFullSocialLink("tiktok", socials.tiktok)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="TikTok"
                                    className="inline-flex size-11 items-center justify-center rounded-full border border-white/15 hover:border-[#D4A574] hover:bg-[#D4A574] hover:text-[#0A0A0A] transition-colors"
                                >
                                    <FaTiktok className="size-4" />
                                </a>
                            ) : null}
                            {socials.facebook ? (
                                <a
                                    href={getFullSocialLink("facebook", socials.facebook)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Facebook"
                                    className="inline-flex size-11 items-center justify-center rounded-full border border-white/15 hover:border-[#D4A574] hover:bg-[#D4A574] hover:text-[#0A0A0A] transition-colors"
                                >
                                    <FaFacebook className="size-4" />
                                </a>
                            ) : null}
                            {socials.twitter ? (
                                <a
                                    href={getFullSocialLink("twitter", socials.twitter)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Twitter / X"
                                    className="inline-flex size-11 items-center justify-center rounded-full border border-white/15 hover:border-[#D4A574] hover:bg-[#D4A574] hover:text-[#0A0A0A] transition-colors"
                                >
                                    <FaTwitter className="size-4" />
                                </a>
                            ) : null}
                            {socials.threads ? (
                                <a
                                    href={getFullSocialLink("threads", socials.threads)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Threads"
                                    className="inline-flex size-11 items-center justify-center rounded-full border border-white/15 hover:border-[#D4A574] hover:bg-[#D4A574] hover:text-[#0A0A0A] transition-colors"
                                >
                                    <AtSign className="size-4" />
                                </a>
                            ) : null}
                        </div>
                    </div>

                    <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 pt-6 border-t border-white/10 text-xs text-zinc-500">
                        <p>
                            © {new Date().getFullYear()} {businessName}. All works reserved.
                        </p>
                        <p className="tracking-[0.25em] uppercase">
                            Maison · Editorial · Considered
                        </p>
                    </div>
                </div>
            </footer>

            {/* ============================================================
          Floating WhatsApp pill (always reachable)
          ============================================================ */}
            <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp the studio"
                className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 inline-flex items-center gap-2 rounded-full px-4 py-3 sm:px-5 sm:py-3.5 shadow-[0_8px_30px_rgba(212,165,116,0.35)] transition-transform duration-300 hover:scale-105"
                style={{ backgroundColor: ACCENT, color: "#0A0A0A" }}
            >
                <MessageCircle className="size-4 sm:size-5" aria-hidden="true" />
                <span className="hidden xs:inline text-sm font-medium">Chat</span>
            </a>
        </div>
    )
}
