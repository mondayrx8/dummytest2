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
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // This ensures the token stays valid if you refresh the page
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) setToken(savedToken);
  }, []);

  // Function to refresh the list (Passed to children)
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

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Layout wrapper for authenticated pages
  const AuthenticatedLayout = ({ children }) => (
    <div className={`app-layout ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <Sidebar
        setToken={setToken}
        isCollapsed={isSidebarCollapsed}
        toggleCollapse={toggleSidebar}
      />
      <div className="main-content-area">
        {children}
      </div>
    </div>
  );

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
          <Route path="/investors" element={<GuestList />} />

          {/* PAGE 2: LOGIN (If logged in, go to dashboard) */}
          <Route path="/login" element={
            !token ? <Login setToken={setToken} /> : <Navigate to="/dashboard" />
          } />

          {/* PAGE 2: DASHBOARD (The List) */}
          <Route path="/dashboard" element={
            token ? (
              <AuthenticatedLayout>
                <PortfolioList
                  portfolios={portfolios}
                  onDelete={fetchPortfolios}
                  setCurrentPortfolio={setCurrentPortfolio}
                />
              </AuthenticatedLayout>
            ) : <Navigate to="/" />
          } />

          {/* PAGE 3: BUILDER (The Form) */}
          <Route path="/create" element={
            token ? (
              <AuthenticatedLayout>
                <PortfolioForm
                  onSave={() => { fetchPortfolios(); }}
                  currentPortfolio={currentPortfolio}
                  setCurrentPortfolio={setCurrentPortfolio}
                />
              </AuthenticatedLayout>
            ) : <Navigate to="/" />
          } />

        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;