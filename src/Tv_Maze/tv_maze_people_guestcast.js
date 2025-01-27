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
                    const airdate = credit._embedded.episode.airdate || '9999-12-31'; // Default far future date for sorting

                    if (!groupedShows[showId]) {
                        groupedShows[showId] = {
                            name: showName,
                            id: showId,
                            image: null, // Placeholder for image until fetched
                            character: credit._links.character ? credit._links.character.name : 'Unknown',
                            episodeCount: 1,
                            earliestPremiere: airdate, // Store the earliest premiere date
                        };

                        // Always fetch the show's image (default behavior)
                        fetchShowImages.push(showId);
                    } else {
                        groupedShows[showId].episodeCount += 1;
                        // Update to ensure we store the **earliest** airdate
                        if (airdate < groupedShows[showId].earliestPremiere) {
                            groupedShows[showId].earliestPremiere = airdate;
                        }
                    }
                });

                // Fetch show images
                const imageFetches = fetchShowImages.map(async (showId) => {
                    try {
                        const showResponse = await axios.get(`https://api.tvmaze.com/shows/${showId}`);
                        
                        if (showResponse.data.image && showResponse.data.image.medium) {
                            groupedShows[showId].image = showResponse.data.image.medium;
                        } else {
                            groupedShows[showId].image = null;
                        }
                
                        // Fetch and store the summary
                        groupedShows[showId].summary = showResponse.data.summary ? showResponse.data.summary : 'No summary available.';
                    } catch (err) {
                        console.error(`Error fetching details for show ${showId}`);
                        groupedShows[showId].image = null;
                        groupedShows[showId].summary = 'No summary available.';
                    }
                });

                await Promise.all(imageFetches);

                // Convert groupedShows object to an array and sort by **earliest premiere date**
                setGuestCredits(
                    Object.values(groupedShows).sort((a, b) => {
                        return new Date(b.earliestPremiere || '9999-12-31') - new Date(a.earliestPremiere || '9999-12-31');
                    })
                );

                setError('');
            } catch (err) {
                setError('Error fetching guest cast credits. Please try again later.');
            }
        };

        fetchGuestCredits();
    }, [id]);

    if (error) {
        return <p style={{ color: 'red' }}>{ error }</p>;
    }

    if (!guestCredits.length) {
        return <p>Loading guest credits...</p>;
    }

    return (
        <div className="box-background  border cast-container">
            <h2 className="section-title">Guest Appearances</h2>
            <div className="flex-wrap cast-grid">
                { guestCredits.map((credit, index) => (
                    <div key={ index } className="box-style cast-member">
                        <h3>{ credit.name }</h3>
                        { credit.image ? (
                            <img
                                src={ credit.image }
                                alt={ credit.name }
                                style={{ width: '100%', borderRadius: '5px' }}
                                loading="lazy"
                            />
                        ) : (
                            <p>No Image Available</p>
                        )}
                        <p><strong>Role:</strong> { credit.character }</p>
                        <p><strong>Episodes:</strong> { credit.episodeCount }</p>
                        <p><strong>First Appearance:</strong> { credit.earliestPremiere !== '9999-12-31' ? credit.earliestPremiere : 'Unknown' }</p>
                        <p>
                            <strong>Summary:</strong>&nbsp;
                            <span dangerouslySetInnerHTML={{ __html: 
                                credit.summary.length > 200 
                                    ? `${credit.summary.substring(0, 200)}... ` 
                                    : credit.summary 
                            }} />
                            { credit.summary.length > 200 && (
                                <Link 
                                    to={`/show/${ credit.id }`}  
                                    style={{ color: '#0078d4', textDecoration: 'none', fontWeight: 'bold' }}
                                >
                                    Read More
                                </Link>
                            )}
                        </p>
                        <a 
                            href={ `https://www.tvmaze.com/shows/${credit.id}` }  
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
                            View on TVMaze
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TvMazePeopleGuestCast;