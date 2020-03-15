import { LOGIN, LOGOUT, SET_AUTH } from '../actions/types'
const initialState = {
    loggedIn: false,
    user: {
        pseudo: '',
        email: '',
        _id: '',
        isAdmin: false
    },
    token: ''
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
                ...action.payload.auth
            }
        default: return state
    }
}