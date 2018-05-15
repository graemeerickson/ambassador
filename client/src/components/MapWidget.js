import React, {Component} from 'react';
import ReactMapboxGL, { Marker, Popup }  from 'react-mapbox-gl';
import HomebuyerTargetLocation from './HomebuyerTargetLocation';
import mapMarkerIcon from '../marker-icon.svg';
import axios from 'axios';
import { SERVER_URL } from '../constants';

const MAPBOX_API_KEY = process.env.REACT_APP_MAPBOXAPI_KEY;
const Map = ReactMapboxGL({ accessToken: MAPBOX_API_KEY });
let markers;
var popupDisplayStatus = 'none';

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

  togglePopup = (e) => {
    let currentMarkerPopup = e.target.parentNode.nextSibling;
    currentMarkerPopup.style.display === 'none' ? currentMarkerPopup.style.display = 'block' : currentMarkerPopup.style.display = 'none'
  }

  render() {
    axios.get(SERVER_URL + '/ambassadors')
      .then(res => {
        markers = res.data.map( (ambassador, index) => {
          return (
            <div>
              <Marker
                coordinates={[ambassador.locationCoordinates[0], ambassador.locationCoordinates[1]]}
                anchor="bottom"
                onClick={this.togglePopup}
                key={index}
                id={index} >
                <img alt="ambassador-popup-info" src={mapMarkerIcon} height="45px" width="25px" data-long={ambassador.locationCoordinates[0]} data-lat={ambassador.locationCoordinates[1]} data-firstname={ambassador.firstName} data-lastname={ambassador.lastName} data-email={ambassador.email} data-phonenumber={ambassador.phoneNumber} />
              </Marker>
              <Popup
                coordinates={[ambassador.locationCoordinates[0],ambassador.locationCoordinates[1]]}
                anchor="top-left"
                style={{display: this.state.isOpen ? 'block' : 'none'}} 
                >
                <span>Ambassador: {ambassador.firstName}&nbsp;{ambassador.lastName}</span><br/>
                <span>Phone: {ambassador.phoneNumber}</span><br/>
                <span>Email: {ambassador.email}</span><br/>
                <button className="btn btn-primary btn-sm text-center ambassador-contact-btn">Contact {ambassador.firstName}</button>
              </Popup> }
            </div>
          )
        })
      })

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
                {markers}
            </Map>
          </div>
        </div>
      </div>
    );
  }
}

export default MapWidget;