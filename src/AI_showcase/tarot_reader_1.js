import React, { useState, useEffect, useCallback } from 'react';
import tarotData from './tarot_reader_1.json';
import TarotReaderPrompt from './tarot_reader_1_prompt.js';

const TarotReader1 = () => {

    const [messages] = useState(tarotData[0].messages);
    const [visibleCount, setVisibleCount] = useState(1); // Number of messages visible initially
    const [isHovered, setIsHovered] = useState(false); // Tracks if the mouse is hovering over the chat window

    const handleScroll = useCallback(
        (event) => {
            event.preventDefault(); // Prevent default scroll behavior

            const chatWindow = document.querySelector('.chat-window');
            if (!chatWindow) return;

            const { scrollTop, scrollHeight, clientHeight } = chatWindow;

            // Detect scroll direction
            const isScrollingDown = event.deltaY > 0;

            if (isScrollingDown) {
                if (scrollTop + clientHeight >= scrollHeight - 5) {
                    if (visibleCount < messages.length) {
                        setVisibleCount((prev) => prev + 1);
                    }
                }
                setTimeout(() => {
                    chatWindow.scrollTo({
                        top: chatWindow.scrollHeight,
                        behavior: 'smooth',
                    });
                }, 100);
            } else {
                if (scrollTop <= 5) {
                    if (visibleCount > 1) {
                        setVisibleCount((prev) => prev - 1);
                    }
                }
            }
        },
        [visibleCount, messages.length]
    );

    // In useEffect:
    useEffect(() => {
        const chatWindow = document.querySelector('.chat-window');
        if (!chatWindow) return;

        chatWindow.addEventListener('wheel', handleScroll);

        return () => chatWindow.removeEventListener('wheel', handleScroll);
    }, [isHovered, handleScroll]);

    return (
        <div className="ugh">
            <section className="title123">
                        <h2 className="shadow">System Engineering Prompt</h2>
                        <p>
                            This section demonstrates a structured engineering prompt designed to guide system development and interactions. It highlights OpenAI's capabilities in managing complex instructions with precision and clarity.
                        </p>
            </section>
            <hr style={{ 
                        width: '80%', 
                        margin: '10px auto', 
                        border: '1px solid #ccc', 
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' 
                    }} />
            <TarotReaderPrompt />
            <section className="title123">
                <h2 className="shadow">Simulated Chat Conversation</h2>
                <p>
                    This section showcases an interactive chat simulation, illustrating a dynamic exchange between the system and the user. It mimics real-time messaging for a seamless and intuitive conversational experience.
                </p>
            </section>
            <hr style={{ 
                        width: '80%', 
                        margin: '10px auto', 
                        border: '1px solid #ccc', 
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' 
                    }} />
            <div className="example-container">
            
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

export default TarotReader1;