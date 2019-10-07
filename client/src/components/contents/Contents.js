import React, { Component } from 'react';
import { Link } from "react-router-dom";
import AuthService from "../auth/AuthService";
import Selector from './Selector';
import Thread from './thread/Thread';

class Contents extends Component {

  constructor(props) {
    super(props);
    this.state = { loggedInUser: this.props.userInSession };
    this.service = new AuthService();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, loggedInUser: nextProps["userInSession"] });
  }
  render() {
    console.log(this.state.loggedInUser)
    return (
    <div className="container">
        <Selector username={this.state.loggedInUser.username}/>
        <Thread/>
    </div>
         );
    
  }
}

export default Contents;