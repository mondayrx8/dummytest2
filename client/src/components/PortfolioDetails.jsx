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

                                {/* 👇 INI COMPANY SERVICE YANG HILANG 👇 */}
                                {landingPage?.companyService && (
                                    <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #eee' }}>
                                        <h4 style={{ color: 'var(--organic-secondary)', marginBottom: '5px', fontSize: '1rem' }}>Company Service</h4>
                                        <p style={{ fontSize: '0.95rem' }}>{landingPage.companyService}</p>
                                    </div>
                                )}
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
                                <h3>Founder Details</h3>
                                <p>{landingPage?.founder || studentName}</p>
                            </div>
                            <div className="landing-box">
                                <h3>Our Team</h3>
                                <p>{landingPage?.ourTeam || teamMembers}</p>
                            </div>
                            {/* 👇 INI OUR GOALS YANG HILANG 👇 */}
                            <div className="landing-box">
                                <h3>Our Goals</h3>
                                <p>{landingPage?.ourGoals || "Striving for excellence."}</p>
                            </div>
                            <div className="landing-box" style={{ gridColumn: '1 / -1' }}>
                                <h3>Best Achievement</h3>
                                <p>{landingPage?.bestAchievement || "Still growing and achieving milestones."}</p>
                            </div>
                        </div>
                    </div>

                    {/* 👇 KEMBALIKAN GRAF JUALAN DI SINI 👇 */}
                    <div className="landing-section" style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '30px', marginTop: '30px', border: '1px solid #eee' }}>
                        <h2 className="section-heading">Sales & Traction</h2>

                        <div className="financial-stats-row" style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                            <div className="fin-stat-box" style={{ flex: 1, padding: '20px', background: '#f8fafc', borderRadius: '8px' }}>
                                <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 'bold' }}>Monthly Revenue</span>
                                <span style={{ display: 'block', fontSize: '1.8rem', color: '#0f172a', fontWeight: '800' }}>{salesRevenue?.monthlyRevenue || '-'}</span>
                            </div>
                            <div className="fin-stat-box" style={{ flex: 1, padding: '20px', background: '#f8fafc', borderRadius: '8px' }}>
                                <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 'bold' }}>Payment Methods</span>
                                <span style={{ display: 'block', fontSize: '1.2rem', color: '#0f172a', fontWeight: '600', marginTop: '10px' }}>{salesRevenue?.paymentMethods || '-'}</span>
                            </div>
                        </div>

                        <div className="chart-container" style={{ height: '300px', width: '100%' }}>
                            {monthlySalesData && monthlySalesData.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={monthlySalesData} margin={{ top: 15, right: 20, bottom: 5, left: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                                        <Line type="monotone" dataKey="sales" stroke="#22c55e" strokeWidth={3} dot={{ r: 4, fill: '#fff', stroke: '#22c55e' }} activeDot={{ r: 6 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            ) : (
                                <div style={{ textAlign: 'center', color: '#94A3B8', padding: '40px 0' }}>No traction data available yet.</div>
                            )}
                        </div>
                    </div>
                    {/* 👆 TAMAT GRAF JUALAN 👆 */}

                    <div className="landing-section bg-dark text-white" style={{ backgroundColor: '#0B2046', color: 'white', borderRadius: '12px', padding: '40px', marginTop: '30px' }}>
                        <h2 className="section-heading" style={{ color: '#ffffff' }}>Future Outlook</h2>
                        <p className="landing-text" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 40px', fontSize: '1.1rem', opacity: 0.9 }}>
                            {landingPage?.futureOutlook || learningGrowth?.futurePlans || "Expanding our horizons and achieving greater heights."}
                        </p>

                        {/* 👇 INI CONTACT INFO (ADDRESS, EMAIL, SOCIAL) YANG HILANG 👇 */}
                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '30px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: '20px' }}>
                            <div style={{ textAlign: 'center', flex: '1', minWidth: '200px' }}>
                                <h4 style={{ color: '#94A3B8', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Location / Address</h4>
                                <p>{landingPage?.contactInfo?.address || businessBasics?.location || "Not provided"}</p>
                            </div>
                            <div style={{ textAlign: 'center', flex: '1', minWidth: '200px' }}>
                                <h4 style={{ color: '#94A3B8', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Email</h4>
                                <p>{landingPage?.contactInfo?.email || "Not provided"}</p>
                            </div>
                            <div style={{ textAlign: 'center', flex: '1', minWidth: '200px' }}>
                                <h4 style={{ color: '#94A3B8', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Social Media</h4>
                                <p>{landingPage?.contactInfo?.socialMedia || mediaProof?.socialLinks || "Not provided"}</p>
                            </div>
                        </div>
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
