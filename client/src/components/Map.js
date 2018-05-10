import React, {Component} from 'react';
// import MapGL, {NavigationControl, Marker, Popup} from 'react-map-gl';
import ReactMapGL, {NavigationControl, Marker} from 'react-map-gl';
import Pin from './Pin';
const API_KEY = process.env.REACT_APP_MAPBOXAPI_KEY;
const MapboxAccessToken = process.env.REACT_APP_MAPBOXAPI_KEY;

const navStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 47.6062,
        longitude: -122.3321,
        zoom: 14,
        bearing: 0,
        pitch: 0,
        width: 500,
        height: 500
      },
    };
  }

  render() {
    const {viewport} = this.state;
    return (
      <div>
        <p>Neighborhood Ambassador Zip Code: {this.props.user.homeAddressZip}</p>
        <ReactMapGL
          mapboxApiAccessToken={MapboxAccessToken}
          {...this.state.viewport}
          mapStyle="mapbox://styles/mapbox/streets-v10"
          onViewportChange={(viewport) => this.setState({viewport})}>
          <Marker latitude={47.6062} longitude={-122.3321} offsetLeft={0} offsetTop={0} icon={Pin}>
            <div>You are here</div>
          </Marker>
        </ReactMapGL>
      </div>
    );
  }
}

export default Map;