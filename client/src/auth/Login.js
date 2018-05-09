import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleEmailChange = (e) => { this.setState({ email: e.target.value }); }
  handlePasswordChange = (e) => { this.setState({ password: e.target.value }); }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('form was submitted!', this.state);
    axios.post('http://localhost:3001/auth/login', this.state)
    .then(result => {
      console.log('success:', result);
      // add newly-received token to localStorage
      localStorage.setItem('loginToken', result.data.token);
      // update user with a call to App.js
      this.props.updateUser();
    })
    .catch(err => { console.log('error', err.response.data); });
  }

  render() {
    if (this.props.user) {
      return (<Redirect to="/profile" />);
    }

    return(
      <div>
        <h2>Log into your account</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input name="Email" placeholder="Email address" value={this.state.email} onChange={this.handleEmailChange} />
          </div>
          <div>
            <input name="Password" type="password" value={this.state.password} onChange={this.handlePasswordChange} />
          </div>
          <input type="submit" value="Login" className="button" />
        </form>
      </div>
    );
  }
}

export default Login;