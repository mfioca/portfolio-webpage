import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from React Router
import { DividerLine, IntroSection } from './SharedComponents.js';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './Tv_Maze/tv_maze.css';


const fetchTvMazeData = async ( searchTerm, searchType, setResults, setError ) => {
    if (!searchTerm.trim()) {
        setError('Please enter a valid search term.');
        setResults([]);
        return;
    }

    try {
        const sanitizedSearchTerm = searchTerm.replace(/[^a-zA-Z0-9 ]/g, '').trim();
        const response = await axios.get(
            `https://api.tvmaze.com/search/${searchType}?q=${encodeURIComponent(sanitizedSearchTerm)}`
        );

        const results = response.data.map((item) => ({
            id: searchType === "shows" ? item.show.id : item.person.id,
            name: searchType === "shows" ? item.show.name : item.person.name,
            image: searchType === "shows"
                ? item.show.image
                    ? item.show.image.medium || item.show.image.original
                    : null
                : item.person.image
                    ? item.person.image.medium || item.person.image.original
                    : null,
            link: searchType === "shows"
                ? `/show/${item.show.id}`
                : `/person/${item.person.id}`,
        }));

        setResults(results);
        setError('');
    } catch (err) {
        setError('Error fetching data. Please try again later.');
        setResults([]);
    }
};

const TvMaze = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]); // Generic state for both shows and people
    const [error, setError] = useState('');

    return (
        <div className="tvmaze-body">
            <IntroSection title="TV Show Explorer">
                <p>
                    <strong className="shadow">About This Web Page:</strong>&nbsp;&nbsp;The TV Show Explorer allows users to search for and discover information about their favorite TV shows, 
                    leveraging data from the <a href="https://www.tvmaze.com/" target="_blank" rel="noopener noreferrer">TVmaze</a> database. This feature showcases the integration of third-party 
                    APIs into a React-based web application, demonstrating seamless interaction between front-end design and dynamic data sources.
                </p>
                <p>
                    TVmaze provides a rich repository of TV show data, and this page highlights its capabilities by enabling users to explore show summaries, details, and links. The goal is to 
                    deliver an intuitive and engaging experience, blending technical functionality with a clean and accessible design.
                </p>
            </IntroSection>
            <DividerLine />
            {/* Tabs Section for Show and Person Search */}
            <div className="tvmaze-tabs-container">
                <Tabs
                    onSelect={() => setSearchTerm('')} // Clear searchTerm on tab change
                >
                    <TabList>
                        <Tab>TV Show Search</Tab>
                        <Tab>Person Search</Tab>
                    </TabList>
                    {/* TV Show Search Panel */}
                    <TabPanel>
                        <div className="tvmaze-search">
                            <h1>TV Show Search</h1>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                fetchTvMazeData(searchTerm, "shows", setResults, setError);
                            }}>
                                <input
                                    type="text"
                                    placeholder="Search for a TV show..."
                                    value={ searchTerm }
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    aria-label="Search for a TV show"
                                />
                                <button type="submit">Search</button>
                            </form>
                            { error && <p style={{ color: 'red' }}>{ error }</p> }
                        </div>
                        <div>
                            { results.length > 0 ? (
                                <div className="box-background tvmaze-search-results">
                                    { results.map((item) => (
                                        <div key={ item.id } className="result-box">
                                            <h3>{ item.name }</h3>
                                            { item.image ? (
                                                <img src={ item.image } alt={ item.name } style={{ width: '100%', borderRadius: '5px' }} />
                                            ) : (
                                                <p>No Image Available</p>
                                            )}
                                            {/* Use Link to navigate to the details page */}
                                            <Link to={item.link}>View Details</Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="tvmaze-search-placeholder">
                                    <p>No results found. Try entering a search.</p>
                                </div>
                            )}
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="tvmaze-search">
                            <h1>Person Search</h1>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                fetchTvMazeData(searchTerm, "people", setResults, setError);
                            }}>
                                <input
                                    type="text"
                                    placeholder="Search for a person..."
                                    value={ searchTerm }
                                    onChange={ (e) => setSearchTerm(e.target.value) }
                                    aria-label="Search for a person"
                                />
                                <button type="submit">Search</button>
                            </form>
                            { error && <p style={{ color: 'red' }}>{ error }</p> }
                        </div>
                        <div>
                            { results.length > 0 ? (
                                <div className="box-background tvmaze-search-results">
                                    { results.map((item) => (
                                        <div key={ item.id } className="result-box">
                                            <h3>{ item.name }</h3>
                                            { item.image ? (
                                                <img src={ item.image } alt={ item.name } style={{ width: '100%', borderRadius: '5px' }} />
                                            ) : (
                                                <p>No Image Available</p>
                                            )}
                                            {/* Use Link to navigate to the person's details page */}
                                            <Link to={ item.link }>View Details</Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="tvmaze-search-placeholder">
                                    <p>No results found. Try entering a search.</p>
                                </div>
                            )}
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default TvMaze;