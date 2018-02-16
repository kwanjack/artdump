import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom'

export class CreatePost extends React.Component {
  constructor() {
    super();
    this.state = {}
  }

  render() {
    return <div>
        <h1> This is the Create Post Page. </h1>
        <Link to="/login"> To Login page </Link>
        <Link to="/registration"> To registration page </Link>
        <Link to="/"> To main page </Link>
        <div>
          <h1>Post Content</h1>
          <form className="new-post">
            <input
              type="text"
              ref="post-input"
              placeholder="Picture goes here"
              />
          </form>
        </div>
    </div>
  }
}