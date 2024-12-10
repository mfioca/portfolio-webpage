import React, { useState, useEffect, useCallback } from 'react';
import { DividerLine } from '../SharedComponents.js'; 
import developerData from './developer_2.0.json';
import DeveloperPrompt from './developer_2.0_prompt.js';

const DeveloperV2 = () => {

    const [messages] = useState(developerData[0].messages);
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
        <div>
            <section className="Intro">
                <h2 className="shadow">System Engineering Prompt</h2>
                <p>
                    The Developer v2 prompt builds on the foundation of its predecessor, which is also available for viewing on this page. This updated version was meticulously refined to better reflect my communication style and systematic approach, providing enhanced support for technical projects. The v2 prompt introduces a comprehensive talk track, offering structured guidelines for how-to instructions, troubleshooting scenarios, and casual conversational interactions. These improvements make the v2 prompt more versatile and effective, ensuring a seamless and collaborative user experience.    
                </p>
            </section>
            <DividerLine />
            <DeveloperPrompt />
            <DividerLine />
            <section className="Intro">
                <h2 className="shadow">Simulated Chat Conversation</h2>
                <p>
                    The chat box below highlights the testing phases conducted to refine and finalize the new version before its publication.
                </p>
                <p>
                    You can hover over the chat box and scroll with your mouse wheel or use the "next Message" button below.
                </p>
            </section>
            <DividerLine />
            <div className="example-container">
                <div
                    className="chat-window"
                    onMouseEnter={() => setIsHovered(true)} // Activate hover state
                    onMouseLeave={() => setIsHovered(false)} // Deactivate hover state
                >
                    {messages.slice(0, visibleCount).map((msg, index) => (
                        <div
                            key={index}
                            className={`chat-bubble ${msg.sender === 'assistant' ? 'user-bubble' : 'ai-bubble'}`}
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

export default DeveloperV2;