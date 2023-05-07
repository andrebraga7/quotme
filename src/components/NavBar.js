import { React } from "react";
import styles from "../styles/NavBar.module.css";
import { NavLink, useLocation } from "react-router-dom";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import { removeTokenTimestamp } from "../utils/utils";

// React Bootstrap imports
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavBar() {
  // useState definitions
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  // variables
  const { expanded, setExpanded, ref } = useClickOutsideToggle();
  const location = useLocation();

  // Event handlers
  const handleLogout = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (error) {
      // console.log(error);
    }
  };

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
        to={location.pathname}
        onClick={handleLogout}
        className={styles.NavLink}
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
        to={`/profiles/${currentUser?.profile_id}`}
        className={`${styles.NavLink} d-none d-md-inline-block`}
      >
        <Avatar
          src={currentUser?.profile_image}
          text={currentUser?.username}
          height={40}
        />
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
      to={`/profiles/${currentUser?.profile_id}`}
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
