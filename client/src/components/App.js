import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AmbassadorRegistration from './AmbassadorRegistration';
import axios from 'axios';
import Home from './Home';
import HomebuyerRegistration from './HomebuyerRegistration';
import Login from '../auth/Login';
import Nav from '../layout/Nav';
import Profile from './Profile';
import './App.css';
import 'mapbox-gl/dist/mapbox-gl.css'
import { SERVER_URL } from '../constants';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: null
    }
  }

  componentDidMount = () => {
    this.getUser();
  }

  getUser = () => {
    // get user
    let token = localStorage.getItem('loginToken');
    if (token) {
      // there is a token in localStorage; validate it
      axios.post(SERVER_URL + '/auth/me/from/token', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(response => {
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
              <Route path="/profile" component={ () => (<Profile user={this.state.user} />) } />
              <Route path="/ambassador-registration" component={ () => (<AmbassadorRegistration user={this.state.user} updateUser={this.getUser} />) } />
              <Route path="/homebuyer-registration" component={ () => (<HomebuyerRegistration user={this.state.user} updateUser={this.getUser} />) } />
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
