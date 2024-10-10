import React, { useEffect, useState, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, LineController, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import Papa from 'papaparse';

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, LineController, LineElement, PointElement, Title, Tooltip, Legend);

const Graph2 = () => {
    const [data, setData] = useState({
        labels: [],
        datasets: [],
    });

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
                        const combinedData = [];
                        const analyticsData = [];
    
                        results.data.forEach(row => {
                            const duration = row.duration;
                            const monthYear = new Date(row.timestamp).toISOString().slice(0, 7); // Extract just YYYY-MM
    
                            // Combine Email & Customer Relations with Operations
                            if (row.activity_subtype === 'Email & Customer Relations' || row.activity_subtype === 'Operations') {
                                combinedData.push({ monthYear, duration: duration / 3600 });
                            } 
                            // Separate entry for Analytics
                            else if (row.activity_subtype === 'analytics') {
                                analyticsData.push({ monthYear, duration: duration / 3600 });
                            }
                        });
    
                        const fullRange = generateFullMonthRange('2021-01', '2024-06');
                        const combinedUsageByMonth = prepareMonthlyData(combinedData, fullRange);
                        const analyticsUsageByMonth = prepareMonthlyData(analyticsData, fullRange);
    
                        setData({
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
                        });
                    },
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);

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
            <h2>Job Focus and Activities Over Time by Month</h2>
            <Line data={data} options={options} />
        </div>
    );
};

export default Graph2;