import { LOGIN, LOGOUT, STATE_WAITING } from './types'
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
                            isAdmin: res.data.data.isAdmin
                        }
                    }
                })
                dispatch(stateWaiting(false))
            },
            (error) => {
                dispatch(stateWaiting(false))
                console.log(error)
            }
    )
}

export const stateWaiting = (waiting) => dispatch => {
    dispatch({
        type: STATE_WAITING,
        payload: {
            waiting: waiting
        }
    })
}

export const createAccount = (email,pseudo, mdp) => dispatch => {

    let body = { email: email, pseudo: pseudo, mdp: mdp }
    axios.post(`${process.env.REACT_APP_URL}/auth/createaccount`, body)
        .then(
            (res) => {
                dispatch({  // envoi l'infos au reduceur
                    type: LOGIN,
                    payload: {
                        token: res.data.token,
                        user: {
                            pseudo: res.data.data.pseudo,
                            email: res.data.data.email,
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

export const logout = () => dispatch => {
    saveState(undefined); 
    dispatch({
        type: LOGOUT
    })
}