import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TvMazeResults = () => {
    const { id } = useParams(); // Get the show ID from the URL
    const [showDetails, setShowDetails] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchShowDetails = async () => {
            try {
                const response = await axios.get(`https://api.tvmaze.com/shows/${id}`);
                setShowDetails(response.data); // Save the show details
                setError('');
            } catch (err) {
                setError('Error fetching show details. Please try again later.');
            }
        };

        fetchShowDetails();
    }, [id]);

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (!showDetails) {
        return <p>Loading...</p>;
    }

    return (
        <div className='tvmaze-results-body'>
        <div className="tvmaze-results-container">
            <h1>{showDetails.name}</h1>
            <p dangerouslySetInnerHTML={{ __html: showDetails.summary || 'No summary available.' }} />
        </div>
        </div>
    );
};

export default TvMazeResults;