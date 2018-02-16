import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import AccountsUIWrapper from './AccountsUIWrapper.js';

export class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {}
  }

  render() {
    //console.log(Meteor.userId())
    return <div>
        <h1> This is the Home Page. </h1>
        <div><Link to="/login"> To Login page </Link></div>
        <div><Link to="/registration"> To Registration page </Link></div>
        <div><Link to="/createpost"> To Create Post page</Link></div>
        <div><Link to="/"> To main page </Link></div>
        <div><AccountsUIWrapper/></div>
    </div>
  }
}