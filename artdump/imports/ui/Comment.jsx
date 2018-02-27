//import { Comments } from '../api/comment.jsx';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';

class Comment extends Component{
  render(){
    return (
      <div>
        <strong>{this.props.comment.authorUsername}</strong>: {this.props.comment.text}
        </div>
    ); 
  }
}

export default withTracker(props => {
  let currentUser = Meteor.user() ? Meteor.user() : {};
  return {
    currentUser
  };
})(Comment);