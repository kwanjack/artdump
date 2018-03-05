import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Link, Redirect, Switch } from 'react-router-dom';
import AccountsUIWrapper from './AccountsUIWrapper.js';
import { withTracker } from 'meteor/react-meteor-data';
import { Posts } from '../api/post';

import { Button } from 'react-toolbox/lib/button';


import Post from './Post.jsx'
import Search from './Search.jsx'

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {loggedIn: false};
  }

  routeHome(){
    return (
      <Switch>
        <Redirect to="/"/>
      </Switch>
    )
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
      Header
        <Button label="Hello World!" />,

      </div>
      <div className="box sidebar">Sidebar</div>
      <div className="box sidebar2">Sidebar 2</div>
      <div className="box content">Content

        { this.renderPosts() }
        <br /> More content than we had before so this column is now quite tall.</div>
      <div className="box footer">Footer</div>

        <div>
          <h1 className="header">
            <div  onClick={() => this.routeHome()}> 
              <i className="fa fa-home"> </i>
            </div>
            This is the Home Page. 
            </h1>
          <div>
            <Search/>
            </div>
          {(this.props.currentUser != null &&
            <div><Link to="/createpost"> To Create Post page</Link></div>
          )}
          <div><Link to="/"> To main page </Link></div>
          <div><AccountsUIWrapper/></div>

          <h2> Posts </h2>
          <div>
          </div>
      </div>
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