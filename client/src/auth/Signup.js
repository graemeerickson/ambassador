import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: ''
    };
  }

  handleNameChange = (e) => { this.setState({ name: e.target.value }); }
  handleEmailChange = (e) => { this.setState({ email: e.target.value }); }
  handlePasswordChange = (e) => { this.setState({ password: e.target.value }); }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('form was submitted!', this.state);
    axios.post('http://localhost:3001/auth/signup', this.state)
      .then(result => {
        console.log('success:', result);
        // add newly-received token to localStorage
        localStorage.setItem('loginToken', result.data.token);
        // update user with a call to App.js
        this.props.updateUser();
      })
      .catch(err => { console.log('error', err) });
  }

  render() {
    if (this.props.user) { return(<Redirect to="/profile" />); }

    return(
      <div>
        <h2>Sign up as a new user</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input name="Name" placeholder="Name" value={this.state.name} onChange={this.handleNameChange} />
          </div>
          <div>
            <input name="Email" placeholder="Email address" value={this.state.email} onChange={this.handleEmailChange} />
          </div>
          <div>
            <input name="Password" type="password" value={this.state.password} onChange={this.handlePasswordChange} />
          </div>
          <input type="submit" value="Sign up" className="button" />
        </form>
      </div>
    );
  }
}

export default Signup;