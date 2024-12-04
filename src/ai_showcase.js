

import React, { useState, useEffect, useCallback } from 'react';
import './ai_showcase.css';

const AIShowcase = () => {
    const [messages] = useState([
        { sender: 'user', text: 'What can this site do?' },
        { sender: 'ai', text: 'This site demonstrates how AI and React can create interactive web applications.' },
        { sender: 'user', text: 'Who built it?' },
        { sender: 'ai', text: 'It was built by a developer with support from ChatGPT for coding and problem-solving.' },
        { sender: 'user', text: 'Can I learn React too?' },
        { sender: 'ai', text: 'Of course! React is a great framework for building interactive web applications.' }
    ]);

    const [visibleCount, setVisibleCount] = useState(1); // Number of messages visible initially
    const [isHovered, setIsHovered] = useState(false); // Tracks if the mouse is hovering over the chat window

    // Handle progression to reveal or reset messages
    const handleScroll = useCallback(
        (event) => {
            if (!isHovered) return; // Ensure the logic runs only when hovering
    
            event.preventDefault(); // Stop default page scroll behavior
            if (event.deltaY > 0 && visibleCount < messages.length) {
                setVisibleCount((prev) => prev + 1);
            } else if (event.deltaY < 0 && visibleCount > 1) {
                setVisibleCount((prev) => prev - 1);
            }
        },
        [isHovered, visibleCount, messages.length] // Dependencies required for the function
    );

    // Add event listener for scroll
    useEffect(() => {
        const chatWindow = document.querySelector('.chat-window');
        if (!chatWindow) return;

        const attachListener = (e) => handleScroll(e);

        if (isHovered) {
            chatWindow.addEventListener('wheel', attachListener);
        } else {
            chatWindow.removeEventListener('wheel', attachListener);
        }

        return () => chatWindow.removeEventListener('wheel', attachListener);
    }, [isHovered, handleScroll]); // Effect runs when hover state changes

    return (
        <div className="ugh">
            <div className="ai-showcase-container">
                <div
                    className="chat-window"
                    onMouseEnter={() => setIsHovered(true)} // Activate hover state
                    onMouseLeave={() => setIsHovered(false)} // Deactivate hover state
                >
                    {messages.slice(0, visibleCount).map((msg, index) => (
                        <div
                            key={index}
                            className={`chat-bubble ${msg.sender === 'user' ? 'user-bubble' : 'ai-bubble'}`}
                        >
                            {msg.text}
                        </div>
                    ))}
                </div>
                <div className="button-container">
                    {visibleCount < messages.length ? (
                        <button className="next-message-btn" onClick={() => setVisibleCount((prev) => prev + 1)}>
                            Next Message
                        </button>
                    ) : (
                        <button className="reset-message-btn" onClick={() => setVisibleCount(1)}>
                            Reset Chat
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AIShowcase;

