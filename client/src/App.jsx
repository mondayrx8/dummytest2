import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

// Import Components
import Navbar from './components/Navbar';
import PortfolioList from './components/PortfolioList';
import PortfolioForm from './components/PortfolioForm';
import Login from './components/Login';
import GuestList from './components/GuestList';

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
          {/* PAGE 0: PUBLIC INVESTOR VIEW (No Token Required!) */}
          <Route path="/investors" element={<GuestList />} /> {/*
          
          {/* PAGE 1: LOGIN (If logged in, go to dashboard) */}
          <Route path="/" element={
            !token ? <Login setToken={setToken} /> : <Navigate to="/dashboard" />
          } />

          {/* PAGE 2: DASHBOARD (The List) */}
          <Route path="/dashboard" element={
            token ? (
              <>
                <Navbar setToken={setToken} />
                <div style={{ padding: "20px" }}>
                  <PortfolioList
                    portfolios={portfolios}
                    onDelete={fetchPortfolios}
                    setCurrentPortfolio={setCurrentPortfolio}
                  />
                </div>
              </>
            ) : <Navigate to="/" />
          } />

          {/* PAGE 3: BUILDER (The Form) */}
          <Route path="/create" element={
            token ? (
              <>
                <Navbar setToken={setToken} />
                <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
                  <PortfolioForm
                    onSave={() => { fetchPortfolios(); }}
                    currentPortfolio={currentPortfolio}
                    setCurrentPortfolio={setCurrentPortfolio}
                  />
                </div>
              </>
            ) : <Navigate to="/" />
          } />

        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;