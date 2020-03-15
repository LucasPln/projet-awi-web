import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from '../actions/authActions'
import { viderSignalement, getPostById } from '../actions/appActions'
import '../styles/LoginForm.css'
import { Redirect } from 'react-router-dom'

class ViderSignalementForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            opacity: 0,
            redirect: false
        }
    }

    componentDidMount = () => {
        let id = this.props.location.pathname.split("/")[3]
        this.props.getPostById(id)
        setTimeout(this.setState({...this.state, opacity: 1}), 1)
    }

    handleClose = () => {
        this.setState({ ...this.state, opacity: 0 });
        setTimeout(() => this.setState({...this.state, redirect: true}), 300)
    }

    viderSignalement = () => {
        this.props.viderSignalement(this.props.activePost, this.props.token)
        this.handleClose()
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
                <h2 id="login-title">Voulez vous vraiment vider les signalements de ce Post ?</h2>
                    
                <button id="login-submit" onClick={this.viderSignalement}>Oui</button>
                <button id="login-submit" onClick={this.handleClose}>Non</button>
                </div>


        )
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.loggedIn,
    height: state.app.height,
    width: state.app.width,
    token: state.auth.token,
    activePost: state.app.activePost
})


export default connect(mapStateToProps, {login, viderSignalement, getPostById})(ViderSignalementForm);