
import React, { Component } from 'react';
import Identicon from 'identicon.js';
import {Link} from 'react-router-dom'

import { Navbar, NavItem, NavDropdown, MenuItem, Nav, Form, FormControl, Button } from 'react-bootstrap';

class Menu extends Component {

  render() {
    return (
		<Navbar bg='dark' variant="dark" expand='lg' fixed="top">
		<Navbar.Brand href="https://jeangalt1957.github.io/contraqtualmarkets/">Contraqtual</Navbar.Brand>
		<Navbar.Toggle aria-controls="responsive-navbar-nav" />
		<Navbar.Collapse id="basic-navbar-nav">
		<Nav className='mx-auto'>
    <Nav.Link id="homeNav" className="small px-5" href="https://jeangalt1957.github.io/contraqtualmarkets/">Home</Nav.Link>
      <Nav.Link id="aboutNav" className="small px-5" href="/about">About</Nav.Link>
			<Nav.Link id="chatNav" className="small px-5" href="https://jeangalt1957.github.io/DUsocial/" target="_blank">Chat!</Nav.Link>
			<Nav.Link id="verifiedNav" className="small px-5" href="/verified">Verified Contract</Nav.Link>
			<Nav.Link id="contributeNav" className="small px-5" href="/opensource">Contribute!</Nav.Link>
		</Nav>
		<Nav className="ml-auto">
			<span className="text-secondary small">{this.props.account}{ this.props.account
			  ? <img
				className='ml-2'
				width='30'
				height='30'
				src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
			  />
			  : <span></span>
			}</span>
			

		</Nav>
		</Navbar.Collapse>
		</Navbar>
    );
  }
}

export default Menu;