import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { createAccount, loginError } from "../actions/authActions";
import { Redirect } from "react-router-dom"
import { IoIosCloseCircle } from 'react-icons/io'

class CreateAccountForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            opacity: 1,
            redirect: false
        }
    }

    componentDidMount = () => {
        this.refs.pseudo.focus()
    }

    componentDidUpdate = () => {
        if (this.props.loggedIn === true && this.state.opacity) {
            this.handleClose();
        }
    }

    sendCreateAccountInfo = () => {
        if (this.refs.pseudo.value !== '' && this.refs.mdp.value !== '' && this.refs.email.value !== '') {
            if (this.refs.mdp.value === this.refs.confMdp.value) {
                let photo = ReactDOM.findDOMNode(this).querySelector('.selection-photo.selected').id
                this.props.createAccount(this.refs.email.value, this.refs.pseudo.value, this.refs.mdp.value, photo);
            } else this.props.loginError("Les mots de passes doivent être identiques.")
        } else this.props.loginError("Tous les champs doivent être remplis.")
    }

    handleClose = () => {
        this.props.loginError("")
        this.setState({ ...this.state, opacity: 0 });
        setTimeout(() => { if (!this.state.redirect) this.setState({ ...this.state, redirect: true }) }, 200)
    }

    handleSelect = (photo) => {
        const node = ReactDOM.findDOMNode(this)
        node.querySelectorAll('.selection-photo').forEach(i => i.classList.remove('selected'))
        
        let img = ReactDOM.findDOMNode(this.refs[ photo ])
        img.classList.toggle('selected')
    }

    displayPhotos = () => {
        let photos = []

        for (let i = 0; i < 11; i++) {
            photos.push(<img
                key={ `img${ i }` }
                id={ `img${ i }` }
                style={ { width: "4rem"}}
                className={ `selection-photo ${ i === 0 ? "selected" : "" }` } ref={ `img${ i }` }
                onClick={ () => this.handleSelect(`img${ i }`) }
                src={ require(`../globals/img/img${ i }.jpg`) }
                alt='profil selection' />)
        }
        return photos
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
            <div id="createaccount" className="createaccount" style={ style } onKeyPress={ e => (e.key === "Enter" ? this.sendCreateAccountInfo() : '') }>
                <span style={ { color: 'red', position: 'absolute', marginTop: '-15.3rem' } }>{ this.props.msg }</span>
                <h2 id="createaccount-title">Créer votre compte <i>Equal Report</i> !</h2>
                <span id="createaccount-close" onClick={ this.handleClose }><IoIosCloseCircle /></span>
                <label className="createaccount-label">Choisissez votre photo de profil :</label>
                <div id="createaccount-photo">
                    { this.displayPhotos() }
                </div>
                <label className="createaccount-label">Choisissez votre pseudo :</label>
                <input id="createaccount-pseudo" placeholder="pseudo" ref="pseudo"/>
                <label className="createaccount-label">Renseignez votre email :</label>
                <input id="createaccount-pseudo" placeholder="email" ref="email" type="email"/>
                <label className="createaccount-label">Choisissez votre Mot de passe :</label>
                <input id="createaccount-mdp" type="password" placeholder="mot de passe" ref="mdp" />
                <label className="createaccount-label">Confirmez votre Mot de passe : </label>
                <input id="createaccount-mdp" type="password" placeholder="confirmation du mot de passe" ref="confMdp"  />
                <button id="createaccount-submit" onClick={this.sendCreateAccountInfo}>Sign in</button>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    loggedIn: state.auth.loggedIn,
    height: state.app.height,
    width: state.app.width,
    msg: state.auth.msg
})

const mapDispatchToProps = {
    createAccount,
    loginError
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccountForm);