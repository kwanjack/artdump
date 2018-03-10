import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { Redirect, Switch } from 'react-router-dom'
import { withTracker } from 'meteor/react-meteor-data';
import Navbar from './Navbar.jsx'

class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = {redirectToHome: false}
  }

	logIn(event){
    event.preventDefault();
    let { username, password } = this.state;

    let user = { username, password };

    Meteor.loginWithPassword(username, password, err => {
      if (err) {
        this.setState({ error: err.reason });
      }
      else this.props.history.push('/');
    });
	}

  render() {
    return <div className="wrapper">
      <div className="box header">
        <Navbar path={this.props.match.path}/>
      </div>
      <div className="box sidebar"></div>
      <div className="box sidebar2"></div>
      <div className="box content">
        <h1 className="title"> Log In </h1>
        <form className="form-wrapper" onSubmit={this.logIn.bind(this)}>

          <div className="group">      
            <input className="form-field" onChange={ (e) => this.setState({ username: e.target.value }) } type="text" required/>
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Name</label>
          </div>
            
          <div className="group">      
            <input className="form-field" onChange= {(e) => this.setState({ password: e.target.value }) } type="password" required/>
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Email</label>
          </div>

          <div className="submit-button">
            <button className="btn grey" type="submit"><span>Sign In</span></button>
          </div>

          { this.state.error ? <div> {this.state.error} </div> : null }
        </form>

      </div>
      <div className="box footer"></div>
    </div>;
  }
}

export default withTracker(() => {
  let currentUser = Meteor.user() ? Meteor.user() : {};
  return {
    currentUser,
  };
})(LoginPage);