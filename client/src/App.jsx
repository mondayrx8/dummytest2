import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PortfolioForm from './components/PortfolioForm';
import PortfolioList from './components/PortfolioList';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login'; // <--- Import Login

function App() {
  const [portfolios, setPortfolios] = useState([]);
  const [currentPortfolio, setCurrentPortfolio] = useState(null); 
  const [searchTerm, setSearchTerm] = useState(""); 
  
  // SECURITY STATE: Do we have a token?
  const [token, setToken] = useState(localStorage.getItem('token'));

  // If we have a token, we attach it to every request (we will need this later)
  useEffect(() => {
    if (token) {
       // MAGIC LINE: Attach token to every future request
       axios.defaults.headers.common['auth-token'] = token; 
       fetchPortfolios();
    } else {
       // If no token, remove the header
       delete axios.defaults.headers.common['auth-token'];
    }
  }, [token]);

  const fetchPortfolios = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/portfolio/all');
      setPortfolios(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Destroy the ID card
    setToken(null); // Update state to hide dashboard
  };

  // LOGIC: If no token, SHOW LOGIN PAGE ONLY
  if (!token) {
    return (
      <>
        <Navbar />
        <Login onLogin={setToken} />
        <Footer />
      </>
    );
  }

  // LOGIC: If token exists, SHOW DASHBOARD
  const filteredPortfolios = portfolios.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
        item.projectTitle.toLowerCase().includes(term) || 
        item.problemStatement.toLowerCase().includes(term) ||
        item.solution.toLowerCase().includes(term)
    );
  });

  return (
    <>
      <Navbar />

      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
            <h1>My Dashboard</h1>
            <button onClick={handleLogout} style={{ width: "auto", backgroundColor: "#e74c3c", padding: "10px 20px" }}>
                Logout
            </button>
        </div>
        
        <PortfolioForm 
          onSave={fetchPortfolios} 
          currentPortfolio={currentPortfolio} 
          setCurrentPortfolio={setCurrentPortfolio} 
        />

        <hr style={{ borderTop: "1px solid #eee", margin: "30px 0" }} />

        <div style={{ marginBottom: "20px" }}>
            <input 
                type="text" 
                placeholder="🔍 Search projects..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: "100%", padding: "15px", fontSize: "16px", borderRadius: "8px", border: "2px solid #3498db" }}
            />
        </div>

        <PortfolioList 
          portfolios={filteredPortfolios} 
          onDelete={fetchPortfolios} 
          onEdit={setCurrentPortfolio} 
        />
      </div>

      <Footer />
    </>
  );
}

export default App;