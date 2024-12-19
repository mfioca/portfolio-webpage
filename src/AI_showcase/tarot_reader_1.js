import React from 'react';
import { DividerLine, ChatBubble } from '../SharedComponents.js'; 
import tarotData from './tarot_reader_1.json';
import TarotReaderPrompt1 from './tarot_reader_1_prompt.js';


const TarotReader1 = () => {

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
            <ChatBubble data={tarotData} /> 
        </div>
    );
};

export default TarotReader1;