import React, { useState, useEffect  } from 'react';
import './SharedComponents.css';





export const DividerLine = ({ width = '80%' }) => {
    return <hr className="divider-line" style={{ width }} />;
};



export const WindowWidthDisplay = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div style={{
            width: `${window.innerWidth - 50}px`, // Dynamically set width to the window's width minus 10px
            margin: 'auto',
            border: '2px solid black', // Adds a black border with a thickness of 2px
            textAlign: 'center', // Center-align the text inside the div
            padding: '10px' // Add padding for better spacing
        }}>
            <p>{`Window width: ${windowWidth}px`}</p>
        </div>
    );
};







