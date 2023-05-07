import React from "react";
import styles from "../../styles/NotFound.module.css";
import { useNavigate } from "react-router-dom";

// React Bootstrap imports
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

function NotFound() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  }

  return (
    <Row className={`${styles.Row} justify-content-center`}>
      <Col className="my-auto" md={6}>
        <Card className={styles.Container} body>
          <h1 className={styles.Header}>PAGE NOT FOUND</h1>
          <p>Uhm... not sure what happened there mate. Awkward... oh dear!</p>
          <p className={styles.Link} onClick={handleGoBack}>Click here to go back and let's hope for the best! </p>
        </Card>
      </Col>
    </Row>
  );
}

export default NotFound;
