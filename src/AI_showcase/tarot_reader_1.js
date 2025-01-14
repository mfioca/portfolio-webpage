import React from 'react';
import { DividerLine, ChatBubble, IntroSection } from '../SharedComponents.js'; 
import tarotData from './tarot_reader_1.json';
import TarotReaderPrompt1 from './tarot_reader_1_prompt.js';


const TarotReader1 = () => {

    return (
        <div>
            <IntroSection title="Tarot Reader and Herb salesman Prompt">
                <p>
                    Inspired by my brother’s support in learning AI prompt engineering, I decided to build upon one of his examples: a Tarot Reader. This prompt features a sarcastic, burnt-out reader who works in a whimsical herbal remedy shop. What sets this character apart is their unique approach to delivering readings—they blend sharp, irreverent humor with a playful, child-like fairy-tale storytelling style.  
                </p>
                <p>
                    The result is a reading that’s as entertaining as it is insightful, with the reader crafting whimsical tales for each card drawn, all while maintaining their jaded, no-nonsense attitude. This project pushed my skills in blending storytelling, humor, and interactive design, proving that even a disenchanted oracle can create a truly magical experience.
                </p>
            </IntroSection>
            <DividerLine />
            <TarotReaderPrompt1 />
            <DividerLine />
            <IntroSection title="Simulated Chat Conversation">
                <p>
                    The chat box below shows an example of a chat simulation between a "customer" and the salesman.
                </p>
                <p>
                    You can hover over the chat box and scroll with your mouse wheel or use the "next Message" button below.
                </p>
            </IntroSection>
            <DividerLine />
            <ChatBubble data={tarotData} /> 
        </div>
    );
};

export default TarotReader1;