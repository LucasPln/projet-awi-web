import React, { Component } from "react";
import { connect } from 'react-redux';
import { ajouterLike } from '../actions/appActions'


class Post extends Component{

    ajouterLike = () =>{
        this.props.ajouterLike(this.props.post, this.props.user._id, this.props.token)
    }



    render(){
        console.log(this.props.post)
        return (
            <div id="post">
                <h2 id="pseudo-post">{this.props.post.createur}</h2>
                <p id="text-post">{this.props.post.texte}</p>
                {!this.props.loggedIn ? 
                <div>
                    <input id="button_like" type="button" value="Like" onClick={this.ajouterLike} />
                    <a id="comment" href="" >Commentaire</a>
                    <input id="button_signaler" type="button" value="Signaler" /> 
                </div> : ""}
                
                
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.loggedIn,
    user: state.auth.user,
    token: state.auth.token
})


export default connect(mapStateToProps, { ajouterLike })(Post)