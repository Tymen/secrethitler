const room = (state = {}, action) => {
    switch (action.type) {
        case 'SET_ROOM':
            return action.room
        case 'EDIT_ACTIVE':
            return {...state, active: action.value}
        default:
            return state
    }
}

export default room
