import React, {Component} from 'react';
import ReactMapboxGL from 'react-mapbox-gl';
import HomebuyerTargetLocation from './HomebuyerTargetLocation';
import AmbassadorMarker from './AmbassadorMarker';
import axios from 'axios';
// import mapMarkerIcon from '../marker-icon.svg';
import { SERVER_URL } from '../constants';

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
      isOpen: false
    }
  }

  componentDidMount() {
    this.getTargetLocation();
  }

  getTargetLocation = () => {
    axios.get(SERVER_URL + `/user/${this.props.user.id}`)
      .then(res => {
        if (res.data.role[0] === 'Prospective Homebuyer') {
          this.setState({
            centerLong: res.data.locationCoordinates[0],
            centerLat: res.data.locationCoordinates[1],
            targetAddress: res.data.targetAddress
          })
        }
        else {
          this.setState({
            centerLong: res.data.locationCoordinates[0],
            centerLat: res.data.locationCoordinates[1]
          })
        }
      })
  }

  getAmbassadorMarkers = () => {
    axios.get(SERVER_URL + '/ambassadors')
      .then(res => {
        markers = res.data.map( (ambassador, index) => {
          return (
            <AmbassadorMarker user={ambassador} index={index} isOpen={this.state.isOpen} togglePopup={this.togglePopup} />
          )
        })
      })
    return markers;
  }

  togglePopup = (e) => {
    let currentMarkerPopup = e.target.parentNode.nextSibling;
    currentMarkerPopup.style.display === 'none' ? currentMarkerPopup.style.display = 'block' : currentMarkerPopup.style.display = 'none';
  }

  render() {
    return (
      <div>
        <HomebuyerTargetLocation user={this.props.user} updateTargetLocation={this.getTargetLocation} />
        <div className="row">
          <div className="col-12">
            <Map
              style={"mapbox://styles/mapbox/streets-v9"}
              containerStyle={{
                height: "550px",
                width: "100%"
              }}
              center={[this.state.centerLong, this.state.centerLat]}
              zoom={[14]} >
              {this.getAmbassadorMarkers()}
            </Map>
          </div>
        </div>
      </div>
    );
  }
}

export default MapWidget;