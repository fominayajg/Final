// navbar/Navbar.js

import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../auth/AuthService";
import "./Navbar.css"

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, loggedInUser: nextProps["userInSession"] });
  }

  handleLogout = e => {
    this.props.logout();
  };

  render() {
    if (this.state.loggedInUser) {
      return (
        <nav>
          <h1>VetApp</h1>
          <ul>
            <li>
              <a onClick={this.handleLogout}>Logout</a>
            </li>
          </ul>

        </nav>
      );
    } else {
      return (
        <div>
          <nav>
            <h1>VetApp</h1>
            {/* <ul>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul> */}
          </nav>
        </div>
      );
    }
  }
}

export default Navbar;
