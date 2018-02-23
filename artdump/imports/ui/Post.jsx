import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Posts } from '../api/post.jsx';

export default class Post extends Component {
  render(){
    let author = this.props.post.authorUsername
    let authorId = this.props.post.authorId
    
    return <div>
        <div className="postTitle">
          <Link to={`/user/${authorId}`} params={{ authorUsername: "blah" }}>
            {author}:{" "}
          </Link>
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