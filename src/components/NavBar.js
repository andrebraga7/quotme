import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "../styles/NavBar.module.css";

const currentUser = null;

const loggedOutLinks = (
  <>
    <Nav.Link href="#" className={styles.NavLink}>
      Login
    </Nav.Link>
    <Nav.Link href="#" className={styles.NavLink}>
      Sign Up
    </Nav.Link>
  </>
);

const loggedInLinks = (
  <>
    <Nav.Link href="#" className={`${styles.NavLink} d-none d-md-inline-block`}>
      Profile
    </Nav.Link>
    <Nav.Link href="#" className={styles.NavLink}>
      Logout
    </Nav.Link>
    <Nav.Link href="#" className={`${styles.AddQuoteButton} d-none d-md-inline-block`}>
    <i className="fa-solid fa-plus"></i> Quote
    </Nav.Link>
  </>
);

const addQuoteIcon = (
  <Nav.Link className={`d-flex flex-column ${styles.NavBarMobile}`}>
    <i className="fa-solid fa-square-plus"></i>
    <span>Quote</span>
  </Nav.Link>
);

const profileIcon = (
  <Nav.Link className={`d-flex flex-column ${styles.NavBarMobile}`}>
    <i className="fa-regular fa-user"></i>
    <span>Profile</span>
  </Nav.Link>
);

function NavBar() {
  return (
    <>
      <Navbar expand="md" className="justify-content-around">
        <Container className="m-2">
          <Navbar.Brand className={styles.NavBrand} href="#">
            Quotme
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link
                href="#"
                className={`${styles.NavLink} d-none d-md-inline-block`}
              >
                Home
              </Nav.Link>
              <Nav.Link
                href="#"
                className={`${styles.NavLink} d-none d-md-inline-block`}
              >
                Discover
              </Nav.Link>
              <Nav.Link
                href="#"
                className={`${styles.NavLink} d-none d-md-inline-block`}
              >
                Authors
              </Nav.Link>
              {currentUser ? loggedInLinks : loggedOutLinks}
            </Nav>
          </Navbar.Collapse>
        </Container>
        <Container className="d-block d-md-none">
          <Nav className="d-flex flex-row justify-content-around">
            <Nav.Link className={`d-flex flex-column ${styles.NavBarMobile}`}>
              <i className="fas fa-home"></i>
              <span>Home</span>
            </Nav.Link>
            <Nav.Link className={`d-flex flex-column ${styles.NavBarMobile}`}>
              <i className="fa-regular fa-compass"></i>
              <span>Discover</span>
            </Nav.Link>
            {currentUser && addQuoteIcon}
            <Nav.Link className={`d-flex flex-column ${styles.NavBarMobile}`}>
              <i className="fa-solid fa-pen-fancy"></i>
              <span>Authors</span>
            </Nav.Link>
            {currentUser && profileIcon}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
