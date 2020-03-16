import { LOGIN, LOGOUT, SET_AUTH, STATE_WAITING } from '../actions/types'
const initialState = {
    loggedIn: false,
    user: {
        pseudo: '',
        email: '',
        _id: '',
        isAdmin: false
    },
    waiting: false,
    token: '',
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                loggedIn: true,
                user: {
                    ...action.payload.user
                },
                token: action.payload.token
            }
        case LOGOUT:
            return {
                ...state,
                loggedIn: false,
                user: {
                    pseudo: '',
                    email: '',
                    _id: '',
                    isAdmin: false
                },
                token: ''
            }
        case SET_AUTH:
            return {
                ...state,
                loggedIn: action.payload.auth.loggedIn,
                user: {
                    pseudo: action.payload.auth.user.pseudo,
                    email: action.payload.auth.user.email,
                    _id: action.payload.auth.user._id,
                    isAdmin: action.payload.auth.user.isAdmin
                },
                token: action.payload.auth.token,
                waiting: action.payload.auth.waiting
            }
        case STATE_WAITING:
            return {
                ...state,
                waiting: action.payload.waiting
            }
        default: return state
    }
}