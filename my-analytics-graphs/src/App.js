import './App.css';
import { Provider } from 'react-redux'; // Import Provider
import store from './store'; // Adjust the path to your store file
import Graph from './Graph';
import SecondGraph from './Graph2'; // Import your new graph component
import ThirdGraph from './Graph3'; // Import your new graph component
import Dashboard from './dashboard'; // Import your new graph component


/*****************************************************/
/* Custom sections to insert into the Main Display   */
/*****************************************************/

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
                In this section, we provide a comprehensive visual representation of the time allocated to various job activities over 
                the years, specifically highlighting the focus on analytics. The graph displays two key datasets: the total hours 
                worked each year and the specific hours dedicated to analytics tasks.
            </p>
            <p>
                Each bar on the graph represents the total duration of work for that year, allowing for a clear comparison of overall productivity. 
                Overlaying this, the percentage of time spent on analytics activities is also depicted, offering valuable insights into how analytics 
                efforts evolve relative to total work hours.
            </p>
            <p>
                By examining this graph, viewers can quickly grasp trends in workload and the significance of analytics within the broader context of job 
                responsibilities. This dual representation not only illustrates raw data but also contextualizes the impact of analytics activities,
                making it easier to identify shifts in focus and the growing importance of data-driven decision-making over time.
            </p>
        </div>
    );
};

/*****************************************************/
/*                  Main Display                     */
/*****************************************************/

function App() {
    return (
        // Wrap the App component with Provider for Redoux functions
        <Provider store={store}> 
            <div className="App">
                <header className="App-header">
                    <h1>Dashboard Layout</h1>
                    <p class="footer-text">
                        We engaged in a collaborative dialogue focused on integrating Redux into your React application. 
                        You initially expressed a desire to manage graph data more efficiently without overwhelming complexity. 
                        I guided you through the process step-by-step, emphasizing clear explanations and minimizing unnecessary details. 
                        You actively participated by asking specific questions and providing feedback on instructions, which helped refine 
                        our conversation. Together, we established a Redux store, created an action file, and modified the Graph component 
                        to use Redux for state management, ensuring the data was visualized correctly. Throughout, the emphasis was on 
                        maintaining clarity and adapting to your learning style, highlighting the importance of concise communication and 
                        active engagement.
                    </p>
                    <br/>
                    <p className="footer-text">
                        During our collaboration, we focused on enhancing the functionality of the Dashboard component in a React application. 
                        You emphasized the importance of establishing a baseline understanding before diving into code changes. We discussed how 
                        the dropdown boxes needed to filter data effectively, and you sought to ensure clarity in the data handling process.
                    <br/>
                        You guided the conversation by prompting me to revisit the existing code, ensuring I understood the current structure 
                        and the necessary adjustments required in the dataloader.js, actions.js, and store.js files. This methodical approach 
                        allowed us to align our understanding of the tasks at hand and clarify the functionality needed for the dropdown filters.
                    <br/>
                        Throughout the process, you actively engaged by identifying errors and clarifying expectations for code adjustments, 
                        particularly with regards to unused variables. You demonstrated patience and determination in troubleshooting, 
                        leading to productive discussions on optimizing the Redux state management and improving data loading efficiency.
                    <br/>
                        In the end, we successfully implemented the desired changes, and the dropdowns functioned as expected, significantly 
                        enhancing the Dashboards usability. Your logical and analytical approach, coupled with a focus on clear communication, 
                        proved essential in achieving our objectives.
                    </p>
                </header>
                <div className="graph-flexbox">
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
        </Provider>
    );
}

export default App;
