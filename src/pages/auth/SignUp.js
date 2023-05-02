import React, { useState } from "react";
import styles from "../../styles/SignUp.module.css";
import btnStyles from "../../styles/Button.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// React Bootstrap imports
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";

function SignUp() {
  // useState definitions
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });

  // Variables definitions
  const { username, password1, password2 } = signUpData;
  const navigate = useNavigate();

  // Event handlers
  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      console.log("success");
      navigate("/login");
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
    <Row className={`${styles.Row} justify-content-center`}>
      <Col className="my-auto" md={6}>
        <Card body>
          <h1 className={styles.Header}>SIGN UP</h1>
          <Form onSubmit={handleSubmit}>
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
                value={username}
                onChange={handleChange}
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
                name="password1"
                value={password1}
                onChange={handleChange}
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
                name="password2"
                value={password2}
                onChange={handleChange}
              />
            </FloatingLabel>
            <Button
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Dark}`}
              type="submit"
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
