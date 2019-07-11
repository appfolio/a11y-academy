import React from 'react';
import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';


export default function MyNav() {
  return (
    <Navbar>
      <NavbarBrand href="/">My App Home</NavbarBrand>
      <Nav>
        <NavItem><NavLink href="/">Login</NavLink></NavItem>
        <NavItem><NavLink href="/">TODO</NavLink></NavItem>
      </Nav>
    </Navbar>
  );
}
