import React from 'react';


const Home = () => {
    return (
        <div className="home-body">
            <div className="home-title">
                <h1 className="shadow" >Welcome to to my home page</h1>
                <p><strong className="shadow">About This Web Page:</strong>&nbsp;&nbsp;This web page began as a personal project to explore 
                    the capabilities of OpenAI’s ChatGPT and delve into prompt engineering and customizations. I chose this as a foundation because 
                    of my prior experience learning React during a six-month self-study period. It provided a practical starting point to expand my 
                    skills while building something meaningful.
                </p>
                <p>
                    Nearly every feature on this page was developed in close collaboration with ChatGPT, with adjustments and customizations made by me. 
                    Through this process, I integrated several advanced libraries, including React Router DOM, React Redux, PapaParse, React Charts, and Swiper. 
                    Before starting this project, I had no prior experience with those tools, which highlights how effective proper collaboration and customization 
                    can be when working with ChatGPT.
                </p>
                <p>
                    This web page serves as both a showcase and a testament to the potential of combining AI-driven assistance with hands-on learning, 
                    demonstrating how even challenging concepts can be tackled with the right tools and support.
                </p>
            </div>
            <hr style={{ 
                        width: '80%', 
                        margin: '10px auto', 
                        border: '1px solid #ccc', 
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' 
                    }} />
            <div className="profile-content">
                <h2 className="shadow" >Professional Profile</h2>
                <p><img src="/IMG_0199.jpeg" alt="Your Name" className="image"/><br/>
                    With over 20 years across diverse industries, I bring a balanced blend of analytical rigor and collaborative leadership to every role. 
                    Known for my precision, integrity, and dedication to detail, I’m deeply motivated by the potential for data-driven solutions to streamline 
                    processes and support effective decision-making. My colleagues often describe me as adaptable and reliable, someone who can be counted on 
                    for consistency and excellence, whether working independently or as part of a team. My work philosophy is grounded in integrity, 
                    continuous learning, and a commitment to completing every task the right way.
                <br/><br/>
                    With over 20 years across diverse industries, I bring a balanced blend of analytical rigor and collaborative leadership to every role. 
                    Known for my precision, integrity, and dedication to detail, I’m deeply motivated by the potential for data-driven solutions to streamline 
                    processes and support effective decision-making. My colleagues often describe me as adaptable and reliable, someone who can be counted on 
                    for consistency and excellence, whether working independently or as part of a team. My work philosophy is grounded in integrity, 
                    continuous learning, and a commitment to completing every task the right way.
                <br/><br/>
                    My career has been marked by an ability to translate complex data into actionable insights, always with a focus on optimizing efficiency 
                    and compliance. I excel in developing custom reports, auditing data for accuracy, and implementing automated workflows that not only save 
                    time but also elevate standards of operational efficiency. From credentialing in healthcare to onboarding in tech, my experience with 
                    cross-functional teams has honed my problem-solving skills, and I’m passionate about finding creative, data-centered solutions that drive results.
                <br/><br/>
                    Driven by curiosity and a proactive approach to problem-solving, I thrive in environments that challenge me to adapt and learn. I am 
                    energized by the opportunity to support teams in achieving their goals, whether through data analytics, process improvements, or simply 
                    lending a hand where it’s needed. Above all, my work is defined by a dedication to integrity and the pursuit of excellence—a philosophy I bring 
                    to every project and team I work with.
                </p>
            </div>
        </div>
    );
};

export default Home;
