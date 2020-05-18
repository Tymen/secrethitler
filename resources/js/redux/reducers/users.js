const users = (state = {}, action) => {
    switch (action.type) {
        case 'SET_AUTH_USER':
            return {...state, authUser: action.authUser}
        case 'SET_USERS':
            return {...state, users: action.users}
        default:
            return state
    }
}

export default users
