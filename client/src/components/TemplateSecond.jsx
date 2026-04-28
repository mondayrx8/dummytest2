import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import {
    ArrowRight,
    Mail,
    MapPin,
    Phone,
    Globe,
    AtSign,
    MessageCircle,
} from "lucide-react"
import {
    FaInstagram,
    FaFacebook,
    FaTwitter,
    FaTiktok,
} from "react-icons/fa6"

// ---------- Animation variants ----------
const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
}

const stagger = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.12 },
    },
}

// ---------- Component ----------
export default function TemplateSecond({ portfolio }) {
    const heroRef = useRef(null)
    const { scrollYProgress: heroProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    })
    const heroY = useTransform(heroProgress, [0, 1], ["0%", "30%"])
    const heroScale = useTransform(heroProgress, [0, 1], [1, 1.15])
    const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0])

    const phone = (portfolio && portfolio.contactInfo && portfolio.contactInfo.phone) || ""
    const cleanedPhone = phone.replace(/[^0-9]/g, "")
    const waNumber = cleanedPhone.startsWith("6") ? cleanedPhone : "6" + cleanedPhone
    const waLink = "https://wa.me/" + waNumber

    // Helper for social links
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

    const socials = (portfolio && portfolio.contactInfo && portfolio.contactInfo.socials) || {}
    const products = (portfolio && portfolio.products) || []
    const team = (portfolio && portfolio.ourTeam) || []
    const services = (portfolio && portfolio.ourServices) || []
    const achievements = (portfolio && portfolio.achievements) || []
    const market = (portfolio && portfolio.targetMarket) || {}

    // Duplicate marquee items for seamless loop
    const marqueeItems = products.length > 0 ? [...products, ...products] : []

    return (
        <div className="relative min-h-screen bg-white text-zinc-900 font-sans antialiased overflow-x-hidden selection:bg-[#F97316] selection:text-white">
            {/* ---------- Top Nav ---------- */}
            <header className="fixed top-0 inset-x-0 z-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
                    <div className="flex items-center justify-between rounded-full border border-white/10 bg-black/30 backdrop-blur-md px-4 sm:px-6 py-2.5 sm:py-3">
                        <span className="text-white text-sm sm:text-base font-semibold tracking-tight truncate max-w-[55%]">
                            {(portfolio && portfolio.businessName) || "Brand"}
                        </span>
                        <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-white text-zinc-900 px-3.5 sm:px-4 py-2 sm:py-2 text-xs sm:text-sm font-medium min-h-[44px] hover:bg-[#F97316] hover:text-white transition-colors duration-300"
                        >
                            <MessageCircle className="size-3.5 sm:size-4" aria-hidden="true" />
                            <span className="hidden sm:inline">WhatsApp</span>
                            <ArrowRight className="size-3.5 sm:size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </a>
                    </div>
                </div>
            </header>

            {/* ---------- Hero ---------- */}
            <section ref={heroRef} className="relative h-[100svh] min-h-[600px] w-full overflow-hidden bg-zinc-950">
                {/* Parallax background */}
                <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0 will-change-transform">
                    {portfolio && portfolio.banner ? (
                        <img
                            src={portfolio.banner || "/placeholder.svg"}
                            alt={(portfolio.businessName || "Business") + " banner"}
                            className="size-full object-cover"
                        />
                    ) : (
                        <div className="size-full bg-gradient-to-br from-zinc-900 to-black" />
                    )}
                </motion.div>

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.55)_100%)]" />

                {/* Content */}
                <motion.div
                    style={{ opacity: heroOpacity }}
                    className="relative z-10 flex h-full flex-col items-start justify-end pb-16 sm:pb-20 md:pb-28 px-4 sm:px-6 lg:px-8"
                >
                    <div className="mx-auto w-full max-w-7xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-3 py-1 text-xs sm:text-sm text-white/80"
                        >
                            <span className="size-1.5 rounded-full bg-[#F97316] animate-pulse" />
                            {(portfolio && portfolio.businessName) || "Welcome"}
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className="mt-5 sm:mt-6 max-w-5xl text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold tracking-tight text-white text-balance leading-[1.08]"
                        >
                            {(portfolio && portfolio.slogan) || "Crafted with intention. Built to last."}
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.55 }}
                            className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
                        >
                            <a
                                href={waLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#F97316] px-6 sm:px-7 py-3.5 sm:py-4 text-sm sm:text-base font-medium text-white min-h-[48px] hover:bg-[#EA580C] transition-colors duration-300"
                            >
                                Get in touch
                                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </a>
                            <a
                                href="#about"
                                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/5 backdrop-blur-md px-6 sm:px-7 py-3.5 sm:py-4 text-sm sm:text-base font-medium text-white min-h-[48px] hover:bg-white/10 transition-colors duration-300"
                            >
                                Discover our story
                            </a>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Scroll hint */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="absolute bottom-6 right-4 sm:right-8 z-10 hidden sm:flex items-center gap-3 text-white/60 text-xs uppercase tracking-[0.2em]"
                >
                    <span>Scroll</span>
                    <span className="h-px w-12 bg-white/40" />
                </motion.div>
            </section>

            {/* ---------- About Us ---------- */}
            {portfolio && portfolio.aboutUs && (
                <section id="about" className="relative py-20 sm:py-28 md:py-36 px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        <motion.div
                            variants={stagger}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-60px" }}
                            className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 lg:gap-20 items-center"
                        >
                            <motion.div variants={fadeUp} className="lg:col-span-5">
                                <div className="text-xs uppercase tracking-[0.25em] text-zinc-500 mb-4 sm:mb-6">
                                    <span className="inline-flex items-center gap-2">
                                        <span className="h-px w-8 bg-[#F97316]" />
                                        01 — About
                                    </span>
                                </div>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 text-balance">
                                    A studio built on{" "}
                                    <span className="italic font-light text-zinc-500">craft, clarity, and conviction.</span>
                                </h2>
                            </motion.div>

                            <motion.div variants={fadeUp} className="lg:col-span-7">
                                <p className="text-base sm:text-lg md:text-xl leading-relaxed text-zinc-600 text-pretty">
                                    {portfolio.aboutUs}
                                </p>
                                <div className="mt-8 sm:mt-10 h-px w-full bg-zinc-200" />
                                <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-zinc-500">
                                    <span className="inline-flex items-center gap-2">
                                        <span className="size-1.5 rounded-full bg-[#F97316]" />
                                        Independently owned
                                    </span>
                                    <span className="inline-flex items-center gap-2">
                                        <span className="size-1.5 rounded-full bg-zinc-300" />
                                        Globally minded
                                    </span>
                                    <span className="inline-flex items-center gap-2">
                                        <span className="size-1.5 rounded-full bg-zinc-300" />
                                        Purpose-driven
                                    </span>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* ---------- Mission / Vision ---------- */}
            {portfolio &&
                portfolio.missionVision &&
                (portfolio.missionVision.mission || portfolio.missionVision.vision) && (
                    <section className="relative py-20 sm:py-28 md:py-36 px-4 sm:px-6 lg:px-8 bg-zinc-50">
                        <div className="mx-auto max-w-7xl">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.7 }}
                                className="max-w-3xl"
                            >
                                <div className="text-xs uppercase tracking-[0.25em] text-zinc-500 mb-4 sm:mb-6">
                                    <span className="inline-flex items-center gap-2">
                                        <span className="h-px w-8 bg-[#F97316]" />
                                        02 — Purpose
                                    </span>
                                </div>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 text-balance">
                                    Why we do what we do.
                                </h2>
                            </motion.div>

                            <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10">
                                {/* Mission */}
                                {portfolio.missionVision.mission && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ duration: 0.7, delay: 0.1 }}
                                        className="lg:col-span-5 group relative rounded-2xl border border-zinc-200 bg-white p-7 sm:p-9 hover:border-zinc-900 transition-colors duration-500"
                                    >
                                        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-zinc-500 mb-5 sm:mb-6">
                                            <span className="size-2 rounded-full bg-[#F97316]" />
                                            Mission
                                        </div>
                                        <p className="text-lg sm:text-xl md:text-2xl leading-relaxed text-zinc-800 text-pretty font-light">
                                            {portfolio.missionVision.mission}
                                        </p>
                                    </motion.div>
                                )}

                                {/* Graphic / Quote block */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.7, delay: 0.2 }}
                                    className="lg:col-span-2 flex"
                                >
                                    <div className="flex-1 rounded-2xl bg-zinc-900 text-white p-6 sm:p-10 flex flex-col justify-center gap-4 min-h-[180px] hover:shadow-lg transition-shadow duration-300">
                                        <div className="text-4xl sm:text-5xl font-serif leading-none text-[#F97316]">&ldquo;</div>
                                        <p className="text-sm sm:text-base leading-relaxed text-zinc-300 text-pretty italic">
                                            Less, but considered. Every line, every stitch, intentional.
                                        </p>

                                    </div>
                                </motion.div>

                                {/* Vision */}
                                {portfolio.missionVision.vision && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ duration: 0.7, delay: 0.3 }}
                                        className="lg:col-span-5 group relative rounded-2xl border border-zinc-200 bg-white p-7 sm:p-9 hover:border-zinc-900 transition-colors duration-500"
                                    >
                                        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-zinc-500 mb-5 sm:mb-6">
                                            <span className="size-2 rounded-full bg-zinc-900" />
                                            Vision
                                        </div>
                                        <p className="text-lg sm:text-xl md:text-2xl leading-relaxed text-zinc-800 text-pretty font-light">
                                            {portfolio.missionVision.vision}
                                        </p>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </section>
                )}

            {/* ---------- Services (alternating narrative) ---------- */}
            {services.length > 0 && (
                <section className="relative py-20 sm:py-28 md:py-36 px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.7 }}
                            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 sm:mb-16"
                        >
                            <div className="max-w-2xl">
                                <div className="text-xs uppercase tracking-[0.25em] text-zinc-500 mb-4 sm:mb-6">
                                    <span className="inline-flex items-center gap-2">
                                        <span className="h-px w-8 bg-[#F97316]" />
                                        03 — Services
                                    </span>
                                </div>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 text-balance">
                                    What we do, distilled.
                                </h2>
                            </div>
                            <p className="text-sm sm:text-base text-zinc-500 max-w-md">
                                Every engagement is shaped by the same principles — sharp thinking, generous craft, measured execution.
                            </p>
                        </motion.div>

                        <div className="border-t border-zinc-200 overflow-hidden">
                            {services.map((s, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-80px" }}
                                    transition={{ duration: 0.6, delay: i * 0.05 }}
                                    className="group grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-zinc-200 hover:bg-zinc-50/60 transition-colors duration-300 -mx-4 sm:-mx-6 px-4 sm:px-6"
                                >
                                    <div className="sm:col-span-1 text-xs sm:text-sm font-mono text-zinc-400 group-hover:text-[#F97316] transition-colors duration-300">
                                        {String(i + 1).padStart(2, "0")}
                                    </div>
                                    <div className="sm:col-span-4">
                                        <h3 className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-zinc-900 text-balance">
                                            {s.serviceName}
                                        </h3>
                                    </div>
                                    <div className="sm:col-span-6 sm:col-start-7">
                                        <p className="text-sm sm:text-base leading-relaxed text-zinc-600 text-pretty">{s.description}</p>
                                    </div>
                                    <div className="hidden sm:flex sm:col-span-1 items-center justify-end">
                                        <ArrowRight className="size-5 text-zinc-300 group-hover:text-[#F97316] group-hover:translate-x-1 transition-all duration-300" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ---------- Team (alternating image/text storytelling) ---------- */}
            {team.length > 0 && (
                <section className="relative py-20 sm:py-28 md:py-36 px-4 sm:px-6 lg:px-8 bg-zinc-950 text-white overflow-hidden">
                    <div className="mx-auto max-w-7xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.7 }}
                            className="max-w-3xl mb-14 sm:mb-20"
                        >
                            <div className="text-xs uppercase tracking-[0.25em] text-zinc-500 mb-4 sm:mb-6">
                                <span className="inline-flex items-center gap-2">
                                    <span className="h-px w-8 bg-[#F97316]" />
                                    04 — The People
                                </span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white text-balance">
                                Behind every detail, a maker.
                            </h2>
                        </motion.div>

                        <div className="space-y-20 sm:space-y-28">
                            {team.map((member, i) => {
                                const reverse = i % 2 === 1
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 40 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-80px" }}
                                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                        className={
                                            "grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center " +
                                            (reverse ? "lg:[&>*:first-child]:order-2" : "")
                                        }
                                    >
                                        <div className="lg:col-span-7">
                                            <div className="relative aspect-[4/5] sm:aspect-[5/6] w-full overflow-hidden rounded-2xl bg-zinc-900">
                                                {member.image ? (
                                                    <motion.img
                                                        src={member.image}
                                                        alt={member.name || "Team member"}
                                                        className="size-full object-cover"
                                                        whileHover={{ scale: 1.04 }}
                                                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                                    />
                                                ) : (
                                                    <div className="size-full bg-gradient-to-br from-zinc-800 to-zinc-950" />
                                                )}
                                                <div className="absolute inset-0 ring-1 ring-inset ring-white/5 rounded-2xl pointer-events-none" />
                                            </div>
                                        </div>

                                        <div className="lg:col-span-5">
                                            <div className="text-xs font-mono text-zinc-500 mb-4">
                                                / {String(i + 1).padStart(2, "0")} / {team.length.toString().padStart(2, "0")}
                                            </div>
                                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white text-balance">
                                                {member.name}
                                            </h3>
                                            <p className="mt-2 text-sm sm:text-base uppercase tracking-[0.2em] text-[#F97316]">
                                                {member.role}
                                            </p>
                                            <div className="mt-5 sm:mt-6 h-px w-12 bg-white/20" />
                                            <p className="mt-5 sm:mt-6 text-base sm:text-lg leading-relaxed text-zinc-300 text-pretty">
                                                {member.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* ---------- Achievements ---------- */}
            {achievements.length > 0 && (
                <section className="relative py-20 sm:py-28 md:py-36 px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.7 }}
                            className="max-w-3xl mb-14 sm:mb-20"
                        >
                            <div className="text-xs uppercase tracking-[0.25em] text-zinc-500 mb-4 sm:mb-6">
                                <span className="inline-flex items-center gap-2">
                                    <span className="h-px w-8 bg-[#F97316]" />
                                    05 — Milestones
                                </span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 text-balance">
                                Moments that shaped us.
                            </h2>
                        </motion.div>

                        <div className="space-y-14 sm:space-y-20">
                            {achievements.map((a, i) => {
                                const reverse = i % 2 === 1;
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 40 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-80px" }}
                                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                        className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center"
                                    >
                                        {/* BAHAGIAN GAMBAR */}
                                        <div className={`lg:col-span-6 ${reverse ? "lg:order-2 lg:col-start-7" : "lg:order-1"}`}>
                                            <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden rounded-2xl bg-zinc-100">
                                                {a.image ? (
                                                    <motion.img
                                                        src={a.image || "/placeholder.svg"}
                                                        alt={a.description || "Achievement"}
                                                        className="w-full h-full object-cover"
                                                        whileHover={{ scale: 1.04 }}
                                                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-zinc-100 to-zinc-200" />
                                                )}
                                            </div>
                                        </div>

                                        {/* BAHAGIAN TEKS */}
                                        <div className={`lg:col-span-5 ${reverse ? "lg:order-1 lg:col-start-1" : "lg:order-2 lg:col-start-8"}`}>
                                            <div className="flex items-baseline gap-3 sm:gap-4 mb-4 sm:mb-6">
                                                <span className="text-5xl sm:text-6xl font-light text-[#F97316] tabular-nums">
                                                    {String(i + 1).padStart(2, "0")}
                                                </span>
                                                <span className="h-px flex-1 bg-zinc-200" />
                                            </div>
                                            <p className="text-lg sm:text-xl md:text-2xl leading-relaxed text-zinc-800 text-pretty font-light">
                                                {a.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* ---------- Target Market ---------- */}
            {(market.tam || market.sam || market.som) && (
                <section className="relative py-20 sm:py-28 md:py-36 px-4 sm:px-6 lg:px-8 bg-zinc-50">
                    <div className="mx-auto max-w-7xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.7 }}
                            className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 mb-12 sm:mb-16"
                        >
                            <div className="lg:col-span-5">
                                <div className="text-xs uppercase tracking-[0.25em] text-zinc-500 mb-4 sm:mb-6">
                                    <span className="inline-flex items-center gap-2">
                                        <span className="h-px w-8 bg-[#F97316]" />
                                        06 — Reach
                                    </span>
                                </div>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 text-balance">
                                    Who we serve.
                                </h2>
                            </div>
                            <p className="lg:col-span-6 lg:col-start-7 text-base sm:text-lg leading-relaxed text-zinc-600 self-end text-pretty">
                                A clear understanding of our audience — from the broad horizon to the immediate ground we hold today.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-200 rounded-2xl overflow-hidden border border-zinc-200">
                            {[
                                { label: "Total Addressable Market", value: market.tam, key: "TAM" },
                                { label: "Serviceable Available Market", value: market.sam, key: "SAM" },
                                { label: "Serviceable Obtainable Market", value: market.som, key: "SOM" },
                            ].map((m, i) =>
                                m.value ? (
                                    <motion.div
                                        key={m.key}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ duration: 0.6, delay: i * 0.1 }}
                                        className="bg-white p-7 sm:p-10 hover:bg-zinc-900 hover:text-white transition-colors duration-500 group"
                                    >
                                        <div className="text-xs font-mono text-[#F97316] mb-3 sm:mb-4">{m.key}</div>
                                        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-3 sm:mb-4 text-balance break-words">
                                            {m.value}
                                        </div>
                                        <div className="h-px w-8 bg-zinc-300 group-hover:bg-[#F97316] transition-colors duration-500 mb-3 sm:mb-4" />
                                        <p className="text-sm sm:text-base text-zinc-500 group-hover:text-zinc-300 transition-colors duration-500">
                                            {m.label}
                                        </p>
                                    </motion.div>
                                ) : null,
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* ---------- Products Marquee ---------- */}
            {marqueeItems.length > 0 && (
                <section className="relative py-20 sm:py-28 md:py-36 overflow-hidden bg-white">
                    <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.7 }}
                            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 sm:mb-16"
                        >
                            <div className="max-w-2xl">
                                <div className="text-xs uppercase tracking-[0.25em] text-zinc-500 mb-4 sm:mb-6">
                                    <span className="inline-flex items-center gap-2">
                                        <span className="h-px w-8 bg-[#F97316]" />
                                        07 — Selected Work
                                    </span>
                                </div>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 text-balance">
                                    A glimpse of the catalogue.
                                </h2>
                            </div>
                            <p className="text-sm sm:text-base text-zinc-500 max-w-md">
                                Hover to pause — every piece is a study in restraint.
                            </p>
                        </motion.div>
                    </div>

                    {/* Edge fade */}
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent z-10" />
                        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-10" />

                        <div className="group flex w-full overflow-hidden">
                            <div className="flex shrink-0 animate-[marquee_40s_linear_infinite] group-hover:[animation-play-state:paused] gap-4 sm:gap-6 pr-4 sm:pr-6">
                                {marqueeItems.map((p, i) => (
                                    <div
                                        key={"m1-" + i}
                                        className="relative h-[260px] sm:h-[340px] md:h-[420px] aspect-[3/4] shrink-0 overflow-hidden rounded-xl bg-zinc-100"
                                    >
                                        {p.image ? (
                                            <img
                                                src={p.image || "/placeholder.svg"}
                                                alt={"Product " + (i + 1)}
                                                className="size-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                                            />
                                        ) : (
                                            <div className="size-full bg-zinc-200" />
                                        )}
                                        <div className="absolute inset-0 ring-1 ring-inset ring-zinc-900/5 rounded-xl pointer-events-none" />
                                    </div>
                                ))}
                            </div>
                            <div
                                aria-hidden="true"
                                className="flex shrink-0 animate-[marquee_40s_linear_infinite] group-hover:[animation-play-state:paused] gap-4 sm:gap-6 pr-4 sm:pr-6"
                            >
                                {marqueeItems.map((p, i) => (
                                    <div
                                        key={"m2-" + i}
                                        className="relative h-[260px] sm:h-[340px] md:h-[420px] aspect-[3/4] shrink-0 overflow-hidden rounded-xl bg-zinc-100"
                                    >
                                        {p.image ? (
                                            <img
                                                src={p.image || "/placeholder.svg"}
                                                alt=""
                                                className="size-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                                            />
                                        ) : (
                                            <div className="size-full bg-zinc-200" />
                                        )}
                                        <div className="absolute inset-0 ring-1 ring-inset ring-zinc-900/5 rounded-xl pointer-events-none" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <style>{`
            @keyframes marquee {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-100%);
              }
            }
          `}</style>
                </section>
            )}

            {/* ---------- CTA / Footer ---------- */}
            <section className="relative bg-zinc-950 text-white overflow-hidden">
                <div className="absolute inset-0 pointer-events-none opacity-40">
                    <div className="absolute -top-40 -left-40 size-[500px] rounded-full bg-[#F97316]/20 blur-[120px]" />
                    <div className="absolute -bottom-40 -right-40 size-[500px] rounded-full bg-[#F97316]/10 blur-[120px]" />
                </div>

                <div className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-28 md:py-36">
                    <div className="mx-auto max-w-7xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="max-w-4xl"
                        >
                            <div className="text-xs uppercase tracking-[0.25em] text-zinc-500 mb-4 sm:mb-6">
                                <span className="inline-flex items-center gap-2">
                                    <span className="h-px w-8 bg-[#F97316]" />
                                    Get in touch
                                </span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight text-white text-balance leading-[1.08]">
                                Let's build something{" "}
                                <span className="italic font-light text-zinc-400">worth keeping.</span>
                            </h2>

                            <div className="mt-10 sm:mt-12">
                                <a
                                    href={waLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-3 sm:gap-4 rounded-full bg-[#F97316] px-6 sm:px-9 py-4 sm:py-5 text-sm sm:text-base md:text-lg font-medium text-white min-h-[52px] hover:bg-[#EA580C] transition-all duration-300 hover:gap-4 sm:hover:gap-5"
                                >
                                    <MessageCircle className="size-5 sm:size-6" aria-hidden="true" />
                                    Message us on WhatsApp
                                    <ArrowRight className="size-5 sm:size-6 transition-transform duration-300 group-hover:translate-x-1" />
                                </a>
                            </div>
                        </motion.div>

                        <div className="mt-20 sm:mt-28 grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-12">
                            {/* Contact column */}
                            <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                                {phone && (
                                    <ContactItem
                                        icon={<Phone className="size-4" aria-hidden="true" />}
                                        label="Phone"
                                        value={phone}
                                        href={"tel:" + cleanedPhone}
                                    />
                                )}
                                {portfolio && portfolio.contactInfo && portfolio.contactInfo.email && (
                                    <ContactItem
                                        icon={<Mail className="size-4" aria-hidden="true" />}
                                        label="Email"
                                        value={portfolio.contactInfo.email}
                                        href={"mailto:" + portfolio.contactInfo.email}
                                    />
                                )}
                                {portfolio && portfolio.contactInfo && portfolio.contactInfo.address && (
                                    <ContactItem
                                        icon={<MapPin className="size-4" aria-hidden="true" />}
                                        label="Address"
                                        value={portfolio.contactInfo.address}
                                    />
                                )}
                                {portfolio && portfolio.contactInfo && portfolio.contactInfo.website && (
                                    <ContactItem
                                        icon={<Globe className="size-4" aria-hidden="true" />}
                                        label="Website"
                                        value={portfolio.contactInfo.website}
                                        href={
                                            portfolio.contactInfo.website.startsWith("http")
                                                ? portfolio.contactInfo.website
                                                : "https://" + portfolio.contactInfo.website
                                        }
                                    />
                                )}
                            </div>

                            {/* Socials column */}
                            <div className="md:col-span-5 md:col-start-8">
                                <div className="text-xs uppercase tracking-[0.25em] text-zinc-500 mb-5">Follow</div>
                                <div className="flex flex-wrap gap-2 sm:gap-3">
                                    {socials.instagram && (
                                        <SocialPill
                                            href={getFullSocialLink("instagram", socials.instagram)}
                                            icon={<FaInstagram className="size-4" aria-hidden="true" />}
                                            label="Instagram"
                                        />
                                    )}
                                    {socials.tiktok && (
                                        <SocialPill
                                            href={getFullSocialLink("tiktok", socials.tiktok)}
                                            icon={<FaTiktok className="size-4" aria-hidden="true" />}
                                            label="TikTok"
                                        />
                                    )}
                                    {socials.facebook && (
                                        <SocialPill
                                            href={getFullSocialLink("facebook", socials.facebook)}
                                            icon={<FaFacebook className="size-4" aria-hidden="true" />}
                                            label="Facebook"
                                        />
                                    )}
                                    {socials.twitter && (
                                        <SocialPill
                                            href={getFullSocialLink("twitter", socials.twitter)}
                                            icon={<FaTwitter className="size-4" aria-hidden="true" />}
                                            label="Twitter"
                                        />
                                    )}
                                    {socials.threads && (
                                        <SocialPill
                                            href={getFullSocialLink("threads", socials.threads)}
                                            icon={<AtSign className="size-4" aria-hidden="true" />}
                                            label="Threads"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-16 sm:mt-20 pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs sm:text-sm text-zinc-500">
                            <span>
                                © {new Date().getFullYear()} {(portfolio && portfolio.businessName) || "Brand"}. All rights reserved.
                            </span>
                            <span className="font-mono">Crafted with care.</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Floating WhatsApp button (mobile-first reachability) */}
            <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="fixed bottom-4 right-4 sm:bottom-7 sm:right-7 z-40 inline-flex items-center justify-center size-14 sm:size-14 rounded-full bg-[#F97316] text-white shadow-lg shadow-[#F97316]/30 hover:bg-[#EA580C] transition-all duration-300 hover:scale-105 active:scale-95"
            >
                <MessageCircle className="size-5 sm:size-6" aria-hidden="true" />
            </a>
        </div>
    )
}

// ---------- Sub components ----------
function ContactItem({ icon, label, value, href }) {
    const content = (
        <>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-500 mb-2 sm:mb-3">
                <span className="text-[#F97316]">{icon}</span>
                {label}
            </div>
            <div className="text-base sm:text-lg text-white break-words leading-snug">{value}</div>
        </>
    )

    if (href) {
        return (
            <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group block"
            >
                {content}
                <span className="mt-3 inline-block h-px w-6 bg-zinc-700 group-hover:w-12 group-hover:bg-[#F97316] transition-all duration-300" />
            </a>
        )
    }
    return (
        <div>
            {content}
            <span className="mt-3 inline-block h-px w-6 bg-zinc-700" />
        </div>
    )
}

function SocialPill({ href, icon, label }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 sm:px-5 py-2.5 sm:py-2.5 text-xs sm:text-sm text-zinc-300 min-h-[44px] hover:border-[#F97316] hover:text-white hover:bg-[#F97316] transition-all duration-300"
        >
            <span className="text-zinc-400 group-hover:text-white transition-colors duration-300">{icon}</span>
            {label}
        </a>
    )
}
