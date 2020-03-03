import { GET_POSTS } from './types'
import axios from 'axios'

export const getPosts = () => dispatch => {
    axios.get(`${process.env.REACT_APP_URL}/posts`)
        .then(
            (res) => {
                console.log(res)
                
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