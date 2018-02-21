import React, { Component } from 'react';
 
import HomePage from './HomePage';
import { LoginPage }from './LoginPage';
import { RegistrationPage } from './RegistrationPage';
import { CreatePost } from './CreatePostPage';
 
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

Posts = new Mongo.Collection("posts");

// App component - represents the whole app
export default class App extends Component {
  render() {
    return <BrowserRouter>
      <Switch>
        <Route exact path='/' component={HomePage}/>
        {/* both /roster and /roster/:number begin with /roster */}
        <Route path='/login' component={LoginPage}/>
        <Route path='/registration' component={RegistrationPage}/>
        <Route path='/createpost' component={CreatePost}/>
        <Redirect to ='/HomePage'/>
      </Switch>
    </BrowserRouter>
  }
}