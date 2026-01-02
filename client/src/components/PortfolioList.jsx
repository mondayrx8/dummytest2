import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PortfolioList = ({ portfolios, onDelete, setCurrentPortfolio }) => {
    const navigate = useNavigate();

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
        setCurrentPortfolio(item);
        navigate('/create');
    };

    return (
        <div className="dashboard-container">
            <h2 className="dashboard-title">📚 Student Portfolios Directory</h2>
            <div className="portfolio-grid">
                {portfolios.map((item) => (
                    <div key={item._id} className="portfolio-card">
                        <div className="card-header">
                            <div>
                                <h3 className="card-title">{item.businessName}</h3>
                                <small className="card-author">By: {item.studentName}</small>
                            </div>
                        </div>

                        {item.image && (
                            <img src={item.image} alt="Project" className="card-image" />
                        )}

                        <p className="card-description"><strong>Pitch:</strong> {item.description}</p>
                        <p className="card-market"><strong>Market:</strong> {item.marketSize}</p>

                        <div className="card-actions">
                            <button onClick={() => handleEditClick(item)} className="btn-edit">
                                Edit
                            </button>

                            <button onClick={() => handleDelete(item._id)} className="btn-delete">
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