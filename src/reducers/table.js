const initialState = {
    table: [[[], [], [], [], [], [], []], [[], [], [], [], [], [], []], [[], [], [], [], [], [], []], [[], [], [], [], [], [], []], [[], [], [], [], [], [], []], [[], [], [], [], [], [], []]],
    count: [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]]
}

const table = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD':
            console.log(action)
            state.table[action.time][action.day].push(action.name);
            state.count[action.time][action.day]++;
            return state
        default:
            return state
    }
}

export const selectTable = state => state.table;

export default table