import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { SERVER_URL } from '../constants';
const GOOGLEMAPS_API_KEY = process.env.REACT_APP_GOOGLEMAPS_API_KEY;

class HomebuyerRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phoneNumber: '',
      role: 'Prospective Homebuyer',
      targetAddress: ''
    };
  }

  handleChange = e => { this.setState({ [e.target.id]: e.target.value }); }

  handleSubmit = e => {
    e.preventDefault();
    // pass address to Google Maps API to retrieve long/lat coordinates before adding user to db
    let targetAddressTransformed = this.state.targetAddress.replace(' ','+');
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${targetAddressTransformed}&key=${GOOGLEMAPS_API_KEY}`)
      .then(res => {
        let userData = {};
        userData = this.state;
        userData.locationCoordinates = [res.data.results[0].geometry.location.lng, res.data.results[0].geometry.location.lat];
        axios.post(SERVER_URL + '/auth/signup', userData)
          .then(result => {
            // add newly-received token to localStorage
            localStorage.setItem('loginToken', result.data.token);
            // update user with a call to App.js
            this.props.updateUser();
          })
      })
      .catch(err => { console.log('Error:', err) })
  }

  render() {
    if (this.props.user) { return(<Redirect to="/" />); }

    return(
      <div>
        <br />
        <h3>Sign up to connect with ambassadors in your future neighborhood.</h3>
        <br />
        <form onSubmit={this.handleSubmit}>
          <div className="input-group mb-3 registration-input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="first-name">First name</span>
            </div>
            <input id="firstName" name="firstName" type="text" className="form-control" placeholder="Johnny" aria-label="First name" aria-describedby="first-name" value={this.state.firstName} onChange={this.handleChange} required />
          </div>
          <div className="input-group mb-3 registration-input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="last-name">Last name</span>
            </div>
            <input id="lastName" name="lastName" type="text" className="form-control" placeholder="Appleseed" aria-label="Last name" aria-describedby="last-name" value={this.state.lastName} onChange={this.handleChange} required />
          </div>
          <div className="input-group mb-3 registration-input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="email">Email</span>
            </div>
            <input id="email" name="email" type="email" className="form-control" placeholder="johnny@appleseed.com" aria-label="Email" aria-describedby="email" value={this.state.email} onChange={this.handleChange} required />
          </div>
          <div className="input-group mb-3 registration-input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="password">Password</span>
            </div>
            <input id="password" name="password" type="password" className="form-control" aria-label="Password" aria-describedby="password" value={this.state.password} onChange={this.handleChange} required />
          </div>
          <div className="input-group mb-3 registration-input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="phone">Phone number</span>
            </div>
            <input id="phoneNumber" name="phoneNumber" type="text" className="form-control" aria-label="Phone" aria-describedby="phone-number" value={this.state.phoneNumber} onChange={this.handleChange} />
          </div>
          <label htmlFor="targetAddress">Desired home address, or just city & state for now</label>
          <div className="input-group mb-3 registration-input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="phone">Address</span>
            </div>
            <input id="targetAddress" name="targetAddress" type="text" className="form-control" aria-label="Target address" aria-describedby="target-address" placeholder="400 Broad St, Seattle, WA 98109" value={this.state.targetAddress} onChange={this.handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}

export default HomebuyerRegistration;