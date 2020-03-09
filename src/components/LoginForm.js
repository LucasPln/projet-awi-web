import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from '../actions/authActions'
import '../styles/LoginForm.css'
import { Redirect } from 'react-router-dom'
import { IoIosCloseCircle } from 'react-icons/io'
import { Link } from 'react-router-dom'

class LoginForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            opacity:0
        }
    }

    componentDidMount = () => {
        this.refs.pseudo.focus()
        setTimeout(this.setState({opacity: 1}), 1)
    }

    sendLoginInfo = () => {
        if (this.refs.pseudo.value !== '' && this.refs.mdp.value !== '')
            this.props.login(this.refs.pseudo.value, this.refs.mdp.value);
    }

    sleep = (milliseconds) => {
        const date = Date.now();
        let currentDate = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    }

    render() {
        let style = {
            width: this.props.width,
            height: this.props.height,
            opacity: this.state.opacity
        }

        if (this.props.loggedIn === true) {
            return <Redirect to="/" />
        }
            
        
        return (
            <div id="login" className="login" style={ style } onKeyPress={ e => (e.key === "Enter" ? this.sendLoginInfo() : '') } >
                <h2 id="login-title">Connectez-vous à <i>Equal Report</i> !</h2>
                    <Link id="login-close" to='/'><IoIosCloseCircle /></Link>
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