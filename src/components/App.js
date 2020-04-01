import React, { Component } from 'react'
import LoginForm from './LoginForm'
import PostView from './PostView'
import { connect } from 'react-redux';
import PostList from './PostList'
import Navbar from './Navbar'
import SelectionForm from './SelectionForm'
import CreateAccountForm from "./CreateAccountForm"
import MonProfil from "./MonProfil"
import TexteForm from "./TexteForm"
import { getPosts, updateDimensions, getUserById } from '../actions/appActions'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

class App extends Component {
  componentDidMount() {
    this.props.getPosts();
    
      window.addEventListener('resize', () => this.props.updateDimensions(window.innerHeight, window.innerWidth));
  }
  
  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.token !== '' && prevProps.token === '') {
      this.props.getUserById(this.props.user._id, this.props.token);
    }
  }

  render() {
    return (
      <Router>
        <div id="main">
          <Route path="/" component={Navbar} />
          <Route path="/" component={PostList} />
          <Switch>
              <Route path="/login" component={ LoginForm } />
              <Route path="/createaccount" component={ CreateAccountForm } />
              <Route path="/post/:postId" component={ PostView } />
              <Route path="/monprofil" component={ MonProfil } />
              <Route path="/texteform" component={ TexteForm } />
              <Route path="/selectionform/:postId" component={ SelectionForm } />
          </Switch> 
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.app.posts,
  user: state.auth.user,
  token: state.auth.token
})

const mapDispatchToProps = {
  getPosts,
  updateDimensions,
  getUserById,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
