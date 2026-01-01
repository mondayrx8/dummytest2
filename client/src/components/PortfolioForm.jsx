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
    const token = localStorage.getItem('token'); // Get token

    try {
      const config = { headers: { 'auth-token': token } }; // Attach token

      if (currentPortfolio) {
        await axios.put(`http://localhost:5000/api/portfolio/update/${currentPortfolio._id}`, formData, config);
        setCurrentPortfolio(null); 
      } else {
        await axios.post('http://localhost:5000/api/portfolio/add', formData, config);
      }
      
      onSave(); // Refresh the list
      navigate('/dashboard'); // <--- CRITICAL: Go back to list page!
      
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
    <div className="form-container">
      <h2>{currentPortfolio ? "Edit Portfolio" : "Build Your Entrepreneur Portfolio"}</h2>
      {message && <p style={{ color: "green", fontWeight: "bold" }}>{message}</p>}
      
      <form onSubmit={handleSubmit}>
        {/* NEW FIELD: Student Name */}
        <div style={{ marginBottom: "10px" }}>
            <label>Entrepreneur Name:</label><br/>
            <input type="text" name="studentName" value={formData.studentName} onChange={handleChange} placeholder="e.g. Khairul Aming" required />
        </div>

        {/* RENAMED FIELD: Business Name */}
        <div style={{ marginBottom: "10px" }}>
            <label>Business / Startup Name:</label><br/>
            <input type="text" name="businessName" value={formData.businessName} onChange={handleChange} placeholder="e.g. Rembayung" required />
        </div>
        
        <div style={{ marginBottom: "10px" }}>
            <label>Product Image / Logo:</label><br/>
            <input type="file" accept="image/*" onChange={handleFileChange} style={{ border: "none", padding: "10px 0" }} />
            {formData.image && (
              <img src={formData.image} alt="Preview" style={{ width: "100px", height: "100px", objectFit: "cover", marginTop: "10px", borderRadius: "5px" }} />
            )}
        </div>

        {/* NEW FIELD: Description */}
        <div style={{ marginBottom: "10px" }}>
            <label>Business Description (Pitch):</label><br/>
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Describe your business idea..." required />
        </div>

        {/* NEW FIELD: Market Size */}
        <div style={{ marginBottom: "10px" }}>
            <label>Market Size:</label><br/>
            <input type="text" name="marketSize" value={formData.marketSize} onChange={handleChange} placeholder="e.g. 50,000 students in Kedah" />
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