import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TvMazePeopleGuestCast = ({ id }) => {
    const [guestCredits, setGuestCredits] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchGuestCredits = async () => {
            try {
                const response = await axios.get(`https://api.tvmaze.com/people/${id}/guestcastcredits?embed=episode`);

                // Process data to group by unique shows
                const groupedShows = {};
                const fetchShowImages = [];

                response.data.forEach((credit) => {
                    const showId = credit._embedded.episode._links.show.href.split('/').pop();
                    const showName = credit._embedded.episode._links.show.name;

                    if (!groupedShows[showId]) {
                        groupedShows[showId] = {
                            name: showName,
                            id: showId,
                            image: null, // Placeholder for image until we fetch it
                            character: credit._links.character ? credit._links.character.name : 'Unknown',
                            episodeCount: 1,
                        };

                        // Always fetch the show's image (default behavior)
                        fetchShowImages.push(showId);
                    } else {
                        groupedShows[showId].episodeCount += 1;
                    }
                });

                // Fetch show images
                const imageFetches = fetchShowImages.map(async (showId) => {
                    try {
                        const showResponse = await axios.get(`https://api.tvmaze.com/shows/${showId}`);
                        if (showResponse.data.image && showResponse.data.image.medium) {
                            groupedShows[showId].image = showResponse.data.image.medium;
                        } else {
                            groupedShows[showId].image = null; // Explicitly set to null if no image
                        }
                    } catch (err) {
                        console.error(`Error fetching image for show ${showId}`);
                        groupedShows[showId].image = null;
                    }
                });

                await Promise.all(imageFetches);

                setGuestCredits(Object.values(groupedShows));
                setError('');
            } catch (err) {
                setError('Error fetching guest cast credits. Please try again later.');
            }
        };

        fetchGuestCredits();
    }, [id]);

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (!guestCredits.length) {
        return <p>Loading guest credits...</p>;
    }

    return (
        <div className="cast-container">
            <h2 className="section-title">Guest Appearances</h2>
            <div className="cast-grid">
                {guestCredits.map((credit, index) => (
                    <div key={index} className="cast-member">
                        <h3>{credit.name}</h3>
                        {credit.image ? (
                            <img
                                src={credit.image}
                                alt={credit.name}
                                style={{ width: '100%', borderRadius: '5px' }}
                                loading="lazy"
                            />
                        ) : (
                            <p>No Image Available</p>
                        )}
                        <p>Role: {credit.character}</p>
                        <p>Episodes: {credit.episodeCount}</p>
                        <Link 
                            to={`/show/${credit.id}`}  
                            style={{
                                display: 'block', 
                                marginTop: '10px', 
                                fontSize: '0.9rem', 
                                color: '#0078d4', 
                                textDecoration: 'none'
                            }}
                        >
                            View Show Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TvMazePeopleGuestCast;