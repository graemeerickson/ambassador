import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { SERVER_URL } from '../constants';
const GOOGLEMAPS_API_KEY = process.env.REACT_APP_GOOGLEMAPS_API_KEY;

class AmbassadorRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phoneNumber: '',
      homeAddressStreet: '',
      homeAddressCity: '',
      homeAddressState: '',
      homeAddressZip: '',
      locationCoordinates: null,
      role: 'Neighborhood Ambassador',
    };
  }

  handleChange = e => { this.setState({ [e.target.id]: e.target.value }); }

  handleSubmit = e => {
    e.preventDefault();
    // pass address to Google Maps API to retrieve long/lat coordinates before adding user to db
    let homeAddressStreetTransformed = this.state.homeAddressStreet.replace(' ','+');
    let homeAddressCityTransformed = this.state.homeAddressCity.replace(' ','+');
    let homeAddressStateTransformed = this.state.homeAddressState.replace(' ','+');
    let homeAddressZipTransformed = this.state.homeAddressZip.replace(' ','+');
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${homeAddressStreetTransformed}+${homeAddressCityTransformed},+${homeAddressStateTransformed}+${homeAddressZipTransformed}&key=${GOOGLEMAPS_API_KEY}`)
      .then(res => {
        this.setState({ locationCoordinates: [res.data.results[0].geometry.location.lng, res.data.results[0].geometry.location.lat] }, () => {
          axios.post(SERVER_URL + '/auth/signup', this.state)
          .then(result => {
            // add newly-received token to localStorage
            localStorage.setItem('loginToken', result.data.token);
            // update user with a call to App.js
            this.props.updateUser();
          })
        });
      })
      .catch(err => { console.log('Error:', err) })
  }

  render() {
    if (this.props.user) { return(<Redirect to="/" />); }

    return(
      <div>
        <br />
        <h3>Represent your neighborhood. Welcome your future neighbors.</h3>
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
            <input id="phoneNumber" name="phoneNumber" type="text" className="form-control" placeholder="206-555-5555" aria-label="Phone" aria-describedby="phone-number" value={this.state.phoneNumber} onChange={this.handleChange} />
          </div>
          <br/><label htmlFor="homeAddress">Home address:</label>
          <div className="input-group mb-3 registration-input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="homeAddressStreet">Street</span>
            </div>
            <input id="homeAddressStreet" name="homeAddressStreet" type="text" className="form-control" placeholder="400 Broad St" aria-label="Home address (street)" aria-describedby="home-address-street" value={this.state.homeAddressStreet} onChange={this.handleChange} required />
          </div>
          <div className="input-group mb-3 registration-input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="homeAddressCity">City</span>
            </div>
            <input id="homeAddressCity" name="homeAddressCity" type="text" className="form-control" placeholder="Seattle" aria-label="Home address (city)" aria-describedby="home-address-city" value={this.state.homeAddressCity} onChange={this.handleChange} required />
          </div>
          <div className="input-group mb-3 registration-input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="homeAddressState">State</span>
            </div>
            <input id="homeAddressState" name="homeAddressState" type="text" className="form-control" placeholder="WA" aria-label="Home address (state)" aria-describedby="home-address-state" value={this.state.homeAddressState} onChange={this.handleChange} required />
          </div>
          <div className="input-group mb-3 registration-input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="homeAddressZip">Zip</span>
            </div>
            <input id="homeAddressZip" name="homeAddressZip" type="text" className="form-control" placeholder="98109" aria-label="Home address (zip)" aria-describedby="home-address-zip" value={this.state.homeAddressZip} onChange={this.handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}

export default AmbassadorRegistration;