import React, { Component } from 'react'
import '../styles/App.css'
import '../styles/LoginForm.css'
import LoginForm from './LoginForm'
import PostView from './LoginForm'
import { connect } from 'react-redux';
import PostList from './PostList'
import Navbar from './Navbar'
import PostListAdmin from './PostListAdmin'
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
          <Route path="/" component={Navbar} />
          <Switch>
              <Route path="/login" component={ LoginForm } />
              <Route path="/post/:postId" component={ PostView } />
              <Route path="/admin" component={ PostListAdmin } />
              <Route path="/" component={PostList} />
          </Switch> 
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
    posts: state.app.posts
})

export default connect(mapStateToProps, {getPosts, updateDimensions})(App);
