import { combineReducers } from 'redux'
import appReducer from './appReducer'
import authReducer from './authReducer'

export default combineReducers({
    auth: authReducer,
    app: appReducer
})