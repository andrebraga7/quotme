import React from "react";
import styles from "../styles/MoreDropdown.module.css";
import Dropdown from "react-bootstrap/Dropdown";

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
export const CustomMenu = ({ handleEdit, handleDelete }) => {
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
