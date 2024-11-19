import React, { useState, useEffect  } from 'react';
import './About.css'; // Importing the CSS for styling 
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


/*******************************************************************/
/*                  Scrolling quote section                        */
/*******************************************************************/

const quotes = [
    {
        text: "If life is going to exist in a Universe of this size, then the one thing it cannot afford to have is a sense of proportion.",
        source: "- The Hitchhiker's Guide to the Galaxy"
    },
    {
        text: "You cannot see what I see because you see what you see. you cannot know what I know because you know what you know. What I see and what I know cannot be added to what you see and what you know because they are not of the same kind. Neither can it replace what you see and what you know, because that would be to replace yourself.",
        source: "- The Hitchhiker's Guide to the Galaxy"
    },
    {
        text: "We also live in strange places: each in a universe of our own. The people with whom we populate our universes are the shadows of whole other universes intersecting with our own.",
        source: "- The Hitchhiker's Guide to the Galaxy"
    },
    {
        text: "The mind can go either direction under stress - toward positive or toward negative: on or off. Think of it as a spectrum whose extremes are unconsciousness at the negative end and hyperconsciousness at the positive end. The way the mind will lean under stress is strongly influenced by training.",
        source: "- Dune"
    },
    {
        text: "It occured to her that mercy was the ability to stop, if only for a moment. There was no mercy where there could be no stopping.",
        source: "- Dune"
    },
    {
        text: "The mystery of life isn't a problem to solve, but a reality to experience.",
        source: "- Dune"
    },
    {
        text: "The most persistent principles of the universe were accident and error.",
        source: "- Dune"
    },
    {
        text: "I learned this, at least, by my experiment: that if one advances confidently in the direction of his dreams, and endeavors to live the life which he has imagined, he will meet with a success unexpected in common hours.",
        source: "- Henry David Thoreau, Walden: Or, Life in the Woods"
    }
];

const ScrollingQuotes = () => {
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
        }, 10000); // Change quote every 10 seconds

        return () => clearInterval(intervalId); // Clear interval on component unmount
    }, []);

    return (
        <div className="scrolling-quotes">
            <p className="quote-text">{quotes[currentQuoteIndex].text}</p>
            <p className="quote-source">{quotes[currentQuoteIndex].source}</p>
        </div>
    );
};

/*******************************************************************/
/*                  Card functional component                      */
/*******************************************************************/

const Card = ({ icon, title, description }) => {
    return (
        <div className="about-section">
            <div className="top-icon">{icon}</div>
            <div className="body">
            <div className='about-title'>
                <h2>{title}</h2>
            </div>
            {/*<img src="path/to/your/image.jpg" alt="Personal" /> */}
            {description}
            </div>
            <div className="bottom-icon">{icon}</div>
        </div>
    );
};


/*******************************************************************/
/*                  Main Component                                 */
/*******************************************************************/


