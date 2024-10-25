import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Import hooks from react-redux
import { setGraphData } from './actions'; // Adjust the path as needed
import { Chart, CategoryScale, LinearScale, LineController, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2'; // Import the Line component
import Papa from 'papaparse'; // Import PapaParse

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, LineController, LineElement, Title, Tooltip, Legend);

const Graph = () => {
    const dispatch = useDispatch(); // Initialize dispatch
    const graphData = useSelector((state) => state.graphData.graph1); // Adjust as needed

    const options = useMemo(() => ({
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Month-Year',
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
    }), []);

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

        fetchData();
    }, [dispatch]); // Ensure dispatch is included in the dependency array

    const prepareMonthlyData = (data, fullRange) => {
        const monthlyData = {};
        data.forEach(item => {
            const { monthYear, duration } = item;
            if (!monthlyData[monthYear]) {
                monthlyData[monthYear] = 0;
            }
            monthlyData[monthYear] += duration;
        });

        const month_year = fullRange;
        const duration = month_year.map(month => monthlyData[month] || 0);

        return { month_year, duration };
    };

    const generateFullMonthRange = (start, end) => {
        const fullRange = [];
        const startDate = new Date(start + '-01');
        const endDate = new Date(end + '-01');
        let currentDate = startDate;

        while (currentDate <= endDate) {
            fullRange.push(currentDate.toISOString().slice(0, 7));
            currentDate.setMonth(currentDate.getMonth() + 1);
        }

        return fullRange;
    };

    return (
        <div className="chart-container">
            <h2>Application Usage Over Time by Month</h2>
            <Line data={graphData} options={options} /> {/* This line draws the graph */}
        </div>
    );
};

export default Graph;
