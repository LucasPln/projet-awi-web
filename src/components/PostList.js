import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post'
import '../styles/PostList.css'
import { IoIosAddCircle } from 'react-icons/io'
import {Link} from "react-router-dom";

class PostList extends Component {
    render() {
        return (
            <div id="post-list">
                <div id="post-filter"></div>
                <div id="post-spacer"></div>
                {
                    this.props.loggedIn ? <Link to={'/createpost'} id="post-write-btn"><IoIosAddCircle /></Link> : ''
                }
                {this.props.posts.map(p => <Post post={p} key={p._id}/>)}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.app.posts,
    loggedIn: state.auth.loggedIn
})


export default connect(mapStateToProps, {})(PostList);