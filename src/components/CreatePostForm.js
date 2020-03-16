import React, { Component } from 'react'
import { connect } from 'react-redux'
import {createPost} from "../actions/appActions"
import { Redirect } from "react-router-dom"
import { IoIosCloseCircle } from 'react-icons/io'


class CreatePostForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            opacity: 0,
            redirect: false
        }
    }

    sendCreatePostInfo = () => {
        this.props.createPost(this.props.user._id, this.refs.text.value, this.props.token);
        this.handleClose()
    }

    componentDidMount = () => {
        this.refs.text.focus()
        setTimeout(this.setState({...this.state, opacity: 1}), 1)
    }


    componentDidUpdate = () => {
        if (this.state.opacity && this.state.redirect) {
            this.handleClose();
        }
    }


    handleClose = () => {
        this.setState({ ...this.state, opacity: 0 });
        setTimeout(() => this.setState({...this.state, redirect: true}), 300)
    }


    render() {
        let style = {
            width: this.props.width,
            height: this.props.height - 60,
            opacity: this.state.opacity
        }

        if (this.state.redirect)
            return <Redirect to="/" />

        return (
            <div id="createpost" className="createpost" style={ style } onClick={this.handleClose } onKeyPress={ e => (e.key === "Enter" ? this.sendCreatePostInfo() : '') }>
                <span id="createpost-close" onClick={ this.handleClose }><IoIosCloseCircle /></span>
                <div id="createpost-zone" onClick={e => e.stopPropagation()}>
                    <h2 id="createpost-title"> <i>Equal Report</i> !</h2>
                    <label>3,2,1 ... Postez ! n'oubliez pas que votre contenu peut-être modéré...</label>
                    <textarea id="createpost-text" placeholder="Ecrivez ici..." ref="text" type="text"/>
                    <button id="createpost-submit" onClick={this.sendCreatePostInfo}>Postez !</button>
                </div>
            </div>
        )
    }
s
}

const mapStateToProps = state => ({
    loggedIn: state.auth.loggedIn,
    height: state.app.height,
    width: state.app.width,
    token: state.auth.token,
    user: state.auth.user,
})

export default connect(mapStateToProps,{createPost})(CreatePostForm);