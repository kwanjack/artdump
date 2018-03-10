import React, {Component} from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Search from './Search.jsx'
import { Link, Redirect, Switch, withRouter } from 'react-router-dom';
import AccountsUIWrapper from './AccountsUIWrapper.js';

class Navbar extends Component{
  constructor() {
    super();
    this.state = {redirectToHome: false}
  }

  routeLogin(){
    this.props.history.push('/login');
  }

  routeSignup(){
    this.props.history.push('/signup');
  }

  routeCreatePost(){
    this.props.history.push('/createpost');
  }

  renderSignupAndPost(){
    //don't render signup if user is on signup page
    if(this.props.currentUser._id == null && this.props.path != "/signup"){
      return <div>
          <Link className="link-button login-button" to="/signup">
            <i className="fa fa-plus"></i>
            &nbsp;
            SIGNUP
          </Link>
        </div>
    //don't render createpost if user is on createpost
    } else if (this.props.currentUser._id != null && this.props.path != "/createpost"){
      return <div>
          <h1 className="nav-button post-button" onClick={this.routeCreatePost.bind(this)}>
            <i className="fa fa-upload"></i>
            &nbsp;
            POST
          </h1>
        </div>
    }
  }

  logOut(event){
    event.preventDefault();
    Meteor.logout(function(err){ 
      console.log(err);
    });
    if(this.props.path == "/createpost"){
      this.setState({ redirectToHome: true });
    }
  }

  renderLoginLogout(){
    //don't render login button if user on login page
    if(this.props.currentUser._id == null && this.props.path != "/login"){
      return <div>
          <Link className="link-button login-button" to="/login">
            <i className="fa fa-sign-in"></i>
            &nbsp;
            LOGIN
          </Link>
        </div>
    } else if (this.props.currentUser._id != null){
      return <div>
          <h1 className="nav-button logout-button" onClick={this.logOut.bind(this)}>
            <i className="fa fa-sign-out"></i>
            &nbsp;
            LOGOUT
          </h1>
        </div>
    }
  }

  render (){
    if (this.state.redirectToHome) {
      return (
        <Switch>
          <Redirect to="/"/>
        </Switch>
      )
    }
    //console.log(this.props.currentUser);
    return <div className={"nav-bar-wrapper " + (this.props.nightmode ? 'nightmode-navbar' : '')}>
      <div className="navbar-title-container">
        <Link className="title-logo" to="/">
          <i className="fa fa-trash"></i>
          &nbsp;
          ARTDUMP
        </Link>
      </div>
      <div className="search-bar-container">
        <Search/>
      </div>
      <div className="post-signup-container">
        {/*Make sure not to render createpost on creatpost page*/}
        {this.renderSignupAndPost()}
      </div>
      <div className="setting-button-container">
        <Link className="nav-button setting-button" to="/settings">
          <i className="fa fa-cog"></i>
          &nbsp;
          SETTING
        </Link>
      </div>
      <div className="login-logout-button-container">
        {this.renderLoginLogout()}
      </div>
    </div>
  }
}

export default withRouter( withTracker(props => {
  let currentUser = Meteor.user() ? Meteor.user() : {};
  return {
    currentUser
  };
})(Navbar));