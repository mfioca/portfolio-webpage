import React, { useState, useEffect } from 'react';
import Papa from 'papaparse'; // For parsing CSV data

const Dashboard = () => {
    const [data, setData] = useState([]); // Use data state to store CSV results
    //const [selectedApp, setSelectedApp] = useState('');
    const [selectedActivityType, setSelectedActivityType] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [activityTypes, setActivityTypes] = useState([]);
    //const [applications, setApplications] = useState([]);
    const [months, setMonths] = useState([]);
    const [years, setYears] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 100; // Number of rows to display per page
 


    // Load and parse the CSV data
    useEffect(() => {
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const fetchData = async () => {
            const response = await fetch('/cleaned_data_1.csv'); 
            const text = await response.text();

            Papa.parse(text, {
                header: true,
                dynamicTyping: true,
                complete: (results) => {
                    console.log('Parsed Results:', results.data); // Log parsed data
                    setData(results.data);

                    const uniqueActivityTypes = [...new Set(results.data.map(row => row.activity_type))];
                    setActivityTypes(uniqueActivityTypes); // Set the unique activity types

                    //const uniqueApplications = [...new Set(results.data.map(row => row.application))];
                    //setApplications(uniqueApplications); // Set the unique applications

                    const uniqueMonths = new Set();
                    results.data.forEach(row => {
                        const dateStr = row.timestamp; 
                        if (dateStr) { // Check if dateStr is not null or undefined
                            const monthIndex = new Date(dateStr).getMonth(); // Get the month index
                            uniqueMonths.add(monthNames[monthIndex]); // Add the month name to the Set
                        }
                    });

                    // Set the state for unique months
                    setMonths(Array.from(uniqueMonths)); // Set the unique months for dropdown

                    const uniqueYears = new Set();
                    results.data.forEach(row => {
                        const year = new Date(row.timestamp).getFullYear();
                        uniqueYears.add(year);
                    });
                    const yearsArray = [...uniqueYears];
                    setYears(yearsArray); 
                },
            });
        };
        fetchData();
    }, []);

    // Define filteredData based on selected filters
    const filteredData = data.filter(row => {
        //const matchesApp = selectedApp ? row.application === selectedApp : true; // Check application filter
        const matchesActivityType = selectedActivityType ? row.activity_type === selectedActivityType : true; // Check activity type filter
        const matchesMonth = selectedMonth ? new Date(row.timestamp).toLocaleString('default', { month: 'long' }) === selectedMonth : true; // Check month filter
        const matchesYear = selectedYear ? new Date(row.timestamp).getFullYear() === parseInt(selectedYear) : true; // Check year filter

        return matchesActivityType && matchesMonth && matchesYear; // Combine conditions "matchesApp &&" if I want to add app back
    });

    console.log('Filtered Data:', filteredData); // Log the filtered data

    // Calculate top applications and activity subtypes
const topApplications = [];
const topActivitySubtypes = [];

// Aggregate hours for applications
filteredData.forEach(row => {
    // Convert duration from seconds to hours
    const hours = row.duration / 3600; // Assuming row.duration is in seconds

    // Update application hours
    const appIndex = topApplications.findIndex(app => app.name === row.application);
    if (appIndex > -1) {
        topApplications[appIndex].hours += hours;
    } else {
        topApplications.push({ name: row.application, hours });
    }

    // Update activity subtype hours
    const subtypeIndex = topActivitySubtypes.findIndex(subtype => subtype.name === row.activity_type);
    if (subtypeIndex > -1) {
        topActivitySubtypes[subtypeIndex].hours += hours;
    } else {
        topActivitySubtypes.push({ name: row.activity_type, hours });
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

    return (
        <div className="dashboard-container">
            <h2>Dashboard</h2>
            <div className="dropdowns">
                <div>
                    <h2>Select Activity Type</h2>
                    <select 
                        value={selectedActivityType} 
                        onChange={(e) => setSelectedActivityType(e.target.value)}>
                        <option value="">All Activity Types</option> {/* Default option for all activity types */}
                        {activityTypes.map((type, index) => (
                            <option key={index} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
                {/*} application dropdown
                <div>
                    <h2>Select Application</h2>
                    <select 
                        value={selectedApp} 
                        onChange={(e) => setSelectedApp([...e.target.selectedOptions].map(option => option.value))} 
                        multiple
                    >
                        <option value="">All Applications</option> //Default option for all applications 
                            {applications.map((app, index) => (
                            <option key={index} value={app}>
                            {app}
                        </option>
                    ))}
                    </select>
                </div> */}
                <div>
                    <h2>Select Month</h2>
                    <select 
                        value={selectedMonth} 
                        onChange={(e) => setSelectedMonth(e.target.value)}> 
                        <option value="">All Months</option> {/* Default option for all months */}
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
                        <option value="">All Years</option> {/* Default option for all years */}
                        {years.map((year, index) => (
                            <option key={index} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="calculations">
                {/* Area to display calculations based on dropdown selections */}
            </div>

            <div className="top-applications">
    <h3>Top Applications</h3>
    <table>
        <thead>
            <tr>
                <th>Application</th>
                <th>Hours Spent</th>
            </tr>
        </thead>
        <tbody>
            {top5Applications.map(app => (
                <tr key={app.name}>
                    <td>{app.name}</td>
                    <td>{app.hours.toFixed(2)}</td> {/* Display hours spent, rounded to 2 decimal places */}
                </tr>
            ))}
        </tbody>
    </table>
</div>

<div className="top-subtypes">
    <h3>Top Activity Subtypes</h3>
    <table>
        <thead>
            <tr>
                <th>Activity Subtype</th>
                <th>Hours Spent</th>
            </tr>
        </thead>
        <tbody>
            {top5ActivitySubtypes.map(subtype => (
                <tr key={subtype.name}>
                    <td>{subtype.name}</td>
                    <td>{subtype.hours.toFixed(2)}</td> {/* Display hours spent, rounded to 2 decimal places */}
                </tr>
            ))}
        </tbody>
    </table>
</div>
            
            <div className="filtered-data">
                {currentData.length > 0 ? ( // Check if there is any data
                    <table class="csv-data">
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
                <span>Page {currentPage} of {totalPages}</span>
                <button 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                    disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default Dashboard;