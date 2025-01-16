import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { IntroSection, DividerLine } from '../SharedComponents.js';

const TvMazePeopleResults = () => {
    const { id } = useParams(); // Get the person ID from the URL
    const [personDetails, setPersonDetails] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPersonDetails = async () => {
            try {
                const response = await axios.get(`https://api.tvmaze.com/people/${id}`);
                setPersonDetails(response.data); // Save the person details
                setError('');
            } catch (err) {
                setError('Error fetching person details. Please try again later.');
            }
        };

        fetchPersonDetails();
    }, [id]);

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (!personDetails) {
        return <p>Loading...</p>;
    }

    return (
        <div className="tvmaze-body">
            <IntroSection title="Discover Actors & Actresses">
                <p>
                    <strong className="shadow">Welcome to the People Details Page:</strong>&nbsp;&nbsp;Explore information about your favorite actors and actresses. 
                    This section provides basic details sourced from the extensive <a href="https://www.tvmaze.com/" target="_blank" rel="noopener noreferrer">TVmaze</a> database.
                </p>
                <p className="shadow">
                    <strong>Note:</strong> This section is still under construction. Features and details may be updated as development progresses.
                </p>
            </IntroSection>
            <DividerLine />
            <h1 className="section-title">{personDetails.name}</h1>
            <div className="tvmaze-results">
                <div className="tvmaze-results-intro">
                    <div className="main-info">
                        {personDetails.image && personDetails.image.medium && (
                            <img
                                src={personDetails.image.medium}
                                alt={personDetails.name}
                            />
                        )}
                    </div>
                    <div className="show-details">
                        <p><strong>Birthday:</strong> {personDetails.birthday || 'Unknown'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TvMazePeopleResults;