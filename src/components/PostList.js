import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post'
import { IoIosAddCircle } from 'react-icons/io'
import PostAdmin from './PostAdmin'
import {Link} from "react-router-dom";

class PostList extends Component {
    render() {
        return (
            <div id="post-list">
                <div id="post-filter"></div>
                <div id="post-spacer"></div>
                { this.props.loggedIn ? <Link to={'/createpost'} id="post-write-btn"><IoIosAddCircle /></Link> : '' }
                { this.props.posts.map(p => this.props.adminView && this.props.loggedIn ? <PostAdmin post={p} key={p._id}/> : <Post post={ p } key={ p._id } postView={ false } />)}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.app.posts,
    loggedIn: state.auth.loggedIn,
    adminView: state.app.adminView
})


export default connect(mapStateToProps, {})(PostList);