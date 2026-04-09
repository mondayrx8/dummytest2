import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PortfolioForm.css';

const PortfolioForm = ({ onSave, currentPortfolio, setCurrentPortfolio }) => {
  const navigate = useNavigate();

  const initialFormState = {
    studentName: '',
    teamMembers: '',
    businessName: '',
    description: '',
    marketSize: '',
    image: '',
    businessBasics: { name: '', type: '', startDate: '', location: '' },
    productOffering: { mainItems: '', priceRange: '', uniqueness: '' },
    customerMarket: { targetCustomers: '', customerCount: '', acquisitionChannels: '' },
    operations: { prepLocation: '', teamSize: '', toolsUsed: '' },
    salesRevenue: { monthlyRevenue: '', paymentMethods: '', peakTimes: '' },
    challenges: { topChallenge: '', solution: '' },
    learningGrowth: { skillsGained: '', futurePlans: '' },
    mediaProof: { mediaLinks: '', socialLinks: '' }
  };

  const [formData, setFormData] = useState(initialFormState);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (currentPortfolio) {
      setFormData({
        ...initialFormState,
        ...currentPortfolio,
        businessBasics: { ...initialFormState.businessBasics, ...(currentPortfolio.businessBasics || {}) },
        productOffering: { ...initialFormState.productOffering, ...(currentPortfolio.productOffering || {}) },
        customerMarket: { ...initialFormState.customerMarket, ...(currentPortfolio.customerMarket || {}) },
        operations: { ...initialFormState.operations, ...(currentPortfolio.operations || {}) },
        salesRevenue: { ...initialFormState.salesRevenue, ...(currentPortfolio.salesRevenue || {}) },
        challenges: { ...initialFormState.challenges, ...(currentPortfolio.challenges || {}) },
        learningGrowth: { ...initialFormState.learningGrowth, ...(currentPortfolio.learningGrowth || {}) },
        mediaProof: {
          mediaLinks: currentPortfolio.mediaProof?.mediaLinks ? currentPortfolio.mediaProof.mediaLinks.join('\n') : '',
          socialLinks: currentPortfolio.mediaProof?.socialLinks || ''
        }
      });
      setMessage('✏️ Editing Mode Enabled');
    } else {
      setFormData(initialFormState);
      setMessage('');
    }
    // eslint-disable-next-line
  }, [currentPortfolio]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNestedChange = (section, e) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [e.target.name]: e.target.value
      }
    });
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

      const processedMediaLinks = typeof formData.mediaProof.mediaLinks === 'string'
        ? formData.mediaProof.mediaLinks.split(/[\n,]+/).map(l => l.trim()).filter(l => l)
        : formData.mediaProof.mediaLinks;

      const submitData = {
        ...formData, // Spread top level fields
        // Ensure businessName at top level stays in sync
        businessName: formData.businessName || formData.businessBasics.name,
        mediaProof: {
          ...formData.mediaProof,
          mediaLinks: processedMediaLinks
        }
      };

      if (currentPortfolio) {
        await axios.put(`https://api.siswaniaga.my/api/portfolio/update/${currentPortfolio._id}`, submitData, config);
        setCurrentPortfolio(null);
      } else {
        await axios.post('https://api.siswaniaga.my/api/portfolio/add', submitData, config);
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
    setFormData(initialFormState);
    navigate('/dashboard');
  };

  const calculateProgress = () => {
    let filled = 0;
    const requiredChecks = [
      formData.studentName, formData.businessName, formData.description, formData.marketSize,
      formData.businessBasics.type, formData.productOffering.mainItems, formData.customerMarket.targetCustomers,
      formData.salesRevenue.monthlyRevenue
    ];
    requiredChecks.forEach(field => {
      if (field && field.toString().trim().length > 0) filled++;
    });
    return Math.min(Math.round((filled / requiredChecks.length) * 100), 100);
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

      <div className="form-wrapper">
        <header className="form-header">
          <h1 className="form-title">
            {currentPortfolio ? "Edit Business Pitch" : "Create Business Pitch"}
          </h1>
          <p className="form-subtitle">
            Complete the sections below to build a comprehensive presentation for your startup venture.
          </p>

          <div className="progress-wrapper">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${calculateProgress()}%` }}
              ></div>
            </div>
            <span className="progress-text">{calculateProgress()}% Complete</span>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="form-container">
          {message && (
            <div className={`status-message ${message.includes('❌') ? 'error' : 'info'}`}>
              {message}
            </div>
          )}

          {/* 1. Business Basics */}
          <section className="form-card">
            <div className="card-header">
              <span className="card-number">1</span>
              <h2 className="card-title">Business Basics</h2>
            </div>

            <div className="form-grid">
              <div className="input-group">
                <label className="input-label">Entrepreneur Name *</label>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  className="modern-input"
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
                  className="modern-input"
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
                className="modern-input"
                placeholder="Co-founders, key partners..."
              />
            </div>

            <div className="form-grid mt-4">
              <div className="input-group">
                <label className="input-label">Business Type</label>
                <select
                  name="type"
                  value={formData.businessBasics.type}
                  onChange={(e) => handleNestedChange('businessBasics', e)}
                  className="modern-select"
                >
                  <option value="">Select a category</option>
                  <option value="Food">Food</option>
                  <option value="Beverage">Beverage</option>
                  <option value="Service">Service</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <div className="input-group">
                <label className="input-label">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.businessBasics.startDate}
                  onChange={(e) => handleNestedChange('businessBasics', e)}
                  className="modern-input"
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Operating Location</label>
              <input
                type="text"
                name="location"
                value={formData.businessBasics.location}
                onChange={(e) => handleNestedChange('businessBasics', e)}
                className="modern-input"
                placeholder="Where does the business operate from?"
              />
            </div>
          </section>

          {/* 2. Product or Service Offering */}
          <section className="form-card">
            <div className="card-header">
              <span className="card-number">2</span>
              <h2 className="card-title">Product & Services</h2>
            </div>

            <div className="input-group">
              <label className="input-label">Overview & Problem Solved *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="modern-textarea"
                placeholder="Describe what your business does and the problem you are solving..."
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">Main Items / Services Offered</label>
              <input
                type="text"
                name="mainItems"
                value={formData.productOffering.mainItems}
                onChange={(e) => handleNestedChange('productOffering', e)}
                className="modern-input"
                placeholder="e.g. Nasi Lemak, Iced Coffee, Sneaker Cleaning"
              />
            </div>

            <div className="form-grid">
              <div className="input-group">
                <label className="input-label">Pricing Range</label>
                <input
                  type="text"
                  name="priceRange"
                  value={formData.productOffering.priceRange}
                  onChange={(e) => handleNestedChange('productOffering', e)}
                  className="modern-input"
                  placeholder="e.g. RM 5.00 - RM 15.00"
                />
              </div>

              <div className="input-group">
                <label className="input-label">Uniqueness / USP</label>
                <input
                  type="text"
                  name="uniqueness"
                  value={formData.productOffering.uniqueness}
                  onChange={(e) => handleNestedChange('productOffering', e)}
                  className="modern-input"
                  placeholder="What makes your product special?"
                />
              </div>
            </div>
          </section>

          {/* 3. Customer & Market */}
          <section className="form-card">
            <div className="card-header">
              <span className="card-number">3</span>
              <h2 className="card-title">Customer & Market</h2>
            </div>

            <div className="input-group">
              <label className="input-label">Overall Market Size *</label>
              <input
                type="text"
                name="marketSize"
                value={formData.marketSize}
                onChange={handleChange}
                className="modern-input"
                placeholder="e.g. 500K University Students in Malaysia"
                required
              />
            </div>

            <div className="form-grid">
              <div className="input-group">
                <label className="input-label">Target Customers</label>
                <input
                  type="text"
                  name="targetCustomers"
                  value={formData.customerMarket.targetCustomers}
                  onChange={(e) => handleNestedChange('customerMarket', e)}
                  className="modern-input"
                  placeholder="e.g. Students aged 18-24"
                />
              </div>

              <div className="input-group">
                <label className="input-label">Customer Count (Weekly/Monthly)</label>
                <input
                  type="text"
                  name="customerCount"
                  value={formData.customerMarket.customerCount}
                  onChange={(e) => handleNestedChange('customerMarket', e)}
                  className="modern-input"
                  placeholder="e.g. 150 customers/week"
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Acquisition Channels</label>
              <input
                type="text"
                name="acquisitionChannels"
                value={formData.customerMarket.acquisitionChannels}
                onChange={(e) => handleNestedChange('customerMarket', e)}
                className="modern-input"
                placeholder="How do you get customers? (e.g. TikTok, Words of mouth)"
              />
            </div>
          </section>

          {/* 4. Operations */}
          <section className="form-card">
            <div className="card-header">
              <span className="card-number">4</span>
              <h2 className="card-title">Operations</h2>
            </div>

            <div className="form-grid">
              <div className="input-group">
                <label className="input-label">Prep / Production Location</label>
                <input
                  type="text"
                  name="prepLocation"
                  value={formData.operations.prepLocation}
                  onChange={(e) => handleNestedChange('operations', e)}
                  className="modern-input"
                  placeholder="e.g. Home Kitchen, Rented Studio"
                />
              </div>

              <div className="input-group">
                <label className="input-label">Total Team Size</label>
                <input
                  type="number"
                  name="teamSize"
                  value={formData.operations.teamSize}
                  onChange={(e) => handleNestedChange('operations', e)}
                  className="modern-input"
                  placeholder="Number of staff or helpers"
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Tools & Equipment Used</label>
              <input
                type="text"
                name="toolsUsed"
                value={formData.operations.toolsUsed}
                onChange={(e) => handleNestedChange('operations', e)}
                className="modern-input"
                placeholder="e.g. Oven, Espresso machine, Graphic tablet"
              />
            </div>
          </section>

          {/* 5. Sales & Revenue */}
          <section className="form-card">
            <div className="card-header">
              <span className="card-number">5</span>
              <h2 className="card-title">Sales & Revenue</h2>
            </div>

            <div className="form-grid">
              <div className="input-group">
                <label className="input-label">Monthly Revenue</label>
                <input
                  type="text"
                  name="monthlyRevenue"
                  value={formData.salesRevenue.monthlyRevenue}
                  onChange={(e) => handleNestedChange('salesRevenue', e)}
                  className="modern-input"
                  placeholder="e.g. RM 3,500"
                />
              </div>

              <div className="input-group">
                <label className="input-label">Peak Sales Times</label>
                <input
                  type="text"
                  name="peakTimes"
                  value={formData.salesRevenue.peakTimes}
                  onChange={(e) => handleNestedChange('salesRevenue', e)}
                  className="modern-input"
                  placeholder="e.g. Weekends, 12PM - 2PM"
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Accepted Payment Methods</label>
              <input
                type="text"
                name="paymentMethods"
                value={formData.salesRevenue.paymentMethods}
                onChange={(e) => handleNestedChange('salesRevenue', e)}
                className="modern-input"
                placeholder="e.g. Cash, QR Pay, Online Transfer"
              />
            </div>
          </section>

          {/* 6. Challenges & Solutions */}
          <section className="form-card">
            <div className="card-header">
              <span className="card-number">6</span>
              <h2 className="card-title">Challenges</h2>
            </div>

            <div className="input-group">
              <label className="input-label">Biggest Challenge</label>
              <textarea
                name="topChallenge"
                value={formData.challenges.topChallenge}
                onChange={(e) => handleNestedChange('challenges', e)}
                className="modern-textarea"
                placeholder="What is the hardest part about running this business?"
              />
            </div>

            <div className="input-group">
              <label className="input-label">How are you solving it?</label>
              <textarea
                name="solution"
                value={formData.challenges.solution}
                onChange={(e) => handleNestedChange('challenges', e)}
                className="modern-textarea"
                placeholder="Your solution or adaptation strategy..."
              />
            </div>
          </section>

          {/* 7. Learning & Growth */}
          <section className="form-card">
            <div className="card-header">
              <span className="card-number">7</span>
              <h2 className="card-title">Learning & Growth</h2>
            </div>

            <div className="input-group">
              <label className="input-label">Key Skills Gained</label>
              <input
                type="text"
                name="skillsGained"
                value={formData.learningGrowth.skillsGained}
                onChange={(e) => handleNestedChange('learningGrowth', e)}
                className="modern-input"
                placeholder="e.g. Digital Marketing, Inventory Management"
              />
            </div>

            <div className="input-group">
              <label className="input-label">Future Expansion Plans</label>
              <textarea
                name="futurePlans"
                value={formData.learningGrowth.futurePlans}
                onChange={(e) => handleNestedChange('learningGrowth', e)}
                className="modern-textarea"
                placeholder="Where do you see the business next year?"
              />
            </div>
          </section>

          {/* 8. Media Proof */}
          <section className="form-card">
            <div className="card-header">
              <span className="card-number">8</span>
              <h2 className="card-title">Media & Proof</h2>
            </div>

            <div className="input-group">
              <label className="input-label">Social Media Links (Instagram/TikTok)</label>
              <input
                type="text"
                name="socialLinks"
                value={formData.mediaProof.socialLinks}
                onChange={(e) => handleNestedChange('mediaProof', e)}
                className="modern-input"
                placeholder="e.g. https://instagram.com/mybusiness"
              />
            </div>

            <div className="input-group">
              <label className="input-label">Other Links (Press, Video, Menu)</label>
              <textarea
                name="mediaLinks"
                value={formData.mediaProof.mediaLinks}
                onChange={(e) => handleNestedChange('mediaProof', e)}
                className="modern-textarea"
                placeholder="Separate links by newline or comma..."
              />
            </div>

            <div className="upload-area mt-4">
              <label className="input-label">Main Business Photo *</label>
              <label htmlFor="file-upload" className="upload-zone">
                <div className="upload-icon">📤</div>
                <span className="upload-text">
                  {formData.image ? "Change Image" : "Click to Upload Photo"}
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
          <div className="form-actions-card">
            <button type="submit" className="btn-save" disabled={loading}>
              {loading ? (
                <span className="spinner"></span>
              ) : (
                currentPortfolio ? "Update Business Pitch" : "Simpan / Save Portfolio"
              )}
            </button>
            <button type="button" onClick={handleCancel} className="btn-cancel">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PortfolioForm;