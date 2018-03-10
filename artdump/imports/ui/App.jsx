import React, { Component } from 'react';
 
import HomePage from './HomePage';
import CreatePost from './CreatePostPage';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import Settings from './Settings'

import User from './User';


import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
//global variable
nightmode_switch = false;
// App component - represents the whole app
export default class App extends Component {
  render() {
    return <BrowserRouter>
      <Switch>
        <Route exact path='/' component={HomePage}/>
        {/* both /roster and /roster/:number begin with /roster */}
        <Route path='/createpost' component={CreatePost}/>
        <Route path='/user/:userId' component={User}/>
        <Route path='/login' component={LoginPage}/>
        <Route path='/signup' component={SignUpPage}/>
        <Route path='/settings' component={Settings}/>
        <Redirect to ='/HomePage'/>
      </Switch>
    </BrowserRouter>
  }
}