import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Sparkles, PlusCircle, Trash2, Image as ImageIcon, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import './PortfolioForm.css';

const STEPS = [
  { id: 0, label: 'Setup', desc: 'Template & basics' },
  { id: 1, label: 'Identity', desc: 'About & team' },
  { id: 2, label: 'Offerings', desc: 'Services & products' },
  { id: 3, label: 'Details', desc: 'Awards & contact' },
];

const PortfolioForm = ({ onSave, currentPortfolio, setCurrentPortfolio }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const initialFormState = {
    category: '', banner: '', template: 'template1',
    businessName: '', slogan: '', aboutUs: '',
    missionVision: { mission: '', vision: '', graphicInfo: '' },
    ourTeam: [], ourServices: [], products: [],
    targetMarket: { tam: '', sam: '', som: '' },
    achievements: [],
    contactInfo: {
      phone: '', email: '', address: '', website: '',
      socials: { tiktok: '', instagram: '', twitter: '', facebook: '', threads: '' }
    }
  };

  const [formData, setFormData] = useState(initialFormState);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (currentPortfolio) {
      setFormData({
        banner: currentPortfolio.banner || '',
        template: currentPortfolio.template || 'template1',
        category: currentPortfolio.category || '',
        businessName: currentPortfolio.businessName || '',
        slogan: currentPortfolio.slogan || '',
        aboutUs: currentPortfolio.aboutUs || '',
        missionVision: currentPortfolio.missionVision || initialFormState.missionVision,
        ourTeam: currentPortfolio.ourTeam || [],
        ourServices: currentPortfolio.ourServices || [],
        products: currentPortfolio.products || [],
        targetMarket: currentPortfolio.targetMarket || initialFormState.targetMarket,
        achievements: currentPortfolio.achievements || [],
        contactInfo: currentPortfolio.contactInfo || initialFormState.contactInfo
      });
      setMessage('✏️ Editing Mode Enabled');
    } else {
      setFormData(initialFormState);
      setMessage('');
    }
    // eslint-disable-next-line
  }, [currentPortfolio]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNestedChange = (section, field, value) => {
    setFormData({ ...formData, [section]: { ...formData[section], [field]: value } });
  };

  const handleSocialChange = (platform, value) => {
    setFormData({
      ...formData,
      contactInfo: {
        ...formData.contactInfo,
        socials: { ...formData.contactInfo.socials, [platform]: value }
      }
    });
  };

  const handleArrayChange = (section, index, field, value) => {
    const newArray = [...formData[section]];
    newArray[index][field] = value;
    setFormData({ ...formData, [section]: newArray });
  };

  const addArrayItem = (section, emptyItem) => {
    setFormData({ ...formData, [section]: [...formData[section], emptyItem] });
  };

  const removeArrayItem = (section, index) => {
    setFormData({ ...formData, [section]: formData[section].filter((_, i) => i !== index) });
  };

  const uploadToCloudinary = async (file) => {
    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    uploadData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      uploadData
    );
    return res.data.secure_url;
  };

  const handleSingleImageUpload = async (e, section, field = null, arrayIndex = null) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    try {
      const url = await uploadToCloudinary(file);
      if (arrayIndex !== null) {
        handleArrayChange(section, arrayIndex, field, url);
      } else if (field !== null) {
        handleNestedChange(section, field, url);
      } else {
        setFormData({ ...formData, [section]: url });
      }
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Failed to upload image.");
    } finally {
      setLoading(false);
    }
  };

  const handleMultipleProductsUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    setLoading(true);
    try {
      const newProducts = [];
      for (const file of files) {
        const url = await uploadToCloudinary(file);
        newProducts.push({ image: url });
      }
      setFormData({ ...formData, products: [...formData.products, ...newProducts] });
    } catch (error) {
      alert("Failed to upload product gallery.");
    } finally {
      setLoading(false);
    }
  };

  const handleEnhanceWithAI = async () => {
    if (!formData.aboutUs) return alert("Please enter your basic business idea in the about us section first.");
    try {
      setLoading(true);
      const res = await axios.post('https://api.siswaniaga.my/api/ai/enhance', { text: formData.aboutUs });
      if (res.data && res.data.slogan) {
        setFormData({ ...formData, aboutUs: res.data.slogan });
      }
    } catch (error) {
      alert("Failed to process AI.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    setLoading(true);
    try {
      const config = { headers: { 'auth-token': token } };
      if (currentPortfolio) {
        await axios.put(`https://api.siswaniaga.my/api/portfolio/update/${currentPortfolio._id}`, formData, config);
        setCurrentPortfolio(null);
      } else {
        await axios.post('https://api.siswaniaga.my/api/portfolio/add', formData, config);
      }
      onSave();
      setShowToast(true);
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (error) {
      console.error(error);
      setMessage('❌ Error Saving Data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const goNext = () => { if (currentStep < 3) setCurrentStep(currentStep + 1); };
  const goPrev = () => { if (currentStep > 0) setCurrentStep(currentStep - 1); };

  const progressPercent = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <main className="form-page" aria-label="Portfolio Builder">
      {showToast && (
        <div className="toast-notification" role="alert" aria-live="polite">
          <span className="toast-icon" aria-hidden="true"><CheckCircle size={18} /></span>
          <span>Portfolio {currentPortfolio ? 'Updated' : 'Created'} Successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="form-wizard">
        {/* Sidebar — Desktop */}
        <aside className="wizard-sidebar">
          <div className="wizard-sidebar__title">Steps</div>
          <ol className="wizard-steps">
            {STEPS.map((step) => (
              <li key={step.id}>
                <button
                  type="button"
                  className={`wizard-step ${currentStep === step.id ? 'wizard-step--active' : ''} ${currentStep > step.id ? 'wizard-step--completed' : ''}`}
                  onClick={() => setCurrentStep(step.id)}
                  disabled={!currentPortfolio && currentStep < step.id}
                >
                  <span className="wizard-step__number">
                    {currentStep > step.id ? <Check size={14} /> : step.id + 1}
                  </span>
                  <span className="wizard-step__label">{step.label}</span>
                </button>
              </li>
            ))}
          </ol>
        </aside>

        {/* Main */}
        <div className="wizard-main">
          {/* Mobile Progress */}
          <div className="wizard-progress-mobile">
            <div className="wizard-progress-bar">
              <div className="wizard-progress-track">
                <div className="wizard-progress-fill" style={{ width: `${progressPercent}%` }} />
              </div>
              <span className="wizard-progress-label">{currentStep + 1}/{STEPS.length}</span>
            </div>
            <h1 className="wizard-step-title-mobile">{STEPS[currentStep].label}</h1>
          </div>

          {/* Desktop Header */}
          <div className="wizard-header">
            <h1 className="wizard-title">{currentPortfolio ? "Edit Portfolio" : "Create Business Portfolio"}</h1>
            <p className="wizard-subtitle">Complete the information below to build your pitch deck website.</p>
          </div>

          {/* ====== STEP 0: Setup ====== */}
          <div className={`wizard-step-panel ${currentStep === 0 ? 'wizard-step-panel--active' : ''}`}>
            <section className="form-card">
              <div className="card-header">
                <span className="card-number">1</span>
                <h2 className="card-title">Template & Category</h2>
              </div>
              <div className="input-group">
                <label className="input-label">Choose Template Design</label>
                <select name="template" value={formData.template} onChange={handleChange} className="modern-select">
                  <option value="template1">Template 1 (Classic)</option>
                  <option value="template2">Template 2 (Professional)</option>
                  <option value="template3">Template 3 (Dark Luxe)</option>
                  <option value="template4">Template 4 (Maison de Saveur - F&B)</option>
                  <option value="template5">Template 5 (NEXUS - Cybernetic Tech)</option>
                </select>
              </div>
              <div className="input-group">
                <label className="input-label">Business Category <span style={{ color: 'var(--fp-destructive)' }}>*</span></label>
                <select className="modern-select" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required>
                  <option value="" disabled>Select a category</option>
                  <option value="F&B">F&B (Food & Beverage)</option>
                  <option value="Tech & IT">Tech & IT</option>
                  <option value="Retail/Apparel">Retail/Apparel</option>
                  <option value="Services">Services</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="upload-area">
                <label className="input-label">Upload Background Image</label>
                <input type="file" accept="image/*" onChange={(e) => handleSingleImageUpload(e, 'banner')} className="modern-input" />
                <p className="upload-hint" style={{ marginTop: '0.375rem' }}>This image will be the background of the first section.</p>
                {formData.banner && <img src={formData.banner} alt="Banner" className="banner-preview" />}
              </div>
            </section>

            <section className="form-card">
              <div className="card-header">
                <span className="card-number">2</span>
                <h2 className="card-title">Introduction (Hero Section)</h2>
              </div>
              <div className="input-group">
                <label className="input-label">Company Name *</label>
                <input type="text" name="businessName" value={formData.businessName} onChange={handleChange} className="modern-input" placeholder="Ex: SiswaNiaga Tech" required />
              </div>
              <div className="input-group">
                <label className="input-label">Slogan / Short Pitch</label>
                <textarea name="slogan" value={formData.slogan} onChange={handleChange} className="modern-textarea" placeholder="Investor pitch..." />
              </div>
            </section>
          </div>

          {/* ====== STEP 1: Identity ====== */}
          <div className={`wizard-step-panel ${currentStep === 1 ? 'wizard-step-panel--active' : ''}`}>
            <section className="form-card">
              <div className="card-header">
                <span className="card-number">3</span>
                <h2 className="card-title">Corporate Identity</h2>
              </div>
              <div className="input-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label className="input-label">About Us</label>
                  <button type="button" onClick={handleEnhanceWithAI} disabled={loading} className={`ai-btn ${loading ? 'ai-loading' : ''}`}>
                    {loading ? 'Thinking...' : <><Sparkles size={14} /> Improve with AI</>}
                  </button>
                </div>
                <textarea name="aboutUs" value={formData.aboutUs} onChange={handleChange} className="modern-textarea" placeholder="Tell us about your company's history and expertise..." />
              </div>
              <div className="form-grid mt-4">
                <div className="input-group">
                  <label className="input-label">Mission</label>
                  <textarea value={formData.missionVision.mission} onChange={(e) => handleNestedChange('missionVision', 'mission', e.target.value)} className="modern-textarea" placeholder="Short-term mission..." />
                </div>
                <div className="input-group">
                  <label className="input-label">Vision</label>
                  <textarea value={formData.missionVision.vision} onChange={(e) => handleNestedChange('missionVision', 'vision', e.target.value)} className="modern-textarea" placeholder="Main vision..." />
                </div>
              </div>
              <div className="upload-area mt-4">
                <label className="input-label">Image/Infographic (Mission & Vision)</label>
                <input type="file" accept="image/*" onChange={(e) => handleSingleImageUpload(e, 'missionVision', 'graphicInfo')} className="modern-input" />
                {formData.missionVision.graphicInfo && <img src={formData.missionVision.graphicInfo} alt="Mission" className="mission-preview" />}
              </div>
            </section>

            <section className="form-card">
              <div className="card-header">
                <span className="card-number">4</span>
                <h2 className="card-title">Our Team</h2>
              </div>
              {formData.ourTeam.map((member, index) => (
                <div key={index} className="dynamic-item">
                  <button type="button" onClick={() => removeArrayItem('ourTeam', index)} className="dynamic-item__remove" aria-label={`Remove team member ${index + 1}`}><Trash2 size={14} /></button>
                  <div className="form-grid">
                    <div className="input-group">
                      <label className="input-label">Name</label>
                      <input type="text" value={member.name} onChange={(e) => handleArrayChange('ourTeam', index, 'name', e.target.value)} className="modern-input" placeholder="Ex: John Doe" />
                    </div>
                    <div className="input-group">
                      <label className="input-label">Role</label>
                      <input type="text" value={member.role} onChange={(e) => handleArrayChange('ourTeam', index, 'role', e.target.value)} className="modern-input" placeholder="Ex: Founder & CEO" />
                    </div>
                  </div>
                  <div className="input-group mt-2">
                    <label className="input-label">Description</label>
                    <textarea value={member.description || ''} onChange={(e) => handleArrayChange('ourTeam', index, 'description', e.target.value)} className="modern-textarea" placeholder="Ex: Expert in digital printing field..." rows="3" />
                  </div>
                  <div className="input-group mt-2">
                    <label className="input-label">Profile Picture</label>
                    <input type="file" accept="image/*" onChange={(e) => handleSingleImageUpload(e, 'ourTeam', 'image', index)} className="modern-input" />
                    {member.image && <img src={member.image} alt="Profile" className="team-avatar-preview" />}
                  </div>
                </div>
              ))}
              <button type="button" onClick={() => addArrayItem('ourTeam', { name: '', role: '', image: '', description: '' })} className="btn-add-dynamic">
                <PlusCircle size={16} style={{ marginRight: '4px' }} /> Add Team Member
              </button>
            </section>
          </div>

          {/* ====== STEP 2: Offerings ====== */}
          <div className={`wizard-step-panel ${currentStep === 2 ? 'wizard-step-panel--active' : ''}`}>
            <section className="form-card">
              <div className="card-header">
                <span className="card-number">5</span>
                <h2 className="card-title">Our Services</h2>
              </div>
              {formData.ourServices.map((service, index) => (
                <div key={index} className="dynamic-item">
                  <button type="button" onClick={() => removeArrayItem('ourServices', index)} className="dynamic-item__remove" aria-label={`Remove service ${index + 1}`}><Trash2 size={14} /></button>
                  <div className="input-group">
                    <label className="input-label">Service Name</label>
                    <input type="text" value={service.serviceName} onChange={(e) => handleArrayChange('ourServices', index, 'serviceName', e.target.value)} className="modern-input" placeholder="Ex: IT Consultation" />
                  </div>
                  <div className="input-group mt-2">
                    <label className="input-label">Short Description</label>
                    <textarea value={service.description} onChange={(e) => handleArrayChange('ourServices', index, 'description', e.target.value)} className="modern-textarea" placeholder="Explain the benefits of this service..." />
                  </div>
                </div>
              ))}
              <button type="button" onClick={() => addArrayItem('ourServices', { serviceName: '', description: '' })} className="btn-add-dynamic">
                <PlusCircle size={16} style={{ marginRight: '4px' }} /> Add Service
              </button>
            </section>

            <section className="form-card">
              <div className="card-header">
                <span className="card-number">6</span>
                <h2 className="card-title">Products Gallery</h2>
              </div>
              <div className="upload-area">
                <label htmlFor="product-upload" className="upload-zone">
                  <div className="upload-icon"><ImageIcon size={28} /></div>
                  <span className="upload-text">Click to choose product images</span>
                  <span className="upload-hint">You can select multiple files</span>
                  <input id="product-upload" type="file" accept="image/*" multiple onChange={handleMultipleProductsUpload} className="upload-input" />
                </label>
                {formData.products.length > 0 && (
                  <div className="product-gallery">
                    {formData.products.map((prod, idx) => (
                      <div key={idx} className="product-thumb">
                        <img src={prod.image} alt={`Product ${idx + 1}`} />
                        <button type="button" onClick={() => removeArrayItem('products', idx)} className="product-thumb__remove" aria-label={`Remove product ${idx + 1}`}>✕</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            <section className="form-card">
              <div className="card-header">
                <span className="card-number">7</span>
                <h2 className="card-title">Target Market</h2>
              </div>
              <div className="form-grid">
                <div className="input-group">
                  <label className="input-label">TAM (Total Addressable Market)</label>
                  <input type="text" value={formData.targetMarket.tam} onChange={(e) => handleNestedChange('targetMarket', 'tam', e.target.value)} className="modern-input" placeholder="Ex: RM 1B (Worldwide)" />
                </div>
                <div className="input-group">
                  <label className="input-label">SAM (Serviceable Available Market)</label>
                  <input type="text" value={formData.targetMarket.sam} onChange={(e) => handleNestedChange('targetMarket', 'sam', e.target.value)} className="modern-input" placeholder="Ex: RM 100M (Southeast Asia)" />
                </div>
                <div className="input-group">
                  <label className="input-label">SOM (Serviceable Obtainable Market)</label>
                  <input type="text" value={formData.targetMarket.som} onChange={(e) => handleNestedChange('targetMarket', 'som', e.target.value)} className="modern-input" placeholder="Ex: RM 1M (First Year)" />
                </div>
              </div>
            </section>
          </div>

          {/* ====== STEP 3: Details ====== */}
          <div className={`wizard-step-panel ${currentStep === 3 ? 'wizard-step-panel--active' : ''}`}>
            <section className="form-card">
              <div className="card-header">
                <span className="card-number">8</span>
                <h2 className="card-title">Achievements & Awards</h2>
              </div>
              {formData.achievements.map((achieve, index) => (
                <div key={index} className="dynamic-item">
                  <button type="button" onClick={() => removeArrayItem('achievements', index)} className="dynamic-item__remove" aria-label={`Remove achievement ${index + 1}`}><Trash2 size={14} /></button>
                  <div className="input-group">
                    <label className="input-label">Achievement Description</label>
                    <input type="text" value={achieve.description} onChange={(e) => handleArrayChange('achievements', index, 'description', e.target.value)} className="modern-input" placeholder="Ex: National Innovation Champion 2024" />
                  </div>
                  <div className="input-group mt-2">
                    <label className="input-label">Evidence / Certificate Image</label>
                    <input type="file" accept="image/*" onChange={(e) => handleSingleImageUpload(e, 'achievements', 'image', index)} className="modern-input" />
                    {achieve.image && <img src={achieve.image} alt="Certificate" className="achievement-preview" />}
                  </div>
                </div>
              ))}
              <button type="button" onClick={() => addArrayItem('achievements', { description: '', image: '' })} className="btn-add-dynamic">
                <PlusCircle size={16} style={{ marginRight: '4px' }} /> Add Achievement
              </button>
            </section>

            <section className="form-card">
              <div className="card-header">
                <span className="card-number">9</span>
                <h2 className="card-title">Contact & Socials</h2>
              </div>
              <div className="form-grid">
                <div className="input-group">
                  <label className="input-label">Phone Number</label>
                  <input type="text" value={formData.contactInfo.phone} onChange={(e) => handleNestedChange('contactInfo', 'phone', e.target.value)} className="modern-input" placeholder="Ex: +60123456789" />
                </div>
                <div className="input-group">
                  <label className="input-label">Official Email</label>
                  <input type="email" value={formData.contactInfo.email} onChange={(e) => handleNestedChange('contactInfo', 'email', e.target.value)} className="modern-input" placeholder="hello@company.com" />
                </div>
              </div>
              <div className="form-grid mt-4">
                <div className="input-group">
                  <label className="input-label">Address</label>
                  <textarea value={formData.contactInfo.address} onChange={(e) => handleNestedChange('contactInfo', 'address', e.target.value)} className="modern-textarea" placeholder="No 12, Jalan..." />
                </div>
                <div className="input-group">
                  <label className="input-label">Official Website</label>
                  <input type="text" value={formData.contactInfo.website} onChange={(e) => handleNestedChange('contactInfo', 'website', e.target.value)} className="modern-input" placeholder="https://www..." />
                </div>
              </div>
              <h3 className="social-section-title">Social Media</h3>
              <div className="form-grid">
                {['tiktok', 'instagram', 'twitter', 'facebook', 'threads'].map((platform) => (
                  <div className="input-group" key={platform}>
                    <label className="input-label social-label">{platform}</label>
                    <input type="text" value={formData.contactInfo.socials[platform]} onChange={(e) => handleSocialChange(platform, e.target.value)} className="modern-input" placeholder={`Link or username @`} />
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </form>

      {/* Floating Action Bar */}
      <div className="wizard-actions">
        <div className="wizard-actions__inner">
          <div className="wizard-actions__left">
            <button type="button" onClick={() => navigate('/dashboard')} className="btn-wizard btn-wizard--cancel">Cancel</button>
          </div>
          <div className="wizard-actions__right">
            {currentStep > 0 && (
              <button type="button" onClick={goPrev} className="btn-wizard">
                <ChevronLeft size={16} /> Back
              </button>
            )}
            {currentStep < 3 ? (
              <button type="button" onClick={goNext} className="btn-wizard btn-wizard--primary">
                Next <ChevronRight size={16} />
              </button>
            ) : (
              <button type="button" onClick={handleSubmit} className="btn-wizard btn-wizard--primary" disabled={loading}>
                {loading ? <span className="spinner" /> : (currentPortfolio ? "Update Portfolio" : "Publish Portfolio")}
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default PortfolioForm;