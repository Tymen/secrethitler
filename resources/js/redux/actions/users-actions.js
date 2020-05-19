export const setAuthUser = authUser => ({
    type: 'SET_AUTH_USER',
    authUser
})
export const setUsers = users => ({
    type: 'SET_USERS',
    users
})
export const addUser = user => ({
    type: 'ADD_USER',
    user
})
export const deleteUser = id => ({
    type: 'DELETE_USER',
    id
})
export const changeUserIsKilled = id => ({
    type: 'CHANGE_USER_IS_KILLED',
    id
})
