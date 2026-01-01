import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Destroy the key
        navigate('/'); // Go back to Login
    };

    return (
        <nav style={styles.nav}>
            <h2 style={{ margin: 0 }}>🚀 Entrepreneur Portfolio</h2>
            <div style={styles.links}>
                {/* These are the buttons to switch pages */}
                <Link to="/dashboard" style={styles.link}>All Portfolios</Link>
                <Link to="/create" style={styles.btnCreate}>+ Build New</Link>
                <button onClick={handleLogout} style={styles.btnLogout}>Logout</button>
            </div>
        </nav>
    );
};

// Simple CSS styles for the Navbar
const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 30px',
        backgroundColor: '#2c3e50',
        color: 'white',
        marginBottom: '20px'
    },
    links: {
        display: 'flex',
        gap: '20px',
        alignItems: 'center'
    },
    link: {
        color: 'white',
        textDecoration: 'none',
        fontSize: '18px'
    },
    btnCreate: {
        backgroundColor: '#27ae60',
        color: 'white',
        padding: '8px 15px',
        borderRadius: '5px',
        textDecoration: 'none',
        fontWeight: 'bold'
    },
    btnLogout: {
        backgroundColor: '#c0392b',
        color: 'white',
        border: 'none',
        padding: '8px 15px',
        borderRadius: '5px',
        cursor: 'pointer'
    }
};

export default Navbar;