import React from 'react';

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
        <h5><a href="/login">Log in</a> or get started by signing up as a <a href="/ambassador-registration">Neighborhood Ambassador</a> or a <a href="/homebuyer-registration">Prospective Homebuyer</a>.</h5>
      </div>
    );
  }
};

export default Profile;