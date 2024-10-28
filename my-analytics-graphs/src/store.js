import { configureStore } from '@reduxjs/toolkit';

// Initial state structure
const initialState = {
    rawData: [],
    graphData: {
        graph1: { labels: [], datasets: [] },
        graph2: { labels: [], datasets: [] },
        graph3: { labels: [], datasets: [] },
    },
    filteredData: [],
};

// Reducer function to handle actions
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_GRAPH_DATA':
            return {
                ...state,
                graphData: {
                    ...state.graphData,
                    [action.payload.graphId]: action.payload.data,
                },
            };
        case 'SET_RAW_DATA': // New case to handle raw data setting
            return {
                ...state,
                rawData: action.payload, // Update rawData with the payload
            };
        default:
            return state;
    }
};

// Create the store
const store = configureStore({
    reducer,
});

export default store;