import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Logger } from './globals/Middleware'
import reducer from './reducers'
import { loadState, saveState } from './localStorage'
import { cipher, decipher } from './globals'
import { SET_AUTH } from './actions/types'

const middleware = [ thunk, Logger ]

const store = createStore(reducer, applyMiddleware(...middleware))

store.subscribe(() => {
    let persistedState = loadState();
    let auth = ""
    if (store.getState().auth.token !== "" && persistedState === undefined) {
        auth = store.getState().auth;
        auth = cipher(JSON.stringify(auth));
        saveState({
            auth: auth
        }); 
    }
    else if (store.getState().auth.token === "" && persistedState !== undefined) {
        auth = JSON.parse(decipher(persistedState.auth))
        store.dispatch({
            type: SET_AUTH,
            payload: {
                auth: auth
            }
        })
    }
    
});

export default store;