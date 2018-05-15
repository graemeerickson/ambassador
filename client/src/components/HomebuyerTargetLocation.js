import React, { Component } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../constants';
const GOOGLEMAPS_API_KEY = process.env.REACT_APP_GOOGLEMAPS_API_KEY;

class HomebuyerTargetLocation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      targetAddress: '',
      locationCoordinates: null
    }
  }

  handleTargetAddressChange = (e) => { this.setState({ targetAddress: e.target.value }); }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted')
    let targetAddressTransformed = this.state.targetAddress.replace(' ','+');
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${targetAddressTransformed}&key=${GOOGLEMAPS_API_KEY}`)
      .then(res => {
        console.log('Successfully reached Google Maps API');
        this.setState({ locationCoordinates: [res.data.results[0].geometry.location.lng, res.data.results[0].geometry.location.lat] }, () => {
          axios.put(SERVER_URL + `/user/${this.props.user.id}`, this.state)
            .then(res => {
              console.log('PUT request succeeded')
              this.props.updateTargetLocation();
            })
            .catch(err => {
              console.log('PUT request failed:', err);
            })
          })
      })
  }

  render() {
    if (this.props.user.role[0] === 'Prospective Homebuyer') {
      return(
        <div className="row">
          <div className="col-12">
          <form onSubmit={this.handleSubmit}>
            <div className="input-group mb-3">
              <input name="targetAddress" type="text" className="form-control" placeholder="Enter desired address, or just a city & state for now" value={this.state.targetAddress} onChange={this.handleTargetAddressChange} aria-label="Target address" aria-describedby="target-address" />
              <div className="input-group-append">
                <button type="submit" className="btn btn-primary">Update map</button>
              </div>
            </div>
          </form>
          </div>
        </div>
      )
    }
    else { return(<div></div>) }
  }
}

export default HomebuyerTargetLocation;