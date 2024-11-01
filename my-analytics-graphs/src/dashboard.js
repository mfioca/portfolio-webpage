import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import loadDataForGraphs from './dataloader'; // Import the data loader function
import { Doughnut } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2'; // Import the Bar component for the bar chart
import { Chart, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';


Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, ChartDataLabels);



const createChartData = (top5Applications) => {
    return {
        labels: top5Applications.map(app => app.name), // Names of the applications
        datasets: [
            {
                label: 'Hours Spent',
                data: top5Applications.map(app => app.hours), // Corresponding hours spent
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                ],
                hoverBackgroundColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
            },
        ],
    };
};

const createBarChartData = (top5ActivitySubtypes) => {
    return {
        labels: top5ActivitySubtypes.map(subtype => subtype.name), // Names of the activity subtypes
        datasets: [
            {
                label: 'Hours Spent',
                data: top5ActivitySubtypes.map(subtype => subtype.hours), // All hours in a single dataset
                backgroundColor: top5ActivitySubtypes.map((_, index) => `rgba(${75 + index * 30}, ${192 - index * 30}, 192, 0.6)`), // Generate colors dynamically
                hoverBackgroundColor: top5ActivitySubtypes.map((_, index) => `rgba(${75 + index * 30}, ${192 - index * 30}, 192, 1)`), // Hover colors
            },
        ],
    };
};

