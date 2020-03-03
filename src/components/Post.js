import React, { Component } from "react";
import { connect } from 'react-redux';


class Post extends Component{


    render(){
        return (
            <div id="post">
                <h2 id="pseudo-post">{this.props.post.createur}</h2>
                <p id="text-post">{this.props.post.texte}</p>
                <input id="button_like" type="button" value="Like" />
                <a id="comment" href="" >Commentaire</a>
                <input id="button_signaler" type="button" value="Signaler" />
                
            </div>
        )
    }
}

const mapStateToProps = state => ({
    
})


export default connect(mapStateToProps, {})(Post)