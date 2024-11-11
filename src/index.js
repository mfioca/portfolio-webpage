import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import './index.css';
import Home from './Home'; // Import your Home component if you create one
import App from './App';
import AboutPage from './About'; // Import your Home component if you create one
import reportWebVitals from './reportWebVitals';


const Navigation = () => {
  const location = useLocation(); // Get the current location

  // Determine the title based on the current path
  let title;
  switch (location.pathname) {
    case '/':
      title = 'My Home Page';
      break;
      case '/About':
      title = 'About Me';
      break;
    case '/App':
      title = 'Dashboard Layout';
      break;
    default:
      title = 'My Dashboard'; // Fallback title
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
                  <Link to="/App" className="nav-link">Dashboard</Link>
              </li>
              {/* Add more links as needed */}
          </ul>
      </nav>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navigation /> {/* Place Navigation here */}
      <div className="body">
        <Routes>
          <Route path="/" element={<Home />} /> {/* Your home page */}
          <Route path="/About" element={<AboutPage />} /> {/* Your home page */}
          <Route path="/App" element={<App />} /> {/* Your dashboard page */}
        </Routes>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();

