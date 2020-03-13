import { GET_POSTS, UPDATE_DIMENSIONS, GET_POST_BY_ID, TOGGLE_ADMIN_VIEW, LOGIN} from './types'
import axios from 'axios'

export const getPosts = () => dispatch => {
    axios.get(`${process.env.REACT_APP_URL}/posts`)
        .then(
            (res) => {
                dispatch({
                    type: GET_POSTS,
                    payload: {
                        posts: res.data
                    }
                })
                
            },
            (error) =>{
                console.log(error)
            }
        )
}

export const getPostById = (postId) => dispatch => {
    axios.get(`${process.env.REACT_APP_URL}/posts/${postId}`)
        .then(
            (res) => {
                dispatch({
                    type: GET_POST_BY_ID,
                    payload: {
                        post: res.data
                    }
                })
            },
            (error) =>{
                console.log(error)
            }
        )
}

export const modifierLike = (post, idUser, token, liked) => dispatch => {
    liked ? post.reactions = post.reactions.filter(id => id !== idUser) : post.reactions.push(idUser)
    axios.patch(`${process.env.REACT_APP_URL}/posts/${post._id}`, post, {
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
        }
    })
        .then(res => { console.log(res); dispatch(getPosts()) })
        .catch(err => console.log(err))
}

export const updateDimensions = (height, width) => dispatch => {
    dispatch({
        type: UPDATE_DIMENSIONS,
        payload: {
            height: height,
            width: width
        }
    })
}

export const toggleAdminView = () => dispatch => {
    dispatch({
        type: TOGGLE_ADMIN_VIEW
    })
}

export const supprimerPost = (postId, token) => dispatch => {
    axios.delete(`${ process.env.REACT_APP_URL }/posts/${ postId }`, {
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${ token }`
        }
    })
        .then(
            (res) => {
                console.log(res)
                dispatch(getPosts())
                
            },
            (error) => {
            })
}

export const createPost = (text,token,_id) => dispatch => {

    let body = { text: text}

    axios.post(`${process.env.REACT_APP_URL}/post`, body,{

        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`}
    })
        .then(
            (res) => {
                console.log(res);
                dispatch({  // envoi l'infos au reduceur
                    type: LOGIN,
                    payload: {
                        token: res.data.token,
                        user: {
                            text: res.data.data.text,
                            _id: res.data.data._id
                        }
                    }
                })
            },
            (error) => {
                console.log(error)
            }
        )
}

export const viderSignalement = (post,token) => dispatch => {

    console.log(post)
    post.signaler = []
    axios.patch(`${ process.env.REACT_APP_URL }/posts/${ post._id }`, post, {
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${ token }`
        }
    })
        .then(
            (res) => {
                console.log(res)
                dispatch(getPosts())
                
            },
            (error) => {
            })
}