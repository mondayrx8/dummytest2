import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // <--- IMPORT THIS

const PortfolioList = ({ portfolios, onDelete, setCurrentPortfolio }) => {
    const navigate = useNavigate(); // <--- ACTIVATE HOOK

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/portfolio/delete/${id}`, {
                headers: { 'auth-token': localStorage.getItem('token') }
            });
            onDelete(); 
        } catch (error) {
            console.error("Error deleting:", error);
        }
    };

    const handleEditClick = (item) => {
        setCurrentPortfolio(item); // Load data into state
        navigate('/create'); // Jump to the Form Page
    };

    return (
        <div>
            <h2>📚 Student Portfolios Directory</h2>
            <div style={{ display: 'grid', gap: '20px' }}>
            {portfolios.map((item) => (
                <div key={item._id} className="card" style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', background: 'white' }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div>
                            <h3 style={{ margin: 0, color: '#2c3e50' }}>{item.businessName}</h3>
                            <small>By: {item.studentName}</small>
                        </div>
                    </div>
                    
                    {/* Display Image if it exists */}
                    {item.image && (
                         <img src={item.image} alt="Project" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', marginTop: '10px', borderRadius: '5px' }} />
                    )}

                    <p><strong>Pitch:</strong> {item.description}</p>
                    <p><strong>Market:</strong> {item.marketSize}</p>
                    
                    <div style={{ marginTop: "15px" }}>
                        <button onClick={() => handleEditClick(item)} className="btn-edit" style={{ marginRight: '10px', padding: '5px 15px', cursor: 'pointer' }}>
                            Edit
                        </button>

                        <button onClick={() => handleDelete(item._id)} className="btn-delete" style={{ padding: '5px 15px', cursor: 'pointer', background: 'red', color: 'white', border: 'none' }}>
                            Delete
                        </button>
                    </div>
                </div>
            ))}
            </div>
        </div>
    );
};

export default PortfolioList;