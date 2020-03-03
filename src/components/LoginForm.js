import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from '../actions/authActions'

class LoginForm extends Component {
    
    sendLoginInfo = () => {
        this.props.login(this.refs.pseudo.value, this.refs.mdp.value);
    }

    render() {
        return (
            <div id="login">
                <input id="login-pseudo" placeholder="pseudo" ref="pseudo" />
                <input id="login-mdp" type="password" placeholder="mot de passe" ref="mdp" />
                <button id="login-submit" onClick={this.sendLoginInfo}>Log in</button>
                <h1>{ `${this.props.loggedIn}` }</h1>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.loggedIn
})


export default connect(mapStateToProps, {login})(LoginForm);