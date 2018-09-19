import React, {Component} from 'react';
import ReactMapboxGL from 'react-mapbox-gl';
import HomebuyerTargetLocation from './HomebuyerTargetLocation';
import AmbassadorMarker from './AmbassadorMarker';
import axios from 'axios';
import { SERVER_URL } from '../constants';

const GOOGLEMAPS_API_KEY = process.env.REACT_APP_GOOGLEMAPS_API_KEY;
const MAPBOX_API_KEY = process.env.REACT_APP_MAPBOXAPI_KEY;
const Map = ReactMapboxGL({ accessToken: MAPBOX_API_KEY });
let markers;

class MapWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      targetAddress: props.user.targetAddress,
      centerLong: props.user.locationCoordinates[0],
      centerLat: props.user.locationCoordinates[1],
      isOpen: false,
      markers: []
    }
  }

  updateTargetLocation = targetAddress => {
    let targetAddressTransformed = targetAddress.replace(' ','+');
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${targetAddressTransformed}&key=${GOOGLEMAPS_API_KEY}`)
      .then(res => {
        this.setState({ 
          targetAddress: targetAddress,
          centerLong: res.data.results[0].geometry.location.lng,
          centerLat: res.data.results[0].geometry.location.lat
        }, () => {
          axios.put(SERVER_URL + `/user/${this.props.user.id}`, { targetAddress: this.state.targetAddress, locationCoordinates: [this.state.centerLong, this.state.centerLat] })
            .then(res => {
              localStorage.setItem('loginToken', res.data.token);
              this.props.updateUser();
            })
            .catch(err => {
              console.log('PUT request failed:', err);
            })
          })
      })
  }

  getAmbassadorMarkers = () => {
    axios.get(SERVER_URL + '/ambassadors')
      .then(res => {
        markers = res.data.map( (ambassador, index) => {
          return (
            <AmbassadorMarker user={ambassador} key={index} isOpen={this.state.isOpen} togglePopup={this.togglePopup} />
          )
        })
        this.setState({
          markers: markers
        })
      })
  };

  componentDidMount() {
    this.getAmbassadorMarkers();  
  }

  togglePopup = e => {
    let currentMarkerPopup = e.target.parentNode.nextSibling;
    currentMarkerPopup.style.display === 'none' ? currentMarkerPopup.style.display = 'block' : currentMarkerPopup.style.display = 'none';
  }

  render() {
    return (
      <div>
        <HomebuyerTargetLocation user={this.props.user} updateTargetLocation={this.updateTargetLocation} />
        <div className="row">
          <div className="col-12">
            <Map
              style={`mapbox://styles/mapbox/streets-v9`}
              containerStyle={{
                height: "550px",
                width: "100%"
              }}
              center={[this.state.centerLong, this.state.centerLat]}
              zoom={[14]} >
              {this.state.markers}
            </Map>
          </div>
        </div>
      </div>
    );
  }
}

export default MapWidget;