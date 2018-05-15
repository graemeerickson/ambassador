import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { SERVER_URL } from '../constants';

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
    axios.post(SERVER_URL + '/auth/login', this.state)
    .then(result => {
      console.log('Success:', result);
      // add newly-received token to localStorage
      localStorage.setItem('loginToken', result.data.token);
      // update user with a call to App.js
      this.props.updateUser();
    })
    .catch(err => { console.log('Error', err.response.data); });
  }

  render() {
    if (this.props.user) {
      return (<Redirect to="/" />);
    }

    return(
      <div>
        <br/>
        <h2>Log into your account</h2><br/>
        <form onSubmit={this.handleSubmit}>
          <div className="input-group mb-3 registration-input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="email">Email</span>
            </div>
            <input name="email" type="email" className="form-control" placeholder="johnny@appleseed.com" aria-label="Email" aria-describedby="email" value={this.state.email} onChange={this.handleEmailChange} required />
          </div>
          <div className="input-group mb-3 registration-input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="password">Password</span>
            </div>
            <input name="password" type="password" className="form-control" aria-label="Password" aria-describedby="password" value={this.state.password} onChange={this.handlePasswordChange} required />
          </div>
          <input type="submit" value="Login" className="btn btn-primary" />
        </form>
      </div>
    );
  }
}

export default Login;