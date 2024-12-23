import React  from 'react';
import { DividerLine, ChatBubble } from '../SharedComponents.js'; 
import developerData from './developer.json';
import DeveloperPrompt from './developer_prompt.js';




const Developer = () => {
  
    return (
        <div>
            <section className="Intro">
                <h2 className="shadow">Developer Assistant Prompt</h2>
                <p>
                    This prompt was meticulously crafted to reflect my communication style and systematic thinking, aiming to provide tailored support for technical projects. As part of an innovative approach, I incorporated examples of negative and positive reinforcement through the use of “Negative.pdf” and “Positive.pdf” files, intending to help the system learn my preferences and expectations. Additionally, detailed troubleshooting instructions were included to facilitate effective technical problem-solving. Unfortunately, this model did not meet the intended guidelines, requiring more effort to correct its responses than to utilize its assistance effectively.    
                </p>
            </section>
            <DividerLine />
            <DeveloperPrompt />
            <DividerLine />
            <section className="Intro">
                <h2 className="shadow">Simulated Chat Conversation</h2>
                <p>
                    The chat box below showcases highlights of the successful collaboration with the model during the development of this web page.
                </p>
                <p>
                    You can hover over the chat box and scroll with your mouse wheel or use the "next Message" button below.
                </p>
            </section>
            <DividerLine />
            <ChatBubble data={developerData} /> 
        </div>
    );
};

export default Developer;