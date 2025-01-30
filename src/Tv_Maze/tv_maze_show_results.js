import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { DividerLine, IntroSection } from '../SharedComponents.js';
import 'react-tabs/style/react-tabs.css'; // Default styling for react-tabs
import TvMazeCast from './tv_maze_cast.js';
import TvMazeEpisodes from './tv_maze_episodes.js';

const TvMazeShowResults = () => {
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
        return <p style={{ color: 'red' }}>{ error }</p>;
    }

    if (!showDetails) {
        return <p>Loading...</p>;
    }

    return (
        <div className="tvmaze-body">
            <IntroSection title="Explore Your Favorite TV Shows">
                <p>
                    <strong className="shadow">Welcome to the Show Details Page:</strong>&nbsp;&nbsp;Dive deeper into the world of your favorite TV shows. Here you’ll find detailed 
                    information about casts, episodes, seasons, and more, all sourced from the incredible database at <a href="https://www.tvmaze.com/" target="_blank" rel="noopener noreferrer">TVmaze</a>. Whether you're curious about episode summaries or want to explore a show's rich history, this page has you covered.
                </p>
                <p>
                    This section is designed to be an immersive experience, bringing together clean design and the power of real-time data. Stay tuned as we continue to enhance and expand these features for even more functionality!
                </p>
            </IntroSection>
            <DividerLine />
            <h1 className="section-title">{ showDetails.name }</h1>
            <div className="box-background border flex-wrap tvmaze-results">
                    <div className="flex-column main-info">
                        { showDetails.image && showDetails.image.original && (
                            <img
                                src={ showDetails.image.original }
                                alt={ showDetails.name }
                                loading="lazy"
                            />
                        )}
                    </div>
                    <div className="box-style extra-details">
                        <p><strong>Language:</strong> { showDetails.language || 'N/A' }</p>
                        <p><strong>Type:</strong> { showDetails.type || 'N/A' }</p>
                        <p><strong>Genres:</strong> { showDetails.genres.length > 0 ? showDetails.genres.join(', ') : 'N/A' }</p>
                        <p><strong>Country:</strong> {showDetails.network?.country?.name || showDetails.webChannel?.country?.name || 'N/A'}</p>
                        <p><strong>Network:</strong> { showDetails.network ? `${ showDetails.network.name } (${ showDetails.network.country.code })` : 'N/A' }</p>
                        <p><strong>Premiered:</strong> { showDetails.premiered || 'N/A' }</p>
                        <p><strong>Ended:</strong> { showDetails.ended || 'N/A' }</p>
                        { showDetails.url && (
                            <p>
                                More details at: <a href={ showDetails.url } target="_blank" rel="noopener noreferrer">Tvmaze.com</a>
                            </p>
                        )}
                    </div>
                    <div className="show-summary">
                        <h2>Summary</h2>
                        <p dangerouslySetInnerHTML={{ __html: showDetails.summary || 'No summary available.' }} />
                    </div>
            </div>
            <div className="results-tabs-container">
                <Tabs
                    forceRenderTabPanel
                    onSelect={(index) => {
                        // Log the selected tab index if needed
                        console.log('Selected tab:', index);
                    }}
                >
                    <TabList>
                        <Tab>Cast</Tab>
                        <Tab>Episodes</Tab>
                    </TabList>
                    <TabPanel>
                        <TvMazeCast id={ id } />
                    </TabPanel>
                    <TabPanel>
                        <TvMazeEpisodes showId={ id } />
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default TvMazeShowResults;