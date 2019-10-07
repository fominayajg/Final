// auth/Signup.js
import React, { Component } from 'react';
import AuthService from './AuthService'

class Signup extends Component {
  constructor(props){
    super(props);
    this.state = { username: '', password: '' };
    this.service = new AuthService();
  }
    
  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    
    this.service.signup(username, password)
    .then( response => {
        this.setState({
            username: "", 
            password: "",
        });

        this.props.getUser(response.user)
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
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
      

  render() {
    return(
      <div className="auth">
        

        <form onSubmit={this.handleFormSubmit}>
          <h3>Signup</h3>
            <input placeholder="Username" type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/>
          
            <input placeholder="Password" type="password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
          
          <input type="submit" value="Sign up" />
        </form>

        <h1>{this.state.error ? 'Error' : ''}</h1>
      </div>
    )
  }
}

export default Signup;