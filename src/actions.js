// Action to set graph data
export const setGraphData = (graphId, data) => ({
    type: 'SET_GRAPH_DATA',
    payload: { graphId, data }, // Include graphId in the payload
});

// New action to set raw data
export const setRawData = (data) => ({
    type: 'SET_RAW_DATA',
    payload: data, // The raw data parsed from the CSV
});

// Action to set text box content
export const setTextBoxContent = (content) => ({
    type: 'SET_TEXT_BOX_CONTENT',
    payload: content,
});

