import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Link, Redirect, Switch } from 'react-router-dom';
import AccountsUIWrapper from './AccountsUIWrapper.js';
import { withTracker } from 'meteor/react-meteor-data';
import { Posts } from '../api/post';

import Post from './Post.jsx'
import Search from './Search.jsx'
import Navbar from './Navbar.jsx'

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      nightmode: nightmode_switch
    };
  }

  //list of mongo objects => list of html elements
  renderPosts() {
    let { posts } = this.props;

    return posts.map((post, i) => {
      return <div key={i} className="post-wrapper">
        <Post 
          post={post}/>
      </div>
    });
  }

  render() {
    return <div className="wrapper">
      <div className="box header">
        <Navbar path={this.props.match.path} nightmode={this.state.nightmode}/>
      </div>
      <div className={"box sidebar" + (this.state.nightmode ? " nightmode-page" : '')}></div>
      <div className={"box sidebar2" + (this.state.nightmode ? " nightmode-page" : '')}></div>
      <div className={"box content" + (this.state.nightmode ? " nightmode-page" : '')}>
        { this.renderPosts() }
      </div>
      <div className={"box footer" + (this.state.nightmode ? " nightmode-page" : '')}></div>
    </div>;
  }
}

export default withTracker(() => {
  return {
    currentUser: Meteor.user(),
    //sort posts by newest creation time
    posts: Posts.find({}, { sort: { createAt: -1 } }).fetch()
  };
})(HomePage);