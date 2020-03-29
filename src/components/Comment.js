import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../globals'
import { IoIosThumbsUp, IoIosWarning, IoIosTrash } from 'react-icons/io'
import { modifierLike, modifierSignaler } from '../actions/appActions'
import { Link } from 'react-router-dom'

class Comment extends Component {
    constructor(props) {
        super(props)

        this.state = {
            liked: this.props.comment.reactions.includes(this.props.user._id),
            signaler: this.props.comment.signaler.map(s => s._id === this.props.user._id).includes(true),
            opacity: 1
        }
    }

    componentDidUpdate = () => {
        if (this.props.comment.reactions.includes(this.props.user._id) !== this.state.liked) {
            this.setState({
                liked: !this.state.liked
            })
        }
        if (this.props.comment.signaler.map(s => s._id === this.props.user._id).includes(true) !== this.state.signaler) {
            this.setState({
                signaler: !this.state.signaler
            })
        }
    }

    handleLike = () => {
        this.setState({
            ...this.state,
            liked: !this.state.liked
        })
        this.props.modifierLike(this.props.comment, this.props.user._id, this.props.token, this.state.liked, true);
    }

    handleSignaler = () => {
        if (this.state.signaler) this.props.modifierSignaler(this.props.comment, { _id: this.props.user._id }, this.props.token, this.state.signaler, true);
        this.setState({
            ...this.state,
            signaler: !this.state.signaler
        })
    }

    displayBadge = (style) => {
        if (this.props.adminView) {
            return (
                <div className={`comment-num-signal-div`} style={this.props.comment.signaler.length === 0 ? { display: "none" } : {}}>
                    <span className="comment-num-signal-icon"><IoIosWarning /></span>
                    <span className="comment-num-signal">{ this.props.comment.signaler.length }</span>
                </div>
            )
        } else {
            return (
                <div className={`comment-num-likes-div ${style}`} style={this.props.comment.reactions.length === 0 ? { display: "none" } : {}}>
                    <span className="comment-num-likes-icon"><IoIosThumbsUp /></span>
                    <span className="comment-num-likes">{ this.props.comment.reactions.length }</span>
                </div>
            )
        }
    }

    render() {
        let style = this.props.comment.createur._id === this.props.user._id && !this.props.adminView ? "own-comment" : ""
        let likeState = this.state.liked ? { fontWeight: "850" } : {}
        let signalerState = this.state.signaler ? { fontWeight: "850" } : {}

        return (
            <div className={ `comment-entity ${style}` } key={this.props.comment._id} style={{opacity: this.state.opacity}}>
                <div className={ `comment-div ${ style }` } >
                    <div className={`comment-user-div ${style}` }>
                        <img src={ require(`../globals/img/${this.props.comment.createur.photo}.jpg`) } className="comment-photo" alt="tt"></img>
                        <span className="comment-pseudo">{ this.props.comment.createur.pseudo }</span>
                        <span className="comment-date">{ formatDate(this.props.comment.dateCreation) }</span>
                    </div>
                    <span className="comment-texte">{ this.props.comment.texte }</span>
                    { this.displayBadge(style)}
                </div>
                { this.props.loggedIn && style === "" ? 
                    this.props.adminView ?
                        <div className="comment-btn-div">
                            <Link to={{ pathname: `/selectionform/${ this.props.comment._id }`, state: {type: "vider", comment: true, data: this.props.comment} }} style={ {textDecoration: "none"} } className="comment-btn-admin signaler"  onClick={e => e.stopPropagation()}>Vider&nbsp;<span className="react-icon" style={{position:'absolute'}}><IoIosWarning /></span></Link>
                            <Link to={{ pathname: `/selectionform/${ this.props.comment._id }`, state: {type: "supprimer", comment: true, data: this.props.comment} } } style={ {textDecoration: "none"} } className="comment-btn-admin supprimer"  onClick={e => e.stopPropagation()}>Supprimer&nbsp;<span className="react-icon" style={{position:'absolute'}}><IoIosTrash /></span></Link> 
                        </div>
                    :
                        <div className="comment-btn-div">
                            <span className="comment-btn like" style={ likeState } onClick={ () => this.handleLike() }>J'aime&nbsp;<span className="react-icon" style={ { position: 'absolute' } }><IoIosThumbsUp /></span></span>
                            { this.state.signaler
                                ? <span className="comment-btn signaler" style={ signalerState } onClick={ () => this.handleSignaler() }>Signaler&nbsp;<span className="react-icon" style={ { position: 'absolute' } }><IoIosWarning /></span></span>
                                :
                                <Link to={{ pathname: '/texteform', state: {type: "signaler", data: this.props.comment, signaler: this.state.signaler, comment: true} }} style={ {textDecoration: "none", ...signalerState} } className="comment-btn signaler" onClick={e => this.handleSignaler()}>Signaler&nbsp;<span className="react-icon"><IoIosWarning /></span></Link>}
                        </div> 
                    :""
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.loggedIn,
    user: state.auth.user,
    token: state.auth.token,
    adminView: state.app.adminView
})

const mapDispatchToProps = {
    modifierLike,
    modifierSignaler  
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
