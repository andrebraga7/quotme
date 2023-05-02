import { React } from "react";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";

// React Bootstrap imports
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavBar() {
  const currentUser = useCurrentUser();

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const loggedOutLinks = (
    <>
      <NavLink
        to="/login"
        className={({ isActive }) =>
          isActive ? styles.Active : styles.NavLink
        }
      >
        Login
      </NavLink>
      <NavLink
        to="/signup"
        className={({ isActive }) =>
          isActive ? styles.Active : styles.NavLink
        }
      >
        Sign Up
      </NavLink>
    </>
  );

  const loggedInLinks = (
    <>
      <NavLink
        to="/logout"
        className={({ isActive }) =>
          isActive ? styles.Active : styles.NavLink
        }
      >
        Logout
      </NavLink>
      <NavLink
        to="/quotes/create"
        className={`${styles.AddQuoteButton} d-none d-md-inline-block`}
      >
        <i className="fa-solid fa-plus"></i> Quote
      </NavLink>
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          isActive
            ? `${styles.Active} d-none d-md-inline-block`
            : `${styles.NavLink} d-none d-md-inline-block`
        }
      >
        <Avatar src={currentUser?.profile_image} text={"Profile"} height={40} />
      </NavLink>
    </>
  );

  const addQuoteIcon = (
    <NavLink
      className={`d-flex flex-column ${styles.NavBarMobile}`}
      to="/quotes/create"
    >
      <i className="fa-solid fa-square-plus"></i>
      <span>Quote</span>
    </NavLink>
  );

  const profileIcon = (
    <NavLink
      className={`d-flex flex-column ${styles.NavBarMobile}`}
      to="/profile"
    >
      <i className="fa-regular fa-user"></i>
      <span>Profile</span>
    </NavLink>
  );

  return (
    <>
      <Navbar
        expanded={expanded}
        expand="md"
        className={`${styles.NavBar} justify-content-around`}
        fixed="top"
      >
        <Container className="m-2">
          <Navbar.Brand>
            <NavLink className={styles.NavBrand} to="/">
              Quotme
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle
            ref={ref}
            onClick={() => setExpanded(!expanded)}
            aria-controls="basic-navbar-nav"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? `${styles.Active} d-none d-md-inline-block`
                    : `${styles.NavLink} d-none d-md-inline-block`
                }
                to="/"
              >
                Home
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? `${styles.Active} d-none d-md-inline-block`
                    : `${styles.NavLink} d-none d-md-inline-block`
                }
                to="/discover"
              >
                Discover
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? `${styles.Active} d-none d-md-inline-block`
                    : `${styles.NavLink} d-none d-md-inline-block`
                }
                to="/authors"
              >
                Authors
              </NavLink>
              {currentUser ? loggedInLinks : loggedOutLinks}
            </Nav>
          </Navbar.Collapse>
        </Container>
        <Container className="d-block d-md-none">
          <Nav className="d-flex flex-row justify-content-around">
            <NavLink
              className={`d-flex flex-column ${styles.NavBarMobile}`}
              to="/"
            >
              <i className="fas fa-home"></i>
              <span>Home</span>
            </NavLink>
            <NavLink
              className={`d-flex flex-column ${styles.NavBarMobile}`}
              to="/discover"
            >
              <i className="fa-regular fa-compass"></i>
              <span>Discover</span>
            </NavLink>
            {currentUser && addQuoteIcon}
            <NavLink
              className={`d-flex flex-column ${styles.NavBarMobile}`}
              to="/authors"
            >
              <i className="fa-solid fa-pen-fancy"></i>
              <span>Authors</span>
            </NavLink>
            {currentUser && profileIcon}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
