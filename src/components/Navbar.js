import React, { Component } from 'react';
import Identicon from 'identicon.js';
import {Link} from 'react-router-dom'

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <Link to="/">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href=""
          target="_self"
          rel="noopener noreferrer"
        >
          Contraqtual
        </a>
        </Link>
        <ul className="navbar-nav px-3">
          <li> <Link to="/">
            <small className='navlink'>
            Open bets
            </small>
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav px-3">
          <li> <Link to="/Paid_out">
            <small className='navlink'>
            Paid out
            </small>
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav px-3">
          <li> <Link to="/about">
            <small className='navlink'>
            About
            </small>
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav px-3">
          <li> 
            <small className='navlink'>
            <href id="whitelink"> <a id = "whitelink" href="https://jeangalt1957.github.io/DUsocial/"> 
            Message Board </a></href> 
            </small>
          </li>
        </ul>
        <ul className="navbar-nav px-3">
          <li> <Link to="/verified">
            <small className='navlink'>
            Verified contract
            </small>
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav px-3">
          <li> <Link to="/opensource">
            <small className='navlink'>
            GitHub
            </small>
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-secondary">
            <small id="account">{this.props.account}</small>
            </small>
            { this.props.account
              ? <img
                className='ml-2'
                width='30'
                height='30'
                src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
              />
              : <span></span>
            }
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
