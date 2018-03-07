import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Link } from 'react-router-dom';
import { Redirect, Switch } from 'react-router-dom'
import { withTracker } from 'meteor/react-meteor-data';
import Navbar from './Navbar.jsx'

class SignUpPage extends React.Component {
  constructor() {
    super();
    this.state = {redirectToHome: false}
  }

	createAccount(event) {
    event.preventDefault();
    let { username, password } = this.state;
    let user = { username, password };

    Accounts.createUser(user, err => {
      if (err) {
        console.log('err:', err);
        this.setState({ error: err.reason });
      } else {
        this.props.history.push('/');
      }
    });
	}

  render() {    
    return <div>
        <div>
          <Navbar
            path={this.props.match.path}/>
        </div>
        <h1> Sign Up </h1>
        <form onSubmit={this.createAccount.bind(this)}>
          <div>
            <label><b>Username</b></label>
            <input onChange={ (e) => this.setState({ username: e.target.value }) } type="text" placeholder="username" required/>
          </div>

          <div>
            <label><b>Password</b></label>
            <input onChange= {(e) => this.setState({ password: e.target.value }) } type="password" placeholder="password" required/>
          </div>

          <div>
            <button type="submit">Submit</button>
          </div>

          { this.state.error ? <div> this.state.error </div> : null }

        </form>

    </div>
  }
}

export default withTracker(() => {
  let currentUser = Meteor.user() ? Meteor.user() : {};
  return {
    currentUser,
  };
})(SignUpPage);