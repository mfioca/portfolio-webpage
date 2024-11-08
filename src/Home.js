import React from 'react';
import './App.css';

const Home = () => {
    return (
        <div className="home-body">
            <h1>Welcome to to my home page</h1>
            <p>This is the home page. Navigate to the dashboard to see your data visualizations.</p>


            <div className="profile-container">
    <div className="profile-photo">
        {/* Placeholder for your photo */}
        <img src="path/to/your/photo.jpg" alt="Your Name" />
    </div>
    <div className="profile-content">
        <h2>Professional Profile</h2>
        <p>
            With over 20 years across diverse industries, I bring a balanced blend of analytical rigor and collaborative leadership to every role. 
            Known for my precision, integrity, and dedication to detail, I’m deeply motivated by the potential for data-driven solutions to streamline 
            processes and support effective decision-making. My colleagues often describe me as adaptable and reliable, someone who can be counted on 
            for consistency and excellence, whether working independently or as part of a team. My work philosophy is grounded in integrity, 
            continuous learning, and a commitment to completing every task the right way.
        </p>
        <p>
            My career has been marked by an ability to translate complex data into actionable insights, always with a focus on optimizing efficiency 
            and compliance. I excel in developing custom reports, auditing data for accuracy, and implementing automated workflows that not only save 
            time but also elevate standards of operational efficiency. From credentialing in healthcare to onboarding in tech, my experience with 
            cross-functional teams has honed my problem-solving skills, and I’m passionate about finding creative, data-centered solutions that drive results.
        </p>
        <p>
            Driven by curiosity and a proactive approach to problem-solving, I thrive in environments that challenge me to adapt and learn. I am 
            energized by the opportunity to support teams in achieving their goals, whether through data analytics, process improvements, or simply 
            lending a hand where it’s needed. Above all, my work is defined by a dedication to integrity and the pursuit of excellence—a philosophy I bring 
            to every project and team I work with.
        </p>
    </div>
</div>
        </div>
        
    );
};

export default Home;