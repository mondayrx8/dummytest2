import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import InvestorPitchDeck from './InvestorPitchDeck';

const PortfolioDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [portfolio, setPortfolio] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                const response = await axios.get(`https://api.siswaniaga.my/api/portfolio/view/${id}`);
                setPortfolio(response.data);
            } catch (err) {
                console.error(err);
                setError('Failed to load portfolio details.');
            } finally {
                setLoading(false);
            }
        };

        fetchPortfolio();
    }, [id]);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#0A0F1E', color: 'white' }}>
                <p>Loading Ultra-Premium Pitch Deck...</p>
            </div>
        );
    }

    if (error || !portfolio) {
        return (
            <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#0A0F1E', color: 'white', height: '100vh' }}>
                <h2>Oops!</h2>
                <p>{error}</p>
                <button onClick={() => navigate(-1)} style={{ padding: '10px 20px', backgroundColor: '#4F46E5', color: 'white', borderRadius: '5px', border: 'none', cursor: 'pointer', marginTop: '20px' }}>Go Back</button>
            </div>
        );
    }

    // Call the UI component from v0.dev and supply portfolio data
    return <InvestorPitchDeck portfolio={portfolio} />;
};

export default PortfolioDetails;