import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
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
          <ul className="nav-list">
            <li className="nav-item"><NavLink exact to="/" activeClassName="active">Dashboard</NavLink></li>
            <li className="nav-item"><NavLink to="/profile" activeClassName="active">Profile</NavLink></li>
            <li className="nav-item"><NavLink exact to="/" activeClassName="" onClick={this.handleLogout}>Logout</NavLink></li>
          </ul>
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