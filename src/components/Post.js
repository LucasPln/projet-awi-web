import React, { Component } from "react";
import { connect } from 'react-redux';

class Post extends Component{


    render(){
        return (
            <div id="post">
                <h2 id="pseudo-post">{this.props.post.createur}</h2>
                <p id="text-post">{this.props.post.texte}</p>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    

})


export default connect(mapStateToProps, {})(Post)