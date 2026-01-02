import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setToken }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const endpoint = isRegistering ? '/register' : '/login';

    try {
      const response = await axios.post(`http://localhost:5000/api/auth${endpoint}`, {
        username,
        password
      });

      if (isRegistering) {
        // If registered successfully, switch to login mode automatically
        alert("Registration Successful! Please Login.");
        setIsRegistering(false);
      } else {
        // If login successful, save token and tell App.jsx
        localStorage.setItem('token', response.data.token);
        setToken(response.data.token);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="landing-page">
      <div className="landing-content">
        {/* Hero Section */}
        <div className="hero-section">
          <h1 className="hero-title">Portfolio Builder</h1>
          <p className="hero-subtitle">Create, manage, and showcase your work in one beautiful place</p>
        </div>

        {/* Auth Card */}
        <div className="auth-card">
          <h2 className="auth-title">
            {isRegistering ? "Create Account" : "Welcome Back"}
          </h2>

          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-input"
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit" className="btn-primary">
              {isRegistering ? "Register" : "Login"}
            </button>
          </form>

          <p className="auth-toggle" onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? "Already have an account? Login" : "Need an account? Register"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;