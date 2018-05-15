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
      targetAddress: '',
      locationCoordinates: null
    };
  }

  handleFirstNameChange = (e) => { this.setState({ firstName: e.target.value }); }
  handleLastNameChange = (e) => { this.setState({ lastName: e.target.value }); }
  handleEmailChange = (e) => { this.setState({ email: e.target.value }); }
  handlePasswordChange = (e) => { this.setState({ password: e.target.value }); }
  handlePhoneNumberChange = (e) => { this.setState({ phoneNumber: e.target.value }); }
  handleTargetAddressChange = (e) => { this.setState({ targetAddress: e.target.value }); }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
    // pass address to Google Maps API to retrieve long/lat coordinates before adding user to db
    let targetAddressTransformed = this.state.targetAddress.replace(' ','+');
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${targetAddressTransformed}&key=${GOOGLEMAPS_API_KEY}`)
      .then(res => {
        console.log('Successfully reached Google Maps API');
        this.setState({ locationCoordinates: [res.data.results[0].geometry.location.lng, res.data.results[0].geometry.location.lat] }, () => {
          axios.post(SERVER_URL + '/auth/signup', this.state)
          .then(result => {
            console.log('Successfully added user to db');
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
        <h3>Sign up to connect with ambassadors in your future neighborhood.</h3>
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
            <input name="phoneNumber" type="text" className="form-control" aria-label="Phone" aria-describedby="phone-number" value={this.state.phoneNumber} onChange={this.handlePhoneNumberChange} />
          </div>
          <label htmlFor="targetAddress">Desired home address, or just city & state for now</label>
          <div className="input-group mb-3 registration-input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="phone">Address</span>
            </div>
            <input name="targetAddress" type="text" className="form-control" aria-label="Target address" aria-describedby="target-address" placeholder="400 Broad St, Seattle, WA 98109" value={this.state.targetAddress} onChange={this.handleTargetAddressChange} required />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}

export default HomebuyerRegistration;