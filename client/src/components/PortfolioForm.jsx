import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from './Footer';
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

  useEffect(() => {
    if (currentPortfolio) {
      setFormData(currentPortfolio);
      setMessage('✏️ Edit Mode: Update your business details');
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
      navigate('/dashboard');

    } catch (error) {
      console.error(error);
      setMessage('❌ Error Saving Data');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setCurrentPortfolio(null);
    setFormData({ studentName: '', businessName: '', description: '', marketSize: '', image: '' });
    navigate('/dashboard');
  };

  return (
    <div className="builder-page">
      <div className="builder-container-wrapper">
        <div className="builder-header">
          <h2 className="builder-title">
            {currentPortfolio ? "✏️ Edit Portfolio" : "🚀 Build Your Entrepreneur Portfolio"}
          </h2>
          {message && (
            <div className={`builder-message ${message.includes('Error') ? 'error' : 'info'}`}>
              {message}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="builder-form">
          <div className="builder-form-group">
            <label className="builder-form-label">
              <span className="label-icon">👨‍💼</span>
              Entrepreneur Name
            </label>
            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              placeholder="e.g. Khairul Aming"
              className="builder-form-input"
              required
            />
          </div>

          <div className="builder-form-group">
            <label className="builder-form-label">
              <span className="label-icon">👥</span>
              Team Members / Co-Founders
            </label>
            <input
              type="text"
              name="teamMembers"
              value={formData.teamMembers}
              onChange={handleChange}
              placeholder="e.g. Ali (CEO), Sarah (Marketing)"
              className="builder-form-input"
            />
          </div>

          <div className="builder-form-group">
            <label className="builder-form-label">
              <span className="label-icon">🏢</span>
              Business / Startup Name
            </label>
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              placeholder="e.g. Rembayung"
              className="builder-form-input"
              required
            />
          </div>

          <div className="builder-form-group">
            <label className="builder-form-label">
              <span className="label-icon">🖼️</span>
              Product Image / Logo
            </label>
            <div className="file-upload-wrapper">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="builder-file-input"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="file-upload-label">
                <span className="upload-icon">📤</span>
                {formData.image ? 'Change Image' : 'Upload Image'}
              </label>
            </div>
            {formData.image && (
              <div className="image-preview-wrapper">
                <img src={formData.image} alt="Preview" className="builder-image-preview" />
              </div>
            )}
          </div>

          <div className="builder-form-group">
            <label className="builder-form-label">
              <span className="label-icon">💡</span>
              Business Description (Pitch)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your business idea, problem you're solving, and your solution..."
              className="builder-form-input builder-form-textarea"
              required
            />
          </div>

          <div className="builder-form-group">
            <label className="builder-form-label">
              <span className="label-icon">📊</span>
              Market Size
            </label>
            <input
              type="text"
              name="marketSize"
              value={formData.marketSize}
              onChange={handleChange}
              placeholder="e.g. 50,000 students in Kedah"
              className="builder-form-input"
            />
          </div>

          <div className="builder-button-group">
            <button
              type="submit"
              className={currentPortfolio ? "builder-btn-update" : "builder-btn-save"}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="btn-spinner"></span>
                  {currentPortfolio ? "Updating..." : "Creating..."}
                </>
              ) : (
                <>
                  <span className="btn-icon">{currentPortfolio ? "💾" : "✨"}</span>
                  {currentPortfolio ? "Update Portfolio" : "Create Portfolio"}
                </>
              )}
            </button>

            {currentPortfolio && (
              <button type="button" onClick={handleCancel} className="builder-btn-cancel">
                <span className="btn-icon">❌</span>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PortfolioForm;
// FIXED: Updated Portfolio URL to Render