import React, { Component } from "react";
import { connect } from 'react-redux';
import Post from './Post';
import {getPosts} from '../actions/appActions';

class MainComponent extends Component{
    componentDidMount() {
        this.props.getPosts()
    }

    render(){
        return (
            <div>
                {this.props.posts.map(p => <Post post={p} />)}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.app.posts
})

export default connect(mapStateToProps, {getPosts})(MainComponent)