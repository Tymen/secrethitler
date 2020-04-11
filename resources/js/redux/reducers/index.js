import { combineReducers } from 'redux'
import users from './users'
import room from "./room";

export default combineReducers({
    users,
    room
})
