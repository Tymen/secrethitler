import {setSecond} from "../actions/room-actions";

const room = (state = {messages: []}, action) => {
    switch (action.type) {
        case 'SET_ROOM':
            return {...action.room, messages: state.messages};
        case 'EDIT_ACTIVE':
            return {...state, active: action.value};
        case 'SET_PRESIDENT':
            return {...state, president: action.user};
        case 'SET_CHANCELLOR':
            return {...state, chancellor: action.user};
        case 'SET_STAGE':
            return {...state, stage: action.int};
        case 'SET_SECOND':
            return {...state, second: action.int};
        case 'ADD_MESSAGE':
            return {...state, messages: [...state.messages, action.value]};
        case 'SET_POLICIES':
            return {...state, policies: action.value};
        case 'SET_BOARD_FASCIST':
            return {...state, fascist_board: action.value};
        case 'SET_WINNER':
            return {...state, winner: action.value};
        case 'SET_BOARD_LIBERAL':
            return {...state, liberal_board: action.value};
        case 'DELETE_ALL_MESSAGES':
            return {...state, messages: []};
        case 'PRESIDENT_CHOSEN_ANSWER':
            return {...state, presidentAnswer: action.value};
        case 'CHANCELLOR_CHOSEN_ANSWER':
            return {...state, chancellorAnswer: action.value};
        case 'ELECTION_TRACKER':
            return {...state, electionTracker: action.value};
        default:
            return state
    }
}

export default room
