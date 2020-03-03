import { LOGIN } from '../actions/types'
const initialState = {
    loggedIn: false,
    user: {
        pseudo: '',
        email: '',
        _id: '5e57df3c54572f443d3655e0'
    },
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwc2V1ZG8iOiJhZG1pbiIsImlhdCI6MTU4MzI1MTM4MywiZXhwIjoxNTg1ODQzMzgzfQ.C--Vqzjcnmqdz-sPRWl9mfyIOSSDfeMcsm-apZnyGkA"
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
        default: return state
    }
}