const About = () => {
    return (
        <div className="about-body">
            <div >
                <ScrollingQuotes/>
            </div>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{
                clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="about-card"
            >
                <SwiperSlide>
                    <Card 
                        icon="💡"
                        title="About Me"
                        description={
                            <>
                                <p>
                                    Hello! I&apos;m a passionate creator who thrives on challenges and revels in the art of building intricate virtual worlds. 
                                    Whether I&apos;m reconstructing the majestic city of Whiterun in Minecraft or delving into the complexities of data analytics, 
                                    my approach is always methodical yet imaginative. With a knack for detail, I often find myself lost in the enchanting process 
                                    of transforming mere ideas into tangible structures, both in the digital realm and beyond.
                                </p>
                                <p>
                                    Much like a Mentat from the book <em>Dune</em>, I have the ability to connect seemingly unrelated dots like a complex web of interconnected 
                                    processes. This analytical prowess allows me to identify patterns, solve problems, and innovate creatively. 
                                    With a penchant for humor, I approach projects and collaborations with a touch of levity, believing that a little laughter can go a 
                                    long way in fostering productive interactions.
                                </p>
                                <p>
                                    My journey reflects a commitment to continuous improvement and exploration, where each project completed fuels my motivation to keep pushing 
                                    boundaries. With each new build, whether it&apos;s a complex data visualization or an elaborate Minecraft realm, I enjoy building new things 
                                    and seeing the results of my efforts. I believe in the power of curiosity and innovation, and I approach each endeavor with a spirit of adventure 
                                    and a touch of humor, ready to tackle whatever comes next!
                                </p>
                            </>
                        }
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Card
                        icon="⚙️"
                        title="Developer Learning Projects"
                        description={
                            <>
                                <ul>
                                    <li>
                                        In 6 months, I learned and built a fairly complex Windows desktop widget suite themed around the Skyrim video game, 
                                        which includes a setup widget that controls almost everything, containing close to 10,000 lines of code using .ini and .inc files.
                                    </li>
                                    <li>
                                        In 6 months, I taught myself how to build a multipage webpage using React and Next.js, which included Bootstrap 
                                        and a Dungeons and Dragons battle simulator involving a hero and a monster that accurately applied all rules 
                                        of the Advanced Special Edition 2 system.
                                    </li>
                                    <li>
                                        In just under 2 calendar years, I progressed from a basic understanding of SQL to being able to create 
                                        polished dashboards with at least 3-5 graphs and charts. This involved utilizing highly advanced multi-table 
                                        SQL queries with 700+ lines to sort through hundreds of thousands of rows of data in a complex ActiveAdmin setup, 
                                        while reducing the data to under 1MB for CSV export.
                                    </li>
                                    <li>
                                        In 60 hours, ChatGPT and I built a single-page app using React and Redux that parses CSV data into a dashboard 
                                        featuring 3 custom graphs, an adaptive analysis section, and a display of the CSV data. A portion of that time 
                                        was spent going back over the code due to multiple data parsing, and implementing Redux. Another significant 
                                        portion was dedicated to learning how to collaborate effectively with ChatGPT on development and troubleshooting.
                                    </li>
                                    <li>
                                        In just a few days, I explored the OpenAI Playground training materials and examples from my brother, 
                                        enabling me to start developing fairly advanced custom prompt engineering systems.
                                    </li>
                                </ul>
                            </>
                        }
                    />
                </SwiperSlide>
                <SwiperSlide>
                <Card
                    icon="🎮" 
                    title="My Gaming Philosophy" 
                    description={
                        <>
                            <p>
                                With a discerning approach to gaming, I am drawn to titles that offer depth, narrative complexity, and rewarding challenges. 
                                I have a strong preference for games that balance storytelling with well-executed mechanics, favoring immersive experiences 
                                that avoid unnecessary handholding while respecting player direction. My interests span a range of genres—from atmospheric 
                                horror to RPG and stealth—but my passion for tactical and strategic elements shines through. Whether it’s the precise combat 
                                mechanics in *Elden Ring*, the immersive storytelling of *Cyberpunk 2077*, or the methodical pace found in classics like *Thief*, 
                                I appreciate games that prioritize authentic gameplay.
                            </p>
                            <p>
                                I value titles that retain depth without overcomplicating mechanics, reflecting my thoughtful gaming philosophy. I enjoy games 
                                that invite careful observation and experimentation, embracing those that reward calculated, immersive play rather than fast-paced 
                                or repetitive elements. As a skilled player with the patience for tactical growth, I excel in games where a measured approach 
                                and attention to detail lead to richer, more fulfilling experiences. Whether navigating complex puzzles, adapting to nuanced 
                                combat, or exploring intricately designed worlds, my gameplay is both intentional and immersive, capturing the essence of a 
                                true strategist and storyteller.
                            </p>
                        </>
                    }
                />
                </SwiperSlide>
                <SwiperSlide>Slide 6


                    
                </SwiperSlide>
                <SwiperSlide>Slide 7</SwiperSlide>
                <SwiperSlide>Slide 8</SwiperSlide>
                <SwiperSlide>Slide 9</SwiperSlide>
            </Swiper>
        </div>
      );
    };


export default About;

