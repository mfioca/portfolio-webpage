import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from React Router
import { DividerLine } from './SharedComponents.js';
import './Tv_Maze/tv_maze.css';

const TvMaze = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [shows, setShows] = useState([]);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault(); // Prevent default form submission

        const sanitizedSearchTerm = searchTerm.replace(/[^a-zA-Z0-9 ]/g, '').trim();

        if (!sanitizedSearchTerm) {
            setError('Please enter a valid search term.');
            setShows([]);
            return;
        }

        try {
            const response = await axios.get(
                `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(sanitizedSearchTerm)}`
            );

            const results = response.data.map((item) => ({
                id: item.show.id, // Include the ID for routing
                name: item.show.name,
                image: item.show.image
                    ? item.show.image.medium || item.show.image.original
                    : null,
                link: `/show/${item.show.id}`, // Create a dynamic route link
            }));

            setShows(results);
            setError('');
        } catch (err) {
            setError('Error fetching data. Please try again later.');
            setShows([]);
        }
    };

    return (
        <div className="tvmaze-body">
            <div className="Intro">
                <h1 className="shadow">TV Show Explorer</h1>
                <p>
                    <strong className="shadow">About This Web Page:</strong>&nbsp;&nbsp;The TV Show Explorer allows users to search for and discover information about their favorite TV shows, 
                    leveraging data from the <a href="https://www.tvmaze.com/" target="_blank" rel="noopener noreferrer">TVmaze</a> database. This feature showcases the integration of third-party 
                    APIs into a React-based web application, demonstrating seamless interaction between front-end design and dynamic data sources.
                </p>
                <p>
                    TVmaze provides a rich repository of TV show data, and this page highlights its capabilities by enabling users to explore show summaries, details, and links. The goal is to 
                    deliver an intuitive and engaging experience, blending technical functionality with a clean and accessible design.
                </p>
            </div>
            <DividerLine />
            <div className="tvmaze-search">
                <h1>TV Show Search</h1>
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Search for a TV show..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        aria-label="Search for a TV show"
                    />
                    <button type="submit">Search</button>
                </form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
            <div className="tvmaze-search-results">
            {shows.length > 0 ? (
                shows.map((show) => (
                    <div key={show.id} className="result-box">
                        <h3>{show.name}</h3>
                        {show.image ? (
                            <img src={show.image} alt={show.name} style={{ width: '100%', borderRadius: '5px' }} />
                        ) : (
                            <p>No Image Available</p>
                        )}
                        {/* Use Link to navigate to the details page */}
                        <Link to={show.link}>View Details</Link>
                    </div>
                ))
            ) : (
                <div className="tvmaze-search-placeholder">
                    <p>No results found. Try searching for a TV show!</p>
                </div>
            )}
            </div>
        </div>
    );
};

export default TvMaze;