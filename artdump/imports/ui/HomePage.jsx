import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Link, Redirect, Switch } from 'react-router-dom';
import AccountsUIWrapper from './AccountsUIWrapper.js';
import { withTracker } from 'meteor/react-meteor-data';
import { Posts } from '../api/post';

import { Button } from 'react-toolbox/lib/button';


import Post from './Post.jsx'
import Search from './Search.jsx'
import Navbar from './Navbar.jsx'

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {loggedIn: false};
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
        <Navbar/>
      </div>
      <div className="box sidebar">Sidebar</div>
      <div className="box sidebar2">Sidebar 2</div>
      <div className="box content">Content
        { this.renderPosts() }
      </div>
      <div className="box footer">Footer</div>
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