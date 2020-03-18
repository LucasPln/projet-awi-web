import { GET_POSTS, UPDATE_DIMENSIONS, GET_POST_BY_ID, GET_COMMENTS_BY_POST_ID, TOGGLE_ADMIN_VIEW, TOGGLE_FILTER, UPDATE_SEARCH } from '../actions/types'

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
    adminView: false,
    filter: {
        type: 'date',
        directionDate: true,
        directionLike: true
    },
    searchValue: ''
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
        case TOGGLE_FILTER:
            return {
                ...state,
                filter: {
                    type: action.payload.filter.type,
                    directionDate: action.payload.filter.directionDate,
                    directionLike: action.payload.filter.directionLike
                }
            }
        case UPDATE_SEARCH:
            return {
                ...state,
                searchValue: action.payload.searchValue
            }
        default: return state;
    }
}