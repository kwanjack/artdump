import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { Posts } from '../api/post.jsx';
import { Redirect, Switch } from 'react-router-dom'
import { withTracker } from 'meteor/react-meteor-data';
import HomePage from './HomePage';
import Navbar from './Navbar.jsx'

class CreatePost extends React.Component {
  constructor() {
    super();
    this.state = {redirectToHome: false}
  }

	submitPost(event){
    event.preventDefault();
    var url = this.url.value.trim();
    var tags = this.tags.value.trim().split(" ");
    var author = this.props.currentUser._id;
    //added username field to make it easier to display author name
    var authorUsername = this.props.currentUser.username;

    this.url.value="";
    this.tags.value="";

    Posts.insert({
      url: url,
      tags: tags,
      createAt: new Date(),
      likes: [],
      comments: [],
      authorId: author,
      authorUsername: authorUsername
    });
    this.setState({ redirectToHome: true });
	}

  render() {
    //redirect to home page
    if (this.state.redirectToHome) {
      return (
        <Switch>
          <Redirect to="/"/>
        </Switch>
      )
    }
    //Pass in the path to not render the createpost in navbar
    return <div>
        <div>
          <Navbar
            path={this.props.match.path}/>
        </div>
        <h1> This is the Create Post Page. </h1>
        <form onSubmit={this.submitPost.bind(this)}>
          <div>
            URL
            </div>
          <textarea 
            rows="1" 
            cols="50" 
            ref={(input) => {this.url = input}}
            placeholder="url goes here"/><br/>
          <div>
            Tags
            </div>
          <textarea 
            rows="4" 
            cols="50" 
            ref={(input) => {this.tags = input}}
            placeholder="tags goes here"/>
          <div>
            <button type="submit">Submit</button>
          </div>
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