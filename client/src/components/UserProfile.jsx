import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { User, ShieldCheck } from 'lucide-react';
import './UserProfile.css';

const UserProfile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [newEmail, setNewEmail] = useState('');
    const [emailLoading, setEmailLoading] = useState(false);
    const [emailMessage, setEmailMessage] = useState({ type: '', text: '' });
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
                const response = await axios.get('https://api.siswaniaga.my/api/auth/profile', {
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

    // 👇👇👇 2. Fungsi Kemaskini Email 👇👇👇
    const handleEmailChange = async (e) => {
        e.preventDefault();
        setEmailLoading(true);
        setEmailMessage({ type: '', text: '' });

        try {
            const token = localStorage.getItem('token');
            const response = await axios.put('https://api.siswaniaga.my/api/auth/update-email', {
                email: newEmail
            }, {
                headers: { 'auth-token': token }
            });

            setEmailMessage({ type: 'success', text: response.data.message });
            // Update paparan emel serta-merta tanpa perlu refresh page
            setProfile(prev => ({ ...prev, email: newEmail }));
            setNewEmail('');
        } catch (err) {
            console.error("Error updating email:", err);
            const errorMsg = err.response && err.response.data && err.response.data.message
                ? err.response.data.message
                : 'Failed to update email.';
            setEmailMessage({ type: 'error', text: errorMsg });
        } finally {
            setEmailLoading(false);
        }
    };
    // 👆👆👆 --------------------------- 👆👆👆

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
            const response = await axios.put('https://api.siswaniaga.my/api/auth/change-password', {
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

    // ==========================================
    // 1. SKELETON LOADING UNTUK USER PROFILE
    // ==========================================
    if (loading) {
        return (
            <main className="profile-page" aria-label="Loading Profile">
                <div className="profile-container" aria-hidden="true">
                    {/* Header Skeleton */}
                    <header className="profile-header flex flex-col gap-3">
                        <div className="skeleton-block" style={{ height: '2.5rem', width: '12rem', margin: '0 auto' }}></div>
                        <div className="skeleton-block" style={{ height: '1.25rem', width: '18rem', margin: '0 auto' }}></div>
                    </header>

                    <div className="profile-grid">
                        {/* Info Card Skeleton */}
                        <div className="profile-card info-card">
                            <div className="card-header flex items-center gap-3">
                                <div className="skeleton-block" style={{ height: '2rem', width: '2rem', borderRadius: '50%' }}></div>
                                <div className="skeleton-block" style={{ height: '1.75rem', width: '10rem' }}></div>
                            </div>
                            <div className="card-body flex flex-col gap-6 mt-6">
                                <div className="flex flex-col gap-2">
                                    <div className="skeleton-block" style={{ height: '1rem', width: '6rem' }}></div>
                                    <div className="skeleton-block" style={{ height: '1.5rem', width: '100%' }}></div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="skeleton-block" style={{ height: '1rem', width: '8rem' }}></div>
                                    <div className="skeleton-block" style={{ height: '1.5rem', width: '100%' }}></div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="skeleton-block" style={{ height: '1rem', width: '4rem' }}></div>
                                    <div className="skeleton-block" style={{ height: '2rem', width: '6rem', borderRadius: '9999px' }}></div>
                                </div>
                                <hr style={{ margin: '10px 0', borderColor: 'var(--prof-divider)' }} />
                                <div className="flex flex-col gap-4">
                                    <div className="skeleton-block" style={{ height: '1.5rem', width: '8rem' }}></div>
                                    <div className="skeleton-block" style={{ height: '2.5rem', width: '100%' }}></div>
                                    <div className="skeleton-block" style={{ height: '2.5rem', width: '8rem', borderRadius: '9999px' }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Security Card Skeleton */}
                        <div className="profile-card security-card">
                            <div className="card-header flex items-center gap-3">
                                <div className="skeleton-block" style={{ height: '2rem', width: '2rem', borderRadius: '50%' }}></div>
                                <div className="skeleton-block" style={{ height: '1.75rem', width: '12rem' }}></div>
                            </div>
                            <div className="card-body flex flex-col gap-6 mt-6">
                                <div className="skeleton-block" style={{ height: '1.5rem', width: '10rem' }}></div>
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="flex flex-col gap-2">
                                        <div className="skeleton-block" style={{ height: '1rem', width: '8rem' }}></div>
                                        <div className="skeleton-block" style={{ height: '2.5rem', width: '100%' }}></div>
                                    </div>
                                ))}
                                <div className="skeleton-block" style={{ height: '2.5rem', width: '10rem', borderRadius: '9999px', marginTop: '0.5rem' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    if (error && !profile) {
        return (
            <main className="profile-error" aria-label="Error Loading Profile">
                <h2>Oops!</h2>
                <p>{error}</p>
                <button onClick={() => navigate('/dashboard')} className="btn-back">Return to Dashboard</button>
            </main>
        );
    }

    return (
        <main className="profile-page" aria-label="User Profile">
            <div className="profile-container">
                <header className="profile-header">
                    <h1>My Profile</h1>
                    <p>Manage your account settings and security</p>
                </header>

                <div className="profile-grid">
                    {/* User Info Card */}
                    <div className="profile-card info-card">
                        <div className="card-header">
                            <span className="card-icon" aria-hidden="true"><User size={24} color="currentColor" /></span>
                            <h2>Account Details</h2>
                        </div>
                        <div className="card-body">
                            <div className="info-group">
                                <label>Username</label>
                                <p className="info-value">{profile?.username}</p>
                            </div>
                            <div className="info-group">
                                <label>Email Address</label>
                                <p className="info-value" style={{ textTransform: 'none' }}>
                                    {profile?.email || 'Please update your email'}
                                </p>
                            </div>
                            <div className="info-group">
                                <label>Role</label>
                                <p className="info-value role-badge">{profile?.role}</p>
                            </div>

                            {/* 👇👇👇 3. Borang Kemaskini Email 👇👇👇 */}
                            <hr style={{ margin: '20px 0', borderColor: 'var(--prof-divider)', borderStyle: 'solid', borderWidth: '1px 0 0 0' }} />
                            <form onSubmit={handleEmailChange} className="password-form" style={{ marginTop: '0' }}>
                                <h3>Update Email</h3>

                                {emailMessage.text && (
                                    <div className={`message-toast ${emailMessage.type}`} role="alert" aria-live="polite">
                                        {emailMessage.text}
                                    </div>
                                )}

                                <div className="form-group">
                                    <input
                                        type="email"
                                        value={newEmail}
                                        onChange={(e) => setNewEmail(e.target.value)}
                                        required
                                        placeholder="Enter your new email"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn-update-pwd"
                                    disabled={emailLoading}
                                >
                                    {emailLoading ? 'Updating...' : 'Update Email'}
                                </button>
                            </form>
                            {/* 👆👆👆 ----------------------------- 👆👆👆 */}

                        </div>
                    </div>

                    {/* Security Card */}
                    <div className="profile-card security-card">
                        <div className="card-header">
                            <span className="card-icon" aria-hidden="true"><ShieldCheck size={24} color="currentColor" /></span>
                            <h2>Security Settings</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handlePasswordChange} className="password-form">
                                <h3>Change Password</h3>

                                {pwdMessage.text && (
                                    <div className={`message-toast ${pwdMessage.type}`} role="alert" aria-live="polite">
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
        </main>
    );
};

export default UserProfile;
