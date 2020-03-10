import React, { Component } from 'react'
import { connect } from 'react-redux'
import {login} from "../actions/authActions";
import {Link, Redirect} from "react-router-dom"
import { IoIosCloseCircle } from 'react-icons/io'

import '../styles/CreateAccountForm.css'


class CreateAccountForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            opacity: 0,
            redirect: false
        }
    }

    componentDidMount = () => {
        this.refs.pseudo.focus()
        setTimeout(this.setState({...this.state, opacity: 1}), 1)
    }


    componentDidUpdate = () => {
        if (this.props.loggedIn === true && this.state.opacity) {
            this.handleClose();
        }
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
            <div id="createaccount" className="createaccount"  style={ style }>
                <h2 id="createaccount-title">Créer votre compte <i>Equal Report</i> !</h2>
                    <span id="createaccount-close" onClick={ console.log('ça clique')}></span>
                <label>Renseignez votre email :</label>
                    <input id="createaccount-pseudo" placeholder="email" ref="email" type="email" />
                <label>Choisissez votre pseudo :</label>
                    <input id="createaccount-pseudo" placeholder="pseudo" ref="pseudo" />
                <label>Choisissez votre Mot de passe :</label>
                    <input id="createaccount-mdp" type="password" placeholder="mot de passe" ref="mdp" />
                <label>Confirmez votre Mot de passe : </label>
                    <input id="createaccount-mdp" type="password" placeholder="confirmation du mot de passe" ref="mdp" />
                <button id="createaccount-submit" onClick={console.log('cliquez cliquez bande de crevette')}>Sign in</button>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    loggedIn: state.auth.loggedIn,
    height: state.app.height,
    width: state.app.width
})


export default connect(mapStateToProps,{login})(CreateAccountForm);