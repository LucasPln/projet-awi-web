import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post'
import '../styles/PostList.css'
import { IoIosAddCircle } from 'react-icons/io'

class PostList extends Component {
    render() {
        return (
            <div id="post-list">
                <div id="post-spacer"></div>
                <span id="post-write-btn"><IoIosAddCircle /></span>
                {this.props.posts.sort((a,b) => a.dateCreation < b.dateCreation).map(p => <Post post={p} />)}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.app.posts
})


export default connect(mapStateToProps, {})(PostList);