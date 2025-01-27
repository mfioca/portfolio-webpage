import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Chart, CategoryScale, LinearScale, LineController, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import loadDataForGraphs from '../dataloader'; // Import your data loader function


Chart.register(CategoryScale, LinearScale, LineController, LineElement, PointElement, Title, Tooltip, Legend);

const Graph2 = () => {
    const dispatch = useDispatch(); // Initialize dispatch
    const graphData = useSelector((state) => state.graphData.graph2); // Access the Redux state for graph2
    const [isLoading, setIsLoading] = useState(true); // Initialize loading state

    const options = useMemo(() => ({
        responsive: false,
        layout: {
            padding: {
                top: 30, // Add padding at the top
                bottom: 20, // Add padding at the bottom
                left: 10, // Add padding to the left
                right: 10, // Add padding to the right
            },
            margin: 10,
        },
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
        plugins: {
            datalabels: {
                display: false, // Hide data labels
            },
        },
    }), []);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // Set loading to true
            await loadDataForGraphs(dispatch, 'graph2'); // Load data for graphs
            setIsLoading(false); // Set loading to false
        };

        fetchData();
    }, [dispatch]);

    if (isLoading) {
        return <div className="loading-overlay"><p>Loading...</p></div>; // Display loading message
    }

    if (!graphData || !graphData.labels || !graphData.datasets) {
        return <p>No data available</p>; // or handle the loading state
    }

    console.log('Graph Data:', graphData); // Log the graph data to verify

    return (
        <div className="box-style chart-container">
            <h2 className="shadow">Job Focus and Activities Over Time by Month</h2>
            <Line data={ graphData } options={ options } width={ 350 } height={ 250 } /> {/* Use Redux graph data */}
        </div>
    );
};

export default Graph2;