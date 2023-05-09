export const add = (day, time, name) => ({
    type: 'ADD',
    day: day,
    time: time,
    name: name
})

export const clear = () => ({
    type: 'CLEAR'
})

export const remove = (day, time, order) => ({
    type: 'REMOVE',
    day: day,
    time: time,
    order: order
})
