import { GET_POSTS } from '../actions/types'

const initialState = {
    posts : []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:
            
            return {
                posts: action.payload.posts
            }

        default: return state;
    }
}