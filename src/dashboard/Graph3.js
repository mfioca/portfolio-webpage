import React, { useEffect, useMemo, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import loadDataForGraphs from '../dataloader'; // Import the data loader


Chart.register( CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend );

const Graph3 = () => {
    const dispatch = useDispatch(); // Initialize dispatch
    const graphData = useSelector((state) => state.graphData.graph3)  // Access Redux state for graph3
    const [textBoxContent, setTextBoxContent] = useState(''); // State for text box content
    const [percentages, setPercentages] = useState([]); // State for percentages
    const [isLoading, setIsLoading] = useState(true); // State for loading

    // Chart options configuration
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
            datalabels: {
                align: 'end', // Position the labels
                anchor: 'end', // Anchor the labels to the end of the bars
                labels: {
                    padding: 15, // Space between items in the legend
                },
                font: {
                    size: window.innerWidth < 768 ? 8 : 12, // Smaller font for data labels on smaller screens
                },
                formatter: (value) => {
                    if (typeof value === 'number') {
                        return `${value.toFixed(2)} hours`; // Ensure only 2 decimal points
                    }
                    return value; // Fallback in case value isn't a number
                },
            },
        },
        
    }), [percentages]); // Dependency on percentages

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // Set loading to true
            await loadDataForGraphs(dispatch, 'graph3', setTextBoxContent); // Load data for graphs
            setIsLoading(false); // Set loading to false
        };

        fetchData();
    }, [dispatch]); // Ensure dispatch is included in the dependency array

    // Calculate percentages for the datasets after loading data
    useEffect(() => {
        if (graphData.labels && graphData.datasets.length > 0) {
            const totalWorkDurations = graphData.datasets[0].data; // Total work data
            const analyticsDurations = graphData.datasets[1].data; // Analytics data

            const tempPercentages = analyticsDurations.map((duration, index) => {
                const total = totalWorkDurations[index] || 1; // Avoid division by zero
                return (duration / total) * 100; // Calculate percentage
            });

            setPercentages(tempPercentages); // Update percentages state

            // Prepare text for the box with percentages
            const yearText = graphData.labels.map((year, index) => {
                const percentage = tempPercentages[index].toFixed(1); // Use tempPercentages here
                return `${year}: Analytics ${percentage}%`;
            }).join('\n');

            setTextBoxContent(`${ yearText }\n\n`); // Set the text box content
        }
    }, [graphData]); // Dependency on graphData

    if (isLoading) {
        return <div className="loading-overlay"><p>Loading...</p></div>; // Display loading message
    }

    if (!graphData.labels || !graphData.datasets) {
        return <p>No data available</p>; // Show message if no data
    }

    return (
        <div className="box-style chart-container">
            <h2 className="shadow">Application Usage Over Time by Month</h2>
            <div className="chart3-data-box">
                { textBoxContent }
            </div>
            <Bar data={ graphData } options={ options } width={ 350 } height={ 250 } /> 
        </div>
    );
};

export default Graph3;

