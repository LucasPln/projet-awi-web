import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPostById, getCommentsByPostId, writeComment } from '../actions/appActions'
import Post from './Post'
import Comment from './Comment'
import { IoIosCloseCircle, IoIosSend } from 'react-icons/io'
import { Redirect } from 'react-router-dom'

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

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.commentaires !== this.props.commentaires) {
            this.setState({
                ...this.state,
                commentOpacity: 1
            })
        }
        if (prevProps.commentaires.length !== this.props.commentaires.length) {
            setTimeout(() => this.refs.list.scrollTop = this.refs.list.scrollHeight, 40);
        }
        let post = document.getElementById(`post/${ this.props.post._id }`)
        if (post && prevState.spacerHeight !== post.clientHeight)
            this.setState({ ...this.state, spacerHeight: post.clientHeight });
    }

    componentWillMount = () => {
        this.props.getCommentsByPostId(this.props.match.params.postId)
        this.props.getPostById(this.props.match.params.postId)
    }

    componentDidMount = () => {
        setTimeout(() => this.setState({ ...this.state, opacity: 1 }), 1)
        setTimeout(() => this.refs.list.scrollTop = 0, 20)
    }

    handleClose = () => {
        this.setState({ ...this.state, opacity: 0, commentOpacity: 0 });
        setTimeout(() => this.setState({...this.state, redirect: true}), 300)
    }

    sendComment = () => {
        if (this.refs.texte.value !== '')
            this.props.writeComment(this.props.post._id, this.props.user._id, this.refs.texte.value, this.props.token);
        
        this.refs.texte.value = ''
    }

    render() {
        let style = {
            width: this.props.width,
            height: this.props.height - 60,
            opacity: this.state.opacity
        }

        if (this.state.redirect) 
            return <Redirect to="/" />
        
        
        let padding = this.props.loggedIn ? { paddingBottom: "96px" } : {}

        return (
            <div id="post-view" style={ style } onClick={ this.handleClose }>
                <span id="post-view-close" onClick={this.handleClose}><IoIosCloseCircle /></span>
                <span id="post-zone" onClick={ e => e.stopPropagation() }>
                    <Post post={ this.props.post } postView={ true }  />
                    <div id="post-view-comment-list" ref="list" style={ { height: style.height, ...padding, opacity: this.state.commentOpacity, paddingTop: this.state.spacerHeight } }>
                        { this.props.commentaires.map(c => <Comment key={ c._id } comment={ c } />) }
                    </div>
                    {
                        this.props.loggedIn ? 
                            <div id="post-view-write-comment-div" onKeyPress={ e => (e.key === "Enter" ? this.sendComment() : '') }>
                                <textarea id="post-view-input" placeholder="Écrire un commentaire..." ref="texte" />
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
    commentaires: state.app.activeCommentaires,
    token: state.auth.token,
    user: state.auth.user
})

export default connect(mapStateToProps, {getPostById, getCommentsByPostId, writeComment})(PostView);