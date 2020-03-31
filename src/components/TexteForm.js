import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createPost, modifierPost, modifierSignaler, getPostById } from "../actions/appActions"
import { Redirect } from "react-router-dom"
import { IoIosCloseCircle } from 'react-icons/io'


class TexteForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            opacity: 0,
            redirect: false,
            texte: ''
        }
    }

    componentDidMount = () => {
        this.refs.text.focus()
        setTimeout(this.setState({...this.state, opacity: 1}), 1)
        if (this.props.location.state.type === 'modifier') 
            this.props.getPostById(this.props.location.state.id)
    }


    componentDidUpdate = () => {
        if (this.state.opacity && this.state.redirect) {
            this.handleClose();
        }
        if (this.props.location.state.type === 'modifier') {
            if (this.props.activePost._id === this.props.location.state.id && this.state.texte === '') 
                this.setState({...this.state, texte: this.props.activePost.texte})
            else if (this.props.activePost._id !== this.props.location.state.id) 
                this.props.getPostById(this.props.location.state.id)
        }
    }

    handleChange = () => {
        this.setState({...this.state, texte: this.refs.text.value})
    }

    handleClick = () => {
        if (this.props.location.state.type === 'create')
            this.sendCreatePost()
        else if (this.props.location.state.type === 'modifier')
            this.sendModifyPost()
        else 
            this.sendSignaler()
    }

    sendCreatePost = () => {
        this.props.createPost(this.props.user._id, this.refs.text.value, this.props.token);
        this.handleClose()
    }

    sendModifyPost = () => {
        this.props.modifierPost(this.props.activePost, this.state.texte, this.props.token)
        this.handleClose()
    }

    sendSignaler = () => {
        this.props.modifierSignaler(this.props.location.state.data, { _id: this.props.user._id, texte: this.state.texte }, this.props.token, this.props.location.state.signaler, this.props.location.state.comment)
        this.handleClose()
    }

    handleClose = () => {
        this.setState({ ...this.state, opacity: 0 });
        if (this.props.location.state.type === 'create')
            setTimeout(() => { if (!this.state.redirect) this.setState({ ...this.state, redirect: true }) }, 200)
        else
            setTimeout(() => this.props.history.goBack(), 200)
    }


    render() {
        let style = {
            width: this.props.width,
            height: this.props.height - 60,
            opacity: this.state.opacity
        }

        if (this.state.redirect)
            return <Redirect to="/" />
        
        let background = this.props.location.state.type === "signaler" ? { background: "red" } : {}
        let color = this.props.location.state.type === "signaler" ? { color: "red" } : {}
        let border = this.props.location.state.type === "signaler" ? { border: "2px solid red"} : {}

        return (
            <div id="createpost" className="createpost" style={ style } onClick={this.handleClose } onKeyPress={ e => (e.key === "Enter" ? this.handleClick() : '') }>
                <span id="createpost-close" onClick={ this.handleClose } style={color}><IoIosCloseCircle /></span>
                <div id="createpost-zone" onClick={e => e.stopPropagation()}>
                    <h2 id="createpost-title"> <i>Equal Report</i> !</h2>
                    <label>{ this.props.location.state.type === "create" ? "3,2,1 ... Postez ! n'oubliez pas que votre contenu peut-être modéré..." : (this.props.location.state.type === "modifier" ? "Modifiez votre post..." : `Signalez ${this.props.location.state.comment ? "ce commentaire" : "cette publication"}`)}</label>
                    <textarea id="createpost-text" placeholder="Ecrivez ici..." ref="text" value={this.state.texte} onChange={() => this.handleChange()} type="text" style={border}/>
                    <button id="createpost-submit" onClick={() => this.handleClick()} style={background}>{this.props.location.state.type === "create" ? "Poster !" : (this.props.location.state.type === "modifier" ? "Modifier" : "Signaler")}</button>
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
    activePost: state.app.activePost
})

const mapDispatchToProps = {
    createPost,
    modifierPost,
    getPostById,
    modifierSignaler
}

export default connect(mapStateToProps, mapDispatchToProps)(TexteForm);