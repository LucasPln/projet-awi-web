import { GET_POSTS, UPDATE_DIMENSIONS, GET_POST_BY_ID, TOGGLE_ADMIN_VIEW, SUPPRIMER_POST} from '../actions/types'

const initialState = {
    posts: [],
    activePost: {},
    height: window.innerHeight,
    width: window.innerWidth,
    adminView: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload.posts
            }
        case GET_POST_BY_ID:
            return {
                ...state,
                activePost: action.payload.post
            }
        case UPDATE_DIMENSIONS:
            return {
                ...state,
                height: action.payload.height,
                width: action.payload.width
            }
        case TOGGLE_ADMIN_VIEW:
            return {
                ...state,
                adminView: !state.adminView
            }
        case SUPPRIMER_POST:
            console.log(action.payload)
            return{
                ...state
            }
        default: return state;
    }
}