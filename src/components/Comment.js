import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../globals'
import egg from '../globals/egg.jpg'
import { IoIosThumbsUp } from 'react-icons/io'
import { modifierLike, modifierSignaler } from '../actions/appActions'

class Comment extends Component {
    constructor(props) {
        super(props)

        this.state = {
            liked: this.props.comment.reactions.includes(this.props.user._id),
            signaler: this.props.comment.signaler.includes(this.props.user._id),
            opacity: 0
        }
    }

    componentDidMount = () => {
        setTimeout(() => this.setState({
            ...this.state,
            opacity: 1
        }), 200)
    }

    componentDidUpdate = () => {
        if (this.props.comment.reactions.includes(this.props.user._id) !== this.state.liked) {
            this.setState({
                liked: !this.state.liked
            })
        }
        if (this.props.comment.signaler.includes(this.props.user._id) !== this.state.signaler) {
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
        this.setState({
            ...this.state,
            signaler: !this.state.signaler
        })
        this.props.modifierSignaler(this.props.comment, this.props.user._id, this.props.token, this.state.signaler, true);
    }

    render() {
        let style = this.props.comment.createur._id === this.props.user._id ? "own-comment" : ""
        let likeIcon = this.props.comment.reactions.length === 0 ? { display: "none" } : {}
        let likeState = this.state.liked ? { fontWeight: "850" } : {}
        let signalerState = this.state.signaler ? { fontWeight: "850" } : {}
        return (
            <div className={ `comment-entity ${style}` } key={this.props.comment._id} style={{opacity: this.state.opacity}}>
                <div className={ `comment-div ${ style }` } >
                    <div className={`comment-user-div ${style}` }>
                        <img src={ egg } className="comment-photo" alt="tt"></img>
                        <span className="comment-pseudo">{ this.props.comment.createur.pseudo }</span>
                        <span className="comment-date">{ formatDate(this.props.comment.dateCreation) }</span>
                    </div>
                    <span className="comment-texte">{ this.props.comment.texte }</span>
                    <div className={`comment-num-likes-div ${style}`} style={likeIcon}>
                        <span className="comment-num-likes-icon"><IoIosThumbsUp /></span>
                        <span className="comment-num-likes">{ this.props.comment.reactions.length }</span>
                    </div>
                </div>
                { this.props.loggedIn && style === "" ? 
                    <div className="comment-btn-div">
                        <span className="comment-like" style={ likeState } onClick={() => this.handleLike()}>Like</span>
                        <span className="comment-signaler" style={ signalerState } onClick={() => this.handleSignaler()}>Signaler</span>
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
    token: state.auth.token
})

export default connect(mapStateToProps, {modifierLike, modifierSignaler})(Comment);
