import React, { Component } from 'react'
import { connect } from 'react-redux'
import { supprimerPost, viderSignalement, getPostById } from '../actions/appActions'
import { Redirect } from 'react-router-dom'

class SelectionForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            opacity: 0,
            redirect: false
        }
    }

    componentDidMount = () => {
        setTimeout(() => this.setState({...this.state, opacity: 1}), 1)
    }

    handleClose = (deleted = false) => {
        this.setState({ ...this.state, opacity: 0 });
        if (deleted)
            setTimeout(() => { if (!this.state.redirect) this.setState({ ...this.state, redirect: true }) }, 200)
        else
            setTimeout(() => this.props.history.goBack(), 200)
    }

    handleClick = () => {
        if (this.props.location.state.type === "supprimer")
            this.supprimerPost()
        else 
            this.viderSignalement()
    }

    supprimerPost = () => {
        this.props.supprimerPost(this.props.location.state.data, this.props.token, this.props.location.state.comment)
        this.handleClose(!this.props.location.state.comment)
    }

    viderSignalement = () => {
        this.props.viderSignalement(this.props.location.state.data, this.props.token, this.props.location.state.comment)
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
            <div id="login" className="login" style={ style } >
                <h2 id="login-title">{`Voulez vous vraiment ${this.props.location.state.type === "supprimer" ? "supprimer" : "vider les signalements de" } ce ${this.props.location.state.comment ? 'commentaire' : 'post'} ?`}
                </h2>
                <button id="login-submit" onClick={() => this.handleClick()} style={{marginBottom: ".5rem"}}>Oui</button>
                <button id="login-submit" onClick={() => this.handleClose(false)}>Non</button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.loggedIn,
    height: state.app.height,
    width: state.app.width,
    token: state.auth.token,
    adminView: state.app.adminView,
    activePost: state.app.activePost
})


export default connect(mapStateToProps, {supprimerPost, viderSignalement, getPostById})(SelectionForm);