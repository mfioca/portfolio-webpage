import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from "react-router-dom";
import { Routes, Route } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import './index.css';
import Home from './Home'; 
import Dashboard from './Dashboard';
import AboutPage from './About'; 
import AIShowcase from './ai_showcase';
import reportWebVitals from './reportWebVitals';
import TvMaze from './tv_maze'
import TvMazeShowResults from './Tv_Maze/tv_maze_show_results';
import TvMazePeopleResults from './Tv_Maze/tv_maze_people_results';



const Navigation = () => {
  const location = useLocation(); // Get the current location

  // Scroll to the top when location changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Determine the title based on the current path
  let title;
  switch (location.pathname) {
    case '/':
      title = 'Introduction Page';
      break;
    case '/About':
      title = 'Learn More About Me';
      break;
    case '/Dashboard':
      title = 'Activity Analysis Dashboard';
      break;
    case '/AIShowcase':
      title = 'AI Showcase';
      break;
    case '/tv_maze':
      title = 'TV Maze';
      break;
    default:
      title = 'Explore My Web Page'; // A more general fallback title
  }

  return (
    <nav className="index-shared navbar">
      <div className="navbar-brand">{ title }</div>
      <ul className="navbar-links">
        <li>
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li>
          <Link to="/About" className="nav-link">About</Link>
        </li>
        <li>
          <Link to="/tv_maze" className="nav-link">TV Maze</Link>
        </li>
        <li>
          <Link to="/Dashboard" className="nav-link">Job Activity Analysis</Link>
        </li>
        <li>
          <Link to="/AIShowcase" className="nav-link">AI Showcase</Link>
        </li>
        {/* Add more links as needed */}
      </ul>
    </nav>
  );
};

const Footer = () =>{
  return (
    <div className="index-shared footer">
      <footer className="footer-content">
        <p>Contact Me: <a href="mailto:mfioca@gmail.com" className="contact-link">mfioca@gmail.com</a></p>
        <p>
          <a 
            href="https://www.linkedin.com/in/mark-fioca/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="linkedin-link"
          >
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/1200px-LinkedIn_icon.svg.png" 
              alt="LinkedIn" 
              className="linkedin-icon" 
            />
            LinkedIn Profile
          </a>
        </p>
      </footer>
    </div>
  )
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <HashRouter>
      <Navigation /> {/* Place Navigation here */}
        <Routes>
          <Route path="/" element={ <Home /> } /> 
          <Route path="/About" element={ <AboutPage /> } /> 
          <Route path="/tv_maze" element={ <TvMaze /> } />
          <Route path="/show/:id" element={ <TvMazeShowResults /> } />
          <Route path="/person/:id" element={ <TvMazePeopleResults /> } />
          <Route path="/Dashboard" element={ <Dashboard /> } /> 
          <Route path="/AIShowcase" element={ <AIShowcase /> } />
        </Routes>
      <Footer />
    </HashRouter>
  </React.StrictMode>
);

reportWebVitals();

