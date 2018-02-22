import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { Posts } from '../api/post.jsx';
import { Redirect } from 'react-router-dom'
import { withTracker } from 'meteor/react-meteor-data';

class CreatePost extends React.Component {
  constructor() {
    super();
    this.state = {}
  }

	submitPost(event){
    event.preventDefault();

    var url = this.refs.post.value.trim()
    var tags = this.refs.tags.value.trim()
    var author = Meteor.userId()
    var authorUsername = this.props.currentUser.username

    this.refs.post.value=""
    this.refs.tags.value=""

    //console.log(url);
    //console.log(tags);
    //console.log(author);

    Posts.insert({
      url: url,
      tags: tags,
      createAt: new Date(),
      likes: 0,
      comments: [],
      authorId: author,
      authorUsername: authorUsername
    });
	}

  render() {
    /*
    if(this.props.currentUser != null){
      console.log(this.props.currentUser.username)
    }
    */
    return <div>
        <h1> This is the Create Post Page. </h1>
        <Link to="/login"> To Login page </Link>
        <Link to="/registration"> To registration page </Link>
        <Link to="/"> To main page </Link>
        <form className="new-post">
          <input
            type="text"
            ref="post"
            placeholder="url goes here"/><br/>
          <input
            type="text"
            ref="tags"
            placeholder="tags goes here"/><br/>
          <button onClick={this.submitPost.bind(this)}>Submit</button>
        </form>
    </div>
  }
}

export default withTracker(() => {
  return {
    currentUser: Meteor.user(),
  };
})(CreatePost);