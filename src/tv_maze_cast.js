import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TvMazeCast = ({ id }) => {
    const [cast, setCast] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCast = async () => {
            try {
                const response = await axios.get(`https://api.tvmaze.com/shows/${id}/cast`);
                setCast(response.data); // Save the cast information
                setError('');
            } catch (err) {
                setError('Error fetching cast information. Please try again later.');
            }
        };

        fetchCast();
    }, [id]);

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (!cast.length) {
        return <p>Loading cast information...</p>;
    }

    return (
        <div className="cast-container">
            <h2>Cast</h2>
            <div className="cast-grid">
                {cast.map((person, index) => (
                    <div key={index} className="cast-member">
                        <h3>{person.person.name}</h3>
                        {person.person.image ? (
                            <img
                                src={person.person.image.medium}
                                alt={person.person.name}
                                style={{ width: '100%', borderRadius: '5px' }}
                            />
                        ) : (
                            <p>No Image Available</p>
                        )}
                        <p>As: {person.character.name}</p>
                        {person.person.url && (
                            <a 
                                href={person.person.url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                style={{
                                display: 'block', 
                                marginTop: '10px', 
                                fontSize: '0.9rem', 
                                color: '#0078d4', 
                                textDecoration: 'none'
                                }}
                            >
                                View on TVmaze
                            </a>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TvMazeCast;