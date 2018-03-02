//import { Comments } from '../api/comment.jsx';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';

class Comment extends Component{
  handleDeleteComment(){
    if(confirm("Delete comment?")){
      Meteor.call('comment.delete', this.props.comment._id);
    }
  }

  render(){
    return (
      <div>
        <strong>{this.props.comment.authorUsername}</strong>: {this.props.comment.text}
        {(this.props.currentUser._id == this.props.comment.authorId &&
          <span>
            <button onClick={this.handleDeleteComment.bind(this)}>&times;</button>
          </span>
        )}
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