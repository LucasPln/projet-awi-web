import { GET_POSTS, UPDATE_DIMENSIONS, GET_POST_BY_ID, GET_COMMENTS_BY_POST_ID, TOGGLE_ADMIN_VIEW, TOGGLE_ADMIN_USER_VIEW, TOGGLE_FILTER, UPDATE_SEARCH, SET_USER, GET_USERS } from './types'
import axios from 'axios'
import { stateWaiting, login, loginError } from './authActions'

export const getPosts = () => dispatch => {
    dispatch(stateWaiting(true))
    axios.get(`${process.env.REACT_APP_URL}/posts`)
        .then(
            (res) => {
                dispatch(stateWaiting(false))
                dispatch({
                    type: GET_POSTS,
                    payload: {
                        posts: res.data
                    }
                })

            },
            (error) => {
                console.log(error.response)
                dispatch(stateWaiting(false))
            }
        )
}

export const getUsers = (token, wait = true) => dispatch => {
    if (wait) dispatch(stateWaiting(true))
    axios.get(`${process.env.REACT_APP_URL}/utilisateurs`, {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            }
        })
        .then(
            (res) => {
                dispatch(stateWaiting(false))
                dispatch({
                    type: GET_USERS,
                    payload: {
                        users: res.data
                    }
                })

            },
            (error) => {
                console.log(error.response)
                dispatch(stateWaiting(false))
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
                    console.log(error.response)
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
            commentaire ? dispatch(getCommentsByPostId(post.parentId)) : dispatch(getPosts())
        })
        .catch(err => console.log(err.response))
}

export const modifierSignaler = (post, idUser, token, signaler, commentaire = false) => dispatch => {
    signaler ? post.signaler = post.signaler.filter(id => id !== idUser) : post.signaler.push(idUser)
    let url = commentaire ? `${process.env.REACT_APP_URL}/commentaires/${post._id}` : `${process.env.REACT_APP_URL}/posts/${post._id}`
    axios.patch(url, post, {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            commentaire ? dispatch(getCommentsByPostId(post.parentId)) : dispatch(getPosts())
        })
        .catch(err => console.log(err))
}

export const modifierPost = (post, texte, token, commentaire = false) => dispatch => {
    post.texte = texte
    let url = commentaire ? `${process.env.REACT_APP_URL}/commentaires/${post._id}` : `${process.env.REACT_APP_URL}/posts/${post._id}`
    axios.patch(url, post, {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            commentaire ? dispatch(getCommentsByPostId(post.parentId)) : dispatch(getPosts())
        })
        .catch(err => console.log(err))
}

export const modifierUser = (userId, pseudo, token, params) => dispatch => {
    if (params.mdp) {
        axios.post(`${ process.env.REACT_APP_URL }/auth/login`, { pseudo: pseudo, mdp: params.mdp })
            .then(res => {
                params.mdp = params.newMdp
                delete params.newMdp
                axios.patch(`${ process.env.REACT_APP_URL }/utilisateurs/${ userId }`, params, {
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${token}`
                    }
                })
                    .then(res => {
                        dispatch(login(params.pseudo ? params.pseudo : pseudo, params.mdp))
                        dispatch(getPosts())
                    })
                    .catch(err => dispatch(loginError("Erreur de modification")))
            })
            .catch(err => dispatch(loginError("Mot de passe incorrecte")))
    }
    else axios.patch(`${process.env.REACT_APP_URL}/utilisateurs/${userId}`, params, {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            axios.get(`${process.env.REACT_APP_URL}/utilisateurs/${userId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${token}`
                    }
            })
                .then(res => {
                    dispatch({
                        type: SET_USER,
                        payload: {
                            user: res.data[0]
                        }
                    })
                    dispatch(getPosts())
                })
        })
        .catch(err => dispatch(loginError("Erreur de modification")))
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
                    id: postId,
                    commentaires: res.data
                }
            })
        })
        .catch(err => {
            console.log(err.response)
        })
}

export const writeComment = (postId, createur, texte, token) => dispatch => {
    let body = { parentId: postId, createur: createur, texte: texte, dateCreation: Date.now() }
    axios.post(`${ process.env.REACT_APP_URL }/commentaires`, body, {
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${ token }`
        }
    })
        .then(res => {
            console.log(res)
            dispatch(getCommentsByPostId(postId))
            dispatch(getPosts())
            dispatch(getPostById(postId))
        })
        .catch(err => console.log(err.response))
}

export const toggleAdminView = () => dispatch => {
    dispatch({
        type: TOGGLE_ADMIN_VIEW
    })
}
export const toggleAdminUserView = () => dispatch => {
    dispatch({
        type: TOGGLE_ADMIN_USER_VIEW
    })
}

export const supprimerPost = (post, token, commentaire = false) => dispatch => {
    console.log(post)
    let url = commentaire ? `${process.env.REACT_APP_URL}/commentaires/${post._id}` : `${process.env.REACT_APP_URL}/posts/${post._id}`
    axios.delete(url, {
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${ token }`
        }
    })
        .then(
            (res) => {
                console.log(res)
                commentaire ? dispatch(getCommentsByPostId(post.parentId)) : dispatch(getPosts())
                
            },
            (error) => {
                console.log(error.response)
            })
}

export const createPost = (createur, texte, token) => dispatch => {

    let body = { createur: createur, texte: texte, dateCreation: Date.now() }

    axios.post(`${process.env.REACT_APP_URL}/posts`, body, {
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`}
    })
        .then(
            (res) => {
                console.log(res);
                dispatch(getPosts())
            },
            (error) => {
                console.log(error.response)
            }
        )
}

export const viderSignalement = (post, token, commentaire = false) => dispatch => {
    post.signaler = []
    let url = commentaire ? `${process.env.REACT_APP_URL}/commentaires/${post._id}` : `${process.env.REACT_APP_URL}/posts/${post._id}`
    axios.patch(url, post, {
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${ token }`
        }
    })
        .then(
            (res) => {
                console.log(res)
                commentaire ? dispatch(getCommentsByPostId(post.parentId)) : dispatch(getPosts())
                
            },
            (error) => {
              console.log(error.response)
            })
}

export const toggleFilter = (type, directionDate, directionLike, comment = false) => dispatch => {
    dispatch({
        type: TOGGLE_FILTER,
        payload: {
            comment: comment,
            filter: {
                type: type,
                directionDate: directionDate,
                directionLike: directionLike
            }
        }
    })
}

export const updateSearch = (searchValue) => dispatch => {
    dispatch({
        type: UPDATE_SEARCH,
        payload: {
            searchValue: searchValue
        }
    })
}

export const toggleAdmin = (user, token) => dispatch => {
    user.isAdmin = !user.isAdmin
    axios.patch(`${ process.env.REACT_APP_URL }/utilisateurs/${ user._id }`, user, {
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${ token }`
        }
    })
        .then(res => dispatch(getUsers(token, false)))
        .catch(err => console.log(err.response))
}

export const deleteUser = (user, token) => dispatch => {
    axios.delete(`${ process.env.REACT_APP_URL }/utilisateurs/${ user._id }`, {
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${ token }`
        }
    })
        .then(res => {
            dispatch(getUsers(token, false))
            dispatch(getPosts())
        })
        .catch(err => console.log(err.response))
}