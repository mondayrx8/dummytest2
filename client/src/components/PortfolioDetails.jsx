import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import html2pdf from 'html2pdf.js';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MessageCircle, Smartphone, Camera } from 'lucide-react';
import './PortfolioDetails.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

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
        AOS.init({
            duration: 800,
            once: true,
            offset: 50,
        });
    }, [id]);

    useEffect(() => {
        const triggerDownload = () => handleDownloadPDF();
        window.addEventListener('trigger-pdf-download', triggerDownload);
        return () => window.removeEventListener('trigger-pdf-download', triggerDownload);
    }, [portfolio]);

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

    const handleWhatsApp = () => {
        if (!whatsappNumber) return alert("WhatsApp number not provided.");
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
            <div className="organic-blob blob-1"></div>
            <div className="organic-blob blob-3"></div>

            <div id="pdf-export-area">
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
                    {description && (
                        <div className="summary-section">
                            <p className="summary-text">"{description}"</p>
                        </div>
                    )}

                    {/* SECTION 1: ABOUT US */}
                    <div className="corp-section" data-aos="fade-up">
                        <div className="corp-about-grid">
                            <div className="corp-about-text">
                                <h2 className="corp-heading">About Us</h2>
                                <p className="corp-intro-text">
                                    {landingPage?.introduction || `Welcome to ${businessName}`}
                                </p>
                                <p>
                                    {landingPage?.aboutUs || description}
                                </p>
                                <p>
                                    <strong>Mission & Vision:</strong> {landingPage?.missionVision || "To be the leading brand regionally with global standards."}
                                </p>
                            </div>
                            <div>
                                <img
                                    src={image || "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=1000&q=80"}
                                    alt="About Company"
                                    className="corp-about-img"
                                    crossOrigin="anonymous"
                                />
                            </div>
                        </div>
                    </div>

                    {/* SECTION 2: BUSINESS OVERVIEW */}
                    <div className="corp-section gray-bg" data-aos="fade-up">
                        <h2 className="corp-heading text-center">A Closer Look At Our Business</h2>

                        <div className="corp-cards-grid">
                            {/* Card 1: Products & Services */}
                            <div className="corp-card">
                                <img
                                    src={(shopImages && shopImages.length > 0) ? shopImages[0] : "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80"}
                                    alt="Products"
                                    className="corp-card-img"
                                    crossOrigin="anonymous"
                                />
                                <div className="corp-card-body">
                                    <h3 className="corp-card-title">Key Products & Services</h3>
                                    <p className="corp-card-text">
                                        {landingPage?.keyProductsServices || productOffering?.mainItems}
                                    </p>
                                    {landingPage?.companyService && (
                                        <p className="corp-card-text corp-card-divider">
                                            <strong>Extra Services:</strong> {landingPage.companyService}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Card 2: Target Market */}
                            <div className="corp-card">
                                <img
                                    src={(shopImages && shopImages.length > 1) ? shopImages[1] : "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&w=600&q=80"}
                                    alt="Market"
                                    className="corp-card-img"
                                    crossOrigin="anonymous"
                                />
                                <div className="corp-card-body">
                                    <h3 className="corp-card-title">Target Market</h3>
                                    <p className="corp-card-text">
                                        {landingPage?.targetMarket || customerMarket?.targetCustomers}
                                    </p>
                                    <p className="corp-card-text corp-card-divider">
                                        <strong>Our Goals:</strong> {landingPage?.ourGoals || "Expanding reach and value."}
                                    </p>
                                </div>
                            </div>

                            {/* Card 3: Corporate Overview */}
                            <div className="corp-card">
                                <img
                                    src={(shopImages && shopImages.length > 2) ? shopImages[2] : "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"}
                                    alt="Corporate Overview"
                                    className="corp-card-img"
                                    crossOrigin="anonymous"
                                />
                                <div className="corp-card-body">
                                    <h3 className="corp-card-title">Corporate Overview</h3>
                                    <p className="corp-card-text">
                                        <strong>Founder:</strong> {landingPage?.founder || studentName}
                                    </p>
                                    <p className="corp-card-text">
                                        <strong>Team:</strong> {landingPage?.ourTeam || teamMembers}
                                    </p>
                                    <p className="corp-card-text corp-card-divider">
                                        <strong>Best Achievement:</strong> {landingPage?.bestAchievement || "Consistent growth."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 3: SALES & TRACTION */}
                    <div className="corp-section border-top-divider" data-aos="fade-up">
                        <h2 className="corp-heading text-center">Sales & Traction</h2>

                        <div className="financial-stats-row">
                            <div className="fin-stat-box">
                                <span className="fin-label">Monthly Revenue</span>
                                <span className="fin-value-large">{salesRevenue?.monthlyRevenue || '-'}</span>
                            </div>
                            <div className="fin-stat-box">
                                <span className="fin-label">Payment Methods</span>
                                <span className="fin-value-medium">{salesRevenue?.paymentMethods || '-'}</span>
                            </div>
                        </div>

                        <div className="chart-container">
                            {monthlySalesData && monthlySalesData.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={monthlySalesData} margin={{ top: 15, right: 20, bottom: 5, left: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                                        <Tooltip contentStyle={{ borderRadius: '4px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                                        <Line type="monotone" dataKey="sales" stroke="#ef4444" strokeWidth={3} dot={{ r: 4, fill: '#fff', stroke: '#ef4444' }} activeDot={{ r: 6 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="chart-empty-state">No traction data available yet.</div>
                            )}
                        </div>
                    </div>

                    {/* SECTION 4: FUTURE OUTLOOK & CONTACT */}
                    <div className="corp-section corp-section-dark" data-aos="fade-up">
                        <h2 className="corp-heading text-center">Future Outlook</h2>
                        <p className="text-center" style={{ maxWidth: '800px', margin: '0 auto 40px', fontSize: '1.1rem', color: '#cbd5e1' }}>
                            {landingPage?.futureOutlook || learningGrowth?.futurePlans || "Expanding our horizons and achieving greater heights."}
                        </p>

                        <div className="corp-footer-grid">
                            <div className="corp-footer-item">
                                <h4 className="corp-footer-label">Location / Address</h4>
                                <p className="corp-footer-value">{landingPage?.contactInfo?.address || businessBasics?.location || "Not provided"}</p>
                            </div>
                            <div className="corp-footer-item">
                                <h4 className="corp-footer-label">Email</h4>
                                <p className="corp-footer-value">{landingPage?.contactInfo?.email || "Not provided"}</p>
                            </div>
                            <div className="corp-footer-item">
                                <h4 className="corp-footer-label">Social Media</h4>
                                <p className="corp-footer-value">{landingPage?.contactInfo?.socialMedia || mediaProof?.socialLinks || "Not provided"}</p>
                            </div>
                        </div>
                    </div>

                    {/* Media Presence Links */}
                    {(mediaProof?.socialLinks || (mediaProof?.mediaLinks && mediaProof.mediaLinks.length > 0)) && (
                        <div className="media-presence-card">
                            <h3 className="media-presence-title">
                                <Smartphone size={24} color="var(--organic-primary)" />
                                Media Presence:
                            </h3>
                            <div className="media-links-container">
                                {mediaProof?.socialLinks && (
                                    <a href={mediaProof.socialLinks.startsWith('http') ? mediaProof.socialLinks : `https://${mediaProof.socialLinks}`} target="_blank" rel="noreferrer" className="media-link">Main Social Link</a>
                                )}
                                {mediaProof?.mediaLinks && mediaProof.mediaLinks.map((link, idx) => (
                                    <a key={idx} href={link.startsWith('http') ? link : `https://${link}`} target="_blank" rel="noreferrer" className="media-link">Ref Link {idx + 1}</a>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Gallery Section */}
                    {shopImages && shopImages.length > 0 && (
                        <div className="gallery-section">
                            <h3 className="gallery-section-title">
                                <Camera size={24} color="var(--organic-primary)" style={{ verticalAlign: 'middle', marginRight: '8px' }} />
                                Shop & Product Gallery
                            </h3>
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
