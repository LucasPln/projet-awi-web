import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from '../actions/authActions'
import { IoIosCloseCircle } from 'react-icons/io'
import { Link } from 'react-router-dom'

class LoginForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            opacity: 0
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
        setTimeout(() => this.props.history.goBack(), 100)
    }

    render() {
        let style = {
            width: this.props.width,
            height: this.props.height,
            opacity: this.state.opacity
        }

        let waiting = this.props.waiting ? {} : { display: "none" }
        let waitingText = this.props.waiting ? { opacity: "0" } : {}

        return (
            <div id="login" className="login" style={ style } onKeyPress={ e => (e.key === "Enter" ? this.sendLoginInfo() : '') } >
                <h2 id="login-title">Connectez-vous à <i>Equal Report</i> !</h2>
                <span id="login-close" onClick={ this.handleClose }><IoIosCloseCircle /></span>
                <span style={ { color: 'red', position: 'absolute', marginTop: '-14rem'}}>{ this.props.msg }</span>
                <input id="login-pseudo" placeholder="pseudo" ref="pseudo" />
                <input id="login-mdp" type="password" placeholder="mot de passe" ref="mdp" />
                <button id="login-submit" onClick={ this.sendLoginInfo }><span style={waitingText}>Log in</span></button>
                <p>Vous n'avez pas de compte ? Inscrivez-vous <Link to={'/createaccount'}>ici</Link>.</p>
                <span className="state-waiting" id="login-state-waiting" style={waiting}></span>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.loggedIn,
    height: state.app.height,
    width: state.app.width,
    waiting: state.auth.waiting,
    msg: state.auth.msg
})


export default connect(mapStateToProps, {login})(LoginForm);