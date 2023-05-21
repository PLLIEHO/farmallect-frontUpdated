const initialState = {
    table: [[[], [], [], [], [], [], []], [[], [], [], [], [], [], []], [[], [], [], [], [], [], []], [[], [], [], [], [], [], []], [[], [], [], [], [], [], []], [[], [], [], [], [], [], []]],
    count: [[[], [], [], [], [], [], []], [[], [], [], [], [], [], []], [[], [], [], [], [], [], []], [[], [], [], [], [], [], []], [[], [], [], [], [], [], []], [[], [], [], [], [], [], []]],
}

const table = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD':
            console.log(action)
            state.table[action.time][action.day].push(action.name);

            const requestOptions = {
                method: 'GET',
                data: {},
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };
            fetch("/api/med/medicament/" + action.name, requestOptions)
                .then(res => res.json()).then((result) => {
                state.count[action.time][action.day].push(result.name);
            }, (error) => {
            })
            return state
        case 'REMOVE':
            const id = state.table[action.time][action.day].indexOf(action.id);
            console.log(action.id)
            console.log(id);
            if (id > -1) { // only splice array when item is found
                state.table[action.time][action.day].splice(id, 1);
                state.count[action.time][action.day].splice(id, 1);
            }
            return state
        default:
            return state
    }
}

export const selectTable = state => state.table;

export default table