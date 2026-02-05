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
      const response = await axios.post(`https://dummytest2.onrender.com/api/auth${endpoint}`, {
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
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Animated Background Blobs */}
      <div className="login-background">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      <div className="login-container">
        {/* Brand Logo */}
        <div className="login-brand">
          <div className="brand-icon-wrapper">
            <span className="brand-icon">🚀</span>
          </div>
          <h1 className="brand-title">DEPB</h1>
        </div>

        {/* Glass Card */}
        <div className="login-card glass-card">
          <div className="card-header">
            <h2 className="card-title">
              {isRegistering ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="card-subtitle">
              {isRegistering
                ? "Start building your digital venture portfolio today."
                : "Sign in to manage your entrepreneurial journey."}
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="error-banner">
              <span className="error-icon">⚠️</span>
              <span className="error-text">{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <label htmlFor="username" className="input-label">
                Username
              </label>
              <div className="input-wrapper">
                <span className="input-icon">👤</span>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your student ID"
                  className="glass-input"
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="password" className="input-label">
                Password
              </label>
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="glass-input"
                  required
                  autoComplete={isRegistering ? "new-password" : "current-password"}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-submit"
              disabled={loading}
            >
              {loading ? (
                <span className="spinner"></span>
              ) : (
                isRegistering ? "Create Account" : "Sign In"
              )}
            </button>
          </form>

          {/* Toggle Login/Register */}
          <div className="card-footer">
            <p className="toggle-text">
              {isRegistering ? "Already have an account?" : "New to DEPB?"}
              <button
                type="button"
                className="btn-toggle"
                onClick={() => {
                  setIsRegistering(!isRegistering);
                  setError('');
                }}
              >
                {isRegistering ? "Sign In" : "Create Account"}
              </button>
            </p>
          </div>
        </div>

        {/* Guest Link */}
        <Link to="/investors" className="guest-link">
          <span className="guest-icon">🌐</span>
          <span>Explore Ventures as Guest</span>
          <span className="guest-arrow">→</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;