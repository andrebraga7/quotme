import React, { useEffect, useState } from "react";
import styles from "../../styles/Login.module.css";
import btnStyles from "../../styles/Button.module.css";
import { axiosRes } from "../../api/axiosDefaults";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";

// React Bootstrap imports
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

function UsernameForm() {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?.profile_id?.toString() === id) {
      setUsername(currentUser.username);
    } else {
      navigate(-1);
    }
  }, [id, currentUser, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put("/dj-rest-auth/user/", { username });
      setCurrentUser((prevUser) => ({
        ...prevUser,
        username,
      }));
      navigate(-1);
    } catch (error) {
      setErrors(error.response?.data);
    }
  };

  return (
    <Row className={`${styles.Row} justify-content-center`}>
      <Col className="my-auto" md={4}>
        <Card body>
          <h1 className={styles.Header}>CHANGE USERNAME</h1>
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
                onChange={(event) => setUsername(event.target.value)}
              />
            </FloatingLabel>
            {errors.username?.map((message, index) => (
              <Alert variant="warning" key={index}>
                {message}
              </Alert>
            ))}
            <Button
              className={`${btnStyles.ButtonComment} ${btnStyles.Dark} ${btnStyles.ButtonSpace}`}
              type="button"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button
              className={`${btnStyles.ButtonComment} ${btnStyles.Dark} ${btnStyles.ButtonSpace}`}
              type="submit"
            >
              Save
            </Button>
            {errors.non_field_errors?.map((message, index) => (
              <Alert variant="warning" key={index}>
                {message}
              </Alert>
            ))}
          </Form>
        </Card>
      </Col>
    </Row>
  );
}

export default UsernameForm;
