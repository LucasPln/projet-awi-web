import { GET_POSTS, UPDATE_DIMENSIONS, GET_POST_BY_ID, GET_COMMENTS_BY_POST_ID } from './types'
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
            (error) => {
                console.log(error)
            }
        )
}

/**
 * 
 * @param {*} postId l'id du post à récuperer
 * @param {*} useApi boolean - si vrai fait une requete vers l'api, si faux envoi le post en param
 * @param {*} post le post a envoyer dans le cas ou useApi est vrai
 */
export const getPostById = (postId, useApi = true, post = null) => dispatch => {
    if (useApi) {
        axios.get(`${ process.env.REACT_APP_URL }/posts/${ postId }`)
            .then(
                (res) => {
                    dispatch({
                        type: GET_POST_BY_ID,
                        payload: {
                            post: res.data
                        }
                    })

                },
                (error) => {
                    console.log(error)
                }
            )
    } else
        dispatch({
            type: GET_POST_BY_ID,
            payload: {
                post: post
            }
        })
}

export const modifierLike = (post, idUser, token, liked, commentaire = false) => dispatch => {
    liked ? post.reactions = post.reactions.filter(id => id !== idUser) : post.reactions.push(idUser)
    let url = commentaire ? `${process.env.REACT_APP_URL}/commentaires/${post._id}` : `${process.env.REACT_APP_URL}/posts/${post._id}`
    axios.patch(url, post, {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            console.log(res);
            commentaire ? dispatch(getCommentsByPostId(post.parentId)) : dispatch(getPosts())
        })
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

export const getCommentsByPostId = (postId) => dispatch => {
    axios.get(`${process.env.REACT_APP_URL}/commentaires/${postId}`)
        .then(res => {
            dispatch({
                type: GET_COMMENTS_BY_POST_ID,
                payload: {
                    commentaires: res.data
                }
            })
        })
        .catch(err => console.log(err))
}

export const writeComment = (postId, createur, texte, token) => dispatch => {
    let body = {parentId: postId, createur: createur, texte: texte, dateCreation: Date.now()}
    axios.post(`${ process.env.REACT_APP_URL }/commentaires`, body,{
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            console.log(res)
            dispatch(getCommentsByPostId(postId))
            dispatch(getPosts())
            dispatch(getPostById(postId))
        })
        .catch(err => console.log(err))
}