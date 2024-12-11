import React, { useState, useEffect  } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from "react-router-dom";
import { Routes, Route } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import './index.css';
import Home from './Home'; // Import your Home component if you create one
import Dashboard from './Dashboard';
import AboutPage from './About'; // Import your Home component if you create one
import AIShowcase from './ai_showcase';
import './SharedComponents.css';
import reportWebVitals from './reportWebVitals';


const WindowWidthDisplay = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
      const handleResize = () => {
          setWindowWidth(window.innerWidth);
      };

      window.addEventListener('resize', handleResize);

      // Cleanup listener on component unmount
      return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
      <div style={{
          /*width: `${window.innerWidth}px`, // Dynamically set width to the window's width minus 10px*/
          width: '80%',
          margin: 'auto',
          border: '2px solid black', // Adds a black border with a thickness of 2px
          textAlign: 'center', // Center-align the text inside the div
          /*padding: '10px' // Add padding for better spacing*/
      }}>
          <p>{`Window width: ${windowWidth}px`}</p>
      </div>
  );
};

const WindowHeightDisplay = () => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
      const handleResize = () => {
          setWindowHeight(window.innerHeight);
      };

      window.addEventListener('resize', handleResize);

      // Cleanup listener on component unmount
      return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
      <div style={{
          width: '80%',
          margin: 'auto',
          border: '2px solid black', // Adds a black border with a thickness of 2px
          textAlign: 'center', // Center-align the text inside the div
      }}>
          <p>{`Window height: ${windowHeight}px`}</p>
      </div>
  );
};


const Navigation = () => {
  const location = useLocation(); // Get the current location

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
    default:
        title = 'Explore My Web Page'; // A more general fallback title
  }

  return (
      <nav className="navbar">
          <div className="navbar-brand">{title}</div>
          <ul className="navbar-links">
              <li>
                  <Link to="/" className="nav-link">Home</Link>
              </li>
              <li>
                  <Link to="/About" className="nav-link">About</Link>
              </li>
              <li>
                  <Link to="/Dashboard" className="nav-link">Activity Analysis</Link>
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
    <footer className="footer">
      <div className="footer-content">
          <p>Contact Me: <a href="mailto:mfioca@gmail.com" className="contact-link">mfioca@gmail.com</a></p>
          <p>
              <a href="https://www.linkedin.com/in/mark-fioca/" target="_blank" rel="noopener noreferrer" className="linkedin-link">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/1200px-LinkedIn_icon.svg.png" alt="LinkedIn" className="linkedin-icon" />
                  LinkedIn Profile
              </a>
          </p>
      </div>
  </footer>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Navigation /> {/* Place Navigation here */}
      <div className="body">
      <WindowWidthDisplay />
      <WindowHeightDisplay />
          <Routes>
            <Route path="/" element={<Home />} /> {/* Your home page */}
            <Route path="/About" element={<AboutPage />} /> {/* Your home page */}
            <Route path="/Dashboard" element={<Dashboard />} /> {/* Your dashboard page */}
            <Route path="/AIShowcase" element={<AIShowcase />} />
          </Routes>
      </div>
      
    </HashRouter>
    <Footer />
  </React.StrictMode>
);

reportWebVitals();

