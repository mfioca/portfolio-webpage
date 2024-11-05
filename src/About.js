import React, { useState, useEffect, useRef  } from 'react';
import './About.css'; // Importing the CSS for styling 
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';




const quotes = [
    "The only way to do great work is to love what you do. – Steve Jobs",
    "Life is what happens when you’re busy making other plans. – John Lennon",
    "The purpose of our lives is to be happy. – Dalai Lama",
    "Get busy living or get busy dying. – Stephen King",
    "You have within you right now, everything you need to deal with whatever the world can throw at you. – Brian Tracy",
    "I think that the chances of finding out what's actually going on are so absurdly remote that the only thing to do is to say, 'Hang the sense of it,' and keep yourself busy. I'd much rather be happy than right any day. – The Hitchhiker's Guide to the Galaxy",
    "If life is going to exist in a Universe of this size, then the one thing it cannot afford to have is a sense of proportion. - The Hitchhiker's Guide to the Galaxy"
];

const ScrollingQuotes = () => {
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
        }, 10000); // Change quote every 3 seconds

        return () => clearInterval(intervalId); // Clear interval on component unmount
    }, []);

    return (
        <div className="scrolling-quotes">
            <p>{quotes[currentQuoteIndex]}</p>
        </div>
    );
};


const About = () => {

    return (
<div>

<Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide>
            <div className="personal-card">
        <p>
                    I am a movie, sci-fi, and overall tech geek who always seeks out new and interesting things to experience and learn. 
                    I strive to keep an open mind on everything because you never know what kind of hidden truths await those who pay attention.
                </p>
                </div></SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>



</div>
      );
    };


export default About;

/*

            <div className="about-section">
                <h2>Skills</h2>
                <ul>
                    <li>Data Analysis</li>
                    <li>UI Design and Development</li>
                    <li>Audio and Video Editing</li>
                    <li>Research and Investigation</li>
                </ul>
            </div>




            <div className="about-container">
            <h1 className="about-title">About Me</h1>
            <div className="about-section">
                <h2>Personal Information</h2>
                <p>
                    I am a movie, sci-fi, and overall tech geek who always seeks out new and interesting things to experience and learn. 
                    I strive to keep an open mind on everything because you never know what kind of hidden truths await those who pay attention.
                </p>
            </div>
        
            <div className="about-section">
                <h2>Background</h2>
                <p>
                    I have lived in Pennsylvania, Alaska, and Georgia. While in Alaska, I expanded my experiences by joining the local Paranormal Investigation group I.O.P.I.A. 
                    I have investigated different places and have seen unforgettable things, which helped me expand my knowledge in various fields.
                </p>
            </div>

            <div className="about-section">
                <h2>Interests</h2>
                <p>
                    My interests range from historical facts behind theories expressed in media to UI design and programming. 
                    I enjoy exploring how technology impacts our lives and finding creative ways to enhance user experiences.
                </p>
            </div>
            <div className="about-section">
                <h2>Computers and UI Design</h2>
                <p>
                    I first developed my interest in UI design when converting back to a Windows machine from a Mac.
                    I did not like how Windows was set up and strived to make my desktop look and act more like OSX.
                    I learned about a program called Rainmeter and expanded my knowledge in programming, developing my first
                    full custom UI theme through this program. My Rainmeter theme is available 
                    <a href="https://www.deviantart.com/franknmullet/art/Skyrim-Theme-1-0-651760185" 
                        target="_blank" rel="noopener noreferrer" 
                        className="text-body"> here 
                    </a> 
                    to download through DeviantArt.
                </p>
            </div>
            <div className="about-section">
                <h2>Developer Learning Projects</h2>
                <p>
                    In 6 months, I learned and built a fairly complex Windows desktop widget suite themed around the Skyrim video game, 
                    which includes a setup widget that controls almost everything, containing close to 10,000 lines of code using .ini and .inc files.
                </p>
                <p>
                    In 6 months, I taught myself how to build a multipage webpage using React and Next.js, which included Bootstrap 
                    and a Dungeons and Dragons battle simulator involving a hero and a monster that accurately applied all rules 
                    of the Advanced Special Edition 2 system.
                </p>
                <p>
                    In just under 2 calendar years, I progressed from a basic understanding of SQL to being able to create 
                    polished dashboards with at least 3-5 graphs and charts. This involved utilizing highly advanced multi-table 
                    SQL queries with 700+ lines to sort through hundreds of thousands of rows of data in a complex ActiveAdmin setup, 
                    while reducing the data to under 1MB for CSV export.
                </p>
                <p>
                    In 60 hours, ChatGPT and I built a single-page app using React and Redux that parses CSV data into a dashboard 
                    featuring 3 custom graphs, an adaptive analysis section, and a display of the CSV data. A portion of that time 
                    was spent going back over the code due to multiple data parsing, and implementing Redux. Another significant 
                    portion was dedicated to learning how to collaborate effectively with ChatGPT on development and troubleshooting.
                </p>
                <p>
                    In just a few days, I explored the OpenAI Playground training materials and examples from my brother, 
                    enabling me to start developing fairly advanced custom prompt engineering systems.
                </p>
            </div>

        </div>
        <div className="personal-card">
    <div className="icon">🎥</div> 
    <h2>About Me</h2>
    <img src="path/to/your/image.jpg" alt="Personal" />
    <p>
        I am a movie, sci-fi, and overall tech geek who always seeks out new and interesting things to experience and learn. 
        I strive to keep an open mind on everything because you never know what kind of hidden truths await those who pay attention.
    </p>
</div>
*/

