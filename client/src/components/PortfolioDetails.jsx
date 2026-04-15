import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import html2pdf from 'html2pdf.js';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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
                <button onClick={() => navigate(-1)} className="btn-pitch btn-pitch-pdf">Go Back</button>
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
        shopImages
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
            {/* Sticky Action Bar */}
            <div className="sticky-action-bar">
                <button onClick={() => navigate(-1)} className="btn-pitch btn-pitch-back">
                    <span style={{ fontSize: '1.2rem' }}>&larr;</span> Back
                </button>
                <div className="action-buttons">
                    <button onClick={handleDownloadPDF} className="btn-pitch btn-pitch-pdf">
                        📥 Download PDF
                    </button>
                    {whatsappNumber && (
                        <button onClick={handleWhatsApp} className="btn-pitch btn-pitch-whatsapp">
                            💬 Direct Deal (WhatsApp)
                        </button>
                    )}
                </div>
            </div>

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
                    <div className="bento-grid">

                        {/* Card 1: Business Basics & Operations */}
                        <div className="bento-card">
                            <h3 className="card-title"><span className="icon">🏢</span> Operations & Info</h3>
                            <div className="info-group">
                                <span className="info-label">Team / Founders</span>
                                <span className="info-value">{teamMembers || studentName || 'Not Specified'}</span>
                            </div>
                            <div className="info-group">
                                <span className="info-label">Start Date</span>
                                <span className="info-value">{businessBasics?.startDate ? new Date(businessBasics.startDate).toLocaleDateString() : 'Not Specified'}</span>
                            </div>
                            <div className="info-group">
                                <span className="info-label">HQ Location</span>
                                <span className="info-value">{businessBasics?.location || operations?.prepLocation || 'Not Specified'}</span>
                            </div>
                            <div className="info-group">
                                <span className="info-label">Team Size</span>
                                <span className="info-value">{operations?.teamSize || 'Not Specified'}</span>
                            </div>
                        </div>

                        {/* Card 2: Market & Customers */}
                        <div className="bento-card">
                            <h3 className="card-title"><span className="icon">👥</span> Market & Customers</h3>
                            <div className="info-group">
                                <span className="info-label">Overall Market Size</span>
                                <span className="info-value">{marketSize || 'Not Specified'}</span>
                            </div>
                            <div className="info-group">
                                <span className="info-label">Target Audience</span>
                                <span className="info-value">{customerMarket?.targetCustomers || 'Not Specified'}</span>
                            </div>
                            <div className="info-group">
                                <span className="info-label">Traction (Cust. Count)</span>
                                <span className="info-value">{customerMarket?.customerCount || 'Not Specified'}</span>
                            </div>
                            <div className="info-group">
                                <span className="info-label">Acquisition Channels</span>
                                <span className="info-value">{customerMarket?.acquisitionChannels || 'Not Specified'}</span>
                            </div>
                        </div>

                        {/* Card 3: Products & USP */}
                        <div className="bento-card">
                            <h3 className="card-title"><span className="icon">💎</span> Products & USP</h3>
                            <div className="info-group">
                                <span className="info-label">Main Products</span>
                                <span className="info-value">{productOffering?.mainItems || 'Not Specified'}</span>
                            </div>
                            <div className="info-group">
                                <span className="info-label">Price Range</span>
                                <span className="info-value">{productOffering?.priceRange || 'Not Specified'}</span>
                            </div>
                            <div className="info-group">
                                <span className="info-label">Uniqueness</span>
                                <span className="info-value">{productOffering?.uniqueness || 'Not Specified'}</span>
                            </div>
                            <div className="info-group">
                                <span className="info-label">Key Tools / Resources</span>
                                <span className="info-value">{operations?.toolsUsed || 'Not Specified'}</span>
                            </div>
                        </div>

                        {/* Card 4: Financials & Traction (Stands Out) */}
                        <div className="bento-card bento-col-span-2 card-financials">
                            <h3 className="card-title"><span className="icon">📈</span> Sales & Financials</h3>

                            <div className="financial-stats-row">
                                <div className="fin-stat-box">
                                    <span className="fin-label">Estimated Monthly Revenue</span>
                                    <span className="fin-value">{salesRevenue?.monthlyRevenue || '-'}</span>
                                </div>
                                <div className="fin-stat-box">
                                    <span className="fin-label">Operating Times</span>
                                    <span className="fin-value">{salesRevenue?.peakTimes || '-'}</span>
                                </div>
                                <div className="fin-stat-box">
                                    <span className="fin-label">Payment Methods</span>
                                    <span className="fin-value" style={{ fontSize: '1.25rem' }}>{salesRevenue?.paymentMethods || '-'}</span>
                                </div>
                            </div>

                            <div className="chart-container">
                                {monthlySalesData && monthlySalesData.length > 0 ? (
                                    <div style={{ width: '100%', height: '250px' }}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={monthlySalesData} margin={{ top: 15, right: 20, bottom: 5, left: 0 }}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dy={10} />
                                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dx={-10} />
                                                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }} cursor={{ stroke: '#E0E8F2', strokeWidth: 2 }} />
                                                <Line type="monotone" dataKey="sales" stroke="#0B2046" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff', stroke: '#0B2046' }} activeDot={{ r: 7, fill: '#FDB813', stroke: '#fff', strokeWidth: 2 }} />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', color: '#94A3B8' }}>
                                        No traction data available yet.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Card 5: Challenges & Future Plans */}
                        <div className="bento-card">
                            <h3 className="card-title"><span className="icon">🚀</span> Vision & Growth</h3>
                            <div className="info-group">
                                <span className="info-label">Top Challenge</span>
                                <span className="info-value">{challenges?.topChallenge || 'Not Specified'}</span>
                            </div>
                            <div className="info-group">
                                <span className="info-label">Solution</span>
                                <span className="info-value">{challenges?.solution || 'Not Specified'}</span>
                            </div>
                            <div className="info-group">
                                <span className="info-label">Skills Gained</span>
                                <span className="info-value">{learningGrowth?.skillsGained || 'Not Specified'}</span>
                            </div>
                            <div className="info-group">
                                <span className="info-label">Future Expansion</span>
                                <span className="info-value">{learningGrowth?.futurePlans || 'Not Specified'}</span>
                            </div>
                        </div>

                    </div>

                    {/* Media & Proof Links */}
                    {(mediaProof?.socialLinks || (mediaProof?.mediaLinks && mediaProof.mediaLinks.length > 0)) && (
                        <div className="bento-card" style={{ flexDirection: 'row', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                            <h3 className="card-title" style={{ margin: 0, border: 'none', padding: 0 }}><span className="icon">📱</span> Media Presence:</h3>
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
                            <h3 className="gallery-section-title">📸 Shop & Product Gallery</h3>
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
        </div>
    );
};

export default PortfolioDetails;
