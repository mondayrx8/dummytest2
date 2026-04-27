import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import InvestorPitchDeck from './InvestorPitchDeck';
import { HeroParallax } from "./ui/hero-parallax.jsx";
import './PortfolioDetails.css';

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
                setError('Fail to load Landing Page details.');
            } finally {
                setLoading(false);
            }
        };

        fetchPortfolio();
    }, [id]);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#F5F2EC', color: '#1A1A1A' }}>
                <p className="animate-pulse text-xl font-semibold" style={{ fontFamily: "'Nunito', sans-serif" }}>Loading Landing Page...</p>
            </div>
        );
    }

    if (error || !portfolio) {
        return (
            <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#F5F2EC', color: '#1A1A1A', height: '100vh', fontFamily: "'Nunito', sans-serif" }}>
                <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: '2rem', fontWeight: 600, marginBottom: '1rem' }}>Error Found!</h2>
                <p style={{ marginBottom: '1.5rem', color: '#6B6B6B' }}>{error}</p>
                <button onClick={() => navigate(-1)} style={{ padding: '12px 28px', backgroundColor: '#1A1A1A', color: 'white', borderRadius: '8px', border: 'none', cursor: 'pointer', fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>Back</button>
            </div>
        );
    }

    // ==========================================
    // ALGORITMA PENGEKSTRAKAN GAMBAR (SOLID LOGIC)
    // ==========================================
    const extractAllImages = () => {
        const images = [];

        // 1. Extract from Products
        if (portfolio.products && portfolio.products.length > 0) {
            portfolio.products.forEach((p, idx) => {
                if (p.image) images.push({ title: `${portfolio.businessName} - Product ${idx + 1}`, url: p.image });
            });
        }
        // 2. Extract from Team
        if (portfolio.ourTeam && portfolio.ourTeam.length > 0) {
            portfolio.ourTeam.forEach(t => {
                if (t.image) images.push({ title: `Team: ${t.name}`, url: t.image });
            });
        }
        // 3. Extract from Achievements
        if (portfolio.achievements && portfolio.achievements.length > 0) {
            portfolio.achievements.forEach((a, idx) => {
                if (a.image) images.push({ title: a.description || `Achievement ${idx + 1}`, url: a.image });
            });
        }
        // 4. Ekstrak dari Misi Visi Infografik
        if (portfolio.missionVision?.graphicInfo) {
            images.push({ title: `${portfolio.businessName} - Vision & Mission`, url: portfolio.missionVision.graphicInfo });
        }

        return images;
    };

    const sourceImages = extractAllImages();
    const parallaxProducts = [];

    // PROPER AUTO-CLONE (Only run if there is at least 1 image from user)
    if (sourceImages.length > 0) {
        for (let i = 0; i < 15; i++) {
            const currentImg = sourceImages[i % sourceImages.length];
            parallaxProducts.push({
                // ADD INDEX # so title is always unique for React Key
                title: `${currentImg.title} #${i + 1}`,
                link: "#",
                thumbnail: currentImg.url,
            });
        }
    }

    // ==========================================
    // MAIN CONTENT (RENDER)
    // ==========================================
    return (
        <div className="w-full relative" style={{ backgroundColor: '#1A1A1A' }}>

            {/* HERO SECTION DYNAMIC */}
            {sourceImages.length > 0 ? (
                // If there are images, call HeroParallax
                <HeroParallax
                    products={parallaxProducts}
                    title={portfolio.businessName || "Company Without Name"}
                    description={portfolio.slogan || "Exploring future business solutions and ideas."}
                />
            ) : (
                // Fallback Kritikal: If the user doesn't upload any image, don't call HeroParallax!
                <div className="relative flex flex-col items-center justify-center h-[50vh] sm:h-[60vh] text-white px-4 sm:px-6 text-center" style={{ backgroundColor: '#1A1A1A' }}>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl" style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '1.5rem', color: '#FFFFFF' }}>{portfolio.businessName}</h1>
                    <p className="text-base sm:text-lg md:text-xl max-w-lg sm:max-w-2xl" style={{ fontFamily: "'Nunito', sans-serif", color: 'rgba(255,255,255,0.6)' }}>{portfolio.slogan}</p>
                </div>
            )}

            {/* MAIN CONTENT - The 0-9 Pitch Deck */}
            <div className={`relative z-10 w-full ${sourceImages.length > 0 ? '-mt-10 sm:-mt-20 md:-mt-40 shadow-2xl' : 'mt-0'}`} style={{ backgroundColor: '#F5F2EC' }}>
                <InvestorPitchDeck portfolio={portfolio} />
            </div>

        </div>
    );
};

export default PortfolioDetails;