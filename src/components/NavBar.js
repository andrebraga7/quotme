import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "../styles/NavBar.module.css";

const mobileNavBar = (
  <Navbar expand="md">
    <Container>
      <Navbar.Brand className={styles.NavBrand} href="#">
        Quotme
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link href="#" className={styles.NavLink}>Login</Nav.Link>
          <Nav.Link href="#" className={styles.NavLink}>Sign Up</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

const largeScreenNavBar = (
  <Navbar>
    <Container>
      <Navbar.Brand className={styles.NavBrand}>
        Quotme
      </Navbar.Brand>
      <Nav className="ms-auto">
        <Nav.Link href="#" className={styles.NavLink}>Home</Nav.Link>
        <Nav.Link href="#" className={styles.NavLink}>Discover</Nav.Link>
        <Nav.Link href="#" className={styles.NavLink}>Author</Nav.Link>
        <Nav.Link href="#" className={styles.NavLink}>Login</Nav.Link>
        <Nav.Link href="#" className={styles.NavLink}>Sign Up</Nav.Link>
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
