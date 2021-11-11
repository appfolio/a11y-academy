import { Link } from "@reach/router";
import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from "reactstrap";

export default function MyNav() {
  return (
    <Navbar>
      <NavbarBrand tag={Link} to="/">
        TWL
      </NavbarBrand>
      <Nav>
        <NavItem>
          <NavLink tag={Link} to="/faqs">
            FAQs
          </NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
}
