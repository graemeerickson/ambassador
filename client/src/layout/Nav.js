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
        <span>
          <Link to="/profile">Profile</Link>
          <a onClick={this.handleLogout}>Logout</a>
        </span>
      );
    }
    else {
      links = (
        <span>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign up</Link>
        </span>
      );
    }
    
    return(
      <div>
        <nav className="nav">
          <a to="/"><img className="logo" src="ambassador-logo.png" /></a>
          <Link to="/">Home</Link>
          {links}
        </nav>
      </div>
    );
  }
}

export default Nav;