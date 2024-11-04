import React, { useState, useEffect } from 'react';
import './About.css'; // Importing the CSS for styling



const quotes = [
    "The only way to do great work is to love what you do. – Steve Jobs",
    "Life is what happens when you’re busy making other plans. – John Lennon",
    "The purpose of our lives is to be happy. – Dalai Lama",
    "Get busy living or get busy dying. – Stephen King",
    "You have within you right now, everything you need to deal with whatever the world can throw at you. – Brian Tracy",
    "I think that the chances of finding out what's actually going on are so absurdly remote that the only thing to do is to say, 'Hang the sense of it,' and keep yourself busy. I'd much rather be happy than right any day. – The Hitchhiker's Guide to the Galaxy",
    "If life is going to exist in a Universe of this size, then the one thing it cannot afford to have is a sense of proportion. - The Hitchhiker's Guide to the Galaxy"
];

const ScrollingQuotes = () => {
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
        }, 10000); // Change quote every 3 seconds

        return () => clearInterval(intervalId); // Clear interval on component unmount
    }, []);

    return (
        <div className="scrolling-quotes">
            <p>{quotes[currentQuoteIndex]}</p>
        </div>
    );
};

const About = () => {
    return (
        <div className="about-container">
            <h1 className="about-title">About Me</h1>
            <div className="about-section">
                <h2>Personal Information</h2>
                <p>
                    I am a movie, sci-fi, and overall tech geek who always seeks out new and interesting things to experience and learn. 
                    I strive to keep an open mind on everything because you never know what kind of hidden truths await those who pay attention.
                </p>
            </div>

            <div className="about-section">
                <h2>Background</h2>
                <p>
                    I have lived in Pennsylvania, Alaska, and Georgia. While in Alaska, I expanded my experiences by joining the local Paranormal Investigation group I.O.P.I.A. 
                    I have investigated different places and have seen unforgettable things, which helped me expand my knowledge in various fields.
                </p>
            </div>

            <div className="about-section">
                <h2>Skills</h2>
                <ul>
                    <li>Data Analysis</li>
                    <li>UI Design and Development</li>
                    <li>Audio and Video Editing</li>
                    <li>Research and Investigation</li>
                </ul>
            </div>

            <div className="about-section">
                <h2>Interests</h2>
                <p>
                    My interests range from historical facts behind theories expressed in media to UI design and programming. 
                    I enjoy exploring how technology impacts our lives and finding creative ways to enhance user experiences.
                </p>
            </div>
            <div className="about-section">
                <h2>Computers and UI Design</h2>
                <p>
                    I first developed my interest in UI design when converting back to a Windows machine from a Mac.
                    I did not like how Windows was set up and strived to make my desktop look and act more like OSX.
                    I learned about a program called Rainmeter and expanded my knowledge in programming, developing my first
                    full custom UI theme through this program. My Rainmeter theme is available 
                    <a href="https://www.deviantart.com/franknmullet/art/Skyrim-Theme-1-0-651760185" 
                        target="_blank" rel="noopener noreferrer" 
                        className="text-body"> here 
                    </a> 
                    to download through DeviantArt.
                </p>
            </div>
            <div className="about-section">
    <h2>Projects</h2>
    <ul>
        <li>
            <strong>Dungeons & Dragons Battle Simulator</strong>: A web-based simulator for D&D battles, utilizing React and Redux for state management.
        </li>
        <li>
            <strong>Data Analytics Dashboard</strong>: An interactive dashboard for visualizing time log data, built with React, Chart.js, and Redux.
        </li>
        {/* Add more projects as needed */}
    </ul>
</div>
<div className="about-section">
    <h2>Quotes</h2>
    <ScrollingQuotes /> {/* Display the scrolling quotes */}
</div>
        </div>
        
    );
};

export default About;


