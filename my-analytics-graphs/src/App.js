import './App.css';
import Graph from './Graph';
import SecondGraph from './Graph2'; // Import your new graph component
import ThirdGraph from './Graph3'; // Import your new graph component
import Dashboard from './dashboard'; // Import your new graph component


const TextSection1 = () => {
    return (
        <div className="text-section">
            <p>
                The graph to the left displays the total usage time for selected applications, 
                plotted by month. There was a shift in focus from daily operations to functioning 
                like subject matter expertise in June of 2022.
            </p>
            <p>
                Before the job title change, I used Google Sheets to help manage a pool of 
                customers and process analytical data on their status in each phase of the 
                life cycle funnel. After the job title change, I took on more of an analyst 
                and auditor type of role. I used Google Sheets more to look at specific 
                issues in our operations systems that needed to be fixed.
            </p>
            <p>
                Key insights to look for in the graph include potential shifts in application 
                usage corresponding to the job title change, as well as any notable trends in 
                specific applications that reflect the evolving focus of the work.
            </p>
        </div>
    );
};

const TextSection2 = () => {
    return (
        <div className="text-section">
            <p>
                In this section, we analyze the usage of different applications over time based on job focus. 
                The goal is to identify trends and patterns in application usage based on the focus between 
                customer relations and Analytics driven activities.
            </p>
            <p>
                The graph to the left displays the total usage time for applications with different activity subtypes, 
                plotted by month. As in the last graph, a change in focus occurred in June of 2022.
            </p>
            <p>
                Key insights to look for in the graph include a very distinct shift in activities due to the job title change.
            </p>
        </div>
    );
};

const TextSection3 = () => {
    return (
        <div className="text-section">
            <p>
                In this section, we have a quick visual display of the amount of time spent with a focus on analytics per year 
                with time reflected in hours. It also shows the total number of hours completed per year and the 
                percentage of time focused on analytics activities.
            </p>
        </div>
    );
};


function DashboardLayout() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Dashboard Layout</h1>
            </header>
            <div className="Body">
                <div className="graph-box">
                    <div className="graph-container">

                            <Graph />
                            <TextSection1 />

                        
                    </div>
                </div>
                <div className="graph-box">
                    <div className="graph-container">
  
                            <SecondGraph />
                            <TextSection2 />

                        
                    </div>
                </div>
                <div className="graph-box">
                    <div className="graph-container">

                            <ThirdGraph />
                            <TextSection3 />
 
                        
                    </div>
                </div>
            </div>
            <Dashboard />
        </div>
    );
}

export default DashboardLayout;




/*
function App() {
  return (
      <div className="App">
          <header className="App-header">
              <h1>CSV Data Graph</h1>
          </header>
          <Graph />
          <SecondGraph />
          <ThirdGraph /> 
          <Dashboard />
      </div>
  );
}

export default App;
*/


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