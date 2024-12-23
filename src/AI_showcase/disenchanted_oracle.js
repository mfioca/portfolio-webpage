import React from 'react';
import { DividerLine, ChatBubble } from '../SharedComponents.js'; 
import OracleData from './disenchanted_oracle.json';
import DisenchantedOraclePrompt from './disenchanted_oracle_prompt.js';


const DisenchantedOracle = () => {

    return (
        <div>
            <section className="Intro">
                <h2 className="shadow">Disenchanted Oracle Prompt</h2>
                <p>
                    Inspired by the Tarot Reader and Salesman prompt, I wanted to craft a unique MyChatGPT experience that I could share with others. By focusing on the character’s distinct personality and tarot-reading abilities, I refined the concept into a standalone, immersive chatbot. Stripping away the original sales-driven elements of the herbal remedy shop, I emphasized the sarcastic humor, whimsical storytelling, and insightful readings that make this oracle so captivating.  
                </p>
                <p>

                </p>
            </section>
            <DividerLine />
            <DisenchantedOraclePrompt />
            <DividerLine />
            <section className="Intro">
                <h2 className="shadow">Simulated Chat Conversation</h2>
                <p>
                    The chat box below shows an example of a chat simulation between a "customer" and the salesman.
                </p>
                <p>
                    The result is a highly engaging and entertaining bot that blends playful irreverence with thought-provoking tarot interpretations, offering users a truly one-of-a-kind interaction. Whether you’re seeking a peek into your future or just some lighthearted banter, the Disenchanted Oracle delivers an experience that’s as quirky as it is enlightening.
                </p>
            </section>
            <DividerLine />
            <ChatBubble data={OracleData} /> 
        </div>
    );
};

export default DisenchantedOracle;