const users = (state = {}, action) => {
    switch (action.type) {
        case 'SET_AUTH_USER':
            return {...state, authUser: action.authUser}
        default:
            return state
    }
}

export default users
