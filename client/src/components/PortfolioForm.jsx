import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PortfolioForm.css';

const PortfolioForm = ({ onSave, currentPortfolio, setCurrentPortfolio }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentName: '',
    teamMembers: '',
    businessName: '',
    description: '',
    marketSize: '',
    image: ''
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (currentPortfolio) {
      setFormData(currentPortfolio);
      setMessage('✏️ Editing Mode Enabled');
    } else {
      setFormData({ studentName: '', teamMembers: '', businessName: '', description: '', marketSize: '', image: '' });
      setMessage('');
    }
  }, [currentPortfolio]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result });
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    setLoading(true);

    try {
      const config = { headers: { 'auth-token': token } };

      if (currentPortfolio) {
        await axios.put(`https://dummytest2.onrender.com/api/portfolio/update/${currentPortfolio._id}`, formData, config);
        setCurrentPortfolio(null);
      } else {
        await axios.post('https://dummytest2.onrender.com/api/portfolio/add', formData, config);
      }

      onSave();
      setShowToast(true);
      setTimeout(() => navigate('/dashboard'), 1500); // Wait for toast

    } catch (error) {
      console.error(error);
      setMessage('❌ Error Saving Data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setCurrentPortfolio(null);
    setFormData({ studentName: '', businessName: '', description: '', marketSize: '', image: '' });
    navigate('/dashboard');
  };

  // Calculate progress for visual bar
  const calculateProgress = () => {
    let filled = 0;
    const fields = ['studentName', 'businessName', 'description', 'marketSize', 'image'];
    fields.forEach(field => {
      if (formData[field] && formData[field].length > 0) filled++;
    });
    return (filled / fields.length) * 100;
  };

  return (
    <div className="builder-page">
      {/* Toast Notification */}
      {showToast && (
        <div className="glass-toast">
          <span className="toast-icon">✅</span>
          Portfolio Saved Successfully!
        </div>
      )}

      {/* Background Blobs (Green Theme) */}
      <div className="builder-bg">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      <div className="builder-container-wrapper">
        <div className="builder-header">
          <h2 className="builder-title">
            {currentPortfolio ? "Edit Portfolio" : "Design Your Venture"}
          </h2>
          <p className="builder-subtitle">
            Craft a compelling pitch to showcase your innovative idea to the world.
          </p>

          {/* Progress Bar */}
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${calculateProgress()}%` }}></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="builder-form glass-panel">
          {message && <div className="status-banner">{message}</div>}

          {/* SECTION 1: BASIC INFO */}
          <section className="form-section">
            <h3 className="section-title">
              <span className="section-icon">1</span> Basic Information
            </h3>
            <div className="form-grid">
              <div className="input-group">
                <label className="floating-label">Entrepreneur Name *</label>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  className="glass-input"
                  placeholder="e.g. Khairul Aming"
                  required
                />
              </div>
              <div className="input-group">
                <label className="floating-label">Business Name *</label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  className="glass-input"
                  placeholder="e.g. Sambal Nyet"
                  required
                />
              </div>
            </div>
            <div className="input-group full-width">
              <label className="floating-label">Team Members (Optional)</label>
              <input
                type="text"
                name="teamMembers"
                value={formData.teamMembers}
                onChange={handleChange}
                className="glass-input"
                placeholder="Co-founders, key partners..."
              />
            </div>
          </section>

          {/* SECTION 2: THE PITCH */}
          <section className="form-section">
            <h3 className="section-title">
              <span className="section-icon">2</span> The Pitch
            </h3>
            <div className="input-group full-width">
              <label className="floating-label">Problem & Solution *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="glass-input glass-textarea"
                placeholder="Describe the problem you are solving and your unique solution..."
                required
              />
            </div>
          </section>

          {/* SECTION 3: MARKET */}
          <section className="form-section">
            <h3 className="section-title">
              <span className="section-icon">3</span> Market Analysis
            </h3>
            <div className="input-group full-width">
              <label className="floating-label">Target Market Size</label>
              <input
                type="text"
                name="marketSize"
                value={formData.marketSize}
                onChange={handleChange}
                className="glass-input"
                placeholder="e.g. 500k University Students in Malaysia"
              />
            </div>
          </section>

          {/* SECTION 4: MEDIA */}
          <section className="form-section">
            <h3 className="section-title">
              <span className="section-icon">4</span> Visuals
            </h3>
            <div className="file-upload-container">
              <label htmlFor="file-upload" className="file-drop-zone">
                <span className="files-icon">📤</span>
                <span className="upload-text">
                  {formData.image ? "Change Image" : "Upload Product Image"}
                </span>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden-file-input"
                />
              </label>
              {formData.image && (
                <div className="preview-container">
                  <img src={formData.image} alt="Preview" className="img-preview" />
                </div>
              )}
            </div>
          </section>

          {/* ACTIONS */}
          <div className="form-actions">
            <button
              type="button"
              onClick={handleCancel}
              className="btn-cancel"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-save"
              disabled={loading}
            >
              {loading ? <span className="spinner"></span> : (currentPortfolio ? "Update Portfolio" : "Save & Publish")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PortfolioForm;