import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import InvestorPitchDeck from './InvestorPitchDeck';
import { HeroParallax } from "./ui/hero-parallax.jsx";

const PortfolioDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [portfolio, setPortfolio] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                const response = await axios.get(`https://api.siswaniaga.my/api/portfolio/view/${id}`);
                setPortfolio(response.data);
            } catch (err) {
                console.error(err);
                setError('Gagal memuatkan butiran Landing Page.');
            } finally {
                setLoading(false);
            }
        };

        fetchPortfolio();
    }, [id]);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#FAFAF9', color: '#0F172A' }}>
                <p className="animate-pulse text-xl font-semibold">Memuatkan Laman Interaktif...</p>
            </div>
        );
    }

    if (error || !portfolio) {
        return (
            <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#FAFAF9', color: '#0F172A', height: '100vh' }}>
                <h2 className="text-3xl font-bold mb-4">Ralat Ditemui!</h2>
                <p className="mb-6">{error}</p>
                <button onClick={() => navigate(-1)} style={{ padding: '10px 20px', backgroundColor: '#0F172A', color: 'white', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>Kembali</button>
            </div>
        );
    }

    // ==========================================
    // ALGORITMA PENGEKSTRAKAN GAMBAR (SOLID LOGIC)
    // ==========================================
    const extractAllImages = () => {
        const images = [];

        // 1. Ekstrak dari Produk
        if (portfolio.products && portfolio.products.length > 0) {
            portfolio.products.forEach((p, idx) => {
                if (p.image) images.push({ title: `${portfolio.businessName} - Produk ${idx + 1}`, url: p.image });
            });
        }
        // 2. Ekstrak dari Team
        if (portfolio.ourTeam && portfolio.ourTeam.length > 0) {
            portfolio.ourTeam.forEach(t => {
                if (t.image) images.push({ title: `Pasukan: ${t.name}`, url: t.image });
            });
        }
        // 3. Ekstrak dari Pencapaian
        if (portfolio.achievements && portfolio.achievements.length > 0) {
            portfolio.achievements.forEach((a, idx) => {
                if (a.image) images.push({ title: a.description || `Pencapaian ${idx + 1}`, url: a.image });
            });
        }
        // 4. Ekstrak dari Misi Visi Infografik
        if (portfolio.missionVision?.graphicInfo) {
            images.push({ title: `${portfolio.businessName} - Hala Tuju`, url: portfolio.missionVision.graphicInfo });
        }

        return images;
    };

    const sourceImages = extractAllImages();
    const parallaxProducts = [];

    // PROPER AUTO-CLONE (Hanya jalan jika ada sekurang-kurangnya 1 gambar dari user)
    if (sourceImages.length > 0) {
        for (let i = 0; i < 15; i++) {
            const currentImg = sourceImages[i % sourceImages.length];
            parallaxProducts.push({
                // TAMBAH INDEX # supaya title sentiasa unik untuk React Key
                title: `${currentImg.title} #${i + 1}`,
                link: "#",
                thumbnail: currentImg.url,
            });
        }
    }

    // ==========================================
    // PAPARAN UTAMA (RENDER)
    // ==========================================
    return (
        <div className="w-full relative bg-slate-900">

            {/* HERO SECTION DYNAMIC */}
            {sourceImages.length > 0 ? (
                // Kalau ada gambar, panggil HeroParallax
                <HeroParallax
                    products={parallaxProducts}
                    title={portfolio.businessName || "Syarikat Tanpa Nama"}
                    description={portfolio.slogan || "Meneroka penyelesaian dan idea bisnes masa depan."}
                />
            ) : (
                // Fallback Kritikal: Kalau user tak letak GAMBAR LANGSUNG, jangan panggil HeroParallax!
                <div className="relative flex flex-col items-center justify-center h-[60vh] bg-slate-900 text-white px-6 text-center">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">{portfolio.businessName}</h1>
                    <p className="text-xl max-w-2xl text-slate-300">{portfolio.slogan}</p>
                </div>
            )}

            {/* MAIN CONTENT - The 0-9 Pitch Deck */}
            <div className={`relative z-10 w-full ${sourceImages.length > 0 ? '-mt-20 md:-mt-40 rounded-t-[3rem] shadow-2xl' : 'mt-0'} bg-[#FAFAF9]`}>
                <InvestorPitchDeck portfolio={portfolio} />
            </div>

        </div>
    );
};

export default PortfolioDetails;