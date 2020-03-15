import React, { Component } from "react";
import { connect } from 'react-redux';
import { modifierLike, modifierSignaler, getPostById } from '../actions/appActions'
import { IoIosThumbsUp, IoIosWarning, IoIosChatboxes, IoIosMore, IoIosTrash } from 'react-icons/io'
import egg from '../globals/egg.jpg'
import { Redirect, Link } from 'react-router-dom'
import { formatDate } from '../globals'


class Post extends Component{
    constructor(props) {
        super(props)

        this.state = {
            liked: this.props.post.reactions.includes(this.props.user._id),
            signaler: this.props.post.signaler.includes(this.props.user._id),
            redirect: false
        }
    }

    componentDidUpdate = () => {
        if (this.props.post.reactions.includes(this.props.user._id) !== this.state.liked) {
            this.setState({
                liked: !this.state.liked
            })
        }
        if (this.props.post.signaler.includes(this.props.user._id) !== this.state.signaler) {
            this.setState({
                signaler: !this.state.signaler
            })
        }
    }

    handleLike = (e) => {
        e.stopPropagation();
        this.setState({
            ...this.state,
            liked: !this.state.liked
        })
        this.props.modifierLike(this.props.post, this.props.user._id, this.props.token, this.state.liked)
    }

    handleSignaler = (e) => {
        e.stopPropagation();
        this.setState({
            ...this.state,
            signaler: !this.state.signaler
        })
        this.props.modifierSignaler(this.props.post, this.props.user._id, this.props.token, this.state.signaler)
    }

    handleRedirect = () => {
        this.setState({
            ...this.state,
            redirect: true
        })
    }

    render() {
        let likeStyle = this.state.liked ? { background: "rgb(93, 93, 187)", color: "white" } : {};
        let signalStyle = this.state.signaler ? { background: "red", color: "white" } : {};
        let postView = this.props.postView ? "view" : "";
        
        if (this.state.redirect) {
            this.props.getPostById(null, false, this.props.post)
            this.setState({ ...this.state, redirect: false })
            return <Redirect to={ `/post/${ this.props.post._id }` } />
        }
        
        return (
            <div className={ `post ${postView}` } id={`post/${this.props.post._id}`} onClick={() => !this.props.postView ? this.handleRedirect() : ''}>
                { this.props.user._id === this.props.post.createur._id ? <span className="post-more"><IoIosMore /></span> : "" }
                <div className={ `post-user-div ${postView}` }>
                    <img src={ egg } className={ `post-photo ${postView}` } alt="tt"></img>
                    <h3 className={ `post-pseudo ${postView}` }>{this.props.post.createur.pseudo}</h3>
                <span className={`post-date ${postView}` }>{formatDate(this.props.post.dateCreation)}</span>
                </div>
                <p className={`post-text ${postView}` }>{ this.props.post.texte }</p>
                <div className={`post-info-div ${postView}` }>
                    <span className={`post-info-badge like ${postView}` }><span className={`post-icon like ${postView}` }><IoIosThumbsUp /></span></span>
                    <span className={`post-info like ${postView}` }>{ this.props.post.reactions.length }</span>
                    <span className={`post-info-badge comment ${postView}` }><span className={`post-icon comment ${postView}` }><IoIosChatboxes /></span></span>
                    <span className={`post-info comment ${postView}` }>{ this.props.post.numCommentaires }</span>

                    <span className={`post-info-tag ${postView}` }>tag1</span>
                    <span className={`post-info-tag ${postView}` }>tag2</span>
                </div>
                {this.props.loggedIn ? 
                <div className={`post-btn-div ${postView}` }>
                    <span className={`post-btn like ${postView}` } style={ likeStyle } onClick={e => this.handleLike(e)}>Like &nbsp;<IoIosThumbsUp /></span>
                    {this.props.post.createur._id === this.props.user._id ? 
                            <Link to={ `/delete/${ this.props.post._id }` } style={ {textDecoration: "none"} } className="post-btn-admin supprimer"  >Supprimer&nbsp;<IoIosTrash /></Link>
                            : ""}
                    <span className={`post-btn signaler ${postView}` } style={signalStyle} onClick={e => this.handleSignaler(e)}>Signaler&nbsp;<IoIosWarning /></span> 
                </div> 
                : ""}
                </div>
        )
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.loggedIn,
    user: state.auth.user,
    token: state.auth.token
})


export default connect(mapStateToProps, { modifierLike, modifierSignaler, getPostById })(Post)