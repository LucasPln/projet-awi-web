import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPostById } from '../actions/appActions'

class PostView extends Component {

    componentWillMount = () => {
        console.log('test')
        this.props.getPostById(this.props.match.params.postId)
    }

    render() {
        return (
            <div>
                <h1>{ this.props.post.createur.pseudo }</h1>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    post: state.app.activePost
})

export default connect(mapStateToProps, {getPostById})(PostView);