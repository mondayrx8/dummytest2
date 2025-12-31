import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PortfolioForm = ({ onSave, currentPortfolio, setCurrentPortfolio }) => {
  const [formData, setFormData] = useState({
    projectTitle: '',
    problemStatement: '',
    solution: '',
    targetMarket: '',
    image: '' // <--- New State for Image
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    if (currentPortfolio) {
      setFormData(currentPortfolio);
      setMessage('✏️ Edit Mode: Make your changes below');
    } else {
      setFormData({ projectTitle: '', problemStatement: '', solution: '', targetMarket: '', image: '' });
      setMessage('');
    }
  }, [currentPortfolio]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- NEW FUNCTION: Handles File Upload ---
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onloadend = () => {
      // The result is the Base64 string
      setFormData({ ...formData, image: reader.result });
    };
    
    if (file) {
      reader.readAsDataURL(file); // This triggers the conversion
    }
  };
  // -----------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentPortfolio) {
        await axios.put(`http://localhost:5000/api/portfolio/update/${currentPortfolio._id}`, formData);
        setMessage('✅ Updated Successfully!');
        setCurrentPortfolio(null); 
      } else {
        await axios.post('http://localhost:5000/api/portfolio/add', formData);
        setMessage('✅ Created Successfully!');
      }
      
      onSave(); 
      setFormData({ projectTitle: '', problemStatement: '', solution: '', targetMarket: '', image: '' }); 
    } catch (error) {
      console.error(error);
      setMessage('❌ Error Saving Data');
    }
  };

  const handleCancel = () => {
      setCurrentPortfolio(null); 
      setFormData({ projectTitle: '', problemStatement: '', solution: '', targetMarket: '', image: '' });
  };

  return (
    <div className="form-container">
      <h2>{currentPortfolio ? "Edit Project" : "Create New Portfolio"}</h2>
      {message && <p style={{ color: "green", fontWeight: "bold" }}>{message}</p>}
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
            <label>Project Title:</label><br/>
            <input type="text" name="projectTitle" value={formData.projectTitle} onChange={handleChange} required />
        </div>
        
        {/* --- NEW: Image Upload Input --- */}
        <div style={{ marginBottom: "10px" }}>
            <label>Project Image:</label><br/>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange} 
              style={{ border: "none", padding: "10px 0" }} 
            />
            {/* Preview the image if one is selected */}
            {formData.image && (
              <img src={formData.image} alt="Preview" style={{ width: "100px", height: "100px", objectFit: "cover", marginTop: "10px", borderRadius: "5px" }} />
            )}
        </div>
        {/* ------------------------------- */}

        <div style={{ marginBottom: "10px" }}>
            <label>Problem:</label><br/>
            <textarea name="problemStatement" value={formData.problemStatement} onChange={handleChange} required />
        </div>
        <div style={{ marginBottom: "10px" }}>
            <label>Solution:</label><br/>
            <textarea name="solution" value={formData.solution} onChange={handleChange} required />
        </div>
        <div style={{ marginBottom: "10px" }}>
            <label>Target Market:</label><br/>
            <input type="text" name="targetMarket" value={formData.targetMarket} onChange={handleChange} />
        </div>
        
        <button type="submit" className={currentPortfolio ? "btn-update" : "btn-save"}>
          {currentPortfolio ? "Update Project" : "Save Portfolio"}
        </button>
        
        {currentPortfolio && (
            <button type="button" onClick={handleCancel} className="btn-cancel">
                Cancel Edit
            </button>
        )}
      </form>
    </div>
  );
};

export default PortfolioForm;