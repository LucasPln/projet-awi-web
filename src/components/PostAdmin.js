import React, { Component } from "react";
import { connect } from 'react-redux';
import { modifierLike, getPosts } from '../actions/appActions'
import '../styles/PostAdmin.css'
import { IoIosThumbsUp, IoIosWarning, IoIosChatboxes, IoIosMore, IoIosTrash } from 'react-icons/io'
import egg from '../globals/egg.jpg'
import { Redirect, Link } from 'react-router-dom'


class PostAdmin extends Component{
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
            <div className="post-admin" >
                { this.props.user._id === this.props.post.createur._id ? <span className="post-more"><IoIosMore /></span> : ""}
                <div className="post-user-div-admin">
                    <img src={egg} className="post-photo" alt="tt"></img>
                    <h3 className="post-pseudo-admin">{this.props.post.createur.pseudo}</h3>
                <span className="post-date-admin">{this.formatDate(this.props.post.dateCreation)}</span>
                </div>
                <p className="post-text-admin">{ this.props.post.texte }</p>
                <div className="post-info-div-admin">
                    <span className="post-info-badge-admin like"><span className="post-icon like"><IoIosThumbsUp /></span></span>
                    <span className="post-info-admin like">{ this.props.post.reactions.length }</span>
                    <span className="post-info-badge-admin comment"><span className="post-icon comment"><IoIosChatboxes /></span></span>
                    <span className="post-info-admin comment">{ this.props.post.numCommentaires }</span>
                    <span className="post-info-badge-admin signaler"><span className="post-icon signaler"><IoIosWarning /></span></span>
                    <span className="post-info-admin like">{ this.props.post.reactions.length }</span>

                    <span className="post-info-tag-admin">tag1</span>
                    <span className="post-info-tag-admin">tag2</span>
                </div> 
                    <div className="post-btn-div-admin">
                        <span className="post-btn-admin supprimer">Supprimer&nbsp;<IoIosTrash /></span> 
                    </div>
                </div>
        )
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.loggedIn,
    user: state.auth.user,
    token: state.auth.token
})


export default connect(mapStateToProps, { modifierLike, getPosts })(PostAdmin)