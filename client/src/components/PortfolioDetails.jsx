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
            <div className="portfolio-details-loading">
                <div className="spinner-lg"></div>
                <p>Loading Pitch Deck...</p>
            </div>
        );
    }

    if (error || !portfolio) {
        return (
            <div className="portfolio-details-error">
                <h2>Oops!</h2>
                <p>{error}</p>
                <button onClick={() => navigate(-1)} className="btn-back">Go Back</button>
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

    // --- FUNGSI KLIK WHATSAPP ---
    const handleWhatsApp = () => {
        if (!whatsappNumber) return alert("Nombor WhatsApp tidak disediakan.");
        // Bersihkan nombor (buang +, sengkang, atau ruang kosong)
        const cleanNumber = whatsappNumber.replace(/\D/g, '');
        const text = encodeURIComponent(`Hai ${studentName}, saya seorang pelabur dan berminat dengan profil bisnes ${businessName} anda di SiswaNiaga. Boleh kita berbincang lebih lanjut?`);
        window.open(`https://wa.me/${cleanNumber}?text=${text}`, '_blank');
    };

    const handleDownloadPDF = () => {
        const element = document.getElementById('portfolio-pdf-content');

        const opt = {
            margin: [10, 10, 10, 10],
            filename: `${businessName ? businessName.replace(/\s+/g, '_') : 'Startup'}_Pitch_Deck.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, letterRendering: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().from(element).set(opt).save();
    };

    return (
        <div className="portfolio-details-page">
            <div className="floating-actions">
                <button onClick={() => navigate(-1)} className="btn-back-floating">← Back</button>
                <button onClick={handleDownloadPDF} className="btn-back-floating primary">📥 Download PDF</button>
                {whatsappNumber && (
                    <button onClick={handleWhatsApp} className="btn-back-floating" style={{ backgroundColor: '#25D366', color: 'white', border: 'none' }}>💬 Direct Deal</button>
                )}
            </div>

            <div id="portfolio-pdf-content">
                {/* Banner Section */}
                <div className="portfolio-banner">
                    {image ? (
                        <img src={image} alt={businessName} className="banner-image" />
                    ) : (
                        <div className="banner-placeholder">
                            <h1>{businessName}</h1>
                        </div>
                    )}
                    <div className="banner-overlay">
                        <div className="banner-content">
                            {businessBasics?.type && <span className="business-type-badge">{businessBasics.type}</span>}
                            <h1 className="banner-title">{businessName}</h1>
                            <p className="banner-founder">Founded by {studentName}</p>
                        </div>
                    </div>
                </div>

                <div className="portfolio-content-wrapper">

                    {/* Intro / Executive Summary */}
                    <section className="detail-section intro-section">
                        <h2>Overview</h2>
                        <p className="summary-text">{description}</p>
                    </section>

                    <div className="details-grid">
                        {/* Column 1 */}
                        <div className="grid-col">
                            {/* 1. Business Basics */}
                            <div className="detail-card">
                                <h3 className="card-header"><span className="icon">🏢</span> Business Basics</h3>
                                <ul className="info-list">
                                    <li><strong>Team / Founders:</strong> {teamMembers || studentName}</li>
                                    <li><strong>Location:</strong> {businessBasics?.location || 'Not Specified'}</li>
                                    <li><strong>Start Date:</strong> {businessBasics?.startDate ? new Date(businessBasics.startDate).toLocaleDateString() : 'Not Specified'}</li>
                                    <li><strong>Overall Market Size:</strong> {marketSize}</li>
                                </ul>
                            </div>

                            {/* 2. Product Offering */}
                            <div className="detail-card">
                                <h3 className="card-header"><span className="icon">📦</span> Product & Services</h3>
                                <ul className="info-list">
                                    <li><strong>Main Items:</strong> {productOffering?.mainItems || 'Not Specified'}</li>
                                    <li><strong>Pricing Range:</strong> {productOffering?.priceRange || 'Not Specified'}</li>
                                    <li><strong>Uniqueness (USP):</strong> {productOffering?.uniqueness || 'Not Specified'}</li>
                                </ul>
                            </div>

                            {/* 3. Customer Market */}
                            <div className="detail-card">
                                <h3 className="card-header"><span className="icon">👥</span> Customer & Market</h3>
                                <ul className="info-list">
                                    <li><strong>Target Customers:</strong> {customerMarket?.targetCustomers || 'Not Specified'}</li>
                                    <li><strong>Traction (Weekly/Monthly):</strong> {customerMarket?.customerCount || 'Not Specified'}</li>
                                    <li><strong>Acquisition Channels:</strong> {customerMarket?.acquisitionChannels || 'Not Specified'}</li>
                                </ul>
                            </div>

                            {/* 4. Operations */}
                            <div className="detail-card">
                                <h3 className="card-header"><span className="icon">⚙️</span> Operations</h3>
                                <ul className="info-list">
                                    <li><strong>Prep/HQ Location:</strong> {operations?.prepLocation || 'Not Specified'}</li>
                                    <li><strong>Team Size:</strong> {operations?.teamSize || 'Not Specified'}</li>
                                    <li><strong>Key Tools Used:</strong> {operations?.toolsUsed || 'Not Specified'}</li>
                                </ul>
                            </div>
                        </div>

                        {/* Column 2 */}
                        <div className="grid-col">
                            {/* 5. Sales & Revenue */}
                            <div className="detail-card highlight-card">
                                <h3 className="card-header"><span className="icon">💰</span> Financial Highlights & Traction</h3>

                                {/* --- GRAF TRACTION --- */}
                                {monthlySalesData && monthlySalesData.length > 0 ? (
                                    <div style={{ width: '100%', height: 220, marginTop: '15px', marginBottom: '20px' }}>
                                        <h4 style={{ fontSize: '14px', marginBottom: '10px', color: '#64748b' }}>Monthly Sales Traction (RM)</h4>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={monthlySalesData}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                                <XAxis dataKey="month" fontSize={12} stroke="#64748b" />
                                                <YAxis fontSize={12} stroke="#64748b" />
                                                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                                                <Line type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                ) : (
                                    <p className="text-muted" style={{ fontSize: '13px', fontStyle: 'italic', marginBottom: '15px' }}>No traction data available yet.</p>
                                )}

                                <div className="finance-stats">
                                    <div className="stat">
                                        <span className="stat-label">Estimated Monthly Revenue</span>
                                        <span className="stat-value">{salesRevenue?.monthlyRevenue || '-'}</span>
                                    </div>
                                    <div className="stat">
                                        <span className="stat-label">Peak Times</span>
                                        <span className="stat-value">{salesRevenue?.peakTimes || '-'}</span>
                                    </div>
                                </div>
                                <p className="mt-3"><strong>Payment Methods:</strong> {salesRevenue?.paymentMethods || 'Not Specified'}</p>
                            </div>

                            {/* 6. Challenges */}
                            <div className="detail-card">
                                <h3 className="card-header"><span className="icon">🚧</span> Challenges & Adaptation</h3>
                                <div className="text-block">
                                    <h4>Top Challenge:</h4>
                                    <p>{challenges?.topChallenge || 'Not Specified'}</p>
                                </div>
                                <div className="text-block mt-3">
                                    <h4>Solution Strategy:</h4>
                                    <p>{challenges?.solution || 'Not Specified'}</p>
                                </div>
                            </div>

                            {/* 7. Learning & Growth */}
                            <div className="detail-card">
                                <h3 className="card-header"><span className="icon">🚀</span> Learning & Vision</h3>
                                <div className="text-block">
                                    <h4>Skills Gained:</h4>
                                    <p>{learningGrowth?.skillsGained || 'Not Specified'}</p>
                                </div>
                                <div className="text-block mt-3">
                                    <h4>Future Expansion Plans:</h4>
                                    <p>{learningGrowth?.futurePlans || 'Not Specified'}</p>
                                </div>
                            </div>

                            {/* 8. Media Proof */}
                            <div className="detail-card">
                                <h3 className="card-header"><span className="icon">📱</span> Media & Proof</h3>
                                <ul className="link-list">
                                    {mediaProof?.socialLinks && (
                                        <li><a href={mediaProof.socialLinks.startsWith('http') ? mediaProof.socialLinks : `https://${mediaProof.socialLinks}`} target="_blank" rel="noreferrer" className="social-link">🌍 Main Social Link</a></li>
                                    )}
                                    {mediaProof?.mediaLinks && mediaProof.mediaLinks.map((link, idx) => (
                                        <li key={idx}><a href={link.startsWith('http') ? link : `https://${link}`} target="_blank" rel="noreferrer" className="social-link">🔗 Reference Link {idx + 1}</a></li>
                                    ))}
                                    {!mediaProof?.socialLinks && (!mediaProof?.mediaLinks || mediaProof.mediaLinks.length === 0) && (
                                        <li><p className="text-muted" style={{ margin: 0 }}>No media links provided.</p></li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {/* End PDF Wrapper */}
            {shopImages && shopImages.length > 0 && (
                <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '20px', backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ marginBottom: '20px', color: '#1e293b', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px' }}>📸 Shop & Product Gallery</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                        {shopImages.map((img, idx) => (
                            <img key={idx} src={img} alt={`Shop ${idx + 1}`} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', cursor: 'pointer', transition: 'transform 0.2s' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PortfolioDetails;
