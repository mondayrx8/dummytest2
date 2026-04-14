import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import './Login.css';

const ResetPassword = () => {
    const { token } = useParams(); // Tangkap token dari URL
    const [searchParams] = useSearchParams();
    const email = searchParams.get('email'); // Tangkap email dari URL (?email=...)
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
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
            setTimeout(() => navigate('/'), 3000); // Bawa user ke page login lepas 3 saat
        } catch (err) {
            setError(err.response?.data?.message || "Token tidak sah atau telah luput.");
        } finally {
            setLoading(false);
        }
    };

    if (!token || !email) {
        return <div className="login-page"><div className="error-banner">Pautan tidak sah. Sila mohon semula dari halaman Log Masuk.</div></div>;
    }

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="auth-card">
                    <div className="card-header">
                        <h2 className="card-title">Cipta Kata Laluan Baharu 🔑</h2>
                        <p className="card-subtitle">Sila masukkan kata laluan baharu anda untuk akaun {email}.</p>
                    </div>

                    {message && <div className="error-banner" style={{ backgroundColor: '#dcfce7', color: '#166534', borderColor: '#bbf7d0' }}>✅ {message}</div>}
                    {error && <div className="error-banner">❌ {error}</div>}

                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="input-group">
                            <label className="input-label">New Password</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="••••••••"
                                className="modern-input"
                                required
                                minLength="6"
                            />
                        </div>
                        <button type="submit" className="btn-submit" disabled={loading}>
                            {loading ? "Menyimpan..." : "Tukar Kata Laluan"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;