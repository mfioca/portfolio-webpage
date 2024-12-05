import React from 'react';
import './ai_showcase.css';
import TarotReader1 from './AI_showcase/tarot_reader_1.js';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; // Default styles for react-tabs

const AIShowcase = () => {
    return (
        
        <div className="ai-showcase-container">
            <h1>AI Showcase</h1>
            <Tabs>
                <TabList>
                    <Tab>Tarot Reader 1</Tab>
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
        
    );
};

export default AIShowcase;

