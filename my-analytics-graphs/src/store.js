import { configureStore } from '@reduxjs/toolkit';

const initialState = {
    rawData: [],
    graphData: {
        graph1: [],
        graph2: [],
        graph3: [],
    },
    filteredData: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_GRAPH_DATA':
            return {
                ...state,
                graphData: {
                    ...state.graphData,
                    [action.payload.graphId]: action.payload.data, // Use graphId to set specific graph data
                },
            };
        default:
            return state;
    }
};

// Create the store using configureStore
const store = configureStore({
    reducer, // Pass the reducer directly
});

export default store; // Export the store