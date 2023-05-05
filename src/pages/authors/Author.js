import React from "react";
import styles from "../../styles/Author.module.css";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function Author(props) {
  const { id, name, quotes_count } = props;

  return (
    <Link to={`/authors/${id}`}>
      <Card body className={`${styles.Content} align-items-center flex-row`}>
        <h3 className={styles.Name}>{name}</h3>
        <p>Number of quotes: {quotes_count}</p>
      </Card>
    </Link>
  );
}

export default Author;
