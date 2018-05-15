import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

class Nav extends Component {
  constructor(props) {
      super(props);
      this.state = {active: false};
  }

  click() {
    this.setState({active: true});
  }

  handleLogout = (e) => {
    console.log('logging out...');
    e.preventDefault();
    localStorage.removeItem('loginToken');
    this.props.updateUser();
  }

  render() {
    let links = '';
    let classes = classnames('specialbutton', {active: this.state.active});
    if (this.props.user) {
      links = (
        <span className="nav-link">
          <Link to="/">Dashboard</Link>
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
          <Link to="/"><img className="logo" src="ambassador-logo.png" alt="Ambassador logo" /></Link>
          {links}
        </nav>
      </div>
    );
  }
}

export default Nav;