import React from "react";
import styles from "../../styles/Home.module.css";

// React Bootstrap imports
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function Home() {
  return (
    <>
      <Row className={styles.Row}>
        <Col className="my-auto mx-auto" md={4}>
          <Container className="text-start">
            <i className="fa-solid fa-quote-left"></i>
          </Container>
          <Container>
            <h1>Share Your Favorite Quotes</h1>
          </Container>
          <Container className="text-end">
            <i className="fa-solid fa-quote-right"></i>
          </Container>
        </Col>
      </Row>
      <Row className={`${styles.Row} ${styles.WhiteBg}`}>
        <Col className="my-auto mx-auto" md={6}>
          <i className="fa-regular fa-compass"></i>
          <h1>Discover and Be Inspired!</h1>
        </Col>
      </Row>
      <Row className={styles.Row}>
        <Col className="my-auto mx-auto" md={6}>
          <i className="fa-regular fa-bookmark"></i>
          <h1>Save the Good Ones!</h1>
        </Col>
      </Row>
    </>
  );
}

export default Home;
