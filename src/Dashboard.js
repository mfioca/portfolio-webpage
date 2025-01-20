import './dashboard/Dashboard.css';
import { Provider } from 'react-redux'; // Import Provider
import store from './store'; // Adjust the path to your store file
import Graph from './dashboard/Graph';
import SecondGraph from './dashboard/Graph2'; // Import your new graph component
import ThirdGraph from './dashboard/Graph3'; // Import your new graph component
import CSVdata from './dashboard/CSVdata'; // Import your new graph component
import { DividerLine, IntroSection } from './SharedComponents.js';


const TextSection = ({ children }) => {
    return (
        <div className="text-section">
            { children }
        </div>
    );
};


function Dashboard() {
    return (
        // Wrap the App component with Provider for Redoux functions
        <Provider store={ store }> 
            <div className="Dashboard">
                <IntroSection title="Dashboard Overview">
                    <p><strong className="shadow">Purpose:</strong>&nbsp;&nbsp;This dashboard presents a comprehensive visualization of activity data collected over 
                        four years with a single organization. By highlighting trends in job focus and time allocation, it offers valuable insights into 
                        how various activities contribute to overall performance. The design prioritizes user experience, transforming complex CSV data 
                        into an organized, visually appealing format that moves beyond the clutter of traditional spreadsheets. Equipped with responsive graphs, 
                        interactive pagination, and customizable drop-down filters, the dashboard enables users to explore their data effortlessly. 
                        This intuitive tool empowers decision-making through clear, accessible insights.
                    </p>
                    <DividerLine width="30%" />
                    <p><strong className="shadow">Description:</strong>&nbsp;&nbsp;The first section of the dashboard offers a comprehensive analysis of application usage and 
                        job focus trends over time. Through graphs, it reveals how tools like “Mode” and Google Sheets have been utilized monthly, 
                        alongside shifts in job activities such as analytics and customer relations. The data also highlights total recorded hours, 
                        the proportion dedicated to analytics, and year-over-year changes in focus areas. Together, these visualizations provide a clear 
                        understanding of workflow priorities and evolving patterns, enabling users to assess productivity and refine strategies.
                    </p>
                    <p>
                        The second section of the dashboard shifts focus to detailed CSV data, offering powerful filtering capabilities and dynamic visualizations. 
                        Users can refine the dataset using three intuitive dropdown filters for activity type, month, and year, tailoring the view to their specific 
                        needs. Based on these selections, a donut chart highlights the top applications by hours, providing a clear snapshot of tool usage. 
                        As selections are made, a bar chart appears to showcase the most time-intensive activity subtypes. Below these visualizations, the raw CSV data 
                        is displayed in a clean, spreadsheet-like format, allowing users to explore the data in detail while maintaining ease of navigation and clarity.
                    </p>
                    <DividerLine width="30%" />
                    <p className="data-source ">Data insights in this dashboard were made possible through the use of <a href="https://www.rescuetime.com" target="_blank" rel="noopener noreferrer">RescueTime.com</a>, 
                        a powerful productivity and time management tool.
                    </p>
                </IntroSection>
                <DividerLine />
                <div className="graph-flexbox">
                    <div className="graph-container">
                        <Graph />
                        <TextSection>
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
                        </TextSection>
                    </div>
                    <div className="graph-container">
                        <SecondGraph />
                        <TextSection>
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
                        </TextSection>
                    </div>
                    <div className="graph-container">
                        <ThirdGraph />
                        <TextSection>
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
                        </TextSection>
                    </div>
                </div>
                <CSVdata />
            </div>
        </Provider>
    );
}

export default Dashboard;
