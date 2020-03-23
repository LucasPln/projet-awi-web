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
    else if (persistedState !== undefined) {
        auth = JSON.parse(decipher(persistedState.auth))
        if (store.getState().auth.token === "") 
            store.dispatch({
                type: SET_AUTH,
                payload: {
                    auth: auth
                }
            })
        else if (store.getState().auth.user.pseudo !== auth.user.pseudo || store.getState().auth.email !== auth.user.email || store.getState().auth.token !== auth.token) {
            auth = store.getState().auth;
            auth = cipher(JSON.stringify(auth));
            saveState({
                auth: auth
            })
        }
    }
    
});

export default store;