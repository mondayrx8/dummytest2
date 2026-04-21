import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import html2pdf from 'html2pdf.js';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MessageCircle, Building2, Users, Gem, TrendingUp, Rocket, Smartphone, Camera } from 'lucide-react';
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
                setError('Failed to load portfolio details. It may have been removed or the ID is invalid.');
            } finally {
                setLoading(false);
            }
        };

        fetchPortfolio();
    }, [id]);

    useEffect(() => {
        const triggerDownload = () => handleDownloadPDF();
        window.addEventListener('trigger-pdf-download', triggerDownload);
        return () => window.removeEventListener('trigger-pdf-download', triggerDownload);
    }, [portfolio]); // Ensure it uses the loaded portfolio data

    if (loading) {
        return (
            <div className="pitch-loading">
                <div className="spinner-pulse"></div>
                <p>Loading Pitch Deck...</p>
            </div>
        );
    }

    if (error || !portfolio) {
        return (
            <div className="pitch-error">
                <h2>Oops!</h2>
                <p>{error}</p>
                <button onClick={() => navigate(-1)} className="btn-organic-base btn-organic-secondary">Go Back</button>
            </div>
        );
    }

    const {
        studentName,
        teamMembers,
        businessName,
        description,
        marketSize,
        image,
        businessBasics,
        productOffering,
        customerMarket,
        operations,
        salesRevenue,
        challenges,
        learningGrowth,
        mediaProof,
        whatsappNumber,
        monthlySalesData,
        shopImages,
        landingPage
    } = portfolio;

    // --- WHATSAPP CLICK FUNCTION ---
    const handleWhatsApp = () => {
        if (!whatsappNumber) return alert("WhatsApp number not provided.");
        // Clean number (remove +, dashes, or whitespace)
        const cleanNumber = whatsappNumber.replace(/\D/g, '');
        const text = encodeURIComponent(`Hi ${studentName}, I'm an investor and I'm interested in your business profile ${businessName} on SiswaNiaga. Can we discuss further?`);
        window.open(`https://wa.me/${cleanNumber}?text=${text}`, '_blank');
    };

    const handleDownloadPDF = () => {
        const element = document.getElementById('pdf-export-area');

        const opt = {
            margin: [0, 0, 0, 0],
            filename: `${businessName ? businessName.replace(/\s+/g, '_') : 'Startup'}_Pitch_Deck.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, letterRendering: true, windowWidth: 1200 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().from(element).set(opt).save();
    };

    return (
        <div className="pitch-deck-container">
            {/* Organic Background Blobs */}
            <div className="organic-blob blob-1"></div>
            <div className="organic-blob blob-3"></div>


            <div id="pdf-export-area">
                {/* Hero Section */}
                <div className="hero-banner">
                    {image ? (
                        <img src={image} alt={businessName} className="hero-bg-image" crossOrigin="anonymous" />
                    ) : (
                        <div className="hero-bg-placeholder"></div>
                    )}
                    <div className="hero-content">
                        {businessBasics?.type && <span className="hero-badge">{businessBasics.type}</span>}
                        <h1 className="hero-title">{businessName}</h1>
                        <p className="hero-subtitle">Founded by {studentName}</p>
                    </div>
                </div>

                <div className="deck-content-wrapper">
                    {/* The Summary */}
                    {description && (
                        <div className="summary-section">
                            <p className="summary-text">"{description}"</p>
                        </div>
                    )}

                    {/* The Bento Grid */}

                    {/* 👇 PASTE DI SINI 👇 */}
                    <div className="landing-section">
                        <h2 className="section-heading">Welcome to {businessName}</h2>
                        {landingPage?.introduction && <p className="landing-text lead">{landingPage.introduction}</p>}

                        <div className="landing-grid-2">
                            <div className="landing-box">
                                <h3>About Us</h3>
                                <p>{landingPage?.aboutUs || description}</p>
                            </div>
                            <div className="landing-box">
                                <h3>Mission & Vision</h3>
                                <p>{landingPage?.missionVision || "To be the best in the market."}</p>
                            </div>
                        </div>
                    </div>

                    <div className="landing-section">
                        <h2 className="section-heading">What We Do</h2>
                        <div className="landing-grid-2">
                            <div className="landing-box">
                                <h3>Key Products & Services</h3>
                                <p>{landingPage?.keyProductsServices || productOffering?.mainItems}</p>
                            </div>
                            <div className="landing-box">
                                <h3>Target Market</h3>
                                <p>{landingPage?.targetMarket || customerMarket?.targetCustomers}</p>
                            </div>
                        </div>
                    </div>

                    <div className="landing-section">
                        <h2 className="section-heading">Who We Are</h2>
                        <div className="landing-grid-3">
                            <div className="landing-box">
                                <h3>Founder</h3>
                                <p>{landingPage?.founder || studentName}</p>
                            </div>
                            <div className="landing-box">
                                <h3>Our Team</h3>
                                <p>{landingPage?.ourTeam || teamMembers}</p>
                            </div>
                            <div className="landing-box">
                                <h3>Best Achievement</h3>
                                <p>{landingPage?.bestAchievement || "Still growing and achieving milestones."}</p>
                            </div>
                        </div>
                    </div>

                    <div className="landing-section bg-dark text-white">
                        <h2 className="section-heading">Future Outlook</h2>
                        <p className="landing-text">{landingPage?.futureOutlook || learningGrowth?.futurePlans}</p>
                    </div>
                    {/* 👆 TAMAT PASTE 👆 */}

                    {/* Media & Proof Links */}
                    {(mediaProof?.socialLinks || (mediaProof?.mediaLinks && mediaProof.mediaLinks.length > 0)) && (
                        <div className="bento-card" style={{ flexDirection: 'row', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                            <h3 className="card-title" style={{ margin: 0, border: 'none', padding: 0 }}><span className="icon"><Smartphone size={24} color="var(--organic-primary)" /></span> Media Presence:</h3>
                            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
                                {mediaProof?.socialLinks && (
                                    <a href={mediaProof.socialLinks.startsWith('http') ? mediaProof.socialLinks : `https://${mediaProof.socialLinks}`} target="_blank" rel="noreferrer" style={{ color: '#0B2046', fontWeight: 600, textDecoration: 'underline' }}>Main Social Link</a>
                                )}
                                {mediaProof?.mediaLinks && mediaProof.mediaLinks.map((link, idx) => (
                                    <a key={idx} href={link.startsWith('http') ? link : `https://${link}`} target="_blank" rel="noreferrer" style={{ color: '#0B2046', fontWeight: 600, textDecoration: 'underline' }}>Ref Link {idx + 1}</a>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Gallery Section */}
                    {shopImages && shopImages.length > 0 && (
                        <div className="gallery-section">
                            <h3 className="gallery-section-title"><Camera size={24} color="var(--organic-primary)" style={{ verticalAlign: 'middle', marginRight: '8px' }} /> Shop & Product Gallery</h3>
                            <div className="masonry-grid">
                                {shopImages.map((img, idx) => (
                                    <div key={idx} className="masonry-item">
                                        <img src={img} alt={`Gallery item ${idx + 1}`} loading="lazy" crossOrigin="anonymous" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>

            {/* Floating WhatsApp Button */}
            {whatsappNumber && (
                <button onClick={handleWhatsApp} className="floating-whatsapp-btn" aria-label="Contact via WhatsApp">
                    <MessageCircle size={28} />
                </button>
            )}
        </div>
    );
};

export default PortfolioDetails;
