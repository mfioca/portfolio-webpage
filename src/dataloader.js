import Papa from 'papaparse'; 
import { setGraphData, setRawData } from './actions'; // Include setRawData action

/***************************************************/
/*          Parse the data from the csv file       */
/***************************************************/

const loadDataForGraphs = async (dispatch, graphType, setTextBoxContent) => {
    try {
        const response = await fetch(`${process.env.PUBLIC_URL}/cleaned_data_1.csv`); 
        const text = await response.text(); 

        Papa.parse(text, {
            header: true,
            dynamicTyping: true,
            complete: (results) => {
                // Dispatch raw data for the dashboard
                // all other processing handled locally in the dashboard.js file
                dispatch(setRawData(results.data)); 
                
                if (graphType === 'graph1') {
                    handleGraph1Data(results.data, dispatch);
                } else if (graphType === 'graph2') {
                    handleGraph2Data(results.data, dispatch);
                } else if (graphType === 'graph3') {
                    handleGraph3Data(results.data, dispatch, setTextBoxContent);
                }
            },
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

/***************************************************/
/*          Filtered data for grpah 1              */
/***************************************************/

const handleGraph1Data = (data, dispatch) => {
    const modeData = [];
    const sheetsData = [];

    data.forEach(row => {
        const application = row.application;
        const duration = row.duration;

        if (application === 'mode') {
            const monthYear = new Date(row.timestamp).toISOString().slice(0, 7);
            modeData.push({ monthYear, duration: duration / 3600 });
        } else if (application === 'google sheets') {
            const monthYear = new Date(row.timestamp).toISOString().slice(0, 7);
            sheetsData.push({ monthYear, duration: duration / 3600 });
        }
    });

    const fullRange = generateFullMonthRange('2021-01', '2024-06');
    const modeUsageByMonth = prepareMonthlyData(modeData, fullRange);
    const sheetsUsageByMonth = prepareMonthlyData(sheetsData, fullRange);

    dispatch(setGraphData('graph1', {
        labels: modeUsageByMonth.month_year,
        datasets: [
            {
                label: 'Mode',
                data: modeUsageByMonth.duration,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: false,
            },
            {
                label: 'Google Sheets',
                data: sheetsUsageByMonth.duration,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: false,
            },
        ],
    }));
};

/***************************************************/
/*          Filtered data for grpah 2              */
/***************************************************/

const handleGraph2Data = (data, dispatch) => {
    const combinedData = [];
    const analyticsData = [];

    data.forEach(row => {
        const duration = row.duration;
        const monthYear = new Date(row.timestamp).toISOString().slice(0, 7);

        if (row.activity_subtype === 'Email & Customer Relations' || row.activity_subtype === 'Operations') {
            combinedData.push({ monthYear, duration: duration / 3600 });
        } else if (row.activity_subtype === 'analytics') {
            analyticsData.push({ monthYear, duration: duration / 3600 });
        }
    });

    const fullRange = generateFullMonthRange('2021-01', '2024-06');
    const combinedUsageByMonth = prepareMonthlyData(combinedData, fullRange);
    const analyticsUsageByMonth = prepareMonthlyData(analyticsData, fullRange);

    dispatch(setGraphData('graph2', {
        labels: combinedUsageByMonth.month_year,
        datasets: [
            {
                label: 'Email & Customer Relations / Operations',
                data: combinedUsageByMonth.duration,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: false,
            },
            {
                label: 'Analytics',
                data: analyticsUsageByMonth.duration,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: false,
            },
        ],
    }));
};

/***************************************************/
/*          Filtered data for grpah 3              */
/***************************************************/

const handleGraph3Data = (data, dispatch, setTextBoxContent) => {
    const totalWorkByYear = {};
    const analyticsByYear = {};
    let tempPercentages = [];

    data.forEach(row => {
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

    // Prepare text for the box with percentages
    const yearText = years.map((year, index) => {
        const percentage = tempPercentages[index].toFixed(1); // Use tempPercentages here
        return `${year}: Analytics ${percentage}%`;
    }).join('\n');

    // Set the text box content
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
};

// Generates an array of month strings in the format 'YYYY-MM' between the start and end dates
const generateFullMonthRange = (start, end) => {
    const fullRange = [];
    const startDate = new Date(start + '-01');
    const endDate = new Date(end + '-01');

    let currentDate = startDate;

    while (currentDate <= endDate) {
        fullRange.push(currentDate.toISOString().slice(0, 7)); // Format as 'YYYY-MM'
        currentDate.setMonth(currentDate.getMonth() + 1); // Move to the next month
    }

    return fullRange;
};

// Prepares the monthly data for graphing, filling in gaps for months with no data
const prepareMonthlyData = (data, fullRange) => {
    const monthlyData = {};

    // Aggregate durations by month
    data.forEach(item => {
        const { monthYear, duration } = item;
        if (!monthlyData[monthYear]) {
            monthlyData[monthYear] = 0;
        }
        monthlyData[monthYear] += duration; // Sum durations for each month
    });

    const month_year = fullRange; // Use the full range of months
    const duration = month_year.map(month => monthlyData[month] || 0); // Fill gaps with 0

    return { month_year, duration }; // Return the structured data for graphing
};

export default loadDataForGraphs;