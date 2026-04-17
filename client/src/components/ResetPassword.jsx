import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import './ResetPassword.css';

const ResetPassword = () => {
    const { token } = useParams();
    const [searchParams] = useSearchParams();
    const email = searchParams.get('email');
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        setError('');
        setMessage('');

        try {
            const res = await axios.post('https://api.siswaniaga.my/api/auth/reset-password', {
                email,
                token,
                newPassword
            });
            setMessage("Success! " + res.data.message);
            setTimeout(() => navigate('/'), 3000); 
        } catch (err) {
            setError(err.response?.data?.message || "Invalid or expired token.");
        } finally {
            setLoading(false);
        }
    };

    if (!token || !email) {
        return (
            <div className="reset-password-page">
                <div className="reset-password-bg">
                    <div className="mesh-gradient-rp"></div>
                </div>
                <div className="reset-password-container">
                    <div className="toast-message error-toast">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                        <span>Invalid link. Please request again from the login page.</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="reset-password-page">
            <div className="reset-password-bg">
                <div className="mesh-gradient-rp"></div>
                <div className="glass-shape shape-rp-1"></div>
                <div className="glass-shape shape-rp-2"></div>
            </div>

            <div className="reset-password-container">
                <div className="rp-card glassmorphism-card">
                    <div className="rp-header">
                        <div className="rp-icon-wrapper">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                            </svg>
                        </div>
                        <h2 className="rp-title">Create New Password</h2>
                        <p className="rp-subtitle">Please enter your new password for the <strong>{email}</strong> account.</p>
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

                    <form onSubmit={handleSubmit} className="rp-form">
                        <div className="input-group-rp">
                            <label className="input-label-rp">New Password</label>
                            <div className="input-wrapper-rp">
                                <span className="input-icon-rp">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                    </svg>
                                </span>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="premium-input-rp"
                                    required
                                    minLength="6"
                                />
                            </div>
                        </div>
                        
                        <div className="input-group-rp">
                            <label className="input-label-rp">Confirm Password</label>
                            <div className="input-wrapper-rp">
                                <span className="input-icon-rp">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                    </svg>
                                </span>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="premium-input-rp"
                                    required
                                    minLength="6"
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn-primary-rp" disabled={loading}>
                            {loading ? (
                                <span className="loader-dots-rp"><span></span><span></span><span></span></span>
                            ) : (
                                "Reset Password"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;