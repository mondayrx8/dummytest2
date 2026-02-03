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
import Footer from './components/Footer';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [portfolios, setPortfolios] = useState([]);
  const [currentPortfolio, setCurrentPortfolio] = useState(null); // For Editing

  // Sidebar State: can be true (collapsed desktop), false (expanded desktop), or 'mobile-open'
  const [sidebarState, setSidebarState] = useState(false);

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
    // If mobile check needed, we could check window.innerWidth
    // But for now we simple toggle boolean or special string
    if (window.innerWidth <= 968) {
      setSidebarState(prev => prev === 'mobile-open' ? false : 'mobile-open');
    } else {
      setSidebarState(prev => !prev);
    }
  };

  // Layout wrapper for authenticated pages
  const AuthenticatedLayout = ({ children }) => (
    <div className={`app-layout ${sidebarState === true ? 'sidebar-collapsed' : ''}`}>

      {/* Sidebar Handles its own mobile overlays based on state */}
      <Sidebar
        setToken={setToken}
        isCollapsed={sidebarState} // Pass the complex state down
        toggleCollapse={toggleSidebar}
      />

      <div className="main-content-area">
        {/* Mobile Header / Hamburger would theoretically go here if not inside Sidebar fixed component. 
            For this design, Sidebar handles the mobile toggle trigger or we add a separate top bar. 
            Given the user request, we rely on the specific Sidebar mobile redesign.
        */}

        {/* Mobile Hamburger (Visible only on mobile) */}
        <div className="mobile-header-trigger" style={{
          display: window.innerWidth <= 968 ? 'flex' : 'none',
          padding: '16px',
          position: 'absolute', /* Absolute to not disturb flow */
          top: 0,
          left: 0,
          zIndex: 90
        }}>
          <button onClick={toggleSidebar} style={{ color: '#000', background: 'white', padding: '8px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
          </button>
        </div>

        <div className="content-wrapper">
          {children}
        </div>

        {/* Footer is now part of the flow */}
        <Footer />
      </div>
    </div>
  );

  return (
    <BrowserRouter>
      <div className="app-container">

        {/* ROUTES CONFIGURATION */}
        <Routes>
          {/* PAGE 0: LANDING PAGE (New Light Mode Redesign) */}
          <Route path="/" element={<LandingPage />} />

          {/* DARK MODE LANDING (Backup - Cinematic Obsidian) */}
          <Route path="/scroll-landing" element={<ScrollLanding />} />

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