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
                setError('Failed to load portfolio details.');
            } finally {
                setLoading(false);
            }
        };

        fetchPortfolio();
    }, [id]);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#0A0F1E', color: 'white' }}>
                <p>Loading Ultra-Premium Pitch Deck...</p>
            </div>
        );
    }

    if (error || !portfolio) {
        return (
            <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#0A0F1E', color: 'white', height: '100vh' }}>
                <h2>Oops!</h2>
                <p>{error}</p>
                <button onClick={() => navigate(-1)} style={{ padding: '10px 20px', backgroundColor: '#4F46E5', color: 'white', borderRadius: '5px', border: 'none', cursor: 'pointer', marginTop: '20px' }}>Go Back</button>
            </div>
        );
    }

    // ==========================================
    // LOGIK AUTO-CLONE GAMBAR UNTUK HERO PARALLAX
    // ==========================================

    // 1. Kenal pasti kat mana gambar disimpan (ubah 'images' ikut database kau)
    // Kalau user takde gambar langsung, kita bagi gambar default (placeholder)
    const sourceImages = portfolio.images?.length > 0
        ? portfolio.images
        : [
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000",
            "https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=1000",
            "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000"
        ];

    // 2. Klon gambar sampai cukup 15 ketul untuk Aceternity UI
    const parallaxProducts = Array.from({ length: 15 }).map((_, index) => {
        const imageToUse = sourceImages[index % sourceImages.length];

        return {
            // Ubah 'title' ni ikut nama field database kau (contoh: portfolio.projectName)
            title: portfolio.title || portfolio.name || "Projek SiswaNiaga",
            link: "#",
            // Semak kalau data gambar bentuk URL terus atau objek
            thumbnail: typeof imageToUse === 'string' ? imageToUse : imageToUse.url,
        };
    });

    // ==========================================
    // PAPARAN UTAMA (RENDER)
    // ==========================================

    return (
        <div className="w-full relative bg-[#0A0F1E] dark:bg-black">

            {/* HERO SECTION - Aceternity Parallax */}
            <HeroParallax
                products={parallaxProducts}
                title={portfolio.title || portfolio.name || "Portfolio Projek"}
                description={portfolio.description || portfolio.short_description || "Menyelesaikan masalah dunia sebenar melalui inovasi pelajar."}
            />

            {/* MAIN CONTENT - Pitch Deck asal kau */}
            <div className="relative z-10 -mt-20 md:-mt-40 bg-[#0A0F1E] rounded-t-[3rem] w-full">
                <InvestorPitchDeck portfolio={portfolio} />
            </div>

        </div>
    );
};

export default PortfolioDetails;