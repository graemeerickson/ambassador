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

  handleFirstNameChange = (e) => { this.setState({ firstName: e.target.value }); }
  handleLastNameChange = (e) => { this.setState({ lastName: e.target.value }); }
  handleEmailChange = (e) => { this.setState({ email: e.target.value }); }
  handlePasswordChange = (e) => { this.setState({ password: e.target.value }); }
  handlePhoneNumberChange = (e) => { this.setState({ phoneNumber: e.target.value }); }
  handleHomeAddressStreetChange = (e) => { this.setState({ homeAddressStreet: e.target.value }); }
  handleHomeAddressCityChange = (e) => { this.setState({ homeAddressCity: e.target.value }); }
  handleHomeAddressStateChange = (e) => { this.setState({ homeAddressState: e.target.value }); }
  handleHomeAddressZipChange = (e) => { this.setState({ homeAddressZip: e.target.value }); }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', this.state);
    // pass address to Google Maps API to retrieve long/lat coordinates before adding user to db
    let homeAddressStreetTransformed = this.state.homeAddressStreet.replace(' ','+');
    let homeAddressCityTransformed = this.state.homeAddressCity.replace(' ','+');
    let homeAddressStateTransformed = this.state.homeAddressState.replace(' ','+');
    let homeAddressZipTransformed = this.state.homeAddressZip.replace(' ','+');
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${homeAddressStreetTransformed}+${homeAddressCityTransformed},+${homeAddressStateTransformed}+${homeAddressZipTransformed}&key=${GOOGLEMAPS_API_KEY}`)
      .then(res => {
        console.log('Successfully reached Google Maps API:', res);
        this.setState({ locationCoordinates: [res.data.results[0].geometry.location.lng, res.data.results[0].geometry.location.lat] }, () => {
          axios.post(SERVER_URL + '/auth/signup', this.state)
          .then(result => {
            console.log('Successfully added user to db:', result);
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
            <input name="firstName" type="text" className="form-control" placeholder="Johnny" aria-label="First name" aria-describedby="first-name" value={this.state.firstName} onChange={this.handleFirstNameChange} required />
          </div>
          <div className="input-group mb-3 registration-input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="last-name">Last name</span>
            </div>
            <input name="lastName" type="text" className="form-control" placeholder="Appleseed" aria-label="Last name" aria-describedby="last-name" value={this.state.lastName} onChange={this.handleLastNameChange} required />
          </div>
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
          <div className="input-group mb-3 registration-input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="phone">Phone number</span>
            </div>
            <input name="phoneNumber" type="text" className="form-control" placeholder="206-555-5555" aria-label="Phone" aria-describedby="phone-number" value={this.state.phoneNumber} onChange={this.handlePhoneNumberChange} />
          </div>
          <br/><label htmlFor="homeAddress">Home address:</label>
          <div className="input-group mb-3 registration-input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="homeAddressStreet">Street</span>
            </div>
            <input name="homeAddressStreet" type="text" className="form-control" placeholder="400 Broad St" aria-label="Home address (street)" aria-describedby="home-address-street" value={this.state.homeAddressStreet} onChange={this.handleHomeAddressStreetChange} required />
          </div>
          <div className="input-group mb-3 registration-input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="homeAddressCity">City</span>
            </div>
            <input name="homeAddressCity" type="text" className="form-control" placeholder="Seattle" aria-label="Home address (city)" aria-describedby="home-address-city" value={this.state.homeAddressCity} onChange={this.handleHomeAddressCityChange} required />
          </div>
          <div className="input-group mb-3 registration-input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="homeAddressState">State</span>
            </div>
            <input name="homeAddressState" type="text" className="form-control" placeholder="WA" aria-label="Home address (state)" aria-describedby="home-address-state" value={this.state.homeAddressState} onChange={this.handleHomeAddressStateChange} required />
          </div>
          <div className="input-group mb-3 registration-input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="homeAddressZip">Zip</span>
            </div>
            <input name="homeAddressZip" type="text" className="form-control" placeholder="98109" aria-label="Home address (zip)" aria-describedby="home-address-zip" value={this.state.homeAddressZip} onChange={this.handleHomeAddressZipChange} required />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}

export default AmbassadorRegistration;