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
    this.state = {
      redirectToHome: false,
      nightmode: nightmode_switch
    };
  }

	submitPost(event){
    event.preventDefault();
    let { title, description, url, tagstring } = this.state;
    //var url = this.url.value.trim();
    let tags = tagstring.split(" ");
    let author = this.props.currentUser._id;
    //added username field to make it easier to display author name
    var authorUsername = this.props.currentUser.username;

    //this.url.value="";
    //this.tags.value="";

    Posts.insert({
      title: title,
      url: url,
      description: description,
      tags: tags,
      createAt: new Date(),
      likes: [],
      authorId: author,
      authorUsername: authorUsername
    });
    this.setState({ redirectToHome: true });
	}

  render() {
    //redirect to home page once post
    //also redirect if there is no user logged in
    if (this.state.redirectToHome || this.props.currentUser._id == null) {
      return (
        <Switch>
          <Redirect to="/"/>
        </Switch>
      )
    }
    //Pass in the path to not render the createpost in navbar
    return <div className="wrapper">
      <div className="box header">
        <Navbar path={this.props.match.path} nightmode={this.state.nightmode}/>
      </div>
      <div className="box sidebar"></div>
      <div className="box sidebar2"></div>
      <div className="box content">
        <h1 className="title"> Upload </h1>
        <form className="form-wrapper" onSubmit={this.submitPost.bind(this)}>

          <div className="group">      
            <input className="form-field" onChange={ (e) => this.setState({ title: e.target.value }) } type="text" required/>
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Title</label>
          </div>
            
          <div className="group">      
            <input className="form-field" onChange= {(e) => this.setState({ url: e.target.value }) } type="text" required/>
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>URL</label>
          </div>

          <div className="group">      
            <input className="form-field" onChange= {(e) => this.setState({ description: e.target.value }) } type="text" required/>
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Description</label>
          </div>

          <div className="group">      
            <input className="form-field" onChange= {(e) => this.setState({ tagstring: e.target.value }) } type="text" required/>
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Tags</label>
          </div>

          <div className="submit-button">
            <button className="btn grey" type="submit"><span>Post</span></button>
          </div>

          { this.state.error ? <div> {this.state.error} </div> : null }
        </form>

      </div>
      <div className="box footer"></div>
    </div>
  }
}

export default withTracker(() => {
  let currentUser = Meteor.user() ? Meteor.user() : {};
  return {
    currentUser,
  };
})(CreatePost);