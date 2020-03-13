import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from '../actions/authActions'
import {supprimerPost} from '../actions/appActions'
import '../styles/LoginForm.css'
import { Redirect, Link } from 'react-router-dom'
import { IoIosCloseCircle } from 'react-icons/io'

class DeleteForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            opacity: 0,
            redirect: false
        }
    }

    componentDidMount = () => {
        setTimeout(this.setState({...this.state, opacity: 1}), 1)
    }

    // componentDidUpdate = () => {
    //     if ( this.state.opacity) {
    //         this.handleClose();
    //     }
    // }

    handleClose = () => {
        this.setState({ ...this.state, opacity: 0 });
        setTimeout(() => this.setState({...this.state, redirect: true}), 300)
    }

    supprimerPost = () => {
        //console.log(this.props.location.pathname)
        let id = this.props.location.pathname.split("/")[2]
        console.log(id)
        this.props.supprimerPost(id, this.props.token)
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
                <h2 id="login-title">Voulez vous vraiment supprimer ce Post ?</h2>
                    
                <button id="login-submit" onClick={this.supprimerPost}>Oui</button>
                <button id="login-submit" onClick={this.handleClose}>Non</button>
                </div>


        )
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.loggedIn,
    height: state.app.height,
    width: state.app.width,
    token: state.auth.token
})


export default connect(mapStateToProps, {login, supprimerPost})(DeleteForm);