const Dashboard = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.rawData); // Access rawData from Redux
    const [selectedActivityType, setSelectedActivityType] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [activityTypes, setActivityTypes] = useState([]);
    const [months, setMonths] = useState([]);
    const [years, setYears] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 100; // Number of rows to display per page

    // Load data using the data loader function
    useEffect(() => {
        const fetchData = async () => {
            await loadDataForGraphs(dispatch); // Load data from the dataloader
        };
        fetchData();
    }, [dispatch]);

    // Set unique activity types, months, and years from the raw data
    useEffect(() => {
        if (data.length > 0) {
            const uniqueActivityTypes = [...new Set(data.map(row => row.activity_type))];
            setActivityTypes(uniqueActivityTypes); // Set unique activity types

            const monthNames = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            
            const uniqueMonths = new Set();
            data.forEach(row => {
                const dateStr = row.timestamp; 
                if (dateStr) {
                    const monthIndex = new Date(dateStr).getMonth();
                    uniqueMonths.add(monthNames[monthIndex]); 
                }
            });
            setMonths(Array.from(uniqueMonths)); // Set unique months for dropdown

            const uniqueYears = new Set();
            data.forEach(row => {
                const year = new Date(row.timestamp).getFullYear();
                uniqueYears.add(year);
            });
            setYears([...uniqueYears]); // Set unique years for dropdown
        }
    }, [data]);

    // Define filteredData based on selected filters
    const filteredData = data.filter(row => {
        const matchesActivityType = selectedActivityType ? row.activity_type === selectedActivityType : true; // Check activity type filter
        const matchesMonth = selectedMonth ? new Date(row.timestamp).toLocaleString('default', { month: 'long' }) === selectedMonth : true; // Check month filter
        const matchesYear = selectedYear ? new Date(row.timestamp).getFullYear() === parseInt(selectedYear) : true; // Check year filter

        return matchesActivityType && matchesMonth && matchesYear; // Combine conditions
    });

    console.log('Filtered Data:', filteredData); // Log the filtered data

    // Calculate top applications and activity subtypes
    const topApplications = [];
    const topActivitySubtypes = [];

    // Aggregate hours for applications
    filteredData.forEach(row => {
        const hours = row.duration / 3600; // Assuming row.duration is in seconds

        // Update application hours
        const appIndex = topApplications.findIndex(app => app.name === row.application);
        if (appIndex > -1) {
            topApplications[appIndex].hours += hours;
        } else {
            topApplications.push({ name: row.application, hours });
        }

        // Update activity subtype hours
            // Only update activity subtype hours if an activity type is selected
    if (selectedActivityType) {
        const subtypeIndex = topActivitySubtypes.findIndex(subtype => subtype.name === row.activity_subtype);
        if (subtypeIndex > -1) {
            topActivitySubtypes[subtypeIndex].hours += hours;
        } else {
            topActivitySubtypes.push({ name: row.activity_subtype, hours });
        }
    }
    });

    // Sort and get top 5 applications and subtypes
    topApplications.sort((a, b) => b.hours - a.hours);
    topActivitySubtypes.sort((a, b) => b.hours - a.hours);

    // Limit to top 5
    const top5Applications = topApplications.slice(0, 5);
    const top5ActivitySubtypes = topActivitySubtypes.slice(0, 5);

    // Calculate pagination
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentData = filteredData.slice(startIndex, endIndex);
 


    // Inside your Dashboard component


    return (
        <div className="dashboard-container">
            
        <div className="temp">        
            <h2>Dashboard</h2>
            <p>When modifying drop down boxes, data changes in Redux and may take some time to reload</p>
            
            <div className="dropdowns">
                <div>
                    <h2>Select Activity Type</h2>
                    <select 
                        value={selectedActivityType} 
                        onChange={(e) => setSelectedActivityType(e.target.value)}>
                        <option value="">All Activity Types</option>
                        {activityTypes.map((type, index) => (
                            <option key={index} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <h2>Select Month</h2>
                    <select 
                        value={selectedMonth} 
                        onChange={(e) => setSelectedMonth(e.target.value)}> 
                        <option value="">All Months</option>
                        {months.map((month, index) => (
                            <option key={index} value={month}>
                                {month}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <h2>Select Year</h2>
                    <select 
                        value={selectedYear} 
                        onChange={(e) => setSelectedYear(e.target.value)}>
                        <option value="">All Years</option>
                        {years.map((year, index) => (
                            <option key={index} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="graph-wrapper">
                <div className="donut-chart">
                    <h3>Top Applications - Donut Chart</h3>
                    <Doughnut
                        data={createChartData(top5Applications)}
                        options={{
                            plugins: {

                                tooltip: {
                                    callbacks: {
                                        label: (context) => {
                                            const label = context.dataset.label || '';
                                            const value = context.parsed; // Get the value for the Doughnut chart
                                            return `${label}: ${value.toFixed(2)} hours`; // Format the tooltip label to two decimal points
                                        },
                                    },
                                },
                                datalabels: {
                                    display: true, // Show data labels for the Doughnut chart
                                    color: 'black', // Color of the data labels
                                    formatter: (value) => `${value.toFixed(2)} hours`, // Format the data label to two decimal points
                                },
                            },
                        }}
                    />
                </div>
                <div className="top-subtypes">
                    <h3>Top Activity Subtypes</h3>
                        {top5ActivitySubtypes.length === 0 ? (
                            <p>Filter Activity Types for more analytical data.</p>
                        ) : (
                            <div className="bar-chart">
                                <h3>Top Activity Subtypes - Bar Chart</h3>
                                <Bar
                                    data={createBarChartData(top5ActivitySubtypes)}
                                    options={{
                                        plugins: {
                                            legend: {
                                                display: false, // Hide the legend
                                            },
                                            datalabels: {
                                                display: true, // Show data labels for the bar chart
                                                color: 'black', // Color of the data labels
                                                anchor: 'end', // Positioning of the labels
                                                align: (context) => {
                                                    const value = context.dataset.data[context.dataIndex]; // Get the value of the current data point
                                                    const thresholdValue = 4; // Define a threshold value (e.g., 10 hours)
                                            
                                                    // Determine the alignment based on the value
                                                    return value > thresholdValue ? 'bottom' : 'top'; 
                                                },
                                                formatter: (value) => `${value.toFixed(2)} hours`,
                                            },
                                        },
                                    }}
                                />
                            </div>
                        )}
                </div>
            </div>
            </div>
            <div className = "temp2">
            <div className="filtered-data">
                {currentData.length > 0 ? (
                    <table className="csv-data">
                        <thead>
                            <tr>
                                {Object.keys(currentData[0]).map((key, index) => {
                                    if (key !== 'timestamp' && key !== 'hour') {
                                        return <th key={index}>{key}</th>; // Table headers
                                    }
                                    return null; // Exclude timestamp from headers
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((row, index) => (
                                <tr key={index}>
                                    {Object.keys(row).map((key) => {
                                        if (key !== 'timestamp' && key !== 'hour') {
                                            return <td key={key}>{row[key]}</td>; // Table data cells
                                        }
                                        return null; // Exclude timestamp from data
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No data available</p> // Message when there is no data
                )}
            </div>
            <div className="pagination">
                <button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                    disabled={currentPage === 1}>
                    Previous
                </button>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 10px' }}>
                    Page {currentPage} of {totalPages}
                </span>
                <button 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                    disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
        </div>
    );
};

export default Dashboard;