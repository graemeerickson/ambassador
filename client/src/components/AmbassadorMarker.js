import React from 'react';
import { Marker, Popup } from 'react-mapbox-gl';
import mapMarkerIcon from '../marker-icon.svg';

const AmbassadorMarker = ({user, index, isOpen, togglePopup}) => {
  return (
    <div>
      <Marker
        coordinates={[user.locationCoordinates[0], user.locationCoordinates[1]]}
        anchor="bottom"
        onClick={togglePopup}
        key={index} >
        <img alt="ambassador-popup-info" src={mapMarkerIcon} height="45px" width="25px" data-long={user.locationCoordinates[0]} data-lat={user.locationCoordinates[1]} data-firstname={user.firstName} data-lastname={user.lastName} data-email={user.email} data-phonenumber={user.phoneNumber} />
      </Marker>
      <Popup
        coordinates={[user.locationCoordinates[0],user.locationCoordinates[1]]}
        anchor="top-left"
        style={{display: isOpen ? 'block' : 'none'}} >
        <span>user: {user.firstName}&nbsp;{user.lastName}</span><br/>
        <span>Phone: {user.phoneNumber}</span><br/>
        <span>Email: {user.email}</span><br/>
        <button className="btn btn-primary btn-sm text-center ambassador-contact-btn">Contact {user.firstName}</button>
      </Popup> }
    </div>
  )
};

export default AmbassadorMarker;