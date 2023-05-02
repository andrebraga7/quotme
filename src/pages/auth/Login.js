import React, { useState } from "react";
import styles from "../../styles/Login.module.css";
import btnStyles from "../../styles/Button.module.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { setTokenTimestamp } from "../../utils/utils";

// React Bootstrap imports
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

function Login() {
  // useState definitions
  const setCurrentUser = useSetCurrentUser();

  const [logInData, setLogInData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // Variables definitions
  const { username, password } = logInData;
  const navigate = useNavigate();

  // Event handlers
  const handleChange = (event) => {
    setLogInData({
      ...logInData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/dj-rest-auth/login/", logInData);
      setCurrentUser(data.user);
      setTokenTimestamp(data);
      navigate(-1);
    } catch (error) {
      setErrors(error.response?.data);
    }
  };

  return (
    <Row className={`${styles.Row} justify-content-center`}>
      <Col className="my-auto" md={6}>
        <Card body>
          <h1 className={styles.Header}>LOGIN</h1>
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
              controlId="floatingPassword"
              label="Password"
            >
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </FloatingLabel>
            {errors.password?.map((message, index) => (
              <Alert variant="warning" key={index}>
                {message}
              </Alert>
            ))}
            <Button
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Dark}`}
              type="submit"
            >
              Login
            </Button>
            {errors.non_field_errors?.map((message, index) => (
              <Alert variant="warning" key={index}>
                {message}
              </Alert>
            ))}
          </Form>
        </Card>
        <p className="mt-3">
          Don't have an account? <Link className={styles.Link} to="/signup">Sign up here</Link>
        </p>
      </Col>
    </Row>
  );
}

export default Login;
