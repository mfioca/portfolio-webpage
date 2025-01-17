import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TvMazePeopleCast = ({ id }) => {
    const [castCredits, setCastCredits] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCastCredits = async () => {
            try {
                const response = await axios.get(`https://api.tvmaze.com/people/${id}/castcredits?embed=show`);
                setCastCredits(response.data); // Save the cast credits information
                setError('');
            } catch (err) {
                setError('Error fetching cast credits. Please try again later.');
            }
        };

        fetchCastCredits();
    }, [id]);

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (!castCredits.length) {
        return <p>Loading cast credits...</p>;
    }

    return (
        <div className="cast-container">
            <h2 className="section-title">Cast Credits</h2>
            <div className="cast-grid">
                {castCredits.map((credit, index) => (
                    <div key={index} className="cast-member">
                        <h3>{credit._embedded.show.name}</h3>
                        {credit._embedded.show.image ? (
                            <img
                                src={credit._embedded.show.image.medium}
                                alt={credit._embedded.show.name}
                                style={{ width: '100%', borderRadius: '5px' }}
                                loading="lazy"
                            />
                        ) : (
                            <p>No Image Available</p>
                        )}
                        <p>Role: {credit._links.character ? credit._links.character.name : 'Unknown'}</p>
                        {credit._embedded.show.summary && (
                            <p>
                                <span dangerouslySetInnerHTML={{ __html: 
                                    credit._embedded.show.summary.length > 200 
                                        ? `${credit._embedded.show.summary.substring(0, 200)}... ` 
                                        : credit._embedded.show.summary 
                                }} />
                                {credit._embedded.show.summary.length > 200 && (
                                    <Link 
                                        to={`/show/${credit._embedded.show.id}`}  // Navigate to your own show details page
                                        style={{ color: '#0078d4', textDecoration: 'none', fontWeight: 'bold' }}
                                    >
                                        Read More
                                    </Link>
                                )}
                            </p>
                        )}
                        {credit._embedded.show.url && (
                            <a 
                                href={credit._embedded.show.url} // Direct link to TVMaze page
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
                                View More on TVMaze
                            </a>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TvMazePeopleCast;