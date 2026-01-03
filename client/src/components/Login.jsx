import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = ({ setToken }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = isRegistering ? '/register' : '/login';

    try {
      const response = await axios.post(`http://localhost:5000/api/auth${endpoint}`, {
        username,
        password
      });

      if (isRegistering) {
        alert("✅ Registration Successful! Please Login.");
        setIsRegistering(false);
        setPassword('');
      } else {
        localStorage.setItem('token', response.data.token);
        setToken(response.data.token);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Third Gradient Blob */}
      <div className="gradient-blob-3"></div>

      <div className="login-content">
        {/* Hero Section */}
        <div className="login-hero-section">
          <div className="hero-icon">🚀</div>
          <h1 className="login-hero-title">Entrepreneur Portfolio</h1>
          <p className="login-hero-subtitle">
            Create, manage, and showcase your entrepreneurial ventures in one beautiful platform
          </p>
        </div>

        {/* Auth Card */}
        <div className="login-auth-card">
          <h2 className="login-auth-title">
            {isRegistering ? "Create Your Account" : "Welcome Back"}
          </h2>

          {error && (
            <div className="login-error-message">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-auth-form">
            <div className="login-form-group">
              <label className="login-form-label">
                <span className="label-icon">👤</span>
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="login-form-input"
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="login-form-group">
              <label className="login-form-label">
                <span className="label-icon">🔒</span>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-form-input"
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit" className="login-btn-primary" disabled={loading}>
              {loading ? (
                <>
                  <span className="btn-spinner"></span>
                  {isRegistering ? "Registering..." : "Logging in..."}
                </>
              ) : (
                <>
                  {isRegistering ? "Create Account" : "Sign In"}
                </>
              )}
            </button>
          </form>

          <p className="login-auth-toggle" onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? "Already have an account? Sign In" : "Need an account? Create One"}
          </p>

          <div className="login-divider">
            <span>or</span>
          </div>

          <Link to="/investors" className="login-guest-link">
            <span className="guest-icon">👀</span>
            View as Guest (Investor View)
          </Link>
        </div>

        {/* Footer */}
        <footer className="login-footer">
          <p>© 2026 Entrepreneur Portfolio | Empowering Student Innovation</p>
        </footer>
      </div>
    </div>
  );
};

export default Login;