// actions.js
export const setGraphData = (graphId, data) => ({
    type: 'SET_GRAPH_DATA',
    payload: { graphId, data }, // Include graphId in the payload
});