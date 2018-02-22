import React, { Component } from 'react';

import { Posts } from '../api/post.jsx';

export default class Post extends Component {
  render(){
    let author = this.props.post.authorUsername
    //let author = Meteor.users.findOne(this.props.post.authorId).username;
    return <div>
        <div className="postTitle">
          {author}:
          <a 
            key={this.props.i} 
            href={this.props.post.url}> 
            {this.props.post.tags} </a>
        </div>
        <div className="postPicture">
          <img src={this.props.post.url} />
        </div>
        <div className="postLikes">
          {this.props.post.likes} likes
        </div>
        <div className="postComments">
          Comments: {this.props.post.comments}
        </div>
    </div>
  }
}