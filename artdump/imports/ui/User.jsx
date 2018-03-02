import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Post from './Post.jsx'
import { Posts } from '../api/post';
import HomePage from './HomePage';
import { Link } from 'react-router-dom';
import AccountsUIWrapper from './AccountsUIWrapper.js';

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
    return <div>
        <div>  
          <Link to="/"> To main page </Link>
          </div>
        <div><AccountsUIWrapper/></div>
        <div className="user-page-username">
          {userIdName.toString()}'s Posts
          </div>
        <div>
          { this.renderPosts() }
          </div>
      </div>
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