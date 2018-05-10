import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
  handleLogout = (e) => {
    console.log('logging out...');
    e.preventDefault();
    localStorage.removeItem('loginToken');
    this.props.updateUser();
  }

  render() {
    let links = '';
    if (this.props.user) {
      links = (
        <span className="nav-link">
          <Link to="/profile">Profile</Link>
          <Link to="/" onClick={this.handleLogout}>Logout</Link>
        </span>
      );
    }
    else {
      links = (
        <span className="nav-link">
          <Link to="/login">Login</Link>
        </span>
      );
    }
    
    return(
      <div>
        <nav className="navbar">
          <Link to="/"><img className="logo" src="ambassador-logo.png" /></Link>
          {links}
        </nav>
      </div>
    );
  }
}

export default Nav;