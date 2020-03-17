import { GET_POSTS, UPDATE_DIMENSIONS, GET_POST_BY_ID, GET_COMMENTS_BY_POST_ID, TOGGLE_ADMIN_VIEW } from '../actions/types'

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
    activeCommentaires: {
        id: '',
        commentaires: []
    },
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
        case GET_COMMENTS_BY_POST_ID:
            return {
                ...state,
                activeCommentaires: {
                    id: action.payload.id,
                    commentaires: action.payload.commentaires
                }
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
        default: return state;
    }
}