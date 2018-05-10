import React, { Component } from 'react';

class Profile extends Component {
  render() {
    if (this.props.user) {
      return (
        <div>
          <br/>
          <h5>Name: {this.props.user.firstName}&nbsp;{this.props.user.lastName}</h5>
          <h5>Role: {this.props.user.role[0]}</h5>
          <h5>Home Address</h5>
          <p className="profile-paragraph">
            {this.props.user.homeAddressStreet}<br/>
            {this.props.user.homeAddressCity},&nbsp;
            {this.props.user.homeAddressState}&nbsp;
            {this.props.user.homeAddressZip}
          </p>
          <h5>Contact Information</h5>
          <p className="profile-paragraph">
            Email: {this.props.user.email}<br/>
            Phone: {this.props.user.phoneNumber}
          </p>
        </div>
      );
    }

    return(
      <div>
        <p>This is a profile page. You must be logged in to see it.</p>
        <p>Would you like to <a href="/login">log in</a> or <a href="/signup">sign up</a>?</p>
      </div>
    );
  }
}

export default Profile;