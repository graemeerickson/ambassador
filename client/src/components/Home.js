import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    if (this.props.user) { 
      return(
        <div>
          <br/>
          <p>Home screen for user who is already logged in</p>
        </div>
      );
    }
    return(
      <div>
        <br/>
        <h2>Sign up as:</h2>
        <Link to="/ambassador-registration"><button className="btn btn-primary role-button">Neighborhood Ambassador</button></Link>
        <Link to="/homebuyer-registration"><button className="btn btn-primary role-button">Prospective Home-buyer</button></Link>
      </div>
    );
  }
}

export default Home;