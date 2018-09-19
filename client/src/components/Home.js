import React from 'react';
import { Link } from 'react-router-dom';
import MapWidget from './MapWidget';

export default ({ user, updateUser }) => {
  if (user) {
    if (user.role[0] === 'Neighborhood Ambassador') {
      return(
        <div>
          <br/><h4>Find and connect with other ambassadors in your neighborhood:</h4><br/>
          <MapWidget user={user} updateUser={updateUser}  />
        </div>
      );
    }
    else if (user.role[0] === 'Prospective Homebuyer') {
      return(
        <div>
          <br/><h4>Find and connect with neighborhood ambassadors in your next community:</h4><br/>
          <MapWidget user={user} updateUser={updateUser}  />
        </div>
      );
    }
  }
  return(
    <div>
      <br/><br/>
      <div className="row">
        <div className="col-12">
          <div className="jumbotron jumbotron-fluid home-jumbotron">
            <div className="container">
              <h1 className="display-4">Ambassador</h1>
              <p className="lead">Connecting homebuyers with <br/>neighborhood communities.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Prospective Homebuyer</h5><br/>
              <table className="benefits-list">
                <tbody>
                  <tr>
                    <td className="benefits-list-item-icon"><i className="far fa-comments benefits-icon"></i></td>
                    <td className="benefits-list-item"><span className="card-text">&nbsp;&nbsp;&nbsp;Get connected.</span></td>
                  </tr>
                  <tr>
                    <td className="benefits-list-item-icon"><i className="fab fa-pagelines benefits-icon"></i></td>
                    <td className="benefits-list-item"><span className="card-text">&nbsp;&nbsp;&nbsp;Find peace of mind.</span></td>
                  </tr>
                  <tr>
                    <td className="benefits-list-item-icon"><i className="fas fa-map-marker benefits-icon"></i></td>
                    <td className="benefits-list-item"><span className="card-text">&nbsp;&nbsp;&nbsp;Learn from the locals.</span></td>
                  </tr>
                </tbody>
              </table>
              <Link to="/homebuyer-registration"><button className="btn btn-primary role-button float-right">Sign up</button></Link>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Neighborhood Ambassador</h5><br/>
              <table className="benefits-list">
                <tbody>
                  <tr>
                    <td className="benefits-list-item-icon"><i className="fas fa-home benefits-icon"></i></td>
                    <td className="benefits-list-item"><span className="card-text">&nbsp;&nbsp;&nbsp;Represent your neighborhood.</span></td>
                  </tr>
                  <tr>
                    <td className="benefits-list-item-icon"><i className="fas fa-users benefits-icon"></i></td>
                    <td className="benefits-list-item"><span className="card-text">&nbsp;&nbsp;&nbsp;Build community.</span></td>
                  </tr>
                  <tr>
                    <td className="benefits-list-item-icon"><i className="fas fa-dollar-sign benefits-icon"></i></td>
                    <td className="benefits-list-item"><span className="card-text">&nbsp;&nbsp;&nbsp;Earn rewards.</span></td>
                  </tr>
                </tbody>
              </table>
              <Link to="/ambassador-registration"><button className="btn btn-primary role-button float-right">Sign up</button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}