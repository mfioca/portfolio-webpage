import React, { useState, useEffect, useCallback, useRef } from 'react';
import { DividerLine } from '../SharedComponents.js'; 
import tarotData from './tarot_reader_1.json';
import TarotReaderPrompt1 from './tarot_reader_1_prompt.js';

const TarotReader1 = () => {

    const [title] = useState(tarotData[0].title);
    const [messages] = useState(tarotData[0].messages);
    const [visibleCount, setVisibleCount] = useState(1); // Number of messages visible initially
        const [isHovered, setIsHovered] = useState(false); // Tracks if the mouse is hovering over the chat window
        const chatWindowRef = useRef(null);
    
        const handleScroll = useCallback(
            (event) => {
              const chatWindow = document.querySelector('.chat-window');
              if (!chatWindow) return;
          
              const { scrollTop, scrollHeight, clientHeight } = chatWindow;
          
              const isScrollingDown = event.deltaY > 0;
          
              if (isScrollingDown) {
                // Only trigger "Next Message" logic if scrolling down and at the bottom
                const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
          
                if (isAtBottom && visibleCount < messages.length) {
                  event.preventDefault(); // Prevent default only when scrolling down at the bottom
                  setVisibleCount((prev) => prev + 1);
                  setTimeout(() => {
                    chatWindow.scrollTo({
                      top: chatWindow.scrollHeight,
                      behavior: 'smooth',
                    });
                  }, 0);
                }
              }
              // Remove scroll-up logic to allow normal scrolling without hiding messages
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
                    This prompt creates a burnt out salesman working in a herb shop that also provides tarot card reading.  
                </p>
            </section>
            <DividerLine />
            <TarotReaderPrompt1 />
            <DividerLine />
            <section className="Intro">
                <h2 className="shadow">Simulated Chat Conversation</h2>
                <p>
                    The chat box below shows an example of a chat simulation between a "customer" and the salesman.
                </p>
                <p>
                    You can hover over the chat box and scroll with your mouse wheel or use the "next Message" button below.
                </p>
            </section>
            <DividerLine />
            <div className="example-container">
                <h2 >{title}</h2> 
                <div
                    className="chat-window"
                    ref={chatWindowRef}
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