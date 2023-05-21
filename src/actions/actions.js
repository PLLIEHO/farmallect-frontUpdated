export const add = (day, time, name) => ({
    type: 'ADD',
    day: day,
    time: time,
    name: name
})

export const clear = () => ({
    type: 'CLEAR'
})

export const remove = (day, time, id) => ({
    type: 'REMOVE',
    day: day,
    time: time,
    id: id
})

export const addCounter = (id) => ({
    type: 'ADDCOUNTER',
    id: id
})
export const removeCounter = (i) => ({
    type: 'REMOVECOUNTER',
    i: i
})
