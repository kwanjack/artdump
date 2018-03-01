import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Posts } from '../api/post.jsx';
import { withTracker } from 'meteor/react-meteor-data';
import Comment from './Comment.jsx';
import { Comments } from '../api/comment.jsx';
import './Post.css'

class Post extends Component {
  //Call Meteor method to insert comment in comments collection
  submitComment(post_index, event){
    event.preventDefault();
    let ref = 'commentContent'+post_index;
    let text = this.refs[ref].value
    let postId = this.props.post._id
    Meteor.call('comment.insert', text, postId)
    this.refs[ref].value = "";
  }
  //Render the text box and button to post comments
  //Need post_index to know which post comment box is on
  renderPostComment(post_index){
    return <div>
      <div className="comment-textbox">
        <form onSubmit={this.submitComment.bind(this, post_index)}>
          <textarea 
            rows="4" 
            cols="50" 
            ref={"commentContent"+post_index}/>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  }
  //Render the list of comments of a post
  renderComments(){
    let { postComments } = this.props;

    return postComments.map((comment, i) => {
      return <div key={i}>
        <Comment
          comment={comment}/>
      </div>
    });
  }

  likePost(){
    Posts.update(
      { _id: this.props.post._id},
      { $push: { likes: this.props.currentUser._id } }
    )
  }

  unlikePost(){
    Posts.update(
      { _id: this.props.post._id},
      { $pull: { likes: this.props.currentUser._id } }
    )
  }

  renderLike(){
    let currentUserLiked = this.props.post.likes.includes(this.props.currentUser._id);
    let postId = this.props.post._id;
    let userId = this.props.currentUser._id
    if(!currentUserLiked){
      return <div className="likeButton">
        {<button onClick={this.likePost.bind(this)}>Like</button>}
      </div>
    } else if(currentUserLiked){
      return <div className="unlikeButton">
        <button onClick={this.unlikePost.bind(this)}>Unlike</button>
      </div>
    }
  }

  render(){
    //console.log(this.props.postComments);
    let author = this.props.post.authorUsername;
    let authorId = this.props.post.authorId;
    return <div>
        <div className="postTitle">
          <Link to={`/user/${authorId}`} >
            <strong>{author}</strong>:{" "}
          </Link>
        </div>
        <div className="postPicture">
          <img src={this.props.post.url} />
        </div>
        {(this.props.currentUser._id != null &&
          this.renderLike()
        )}
        <div className="postLikes">
          {this.props.post.likes.length} likes
        </div>
        <div className="postComments">
          Comments:
          {this.renderComments()}
        </div>
        <div className="post-comment">
          {(this.props.currentUser._id != null &&
            this.renderPostComment(this.props.post._id)
          )}
        </div>
    </div>
  }
}

export default withTracker(props => {
  let postId = props.post._id;
  let currentUser = Meteor.user() ? Meteor.user() : {};
  let postComments = Comments.find({postId: postId}, { sort: { createAt: -1 } }).fetch();

  return {
    currentUser,
    postComments
  };
})(Post);