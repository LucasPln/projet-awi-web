import React from 'react'
import { Provider } from 'react-redux'
import store from '../store'
import '../styles/App.css'
import LoginForm from './LoginForm'

function App() {
  return (
    <Provider store={store}>
      <LoginForm />
    </Provider>
  );
}

export default App;
