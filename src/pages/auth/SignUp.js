import React from "react";
import styles from "../../styles/SignUp.module.css";
import btnStyles from "../../styles/Button.module.css";

// React Bootstrap imports
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";

function SignUp() {
  return (
    <Row className={`${styles.Row} justify-content-center`}>
      <Col className="my-auto" md={6}>
        <Card body>
          <h1 className={styles.Header}>SIGN UP</h1>
          <Form>
            <FloatingLabel
              className={styles.Group}
              controlId="floatingUsername"
              label="Username"
            >
              <Form.Control
                className={styles.Input}
                type="text"
                placeholder="Username"
                name="username"
              />
            </FloatingLabel>
            <FloatingLabel
              className={styles.Group}
              controlId="floatingPassword1"
              label="Password"
            >
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Password"
                name="username"
              />
            </FloatingLabel>
            <FloatingLabel
              className={styles.Group}
              controlId="floatingPassword2"
              label="Confirm password"
            >
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Confirm password"
                name="username"
              />
            </FloatingLabel>
            <Button
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Dark}`}
            >
              Sign Up
            </Button>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}

export default SignUp;
