import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import './styles/App.css';
import './styles/LoginForm.css';
import './styles/Navbar.css';
import './styles/Post.css';
import './styles/PostList.css';
import './styles/PostView.css';
import './styles/Comment.css';
import './styles/TexteForm.css';
import './styles/MonProfil.css';
import './styles/User.css';
import './styles/CreateAccountForm.css';
import App from './components/App';
import { Provider } from 'react-redux'
import store from './store'

ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>, document.getElementById('root'));
