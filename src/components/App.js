import React, { Component } from 'react'
import LoginForm from './LoginForm'
import PostView from './PostView'
import { connect } from 'react-redux';
import PostList from './PostList'
import Navbar from './Navbar'
import DeleteForm from './DeleteForm'
import CreateAccountForm from "./CreateAccountForm";
import ViderSignalementForm from "./ViderSignalementForm"
import CreatePostForm from "./CreatePostForm";
import { getPosts, updateDimensions } from '../actions/appActions'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

class App extends Component {
  componentDidMount() {
      this.props.getPosts();
      window.addEventListener('resize', () => this.props.updateDimensions(window.innerHeight, window.innerWidth));
    }

  render() {
    return (
      <Router>
        <div id="main">
          <Navbar />
          <Route path="/" component={PostList} />
          <Switch>
              <Route path="/createpost" component={ CreatePostForm } />
              <Route path="/createaccount" component={ CreateAccountForm } />
              <Route path="/login" component={ LoginForm } />
              <Route path="/post/:postId" component={ PostView } />
              <Route path="/delete/:postId" component={ DeleteForm } />
              <Route path="/signalement/vider/:postId" component={ ViderSignalementForm } />
          </Switch> 
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.app.posts,
  auth: state.auth
})

export default connect(mapStateToProps, {getPosts, updateDimensions})(App);
