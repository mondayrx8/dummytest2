import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const endpoint = isRegistering ? '/register' : '/login';
    
    try {
      const response = await axios.post(`http://localhost:5000/api/auth${endpoint}`, {
        username,
        password
      });

      if (isRegistering) {
        // If registered successfully, switch to login mode automatically
        alert("Registration Successful! Please Login.");
        setIsRegistering(false);
      } else {
        // If login successful, save token and tell App.jsx
        localStorage.setItem('token', response.data.token);
        onLogin(response.data.token);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "30px", border: "1px solid #ddd", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", backgroundColor: "white" }}>
      <h2 style={{ textAlign: "center", color: "#2c3e50" }}>
        {isRegistering ? "Create Account" : "Secure Login"}
      </h2>
      
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>Username</label>
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "100%", padding: "10px", marginTop: "5px" }}
            required
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Password</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "10px", marginTop: "5px" }}
            required
          />
        </div>

        <button type="submit" style={{ width: "100%", padding: "12px", backgroundColor: "#3498db", color: "white", border: "none", cursor: "pointer", fontSize: "16px" }}>
          {isRegistering ? "Register" : "Login"}
        </button>
      </form>

      <p style={{ textAlign: "center", marginTop: "20px", cursor: "pointer", color: "blue", textDecoration: "underline" }} onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? "Already have an account? Login" : "Need an account? Register"}
      </p>
    </div>
  );
};

export default Login;