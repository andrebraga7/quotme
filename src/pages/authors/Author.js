import React from "react";
import Card from "react-bootstrap/Card";

function Author(props) {
  const { name, quotes_count } = props;

  return (
    <Card body>
      <span>{name}</span>
      <span>{quotes_count}</span>
    </Card>
  );
}

export default Author;
