import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Posts } from '../api/post.jsx';
import { withTracker } from 'meteor/react-meteor-data';
import Comment from './Comment.jsx';
import { Comments } from '../api/comment.jsx';

class Post extends Component {
  constructor() {
    super();
    this.state = {
      nightmode: nightmode_switch
    };
  }
  //Call Meteor method to insert comment in comments collection
  submitComment(post_index, event){
    event.preventDefault();
    let ref = 'commentContent'+post_index;
    let text = this.refs[ref].value
    //make sure users can't post empty comments
    if(text != ""){
      let postId = this.props.post._id
      Meteor.call('comment.insert', text, postId)
    }
    this.refs[ref].value = "";
  }
  //Render the text box and button to post comments
  //Need post_index to know which post comment box is on
  renderSubmitComment(post_index){
    return <div className={"submit-comment" + (this.state.nightmode ? " nightmode-post" : '')}>
        <form className="comment-form"
          onSubmit={this.submitComment.bind(this, post_index)}>
          <div className="comment-inputbox">
            <textarea className="comment-inputbox-textarea"
              rows="1" 
              cols="65" 
              ref={"commentContent"+post_index}/>
          </div>
          <div className="post-comment-button">
            <button className="btn grey" type="submit">
              <div>Submit</div>
            </button>
          </div>
        </form>
    </div>
  }
  //Render comment box
  renderCommentsBox(){
    return <div className={"comments-box-container" + (this.state.nightmode ? " nightmode-post" : '')}>
        {this.renderComments()}
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
        <div className="star" onClick={this.likePost.bind(this)}>
          <i className="fa fa-star-o"></i>
        </div>
      </div>
    } else if(currentUserLiked){
      return <div className="unlikeButton">
        <div className="star" onClick={this.unlikePost.bind(this)}>
          <i className="fa fa-star"></i>
        </div>
      </div>
    }
  }

  handleDeletePost(){
    if(confirm("Delete post?")){
      Meteor.call('post.delete', this.props.post._id);
    }
  }

  render(){
    //console.log(this.props.postComments);
    let author = this.props.post.authorUsername;
    let authorId = this.props.post.authorId;

    //grab tags and turn into hash tags
    let tags = this.props.post.tags.slice(0);
    let hashtags = [];
    tags.forEach(function(element) {
      element = "#".concat(element);
      hashtags.push(element);
    });
    //console.log(hashtags);
    return <div >
        <div className="post-wrapper-child">
          <div className="post-picture-wrapper">
            <img src={this.props.post.url} />
          </div>
          <div className={"author-container" + (this.state.nightmode ? " nightmode-post" : '')}>
            {(this.props.currentUser._id == this.props.post.authorId &&
              <div className="delete-post-button-container">
                <div onClick={this.handleDeletePost.bind(this)}>
                  <i className="fa fa-times-circle"></i>
                </div>
              </div>
            )}
            <Link className="author-name" to={`/user/${authorId}`} >
              <strong>{author}: </strong>
            </Link>
            &nbsp;
            <span>{this.props.post.title}</span>
          </div>
          <div className={"likes-container" + (this.state.nightmode ? " nightmode-post" : '')}>
            {(this.props.currentUser._id != null &&
              this.renderLike()
            )}
            {/*{this.props.post.likes.length} likes*/}
          </div>
          <div className={"post-description-container" + (this.state.nightmode ? " nightmode-post" : '')}>
            <p className="post-description">
              {this.props.post.description}
              &nbsp;
              <a className="post-hashtags">{hashtags.join(" ")}</a>
            </p>
          </div>
          {(this.props.postComments.length != 0 &&
            this.renderCommentsBox()
          )}
          {(this.props.currentUser._id != null &&
            this.renderSubmitComment(this.props.post._id)
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