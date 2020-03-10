import React, { Component } from "react";
import { connect } from 'react-redux';
import { modifierLike, getPosts } from '../actions/appActions'
import '../styles/Post.css'
import { IoIosThumbsUp, IoIosWarning, IoIosChatboxes, IoIosMore } from 'react-icons/io'
import egg from '../globals/egg.jpg'
import { Redirect, Link } from 'react-router-dom'


class Post extends Component{
    constructor(props) {
        super(props)

        this.state = {
            liked: false,
            redirect: false
        }
    }

    componentDidUpdate = () => {
        if (this.props.post.reactions.includes(this.props.user._id) !== this.state.liked) {
            this.setState({
                liked: !this.state.liked
            })
        }
    }

    ajouterLike = () => {
        this.props.modifierLike(this.props.post, this.props.user._id, this.props.token, this.state.liked)
    }

    formatDate = date => {
        let diff = Date.now() - Date.parse(date)//timezone
        let days = diff / 86400000
        let hours = diff / 3600000
        let minutes = diff / 60000
        
        if (days < 1) {
            if (hours < 1) {
                return `Il y a ${Math.floor(minutes)} minute${Math.floor(minutes) === 1 ? '' : 's'}`
            }
            return `Il y a ${Math.floor(hours)} heure${Math.floor(hours) === 1 ? '' : 's'}`
        } 
        return `Il y a ${Math.floor(days)} jour${Math.floor(days) === 1 ? '' : 's'}`
    }

    handleRedirect = () => {
        // this.props.history.push(`/posts${this.props.post._id}`)
        this.setState({
            ...this.state,
            redirect: true
        })
    }



    render() {
        let likeStyle = this.state.liked ? { background: "rgb(93, 93, 187)", color: "white" } : {}
        
        // if (this.state.redirect)
        //     return <Redirect to={ `/post/${ this.props.post._id }` } />

        return (
            <div className="post" onClick={this.handleRedirect}>
                { this.props.user._id === this.props.post.createur._id ? <span className="post-more"><IoIosMore /></span> : ""}
                <div className="post-user-div">
                    <img src={egg} className="post-photo" alt="tt"></img>
                    <h3 className="post-pseudo">{this.props.post.createur.pseudo}</h3>
                <span className="post-date">{this.formatDate(this.props.post.dateCreation)}</span>
                </div>
                <p className="post-text">{ this.props.post.texte }</p>
                <div className="post-info-div">
                    <span className="post-info-badge like"><span className="post-icon like"><IoIosThumbsUp /></span></span>
                    <span className="post-info like">{ this.props.post.reactions.length }</span>
                    <span className="post-info-badge comment"><span className="post-icon comment"><IoIosChatboxes /></span></span>
                    <span className="post-info comment">{ this.props.post.numCommentaires }</span>

                    <span className="post-info-tag">tag1</span>
                    <span className="post-info-tag">tag2</span>
                </div>
                {this.props.loggedIn ? 
                <div className="post-btn-div">
                    <span className="post-btn like" style={ likeStyle } onClick={this.ajouterLike}>Like &nbsp;<IoIosThumbsUp /></span>
                        <Link to={ `/post/${this.props.post.createur._id}` } className="post-btn comment">Ajouter un commentaire &nbsp;<IoIosChatboxes /></Link>
                    <span className="post-btn signaler">Signaler&nbsp;<IoIosWarning /></span> 
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


export default connect(mapStateToProps, { modifierLike, getPosts })(Post)