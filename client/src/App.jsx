import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

// Import Components
import Sidebar from './components/Sidebar';
import PortfolioList from './components/PortfolioList';
import PortfolioForm from './components/PortfolioForm';
import Login from './components/Login';
import GuestList from './components/GuestList';
import LandingPage from './components/LandingPage';
import ScrollLanding from './components/ScrollLanding';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [portfolios, setPortfolios] = useState([]);
  const [currentPortfolio, setCurrentPortfolio] = useState(null); // For Editing

  // This ensures the token stays valid if you refresh the page
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) setToken(savedToken);
  }, []);

  // Function to refresh the list (Passed to children)
  const fetchPortfolios = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/portfolio/all');
      setPortfolios(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  return (
    <BrowserRouter>
      <div className="app-container">

        {/* ROUTES CONFIGURATION */}
        <Routes>
          {/* PAGE 0: LANDING PAGE (Default Homepage - Immersive Scroll) */}
          <Route path="/" element={<ScrollLanding />} />

          {/* OLD LANDING PAGE (Backup - Entrepreneurial Portfolio) */}
          <Route path="/old-landing" element={<LandingPage />} />

          {/* PAGE 1: PUBLIC INVESTOR VIEW (No Token Required!) */}
          <Route path="/investors" element={<GuestList />} /> {/*

          {/* PAGE 2: LOGIN (If logged in, go to dashboard) */}
          <Route path="/login" element={
            !token ? <Login setToken={setToken} /> : <Navigate to="/dashboard" />
          } />

          {/* PAGE 2: DASHBOARD (The List) */}
          <Route path="/dashboard" element={
            token ? (
              <>
                <Sidebar setToken={setToken} />
                <PortfolioList
                  portfolios={portfolios}
                  onDelete={fetchPortfolios}
                  setCurrentPortfolio={setCurrentPortfolio}
                />
              </>
            ) : <Navigate to="/" />
          } />

          {/* PAGE 3: BUILDER (The Form) */}
          <Route path="/create" element={
            token ? (
              <>
                <Sidebar setToken={setToken} />
                <PortfolioForm
                  onSave={() => { fetchPortfolios(); }}
                  currentPortfolio={currentPortfolio}
                  setCurrentPortfolio={setCurrentPortfolio}
                />
              </>
            ) : <Navigate to="/" />
          } />

        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;