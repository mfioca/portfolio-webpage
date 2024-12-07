import React from 'react';
import './ai_showcase.css';
import { DividerLine } from './SharedComponents.js'; 
import TarotReader1 from './AI_showcase/tarot_reader_1.js';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; // Default styles for react-tabs

const AIShowcase = () => {
    return (
        <div className="ai-body">
            <div className="intro">
                <h1 className="shadow">AI Showcase</h1>
                <p><strong className="shadow">About This Web Page:</strong>&nbsp;&nbsp;The AI Showcase serves as a demonstration of advanced prompt engineering and AI collaboration 
                    techniques. This page highlights a curated collection of interactive conversations designed to showcase the power of OpenAI’s language models when combined with 
                    creative and technical expertise. Each example illustrates unique prompts, custom-tailored to generate engaging, insightful, and dynamic interactions.
                </p>
                <p>
                    By exploring this page, you’ll gain insight into how carefully crafted prompts can shape AI behavior, enabling applications in storytelling, education, 
                    decision support, and more. The AI Showcase is not just a testament to the potential of AI but also a reflection of the innovative approaches used to push 
                    its boundaries.
                </p>
            </div>
            <DividerLine />
            <div className="ai-showcase-container">
                <Tabs>
                    <TabList>
                        <Tab>Tarot Reader / Salesman</Tab>
                        <Tab>Placeholder 1</Tab>
                        <Tab>Placeholder 2</Tab>
                    </TabList>
                    <TabPanel>
                        <TarotReader1 />
                    </TabPanel>
                    <TabPanel>
                        <div>
                            <h2>Placeholder Example 1</h2>
                            <p>This is a placeholder for another AI example.</p>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div>
                            <h2>Placeholder Example 2</h2>
                            <p>This is a placeholder for a different AI example.</p>
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default AIShowcase;

