import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Navbar from './Navbar.jsx'

class Settings extends Component{
  constructor() {
    super();
    this.state = {nightmode: nightmode_switch}
  }

  nightmodeOff(event){
    nightmode_switch = false;
    console.log("off");
    this.setState({nightmode: false});
    //console.log(nightmode);
  }

  nightmodeOn(event){
    nightmode_switch = true;
    console.log("on");
    this.setState({nightmode: true});
    //console.log(nightmode);
  }

  renderNightmodeSwitch(){
    if(this.state.nightmode){
      return <div>
          <button onClick={this.nightmodeOff.bind(this)}>
            NIGHTMODE OFF
          </button>
        </div>
    } else {
      return <div>
          <button onClick={this.nightmodeOn.bind(this)}>
            NIGHTMODE ON
          </button>
        </div>
    }
  }
  render(){
    return(<div>
        <Navbar path={this.props.match.path} nightmode={this.state.nightmode}/>
        {this.renderNightmodeSwitch()}
      </div>
    );
  }

}

export default withTracker(props => {
  let currentUser = Meteor.user() ? Meteor.user() : {};
  return {
    currentUser
  };
})(Settings);