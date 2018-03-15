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
    this.state = {
      redirectToHome: false,
      nightmode: nightmode_switch
    };
  }

	createAccount(event) {
    event.preventDefault();
    let { username, password, email } = this.state;
    let user = { username, password, email };

    Accounts.createUser(user, err => {
      if (err) {
        console.log('err:', err);
        this.setState({ error: err.reason });
      } else {
        this.props.history.push('/');
      }
    });
	}

  checkValidation(e) {
    let emvalidated = (this.state.email == this.state.cemail);
    let pwvalidated = (this.state.password == this.state.cpassword);

    if (emvalidated && pwvalidated) { return this.setState({ disabled: false, error: null}); } 
    if(!emvalidated) { return this.setState({ disabled: true, error: 'Email Mismatch!' }); }
    if(!pwvalidated) { return this.setState({ disabled: true, error: 'Password Mismatch!' }); }
  }

  render() {    
    return <div className="wrapper-login">
        <div className="box header">
          <Navbar path={this.props.match.path} nightmode={this.state.nightmode}/>
        </div>
      <div className="box sidebar"></div>
      <div className="box sidebar2"></div>
      <div className="box content">
        <h1 className="title"> Sign Up </h1>
        <form className="form-wrapper" onSubmit={this.createAccount.bind(this)}>
          
          <div className="group">
            <input className="form-field" onChange={ (e) => this.setState({ username: e.target.value }) } type="text" required/>
            <span className="highlight"></span>
            <span className="bar"></span>
            <label><b>Username</b></label>
          </div>

          <div className="group">
            <input className="form-field" onChange= {(e) => this.setState({ password: e.target.value, disabled: false }) } type="password" required/>
            <span className="highlight"></span>
            <span className="bar"></span>
            <label><b>Password</b></label>
          </div>

          <div className="group">
            <input className="form-field" onChange= {(e) => this.setState({ cpassword: e.target.value, disabled: false }) } type="password" required/>
            <span className="highlight"></span>
            <span className="bar"></span>
            <label><b>Confirm Password</b></label>
          </div>

          <div className="group">
            <input className="form-field" onChange= {(e) => this.setState({ email: e.target.value, disabled: false }) } type="text" required/>
            <span className="highlight"></span>
            <span className="bar"></span>
            <label><b>Email</b></label>
          </div>

          <div className="group">
            <input className="form-field" onChange= {(e) => this.setState({ cemail: e.target.value, disabled: false }) } type="text" required/>
            <span className="highlight"></span>
            <span className="bar"></span>
            <label><b>Confirm Email</b></label>
          </div>

          <div>
            <button onMouseOver= {(e) => this.checkValidation(e)} disabled={ this.state.disabled } className="medium-button" type="submit">Submit</button>
          </div>

          { this.state.error ? <div> {this.state.error} </div> : null }

        </form>
        </div>
    </div>
  }
}

export default withTracker(() => {
  let currentUser = Meteor.user() ? Meteor.user() : {};
  return {
    currentUser,
  };
})(SignUpPage);