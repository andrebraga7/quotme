import React from "react";
import styles from "../styles/MoreDropdown.module.css";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const ThreeDots = React.forwardRef(({ onClick }, ref) => (
  <i
    className="fa-solid fa-ellipsis"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
export const MoreDropdown = ({ handleEdit, handleDelete }) => {
  return (
    <Dropdown drop="start">
      <Dropdown.Toggle as={ThreeDots} />

      <Dropdown.Menu className="text-center">
        <Dropdown.Item
          className={styles.Item}
          onClick={handleEdit}
          aria-label="edit"
        >
          <i className="fa-solid fa-pen-to-square"></i>
        </Dropdown.Item>
        <Dropdown.Item
          className={styles.Item}
          onClick={handleDelete}
          aria-label="delete"
        >
          <i className="fa-solid fa-trash-can"></i>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export const ProfileDropdown = ({ id }) => {
  const navigate = useNavigate();
  return (
    <Dropdown drop="start">
      <Dropdown.Toggle as={ThreeDots} />

      <Dropdown.Menu className="px-3">
        <Dropdown.Item onClick={() => navigate(`/profiles/${id}/edit`)} aria-label="edit-profile">
          <i className="fa-solid fa-pen-to-square" /> edit profile
        </Dropdown.Item>
        <Dropdown.Item onClick={() => navigate(`/profiles/${id}/edit/username`)} aria-label="edit-username">
          <i className="fa-solid fa-user-pen" /> change username
        </Dropdown.Item>
        <Dropdown.Item onClick={() => navigate(`/profiles/${id}/edit/password`)} aria-label="edit-password">
          <i className="fa-solid fa-key" /> change password
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
