import { LOGIN, LOGOUT, STATE_WAITING, LOGIN_ERROR } from './types'
import axios from 'axios'
import { saveState } from '../localStorage'

export const login = (pseudo, mdp) => dispatch => {
    dispatch(stateWaiting(true))
    let body = { pseudo: pseudo, mdp: mdp }
    axios.post(`${process.env.REACT_APP_URL}/auth/login`, body)
        .then(
            (res) => {
                dispatch({
                    type: LOGIN,
                    payload: {
                        token: res.data.token,
                        user: {
                            pseudo: res.data.data.pseudo,
                            email: res.data.data.email,
                            _id: res.data.data._id,
                            isAdmin: res.data.data.isAdmin,
                            photo: res.data.data.photo
                        }
                    }
                })
                dispatch(stateWaiting(false))
            },
            (error) => {
                dispatch(stateWaiting(false))
                dispatch(loginError(error.response.data.message))
            }
    )
}

export const loginError = (msg) => dispatch => {
    dispatch({
        type: LOGIN_ERROR,
        payload: {
            msg: msg
        }
    })
}

export const stateWaiting = (waiting) => dispatch => {
    dispatch({
        type: STATE_WAITING,
        payload: {
            waiting: waiting
        }
    })
}

export const createAccount = (email, pseudo, mdp, photo = 'img0') => dispatch => {
    dispatch(stateWaiting(true))
    let body = { email: email, pseudo: pseudo, mdp: mdp, photo: photo }
    axios.post(`${process.env.REACT_APP_URL}/auth/createaccount`, body)
        .then(
            (res) => {
                console.log(res)
                dispatch(stateWaiting(false))
                dispatch({  // envoi l'infos au reduceur
                    type: LOGIN,
                    payload: {
                        token: res.data.token,
                        user: {
                            pseudo: res.data.data.pseudo,
                            email: res.data.data.email,
                            _id: res.data.data._id,
                            photo: res.data.data.photo
                        }
                    }
                })
            },
            (error) => {
                dispatch(stateWaiting(false))
                dispatch(loginError(error.response.data.message))
            }
    )
}

export const logout = () => dispatch => {
    saveState(undefined); 
    dispatch({
        type: LOGOUT
    })
}