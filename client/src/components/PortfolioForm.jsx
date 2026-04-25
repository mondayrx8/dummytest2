import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Sparkles, UploadCloud, PlusCircle, Trash2, Image as ImageIcon } from 'lucide-react';
import './PortfolioForm.css';

const PortfolioForm = ({ onSave, currentPortfolio, setCurrentPortfolio }) => {
  const navigate = useNavigate();

  // ==========================================
  // 1. STATE INITIALIZATION (Struktur Baru 0-9)
  // ==========================================
  const initialFormState = {
    businessName: '', // 0
    slogan: '', // 1
    aboutUs: '', // 2
    missionVision: { mission: '', vision: '', graphicInfo: '' }, // 3
    ourTeam: [], // 4. [{ name, role, image }]
    ourServices: [], // 5. [{ serviceName, description }]
    products: [], // 6. [{ image }]
    targetMarket: { tam: '', sam: '', som: '' }, // 7
    achievements: [], // 8. [{ description, image }]
    contactInfo: { // 9
      phone: '', email: '', address: '', website: '',
      socials: { tiktok: '', instagram: '', twitter: '', facebook: '', threads: '' }
    }
  };

  const [formData, setFormData] = useState(initialFormState);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // ==========================================
  // 2. LIFECYCLE (Edit Mode)
  // ==========================================
  useEffect(() => {
    if (currentPortfolio) {
      setFormData({
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

  // ==========================================
  // 3. EVENT HANDLERS (Perubahan Teks Biasa)
  // ==========================================
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNestedChange = (section, field, value) => {
    setFormData({
      ...formData,
      [section]: { ...formData[section], [field]: value }
    });
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

  // ==========================================
  // 4. EVENT HANDLERS (Dynamic Arrays - Tambah/Buang/Ubah)
  // ==========================================
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

  // ==========================================
  // 5. CLOUDINARY UPLOADER (Pusat Muat Naik)
  // ==========================================
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
        // Untuk array (Team, Achievements)
        handleArrayChange(section, arrayIndex, field, url);
      } else {
        // Untuk object biasa (MissionVision Graphic)
        handleNestedChange(section, field, url);
      }
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Gagal memuat naik gambar.");
    } finally {
      setLoading(false);
    }
  };

  // Khas untuk upload Produk beramai-ramai
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
      alert("Gagal memuat naik galeri produk.");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // 6. AI & SUBMISSION
  // ==========================================
  const handleEnhanceWithAI = async () => {
    if (!formData.slogan) return alert("Sila taip idea asas bisnes anda di ruangan slogan dahulu.");
    try {
      setLoading(true);
      const res = await axios.post('https://api.siswaniaga.my/api/ai/enhance', { text: formData.slogan });
      if (res.data && res.data.slogan) {
        setFormData({ ...formData, slogan: res.data.slogan });
      }
    } catch (error) {
      alert("Gagal memproses AI.");
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

  return (
    <div className="form-page">
      <div className="organic-blob blob-1"></div>
      <div className="organic-blob blob-2"></div>

      {showToast && (
        <div className="toast-notification">
          <span className="toast-icon"><CheckCircle size={24} color="#10B981" /></span>
          <span>Landing Page Tercipta Berjaya!</span>
        </div>
      )}

      <div className="form-wrapper">
        <header className="form-header">
          <h1 className="form-title">{currentPortfolio ? "Kemaskini Landing Page" : "Bina Landing Page Bisnes"}</h1>
          <p className="form-subtitle">Lengkapkan maklumat di bawah untuk hasilkan laman web pitch deck bertaraf antarabangsa.</p>
        </header>

        <form onSubmit={handleSubmit} className="form-container">

          {/* ==========================================
              0 & 1: HERO SECTION
          ========================================== */}
          <section className="form-card">
            <div className="card-header">
              <span className="card-number">1</span>
              <h2 className="card-title">Pengenalan (Hero Section)</h2>
            </div>

            <div className="input-group">
              <label className="input-label">Nama Bisnes / Syarikat *</label>
              <input type="text" name="businessName" value={formData.businessName} onChange={handleChange} className="modern-input" placeholder="Cth: SiswaNiaga Tech" required />
            </div>

            <div className="input-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label className="input-label" style={{ margin: 0 }}>Slogan / Pitch Ringkas</label>
                <button type="button" onClick={handleEnhanceWithAI} disabled={loading} className={`ai-btn ${loading ? 'ai-loading' : ''}`}>
                  {loading ? 'Berfikir...' : <><Sparkles size={16} style={{ marginRight: '4px' }} /> Perbaiki dgn AI</>}
                </button>
              </div>
              <textarea name="slogan" value={formData.slogan} onChange={handleChange} className="modern-textarea" placeholder="Ayat pemikat pelabur..." />
            </div>
          </section>

          {/* ==========================================
              2 & 3: ABOUT US, MISSION & VISION
          ========================================== */}
          <section className="form-card">
            <div className="card-header">
              <span className="card-number">2</span>
              <h2 className="card-title">Identiti Korporat</h2>
            </div>

            <div className="input-group">
              <label className="input-label">Tentang Kami (About Us)</label>
              <textarea name="aboutUs" value={formData.aboutUs} onChange={handleChange} className="modern-textarea" placeholder="Ceritakan sejarah dan kepakaran syarikat..." />
            </div>

            <div className="form-grid mt-4">
              <div className="input-group">
                <label className="input-label">Misi</label>
                <textarea value={formData.missionVision.mission} onChange={(e) => handleNestedChange('missionVision', 'mission', e.target.value)} className="modern-textarea" placeholder="Misi jangka masa pendek..." />
              </div>
              <div className="input-group">
                <label className="input-label">Visi</label>
                <textarea value={formData.missionVision.vision} onChange={(e) => handleNestedChange('missionVision', 'vision', e.target.value)} className="modern-textarea" placeholder="Visi utama syarikat..." />
              </div>
            </div>

            <div className="upload-area mt-4">
              <label className="input-label">Gambar/Infografik (Mission & Vision)</label>
              <input type="file" accept="image/*" onChange={(e) => handleSingleImageUpload(e, 'missionVision', 'graphicInfo')} className="modern-input" />
              {formData.missionVision.graphicInfo && (
                <img src={formData.missionVision.graphicInfo} alt="Misi" style={{ width: '100px', marginTop: '10px', borderRadius: '8px' }} />
              )}
            </div>
          </section>

          {/* ==========================================
              4: OUR TEAM (DYNAMIC)
          ========================================== */}
          <section className="form-card">
            <div className="card-header">
              <span className="card-number">3</span>
              <h2 className="card-title">Ahli Pasukan</h2>
            </div>

            {formData.ourTeam.map((member, index) => (
              <div key={index} style={{ border: '1px solid #e2e8f0', padding: '15px', borderRadius: '8px', marginBottom: '15px', position: 'relative' }}>
                <button type="button" onClick={() => removeArrayItem('ourTeam', index)} style={{ position: 'absolute', top: '10px', right: '10px', color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={20} /></button>

                <div className="form-grid">
                  <div className="input-group">
                    <label className="input-label">Nama</label>
                    <input type="text" value={member.name} onChange={(e) => handleArrayChange('ourTeam', index, 'name', e.target.value)} className="modern-input" placeholder="Cth: Ali Bin Abu" />
                  </div>
                  <div className="input-group">
                    <label className="input-label">Peranan (Role)</label>
                    <input type="text" value={member.role} onChange={(e) => handleArrayChange('ourTeam', index, 'role', e.target.value)} className="modern-input" placeholder="Cth: Pengasas & CEO" />
                  </div>
                </div>

                <div className="input-group mt-2">
                  <label className="input-label">Gambar Profil</label>
                  <input type="file" accept="image/*" onChange={(e) => handleSingleImageUpload(e, 'ourTeam', 'image', index)} className="modern-input" />
                  {member.image && <img src={member.image} alt="Profil" style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', marginTop: '10px' }} />}
                </div>
              </div>
            ))}

            <button type="button" onClick={() => addArrayItem('ourTeam', { name: '', role: '', image: '' })} className="btn-add-dynamic">
              <PlusCircle size={18} style={{ marginRight: '5px' }} /> Tambah Ahli Pasukan
            </button>
          </section>

          {/* ==========================================
              5: OUR SERVICES (DYNAMIC)
          ========================================== */}
          <section className="form-card">
            <div className="card-header">
              <span className="card-number">4</span>
              <h2 className="card-title">Perkhidmatan Utama</h2>
            </div>

            {formData.ourServices.map((service, index) => (
              <div key={index} style={{ border: '1px solid #e2e8f0', padding: '15px', borderRadius: '8px', marginBottom: '15px', position: 'relative' }}>
                <button type="button" onClick={() => removeArrayItem('ourServices', index)} style={{ position: 'absolute', top: '10px', right: '10px', color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={20} /></button>

                <div className="input-group">
                  <label className="input-label">Nama Servis</label>
                  <input type="text" value={service.serviceName} onChange={(e) => handleArrayChange('ourServices', index, 'serviceName', e.target.value)} className="modern-input" placeholder="Cth: Konsultasi IT" />
                </div>
                <div className="input-group mt-2">
                  <label className="input-label">Penerangan Ringkas</label>
                  <textarea value={service.description} onChange={(e) => handleArrayChange('ourServices', index, 'description', e.target.value)} className="modern-textarea" placeholder="Terangkan kelebihan servis ini..." />
                </div>
              </div>
            ))}

            <button type="button" onClick={() => addArrayItem('ourServices', { serviceName: '', description: '' })} className="btn-add-dynamic">
              <PlusCircle size={18} style={{ marginRight: '5px' }} /> Tambah Perkhidmatan
            </button>
          </section>

          {/* ==========================================
              6: PRODUCTS (GALLERY)
          ========================================== */}
          <section className="form-card">
            <div className="card-header">
              <span className="card-number">5</span>
              <h2 className="card-title">Galeri Produk</h2>
            </div>

            <div className="upload-area">
              <label htmlFor="product-upload" className="upload-zone" style={{ minHeight: '80px' }}>
                <div className="upload-icon"><ImageIcon size={32} /></div>
                <span className="upload-text">Klik untuk pilih gambar produk (Boleh pilih banyak)</span>
                <input id="product-upload" type="file" accept="image/*" multiple onChange={handleMultipleProductsUpload} className="upload-input" />
              </label>

              {formData.products.length > 0 && (
                <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', marginTop: '15px', padding: '10px 0' }}>
                  {formData.products.map((prod, idx) => (
                    <div key={idx} style={{ position: 'relative', minWidth: '100px' }}>
                      <img src={prod.image} alt="Produk" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
                      <button type="button" onClick={() => removeArrayItem('products', idx)} style={{ position: 'absolute', top: '-5px', right: '-5px', background: 'red', color: 'white', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer' }}>✕</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* ==========================================
              7: TARGET MARKET
          ========================================== */}
          <section className="form-card">
            <div className="card-header">
              <span className="card-number">6</span>
              <h2 className="card-title">Pasaran Sasaran (Target Market)</h2>
            </div>
            <div className="form-grid">
              <div className="input-group">
                <label className="input-label">TAM (Total Addressable Market)</label>
                <input type="text" value={formData.targetMarket.tam} onChange={(e) => handleNestedChange('targetMarket', 'tam', e.target.value)} className="modern-input" placeholder="Cth: RM 1B (Seluruh Dunia)" />
              </div>
              <div className="input-group">
                <label className="input-label">SAM (Serviceable Available Market)</label>
                <input type="text" value={formData.targetMarket.sam} onChange={(e) => handleNestedChange('targetMarket', 'sam', e.target.value)} className="modern-input" placeholder="Cth: RM 100M (Asia Tenggara)" />
              </div>
              <div className="input-group">
                <label className="input-label">SOM (Serviceable Obtainable Market)</label>
                <input type="text" value={formData.targetMarket.som} onChange={(e) => handleNestedChange('targetMarket', 'som', e.target.value)} className="modern-input" placeholder="Cth: RM 1M (Tahun Pertama)" />
              </div>
            </div>
          </section>

          {/* ==========================================
              8: ACHIEVEMENTS (DYNAMIC)
          ========================================== */}
          <section className="form-card">
            <div className="card-header">
              <span className="card-number">7</span>
              <h2 className="card-title">Pencapaian & Anugerah</h2>
            </div>

            {formData.achievements.map((achieve, index) => (
              <div key={index} style={{ border: '1px solid #e2e8f0', padding: '15px', borderRadius: '8px', marginBottom: '15px', position: 'relative' }}>
                <button type="button" onClick={() => removeArrayItem('achievements', index)} style={{ position: 'absolute', top: '10px', right: '10px', color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={20} /></button>

                <div className="input-group">
                  <label className="input-label">Penerangan Pencapaian</label>
                  <input type="text" value={achieve.description} onChange={(e) => handleArrayChange('achievements', index, 'description', e.target.value)} className="modern-input" placeholder="Cth: Juara Inovasi Kebangsaan 2024" />
                </div>

                <div className="input-group mt-2">
                  <label className="input-label">Gambar Bukti / Sijil</label>
                  <input type="file" accept="image/*" onChange={(e) => handleSingleImageUpload(e, 'achievements', 'image', index)} className="modern-input" />
                  {achieve.image && <img src={achieve.image} alt="Sijil" style={{ height: '80px', borderRadius: '8px', objectFit: 'cover', marginTop: '10px' }} />}
                </div>
              </div>
            ))}

            <button type="button" onClick={() => addArrayItem('achievements', { description: '', image: '' })} className="btn-add-dynamic">
              <PlusCircle size={18} style={{ marginRight: '5px' }} /> Tambah Pencapaian
            </button>
          </section>

          {/* ==========================================
              9: CONTACT INFO & SOCIALS
          ========================================== */}
          <section className="form-card">
            <div className="card-header">
              <span className="card-number">8</span>
              <h2 className="card-title">Hubungi Kami (Contact & Social)</h2>
            </div>

            <div className="form-grid">
              <div className="input-group">
                <label className="input-label">No. Telefon</label>
                <input type="text" value={formData.contactInfo.phone} onChange={(e) => handleNestedChange('contactInfo', 'phone', e.target.value)} className="modern-input" placeholder="Cth: +60123456789" />
              </div>
              <div className="input-group">
                <label className="input-label">Emel Rasmi</label>
                <input type="email" value={formData.contactInfo.email} onChange={(e) => handleNestedChange('contactInfo', 'email', e.target.value)} className="modern-input" placeholder="hello@syarikat.com" />
              </div>
            </div>

            <div className="form-grid mt-4">
              <div className="input-group">
                <label className="input-label">Alamat Premis / HQ</label>
                <textarea value={formData.contactInfo.address} onChange={(e) => handleNestedChange('contactInfo', 'address', e.target.value)} className="modern-textarea" placeholder="No 12, Jalan..." />
              </div>
              <div className="input-group">
                <label className="input-label">Website Rasmi</label>
                <input type="text" value={formData.contactInfo.website} onChange={(e) => handleNestedChange('contactInfo', 'website', e.target.value)} className="modern-input" placeholder="https://www..." />
              </div>
            </div>

            <h3 className="mt-6 mb-2 font-semibold">Media Sosial (Pilihan)</h3>
            <div className="form-grid">
              {['tiktok', 'instagram', 'twitter', 'facebook', 'threads'].map((platform) => (
                <div className="input-group" key={platform}>
                  <label className="input-label capitalize">{platform}</label>
                  <input type="text" value={formData.contactInfo.socials[platform]} onChange={(e) => handleSocialChange(platform, e.target.value)} className="modern-input" placeholder={`Link atau username @`} />
                </div>
              ))}
            </div>
          </section>

          {/* ==========================================
              ACTIONS
          ========================================== */}
          <div className="form-actions-card">
            <button type="submit" className="btn-save" disabled={loading}>
              {loading ? <span className="spinner"></span> : (currentPortfolio ? "Kemaskini Landing Page" : "Terbitkan Landing Page")}
            </button>
            <button type="button" onClick={() => navigate('/dashboard')} className="btn-cancel">
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PortfolioForm;