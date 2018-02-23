import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { Posts } from '../api/post.jsx';
import { Redirect, Switch } from 'react-router-dom'
import { withTracker } from 'meteor/react-meteor-data';
import HomePage from './HomePage';

class CreatePost extends React.Component {
  constructor() {
    super();
    this.state = {redirectToHome: false}
  }

	submitPost(event){
    event.preventDefault();

    var url = this.refs.post.value.trim()
    var tags = this.refs.tags.value.trim()
    var author = this.props.currentUser._id
    //added username field to make it easier to display author name
    var authorUsername = this.props.currentUser.username

    this.refs.post.value=""
    this.refs.tags.value=""

    Posts.insert({
      url: url,
      tags: tags,
      createAt: new Date(),
      likes: 0,
      comments: [],
      authorId: author,
      authorUsername: authorUsername
    });
    this.setState({ redirectToHome: true })
	}

  render() {
    //redirect to home page
    //console.log(this.props.currentUser)
    if (this.state.redirectToHome) {
      return (
        <Switch>
          <Redirect to="/"/>
        </Switch>
      )
    }
    
    return <div>
        <h1> This is the Create Post Page. </h1>
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
  let currentUser = Meteor.user() ? Meteor.user() : {};
  return {
    currentUser,
  };
})(CreatePost);