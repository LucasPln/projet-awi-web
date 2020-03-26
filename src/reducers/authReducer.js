import { LOGIN, LOGOUT, SET_AUTH, STATE_WAITING, LOGIN_ERROR, SET_USER } from '../actions/types'
const initialState = {
    loggedIn: false,
    user: {
        pseudo: '',
        email: '',
        _id: '',
        isAdmin: false,
        photo: '',
        numSignaler: 0
    },
    waiting: false,
    token: '',
    msg: ''
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
                token: action.payload.token,
                waiting: false,
                msg: ''
            }
        case LOGIN_ERROR:
            return {
                ...state,
                msg: action.payload.msg
            }
        case LOGOUT:
            return {
                ...state,
                loggedIn: false,
                user: {
                    pseudo: '',
                    email: '',
                    _id: '',
                    isAdmin: false,
                    photo: ''
                },
                token: '',
                waiting: false,
                msg: ''
            }
        case SET_AUTH:
            return {
                ...state,
                loggedIn: action.payload.auth.loggedIn,
                user: {
                    pseudo: action.payload.auth.user.pseudo,
                    email: action.payload.auth.user.email,
                    _id: action.payload.auth.user._id,
                    isAdmin: action.payload.auth.user.isAdmin,
                    photo: action.payload.auth.user.photo
                },
                token: action.payload.auth.token,
                waiting: false,
                msg: ''
            }
        case STATE_WAITING:
            return {
                ...state,
                waiting: action.payload.waiting,
                msg: ''
            }
        case SET_USER:
            return {
                ...state,
                user: action.payload.user
            }
        default: return state
    }
}