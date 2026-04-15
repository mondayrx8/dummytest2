import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = ({ setToken }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = isRegistering ? '/register' : '/login';

    try {
      const response = await axios.post(`https://api.siswaniaga.my/api/auth${endpoint}`, {
        username,
        email,
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
      <div className="login-container">
        {/* Brand Logo */}
        <div className="login-brand">
          <div className="brand-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <h1 className="brand-title">SiswaNiaga</h1>
        </div>

        {/* Auth Card */}
        <div className="auth-card">
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
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <label htmlFor="username" className="input-label">
                Username
              </label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </span>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your student ID"
                  className="modern-input"
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            {isRegistering && (
              <div className="input-group">
                <label htmlFor="email" className="input-label">Email Address</label>
                <div className="input-wrapper">
                  <span className="input-icon">📧</span>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@gmail.com"
                    className="modern-input"
                    required={isRegistering}
                  />
                </div>
              </div>
            )}

            <div className="input-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label htmlFor="password" className="input-label" style={{ margin: 0 }}>
                  Password
                </label>
                {!isRegistering && (
                  <Link to="/forgot-password" style={{ fontSize: '12px', color: '#2563eb', textDecoration: 'none', fontWeight: '600' }}>
                    Lupa Password?
                  </Link>
                )}
              </div>
              <div className="input-wrapper">
                <span className="input-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </span>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="modern-input"
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
                "Loading..."
              ) : (
                isRegistering ? "Create Account" : "Sign In"
              )}
            </button>
          </form>

          {/* Toggle Login/Register */}
          <div className="card-footer">
            <p className="toggle-text">
              {isRegistering ? "Already have an account?" : "New to SiswaNiaga?"}
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
          <span>Explore Ventures as Guest</span>
          <span className="guest-arrow">→</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;