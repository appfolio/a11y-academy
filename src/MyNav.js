import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';


export default function MyNav() {
  return (
    <Navbar>
      <NavbarBrand href="/">Today We Learned</NavbarBrand>
      <Nav>
        <NavItem><NavLink tag={Link} to="/">Login</NavLink></NavItem>
        <NavItem><NavLink tag={Link} to="/entries/new">New Entry</NavLink></NavItem>
      </Nav>
    </Navbar>
  );
}
