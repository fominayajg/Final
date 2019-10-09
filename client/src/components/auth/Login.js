// auth/Signup.js
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import AuthService from './AuthService'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
    this.service = new AuthService();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    this.service.login(username, password)
      .then(response => {
        this.setState({
          username: username,
          password: password,
          error: false
        });

        this.props.getUser(response)
      })
      .catch(error => {
        this.setState({
          username: username,
          password: password,
          error: true
        });
      })
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {

    return (<div className="auth">
      
      <div>
        <a href="http://localhost:3010/api/auth/google">Sign In with Google</a>
      </div>
      <form onSubmit={this.handleFormSubmit}>
          <h3>Login</h3>
          <input placeholder="Username" type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)} />
          <input placeholder="Password" type="password" name="password" value={this.state.password} onChange={e => this.handleChange(e)} />

        <input type="submit" value="Login" />
      </form>

      <h1>{this.state.error ? 'Error' : ''}</h1>
    </div>)
  }
}

export default Login;