import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom'

export class RegistrationPage extends React.Component {
  constructor() {
    super();
    this.state = {}
  }

  render() {
    return <div>
        <h1> This is the Registration Page. </h1>
        <Link to="/login"> To Login page </Link>
        <Link to="/registration"> To registration page </Link>
        <Link to="/"> To main page </Link>
    </div>
  }
}