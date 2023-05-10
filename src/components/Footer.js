import React from "react";
import styles from "../styles/Footer.module.css";

// React Bootstrap imports
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function Footer() {
  return (
    <footer>
      <Row className={styles.Footer}>
        <Col className="mx-auto my-auto" md={6}>
          <a
            href="https://github.com/andrebraga7"
            target="_blank"
            rel="noreferrer"
          >
            <span className="align-middle">Developed by Andre Braga</span>
          </a>
        </Col>
      </Row>
    </footer>
  );
}

export default Footer;
