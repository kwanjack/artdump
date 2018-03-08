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
          <button onClick={this.routeSignup.bind(this)}>Signup</button>
        </div>
    //don't render createpost if user is on createpost
    } else if (this.props.currentUser._id != null && this.props.path != "/createpost"){
      return <div>
          <button onClick={this.routeCreatePost.bind(this)}>Post</button>
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
          <button onClick={this.routeLogin.bind(this)}>Login</button>
        </div>
    } else if (this.props.currentUser._id != null){
      return <div>
          <button onClick={this.logOut.bind(this)}>Logout</button>
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
    return <div className="nav-bar-wrapper">
      <div className="navbar-title-container">
        <Link className="title-logo" to="/">ARTDUMP</Link>
      </div>
      <div className="search-bar-container">
        <Search/>
      </div>
      <div className="post-signup-container">
        {/*Make sure not to render createpost on creatpost page*/}
        {this.renderSignupAndPost()}
      </div>
      <div className="login-button-container">
        {this.renderLoginLogout()}
      </div>
      <div className="setting-button-container">
        <button>Setting</button>
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