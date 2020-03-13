import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Logger } from './globals/Middleware'
import reducer from './reducers'
import { loadState, saveState } from './localStorage'
import { cipher } from './globals'
import { SET_TOKEN } from './actions/types'

// const persistedState = loadState();

const middleware = [ thunk, Logger ]

const store = createStore(reducer, applyMiddleware(...middleware))

// store.subscribe(() => {
//     let token = store.getState().auth.token;
//     // Encrypting the tokens
//     if (token) {
//         if (token.accessToken) {
//             if (Object.keys(token.accessToken).length !== 0) {
//                 let myCipher = cipher(process.env.REACT_APP_SALT);
//                 token = myCipher(JSON.stringify(token));
//                 // Saving encrypted tokens to the state
//                 store.dispatch({
//                     type: SET_TOKEN,
//                     payload: token
//                 });
//             };
//         }

//         // Saving the state to localStorage
//         saveState({
//             token: token
//         });
//     }
// });

export default store;