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

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [portfolios, setPortfolios] = useState([]);
  const [currentPortfolio, setCurrentPortfolio] = useState(null);

  // Ensure the token stays valid on refresh
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) setToken(savedToken);
  }, []);

  // Function to refresh the portfolio list
  const fetchPortfolios = async () => {
    try {
      const res = await axios.get('https://dummytest2.onrender.com/api/portfolio/all');
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
      alert("⚠️ Sesi tamat kerana tiada pergerakan (Idle 10 Minit). Sila log masuk semula.");
      localStorage.removeItem('token');
      setToken(null);
    };

    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(logoutUser, 5000); // 600000ms = 10 mins
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

            {/* Login / Register */}
            <Route path="/login" element={
              !token ? <Login setToken={setToken} /> : <Navigate to="/dashboard" />
            } />

            {/* Dashboard - Protected */}
            <Route path="/dashboard" element={
              token ? (
                <PortfolioList
                  portfolios={portfolios}
                  onDelete={fetchPortfolios}
                  setCurrentPortfolio={setCurrentPortfolio}
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

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;