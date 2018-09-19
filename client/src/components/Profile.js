import React from 'react';
import { Link } from 'react-router-dom';

const Profile = ({ user }) => {
  if (user) {
    if (user.role[0] === 'Prospective Homebuyer') {
      return (
        <div>
          <br/>
          <h1>Hi, {user.firstName}</h1><br/>
          <h5>Role: {user.role[0]}</h5>
          <h5>Desired Location</h5>
          <p className="profile-paragraph">
            {user.targetAddress}
          </p>
          <h5>Contact Information</h5>
          <p className="profile-paragraph">
            Email: {user.email}<br/>
            Phone: {user.phoneNumber}
          </p>
        </div>
      );
    }
    else {
      return (
        <div>
          <br/>
          <h1>Hi, {user.firstName}</h1><br/>
          <h5>Role: {user.role[0]}</h5><br/>
          <h5>Home Address</h5>
          <p className="profile-paragraph">
            {user.homeAddressStreet}<br/>
            {user.homeAddressCity},&nbsp;
            {user.homeAddressState}&nbsp;
            {user.homeAddressZip}
          </p>
          <h5>Contact Information</h5>
          <p className="profile-paragraph">
            Email: {user.email}<br/>
            Phone: {user.phoneNumber}
          </p>
        </div>
      );
    }
  }
  else {
    return(
      <div>
        <br/><br/>
        <h5><Link to="/login">Log in</Link> or get started by signing up as a <Link to="/ambassador-registration">Neighborhood Ambassador</Link> or a <Link to="/homebuyer-registration">Prospective Homebuyer</Link>.</h5>
      </div>
    );
  }
};

export default Profile;