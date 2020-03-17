import React, { Component } from "react";
import { connect } from 'react-redux';
import { supprimerPost } from '../actions/appActions'
import '../styles/PostAdmin.css'
import { IoIosThumbsUp, IoIosWarning, IoIosText, IoIosTrash } from 'react-icons/io'
import egg from '../globals/egg.jpg'
import { Link } from 'react-router-dom'
import { formatDate } from '../globals'


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

    render() {
        return (
            <div className="post-admin" >
                <div className="post-user-div-admin">
                    <img src={egg} className="post-photo" alt="tt"></img>
                    <h3 className="post-pseudo-admin">{this.props.post.createur.pseudo}</h3>
                    <span className="post-date-admin">{formatDate(this.props.post.dateCreation)}</span>
                </div>
                <p className="post-text-admin">{ this.props.post.texte }</p>
                <div className="post-info-div-admin">
                    <span className="post-info-badge-admin like"><span className="post-icon-admin like"><IoIosThumbsUp /></span></span>
                    <span className="post-info-admin like">{ this.props.post.reactions.length }</span>
                    <span className="post-info-badge-admin comment"><span className="post-icon-admin comment"><IoIosText /></span></span>
                    <span className="post-info-admin comment">{ this.props.post.numCommentaires }</span>
                    <span className="post-info-badge-admin signaler"><span className="post-icon-admin signaler"><IoIosWarning /></span></span>
                    <span className="post-info-admin signaler">{ this.props.post.signaler.length }</span>
                </div> 
                <div className="post-btn-div-admin">
                    <Link to={{ pathname: `/selectionform/${ this.props.post._id }`, state: {type: "vider"} }} style={ {textDecoration: "none"} } className="post-btn-admin signaler"  >Vider les signalements&nbsp;<IoIosWarning /></Link>
                    <Link to={{ pathname: `/selectionform/${ this.props.post._id }`, state: {type: "supprimer"} } } style={ {textDecoration: "none"} } className="post-btn-admin supprimer"  >Supprimer&nbsp;<IoIosTrash /></Link> 
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


export default connect(mapStateToProps, { supprimerPost })(PostAdmin)