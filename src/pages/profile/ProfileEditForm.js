import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/ProfileEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";
import { useNavigate, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";

// React Bootstrap imports
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

function ProfileEditForm() {
  useRedirect("loggedOut");
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const imageFile = useRef();
  const [errors, setErrors] = useState({});

  const [profileData, setProfileData] = useState({
    name: "",
    bio: "",
    image: "",
  });

  const { name, bio, image } = profileData;

  useEffect(() => {
    const handleMount = async () => {
      if (currentUser?.profile_id?.toString() === id) {
        try {
          const { data } = await axiosReq.get(`/profiles/${id}/`);
          const { name, bio, image } = data;
          setProfileData({ name, bio, image });
        } catch (error) {
          // console.log(error);
        }
      } else {
        navigate(-1);
      }
    };

    handleMount();
  }, [currentUser, id, navigate]);

  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("bio", bio);

    if (imageFile?.current?.files[0]) {
      formData.append("image", imageFile?.current?.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
      setCurrentUser((currentUser) => ({
        ...currentUser,
        profile_image: data.image,
      }));
      navigate(-1);
    } catch (error) {
      setErrors(error.response?.data);
    }
  };

  return (
    <Row className={styles.Row}>
      <Col className="mx-auto my-auto" md={10} lg={8} xl={6}>
        <Card className={`${styles.Container} my-2`} body>
          <h1 className={styles.Header}>EDIT PROFILE</h1>
          <Form onSubmit={handleSubmit}>
            <Row className="align-items-center">
              <Col md={6}>
                <Form.Group controlId="formFile">
                  {image && (
                    <Image className={styles.Image} src={image} roundedCircle />
                  )}
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Dark} btn mt-2 mb-5`}
                    >
                      Change image
                    </Form.Label>
                    <Form.Control
                      className="d-none"
                      type="file"
                      ref={imageFile}
                      accept="image/*"
                      onChange={(event) => {
                        if (event.target.files.length) {
                          setProfileData({
                            ...profileData,
                            image: URL.createObjectURL(event.target.files[0]),
                          });
                        }
                      }}
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col md={6}>
                <FloatingLabel
                  className={styles.Group}
                  controlId="floatingName"
                  label="Name"
                >
                  <Form.Control
                    className={styles.Input}
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    maxLength="35"
                  />
                </FloatingLabel>
                {errors?.name?.map((message, index) => (
                  <Alert variant="warning" key={index}>
                    {message}
                  </Alert>
                ))}

                <FloatingLabel
                  className={styles.Group}
                  controlId="floatingBio"
                  label="Quote a little bit about yourself..."
                >
                  <Form.Control
                    className={styles.Input}
                    style={{ height: "15vh" }}
                    as="textarea"
                    placeholder="Quote a little bit about yourself..."
                    name="bio"
                    value={bio}
                    onChange={handleChange}
                    maxLength="255"
                  />
                </FloatingLabel>
                {errors?.bio?.map((message, index) => (
                  <Alert variant="warning" key={index}>
                    {message}
                  </Alert>
                ))}
                <Button
                  className={`${btnStyles.ButtonComment} ${btnStyles.Dark} ${styles.Button}`}
                  type="button"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
                <Button
                  className={`${btnStyles.ButtonComment} ${btnStyles.Dark} ${styles.Button}`}
                  type="submit"
                >
                  Save
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}

export default ProfileEditForm;
