import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; // Default styling for react-tabs
import TvMazeCast from './tv_maze_cast';
import TvMazeEpisodes from './tv_maze_episodes';

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
        <div className="tvmaze-body">
            <div
                style={{
                    textAlign: 'center',
                    margin: '20px auto',
                    padding: '15px',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    backgroundColor: '#f9f9f9',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    fontFamily: "'Courier New', monospace",
                    color: '#333',
                }}
            >
                <h2 style={{ color: '#0078d4', marginBottom: '10px' }}>Page Under Construction</h2>
                <p style={{ fontSize: '1rem', lineHeight: '1.5' }}>
                    We’re still building out this section. Please check back soon for more details!
                </p>
            </div>
            <h1>{showDetails.name}</h1>
        <div className="tvmaze-results-wrapper">
            <div className="main-info">
                {showDetails.image && showDetails.image.original && (
                    <img
                        src={showDetails.image.original}
                        alt={showDetails.name}
                    />
                )}
            </div>
            <div className="show-details-extra">
                <p><strong>Language:</strong> {showDetails.language || 'N/A'}</p>
                <p><strong>Type:</strong> {showDetails.type || 'N/A'}</p>
                <p><strong>Genres:</strong> {showDetails.genres.length > 0 ? showDetails.genres.join(', ') : 'N/A'}</p>
                <p><strong>Network:</strong> {showDetails.network ? `${showDetails.network.name} (${showDetails.network.country.code})` : 'N/A'}</p>
                <p><strong>Premiered:</strong> {showDetails.premiered || 'N/A'}</p>
                <p><strong>Ended:</strong> {showDetails.ended || 'N/A'}</p>
                {showDetails.url && (
                    <p>
                        More details at: <a href={showDetails.url} target="_blank" rel="noopener noreferrer">{showDetails.url}</a>
                    </p>
                )}
            </div>
            <div className="show-summary">
                <h2>Summary</h2>
                <p dangerouslySetInnerHTML={{ __html: showDetails.summary || 'No summary available.' }} />
            </div>
            </div>
            <div className="tabs-container">
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
                        <TvMazeCast id={id} />
                    </TabPanel>
                    <TabPanel>
                        <TvMazeEpisodes showId={id} />
                    </TabPanel>
                </Tabs>
            </div>
        </div>
        
    );
};

export default TvMazeResults;