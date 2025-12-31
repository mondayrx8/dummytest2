import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className="logo">🚀 FYP Builder</div>
        <div>
          {/* We can add real links here later */}
          <span style={{ marginRight: "20px", cursor: "pointer" }}>Home</span>
          <span style={{ cursor: "pointer" }}>About</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;