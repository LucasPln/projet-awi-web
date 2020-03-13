import { LOGIN, LOGOUT } from './types'
import axios from 'axios'

export const login = (pseudo, mdp) => dispatch => {
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