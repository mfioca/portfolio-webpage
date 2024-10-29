import Papa from 'papaparse'; 
import { setGraphData } from './actions'; 

const loadDataForGraphs = async (dispatch) => {
    try {
        const response = await fetch('/cleaned_data_1.csv'); 
        const text = await response.text(); 

        Papa.parse(text, {
            header: true,
            dynamicTyping: true,
            complete: (results) => {
                const modeData = [];
                const sheetsData = [];

                results.data.forEach(row => {
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

                // Dispatch action to store graph data in Redux
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
            },
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

// Utility functions remain the same
// Generates an array of month strings in the format 'YYYY-MM' between the start and end dates
const generateFullMonthRange = (start, end) => {
    const fullRange = [];
    const startDate = new Date(start + '-01'); // Append '-01' for the first day of the month
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