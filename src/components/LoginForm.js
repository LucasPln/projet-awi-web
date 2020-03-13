import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from '../actions/authActions'
import { Redirect } from 'react-router-dom'
import { IoIosCloseCircle } from 'react-icons/io'
import { Link } from 'react-router-dom'

class LoginForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            opacity: 0,
            redirect: false
        }
    }

    componentDidMount = () => {
        this.refs.pseudo.focus()
        setTimeout(() => this.setState({...this.state, opacity: 1}), 1)
    }

    componentDidUpdate = () => {
        if (this.props.loggedIn === true && this.state.opacity) {
            this.handleClose();
        }
    }

    sendLoginInfo = () => {
        if (this.refs.pseudo.value !== '' && this.refs.mdp.value !== '')
            this.props.login(this.refs.pseudo.value, this.refs.mdp.value);
    }

    handleClose = () => {
        this.setState({ ...this.state, opacity: 0 });
        setTimeout(() => this.setState({...this.state, redirect: true}), 300)
    }

    render() {
        let style = {
            width: this.props.width,
            height: this.props.height,
            opacity: this.state.opacity
        }

        if (this.state.redirect) 
            return <Redirect to="/" />
        
        return (
            <div id="login" className="login" style={ style } onKeyPress={ e => (e.key === "Enter" ? this.sendLoginInfo() : '') } >
                <h2 id="login-title">Connectez-vous à <i>Equal Report</i> !</h2>
                    <span id="login-close" onClick={this.handleClose}><IoIosCloseCircle /></span>
                    <input id="login-pseudo" placeholder="pseudo" ref="pseudo" />
                    <input id="login-mdp" type="password" placeholder="mot de passe" ref="mdp" />
                <button id="login-submit" onClick={ this.sendLoginInfo }>Log in</button>
                <p>Vous n'avez pas de compte ? Inscrivez-vous <Link>ici</Link>.</p>
            </div>


        )
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.loggedIn,
    height: state.app.height,
    width: state.app.width
})


export default connect(mapStateToProps, {login})(LoginForm);