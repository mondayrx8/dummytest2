import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ForgotPassword.css';

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
        <div className="forgot-password-page">
            <div className="forgot-password-bg">
                <div className="mesh-gradient-fp"></div>
                <div className="glass-shape shape-fp-1"></div>
                <div className="glass-shape shape-fp-2"></div>
            </div>

            <div className="forgot-password-container">
                <div className="fp-card glassmorphism-card">
                    <div className="fp-header">
                        <div className="fp-icon-wrapper">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                            </svg>
                        </div>
                        <h2 className="fp-title">Forgot Password?</h2>
                        <p className="fp-subtitle">Enter your email address and we'll send you a link to reset your password.</p>
                    </div>

                    {/* Success Toast */}
                    {message && (
                        <div className="toast-message success-toast">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                            <span>{message}</span>
                        </div>
                    )}

                    {/* Error Toast */}
                    {error && (
                        <div className="toast-message error-toast">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="fp-form">
                        <div className="input-group-fp">
                            <label className="input-label-fp">Email Address</label>
                            <div className="input-wrapper-fp">
                                <span className="input-icon-fp">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                        <polyline points="22,6 12,13 2,6"></polyline>
                                    </svg>
                                </span>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="student@gmail.com"
                                    className="premium-input-fp"
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn-primary-fp" disabled={loading}>
                            {loading ? (
                                <span className="loader-dots-fp"><span></span><span></span><span></span></span>
                            ) : (
                                "Send Reset Link"
                            )}
                        </button>
                    </form>

                    <div className="fp-footer">
                        <Link to="/login" className="back-to-login-link">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                            Back to Log In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;