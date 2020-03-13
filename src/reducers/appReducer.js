import { GET_POSTS, UPDATE_DIMENSIONS, GET_POST_BY_ID, GET_COMMENTS_BY_POST_ID } from '../actions/types'

const initialState = {
    posts: [],
    activePost: {
        _id: '',
        createur: {
            _id: '',
            pseudo: ''
        },
        dateCreation: '',
        texte: '',
        reactions: [],
        signaler: [],
        numCommentaires: ''
    },
    activeCommentaires: [],
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
        case GET_POST_BY_ID:
            return {
                ...state,
                activePost: action.payload.post
            }
        case GET_COMMENTS_BY_POST_ID:
            return {
                ...state,
                activeCommentaires: action.payload.commentaires
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