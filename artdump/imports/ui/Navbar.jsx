import React, {Component} from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Search from './Search.jsx'
import { Link, Redirect, Switch } from 'react-router-dom';
import AccountsUIWrapper from './AccountsUIWrapper.js';


class Navbar extends Component{
  constructor() {
    super();
    this.state = {redirectToHome: false}
  }

  renderSignupAndPost(){
    if(this.props.currentUser._id == null && this.props.path != "/signup"){
      return <div>
          <Link to='/signup'>Signup</Link>
        </div>
    } else if (this.props.currentUser._id != null && this.props.path != "/createpost"){
      return <div>
          <Link to="/createpost">Post</Link>
        </div>
    }
  }

  logOut(event){
    event.preventDefault();
    //console.log("pressed logout")
    Meteor.logout(function(err){ 
      console.log(err);
    });
    if(this.props.path == "/createpost"){
      this.setState({ redirectToHome: true });
    }
  }

  renderLoginLogout(){
    //console.log(this.props.currentUser);
    if(this.props.currentUser._id == null && this.props.path != "/login"){
      return <div>
          <Link to='/login'>Login</Link>
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
    console.log(this.props.currentUser);
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

export default withTracker(props => {
  let currentUser = Meteor.user() ? Meteor.user() : {};
  return {
    currentUser
  };
})(Navbar);