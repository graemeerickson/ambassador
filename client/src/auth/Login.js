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
    axios.post('http://localhost:3001/auth/login', this.state)
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
          <div className="form-group form-inline">
            <label htmlFor="email">Email address: </label>
            <input name="Email" className="form-control" placeholder="johnny@appleseed.com" value={this.state.email} onChange={this.handleEmailChange} />
          </div>
          <div className="form-group form-inline">
            <label htmlFor="password">Password: </label>
            <input name="Password" className="form-control" type="password" value={this.state.password} onChange={this.handlePasswordChange} />
          </div>
          <input type="submit" value="Login" className="btn btn-primary" />
        </form>
      </div>
    );
  }
}

export default Login;