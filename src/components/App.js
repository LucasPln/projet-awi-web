import React from 'react'
import { Provider } from 'react-redux'
import store from '../store'
import '../styles/App.css'
import LoginForm from './LoginForm'
import MainComponent from './MainComponent'

function App() {
  return (
    <Provider store={store}>
      <MainComponent />
    </Provider>
  );
}

export default App;
