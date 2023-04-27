import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "../styles/NavBar.module.css";

const mobileNavBar = (
  <>
    <Navbar expand="md">
      <Container className="m-2">
        <Navbar.Brand className={styles.NavBrand} href="#">
          Quotme
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#" className={styles.NavLink}>
              Login
            </Nav.Link>
            <Nav.Link href="#" className={styles.NavLink}>
              Sign Up
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Container>
      <Nav className="justify-content-between mx-3">
        <Nav.Link className={`d-flex flex-column ${styles.NavBarMobile}`}>
          <i className="fas fa-home"></i>
          <span>Home</span>
        </Nav.Link>
        <Nav.Link className={`d-flex flex-column ${styles.NavBarMobile}`}>
          <i className="fa-regular fa-compass"></i>
          <span>Discover</span>
        </Nav.Link>
        <Nav.Link className={`d-flex flex-column ${styles.NavBarMobile}`}>
          <i className="fa-solid fa-square-plus"></i>
          <span>Quote</span>
        </Nav.Link>
        <Nav.Link className={`d-flex flex-column ${styles.NavBarMobile}`}>
          <i className="fa-solid fa-pen-fancy"></i>
          <span>Authors</span>
        </Nav.Link>
        <Nav.Link className={`d-flex flex-column ${styles.NavBarMobile}`}>
          <i className="fa-regular fa-user"></i>
          <span>Profile</span>
        </Nav.Link>
      </Nav>
    </Container>
  </>
);

const largeScreenNavBar = (
  <Navbar>
    <Container>
      <Navbar.Brand className={styles.NavBrand}>Quotme</Navbar.Brand>
      <Nav className="ms-auto">
        <Nav.Link href="#" className={styles.NavLink}>
          Home
        </Nav.Link>
        <Nav.Link href="#" className={styles.NavLink}>
          Discover
        </Nav.Link>
        <Nav.Link href="#" className={styles.NavLink}>
          Author
        </Nav.Link>
        <Nav.Link href="#" className={styles.NavLink}>
          Login
        </Nav.Link>
        <Nav.Link href="#" className={styles.NavLink}>
          Sign Up
        </Nav.Link>
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
