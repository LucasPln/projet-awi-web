import { LOGIN, LOGOUT } from './types'
import axios from 'axios'

export const login = (pseudo, mdp) => dispatch => {
    let body = { pseudo: pseudo, mdp: mdp }
    axios.post(`${process.env.REACT_APP_URL}/auth/login`, body)
        .then(
            (res) => {
                console.log(res)
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
            },
            (error) => {
                console.log(error)
            }
    )
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
    dispatch({
        type: LOGOUT
    })
}