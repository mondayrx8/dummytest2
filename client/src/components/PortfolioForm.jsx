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
      setTimeout(() => navigate('/dashboard'), 1500);

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

  // Calculate progress percentage
  const calculateProgress = () => {
    let filled = 0;
    const fields = ['studentName', 'businessName', 'description', 'marketSize', 'image'];
    fields.forEach(field => {
      if (formData[field] && formData[field].length > 0) filled++;
    });
    return (filled / fields.length) * 100;
  };

  return (
    <div className="form-page">
      {/* Toast Notification */}
      {showToast && (
        <div className="toast-notification">
          <span className="toast-icon">✅</span>
          <span>Portfolio Saved Successfully!</span>
        </div>
      )}

      {/* Background Orbs */}
      <div className="form-bg">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
      </div>

      <div className="form-wrapper">
        {/* Page Header */}
        <header className="form-header">
          <h1 className="form-title">
            {currentPortfolio ? "Edit Your Portfolio" : "Design Your Venture"}
          </h1>
          <p className="form-subtitle">
            Create a compelling pitch to showcase your innovative ideas to investors
          </p>

          {/* Progress Bar */}
          <div className="progress-wrapper">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${calculateProgress()}%` }}
              ></div>
            </div>
            <span className="progress-text">{Math.round(calculateProgress())}% Complete</span>
          </div>
        </header>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="form-container">
          {/* Status Message */}
          {message && (
            <div className={`status-message ${message.includes('❌') ? 'error' : 'info'}`}>
              {message}
            </div>
          )}

          {/* Section 1: Project Identity */}
          <section className="form-section">
            <div className="section-header">
              <span className="section-number">1</span>
              <h2 className="section-title">Project Identity</h2>
            </div>

            <div className="form-grid">
              <div className="input-group">
                <label className="input-label">Entrepreneur Name *</label>
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
                <label className="input-label">Business Name *</label>
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

            <div className="input-group">
              <label className="input-label">Team Members (Optional)</label>
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

          {/* Section 2: The Pitch */}
          <section className="form-section">
            <div className="section-header">
              <span className="section-number">2</span>
              <h2 className="section-title">The Pitch</h2>
            </div>

            <div className="input-group">
              <label className="input-label">Problem & Solution *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="glass-input glass-textarea"
                placeholder="Describe the problem you're solving and your unique solution..."
                required
              />
              <span className="input-hint">
                Tip: Be specific about the pain point and how your solution addresses it.
              </span>
            </div>
          </section>

          {/* Section 3: Market Analysis */}
          <section className="form-section">
            <div className="section-header">
              <span className="section-number">3</span>
              <h2 className="section-title">Market Analysis</h2>
            </div>

            <div className="input-group">
              <label className="input-label">Target Market Size</label>
              <input
                type="text"
                name="marketSize"
                value={formData.marketSize}
                onChange={handleChange}
                className="glass-input"
                placeholder="e.g. 500K University Students in Malaysia"
              />
            </div>
          </section>

          {/* Section 4: Visuals */}
          <section className="form-section">
            <div className="section-header">
              <span className="section-number">4</span>
              <h2 className="section-title">Visuals</h2>
            </div>

            <div className="upload-area">
              <label htmlFor="file-upload" className="upload-zone">
                <div className="upload-icon">📤</div>
                <span className="upload-text">
                  {formData.image ? "Change Image" : "Click to Upload Product Image"}
                </span>
                <span className="upload-hint">PNG, JPG, WebP up to 5MB</span>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="upload-input"
                />
              </label>

              {formData.image && (
                <div className="preview-wrapper">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="preview-image"
                  />
                  <button
                    type="button"
                    className="remove-image"
                    onClick={() => setFormData({ ...formData, image: '' })}
                    aria-label="Remove image"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Form Actions */}
          <div className="form-actions">
            <button
              type="submit"
              className="btn-save"
              disabled={loading}
            >
              {loading ? (
                <span className="spinner"></span>
              ) : (
                currentPortfolio ? "Update Portfolio" : "Save & Publish"
              )}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="btn-cancel"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PortfolioForm;