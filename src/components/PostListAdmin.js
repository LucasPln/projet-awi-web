import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostAdmin from './PostAdmin'
import '../styles/PostListAdmin.css'
import { IoIosAddCircle } from 'react-icons/io'

class PostListAdmin extends Component {
    render() {
        return (
            <div id="post-list-admin">
                <div id="post-filter-admin"></div>
                <div id="post-spacer-admin"></div>
                {
                    this.props.loggedIn ? <span id="post-write-btn-admin"><IoIosAddCircle /></span> : ''
                }
                {this.props.posts.map(p => <PostAdmin post={p} key={p._id}/>)}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.app.posts,
    loggedIn: state.auth.loggedIn
})


export default connect(mapStateToProps, {})(PostListAdmin);