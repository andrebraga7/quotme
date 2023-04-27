import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const mobileNavBar = (
  <Navbar expand="md">
    <Container>
      <Navbar.Brand href="#">Quotme</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link href="#">Login</Nav.Link>
          <Nav.Link href="#">Sign Up</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

const largeScreenNavBar = (
  <Navbar>
    <Container>
      <Navbar.Brand href="#">Quotme</Navbar.Brand>
      <Nav className="ms-auto">
        <Nav.Link href="#">Home</Nav.Link>
        <Nav.Link href="#">Discover</Nav.Link>
        <Nav.Link href="#">Author</Nav.Link>
        <Nav.Link href="#">Login</Nav.Link>
        <Nav.Link href="#">Sign Up</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
);

function NavBar() {
  return (
    <>
      <div className="d-md-none">{mobileNavBar}</div>
      <div className="d-none d-md-block">{largeScreenNavBar}</div>
    </>
  );
}

export default NavBar;
