import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPostById, getCommentsByPostId, writeComment } from '../actions/appActions'
import { stateWaiting } from '../actions/authActions'
import Post from './Post'
import PostAdmin from './PostAdmin'
import Comment from './Comment'
import { IoIosCloseCircle, IoIosSend } from 'react-icons/io'
import { Redirect } from 'react-router-dom'
import FlipMove from 'react-flip-move'

class PostView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            redirect: false,
            opacity: 0,
            commentOpacity: 0,
            spacerHeight: 0
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.commentaires !== this.props.commentaires) {
            this.props.stateWaiting(false)
            this.setState({
                ...this.state,
                commentOpacity: 1
            })
        }
        let post = document.getElementById(`post/${ this.props.post._id }`)
        if (post && prevState.spacerHeight !== post.clientHeight)
            this.setState({ ...this.state, spacerHeight: post.clientHeight });
    }

    componentDidMount = () => {
        if (this.props.commId !== this.props.post._id)
            this.props.stateWaiting(true);
        this.props.getCommentsByPostId(this.props.match.params.postId)
        this.props.getPostById(this.props.match.params.postId)
        this.setState({ ...this.state, opacity: 1 })
    }

    handleClose = () => {
        this.setState({ ...this.state, opacity: 0, commentOpacity: 0 });
        setTimeout(() => { if (!this.state.redirect) this.setState({ ...this.state, redirect: true }) }, 200)
    }

    sendComment = () => {
        if (this.refs.texte.value !== '')
            this.props.writeComment(this.props.post._id, this.props.user._id, this.refs.texte.value, this.props.token);
        this.refs.texte.value = ''
    }

    sortList = (a, b) => {
        if (this.props.commentFilter.type === 'date') {
            if (a.dateCreation === b.dateCreation) return a.texte > b.texte
            return this.props.commentFilter.directionDate ? (a.dateCreation < b.dateCreation ? 1 : -1) : (a.dateCreation > b.dateCreation ? 1 : -1)
        } else if (this.props.commentFilter.type === 'like') {
            if (this.props.adminView) {
                if (a.signaler.length === b.signaler.length) return a.texte > b.texte
                return this.props.commentFilter.directionLike ? (a.signaler.length < b.signaler.length ? 1 : -1) : (a.signaler.length > b.signaler.length ? 1 : -1)
            }
            else {
                if (a.reactions.length === b.reactions.length) return a.texte > b.texte
                return this.props.commentFilter.directionLike ? (a.reactions.length < b.reactions.length ? 1 : -1) : (a.reactions.length > b.reactions.length ? 1 : -1)
            }
        }
    }

    render() {
        let style = {
            width: this.props.width,
            height: this.props.height - 60,
            opacity: this.state.opacity
        }

        if (this.state.redirect) 
            return <Redirect to="/" />
        
        
        let padding = this.props.loggedIn && !this.props.adminView ? { paddingBottom: "96px" } : {}
        let waiting = this.props.waiting ? { opacity: 1 } : { opacity: 0 } 
        
        return (
            <div id="post-view" style={ style } onClick={() => this.handleClose() }>
                <span className="state-waiting" id="post-view-state-waiting" style={waiting}></span>
                <span id="post-view-close" onClick={this.handleClose}><IoIosCloseCircle /></span>
                <span id="post-zone" onClick={ e => e.stopPropagation() }>
                    { this.props.adminView ? <PostAdmin post={ this.props.post } postView={ true } /> : <Post post={ this.props.post } postView={ true } /> } 
                    <div id="post-view-comment-list" ref="list" style={ { height: style.height, ...padding, opacity: this.state.commentOpacity, paddingTop: this.state.spacerHeight } }>
                        <FlipMove duration={400} easing={'ease-in-out'} staggerDelayBy={10} staggerDurationBy={30} enterAnimation={'fade'} leaveAnimation={'none'}>
                        { this.props.commentaires.sort(this.sortList).map(c => <div key={c._id}><Comment key={ c._id } comment={ c } /></div>) }
                        </FlipMove>
                    </div>
                    {
                        this.props.loggedIn && !this.props.adminView ? 
                            <div id="post-view-write-comment-div" onKeyPress={ e => (e.key === "Enter" ? this.sendComment() : '') }>
                                <input type="text" id="post-view-input" placeholder="Écrire un commentaire..." ref="texte" />
                                <span id="post-view-submit" onClick={this.sendComment}><span id="post-view-icon"><IoIosSend /></span></span>
                            </div> 
                            :''
                    }
                </span>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    loggedIn: state.auth.loggedIn,
    post: state.app.activePost,
    height: state.app.height,
    width: state.app.width,
    commentaires: state.app.activeCommentaires.commentaires,
    commId: state.app.activeCommentaires.id,
    token: state.auth.token,
    user: state.auth.user,
    waiting: state.auth.waiting,
    adminView: state.app.adminView,
    commentFilter: state.app.commentFilter
})

export default connect(mapStateToProps, {getPostById, getCommentsByPostId, writeComment, stateWaiting})(PostView);