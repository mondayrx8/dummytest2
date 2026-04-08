import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

const UserProfile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    // Password state
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [pwdLoading, setPwdLoading] = useState(false);
    const [pwdMessage, setPwdMessage] = useState({ type: '', text: '' }); // type: 'success' | 'error'

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }
                const response = await axios.get('https://dummytest2.onrender.com/api/auth/profile', {
                    headers: { 'auth-token': token }
                });
                setProfile(response.data);
            } catch (err) {
                console.error("Error fetching profile:", err);
                setError('Failed to load profile data.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        
        // Basic validation
        if (newPassword !== confirmPassword) {
            setPwdMessage({ type: 'error', text: 'New passwords do not match' });
            return;
        }

        if (newPassword.length < 6) {
            setPwdMessage({ type: 'error', text: 'New password must be at least 6 characters' });
            return;
        }

        setPwdLoading(true);
        setPwdMessage({ type: '', text: '' });

        try {
            const token = localStorage.getItem('token');
            const response = await axios.put('https://dummytest2.onrender.com/api/auth/change-password', {
                oldPassword,
                newPassword
            }, {
                headers: { 'auth-token': token }
            });

            setPwdMessage({ type: 'success', text: response.data.message || 'Password updated successfully!' });
            
            // Clear fields on success
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err) {
            console.error("Error changing password:", err);
            const errorMsg = err.response && err.response.data && err.response.data.message 
                ? err.response.data.message 
                : 'Failed to update password. Please check your old password.';
            setPwdMessage({ type: 'error', text: errorMsg });
        } finally {
            setPwdLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="profile-loading">
                <div className="spinner"></div>
                <p>Loading profile...</p>
            </div>
        );
    }

    if (error && !profile) {
        return (
            <div className="profile-error">
                <h2>Oops!</h2>
                <p>{error}</p>
                <button onClick={() => navigate('/dashboard')} className="btn-back">Return to Dashboard</button>
            </div>
        );
    }

    return (
        <div className="profile-page">
            <div className="profile-container">
                <header className="profile-header">
                    <h1>My Profile</h1>
                    <p>Manage your account settings and security</p>
                </header>

                <div className="profile-grid">
                    {/* User Info Card */}
                    <div className="profile-card info-card">
                        <div className="card-header">
                            <span className="card-icon">👤</span>
                            <h2>Account Details</h2>
                        </div>
                        <div className="card-body">
                            <div className="info-group">
                                <label>Username</label>
                                <p className="info-value">{profile?.username}</p>
                            </div>
                            <div className="info-group">
                                <label>Role</label>
                                <p className="info-value role-badge">{profile?.role}</p>
                            </div>
                        </div>
                    </div>

                    {/* Security Card */}
                    <div className="profile-card security-card">
                        <div className="card-header">
                            <span className="card-icon">🛡️</span>
                            <h2>Security Settings</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handlePasswordChange} className="password-form">
                                <h3>Change Password</h3>
                                
                                {pwdMessage.text && (
                                    <div className={`message-toast ${pwdMessage.type}`}>
                                        {pwdMessage.text}
                                    </div>
                                )}

                                <div className="form-group">
                                    <label>Old Password</label>
                                    <input 
                                        type="password" 
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        required
                                        placeholder="Enter current password"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>New Password</label>
                                    <input 
                                        type="password" 
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                        placeholder="Enter new password"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Confirm New Password</label>
                                    <input 
                                        type="password" 
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        placeholder="Confirm new password"
                                    />
                                </div>
                                
                                <button 
                                    type="submit" 
                                    className="btn-update-pwd"
                                    disabled={pwdLoading}
                                >
                                    {pwdLoading ? 'Updating...' : 'Update Password'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
