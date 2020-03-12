import React, { Component } from 'react'
import { connect } from 'react-redux'
import {createAccount} from "../actions/authActions";
import {Link, Redirect} from "react-router-dom"
import { IoIosCloseCircle } from 'react-icons/io'

class CreatePost extends Components {

    constructor(props) {
        super(props);
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
            <div id="createaccount" className="createaccount"  style={ style }  onKeyPress={ e => (e.key === "Enter" ? this.sendCreateAccountInfo() : '') }>
                <h2 id="createaccount-title">Créer votre compte <i>Equal Report</i> !</h2>
                <span id="createaccount-close"></span>
                <label>Renseignez votre email :</label>
                <input id="createaccount-pseudo" placeholder="email" ref="email" type="email" value='pomme@gmail.com'/>
                <label>Choisissez votre pseudo :</label>
                <input id="createaccount-pseudo" placeholder="pseudo" ref="pseudo" value='pommess'/>
                <label>Choisissez votre Mot de passe :</label>
                <input id="createaccount-mdp" type="password" placeholder="mot de passe" ref="mdp" value='p' />
                <label>Confirmez votre Mot de passe : </label>
                <input id="createaccount-mdp" type="password" placeholder="confirmation du mot de passe" ref="mdp" value = 'p' />
                <button id="createaccount-submit" onClick={this.sendCreateAccountInfo}>Sign in</button>
            </div>
        )
    }

}