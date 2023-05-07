import React, { useEffect, useState } from "react";
import styles from "../../styles/Login.module.css";
import btnStyles from "../../styles/Button.module.css";
import { axiosRes } from "../../api/axiosDefaults";
import { useNavigate, useParams } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useRedirect } from "../../hooks/useRedirect";

// React Bootstrap imports
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

function PasswordForm() {
  useRedirect("loggedOut");
  const currentUser = useCurrentUser();
  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState({
    new_password1: "",
    new_password2: "",
  });

  const { new_password1, new_password2 } = userData;

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?.profile_id?.toString() === id) {
    } else {
      navigate(-1);
    }
  }, [id, currentUser, navigate]);

  const handleChange = (event) => {
    setUserData((userData) => ({
      ...userData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.post("/dj-rest-auth/password/change/", userData);
      navigate(-1);
    } catch (error) {
      setErrors(error.response?.data);
    }
  };

  return (
    <Row className={`${styles.Row} justify-content-center`}>
      <Col className="my-auto" md={4}>
        <Card className={styles.Container} body>
          <h1 className={styles.Header}>CHANGE USERNAME</h1>
          <Form onSubmit={handleSubmit}>
            <FloatingLabel
              className={styles.Group}
              controlId="floatingPassword1"
              label="New password"
            >
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="New password"
                name="new_password1"
                value={new_password1}
                onChange={handleChange}
              />
            </FloatingLabel>
            {errors.new_password1?.map((message, index) => (
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
                name="new_password2"
                value={new_password2}
                onChange={handleChange}
              />
            </FloatingLabel>
            {errors.new_password2?.map((message, index) => (
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

export default PasswordForm;
