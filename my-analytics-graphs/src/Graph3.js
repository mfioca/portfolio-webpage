import React, { useEffect, useMemo, useState } from 'react'; // Include useState here
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Papa from 'papaparse'; // Import PapaParse
import { useDispatch, useSelector } from 'react-redux'; // Import Redux hooks
import { setGraphData } from './actions'; // Adjust the path to your actions file

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend);

const Graph3 = () => {
    const dispatch = useDispatch(); // Initialize dispatch
    
    const graphData = useSelector((state) => state.graphData.graph3); // Access the Redux state for graph
    const [textBoxContent, setTextBoxContent] = useState('');
    const [percentages, setPercentages] = useState([]); // Declare percentages as state

    const options = useMemo(() => ({
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Year',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Total Duration (Hours)',
                },
                beginAtZero: true,
            },
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const label = context.dataset.label || '';
                        const value = context.parsed.y || 0; // Get the value for the y-axis
                        const index = context.dataIndex; // Get the index for the current data point
                        const percentage = percentages[index] ? percentages[index].toFixed(1) : 0; // Get the percentage
                        
                        return `${label}: ${value} hours (${percentage}%)`; // Format the label
                    },
                },
            },
        },
    }), [percentages]); // Add percentages to the dependencies

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/cleaned_data_1.csv'); // Ensure this file exists
                const text = await response.text();
    
                // Use PapaParse to parse the CSV data
                Papa.parse(text, {
                    header: true,
                    dynamicTyping: true,
                    complete: (results) => {
                        const totalWorkByYear = {};
                        const analyticsByYear = {};
                        let tempPercentages = []; // Temporary variable for percentages
    
                        results.data.forEach(row => {
                            const year = new Date(row.timestamp).getFullYear();
                            if (year < 2000) return; // Skip entries from before 2000
    
                            const duration = row.duration / 3600; // Convert seconds to hours
    
                            // Accumulate total work durations
                            totalWorkByYear[year] = (totalWorkByYear[year] || 0) + duration;
    
                            // Check for analytics activity
                            if (row.activity_subtype === 'analytics') {
                                analyticsByYear[year] = (analyticsByYear[year] || 0) + duration;
                            }
                        });
    
                        // Calculate total work and analytics durations
                        const years = Object.keys(totalWorkByYear);
                        const totalWorkDurations = years.map(year => totalWorkByYear[year]);
                        const analyticsDurations = years.map(year => analyticsByYear[year] || 0);
    
                        // Calculate the percentage of analytics time relative to total work time per year
                        tempPercentages = analyticsDurations.map((duration, index) => {
                            const total = totalWorkDurations[index] || 1; // Avoid division by zero
                            return (duration / total) * 100; // Calculate percentage
                        });
    
                        console.log('Percentages:', tempPercentages); // Debugging line
    
                        // Set percentages state
                        setPercentages(tempPercentages); // Update percentages state

                        // Prepare text for the box after setting percentages
                        const yearText = years.map((year, index) => {
                            const percentage = tempPercentages[index].toFixed(1); // Use tempPercentages here
                            return `${year}: Analytics ${percentage}%`;
                        }).join('\n');

                        setTextBoxContent(`${yearText}\n\n`);

                        // Dispatch data to Redux store
                        dispatch(setGraphData('graph3', {
                            labels: years,
                            datasets: [
                                {
                                    label: 'Total Work',
                                    data: totalWorkDurations,
                                    backgroundColor: 'gray',
                                },
                                {
                                    label: 'Analytics',
                                    data: analyticsDurations,
                                    backgroundColor: 'blue',
                                },
                            ],
                        }));
                    },
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, [dispatch]); // Ensure dispatch is included in the dependency array

    return (
        <div className="chart-container">
            <div className="chart-header">
                <h2 style={{ flex: 1, textAlign: 'center' }}>Application Usage Over Time by Month</h2>
                <div className="data-box">
                {textBoxContent}
                </div> 
            </div>
            <Bar data={graphData} options={options} /> {/* Use Redux graph data */}
        </div>
    );
};

export default Graph3;





