const users = (state = {users: []}, action) => {
    switch (action.type) {
        case 'SET_AUTH_USER':
            return {...state, authUser: action.authUser}
        case 'SET_USERS':
            return {...state, users: action.users}
        case 'ADD_USER':
            return {...state, users: [...state.users, action.user]}
        case 'DELETE_USER':
            return {...state, users: state.users.filter(user => user.id !== action.id)}
        case 'CHANGE_USER_IS_KILLED':
            return {...state, users: state.users.filter(user => user.id !== action.id)}
        default:
            return state
    }
}

export default users
