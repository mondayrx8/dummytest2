import React from 'react';
import axios from 'axios';

const PortfolioList = ({ portfolios, onDelete, onEdit }) => {

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this project?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/portfolio/delete/${id}`);
            onDelete(); 
        } catch (error) {
            console.error("Error deleting:", error);
        }
    };

    return (
        <div>
            <h2>Student Projects</h2>
            {portfolios.map((item) => (
                <div key={item._id} className="card">
                    <h3>{item.projectTitle}</h3>
                    
                    {/* --- NEW: Display Image --- */}
                    {item.image && (
                      <img 
                        src={item.image} 
                        alt="Project" 
                        style={{ width: "100%", maxHeight: "200px", objectFit: "cover", borderRadius: "8px", marginBottom: "15px" }} 
                      />
                    )}
                    {/* -------------------------- */}

                    <p><strong>Problem:</strong> {item.problemStatement}</p>
                    <p><strong>Solution:</strong> {item.solution}</p>
                    <p><strong>Target Market:</strong> {item.targetMarket}</p>
                    
                    <div style={{ marginTop: "15px" }}>
                        <button 
                            onClick={() => {
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                onEdit(item); 
                            }}
                            className="btn-edit"
                        >
                            Edit
                        </button>

                        <button 
                            onClick={() => handleDelete(item._id)}
                            className="btn-delete"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PortfolioList;