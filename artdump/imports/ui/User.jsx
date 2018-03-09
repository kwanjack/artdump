import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Post from './Post.jsx'
import { Posts } from '../api/post';
import HomePage from './HomePage';
import { Link } from 'react-router-dom';
import AccountsUIWrapper from './AccountsUIWrapper.js';
import Navbar from './Navbar.jsx'

class User extends React.Component{
  constructor() {
    super();
    this.state = {};
  }
  //Scroll page to top
  componentDidMount(){
    window.scrollTo(0, 0)
  }

  renderPosts(){
    let { posts } = this.props;

    return posts.map((post, i) => {
      return <div key={i}>
        <Post 
          post={post}/>
      </div>
    });
  }

  render(){
    let { userIdName } = this.props
    //used toString because React can't render an object before
    //userIdName is fetched
    return <div className="wrapper">
      <div className="box header">
        <Navbar path={this.props.match.path}/>
      </div>
      <div className="box sidebar"></div>
      <div className="box sidebar2"></div>
      <div className="box content">
        {userIdName.toString()}'s Posts
        { this.renderPosts() }
      </div>
      <div className="box footer">Footer</div>
    </div>;
  }
}

export default withTracker(props => {
  let userId = props.match.params.userId;
  let userIdName = Meteor.users.findOne({_id: userId}) ? Meteor.users.findOne({_id: userId}).username : {};
  let currentUser = Meteor.user() ? Meteor.user() : {};
  return {
    currentUser,
    posts: Posts.find({authorId: userId}, { sort: { createAt: -1 } }).fetch(),
    userIdName
  };
})(User);