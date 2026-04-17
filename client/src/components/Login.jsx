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
    <div className="login-page-v2">
      <div className="login-split-container">
        {/* Left Side: Branding & Illustration */}
        <div className="login-brand-panel">
          <div className="brand-panel-content">
            <Link to="/" className="brand-logo-v2">
              <div className="logo-icon-v2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <span className="logo-text-v2">SiswaNiaga</span>
            </Link>
            
            <div className="brand-messaging">
              <h2>{isRegistering ? "Join the Ecosystem" : "Welcome Back"}</h2>
              <p>
                {isRegistering
                  ? "Create your enterprise-grade portfolio and start showcasing your ventures to investors and academic evaluators today."
                  : "Access your dashboard to manage your digital business pitch decks and track your entrepreneurial growth."}
              </p>
            </div>

            <div className="brand-visual-wrapper">
              {/* Abstract decorative elements to simulate an illustration */}
              <div className="glass-floating-card top-card">
                <div className="card-skeleton line-short"></div>
                <div className="card-skeleton line-long"></div>
              </div>
              <div className="glass-floating-card bottom-card">
                <div className="card-skeleton box-square"></div>
                <div className="card-skeleton line-medium"></div>
              </div>
              <div className="mesh-gradient-brand"></div>
            </div>
          </div>
        </div>

        {/* Right Side: Auth Form */}
        <div className="login-form-panel">
          <div className="form-panel-inner">
            <div className="form-header-v2">
              <h1 className="form-title-v2">{isRegistering ? "Create Account" : "Sign In"}</h1>
              <p className="form-subtitle-v2">
                {isRegistering ? "Enter your details to get started." : "Please enter your credentials to continue."}
              </p>
            </div>

            {/* Error Toast */}
            {error && (
              <div className="error-toast-v2">
                <div className="error-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                </div>
                <div className="error-message">{error}</div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="auth-form-v2">
              <div className="input-group-v2">
                <label htmlFor="username" className="input-label-v2">Student ID</label>
                <div className="input-wrapper-v2">
                  <span className="input-icon-v2">
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
                    placeholder="e.g. 278000"
                    className="premium-input"
                    required
                    autoComplete="username"
                  />
                </div>
              </div>

              {isRegistering && (
                <div className="input-group-v2">
                  <label htmlFor="email" className="input-label-v2">Email Address</label>
                  <div className="input-wrapper-v2">
                    <span className="input-icon-v2">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </span>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@gmail.com"
                      className="premium-input"
                      required={isRegistering}
                    />
                  </div>
                </div>
              )}

              <div className="input-group-v2">
                <div className="password-header">
                  <label htmlFor="password" className="input-label-v2">Password</label>
                  {!isRegistering && (
                    <Link to="/forgot-password" className="forgot-password-link">
                      Forgot Password?
                    </Link>
                  )}
                </div>
                <div className="input-wrapper-v2">
                  <span className="input-icon-v2">
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
                    className="premium-input"
                    required
                    autoComplete={isRegistering ? "new-password" : "current-password"}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary-v2"
                disabled={loading}
              >
                {loading ? (
                  <span className="loader-dots"><span></span><span></span><span></span></span>
                ) : (
                  isRegistering ? "Create Account" : "Sign In"
                )}
              </button>
            </form>

            <div className="form-footer-v2">
              <p className="toggle-auth-text">
                {isRegistering ? "Already have an account?" : "New to SiswaNiaga?"}
                <button
                  type="button"
                  className="btn-text-link"
                  onClick={() => {
                    setIsRegistering(!isRegistering);
                    setError('');
                  }}
                >
                  {isRegistering ? "Sign In" : "Create Account"}
                </button>
              </p>
              
              <div className="divider-v2"><span>or</span></div>
              
              <Link to="/investors" className="guest-action-link">
                Continue as Guest Investor
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;