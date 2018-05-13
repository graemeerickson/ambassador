import React, { Component } from 'react';
import axios from 'axios';
const GOOGLEMAPS_API_KEY = process.env.REACT_APP_GOOGLEMAPS_API_KEY;

class HomebuyerTargetLocation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      targetCity: '',
      targetState: '',
      locationCoordinates: null
    }
  }

  handleTargetCityChange = (e) => { this.setState({ targetCity: e.target.value }); }
  handleTargetStateChange = (e) => { this.setState({ targetState: e.target.value }); }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('form submitted:', this.state)
    let targetCityTransformed = this.state.targetCity.replace(' ','+');
    let targetStateTransformed = this.state.targetState.replace(' ','+');
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${targetCityTransformed},+${targetStateTransformed}&key=${GOOGLEMAPS_API_KEY}`)
      .then(res => {
        console.log('Successfully reached Google Maps API:', res);
        this.setState({ locationCoordinates: [res.data.results[0].geometry.location.lng, res.data.results[0].geometry.location.lat] }, () => {
          axios.put(`http://localhost:3001/user/${this.props.user.id}`, this.state)
            .then(res => {
              console.log('PUT request succeeded:', res)
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
        <div>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group form-inline">
              <input name="targetCity" type="text" className="form-control" placeholder="Desired city" value={this.state.targetCity} onChange={this.handleTargetCityChange} />&nbsp;&nbsp;
              <input name="targetState" type="text" className="form-control" placeholder="Desired state" value={this.state.targetState} onChange={this.handleTargetStateChange} />&nbsp;&nbsp;
              <input type="submit" className="btn btn-primary" value="Update map" />
            </div>
          </form>
        </div>
      )
    }
    else { return(<div></div>) }
  }
}

export default HomebuyerTargetLocation;