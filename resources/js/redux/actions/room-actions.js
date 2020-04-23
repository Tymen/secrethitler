export const setRoom = room => ({
    type: 'SET_ROOM',
    room
})

export const editActive = value => ({
    type: 'EDIT_ACTIVE',
    value
})

export const setPresident = user => ({
    type: 'SET_PRESIDENT',
    user
})

export const setChancellor = user => ({
    type: 'SET_CHANCELLOR',
    user
})

export const addMessage = value => ({
    type: 'ADD_MESSAGE',
    value
})

export const deleteAllMessages = () => ({
    type: 'DELETE_ALL_MESSAGES',
})

