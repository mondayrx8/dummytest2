import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PortfolioForm = ({ onSave, currentPortfolio, setCurrentPortfolio }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentName: '',
    businessName: '',
    description: '',
    marketSize: '',
    image: ''
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    if (currentPortfolio) {
      setFormData(currentPortfolio);
      setMessage('✏️ Edit Mode: Update your business details');
    } else {
      setFormData({ studentName: '', businessName: '', description: '', marketSize: '', image: '' });
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

    try {
      const config = { headers: { 'auth-token': token } };

      if (currentPortfolio) {
        await axios.put(`http://localhost:5000/api/portfolio/update/${currentPortfolio._id}`, formData, config);
        setCurrentPortfolio(null);
      } else {
        await axios.post('http://localhost:5000/api/portfolio/add', formData, config);
      }

      onSave();
      navigate('/dashboard');

    } catch (error) {
      console.error(error);
      setMessage('❌ Error Saving Data');
    }
  };

  const handleCancel = () => {
    setCurrentPortfolio(null);
    setFormData({ studentName: '', businessName: '', description: '', marketSize: '', image: '' });
  };

  return (
    <div className="builder-container">
      <h2 className="builder-title">{currentPortfolio ? "Edit Portfolio" : "Build Your Entrepreneur Portfolio"}</h2>
      {message && <p className="info-message">{message}</p>}

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label className="form-label">Entrepreneur Name:</label>
          <input
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            placeholder="e.g. Khairul Aming"
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Business / Startup Name:</label>
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            placeholder="e.g. Rembayung"
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Product Image / Logo:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="form-file-input"
          />
          {formData.image && (
            <img src={formData.image} alt="Preview" className="image-preview" />
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Business Description (Pitch):</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your business idea..."
            className="form-input form-textarea"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Market Size:</label>
          <input
            type="text"
            name="marketSize"
            value={formData.marketSize}
            onChange={handleChange}
            placeholder="e.g. 50,000 students in Kedah"
            className="form-input"
          />
        </div>

        <button type="submit" className={currentPortfolio ? "btn-update" : "btn-save"}>
          {currentPortfolio ? "Update Portfolio" : "Create Portfolio"}
        </button>

        {currentPortfolio && (
          <button type="button" onClick={handleCancel} className="btn-cancel">Cancel</button>
        )}
      </form>
    </div>
  );
};

export default PortfolioForm;