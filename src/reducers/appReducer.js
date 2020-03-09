import { GET_POSTS, UPDATE_DIMENSIONS } from '../actions/types'

const initialState = {
    posts: [],
    height: window.innerHeight,
    width: window.innerWidth,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload.posts
            }
        case UPDATE_DIMENSIONS:
            return {
                ...state,
                height: action.payload.height,
                width: action.payload.width
            }
        default: return state;
    }
}