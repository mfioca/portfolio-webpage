import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from "react-router-dom";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import './index.css';
import Home from './Home'; // Import your Home component if you create one
import Dashboard from './Dashboard';
import AboutPage from './About'; // Import your Home component if you create one
import AIShowcase from './ai_showcase';
import reportWebVitals from './reportWebVitals';


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
    <BrowserRouter>
      <Navigation /> {/* Place Navigation here */}
      <div className="body">
        <Routes>
          <Route path="/" element={<Home />} /> {/* Your home page */}
          <Route path="/About" element={<AboutPage />} /> {/* Your home page */}
          <Route path="/Dashboard" element={<Dashboard />} /> {/* Your dashboard page */}
          <Route path="/AIShowcase" element={<AIShowcase />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
    </HashRouter>
  </React.StrictMode>
);

reportWebVitals();

