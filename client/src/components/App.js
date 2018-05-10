import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Footer from '../layout/Footer';
import Home from './Home';
import Login from '../auth/Login';
import Nav from '../layout/Nav';
import Profile from './Profile';
import Signup from '../auth/Signup';
import AmbassadorRegistration from './AmbassadorRegistration';
import HomebuyerRegistration from './HomebuyerRegistration';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: null
    }
  }

  componentDidMount = () => {
    console.log('component did mount');
    this.getUser();
  }

  getUser = () => {
    console.log('get user');
    let token = localStorage.getItem('loginToken');
    if (token) {
      // there is a token in localStorage; validate it
      axios.post('http://localhost:3001/auth/me/from/token', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(response => {
        console.log('success:', response);
        this.setState({
          user: response.data.user
        });
      })
      .catch(err => {
        console.log('error:', err);
        localStorage.removeItem('loginToken');
        this.setState({
          user: null
        })
      });
    }
    else {
      console.log('No token was found');
      localStorage.removeItem('loginToken');
      this.setState({
        user: null
      })
    }
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <div className="container">
            <Nav user={this.state.user} updateUser={this.getUser} />
              <Route exact path="/" component={ () => (<Home user={this.state.user} />) } />
              <Route path="/login" component={ () => (<Login user={this.state.user} updateUser={this.getUser} />) } />
              <Route path="/signup" component={ () => (<Signup user={this.state.user} updateUser={this.getUser} />) } />
              <Route path="/profile" component={ () => (<Profile user={this.state.user} />) } />
              <Route path="/ambassador-registration" component={ () => (<AmbassadorRegistration user={this.state.user} updateUser={this.getUser} />) } />
              <Route path="/homebuyer-registration" component={ () => (<HomebuyerRegistration user={this.state.user} updateUser={this.getUser} />) } />
            </div>
          </div>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
