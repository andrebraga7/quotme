import React, { useState } from "react";
import styles from "../../styles/SignUp.module.css";
import btnStyles from "../../styles/Button.module.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useRedirect } from "../../hooks/useRedirect";

// React Bootstrap imports
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

function SignUp() {
  useRedirect("loggedIn");

  // useState definitions
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });

  const [errors, setErrors] = useState({});

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
      navigate("/login");
    } catch (error) {
      setErrors(error.response?.data);
    }
  };

  return (
    <Row className={`${styles.Row} justify-content-center`}>
      <Col className="my-auto" md={6}>
        <Card className={styles.Container} body>
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
            {errors.username?.map((message, index) => (
              <Alert variant="warning" key={index}>
                {message}
              </Alert>
            ))}
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
            {errors.password1?.map((message, index) => (
              <Alert variant="warning" key={index}>
                {message}
              </Alert>
            ))}
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
            {errors.password2?.map((message, index) => (
              <Alert variant="warning" key={index}>
                {message}
              </Alert>
            ))}
            <Button
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Dark}`}
              type="submit"
            >
              Sign Up
            </Button>
            {errors.non_field_errors?.map((message, index) => (
              <Alert variant="warning" key={index}>
                {message}
              </Alert>
            ))}
          </Form>
        </Card>
        <p className="mt-3">
          Already have an account? <Link className={styles.Link} to="/login">Login here</Link>
        </p>
      </Col>
    </Row>
  );
}

export default SignUp;
