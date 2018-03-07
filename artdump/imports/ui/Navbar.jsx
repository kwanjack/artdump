import React, {Component} from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Search from './Search.jsx'
import { Link } from 'react-router-dom';
import AccountsUIWrapper from './AccountsUIWrapper.js';


class Navbar extends Component{
  render (){
    return <div className="nav-bar-wrapper">
      <div className="navbar-title-container">
        <Link className="title-logo" to="/">Artdump</Link>
      </div>
      <div className="search-bar-container">
        <Search/>
      </div>
      <div className="post-button-container">
        {/*Make sure not to render createpost on creatpost page*/}
        {((this.props.currentUser._id != null && this.props.path != "/createpost") &&
          <div><Link to="/createpost">Post</Link></div>
        )}
      </div>
      <div className="signup-button-container">
        <AccountsUIWrapper/>
      </div>
      <div className="login-button-container">
        <button>Login</button>
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