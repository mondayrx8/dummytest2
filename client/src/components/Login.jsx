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
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Dynamic Background */}
      <div className="login-background">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <div className="login-container">
        {/* Brand Header */}
        <div className="login-brand">
          <div className="brand-icon-wrapper">
            <span className="brand-icon">🚀</span>
          </div>
          <h1>DEPB</h1>
        </div>

        {/* Glass Card */}
        <div className="login-card glass-panel">
          <div className="card-header">
            <h2>{isRegistering ? "Join the Future" : "Welcome Back"}</h2>
            <p className="subtitle">
              {isRegistering
                ? "Start building your digital venture portfolio today."
                : "Manage your entrepreneurial journey."}
            </p>
          </div>

          {error && (
            <div className="error-banner">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <div className="input-wrapper">
                <span className="input-icon">👤</span>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Student ID or Username"
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-primary-login" disabled={loading}>
              {loading ? <span className="spinner"></span> : (isRegistering ? "Create Account" : "Sign In")}
            </button>
          </form>

          <div className="card-footer">
            <p className="toggle-text">
              {isRegistering ? "Already have an account?" : "New to DEPB?"}
              <button
                type="button"
                className="btn-text-link"
                onClick={() => setIsRegistering(!isRegistering)}
              >
                {isRegistering ? "Login here" : "Create Account"}
              </button>
            </p>
          </div>
        </div>

        {/* Guest Link */}
        <Link to="/investors" className="guest-link glass-pill">
          <span className="icon">📈</span>
          <span>Explore Ventures (Investor View)</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;