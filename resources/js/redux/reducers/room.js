const room = (state = {}, action) => {
    switch (action.type) {
        case 'SET_ROOM':
            return {...action.room, messages: []}
        case 'EDIT_ACTIVE':
            return {...state, active: action.value}
        case 'ADD_MESSAGE':
            return {...state, messages: [...state.messages, action.value]};
        case 'DELETE_ALL_MESSAGES':
            return {...state, messages: []};
        default:
            return state
    }
}

export default room
