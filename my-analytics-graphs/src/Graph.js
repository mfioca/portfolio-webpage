import React, { useEffect, useState, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, LineController, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import 'chartjs-plugin-annotation';

Chart.register(CategoryScale, LinearScale, LineController, LineElement, PointElement, Title, Tooltip, Legend);



const Graph = () => {
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
        annotation: {
            annotations: {
                line1: {
                    yMin: 0, // Change this to 0 or another value you know exists in your data
                    yMax: 0,
                    borderColor: 'rgb(255, 99, 132)', // Color of the line
                    borderWidth: 10, // Width of the line
                },
            },
        },
    }), []);

    // Hardcoded data for the chart
    useEffect(() => {
        const hardcodedLabels = ['2023-01', '2023-02', '2023-03', '2023-04', '2023-05', '2023-06'];
        const modeData = [30, 50, 40, 60, 70, 80]; // Example data for 'Mode'
        const sheetsData = [20, 30, 25, 35, 45, 55]; // Example data for 'Google Sheets'

        setData({
            labels: hardcodedLabels,
            datasets: [
                {
                    label: 'Mode',
                    data: modeData,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: false,
                },
                {
                    label: 'Google Sheets',
                    data: sheetsData,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    fill: false,
                },
            ],
        });
    }, []); // Dependency array is empty to run once

    return (
        <div>
            <h2>Application Usage Over Time by Month</h2>
            <Line data={data} options={options} />
        </div>
    );
};

export default Graph;
