import React from 'react';
import { DividerLine, ChatBubble } from '../SharedComponents.js'; 
import developer2Data from './developer_2.0.json';
import Developer2Prompt from './developer_2.0_prompt.js';

const DeveloperV2 = () => {

    return (
        <div>
            <section className="Intro">
                <h2 className="shadow">Developer Assistant "Tank" Prompt</h2>
                <p>
                    The Developer v2 prompt builds on the foundation of its predecessor, which is also available for viewing on this page. This updated version was meticulously refined to better reflect my communication style and systematic approach, providing enhanced support for technical projects. The v2 prompt introduces a comprehensive talk track, offering structured guidelines for how-to instructions, troubleshooting scenarios, and casual conversational interactions. These improvements make the v2 prompt more versatile and effective, ensuring a seamless and collaborative user experience.    
                </p>
            </section>
            <DividerLine />
            <Developer2Prompt />
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
            <ChatBubble data={developer2Data} /> 
        </div>
    );
};

export default DeveloperV2;