import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css'; // Kita pinjam design login terus

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        try {
            const res = await axios.post('https://api.siswaniaga.my/api/auth/forgot-password', { email });
            setMessage(res.data.message || "The reset email has been sent. Please check your inbox.");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to send email. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="auth-card">
                    <div className="card-header">
                        <h2 className="card-title">Forgot Password? 🔐</h2>
                        <p className="card-subtitle">Please enter your email address to receive a password reset link.</p>
                    </div>

                    {message && <div className="error-banner" style={{ backgroundColor: '#dcfce7', color: '#166534', borderColor: '#bbf7d0' }}>✅ {message}</div>}
                    {error && <div className="error-banner">❌ {error}</div>}

                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="input-group">
                            <label className="input-label">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="student@gmail.com"
                                className="modern-input"
                                required
                            />
                        </div>
                        <button type="submit" className="btn-submit" disabled={loading}>
                            {loading ? "Sending..." : "Send Reset Link"}
                        </button>
                    </form>

                    <div className="card-footer" style={{ marginTop: '20px', textAlign: 'center' }}>
                        <Link to="/" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '500' }}>← Back to Log In</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;