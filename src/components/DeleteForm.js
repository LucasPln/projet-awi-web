import React, { Component } from 'react'
import { connect } from 'react-redux'
import { supprimerPost } from '../actions/appActions'
import { Redirect } from 'react-router-dom'

class DeleteForm extends Component {

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
            setTimeout(() => this.setState({...this.state, redirect: true}), this.props.adminView ? 300 : 0)
        else
            setTimeout(() => this.props.history.goBack(), this.props.adminView ? 300 : 0)
    }

    supprimerPost = () => {
        let id = this.props.location.pathname.split("/")[2]
        console.log(id)
        this.props.supprimerPost(id, this.props.token)
        this.handleClose(true)
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
                <h2 id="login-title">Voulez vous vraiment supprimer ce Post ?</h2>
                <button id="login-submit" onClick={() => this.supprimerPost()} style={{marginBottom: ".5rem"}}>Oui</button>
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
    adminView: state.app.adminView
})


export default connect(mapStateToProps, {supprimerPost})(DeleteForm);