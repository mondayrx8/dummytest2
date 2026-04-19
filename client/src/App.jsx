import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

// Import Components
import Navbar from './components/Navbar';
import PortfolioList from './components/PortfolioList';
import PortfolioForm from './components/PortfolioForm';
import Login from './components/Login';
import GuestList from './components/GuestList';
import LandingPage from './components/LandingPage';
import PortfolioDetails from './components/PortfolioDetails';
import UserProfile from './components/UserProfile';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import CookiesPolicy from './components/CookiesPolicy';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [portfolios, setPortfolios] = useState([]);
  const [currentPortfolio, setCurrentPortfolio] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // Ensure the token stays valid on refresh
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
      // Decode JWT token to read ID and Role
      try {
        const base64Url = savedToken.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const payload = JSON.parse(jsonPayload);
        setCurrentUser(payload);
      } catch (error) {
        console.error("Token is broken", error);
        setCurrentUser(null);
      }
    } else {
      setCurrentUser(null);
    }
  }, [token]);

  // Function to refresh the portfolio list
  const fetchPortfolios = async () => {
    try {
      const res = await axios.get('https://api.siswaniaga.my/api/portfolio/all');
      setPortfolios(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  // 📡 RADAR IDLE TIMEOUT (10 MINIT)
  useEffect(() => {
    // Hanya aktifkan radar kalau user dah login
    if (!token) return;

    let timeoutId;

    const logoutUser = () => {
      alert("⚠️ Session has timed out after 10 minutes of inactivity. Please login again.");
      localStorage.removeItem('token');
      setToken(null);
    };

    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(logoutUser, 600000); // 600000ms = 10 mins
    };

    const events = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart'];

    // Pasang telinga untuk kesan pergerakan user
    events.forEach(event => window.addEventListener(event, resetTimer));
    resetTimer(); // Mula kira detik sekarang

    // Cuci radar bila tutup komponen
    return () => {
      clearTimeout(timeoutId);
      events.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, [token]);


  return (
    <BrowserRouter>
      <div className="app-container">
        {/* Global Navbar - Shows on all pages */}
        <Navbar user={token} setToken={setToken} />

        {/* Main Content Area - Below fixed navbar */}
        <main className="main-app-content">
          <Routes>
            {/* Landing Page */}
            <Route path="/" element={<LandingPage />} />

            {/* Public Investor View */}
            <Route path="/investors" element={<GuestList />} />

            {/* Public Portfolio Details View */}
            <Route path="/portfolio/:id" element={<PortfolioDetails />} />

            {/* Login / Register */}
            <Route path="/login" element={
              !token ? <Login setToken={setToken} /> : <Navigate to="/dashboard" />
            } />

            {/* 👇👇👇 LALUAN FORGOT & RESET PASSWORD 👇👇👇 */}
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            {/* 👆👆👆 --------------------------------- 👆👆👆 */}

            {/* Dashboard - Protected */}
            <Route path="/dashboard" element={
              token ? (
                <PortfolioList
                  setCurrentPortfolio={setCurrentPortfolio}
                  currentUser={currentUser}
                />
              ) : <Navigate to="/login" />
            } />

            {/* Portfolio Builder - Protected */}
            <Route path="/create" element={
              token ? (
                <PortfolioForm
                  onSave={() => { fetchPortfolios(); }}
                  currentPortfolio={currentPortfolio}
                  setCurrentPortfolio={setCurrentPortfolio}
                />
              ) : <Navigate to="/login" />
            } />

            {/* User Profile - Protected */}
            <Route path="/profile" element={
              token ? <UserProfile /> : <Navigate to="/login" />
            } />

            {/* Legal Pages */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/cookies-policy" element={<CookiesPolicy />} />

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;