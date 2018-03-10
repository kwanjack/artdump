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
    this.state = {
      nightmode: nightmode_switch
    };
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
        <Navbar path={this.props.match.path} nightmode={this.state.nightmode}/>
      </div>
      <div className={"box sidebar" + (this.state.nightmode ? " nightmode-page" : '')}></div>
      <div className={"box sidebar2" + (this.state.nightmode ? " nightmode-page" : '')}></div>
      <div className={"box content" + (this.state.nightmode ? " nightmode-page" : '')}>
        {userIdName.toString()}'s Posts
        { this.renderPosts() }
      </div>
      <div className={"box footer" + (this.state.nightmode ? " nightmode-page" : '')}></div>
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