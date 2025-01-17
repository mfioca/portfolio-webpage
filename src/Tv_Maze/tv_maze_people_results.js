import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { IntroSection, DividerLine } from '../SharedComponents.js';
import TvMazePeopleCast from './tv_maze_people_cast.js'
import TvMazePeopleGuestCast from './tv_maze_people_guestcast.js'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const TvMazePeopleResults = () => {
    const { id } = useParams(); // Get the person ID from the URL
    const [personDetails, setPersonDetails] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPersonDetails = async () => {
            try {
                const response = await axios.get(`https://api.tvmaze.com/people/${id}?embed=castcredits`);
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

    const calculateAge = (birthday) => {
        if (!birthday) return 'Unknown'; // Handle cases where no birthday is provided
    
        const birthDate = new Date(birthday);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
    
        // Adjust if the birthday hasn't occurred yet this year
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
    
        return age;
    };

    return (
        <div className="tvmaze-body">
            <IntroSection title="Discover Actors & Actresses">
                <p>
                    <strong className="shadow">Welcome to the People Details Page:</strong>&nbsp;&nbsp;Explore information about your favorite actors and actresses. 
                    This section provides basic details sourced from the extensive <a href="https://www.tvmaze.com/" target="_blank" rel="noopener noreferrer">TVmaze</a> database.
                </p>
            </IntroSection>
            <DividerLine />
            <h1 className="section-title">{personDetails.name}</h1>
            <div className="tvmaze-results">
                <div className="tvmaze-person-results">
                    <div className="main-info">
                        {personDetails.image && personDetails.image.original && (
                            <img
                                src={personDetails.image.original}
                                alt={personDetails.name}
                                loading="lazy"
                            />
                        )}
                    </div>
                    <div className="show-details">
                        <p><strong>Born in:</strong> {personDetails.country.name}</p>
                        <p><strong>Birthday:</strong> {personDetails.birthday || 'Unknown'}</p>
                        <p><strong>Age:</strong> {calculateAge(personDetails.birthday)}</p>
                        <p><strong>Number of Shows Featured In:</strong> {personDetails._embedded?.castcredits?.length || 0}</p>
                    </div>
                    
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
                        <Tab>Cast Credits</Tab>
                        <Tab>Guest Appearances</Tab>
                    </TabList>
                    <TabPanel>
                        <TvMazePeopleCast id={personDetails.id} />
                    </TabPanel>
                    <TabPanel>
                        <TvMazePeopleGuestCast id={personDetails.id} />
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default TvMazePeopleResults;