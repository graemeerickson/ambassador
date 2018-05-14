import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
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
  handleTargetAddressChange = (e) => { this.setState({ targetCity: e.target.value }); }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', this.state);
    // pass address to Google Maps API to retrieve long/lat coordinates before adding user to db
    let targetAddressTransformed = this.state.targetAddress.replace(' ','+');
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${targetAddressTransformed}&key=${GOOGLEMAPS_API_KEY}`)
      .then(res => {
        console.log('Successfully reached Google Maps API:', res);
        this.setState({ locationCoordinates: [res.data.results[0].geometry.location.lng, res.data.results[0].geometry.location.lat] }, () => {
          axios.post('http://localhost:3001/auth/signup', this.state)
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
    if (this.props.user) { return(<Redirect to="/profile" />); }

    return(
      <div>
        <br />
        <h3>Sign up to connect with ambassadors in your future neighborhood.</h3>
        <br />
        <form onSubmit={this.handleSubmit}>
          <div className="form-group form-inline">
            <label htmlFor="firstName">First name</label>
            <input name="firstName" type="text" className="form-control" placeholder="Johnny" value={this.state.firstName} onChange={this.handleFirstNameChange} />
          </div>
          <div className="form-group form-inline">
            <label htmlFor="lastName">Last name</label>
            <input name="lastName" type="text" className="form-control" placeholder="Appleseed" value={this.state.lastName} onChange={this.handleLastNameChange} />
          </div>
          <div className="form-group form-inline">
            <label htmlFor="email">Email address</label>
            <input name="email" type="email" className="form-control" placeholder="johnny@appleseed.com" value={this.state.email} onChange={this.handleEmailChange} />
          </div>
          <div className="form-group form-inline">
            <label htmlFor="password">Password</label>
            <input name="password" type="password" className="form-control" value={this.state.password} onChange={this.handlePasswordChange} />
          </div>
          <div className="form-group form-inline">
            <label htmlFor="phoneNumber">Phone number</label>
            <input name="phoneNumber" type="text" className="form-control" placeholder="555-555-5555" value={this.state.phoneNumber} onChange={this.handlePhoneNumberChange} />
          </div>
          <div className="form-group">
            <label htmlFor="targetAddress">Desired home address, or just city & state for now</label>
            <input name="targetAddress" type="text" className="form-control" placeholder="400 Broad St, Seattle, WA 98109" value={this.state.targetAddress} onChange={this.handleTargetAddressChange} />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}

export default HomebuyerRegistration;