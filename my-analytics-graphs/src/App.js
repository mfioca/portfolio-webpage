import logo from './logo.svg';
import './App.css';
import Graph from './Graph';
import SecondGraph from './Graph2'; // Import your new graph component

function App() {
  return (
      <div className="App">
          <header className="App-header">
              <h1>CSV Data Graph</h1>
          </header>
          <Graph />
          <SecondGraph />
      </div>
  );
}

export default App;



/*import React from 'react';
import Graph from './Graph';
import SecondGraph from './Graph2'; // Import your new graph component

const App = () => {
    return (
        <div>
            <Graph />
            <SecondGraph />
        </div>
    );
};

export default App;
*/